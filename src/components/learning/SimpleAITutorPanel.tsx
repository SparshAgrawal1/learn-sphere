import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, BrainCog } from 'lucide-react';
import { getSseUrl, getSendUrl, getCleanupUrl } from '@/config/api';
import pako from 'pako';

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

interface SimpleAITutorPanelProps {
  subtopicTitle: string;
  themeColor: {
    accent: string;
    bg: string;
  };
  isMobile?: boolean;
  onClose?: () => void;
  // New props for chapter-specific tutoring
  pdfPath?: string;
  chapterName?: string;
  classNumber?: string;
  subjectName?: string;
  // PDF mode toggle callback
  onTogglePdfMode?: () => void;
}

const SimpleAITutorPanel: React.FC<SimpleAITutorPanelProps> = ({
  subtopicTitle,
  themeColor,
  isMobile = false,
  onClose,
  pdfPath,
  chapterName,
  classNumber,
  subjectName,
  onTogglePdfMode
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Click to start voice input');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const currentMessageIdRef = useRef<string | null>(null);
  const currentInputTranscriptionIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string>(Math.random().toString().substring(10));
  const hasConnectedRef = useRef<boolean>(false); // Track if we've ever connected
  const chunkCounterRef = useRef<number>(0); // Track chunk order
  
  // Audio-related refs
  const audioPlayerNodeRef = useRef<any>(null);
  const audioRecorderNodeRef = useRef<any>(null);
  const audioPlayerContextRef = useRef<any>(null);
  const audioRecorderContextRef = useRef<any>(null);
  const micStreamRef = useRef<any>(null);
  const audioBufferRef = useRef<Uint8Array[]>([]);
  const bufferTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Audio chunk management for preventing distortion
  const audioChunkQueueRef = useRef<Map<number, any>>(new Map());
  const expectedSequenceRef = useRef<number>(1);
  const audioPlaybackBufferRef = useRef<Uint8Array[]>([]);
  const audioPlaybackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const turnCompleteRef = useRef<boolean>(false);
  const audioCompletionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine subject based on subtopic title or use physics as default
  const getSubjectFromTitle = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('math') || titleLower.includes('algebra') || titleLower.includes('geometry')) return 'math';
    if (titleLower.includes('physics') || titleLower.includes('motion') || titleLower.includes('force')) return 'physics';
    if (titleLower.includes('chemistry') || titleLower.includes('molecule')) return 'chemistry';
    if (titleLower.includes('biology') || titleLower.includes('cell')) return 'biology';
    if (titleLower.includes('english') || titleLower.includes('literature')) return 'english';
    if (titleLower.includes('social') || titleLower.includes('history')) return 'social_science';
    return 'physics'; // Default to physics
  };

  // Use actual subjectName if provided, otherwise detect from title
  const currentSubject = subjectName ? 
    subjectName.toLowerCase().replace(' ', '_') : // Convert "Social Science" to "social_science"
    getSubjectFromTitle(subtopicTitle);

  // Audio chunk ordering and playback management
  const handleAudioChunk = (message: any) => {
    try {
      const sequence = message.sequence || 0;
      let audioData = base64ToArrayBuffer(message.data);
      
      // Check if audio is compressed and decompress it
      if (message.compressed) {
        try {
          const compressedArray = new Uint8Array(audioData);
          const decompressed = pako.inflate(compressedArray);
          audioData = decompressed.buffer;
          const compressionRatio = compressedArray.length / decompressed.length;
          console.log(`[AUDIO] Decompressed audio: ${compressedArray.length} → ${decompressed.length} bytes (${(compressionRatio * 100).toFixed(1)}% compression)`);
        } catch (error) {
          console.error('Failed to decompress audio, using original:', error);
        }
      }
      
      // Convert to proper audio format for worklet (Int16Array)
      const int16Array = new Int16Array(audioData);
      
      // Store chunk in queue with proper format
      audioChunkQueueRef.current.set(sequence, {
        data: int16Array,
        timestamp: message.timestamp || Date.now()
      });
      
      // Process chunks in order
      processAudioChunks();
      
    } catch (error) {
      console.error('Failed to handle audio chunk:', error);
    }
  };

  const processAudioChunks = () => {
    const queue = audioChunkQueueRef.current;
    const expected = expectedSequenceRef.current;
    
    console.log(`[AUDIO] Processing chunks - expected: ${expected}, queue size: ${queue.size}`);
    
    // Process chunks in sequence order
    while (queue.has(expected)) {
      const chunk = queue.get(expected);
      if (chunk) {
        // Add to playback buffer
        audioPlaybackBufferRef.current.push(chunk.data);
        queue.delete(expected);
        expectedSequenceRef.current = expected + 1;
        
        console.log(`[AUDIO] Processed chunk ${expected}, buffer size: ${audioPlaybackBufferRef.current.length}`);
      }
    }
    
    // Start playback if not already running and we have chunks
    if (audioPlaybackBufferRef.current.length > 0 && !audioPlaybackTimerRef.current) {
      console.log('[AUDIO] Starting playback timer for new response');
      startAudioPlayback();
    }
  };

  const startAudioPlayback = () => {
    if (audioPlaybackTimerRef.current) {
      console.log('[AUDIO] Playback timer already running, skipping start');
      return;
    }
    
    console.log('[AUDIO] Starting audio playback timer');
    audioPlaybackTimerRef.current = setInterval(() => {
      if (audioPlaybackBufferRef.current.length > 0 && audioPlayerNodeRef.current) {
        const chunk = audioPlaybackBufferRef.current.shift();
        if (chunk) {
          try {
            // Validate audio format before sending
            if (!(chunk instanceof Int16Array)) {
              console.error('[AUDIO] Invalid audio format, expected Int16Array, got:', typeof chunk);
              return;
            }
            
            // Check if worklet is ready (basic backpressure)
            if (audioPlayerNodeRef.current.port) {
              // Send Int16Array buffer directly to worklet
              const int16Chunk = chunk as Int16Array;
              audioPlayerNodeRef.current.port.postMessage(int16Chunk.buffer);
              console.log(`[AUDIO] Played chunk (${int16Chunk.length} samples), remaining: ${audioPlaybackBufferRef.current.length}`);
            } else {
              // Worklet not ready, put chunk back
              audioPlaybackBufferRef.current.unshift(chunk);
              console.log('[AUDIO] Worklet not ready, chunk requeued');
            }
          } catch (error) {
            console.error('[AUDIO] Failed to send chunk to worklet:', error);
            // Put chunk back in buffer for retry
            audioPlaybackBufferRef.current.unshift(chunk);
          }
        }
      } else if (audioPlaybackBufferRef.current.length === 0) {
        // Check if we're still expecting more chunks or if turn is complete
        const queueSize = audioChunkQueueRef.current.size;
        const isTurnComplete = turnCompleteRef.current;
        
        if (queueSize === 0 && isTurnComplete) {
          // No more chunks expected and turn is complete, stop playback
          if (audioPlaybackTimerRef.current) {
            clearInterval(audioPlaybackTimerRef.current);
            audioPlaybackTimerRef.current = null;
          }
          setIsPlayingAudio(false);
          console.log('[AUDIO] Playback completed, turn finished');
        } else if (queueSize === 0 && !isTurnComplete) {
          // No chunks in queue but turn not complete, wait a bit longer
          console.log('[AUDIO] Buffer empty, waiting for more chunks...');
        }
        // If queueSize > 0, keep timer running to wait for more chunks
      }
    }, 20); // 20ms intervals for smooth playback (50fps)
  };

  const resetAudioPlayback = () => {
    console.log('[AUDIO] Resetting audio playback buffers and timers');
    console.log('[AUDIO] Before reset - queue size:', audioChunkQueueRef.current.size, 'buffer size:', audioPlaybackBufferRef.current.length, 'expected seq:', expectedSequenceRef.current);
    
    // Clear all audio buffers and reset sequence
    audioChunkQueueRef.current.clear();
    audioPlaybackBufferRef.current = [];
    expectedSequenceRef.current = 1;
    turnCompleteRef.current = false;
    
    if (audioPlaybackTimerRef.current) {
      console.log('[AUDIO] Clearing existing playback timer');
      clearInterval(audioPlaybackTimerRef.current);
      audioPlaybackTimerRef.current = null;
    }
    
    if (audioCompletionTimerRef.current) {
      console.log('[AUDIO] Clearing completion timer');
      clearTimeout(audioCompletionTimerRef.current);
      audioCompletionTimerRef.current = null;
    }
    
    console.log('[AUDIO] After reset - all buffers cleared, ready for new response');
  };

  const handleTurnComplete = () => {
    turnCompleteRef.current = true;
    console.log('[AUDIO] Turn completed, clearing worklet buffer and waiting for audio to finish');
    console.log('[AUDIO] Current state - isPlayingAudio:', isPlayingAudio, 'buffer size:', audioPlaybackBufferRef.current.length);
    
    // Immediately clear the worklet buffer to prepare for next response
    if (audioPlayerNodeRef.current) {
      audioPlayerNodeRef.current.port.postMessage({ command: "endOfAudio" });
      console.log('[AUDIO] Sent endOfAudio to clear worklet buffer');
    }
    
    // Set a timeout to force cleanup if audio doesn't finish naturally
    audioCompletionTimerRef.current = setTimeout(() => {
      console.log('[AUDIO] Force cleanup after turn completion timeout');
      resetAudioPlayback();
      setIsPlayingAudio(false);
      console.log('[AUDIO] Audio state reset, ready for next response');
    }, 5000); // 5 second timeout
  };

  const resetForNewConversation = () => {
    console.log('[AUDIO] Full session reset - use only when explicitly needed');
    resetAudioPlayback();
    setIsPlayingAudio(false);
    setIsAiTyping(false);
    currentMessageIdRef.current = null;
    turnCompleteRef.current = false;
  };

  // Connect to SSE endpoint
  const connectSSE = (audioMode?: boolean) => {
    const audioModeToUse = audioMode !== undefined ? audioMode : isAudio;
    
    console.log('Connecting SSE for:', subtopicTitle);
    
    // Build URL with chapter-specific parameters if available
    const urlParams = new URLSearchParams({
      subject: currentSubject,
      is_audio: audioModeToUse.toString(),
      is_quiz: 'false' // This is a regular AI tutor, not quiz mode
    });
    
    // Add chapter-specific parameters only if provided (no fallbacks)
    if (pdfPath) urlParams.append('pdf_path', pdfPath);
    if (chapterName) urlParams.append('chapter_name', chapterName);
    if (classNumber) urlParams.append('class_number', classNumber);
    if (subjectName) urlParams.append('subject_name', subjectName);
    
    const sseUrl = getSseUrl(sessionIdRef.current, urlParams);
    
    eventSourceRef.current = new EventSource(sseUrl);
    hasConnectedRef.current = true; // Mark that we've made a connection

    eventSourceRef.current.onopen = () => {
      setIsConnected(true);
      setIsAiTyping(false);
      // Reset message tracking for new connection
      currentMessageIdRef.current = null;
      currentInputTranscriptionIdRef.current = null;
      chunkCounterRef.current = 0;
    };

    eventSourceRef.current.onmessage = (event) => {
      try {
        const messageFromServer = JSON.parse(event.data);
        
        // Handle error messages
        if (messageFromServer.error) {
          console.log('[SSE ERROR]', messageFromServer.error);
          resetAudioPlayback();
          setIsPlayingAudio(false);
          return;
        }

        // Check if the turn is complete
        if (messageFromServer.turn_complete && messageFromServer.turn_complete === true) {
          // Add a small delay to ensure all chunks are processed before clearing the current message ID
          setTimeout(() => {
            currentMessageIdRef.current = null;
            currentInputTranscriptionIdRef.current = null;
            chunkCounterRef.current = 0; // Reset chunk counter
            setIsAiTyping(false);
            handleTurnComplete(); // Properly handle turn completion
          }, 100); // 100ms delay
          return;
        }

        // Check for interrupt message
        if (messageFromServer.interrupted && messageFromServer.interrupted === true) {
          resetAudioPlayback(); // Clear all audio buffers
          if (audioPlayerNodeRef.current) {
            audioPlayerNodeRef.current.port.postMessage({ command: "endOfAudio" });
          }
          return;
        }

        // Handle input transcription (user's spoken words in audio mode)
        // This shows what the user said when using voice input
        if (messageFromServer.inputTranscription && messageFromServer.inputTranscription.text) {
          const transcriptionText = messageFromServer.inputTranscription.text;
          const isFinished = messageFromServer.inputTranscription.finished || false;
          
          // Only show input transcription in audio mode
          if (isAudio) {
            requestAnimationFrame(() => {
              if (currentInputTranscriptionIdRef.current === null) {
                // Create new input transcription message
                currentInputTranscriptionIdRef.current = Math.random().toString(36).substring(7);
                const newMessage: Message = {
                  id: currentInputTranscriptionIdRef.current,
                  content: transcriptionText,
                  isAi: false,
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, newMessage]);
              } else {
                // Update existing input transcription message
                setMessages(prev => prev.map(msg => 
                  msg.id === currentInputTranscriptionIdRef.current 
                    ? { ...msg, content: msg.content + transcriptionText }
                    : msg
                ));
              }
            });

            if (isFinished) {
              currentInputTranscriptionIdRef.current = null;
            }
          }
        }

        // Handle output transcription (for native audio models)
        // Text mode: show as regular message (no audio playback)
        // Audio mode: show as transcription (secondary to audio)
        if (messageFromServer.outputTranscription && messageFromServer.outputTranscription.text) {
          const transcriptionText = messageFromServer.outputTranscription.text;
          const isFinished = messageFromServer.outputTranscription.finished || false;
          
          setIsAiTyping(true);
          
          // Use requestAnimationFrame for smooth UI updates
          requestAnimationFrame(() => {
            if (currentMessageIdRef.current === null) {
              // Start new message
              currentMessageIdRef.current = Math.random().toString(36).substring(7);
              const newMessage: Message = {
                id: currentMessageIdRef.current,
                content: transcriptionText,
                isAi: true,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, newMessage]);
            } else {
              // Append to existing message (streaming)
              // Check if transcription is cumulative (full text) or incremental (new chunk)
              setMessages(prev => prev.map(msg => {
                if (msg.id === currentMessageIdRef.current) {
                  const currentContent = msg.content;
                  
                  // If transcription text starts with existing content, it's cumulative (full text)
                  // In this case, replace the content instead of appending
                  if (transcriptionText.startsWith(currentContent)) {
                    console.log("[TRANSCRIPTION] Cumulative text detected, replacing content");
                    return { ...msg, content: transcriptionText };
                  }
                  
                  // If the transcription text is already at the end, don't append (prevents duplicates)
                  if (currentContent.endsWith(transcriptionText)) {
                    console.log("[TRANSCRIPTION] Skipping duplicate text (already at end)");
                    return msg; // No change needed
                  }
                  
                  // If finished and the full transcription text is already in the message, don't append
                  if (isFinished && currentContent.includes(transcriptionText) && transcriptionText.length > 10) {
                    console.log("[TRANSCRIPTION] Skipping duplicate finished text (already in message)");
                    return msg; // No change needed
                  }
                  
                  // Append new incremental transcription text
                  return { ...msg, content: currentContent + transcriptionText };
                }
                return msg;
              }));
            }
          });

          if (isFinished) {
            currentMessageIdRef.current = null;
            setIsAiTyping(false);
          }
        }

        // Handle audio messages with chunk ordering
        // Only process audio in audio mode - in text mode, ignore audio chunks and show transcriptions only
        if (messageFromServer.mime_type === "audio/pcm" && isAudio) {
          const sequence = messageFromServer.sequence || 0;
          
          // Detect new response by checking if this is sequence 1 (first chunk of new response)
          if (sequence === 1) {
            console.log('[AUDIO] New response starting (sequence 1), resetting audio buffers');
            resetAudioPlayback(); // Reset audio buffers for new response
          }
          
          setIsPlayingAudio(true);
          handleAudioChunk(messageFromServer);
          console.log("[AGENT TO CLIENT] received audio chunk, sequence:", messageFromServer.sequence);
        } else if (messageFromServer.mime_type === "audio/pcm" && !isAudio) {
          // In text mode, ignore audio chunks - we only show transcriptions
          console.log("[AGENT TO CLIENT] Ignoring audio chunk in text mode (showing transcriptions only)");
        }

        // Handle text messages (for half-cascade models in text mode)
        // Note: Native audio models use transcriptions, not text parts
        // In text mode, skip text messages since we're using transcriptions (prevents duplicates)
        if (messageFromServer.mime_type === "text/plain" && !isAudio) {
          // Skip text messages in text mode - we're using native audio models with transcriptions
          // This prevents duplicate messages (transcription + text part)
          console.log("[AGENT TO CLIENT] Skipping text message in text mode (using transcriptions instead)");
          return;
        }
      } catch (error) {
        console.error('[SSE MESSAGE ERROR]', error);
        // Try to recover from message parsing errors
        resetAudioPlayback();
        setIsPlayingAudio(false);
      }
    };

    eventSourceRef.current.onerror = () => {
      setIsConnected(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        connectSSE();
      }, 5000);
    };
  };

  // Send message to server
  const sendMessage = async (message: { mime_type: string; data: string }, isAudioMessage: boolean = false) => {
    const sendUrl = getSendUrl(sessionIdRef.current);
    
    // Build message payload with all parameters
    const messagePayload = {
      ...message,
      // Add all the parameters that are sent during SSE connection
      subject: currentSubject,
      is_audio: isAudioMessage,
      // Add chapter-specific parameters only if provided (no fallbacks)
      ...(pdfPath && { pdf_path: pdfPath }),
      ...(chapterName && { chapter_name: chapterName }),
      ...(classNumber && { class_number: classNumber }),
      ...(subjectName && { subject_name: subjectName })
    };
    
    try {
      const response = await fetch(sendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload)
      });
      
      if (!response.ok) {
        // Error handling
      }
    } catch (error) {
      // Error handling
    }
  };

  // Base64 to ArrayBuffer conversion
  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // ArrayBuffer to Base64 conversion
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Handle form submission
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return;

    // In audio mode, don't send text messages
    if (isAudio) {
      console.log('Audio mode active - text messages are not sent');
      return;
    }

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      content: newMessage,
      isAi: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Send message to agent
    await sendMessage({
      mime_type: "text/plain",
      data: newMessage,
    }, false); // isAudioMessage = false for text messages

    console.log("[CLIENT TO AGENT]", newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Audio initialization functions
  const startAudio = async () => {
    try {
      console.log('Starting audio initialization...');
      
      // Start audio output
      const { startAudioPlayerWorklet } = await import('@/utils/audio-player');
      const [playerNode, playerContext] = await startAudioPlayerWorklet();
      audioPlayerNodeRef.current = playerNode;
      audioPlayerContextRef.current = playerContext;
      console.log('Audio player initialized');

      // Start audio input
      const { startAudioRecorderWorklet } = await import('@/utils/audio-recorder');
      const [recorderNode, recorderContext, stream] = await startAudioRecorderWorklet(audioRecorderHandler);
      audioRecorderNodeRef.current = recorderNode;
      audioRecorderContextRef.current = recorderContext;
      micStreamRef.current = stream;
      console.log('Audio recorder initialized');

      setIsVoiceActive(true);
      setVoiceStatus('🎤 Voice input active - speak now!');
    } catch (error) {
      console.error('Error starting audio:', error);
      setVoiceStatus('Error starting voice input');
    }
  };

  // Audio recorder handler
  const audioRecorderHandler = (pcmData: ArrayBuffer) => {
    console.log('Audio data received:', pcmData.byteLength, 'bytes');
    
    // Only reset turn completion flag when user starts speaking, keep session active
    if (turnCompleteRef.current) {
      console.log('[AUDIO] User started speaking, resetting turn completion flag');
      turnCompleteRef.current = false; // Reset only the turn flag, not entire session
    }
    
    // Add audio data to buffer
    audioBufferRef.current.push(new Uint8Array(pcmData));
    
    // Start timer if not already running - reduced frequency for better performance
    if (!bufferTimerRef.current) {
      bufferTimerRef.current = setInterval(sendBufferedAudio, 100); // 0.1 seconds for lower latency
    }
  };

  // Send buffered audio data every 0.1 seconds with size optimization
  const sendBufferedAudio = async () => {
    if (audioBufferRef.current.length === 0) {
      return;
    }
    
    // Calculate total length
    let totalLength = 0;
    for (const chunk of audioBufferRef.current) {
      totalLength += chunk.length;
    }
    
    // Only send if we have enough data (optimize for network efficiency)
    if (totalLength < 1024) { // Less than 1KB, wait for more data
      return;
    }
    
    console.log('Sending buffered audio:', totalLength, 'bytes from', audioBufferRef.current.length, 'chunks');
    
    // Combine all chunks into a single buffer
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of audioBufferRef.current) {
      combinedBuffer.set(chunk, offset);
      offset += chunk.length;
    }
    
    // Compress the audio data before sending
    const compressedBuffer = pako.deflate(combinedBuffer, { level: 6 });
    const compressionRatio = compressedBuffer.length / combinedBuffer.length;
    console.log(`[CLIENT TO AGENT] Compressed audio: ${combinedBuffer.length} → ${compressedBuffer.length} bytes (${(compressionRatio * 100).toFixed(1)}% of original)`);
    
    // Send the compressed audio data
    await sendMessage({
      mime_type: "audio/pcm",
      data: arrayBufferToBase64(compressedBuffer.buffer),
      compressed: true,
      original_size: combinedBuffer.length
    }, true); // isAudioMessage = true for audio messages
    console.log("[CLIENT TO AGENT] sent %s bytes (compressed)", compressedBuffer.byteLength);
    
    // Clear the buffer
    audioBufferRef.current = [];
  };

  // Stop audio recording and cleanup
  const stopAudioRecording = () => {
    console.log("stopAudioRecording called - stopping all audio transmission");
    
    if (bufferTimerRef.current) {
      console.log("Clearing audio buffer timer");
      clearInterval(bufferTimerRef.current);
      bufferTimerRef.current = null;
    }
    
    // Clear any remaining buffered audio instead of sending it
    if (audioBufferRef.current.length > 0) {
      console.log("Clearing remaining audio buffer instead of sending");
      audioBufferRef.current = [];
    }
  };

  // Toggle voice mode
  const toggleVoiceMode = async () => {
    const newAudioMode = !isAudio;
    console.log("Toggling voice mode from", isAudio, "to", newAudioMode);
    setIsAudio(newAudioMode);
    
    // If enabling voice mode, toggle to PDF mode
    if (newAudioMode && onTogglePdfMode) {
      console.log("Enabling voice mode - toggling to PDF mode");
      onTogglePdfMode();
    }
    
    // If switching to audio mode, initialize audio player
    if (newAudioMode && !audioPlayerNodeRef.current) {
      console.log("Initializing audio player for audio mode");
      try {
        const { startAudioPlayerWorklet } = await import('@/utils/audio-player');
        const [playerNode, playerContext] = await startAudioPlayerWorklet();
        audioPlayerNodeRef.current = playerNode;
        audioPlayerContextRef.current = playerContext;
        console.log('Audio player initialized for audio mode');
      } catch (error) {
        console.error('Failed to initialize audio player:', error);
      }
    }
    
    // Reconnect with new mode - pass the new audio mode directly
    if (eventSourceRef.current) {
      console.log("Disconnecting current SSE connection");
      eventSourceRef.current.close();
      console.log("Reconnecting SSE with audio mode:", newAudioMode);
      connectSSE(newAudioMode);
    }
  };

  // Handle voice button click - disconnect SSE and reconnect with audio true
  const handleVoiceButtonClick = async () => {
    if (!isVoiceActive) {
      console.log("Starting voice input - disconnecting SSE and reconnecting with audio true");
      
      // Disconnect current SSE if open
      if (eventSourceRef.current) {
        console.log("Disconnecting current SSE connection");
        eventSourceRef.current.close();
      }
      
      // Set audio mode to true and reconnect
      setIsAudio(true);
      console.log("Reconnecting SSE with audio mode: true");
      connectSSE(true);
      
      // Ensure audio player is initialized
      if (!audioPlayerNodeRef.current) {
        console.log("Initializing audio player for voice input");
        try {
          const { startAudioPlayerWorklet } = await import('@/utils/audio-player');
          const [playerNode, playerContext] = await startAudioPlayerWorklet();
          audioPlayerNodeRef.current = playerNode;
          audioPlayerContextRef.current = playerContext;
          console.log('Audio player initialized for voice input');
        } catch (error) {
          console.error('Failed to initialize audio player:', error);
        }
      }
      
      // Wait a moment for connection to establish
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await startAudio();
      console.log("Audio recording started");
    } else {
      // Stop voice input and perform FULL cleanup (same as back button/unmount)
      console.log("Stopping voice input - performing full cleanup");
      
      // Call the full cleanup function (same as back button does)
      cleanupConnections();
      
      console.log("Voice stopped - all connections cleaned up");
    }
  };

  // Cleanup function for SSE and audio
  const cleanupConnections = () => {
    // Only cleanup if there's actually a connection to clean up
    const hasActiveConnection = eventSourceRef.current !== null;
    
    if (!hasActiveConnection && !hasConnectedRef.current) {
      console.log('No connection ever made - skipping cleanup');
      return;
    }
    
    console.log('Cleaning up AI Tutor connections...');
    
    // Close SSE connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    // Only call backend cleanup if we actually had a connection
    if (hasConnectedRef.current) {
      try {
        const cleanupUrl = getCleanupUrl(sessionIdRef.current);
        fetch(cleanupUrl, { method: 'POST' }).catch(error => {
          console.log('Backend cleanup call failed (connection may already be closed):', error);
        });
      } catch (error) {
        console.log('Backend cleanup call failed:', error);
      }
    }
    
    // Clear audio buffer timer
    if (bufferTimerRef.current) {
      clearInterval(bufferTimerRef.current);
      bufferTimerRef.current = null;
    }
    
    // Reset audio playback buffers and timers
    resetAudioPlayback();
    
    // Stop microphone stream
    if (micStreamRef.current) {
      console.log('SimpleAITutorPanel - Stopping microphone stream');
      micStreamRef.current.getTracks().forEach((track: any) => track.stop());
      micStreamRef.current = null;
    }
    
    // Stop audio player
    if (audioPlayerNodeRef.current) {
      console.log('SimpleAITutorPanel - Stopping audio player');
      audioPlayerNodeRef.current.port.postMessage({ command: "endOfAudio" });
      audioPlayerNodeRef.current = null;
    }
    
    // Disconnect audio contexts
    if (audioPlayerContextRef.current) {
      audioPlayerContextRef.current.close();
      audioPlayerContextRef.current = null;
    }
    
    if (audioRecorderContextRef.current) {
      audioRecorderContextRef.current.close();
      audioRecorderContextRef.current = null;
    }
    
    // Reset connection tracking
    hasConnectedRef.current = false;
    
    // Reset states
    setIsConnected(false);
    setIsVoiceActive(false);
    setIsPlayingAudio(false);
    setVoiceStatus('Click to start voice input');
  };

  // Initialize connection when component mounts or props change
  useEffect(() => {
    // Only connect when we have meaningful content (not the default 'Learning' title)
    if (subtopicTitle && subtopicTitle !== 'Learning') {
      console.log('Initializing AI Tutor connection for:', subtopicTitle);
      connectSSE();
    }
    
    // Register global cleanup function
    (window as any).forceCleanupAITutor = cleanupConnections;
    
    // Return cleanup function that only runs if there's an active connection
    return () => {
      if (eventSourceRef.current) {
        console.log('Props changed - cleaning up previous connection');
        cleanupConnections();
      }
    };
  }, [subtopicTitle, pdfPath, chapterName, classNumber, subjectName]); // Re-connect when any of these props change

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      console.log('AI Tutor component unmounting - final cleanup');
      cleanupConnections();
    };
  }, []);

  // Cleanup on page navigation or refresh (but NOT on tab switch)
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupConnections();
    };

    // NOTE: Removed visibilitychange handler - we want to keep the connection
    // alive when user switches tabs, as they may be looking at other resources
    // while waiting for AI responses

    // Handle popstate for browser back/forward navigation
    const handlePopState = () => {
      cleanupConnections();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiTyping]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`${isMobile ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col`}>
      <style>{`
        @keyframes svgai-spin { to { transform: rotate(360deg); } }
        @keyframes svgai-wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.2); }
        }
        .voice-wave-bar {
          display: inline-block;
          width: 3px;
          height: 14px;
          border-radius: 2px;
          background: linear-gradient(180deg, #0891B2, #1E3A5F);
          transform-origin: bottom;
          animation: svgai-wave 0.9s ease-in-out infinite;
        }
        .voice-wave-bar:nth-child(2) { animation-delay: 0.12s; }
        .voice-wave-bar:nth-child(3) { animation-delay: 0.24s; }
        .voice-wave-bar:nth-child(4) { animation-delay: 0.36s; }
        .voice-wave-bar:nth-child(5) { animation-delay: 0.48s; }
      `}</style>

      <motion.div
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          background: '#FFFFFF',
          borderLeft: '1px solid rgba(8,145,178,0.1)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.25), rgba(30,58,95,0.2))' }}>
              <BrainCog className="h-3.5 w-3.5 text-[#0891B2]" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-700 leading-none">AI Tutor</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-slate-200'}`}
                  style={{ boxShadow: isConnected ? '0 0 6px rgba(52,211,153,0.6)' : 'none' }} />
                <span className="text-[9px] text-slate-400">{isConnected ? 'Connected' : 'Connecting...'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { resetForNewConversation(); }}
              title="Reset conversation"
              className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
            </button>
            {isMobile && (
              <button
                onClick={() => { cleanupConnections(); if (onClose) onClose(); }}
                className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Topic badge */}
        {subtopicTitle && subtopicTitle !== 'Learning' && (
          <div className="px-4 py-2 border-b border-slate-200">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <div className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #0891B2, #1E3A5F)' }} />
              <span className="text-[11px] text-slate-700/70 leading-snug line-clamp-1">{subtopicTitle}</span>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 scrollbar-hide">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(30,58,95,0.1))' }}>
                <BrainCog className="h-5 w-5 text-[#0891B2]/60" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[180px]">
                {isAudio
                  ? 'Voice mode active. Click the mic to start speaking.'
                  : `Ask me anything about this topic, or use voice mode.`}
              </p>
            </div>
          )}

          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {message.isAi && (
                <div className="w-5 h-5 rounded-md mr-1.5 mt-0.5 flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(30,58,95,0.15))' }}>
                  <BrainCog className="h-2.5 w-2.5 text-[#0891B2]/70" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${message.isAi ? '' : 'text-white'}`}
                style={message.isAi ? {
                  background: '#F1F5F9',
                  border: '1px solid rgba(30,58,95,0.1)',
                  color: '#1E293B',
                  borderRadius: '0.75rem 0.75rem 0.75rem 0.2rem',
                } : {
                  background: 'linear-gradient(135deg, #0891B2, #1E3A5F)',
                  boxShadow: '0 4px 15px rgba(8,145,178,0.2)',
                  borderRadius: '0.75rem 0.75rem 0.2rem 0.75rem',
                }}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-[9px] mt-1" style={{ opacity: 0.4 }}>{formatTime(message.timestamp)}</p>
              </div>
            </motion.div>
          ))}

          {isAiTyping && !isAudio && (
            <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-5 h-5 rounded-md mr-1.5 mt-0.5 flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(30,58,95,0.15))' }}>
                <BrainCog className="h-2.5 w-2.5 text-[#0891B2]/70" />
              </div>
              <div className="px-3 py-2.5 rounded-xl" style={{ background: 'rgba(30,58,95,0.04)', border: '1px solid rgba(30,58,95,0.08)' }}>
                <div className="flex items-end gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/50 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/50 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/50 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </motion.div>
          )}

          {isPlayingAudio && isAudio && (
            <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="px-3 py-2 rounded-xl flex items-center gap-2"
                style={{ background: 'rgba(30,58,95,0.06)', border: '1px solid rgba(30,58,95,0.12)' }}>
                <div className="flex items-end gap-0.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="voice-wave-bar" style={{ animationDelay: `${(i-1)*0.12}s` }} />)}
                </div>
                <span className="text-[10px] text-teal-600/60">Speaking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice section */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-slate-200">
          <button
            onClick={isAudio ? handleVoiceButtonClick : toggleVoiceMode}
            disabled={!isConnected}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl transition-all duration-300"
            style={isVoiceActive ? {
              background: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(30,58,95,0.15))',
              border: '1px solid rgba(8,145,178,0.25)',
              boxShadow: '0 0 20px rgba(8,145,178,0.15)',
            } : {
              background: 'rgba(30,58,95,0.03)',
              border: '1px solid rgba(30,58,95,0.08)',
            }}
          >
            {isVoiceActive ? (
              <>
                <div className="flex items-end gap-0.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="voice-wave-bar" style={{ height: '12px', animationDelay: `${(i-1)*0.12}s` }} />)}
                </div>
                <span className="text-xs font-medium text-slate-700">Stop Voice</span>
              </>
            ) : (
              <>
                <Mic className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-400">
                  {!isConnected ? 'Connecting...' : isAudio ? 'Start Speaking' : 'Enable Voice'}
                </span>
              </>
            )}
          </button>
          {isVoiceActive && (
            <p className="text-[9px] text-[#0891B2]/40 text-center mt-1.5">{voiceStatus}</p>
          )}
        </div>

        {/* Text input */}
        <div className="flex-shrink-0 px-3 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50">
            <input
              type="text"
              placeholder={
                !isConnected ? "Connecting..." :
                isAudio ? "Voice mode active..." :
                "Ask about this topic..."
              }
              className="flex-1 bg-transparent text-slate-700 text-xs focus:outline-none placeholder:text-slate-400"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected || isAudio}
              style={{ opacity: isAudio ? 0.4 : 1 }}
            />
            <motion.button
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
              style={{
                background: newMessage.trim() && !isAudio && isConnected
                  ? 'linear-gradient(135deg, #0891B2, #1E3A5F)'
                  : 'rgba(30,58,95,0.08)',
              }}
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected || isAudio}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className={`h-3 w-3 ${newMessage.trim() && !isAudio && isConnected ? 'text-white' : 'text-slate-500'}`} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleAITutorPanel;
