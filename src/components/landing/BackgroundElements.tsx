import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundElementsProps {
  activeSubject: string;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ activeSubject }) => {
  // Get color based on active subject
  const getColor = () => {
    switch (activeSubject) {
      case 'mathematics':
        return '#10B981';
      case 'science':
        return '#F59E0B';
      case 'english':
        return '#8B5CF6';
      case 'social':
        return '#EF4444';
      case 'hindi':
        return '#06B6D4';
      case 'sanskrit':
        return '#EC4899';
      default:
        return '#3B82F6';
    }
  };

  // Get subject-specific elements
  const getSubjectElements = () => {
    switch (activeSubject) {
      case 'mathematics':
        return (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`math-symbol-${i}`}
                className="absolute text-emerald-500/10 font-bold text-6xl md:text-8xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  opacity: 0.07 + Math.random() * 0.05,
                  transform: `rotate(${Math.random() * 30 - 15}deg)`,
                }}
              >
                {['π', '∑', '∫', '√', '∞', 'θ', 'Δ', '≈', '≠', 'x²', '÷', '±'][Math.floor(Math.random() * 12)]}
              </motion.div>
            ))}
          </>
        );
      case 'science':
        return (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`atom-${i}`}
                className="absolute"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  opacity: 0.1,
                }}
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-amber-500/10 animate-spin" style={{ animationDuration: '8s' }}></div>
                  <div className="absolute inset-0 rounded-full border-2 border-amber-500/10 animate-spin" style={{ animationDuration: '12s', transform: 'rotate(60deg)' }}></div>
                  <div className="absolute inset-0 rounded-full border-2 border-amber-500/10 animate-spin" style={{ animationDuration: '10s', transform: 'rotate(120deg)' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 bg-amber-500/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </motion.div>
            ))}
          </>
        );
      case 'english':
        return (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`letter-${i}`}
                className="absolute text-violet-500/10 font-serif text-4xl md:text-6xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  opacity: 0.08 + Math.random() * 0.04,
                  transform: `rotate(${Math.random() * 30 - 15}deg)`,
                }}
              >
                {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
              </motion.div>
            ))}
            <motion.div 
              className="absolute top-1/4 left-1/4 text-violet-500/5 font-serif text-8xl md:text-9xl"
              style={{
                opacity: 0.05,
              }}
            >
              " "
            </motion.div>
          </>
        );
      case 'social':
        return (
          <>
            <svg className="absolute top-1/4 left-1/4 w-1/2 h-1/2 text-red-500/5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10,50 Q25,20 50,50 T90,50" 
                stroke="currentColor" 
                strokeWidth="0.5"
              />
              <path 
                d="M20,30 Q40,60 60,30 T90,40" 
                stroke="currentColor" 
                strokeWidth="0.5"
              />
              <path 
                d="M15,70 Q35,40 55,70 T95,60" 
                stroke="currentColor" 
                strokeWidth="0.5"
              />
            </svg>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`landmark-${i}`}
                className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full border border-red-500/10 flex items-center justify-center"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  opacity: 0.2,
                }}
              >
                <div className="w-2 h-2 bg-red-500/20 rounded-full"></div>
              </motion.div>
            ))}
          </>
        );
      case 'hindi':
        return (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`hindi-char-${i}`}
                className="absolute text-cyan-500/10 font-bold text-5xl md:text-7xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  opacity: 0.08 + Math.random() * 0.04,
                  transform: `rotate(${Math.random() * 30 - 15}deg)`,
                }}
              >
                {['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'च'][Math.floor(Math.random() * 15)]}
              </motion.div>
            ))}
          </>
        );
      case 'sanskrit':
        return (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-1/3 h-1/3 rounded-full border border-pink-500/5"
                style={{
                  opacity: 0.1,
                }}
              ></motion.div>
            </div>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`sanskrit-symbol-${i}`}
                className="absolute text-pink-500/10 font-bold text-5xl md:text-7xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  opacity: 0.08 + Math.random() * 0.04,
                  transform: `rotate(${Math.random() * 30 - 15}deg)`,
                }}
              >
                {['ॐ', '॥', '꣸', '꣹', '꣺', 'ꣻ', '꣼', 'ꣽ', 'ꣾ', 'ꣿ', '॰', '꣠'][Math.floor(Math.random() * 12)]}
              </motion.div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subject-specific background elements */}
      {getSubjectElements()}
      
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${getColor()}20 0%, transparent 70%)`,
        }}
      />
      
      {/* Subtle diagonal lines */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${getColor()}, ${getColor()} 1px, transparent 1px, transparent 10px)`,
        }}
      />
    </div>
  );
};

export default BackgroundElements;



