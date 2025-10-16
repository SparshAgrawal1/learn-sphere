import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, BrainCog, Sparkles, ArrowRight, LightbulbIcon, Mic, MicOff, MicIcon } from 'lucide-react';
import { getSseUrl, getSendUrl } from '@/config/api';

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

interface BackendAITutorPanelProps {
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

const BackendAITutorPanel: React.FC<BackendAITutorPanelProps> = ({
  subtopicTitle,
  themeColor,
  isMobile,
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
  const [minimized, setMinimized] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const currentMessageIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string>(Math.random().toString().substring(10));
  
  // Audio-related refs
  const audioPlayerNodeRef = useRef<any>(null);
  const audioRecorderNodeRef = useRef<any>(null);
  const audioPlayerContextRef = useRef<any>(null);
  const audioRecorderContextRef = useRef<any>(null);
  const micStreamRef = useRef<any>(null);
  const audioBufferRef = useRef<Uint8Array[]>([]);
  const bufferTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine subject based on subtopic title or use physics as default
  const getSubjectFromTitle = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('math') || titleLower.includes('algebra') || titleLower.includes('geometry')) return 'math';
    if (titleLower.includes('english') || titleLower.includes('literature')) return 'english';
    if (titleLower.includes('chemistry') || titleLower.includes('molecule')) return 'chemistry';
    if (titleLower.includes('biology') || titleLower.includes('cell')) return 'biology';
    if (titleLower.includes('social') || titleLower.includes('history')) return 'social_science';
    if (titleLower.includes('physics') || titleLower.includes('motion') || titleLower.includes('force')) return 'physics';
    return 'physics'; // Default to physics
  };

  const currentSubject = getSubjectFromTitle(subtopicTitle);

  // Connect to SSE endpoint
  const connectSSE = () => {
    // Build URL with chapter-specific parameters if available
    const urlParams = new URLSearchParams({
      subject: currentSubject,
      is_audio: isAudio.toString()
    });
    
    // Add chapter-specific parameters if provided
    if (pdfPath) urlParams.append('pdf_path', pdfPath);
    if (chapterName) urlParams.append('chapter_name', chapterName);
    if (classNumber) urlParams.append('class_number', classNumber);
    if (subjectName) urlParams.append('subject_name', subjectName);
    
    const sseUrl = getSseUrl(sessionIdRef.current, urlParams);
    
    eventSourceRef.current = new EventSource(sseUrl);

    eventSourceRef.current.onopen = () => {
      console.log("SSE connection opened for subject:", currentSubject, "audio mode:", isAudio);
      setIsConnected(true);
      setIsAiTyping(false);
    };

    eventSourceRef.current.onmessage = (event) => {
      const messageFromServer = JSON.parse(event.data);
      console.log("[AGENT TO CLIENT]", messageFromServer);

      // Check if the turn is complete
        if (messageFromServer.turn_complete && messageFromServer.turn_complete === true) {
          currentMessageIdRef.current = null;
          setIsAiTyping(false);
          setIsPlayingAudio(false);
          return;
        }

      // Check for interrupt message
      if (messageFromServer.interrupted && messageFromServer.interrupted === true) {
        if (audioPlayerNodeRef.current) {
          audioPlayerNodeRef.current.port.postMessage({ command: "endOfAudio" });
        }
        return;
      }

      // Handle audio messages
      if (messageFromServer.mime_type === "audio/pcm" && audioPlayerNodeRef.current) {
        setIsPlayingAudio(true);
        audioPlayerNodeRef.current.port.postMessage(base64ToArrayBuffer(messageFromServer.data));
        console.log("[AGENT TO CLIENT] received %s bytes", base64ToArrayBuffer(messageFromServer.data).byteLength);
      }

      // Handle text messages
      if (messageFromServer.mime_type === "text/plain") {
        setIsAiTyping(true);
        
        // Add a new message for a new turn
        if (currentMessageIdRef.current === null) {
          currentMessageIdRef.current = Math.random().toString(36).substring(7);
          const newAiMessage: Message = {
            id: currentMessageIdRef.current,
            content: messageFromServer.data,
            isAi: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, newAiMessage]);
        } else {
          // Update existing message
          setMessages(prev => prev.map(msg => 
            msg.id === currentMessageIdRef.current 
              ? { ...msg, content: msg.content + messageFromServer.data }
              : msg
          ));
        }
      }
    };

