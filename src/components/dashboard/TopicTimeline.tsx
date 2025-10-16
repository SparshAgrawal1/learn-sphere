import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Subject, Chapter, Topic } from '@/data/curriculum';
import { ChevronRight, CheckCircle, Circle, Play, BookOpen, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopicTimelineProps {
  subject: Subject;
  activeChapterId?: string;
  setActiveChapterId?: (id: string) => void;
}

const TopicTimeline: React.FC<TopicTimelineProps> = ({
  subject,
  activeChapterId,
  setActiveChapterId
}) => {
  // If no active chapter is set, default to the first chapter
  const effectiveActiveChapterId = activeChapterId || subject.chapters[0]?.id;
  
  // Get the active chapter
  const activeChapter = subject.chapters.find(chapter => chapter.id === effectiveActiveChapterId);
  
  // Scroll state management
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleChapterClick = (chapterId: string) => {
    if (setActiveChapterId) {
      setActiveChapterId(chapterId);
    }
  };

  // Check scroll state
  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const threshold = 5; // Add small threshold for better detection
      setCanScrollUp(scrollTop > threshold);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - threshold);
    }
  };

  // Scroll functions
  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -150, behavior: 'smooth' });
      setTimeout(checkScrollState, 300); // Check state after scroll animation
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 150, behavior: 'smooth' });
      setTimeout(checkScrollState, 300); // Check state after scroll animation
    }
  };

  // Set up scroll event listener and initial check
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        checkScrollState();
      };
      
      // Initial check
      setTimeout(checkScrollState, 50);
      
      container.addEventListener('scroll', handleScroll, { passive: true });
      
      // Also check on resize
      const handleResize = () => {
        setTimeout(checkScrollState, 50);
      };
      window.addEventListener('resize', handleResize);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [activeChapter]);

  // Check scroll state when content changes with multiple checks
  useEffect(() => {
    const timeouts = [50, 150, 300, 500].map(delay => 
      setTimeout(checkScrollState, delay)
    );
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [activeChapter]);

  // If subject has no chapters, show a coming soon message
  if (!subject.chapters || subject.chapters.length === 0) {
    return (
      <div className="space-y-3">
        {/* Compact Learning Path Header */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="backdrop-blur-xl bg-black/40 rounded-full px-4 py-2 border border-white/20 flex items-center gap-3"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
            <BookOpen size={12} className="text-white" />
          </div>
          <span className="text-white text-sm font-medium">{subject.name}</span>
          <div className="flex items-center gap-1 ml-auto text-xs text-white/60">
            <span>Coming Soon</span>
          </div>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-black/40 rounded-xl p-6 border border-white/20 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
            <subject.icon size={24} className="text-white" />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">{subject.name} Content</h3>
          <p className="text-white/70 text-sm mb-4">
            Exciting {subject.name.toLowerCase()} lessons are being prepared for you!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30">
            <Clock size={14} className="text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Coming Soon</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Compact Learning Path Header */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-xl bg-black/40 rounded-full px-4 py-2 border border-white/20 flex items-center gap-3"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
          <BookOpen size={12} className="text-white" />
        </div>
        <span className="text-white text-sm font-medium">{subject.name}</span>
        <div className="flex items-center gap-1 ml-auto text-xs text-white/60">
          <span>{activeChapter?.topics.filter(t => t.completed).length || 0}/{activeChapter?.topics.length || 0}</span>
          <CheckCircle size={10} />
        </div>
      </motion.div>

      {/* Compact Chapter Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {subject.chapters.map((chapter) => (
          <motion.button
            key={chapter.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => handleChapterClick(chapter.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              chapter.id === effectiveActiveChapterId 
                ? 'bg-orange-500/30 border border-orange-500/50 text-orange-300' 
                : 'bg-black/30 border border-white/20 text-white/70 hover:bg-black/40 hover:text-white'
            }`}
          >
            {chapter.name}
          </motion.button>
        ))}
      </div>

      {/* Enhanced Topic Cards */}
      {activeChapter && (
        <div className="space-y-3">
          {activeChapter.topics.map((topic, index) => {
            const isCompleted = topic.completed;
            const isInProgress = topic.progress > 0 && !isCompleted;
            const statusColor = isCompleted ? '#10B981' : isInProgress ? '#FF8C00' : '#6B7280';
            const statusGradient = isCompleted 
              ? 'from-green-500/30 to-emerald-500/10' 
              : isInProgress 
                ? 'from-orange-500/30 to-yellow-500/10'
                : 'from-gray-500/20 to-gray-600/10';
            
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`backdrop-blur-xl bg-gradient-to-r ${statusGradient} rounded-2xl p-3 border border-white/20 hover:border-white/30 transition-all duration-300 group hover:scale-[1.01] shadow-lg`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{ 
                        background: `linear-gradient(135deg, ${statusColor}60, ${statusColor}40)`,
                        boxShadow: `0 4px 12px ${statusColor}30`
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle size={14} style={{ color: statusColor }} />
                      ) : (
                        <Play size={12} style={{ color: statusColor }} />
                      )}
                      
                      {/* Animated pulse for in-progress */}
                      {isInProgress && (
                        <motion.div 
                          className="absolute inset-0 rounded-xl"
                          style={{ 
                            background: `radial-gradient(circle, ${statusColor}40 0%, transparent 70%)`
                          }}
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Topic number badge */}
                    <div 
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black/50 flex items-center justify-center text-xs font-bold"
                      style={{ 
                        backgroundColor: statusColor,
                        color: 'white'
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-semibold truncate">{topic.name}</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ 
                            backgroundColor: statusColor + '30',
                            color: statusColor
                          }}
                        >
                          {topic.progress}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Progress Visualization */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
                          <motion.div 
                            className="h-full rounded-full relative"
                            style={{ 
                              background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${topic.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          >
                            {/* Animated shine effect */}
                            <motion.div 
                              className="absolute inset-0 rounded-full"
                              style={{ 
                                background: `linear-gradient(90deg, transparent 0%, ${statusColor}60 50%, transparent 100%)`
                              }}
                              animate={{ 
                                x: ['-100%', '100%']
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                delay: index * 0.3
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Time estimate with icon */}
                      <div className="flex items-center gap-1 text-white/60">
                        <Clock size={10} />
                        <span className="text-xs">{Math.floor(Math.random() * 15 + 5)}m</span>
                      </div>
                    </div>
                    
                    {/* Status and Action Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: statusColor }}
                          animate={{ 
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: index * 0.1
                          }}
                        />
                        <span 
                          className="text-xs font-medium"
                          style={{ color: statusColor }}
                        >
                          {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                      
                      <Link 
                        to={`/learn/${encodeURIComponent(subject.id)}/${encodeURIComponent(activeChapter.id)}/${encodeURIComponent(topic.id)}`}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/10 border border-orange-500/30 text-orange-300 text-xs font-medium hover:from-orange-500/30 hover:to-red-500/20 transition-all duration-300 group-hover:scale-105"
                      >
                        <span>{isCompleted ? 'Review' : 'Start'}</span>
                        <ChevronRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};


export default TopicTimeline;