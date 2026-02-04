import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Image, Paperclip } from 'lucide-react';
import { getSseUrl, getSendUrl } from '@/config/api';

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

    eventSourceRef.current.onerror = () => {
      console.log("Quiz SSE connection error or closed.");
      setIsConnected(false);
      setIsConnecting(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        console.log("Reconnecting quiz...");
        setIsConnecting(true);
        connectSSE();
      }, 5000);
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      
      {/* Quiz Chatbot Container */}
      <div className="relative w-full h-full max-w-4xl max-h-[90vh] mx-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-400/80 to-orange-500/80 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Quiz Mode - {subjectName || 'General'}</h2>
              <p className="text-sm text-white/80">{topicName}</p>
              {chapterName && chapterName !== subjectName && (
                <p className="text-xs text-white/60">Chapter: {chapterName}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-3 bg-red-400/90 hover:bg-red-500 text-white rounded-full transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white/30"
            title="Close Quiz"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Chat Interface - Takes remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isConnecting && (
              <div className="text-center text-gray-600 text-sm">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400/80 to-orange-500/80 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-orange-300 animate-pulse"></div>
                  <svg className="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Preparing Your Quiz</h3>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 text-left mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-orange-800">Extracting Chapter Content</h4>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    Analyzing <span className="font-semibold">{chapterName || 'chapter'}</span> content for {subjectName || 'subject'} quiz questions...
                  </p>
                  <div className="space-y-2 text-xs text-orange-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                      Processing PDF content and key concepts
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      Generating personalized quiz questions
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      Setting up interactive learning environment
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">This may take a few moments...</p>
              </div>
            )}

            {!isConnecting && messages.length === 0 && (
              <div className="text-center text-gray-600 text-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400/80 to-orange-500/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz Mode Ready</h3>
                <p className="text-gray-600 mb-4">Test your knowledge with interactive questions</p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-orange-800 mb-2">What to expect:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Interactive questions based on your current topic</li>
                    <li>• Immediate feedback on your answers</li>
                    <li>• Visual problem-solving with image uploads</li>
                    <li>• Adaptive difficulty based on your responses</li>
                  </ul>
                </div>
                <p className="text-xs text-gray-500 mt-4">Ask questions to begin your quiz</p>
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
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }`}
                >
                  {message.imageUrl && (
                    <div className="mb-2">
                      <img 
                        src={message.imageUrl} 
                        alt="Attached image" 
                        className="max-w-full h-auto max-h-48 rounded-lg object-contain"
                      />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">{formatTime(message.timestamp)}</p>
                </div>
              </motion.div>
            ))}
            
            {isAiTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gray-100 p-3 rounded-2xl text-gray-800 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Image ready to send</p>
                  <p className="text-xs text-gray-500">{selectedImage?.name}</p>
                  <p className="text-xs text-gray-400">
                    {(selectedImage?.size || 0 / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={removeSelectedImage}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Image Error */}
          {imageError && (
            <div className="p-4 border-t border-gray-200 bg-red-50">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 text-red-500">⚠️</div>
                <p className="text-sm text-red-600">{imageError}</p>
                <button
                  onClick={() => setImageError(null)}
                  className="ml-auto p-1 text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div 
            className={`p-4 border-t border-gray-200 bg-white transition-colors ${
              isDragOver ? 'bg-orange-50 border-orange-300' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={
                    isConnecting
                      ? "Preparing quiz environment..."
                      : !isConnected 
                        ? "Connecting..." 
                        : isDragOver 
                          ? "Drop image here..." 
                          : "Ask a quiz question or drag & drop an image..."
                  }
                  className={`w-full bg-gray-100 text-gray-800 border rounded-lg p-3 text-sm focus:outline-none focus:border-orange-500 transition-colors ${
                    isDragOver ? 'border-orange-400 bg-orange-50' : 
                    isConnecting ? 'border-orange-300 bg-orange-50' : 'border-gray-300'
                  }`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected || isConnecting}
                />
                {isDragOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-orange-100/80 rounded-lg border-2 border-dashed border-orange-400">
                    <div className="text-center">
                      <Image className="h-8 w-8 text-orange-500 mx-auto mb-1" />
                      <p className="text-sm text-orange-600 font-medium">Drop image here</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Image Upload Button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 ${
                  selectedImage 
                    ? 'bg-orange-200 text-orange-600 hover:bg-orange-300' 
                    : isConnecting
                      ? 'bg-orange-100 text-orange-400'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
                disabled={!isConnected || isConnecting}
                title={isConnecting ? "Preparing quiz..." : selectedImage ? "Change image" : "Attach image"}
              >
                <Image className="h-4 w-4" />
              </button>
              
              <button
                className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 ${
                  isConnecting
                    ? 'bg-orange-300/80 text-orange-100'
                    : 'bg-gradient-to-r from-orange-400/90 to-orange-500/90 text-white'
                }`}
                onClick={handleSendMessage}
                disabled={(!newMessage.trim() && !selectedImage) || !isConnected || isConnecting}
                title={isConnecting ? "Preparing quiz..." : selectedImage ? "Send image" : "Send message"}
              >
                {isConnecting ? (
                  <div className="w-4 h-4 border-2 border-orange-100 border-t-orange-400 rounded-full animate-spin"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            
            {/* Drag and drop hint */}
            {!selectedImage && !imageError && !isConnecting && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Tip: You can drag & drop images directly into the input area
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizChatbot;
