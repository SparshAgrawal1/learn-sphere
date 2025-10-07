import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, FileText, Layers } from 'lucide-react';
import ContentLoader from './ContentLoader';

interface SubTopic {
  id: string;
  title: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
}

interface ContentFrameProps {
  subtopicId: string;
  title: string;
  progress: number;
  subjectColor: string;
  contentUrl: string;
  pdfUrl?: string;
  isPdfMode: boolean;
  onToggleMode: () => void;
  onShowAssessment?: () => void;
  prevSubtopic?: SubTopic | null;
  nextSubtopic?: SubTopic | null;
  onNavigateSubtopic?: (subtopicId: string) => void;
}

const ContentFrame: React.FC<ContentFrameProps> = ({
  subtopicId,
  title,
  progress,
  subjectColor,
  contentUrl,
  pdfUrl,
  isPdfMode,
  onToggleMode,
  onShowAssessment,
  prevSubtopic,
  nextSubtopic,
  onNavigateSubtopic
}) => {
  // Reference to the iframe
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Cleanup narrations when component unmounts or content changes
  useEffect(() => {
    // Cleanup function to stop narrations when component unmounts or content changes
    return () => {
      // Stop any speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Stop any audio elements
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      
      // Call any global narration stop functions that might exist
      if (typeof window.stopNarration === 'function') {
        window.stopNarration();
      }
      
      // Stop any story narration
      if (typeof window.stopStoryNarration === 'function') {
        window.stopStoryNarration();
      }
    };
  }, [contentUrl, isPdfMode]);

  // Cleanup narrations when navigating between subtopics
  useEffect(() => {
    // Stop any ongoing narrations when subtopic changes
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Stop any audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    // Call any global narration stop functions that might exist
    if (typeof window.stopNarration === 'function') {
      window.stopNarration();
    }
    
    // Stop any story narration
    if (typeof window.stopStoryNarration === 'function') {
      window.stopStoryNarration();
    }
  }, [subtopicId]);
  
  // Create particles for background
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 20
  }));
  
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          opacity: 0.5
        }}
      />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `rgba(${parseInt(subjectColor.slice(1, 3), 16)}, ${parseInt(subjectColor.slice(3, 5), 16)}, ${parseInt(subjectColor.slice(5, 7), 16)}, 0.2)`,
          }}
          animate={{
            y: [0, -30, -10, -25, 0],
            x: [0, 20, -15, 5, 0],
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
      
      {/* 3D Floor Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at center bottom, 
              rgba(${parseInt(subjectColor.slice(1, 3), 16)}, ${parseInt(subjectColor.slice(3, 5), 16)}, ${parseInt(subjectColor.slice(5, 7), 16)}, 0.15) 0%, 
              rgba(${parseInt(subjectColor.slice(1, 3), 16)}, ${parseInt(subjectColor.slice(3, 5), 16)}, ${parseInt(subjectColor.slice(5, 7), 16)}, 0.08) 40%, 
              rgba(${parseInt(subjectColor.slice(1, 3), 16)}, ${parseInt(subjectColor.slice(3, 5), 16)}, ${parseInt(subjectColor.slice(5, 7), 16)}, 0.03) 70%,
              transparent 100%
            ),
            linear-gradient(180deg, 
              transparent 0%, 
              rgba(0, 0, 0, 0.1) 40%, 
              rgba(0, 0, 0, 0.2) 100%
            )
          `,
          transform: 'perspective(1000px) rotateX(75deg)',
          transformOrigin: 'center bottom'
        }}
      >
        {/* Enhanced Grid Pattern */}
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(${parseInt(subjectColor.slice(1, 3), 16)}, ${parseInt(subjectColor.slice(3, 5), 16)}, ${parseInt(subjectColor.slice(5, 7), 16)}, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${parseInt(subjectColor.slice(1, 3), 16)}, ${parseInt(subjectColor.slice(3, 5), 16)}, ${parseInt(subjectColor.slice(5, 7), 16)}, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Header */}
      <motion.div 
        className="absolute top-0 left-0 right-0 z-10 px-4 py-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          height: '48px' // Fixed height to prevent content from being cut off
        }}
      >
        <div className="flex items-center">
          <motion.div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 relative"
            style={{ 
              background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
              boxShadow: `0 0 15px ${subjectColor}60`
            }}
            animate={{ 
              boxShadow: [`0 0 10px ${subjectColor}40`, `0 0 20px ${subjectColor}60`, `0 0 10px ${subjectColor}40`] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Play className="h-3.5 w-3.5 text-white" />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ 
                border: `2px solid ${subjectColor}80`,
                opacity: 0.6
              }}
              animate={{ 
                scale: [1, 1.4, 1.8],
                opacity: [0.6, 0.2, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>
          
          <div>
            <motion.h3 
              className="text-sm font-bold text-white mb-0.5"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h3>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div 
                className="h-1.5 w-20 bg-black/30 rounded-full overflow-hidden mr-2"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
              >
                <motion.div 
                  className="h-full rounded-full"
                  style={{ 
                    background: `linear-gradient(to right, ${subjectColor}, ${subjectColor}90)`,
                    boxShadow: `0 0 8px ${subjectColor}40` 
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                />
              </div>
              <span className="text-xs text-white/90 font-medium">
                {progress}% complete
              </span>
            </motion.div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Mode toggle switch */}
          <motion.div 
            className="hidden md:flex bg-black/30 backdrop-blur-md p-0.5 rounded-lg border border-white/10 mr-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.button
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                !isPdfMode ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/80'
              }`}
              onClick={() => !isPdfMode || onToggleMode()}
              whileHover={isPdfMode ? { backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
              whileTap={isPdfMode ? { scale: 0.95 } : {}}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Interactive</span>
            </motion.button>
            
            <motion.button
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                isPdfMode ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/80'
              }`}
              onClick={() => isPdfMode || onToggleMode()}
              whileHover={!isPdfMode ? { backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
              whileTap={!isPdfMode ? { scale: 0.95 } : {}}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>PDF</span>
            </motion.button>
          </motion.div>
          
          {/* Navigation buttons */}
          <div className="hidden md:flex gap-1.5">
            <motion.button
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              disabled={!prevSubtopic || prevSubtopic.isLocked}
              onClick={() => prevSubtopic && !prevSubtopic.isLocked && onNavigateSubtopic && onNavigateSubtopic(prevSubtopic.id)}
              style={{ opacity: (!prevSubtopic || prevSubtopic.isLocked) ? 0.5 : 1 }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </motion.button>
            
            <motion.button
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              disabled={!nextSubtopic || nextSubtopic.isLocked}
              onClick={() => nextSubtopic && !nextSubtopic.isLocked && onNavigateSubtopic && onNavigateSubtopic(nextSubtopic.id)}
              style={{ opacity: (!nextSubtopic || nextSubtopic.isLocked) ? 0.5 : 1 }}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.button>
          </div>
          
          {/* Mobile mode toggle */}
          <motion.button
            className="md:hidden w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleMode}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {isPdfMode ? <Layers className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
          </motion.button>
          
          {progress > 0 && onShowAssessment && !isPdfMode && (
            <motion.button
              onClick={onShowAssessment}
              className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
              style={{
                background: `linear-gradient(135deg, ${subjectColor}90, ${subjectColor}70)`,
                boxShadow: `0 2px 8px ${subjectColor}40`,
                border: `1px solid ${subjectColor}50`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 3px 12px ${subjectColor}50`
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-xs">?</span>
              <span>Test Knowledge</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Content Frame */}
      <div 
        className="flex-grow mt-12 z-10 relative"
        style={{ 
          boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)'
        }}
      >
        {isPdfMode ? (
          <ContentLoader
            contentPath={pdfUrl || contentUrl.replace('.html', '-pdf.html')}
          />
        ) : (
          <ContentLoader
            contentPath={contentUrl}
          />
        )}
      </div>
    </div>
  );
};

export default ContentFrame;