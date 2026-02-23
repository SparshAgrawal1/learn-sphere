import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Image, Paperclip } from 'lucide-react';
import { getSseUrl, getSendUrl } from '@/config/api';
import Scratchpad from './Scratchpad';

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
  imageUrl?: string;
}

interface QuizChatbotProps {
  topicName: string;
  chapterName?: string;
  subjectName?: string;
  classNumber?: string;
  pdfPath?: string;
  onClose: () => void;
}

const QuizChatbot: React.FC<QuizChatbotProps> = ({
  topicName,
  chapterName,
  subjectName,
  classNumber,
  pdfPath,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isScratchpadSubmitting, setIsScratchpadSubmitting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const currentMessageIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string>(Math.random().toString().substring(10));
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the actual subject name passed as prop, or fallback to topic-based detection
  const getSubjectFromTitle = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('math') || titleLower.includes('algebra') || titleLower.includes('geometry')) return 'math';
    if (titleLower.includes('physics') || titleLower.includes('motion') || titleLower.includes('force')) return 'physics';
    if (titleLower.includes('chemistry') || titleLower.includes('molecule')) return 'chemistry';
    if (titleLower.includes('biology') || titleLower.includes('cell')) return 'biology';
    if (titleLower.includes('english') || titleLower.includes('literature')) return 'english';
    if (titleLower.includes('social') || titleLower.includes('history')) return 'social_science';
    if (titleLower.includes('geography')) return 'geography';
    return 'physics'; // Default to physics
  };

  // Use the actual subject name if provided, otherwise fallback to topic-based detection
  // For Science subjects, the chapter name (Physics, Chemistry, Biology) should be used as subject
  const currentSubject = subjectName ? subjectName.toLowerCase() : getSubjectFromTitle(topicName);
  
  // Debug logging for subject resolution
  console.log('QuizChatbot - Subject resolution:', {
    subjectName,
    chapterName,
    topicName,
    resolvedSubject: currentSubject
  });

  const resetForNewConversation = () => {
    console.log('[QUIZ] Full session reset - use only when explicitly needed');
    setIsAiTyping(false);
    currentMessageIdRef.current = null;
  };

  // Handle image selection from file input
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processImageFile(files[0]);
    }
  };

  // Process image file (validation and preview)
  const processImageFile = (file: File) => {
    setImageError(null);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select an image file (JPEG, PNG, GIF, WebP)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size should be less than 5MB');
      return;
    }
    
    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.onerror = () => {
      setImageError('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Convert image to base64 for sending
  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = result.split(',')[1];
        
        // Validate base64 data
        if (!base64Data) {
          reject(new Error('Failed to extract base64 data from file'));
          return;
        }
        
        // Test if base64 is valid
        try {
          atob(base64Data);
          resolve(base64Data);
        } catch (error) {
          reject(new Error('Invalid base64 data'));
        }
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  // Connect to SSE endpoint with is_quiz parameter (text only)
  const connectSSE = () => {
    // Debug: Log the parameters being passed
    console.log('QuizChatbot - connectSSE parameters:', {
      topicName,
      chapterName,
      classNumber,
      subjectName,
      currentSubject,
      pdfPath,
      isQuiz: true
    });
    
    // Build URL with chapter-specific parameters and is_quiz
    const urlParams = new URLSearchParams({
      subject: currentSubject,
      is_audio: 'false', // Always false for quiz
      is_quiz: 'true' // This is the key difference from SimpleAITutorPanel
    });
    
    // Add chapter-specific parameters if provided
    if (pdfPath) urlParams.append('pdf_path', pdfPath);
    if (topicName) urlParams.append('chapter_name', topicName);
    if (classNumber) urlParams.append('class_number', classNumber);
    if (subjectName) urlParams.append('subject_name', subjectName);
    
    const sseUrl = getSseUrl(sessionIdRef.current, urlParams);
    
    console.log('QuizChatbot - SSE URL:', sseUrl);
    
    eventSourceRef.current = new EventSource(sseUrl);

    eventSourceRef.current.onopen = () => {
      console.log("Quiz SSE connection opened for subject:", currentSubject);
      setIsConnected(true);
      setIsConnecting(false);
      setIsAiTyping(false);
      
      // Automatically send "Start Quiz" message when connected (only once)
      if (!hasSentInitialMessage) {
        setTimeout(() => {
          sendInitialQuizMessage();
          setHasSentInitialMessage(true);
        }, 500); // Small delay to ensure connection is fully established
      }
    };

    eventSourceRef.current.onmessage = (event) => {
      try {
        const messageFromServer = JSON.parse(event.data);
        console.log("[QUIZ AGENT TO CLIENT]", messageFromServer);
        
        // Handle backend reconnection events (1011 timeout handling)
        if (messageFromServer.reconnecting) {
          console.log('[QUIZ] Backend is reconnecting session...');
          setIsConnecting(true);
          const reconnectMessage: Message = {
            id: Math.random().toString(36).substring(7),
            content: '⏳ Session refreshing, please wait...',
            isAi: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, reconnectMessage]);
          return;
        }
        
        if (messageFromServer.reconnected) {
          console.log('[QUIZ] Backend successfully reconnected session!');
          setIsConnecting(false);
          setIsConnected(true);
          const reconnectedMessage: Message = {
            id: Math.random().toString(36).substring(7),
            content: '✅ Session resumed. You can continue your quiz!',
            isAi: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, reconnectedMessage]);
          return;
        }
        
        // Handle error messages
        if (messageFromServer.error) {
          console.error('[QUIZ ERROR]', messageFromServer.error, messageFromServer.message);
          return;
        }

        // Handle output transcription (for native audio models)
        // Quiz is text-only, so we show transcriptions as regular text messages
        if (messageFromServer.outputTranscription && messageFromServer.outputTranscription.text) {
          const transcriptionText = messageFromServer.outputTranscription.text;
          const isFinished = messageFromServer.outputTranscription.finished || false;

          console.log("[QUIZ TRANSCRIPTION] Received:", transcriptionText);
          setIsAiTyping(true);
          
          requestAnimationFrame(() => {
            if (currentMessageIdRef.current === null) {
              // Start new message
              currentMessageIdRef.current = Math.random().toString(36).substring(7);
              console.log("[QUIZ NEW MESSAGE] Creating new message from transcription with ID:", currentMessageIdRef.current);
              const newAiMessage: Message = {
                id: currentMessageIdRef.current,
                content: transcriptionText,
                isAi: true,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, newAiMessage]);
            } else {
              // Append to existing message (streaming)
              // Check if transcription is cumulative (full text) or incremental (new chunk)
              console.log("[QUIZ UPDATE MESSAGE] Updating message from transcription ID:", currentMessageIdRef.current);
              setMessages(prev => prev.map(msg => {
                if (msg.id === currentMessageIdRef.current) {
                  const currentContent = msg.content;
                  
                  // If transcription text starts with existing content, it's cumulative (full text)
                  // In this case, replace the content instead of appending
                  if (transcriptionText.startsWith(currentContent)) {
                    console.log("[QUIZ] Cumulative text detected, replacing content");
                    return { ...msg, content: transcriptionText };
                  }
                  
                  // If the transcription text is already at the end, don't append (prevents duplicates)
                  if (currentContent.endsWith(transcriptionText)) {
                    console.log("[QUIZ] Skipping duplicate text (already at end)");
                    return msg; // No change needed
                  }
                  
                  // If finished and the full transcription text is already in the message, don't append
                  if (isFinished && currentContent.includes(transcriptionText) && transcriptionText.length > 10) {
                    console.log("[QUIZ] Skipping duplicate finished text (already in message)");
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

        // Ignore audio chunks in quiz (text-only mode)
        if (messageFromServer.mime_type === "audio/pcm") {
          console.log("[QUIZ] Ignoring audio chunk in text-only quiz mode");
        }

        // Handle text messages (for half-cascade models)
        // Note: Native audio models use transcriptions, not text parts
        // Skip text messages since we're using native audio models with transcriptions (prevents duplicates)
        if (messageFromServer.mime_type === "text/plain") {
          // Skip text messages - we're using native audio models with transcriptions
          // This prevents duplicate messages (transcription + text part)
          console.log("[QUIZ] Skipping text message (using transcriptions instead)");
          return;
        }

        // Check if the turn is complete (after processing text)
        if (messageFromServer.turn_complete && messageFromServer.turn_complete === true) {
          console.log("[QUIZ TURN COMPLETE] Setting isAiTyping to false");
          // Add a small delay to ensure all text chunks are processed
          setTimeout(() => {
            currentMessageIdRef.current = null;
            setIsAiTyping(false);
          }, 50);
          return;
        }

        // Check for interrupt message
        if (messageFromServer.interrupted && messageFromServer.interrupted === true) {
          return;
        }
      } catch (error) {
        console.error('[QUIZ SSE MESSAGE ERROR]', error);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.log("[QUIZ] SSE connection error detected", error);
      
      // Check the connection state
      const readyState = eventSourceRef.current?.readyState;
      
      // CONNECTING (0): SSE is trying to reconnect - let it continue
      if (readyState === EventSource.CONNECTING) {
        console.log("[QUIZ] SSE is reconnecting, waiting...");
        setIsConnecting(true);
        return;
      }
      
      // CLOSED (2): Connection is truly closed - need to handle
      // Note: Backend now handles 1011 timeouts internally and sends reconnecting/reconnected events
      // So this error handler only fires for true connection failures (network issues, server restart)
      if (readyState === EventSource.CLOSED) {
        console.log("[QUIZ] SSE connection closed, waiting briefly for backend to recover...");
        setIsConnecting(true);
        
        // Wait 5 seconds to see if backend recovers (for transient network issues)
        setTimeout(() => {
          // Check if connection was restored
          if (eventSourceRef.current?.readyState === EventSource.OPEN) {
            console.log("[QUIZ] Connection restored!");
            setIsConnecting(false);
            setIsConnected(true);
            return;
          }
          
          console.log("[QUIZ] Connection still closed, starting new session...");
          setIsConnected(false);
          setIsConnecting(false);
          
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
          
          // Add a friendly message
          const errorMessage: Message = {
            id: Math.random().toString(36).substring(7),
            content: '⚠️ Connection lost. Starting a new session...',
            isAi: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          
          // Generate new session ID for the new session
          sessionIdRef.current = Math.random().toString().substring(10);
          // Reset initial message flag so we send "Start Quiz" again for new session
          setHasSentInitialMessage(false);
          
          // Start a new session
          setTimeout(() => {
            console.log("[QUIZ] Starting new session with ID:", sessionIdRef.current);
            setIsConnecting(true);
            connectSSE();
          }, 1000);
        }, 5000); // Wait 5 seconds (backend handles longer reconnections internally)
      }
    };
  };

  // Send message to server with is_quiz parameter (text only)
  const sendMessage = async (message: { mime_type: string; data: string }) => {
    const sendUrl = getSendUrl(sessionIdRef.current);
    
    // Build message payload with all parameters including is_quiz
    const messagePayload = {
      ...message,
      // Add all the parameters that are sent during SSE connection
      subject: currentSubject,
      is_audio: false, // Always false for quiz
      is_quiz: true, // This is the key difference from SimpleAITutorPanel
      // Add chapter-specific parameters if provided
      ...(pdfPath && { pdf_path: pdfPath }),
      ...(topicName && { chapter_name: topicName }),
      ...(classNumber && { class_number: classNumber }),
      ...(subjectName && { subject_name: subjectName })
    };
    
    console.log('QuizChatbot - sendMessage payload:', messagePayload);
    
    try {
      const response = await fetch(sendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload)
      });
      
      if (!response.ok) {
        console.error('Failed to send quiz message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending quiz message:', error);
    }
  };

  // Send initial "Start Quiz" message automatically
  const sendInitialQuizMessage = async () => {
    const initialMessage = "Start Quiz";
    
    // Add the message to the UI immediately
    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      content: initialMessage,
      isAi: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Send to the backend
    await sendMessage({
      mime_type: "text/plain",
      data: initialMessage,
    });
    
    console.log("[QUIZ CLIENT TO AGENT] Auto-sent initial message:", initialMessage);
  };

  // Handle form submission
  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !selectedImage) || !isConnected) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      content: newMessage || (selectedImage ? 'Image attached' : ''),
      isAi: false,
      timestamp: new Date(),
      imageUrl: imagePreview || undefined
    };

    setMessages(prev => [...prev, userMessage]);

    // Send message to agent
    if (selectedImage) {
      try {
        // Send image
        const base64Image = await imageToBase64(selectedImage);
        const mimeType = selectedImage.type;
        
        console.log("[QUIZ CLIENT TO AGENT] Image details:", {
          name: selectedImage.name,
          type: mimeType,
          size: selectedImage.size,
          base64Length: base64Image.length
        });
        
        await sendMessage({
          mime_type: mimeType,
          data: base64Image,
        });
        
        console.log("[QUIZ CLIENT TO AGENT] Image sent successfully:", selectedImage.name);
        
        // Clear image after sending
        removeSelectedImage();
      } catch (error) {
        console.error("[QUIZ CLIENT TO AGENT] Error sending image:", error);
        setImageError("Failed to send image. Please try again.");
      }
    } else {
      // Send text message
      await sendMessage({
        mime_type: "text/plain",
        data: newMessage,
      });
      
      console.log("[QUIZ CLIENT TO AGENT]", newMessage);
    }

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle scratchpad submission - sends canvas image as multimodal data
  const handleScratchpadSubmit = async (imageData: string) => {
    if (!isConnected || isScratchpadSubmitting) return;

    setIsScratchpadSubmitting(true);

    try {
      const sendUrl = getSendUrl(sessionIdRef.current);
      
      // Build multimodal message payload
      const messagePayload = {
        type: 'multimodal',
        image: imageData,
        mimeType: 'image/png',
        text: 'Evaluate this answer from the scratchpad',
        // Add all the parameters that are sent during SSE connection
        subject: currentSubject,
        is_audio: false,
        is_quiz: true,
        // Add chapter-specific parameters if provided
        ...(pdfPath && { pdf_path: pdfPath }),
        ...(topicName && { chapter_name: topicName }),
        ...(classNumber && { class_number: classNumber }),
        ...(subjectName && { subject_name: subjectName })
      };
      
      console.log('[QUIZ SCRATCHPAD] Sending multimodal answer for evaluation');
      
      const response = await fetch(sendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload)
      });
      
      if (!response.ok) {
        console.error('[QUIZ SCRATCHPAD] Failed to send scratchpad answer:', response.statusText);
        
        // Show error message
        const errorMessage: Message = {
          id: Math.random().toString(36).substring(7),
          content: '⚠️ Failed to submit scratchpad answer. Please try again.',
          isAi: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        console.log('[QUIZ SCRATCHPAD] Successfully sent scratchpad answer for evaluation');
        
        // Add a user message to show the scratchpad was submitted with image preview
        const userMessage: Message = {
          id: Math.random().toString(36).substring(7),
          content: '📝 Submitted my answer from the scratchpad',
          isAi: false,
          timestamp: new Date(),
          imageUrl: `data:image/png;base64,${imageData}`
        };
        setMessages(prev => [...prev, userMessage]);
      }
    } catch (error) {
      console.error('[QUIZ SCRATCHPAD] Error sending scratchpad answer:', error);
      
      // Show error message
      const errorMessage: Message = {
        id: Math.random().toString(36).substring(7),
        content: '⚠️ Error submitting scratchpad answer. Please try again.',
        isAi: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsScratchpadSubmitting(false);
    }
  };

  // Cleanup function for SSE
  const cleanupConnections = () => {
    console.log('QuizChatbot - Cleaning up connections');
    
    // Close SSE connection
    if (eventSourceRef.current) {
      console.log('QuizChatbot - Closing SSE connection');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    // Reset states
    setIsConnected(false);
    setIsConnecting(false);
    setIsAiTyping(false);
    setHasSentInitialMessage(false);
    currentMessageIdRef.current = null;
  };

  // Handle close with cleanup
  const handleClose = () => {
    console.log('QuizChatbot - Closing quiz and cleaning up');
    cleanupConnections();
    onClose();
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

  // Cleanup on page navigation or refresh (but NOT on tab switch)
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupConnections();
    };

    // NOTE: Removed visibilitychange handler - we want to keep the connection
    // alive when user switches tabs, as they may be looking at other resources
    // while waiting for quiz responses

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(30,58,95,0.88)', backdropFilter: 'blur(14px)' }} />

      {/* Quiz Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] mx-4 rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#FFFFFF', border: '1px solid rgba(8,145,178,0.12)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
        {/* Fixed Header */}
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-slate-200/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.25), rgba(30,58,95,0.15))' }}>
              <svg className="w-4 h-4" style={{ color: '#A78BFA' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800/85">Deep Mastery Quiz</h2>
              <p className="text-[10px] text-slate-800/30">{subjectName || 'General'} · {topicName}</p>
            </div>
          </div>
          <button onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-800/25 hover:text-slate-800/50 hover:bg-white/[0.05] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat panel */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-slate-200/[0.04]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 scrollbar-hide">
              {isConnecting && (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(30,58,95,0.1))', border: '1px solid rgba(8,145,178,0.15)' }}>
                    <div className="w-5 h-5 border-2 border-[#0891B2] border-t-transparent rounded-full animate-spin" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800/70 mb-2">Preparing your quiz...</h3>
                  <div className="space-y-2 w-full max-w-[240px]">
                    {['Analyzing chapter content', 'Generating questions', 'Setting up environment'].map((text, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                        style={{ background: 'rgba(30,58,95,0.025)', border: '1px solid rgba(30,58,95,0.04)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        <span className="text-[11px] text-slate-800/35">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isConnecting && messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(30,58,95,0.1))' }}>
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-800/30 max-w-[200px] leading-relaxed">
                    Quiz ready. Start answering questions or ask for a hint.
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <motion.div key={message.id}
                  className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  {message.isAi && (
                    <div className="w-6 h-6 rounded-lg mr-2 mt-0.5 flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(30,58,95,0.12))' }}>
                      <svg className="w-3 h-3 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  <div className="max-w-[78%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                    style={message.isAi ? {
                      background: 'rgba(30,58,95,0.04)',
                      border: '1px solid rgba(30,58,95,0.06)',
                      color: 'rgba(30,58,95,0.72)',
                      borderRadius: '0.75rem 0.75rem 0.75rem 0.2rem',
                    } : {
                      background: 'linear-gradient(135deg, #1E3A5F, #0891B2)',
                      color: 'white',
                      boxShadow: '0 4px 15px rgba(224,82,26,0.2)',
                      borderRadius: '0.75rem 0.75rem 0.2rem 0.75rem',
                    }}>
                    {message.imageUrl && (
                      <img src={message.imageUrl} alt="Attached" className="max-w-full h-auto max-h-36 rounded-lg mb-2 object-contain" />
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-[9px] mt-1 opacity-40">{formatTime(message.timestamp)}</p>
                  </div>
                </motion.div>
              ))}

              {isAiTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="w-6 h-6 rounded-lg mr-2 mt-0.5 flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(30,58,95,0.12))' }}>
                    <svg className="w-3 h-3 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="px-3 py-2.5 rounded-xl" style={{ background: 'rgba(30,58,95,0.04)', border: '1px solid rgba(30,58,95,0.06)' }}>
                    <div className="flex items-end gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/50 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/50 animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/50 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="flex-shrink-0 px-4 py-2.5 border-t border-slate-200/[0.05]">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(8,145,178,0.07)', border: '1px solid rgba(8,145,178,0.12)' }}>
                  <img src={imagePreview} alt="Preview" className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-800/50 truncate">{selectedImage?.name}</p>
                  </div>
                  <button onClick={removeSelectedImage} className="text-slate-800/25 hover:text-red-400 transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Image Error */}
            {imageError && (
              <div className="flex-shrink-0 px-4 py-2.5 border-t border-slate-200/[0.05]">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400/70 text-xs"
                  style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                  <span className="flex-1">{imageError}</span>
                  <button onClick={() => setImageError(null)} className="text-red-400/50 hover:text-red-400 transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-slate-200/[0.04]"
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                isDragOver ? 'border-violet-500/30 bg-violet-500/[0.06]' : 'border-slate-200/[0.06] bg-white/[0.025]'
              }`}>
                {isDragOver && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                    <Image className="h-5 w-5 text-[#0891B2]/60" />
                  </div>
                )}
                <input
                  type="text"
                  placeholder={isConnecting ? "Preparing..." : !isConnected ? "Connecting..." : isDragOver ? "Drop image..." : "Answer or ask a question..."}
                  className="flex-1 bg-transparent text-slate-800/75 text-xs focus:outline-none placeholder:text-slate-800/20"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected || isConnecting}
                />
                <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} disabled={!isConnected || isConnecting}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all disabled:opacity-30 ${selectedImage ? 'text-[#0891B2]' : 'text-slate-800/25 hover:text-slate-800/45'}`}>
                  <Image className="h-3 w-3" />
                </button>
                <button onClick={handleSendMessage}
                  disabled={(!newMessage.trim() && !selectedImage) || !isConnected || isConnecting}
                  className="w-6 h-6 rounded-md flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background: (newMessage.trim() || selectedImage) && isConnected && !isConnecting ? 'linear-gradient(135deg, #0891B2, #1E3A5F)' : 'rgba(30,58,95,0.06)' }}>
                  {isConnecting
                    ? <div className="w-3 h-3 border border-slate-200/30 border-t-white rounded-full animate-spin" />
                    : <Send className="h-3 w-3 text-slate-800" />}
                </button>
              </div>
            </div>
          </div>

          {/* Scratchpad */}
          <div className="w-[42%] min-w-[320px] max-w-[420px] flex-shrink-0 hidden lg:flex flex-col border-l border-slate-200/[0.04]">
            <div className="px-4 py-3 border-b border-slate-200/[0.05]">
              <h3 className="text-xs font-semibold text-slate-800/50 uppercase tracking-wider">Scratchpad</h3>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <Scratchpad onSubmit={handleScratchpadSubmit} isSubmitting={isScratchpadSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizChatbot;
