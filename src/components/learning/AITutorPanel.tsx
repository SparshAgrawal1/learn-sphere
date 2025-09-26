import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, BrainCog, Sparkles, ArrowRight, LightbulbIcon } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

interface AITutorPanelProps {
  messages: Message[];
  newMessage: string;
  isAiTyping: boolean;
  onSendMessage: () => void;
  onMessageChange: (message: string) => void;
  subtopicTitle: string;
  themeColor: {
    accent: string;
    bg: string;
  };
  isMobile?: boolean;
  onClose?: () => void;
}

const AITutorPanel: React.FC<AITutorPanelProps> = ({
  messages,
  newMessage,
  isAiTyping,
  onSendMessage,
  onMessageChange,
  subtopicTitle,
  themeColor,
  isMobile,
  onClose
}) => {
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Create particles for background
  const [particles, setParticles] = useState<Array<{id: number, size: number, x: number, y: number, delay: number}>>([]);
  
  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      size: 2 + Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10
    }));
    
    setParticles(newParticles);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiTyping]);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };
  
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
  
  // Helper function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col gap-3 p-3 overflow-auto">
      {/* AI Tutor Card */}
      <motion.div 
        className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 p-4 relative overflow-hidden"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          minHeight: '48px' // Ensure minimum height for header
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setMinimized(!minimized)}
      >
        {/* Accent light */}
        <div 
          className="absolute top-0 left-0 right-0 h-20 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 100% 60% at center top, rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.2), transparent)`,
            filter: 'blur(10px)'
          }}
        />
        
        {/* Floating particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.2)`,
            }}
            animate={{
              y: [0, -15, -5, -10, 0],
              x: [0, 10, -5, 3, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
        
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
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ 
                border: `2px solid ${themeColor.accent}80`,
                opacity: 0.6
              }}
              animate={{ 
                scale: [1, 1.2, 1.4],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>
          
          <div>
            <h3 className="font-semibold text-xs text-white">AI Learning Assistant</h3>
            <p className="text-xs text-white/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span>Active • {subtopicTitle}</span>
            </p>
          </div>
          
          {/* Minimize/Maximize button */}
          <button 
            className="ml-auto w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
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
              className="flex-1 overflow-y-auto p-4 space-y-3 relative"
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
                    I'm your AI tutor for this topic. Ask questions about concepts, request examples, or get help with problems.
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
                          onMessageChange(q);
                          setTimeout(() => onSendMessage(), 100);
                        }}
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
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-white border-none p-1.5 text-xs focus:outline-none resize-none max-h-20"
                  value={newMessage}
                  onChange={(e) => onMessageChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  style={{
                    minHeight: '32px',
                  }}
                />
                <motion.button
                  style={{
                    background: `linear-gradient(135deg, ${themeColor.accent}, ${themeColor.accent}90)`,
                    boxShadow: `0 4px 12px ${themeColor.accent}40`
                  }}
                  className="h-8 w-8 rounded-lg flex items-center justify-center transition-all"
                  onClick={onSendMessage}
                  disabled={!newMessage.trim()}
                  whileHover={{ scale: 1.05, boxShadow: `0 6px 15px ${themeColor.accent}50` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
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
                        onMessageChange(q);
                        setTimeout(() => onSendMessage(), 100);
                      }}
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

export default AITutorPanel;