    eventSourceRef.current.onerror = () => {
      console.log("SSE connection error or closed.");
      setIsConnected(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        console.log("Reconnecting...");
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
      // Add chapter-specific parameters if provided
      ...(pdfPath && { pdf_path: pdfPath }),
      ...(chapterName && { chapter_name: chapterName }),
      ...(classNumber && { class_number: classNumber }),
      ...(subjectName && { subject_name: subjectName })
    };
    
    console.log('BackendAITutorPanel - sendMessage payload:', messagePayload);
    
    try {
      const response = await fetch(sendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload)
      });
      
      if (!response.ok) {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Utility functions
  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

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

    // In audio mode with voice active, don't send text messages
    if (isAudio && isVoiceActive) {
      console.log('In audio mode - text messages are not sent');
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
    // Add audio data to buffer
    audioBufferRef.current.push(new Uint8Array(pcmData));
    
    // Start timer if not already running
    if (!bufferTimerRef.current) {
      bufferTimerRef.current = setInterval(sendBufferedAudio, 200); // 0.2 seconds
    }
  };

  // Send buffered audio data every 0.2 seconds
  const sendBufferedAudio = async () => {
    if (audioBufferRef.current.length === 0) {
      return;
    }
    
    // Calculate total length
    let totalLength = 0;
    for (const chunk of audioBufferRef.current) {
      totalLength += chunk.length;
    }
    
    console.log('Sending buffered audio:', totalLength, 'bytes from', audioBufferRef.current.length, 'chunks');
    
    // Combine all chunks into a single buffer
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of audioBufferRef.current) {
      combinedBuffer.set(chunk, offset);
      offset += chunk.length;
    }
    
    // Send the combined audio data
    await sendMessage({
      mime_type: "audio/pcm",
      data: arrayBufferToBase64(combinedBuffer.buffer),
    }, true); // isAudioMessage = true for audio messages
    console.log("[CLIENT TO AGENT] sent %s bytes", combinedBuffer.byteLength);
    
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
  const toggleVoiceMode = () => {
    const newAudioMode = !isAudio;
    console.log("Toggling voice mode from", isAudio, "to", newAudioMode);
    setIsAudio(newAudioMode);
    
    // If enabling voice mode, toggle to PDF mode
    if (newAudioMode && onTogglePdfMode) {
      console.log("Enabling voice mode - toggling to PDF mode");
      onTogglePdfMode();
    }
    
    // Reconnect with new mode
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      connectSSE();
    }
  };

  // Handle voice button click
  const handleVoiceButtonClick = async () => {
    if (!isVoiceActive) {
      await startAudio();
      // Add a system message indicating voice mode is active
      const systemMessage: Message = {
        id: `system-${Date.now()}`,
        content: "🎤 Voice mode activated! Speak your question and I'll respond with audio.",
        isAi: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMessage]);
    } else {
      // Stop voice input and cleanup IMMEDIATELY
      console.log("Stopping voice input and cleaning up - stopping all data transmission");
      
      // 1. Stop audio buffer timer FIRST to prevent more data transmission
      if (bufferTimerRef.current) {
        console.log("Stopping audio buffer timer");
        clearInterval(bufferTimerRef.current);
        bufferTimerRef.current = null;
      }
      
      // 2. Clear any pending audio data in buffer
      if (audioBufferRef.current.length > 0) {
        console.log("Clearing pending audio buffer data");
        audioBufferRef.current = [];
      }
      
      // 3. Stop microphone stream
      if (micStreamRef.current) {
        console.log("Stopping microphone stream");
        const { stopMicrophone } = await import('@/utils/audio-recorder');
        stopMicrophone(micStreamRef.current);
        micStreamRef.current = null;
      }
      
      // 4. Stop audio player
      if (audioPlayerNodeRef.current) {
        console.log("Stopping audio player");
        audioPlayerNodeRef.current.port.postMessage({ command: "endOfAudio" });
        audioPlayerNodeRef.current = null;
      }
      
      // 5. Close SSE connection
      if (eventSourceRef.current) {
        console.log("Closing SSE connection when stopping voice");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsConnected(false);
      }
      
      // 6. Reset all states
      setIsVoiceActive(false);
      setIsPlayingAudio(false);
      setVoiceStatus('🎤 Click to start voice input');
      
      // Add a system message indicating voice mode is deactivated
      const systemMessage: Message = {
        id: `system-${Date.now()}`,
        content: "🎤 Voice mode deactivated. You can now use text input.",
        isAi: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMessage]);
      
