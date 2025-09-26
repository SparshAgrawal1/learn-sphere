import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, Lock, CheckCircle, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubTopic {
  id: string;
  title: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
}

interface Topic {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  subtopics: SubTopic[];
  description: string;
}

interface ModernNavigationPanelProps {
  topic: Topic;
  activeSubtopicId: string | null;
  onSubtopicClick: (subtopicId: string) => void;
  onShowAssessment: () => void;
  isMobile: boolean;
  onClose?: () => void;
}

const ModernNavigationPanel: React.FC<ModernNavigationPanelProps> = ({
  topic,
  activeSubtopicId,
  onSubtopicClick,
  onShowAssessment,
  isMobile,
  onClose
}) => {
  // Calculate overall progress
  const overallProgress = topic.subtopics.reduce((sum, subtopic) => {
    return sum + (subtopic.isCompleted ? 100 : subtopic.progress);
  }, 0) / topic.subtopics.length;
  
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

  // Get subtopic icon based on its status
  const getSubtopicIcon = (subtopic: SubTopic) => {
    if (subtopic.isLocked) return <Lock className="h-3 w-3 text-white/50" />;
    if (subtopic.isCompleted) return <CheckCircle className="h-3 w-3 text-green-400" />;
    return <Play className="h-3 w-3 text-white" />;
  };
  
  // Calculate accent RGB values for styling
  const accentRGB = {
    r: parseInt(topic.subjectColor.slice(1, 3), 16),
    g: parseInt(topic.subjectColor.slice(3, 5), 16),
    b: parseInt(topic.subjectColor.slice(5, 7), 16)
  };

  return (
    <div className="h-full flex flex-col gap-3 p-3 overflow-auto">
      {/* Course Info Card */}
      <motion.div 
        className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 p-4 relative overflow-hidden"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
        
        <Link 
          to="/dashboard" 
          className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors mb-4 group"
        >
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ChevronLeft className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-medium">Back to Dashboard</span>
        </Link>
        
        <div className="flex items-center gap-3 mb-3">
          <motion.div 
            className="w-10 h-10 rounded-xl flex items-center justify-center relative"
            style={{ 
              background: `linear-gradient(135deg, ${topic.subjectColor}, ${topic.subjectColor}80)`,
              boxShadow: `0 0 15px ${topic.subjectColor}40`
            }}
            animate={{ 
              boxShadow: [`0 0 10px ${topic.subjectColor}30`, `0 0 20px ${topic.subjectColor}50`, `0 0 10px ${topic.subjectColor}30`] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <BookOpen className="h-5 w-5 text-white" />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ 
                border: `2px solid ${topic.subjectColor}80`,
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
            <h2 className="text-sm font-bold text-white mb-0.5">{topic.title}</h2>
            <p className="text-xs text-white/70">{topic.description}</p>
          </div>
        </div>
        
        {/* Overall progress */}
        <div className="mt-3 bg-black/20 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/80">Overall Progress</span>
            <motion.span 
              className="text-white font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {Math.round(overallProgress)}%
            </motion.span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${topic.subjectColor}, ${topic.subjectColor}80)`,
                boxShadow: `0 0 10px ${topic.subjectColor}40`
              }}
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
        
        <div className="mt-2 flex justify-between text-[10px] text-white/60">
          <span>Started</span>
          <span>In Progress</span>
          <span>Complete</span>
        </div>
      </motion.div>
      
      {/* Learning Path Card */}
      <motion.div 
        className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 p-4 flex-grow relative overflow-hidden"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5" />
          Learning Path
        </h3>
        
        <div className="space-y-2">
          {topic.subtopics.map((subtopic, index) => (
            <motion.div
              key={subtopic.id}
              className={`p-3 rounded-xl cursor-pointer transition-all relative ${
                activeSubtopicId === subtopic.id 
                  ? 'bg-white/15 border border-white/20' 
                  : 'bg-black/40 border border-white/5 hover:bg-black/60'
              } ${subtopic.isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={() => !subtopic.isLocked && onSubtopicClick(subtopic.id)}
              whileHover={!subtopic.isLocked ? { scale: 1.02, y: -2 } : {}}
              whileTap={!subtopic.isLocked ? { scale: 0.98 } : {}}
              style={{
                boxShadow: activeSubtopicId === subtopic.id ? `0 8px 20px rgba(0,0,0,0.3), 0 0 0 1px ${topic.subjectColor}40` : ''
              }}
            >
              {/* Connecting line between topics */}
              {index > 0 && !subtopic.isLocked && (
                <div 
                  className="absolute top-0 left-6 w-0.5 h-3 -mt-3"
                  style={{
                    background: `linear-gradient(to bottom, ${topic.subjectColor}40, ${topic.subjectColor}10)`
                  }}
                />
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div 
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      activeSubtopicId === subtopic.id 
                        ? 'bg-gradient-to-br from-white/20 to-white/5' 
                        : 'bg-black/60'
                    }`}
                    style={{
                      boxShadow: activeSubtopicId === subtopic.id ? `0 0 15px ${topic.subjectColor}30` : '',
                      border: activeSubtopicId === subtopic.id ? `1px solid ${topic.subjectColor}40` : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {getSubtopicIcon(subtopic)}
                  </div>
                  <span className="text-xs text-white font-medium">{subtopic.title}</span>
                </div>
                
                {!subtopic.isLocked && (
                  <div className="flex items-center">
                    <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden mr-1.5">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${subtopic.progress}%`,
                          backgroundColor: subtopic.isCompleted ? '#10B981' : topic.subjectColor
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${subtopic.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    <span className="text-[10px] text-white/70">{subtopic.progress}%</span>
                  </div>
                )}
              </div>
              
              {/* Status indicator */}
              {subtopic.isCompleted && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                  <CheckCircle className="h-2.5 w-2.5" />
                  <span>Completed</span>
                </div>
              )}
              {subtopic.isLocked && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
                  <Lock className="h-2.5 w-2.5" />
                  <span>Locked</span>
                </div>
              )}
              {!subtopic.isCompleted && !subtopic.isLocked && subtopic.progress > 0 && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                  <Play className="h-2.5 w-2.5" />
                  <span>In Progress</span>
                </div>
              )}
              {!subtopic.isCompleted && !subtopic.isLocked && subtopic.progress === 0 && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
                  <Star className="h-2.5 w-2.5" />
                  <span>Not Started</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Assessment Button */}
        {topic.subtopics.some(st => st.progress > 0) && (
          <motion.button
            className="w-full mt-4 p-3 rounded-xl text-white flex items-center justify-center gap-2 relative overflow-hidden"
            onClick={onShowAssessment}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: `linear-gradient(135deg, ${topic.subjectColor}90, ${topic.subjectColor}70)`,
              boxShadow: `0 8px 20px rgba(0,0,0,0.2), 0 0 0 1px ${topic.subjectColor}40`
            }}
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                `
              }}
            />
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <span className="text-xs font-medium">Test Your Knowledge</span>
          </motion.button>
        )}
      </motion.div>
      
      {/* Subject Info Card */}
      <motion.div 
        className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 p-3"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${topic.subjectColor}, ${topic.subjectColor}80)`,
              boxShadow: `0 4px 10px ${topic.subjectColor}30`
            }}
          >
            <span className="text-white font-bold text-xs">{topic.subjectName.charAt(0)}</span>
          </div>
          <div>
            <div className="text-xs font-medium text-white">{topic.subjectName}</div>
            <div className="text-[10px] text-white/60">9th Grade • Core Curriculum</div>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <motion.button
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center z-20"
          onClick={onClose}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ModernNavigationPanel;