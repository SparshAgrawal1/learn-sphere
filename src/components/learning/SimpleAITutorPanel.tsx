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

        // Handle audio messages with chunk ordering
        if (messageFromServer.mime_type === "audio/pcm") {
          const sequence = messageFromServer.sequence || 0;
          
          // Detect new response by checking if this is sequence 1 (first chunk of new response)
          if (sequence === 1) {
            console.log('[AUDIO] New response starting (sequence 1), resetting audio buffers');
            resetAudioPlayback(); // Reset audio buffers for new response
          }
          
          setIsPlayingAudio(true);
          handleAudioChunk(messageFromServer);
          console.log("[AGENT TO CLIENT] received audio chunk, sequence:", messageFromServer.sequence);
        }

        // Handle text messages - only show text in text mode, not in audio mode
        if (messageFromServer.mime_type === "text/plain" && !isAudio) {
          setIsAiTyping(true);
          chunkCounterRef.current++;
          
          // Add a new message for a new turn
          if (currentMessageIdRef.current === null) {
            currentMessageIdRef.current = Math.random().toString(36).substring(7);
            chunkCounterRef.current = 1; // Reset counter for new message
            const newAiMessage: Message = {
              id: currentMessageIdRef.current,
              content: messageFromServer.data,
              isAi: true,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMessage]);
          } else {
            // Update existing message - append new chunk
            setMessages(prev => prev.map(msg => 
              msg.id === currentMessageIdRef.current 
                ? { ...msg, content: msg.content + messageFromServer.data }
                : msg
            ));
          }
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

  // Cleanup on page navigation or refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupConnections();
    };

    // More targeted visibility handling - only cleanup on actual navigation away
    const handleVisibilityChange = () => {
      // Only cleanup if hidden for more than 5 seconds (indicates navigation away)
      if (document.hidden) {
        setTimeout(() => {
          if (document.hidden) {
            cleanupConnections();
          }
        }, 5000);
      }
    };

    // Handle popstate for browser back/forward navigation
    const handlePopState = () => {
      cleanupConnections();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
      {/* Orb Animation Styles */}
      <style>{`
        .orb-container {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          border-radius: 50%;
          rotate: 90deg;
          cursor: pointer;
          filter: drop-shadow(0 0 6px #ff3e1c88) drop-shadow(0 0 6px #1c8cff88);
          transition: all 0.3s ease;
        }

        .orb {
          position: absolute;
          width: 100px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #060606;
          filter: blur(12px);
          transition: all 0.3s ease;
        }
        
        .orb-container:hover .orb {
          width: 110px;
        }
        
        .orb-container.voice-active .orb {
          animation: rotate 6s infinite;
        }

        @keyframes rotate {
          50% {
            transform: rotate(180deg);
          }
        }

        .orb-inner {
          position: absolute;
          left: -120%;
          top: -25%;
          width: 160%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #ff3e1c;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          transition: all 0.3s ease;
        }
        
        .orb-container.voice-active .orb-inner {
          animation: rotate 6s linear infinite;
        }

        .orb-inner:nth-child(2) {
          left: auto;
          right: -120%;
          top: auto;
          bottom: -25%;
          background: #1c8cff;
          clip-path: polygon(
            20% 0%,
            0% 20%,
            30% 50%,
            0% 80%,
            20% 100%,
            50% 70%,
            80% 100%,
            100% 80%,
            70% 50%,
            100% 20%,
            80% 0%,
            50% 30%
          );
        }
        
        .orb-container.voice-active .orb-inner:nth-child(2) {
          animation: rotate 8s linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .orb-container:hover .orb .orb-inner {
          width: 170%;
        }
      `}</style>
      <motion.div 
        className="flex-1 flex flex-col glass-card overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeColor.bg}20, ${themeColor.bg}10)`,
          border: `1px solid ${themeColor.accent}30`,
          backdropFilter: 'blur(20px)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Simple Header */}
        <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}80)`,
                boxShadow: `0 0 10px ${themeColor.accent}40`
              }}
            >
              <BrainCog className="h-3 w-3 text-white" />
            </div>
            <h3 className="text-sm font-bold text-white">AI Tutor</h3>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
          </div>
          
          <div className="flex items-center gap-2">
            {/* Reset Conversation Button */}
            <button
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => {
                resetForNewConversation();
                console.log('[AUDIO] Manual session reset triggered by user');
              }}
              title="Reset session (stops current conversation)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
            </button>
            
            {/* Close button (mobile only) */}
            {isMobile && (
              <button 
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={() => {
                  cleanupConnections();
                  if (onClose) onClose();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-white/60 text-sm">
              {isAudio ? (
                <div>
                  <p>🎤 Audio conversation mode</p>
                  <p className="text-xs mt-1">Click the voice button below to begin speaking</p>
                </div>
              ) : (
                <div>
                  <p>Ask me anything about {subtopicTitle}!</p>
                  <p className="text-xs mt-1">Or click the voice button below to switch to audio mode</p>
                </div>
              )}
            </div>
          )}
          
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  message.isAi
                    ? 'bg-white/10 text-white'
                    : 'text-white'
                }`}
                style={{
                  background: message.isAi 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}80)`,
                }}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">{formatTime(message.timestamp)}</p>
              </div>
            </motion.div>
          ))}
          
          {isAiTyping && !isAudio && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-white/10 p-3 rounded-2xl text-white text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          {isPlayingAudio && isAudio && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-blue-500/20 p-3 rounded-2xl text-white text-sm border border-blue-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span>🔊 AI is speaking...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Orb Voice Button */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col items-center">
          <div 
            className={`orb-container ${isVoiceActive ? 'voice-active' : ''}`}
            onClick={isAudio ? handleVoiceButtonClick : toggleVoiceMode}
            style={{
              cursor: isConnected ? 'pointer' : 'not-allowed',
              opacity: isConnected ? 1 : 0.5,
              filter: isVoiceActive 
                ? 'drop-shadow(0 0 12px #ff3e1c88) drop-shadow(0 0 12px #1c8cff88)' 
                : 'drop-shadow(0 0 6px #ff3e1c88) drop-shadow(0 0 6px #1c8cff88)'
            }}
          >
            <div className="orb">
              <div className="orb-inner"></div>
              <div className="orb-inner"></div>
            </div>
          </div>
          
          <div className="text-center mt-2">
            <p className="text-xs text-white/70 font-medium">
              {isVoiceActive ? 'Stop Voice' : isAudio ? 'Start Voice' : 'Enable Voice'}
            </p>
            <p className="text-[10px] text-white/50 mt-1">{voiceStatus}</p>
            {isVoiceActive && (
              <p className="text-[9px] text-green-400/80 mt-0.5">
                🎤 Audio conversation active - speak and listen
              </p>
            )}
            {isPlayingAudio && (
              <p className="text-[9px] text-blue-400/80 mt-0.5 animate-pulse">
                🔊 Playing AI response...
              </p>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={
                !isConnected ? "Connecting..." :
                isAudio ? "Audio mode - use voice controls above" :
                "Ask a question..."
              }
              className="flex-1 bg-black/40 text-white border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected || isAudio}
              style={{
                opacity: isAudio ? 0.5 : 1,
              }}
            />
            <motion.button
              style={{
                background: `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}90)`,
                boxShadow: `0 4px 12px ${themeColor.accent}40`
              }}
              className="h-8 w-8 rounded-lg flex items-center justify-center transition-all"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected || isAudio}
              whileHover={{ scale: 1.05, boxShadow: `0 6px 15px ${themeColor.accent}50` }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleAITutorPanel;