      console.log("All audio transmission stopped and connections cleaned up");
    }
  };

  // Cleanup function for SSE and audio
  const cleanupConnections = () => {
    console.log('BackendAITutorPanel - Cleaning up connections');
    
    // Close SSE connection
    if (eventSourceRef.current) {
      console.log('BackendAITutorPanel - Closing SSE connection');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    // Clear audio buffer timer
    if (bufferTimerRef.current) {
      clearInterval(bufferTimerRef.current);
      bufferTimerRef.current = null;
    }
    
    // Stop microphone stream
    if (micStreamRef.current) {
      console.log('BackendAITutorPanel - Stopping microphone stream');
      micStreamRef.current.getTracks().forEach((track: any) => track.stop());
      micStreamRef.current = null;
    }
    
    // Stop audio player
    if (audioPlayerNodeRef.current) {
      console.log('BackendAITutorPanel - Stopping audio player');
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
    
    // Reset states
    setIsConnected(false);
    setIsVoiceActive(false);
    setIsPlayingAudio(false);
    setVoiceStatus('Click to start voice input');
  };

  // Initialize connection
  useEffect(() => {
    connectSSE();
    
    return cleanupConnections;
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanupConnections();
    };
  }, []);

  // Cleanup on page navigation or refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupConnections();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cleanupConnections();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiTyping]);

  // Calculate accent RGB values for styling
  const accentRGB = {
    r: parseInt(themeColor.accent.slice(1, 3), 16),
    g: parseInt(themeColor.accent.slice(3, 5), 16),
    b: parseInt(themeColor.accent.slice(5, 7), 16)
  };

  const quickQuestions = [
    'How does this concept work?',
    'Can you explain this simply?',
    'Give me an example',
    'Why is this important?'
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col gap-3 p-3 overflow-auto">
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
      {/* AI Tutor Card */}
      <motion.div 
        className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 p-4 relative overflow-hidden"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          minHeight: '48px'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setMinimized(!minimized)}
      >
        {/* Connection status indicator */}
        <div className="absolute top-2 right-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-10 h-10 rounded-xl flex items-center justify-center relative"
            style={{ 
              background: `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}80)`,
              boxShadow: `0 0 15px ${themeColor.accent}40`
            }}
            animate={{ 
              boxShadow: [`0 0 10px ${themeColor.accent}30`, `0 0 20px ${themeColor.accent}50`, `0 0 10px ${themeColor.accent}30`] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <BrainCog className="h-5 w-5 text-white" />
          </motion.div>
          
          <div>
            <h3 className="font-semibold text-xs text-white">AI Learning Assistant</h3>
            <p className="text-xs text-white/80 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></span>
              <span>{isConnected ? 'Connected' : 'Connecting...'} • {subtopicTitle}</span>
            </p>
          </div>
          
          
          {/* Minimize/Maximize button */}
          <button 
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(!minimized);
            }}
          >
            {minimized ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </button>
          
          {/* Mobile close button */}
          {isMobile && onClose && (
            <button 
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                cleanupConnections();
                onClose();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </motion.div>
      
      {/* Chat Card */}
      <AnimatePresence>
        {!minimized && (
          <motion.div 
            className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 flex-grow relative overflow-hidden flex flex-col"
            style={{
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{
                backgroundImage: 'url("/noise.png")',
                backgroundBlendMode: 'overlay',
                backgroundSize: '200px',
                backgroundOpacity: '0.05'
              }}
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <motion.div 
                    className="w-14 h-14 rounded-full mb-3 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor.accent}40, ${themeColor.accent}10)`,
                      boxShadow: `0 0 20px ${themeColor.accent}20`
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${themeColor.accent}20`,
                        `0 0 30px ${themeColor.accent}30`,
                        `0 0 20px ${themeColor.accent}20`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="text-sm font-semibold mb-2">Ask me anything!</h3>
                  <p className="text-xs text-white/70 max-w-xs">
                    I'm your AI tutor for this topic. Ask questions about concepts, request examples, or get help with problems. Use the voice button below for audio conversation.
                  </p>
                  
                  {/* Suggested questions */}
                  <div className="mt-4 space-y-2 w-full">
                    {quickQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        className="w-full text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        onClick={() => {
                          setNewMessage(q);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        disabled={!isConnected}
                      >
                        <LightbulbIcon className="h-3.5 w-3.5 text-white/70" />
                        <span className="text-xs text-white/90">{q}</span>
                        <ArrowRight className="h-3 w-3 text-white/50 ml-auto" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {message.isAi && (
                        <div className="w-7 h-7 rounded-lg flex-shrink-0 mr-2 mt-1 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                          <div 
                            className="w-4 h-4 rounded-lg" 
                            style={{
                              background: `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}80)`,
                              boxShadow: `0 0 5px ${themeColor.accent}80`
                            }}
                          />
                        </div>
                      )}
  
                      <div
                        className={`max-w-[85%] p-3 rounded-xl text-white ${
                          message.isAi ? 'rounded-tl-sm bg-black/40 border border-white/10' : 'rounded-tr-sm'
                        }`}
                        style={
                          message.isAi
                            ? { 
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                              }
                            : { 
                                background: `linear-gradient(135deg, ${themeColor.accent}90, ${themeColor.accent}70)`,
                                boxShadow: `0 4px 15px ${themeColor.accent}30`
                              }
                        }
                      >
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="text-[10px] opacity-50 mt-1.5 text-right">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
  
                      {!message.isAi && (
                        <div className="w-7 h-7 rounded-lg flex-shrink-0 ml-2 mt-1 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-lg bg-white/70" />
                        </div>
                      )}
                    </motion.div>
                  ))}
  
                  {isAiTyping && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-7 h-7 rounded-lg flex-shrink-0 mr-2 mt-1 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                        <div 
                          className="w-4 h-4 rounded-lg" 
                          style={{
                            background: `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}80)`,
                            boxShadow: `0 0 5px ${themeColor.accent}80`
                          }}
                        />
                      </div>
  
                      <div
                        className="p-3 rounded-xl rounded-tl-sm bg-black/40 border border-white/10"
                        style={{
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div className="flex space-x-2">
                          <motion.div
                            className="w-1.5 h-1.5 bg-white/70 rounded-full"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-white/70 rounded-full"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-white/70 rounded-full"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Invisible div for scrolling to bottom */}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-black/20">
              <div
                className="flex items-center bg-black/40 rounded-xl p-2 border border-white/10"
                style={{
                  backdropFilter: 'blur(8px)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(255,255,255,0.05)'
                }}
              >
                <textarea
                  placeholder={
                    !isConnected ? "Connecting..." :
                    isAudio && isVoiceActive ? "Voice mode active - speak your question..." :
                    "Ask a question..."
                  }
                  className="flex-1 bg-transparent text-white border-none p-1.5 text-xs focus:outline-none resize-none max-h-20"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  disabled={!isConnected || (isAudio && isVoiceActive)}
                  style={{
                    minHeight: '32px',
                    opacity: (isAudio && isVoiceActive) ? 0.5 : 1,
                  }}
                />
                <motion.button
                  style={{
                    background: `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}90)`,
                    boxShadow: `0 4px 12px ${themeColor.accent}40`
                  }}
                  className="h-8 w-8 rounded-lg flex items-center justify-center transition-all"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !isConnected || (isAudio && isVoiceActive)}
                  whileHover={{ scale: 1.05, boxShadow: `0 6px 15px ${themeColor.accent}50` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Orb Voice Button */}
              <div className="mt-4 p-4 bg-black/20 rounded-xl border border-white/10 flex flex-col items-center">
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

              {/* Quick Questions */}
              {messages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, i) => (
                    <motion.button
                      key={i}
                      className="text-[10px] px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/5"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setNewMessage(q);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      disabled={!isConnected}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackendAITutorPanel;
