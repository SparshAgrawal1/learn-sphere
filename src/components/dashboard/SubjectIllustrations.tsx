import React from 'react';
import { motion } from 'framer-motion';

interface SubjectIllustrationsProps {
  subjectId: string;
  isVisible: boolean;
}

const SubjectIllustrations: React.FC<SubjectIllustrationsProps> = ({ 
  subjectId,
  isVisible
}) => {
  // Return the appropriate illustration based on subject ID
  switch (subjectId) {
    case 'mathematics':
      return <MathematicsIllustration isVisible={isVisible} />;
    case 'science':
      return <ScienceIllustration isVisible={isVisible} />;
    case 'english':
      return <EnglishIllustration isVisible={isVisible} />;
    case 'social':
      return <SocialScienceIllustration isVisible={isVisible} />;
    case 'hindi':
      return <HindiIllustration isVisible={isVisible} />;
    case 'sanskrit':
      return <SanskritIllustration isVisible={isVisible} />;
    default:
      return null;
  }
};

interface IllustrationProps {
  isVisible: boolean;
}

const MathematicsIllustration: React.FC<IllustrationProps> = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Mathematical Symbols */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-[15%] left-[15%] text-emerald-500 text-4xl font-bold"
      >
        π
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: isVisible ? 0.2 : 0,
          rotate: isVisible ? 360 : 0
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[25%] right-[20%] text-emerald-400 text-5xl font-bold"
      >
        ∑
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.25 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-[30%] left-[25%] text-emerald-300 text-3xl font-bold"
      >
        ∞
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.2 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-[40%] left-[35%] text-emerald-600 text-4xl font-bold"
      >
        √
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.15 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-[20%] right-[30%] text-emerald-500 text-5xl font-bold"
      >
        ∫
      </motion.div>
      
      {/* Grid Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

const ScienceIllustration: React.FC<IllustrationProps> = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Atom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 0.3 : 0,
          scale: isVisible ? 1 : 0.8,
          rotate: isVisible ? 360 : 0
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-[20%] left-[20%] w-24 h-24"
      >
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 transform rotate-0"></div>
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 transform rotate-45"></div>
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 transform rotate-90"></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-amber-500/40 transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
      
      {/* DNA Helix */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 0.3 : 0,
          y: isVisible ? 0 : -20
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[15%] right-[25%] w-8 h-64"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <React.Fragment key={i}>
            <div 
              className="absolute w-8 h-1 bg-amber-400/30 rounded-full"
              style={{ top: `${i * 10}%`, transform: `rotate(${i % 2 ? 45 : -45}deg)` }}
            ></div>
            <div 
              className="absolute w-2 h-2 rounded-full bg-amber-500/40"
              style={{ 
                top: `${i * 10}%`, 
                left: i % 2 ? '0' : 'calc(100% - 0.5rem)',
              }}
            ></div>
          </React.Fragment>
        ))}
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-amber-400/0 via-amber-400/30 to-amber-400/0 transform -translate-x-1/2"></div>
      </motion.div>
      
      {/* Molecular Structure */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.25 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-[20%] left-[30%]"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-amber-500/40"
            style={{ 
              top: `${Math.sin(i * Math.PI / 2.5) * 40}px`,
              left: `${Math.cos(i * Math.PI / 2.5) * 40}px`,
            }}
          ></div>
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-16 h-0.5 bg-amber-400/30 rounded-full origin-center"
            style={{ 
              top: `${Math.sin(i * Math.PI / 2.5) * 20}px`,
              left: `${Math.cos(i * Math.PI / 2.5) * 20}px`,
              transform: `rotate(${i * 72}deg)`,
            }}
          ></div>
        ))}
      </motion.div>
      
      {/* Wave Pattern */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: isVisible ? 0.2 : 0,
          x: isVisible ? 0 : -50
        }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-[25%] right-[20%] w-40 h-20"
      >
        <svg width="100%" height="100%" viewBox="0 0 200 100">
          <path
            d="M0,50 C20,20 40,80 60,50 C80,20 100,80 120,50 C140,20 160,80 180,50 C200,20 220,80 240,50"
            fill="none"
            stroke="rgba(245, 158, 11, 0.3)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </div>
  );
};

const EnglishIllustration: React.FC<IllustrationProps> = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Open Book */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 0.3 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.8 }}
        className="absolute top-[15%] left-[25%] w-40 h-24"
      >
        <div className="absolute inset-x-0 bottom-0 h-2 bg-violet-500/30 rounded"></div>
        <div className="absolute left-0 bottom-2 w-[calc(50%-1px)] h-20 bg-violet-500/20 rounded-tl-lg"></div>
        <div className="absolute right-0 bottom-2 w-[calc(50%-1px)] h-20 bg-violet-500/20 rounded-tr-lg"></div>
        <div className="absolute inset-x-0 bottom-2 w-0.5 h-20 bg-violet-500/40 left-1/2 transform -translate-x-1/2"></div>
        
        {/* Text Lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <React.Fragment key={i}>
            <div 
              className="absolute h-0.5 bg-violet-500/30 rounded"
              style={{ 
                width: '40%', 
                top: `${6 + i * 4}px`, 
                left: '5%' 
              }}
            ></div>
            <div 
              className="absolute h-0.5 bg-violet-500/30 rounded"
              style={{ 
                width: '40%', 
                top: `${6 + i * 4}px`, 
                right: '5%' 
              }}
            ></div>
          </React.Fragment>
        ))}
      </motion.div>
      
      {/* Floating Letters */}
      {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letter, i) => (
        <motion.div
          key={letter}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: isVisible ? 0.3 - (i * 0.03) : 0,
            y: isVisible ? [-5, 5, -5][i % 3] : 0
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: i * 0.1 },
            y: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.2 }
          }}
          className="absolute text-2xl font-serif text-violet-400"
          style={{ 
            top: `${20 + (i * 10)}%`,
            left: `${65 + (i % 3) * 10}%`,
          }}
        >
          {letter}
        </motion.div>
      ))}
      
      {/* Quill Pen */}
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ 
          opacity: isVisible ? 0.3 : 0,
          rotate: isVisible ? 0 : -30
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-[30%] right-[20%] w-24 h-24"
      >
        <div className="absolute bottom-0 right-0 w-1 h-16 bg-gradient-to-t from-violet-600/40 to-violet-400/40 transform rotate-45"></div>
        <div className="absolute bottom-16 right-1 w-6 h-8 bg-violet-400/30 transform rotate-45 rounded-t-full"></div>
      </motion.div>
      
      {/* Quotes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.25 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute top-[40%] left-[20%] text-4xl text-violet-500/30 font-serif"
      >
        "
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.25 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute top-[40%] left-[30%] text-4xl text-violet-500/30 font-serif"
      >
        "
      </motion.div>
    </div>
  );
};

const SocialScienceIllustration: React.FC<IllustrationProps> = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Globe */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: isVisible ? 0.3 : 0,
          rotate: isVisible ? 360 : 0
        }}
        transition={{ 
          opacity: { duration: 0.8 },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-[20%] left-[25%] w-32 h-32"
      >
        <div className="absolute inset-0 rounded-full border-2 border-red-500/30"></div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 rounded-full border-2 border-red-500/20"
            style={{ transform: `rotate(${i * 45}deg)` }}
          ></div>
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-0.5 bg-red-500/20"
            style={{ top: `${25 + i * 25}%` }}
          ></div>
        ))}
      </motion.div>
      
      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: isVisible ? 0.3 : 0,
          scaleX: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[30%] right-[20%] w-48 h-1 bg-gradient-to-r from-red-500/40 to-red-500/20 origin-left"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 w-2 h-2 rounded-full bg-red-500/40 transform -translate-y-1/2"
            style={{ left: `${i * 25}%` }}
          ></div>
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-0.5 h-3 bg-red-500/30 transform -translate-x-1/2"
            style={{ 
              left: `${(i + 1) * 25}%`,
              top: i % 2 === 0 ? '-300%' : '100%'
            }}
          ></div>
        ))}
      </motion.div>
      
      {/* Map Outlines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.2 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-[25%] left-[20%]"
      >
        <svg width="120" height="80" viewBox="0 0 120 80">
          <path
            d="M20,20 C30,10 50,15 60,20 C70,25 80,15 90,25 C100,35 110,30 100,50 C90,70 70,60 50,65 C30,70 10,60 20,40 Z"
            fill="none"
            stroke="rgba(239, 68, 68, 0.3)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      
      {/* Building/Monument */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 0.25 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-[20%] right-[25%]"
      >
        <div className="w-16 h-24 flex flex-col items-center">
          <div className="w-8 h-8 bg-red-500/20 transform rotate-45 translate-y-1/2"></div>
          <div className="w-2 h-16 bg-red-500/30"></div>
          <div className="w-12 h-1 bg-red-500/30"></div>
          <div className="w-16 h-6 bg-red-500/20"></div>
        </div>
      </motion.div>
    </div>
  );
};

const HindiIllustration: React.FC<IllustrationProps> = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Hindi Characters */}
      {['अ', 'क', 'ग', 'च', 'ज', 'त', 'द', 'न', 'प', 'म'].map((char, i) => (
        <motion.div
          key={char + i}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: isVisible ? 0.3 - (i * 0.02) : 0,
            y: isVisible ? [-10, 10, -5, 5, 0][i % 5] : 0
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: i * 0.1 },
            y: { duration: 4 + (i % 3), repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.2 }
          }}
          className="absolute text-2xl font-hindi text-cyan-400"
          style={{ 
            top: `${15 + (i * 7)}%`,
            left: `${15 + ((i * 13) % 70)}%`,
          }}
        >
          {char}
        </motion.div>
      ))}
      
      {/* Flowing River Pattern */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: isVisible ? 0.2 : 0,
          x: isVisible ? 0 : -50
        }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-0 right-0 h-20 transform -translate-y-1/2"
      >
        <svg width="100%" height="100%" viewBox="0 0 800 100">
          <path
            d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50"
            fill="none"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="3"
          />
          <path
            d="M0,30 C100,0 200,60 300,30 C400,0 500,60 600,30 C700,0 800,60 900,30"
            fill="none"
            stroke="rgba(6, 182, 212, 0.15)"
            strokeWidth="2"
          />
          <path
            d="M0,70 C100,40 200,100 300,70 C400,40 500,100 600,70 C700,40 800,100 900,70"
            fill="none"
            stroke="rgba(6, 182, 212, 0.15)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      
      {/* Traditional Symbols */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 0.3 : 0,
          scale: isVisible ? 1 : 0.8,
          rotate: isVisible ? 360 : 0
        }}
        transition={{ 
          opacity: { duration: 0.5, delay: 0.3 },
          scale: { duration: 0.5, delay: 0.3 },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-[20%] right-[20%] w-16 h-16"
      >
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20"></div>
        <div className="absolute inset-2 rounded-full border-2 border-cyan-500/20"></div>
        <div className="absolute inset-4 rounded-full border-2 border-cyan-500/20"></div>
        <div className="absolute inset-6 rounded-full bg-cyan-500/10"></div>
      </motion.div>
    </div>
  );
};

const SanskritIllustration: React.FC<IllustrationProps> = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Sanskrit Characters */}
      {['ॐ', 'स', 'क', 'ल', 'म', 'न', 'व', 'ष', 'ह', 'ज्ञ'].map((char, i) => (
        <motion.div
          key={char + i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isVisible ? 0.3 - (i * 0.02) : 0,
            scale: isVisible ? 1 : 0.8,
            rotate: isVisible ? [0, 5, -5, 0][i % 4] : 0
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: i * 0.1 },
            scale: { duration: 0.5, delay: i * 0.1 },
            rotate: { duration: 5 + i, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          }}
          className="absolute text-2xl font-sanskrit text-pink-400"
          style={{ 
            top: `${20 + ((i * 11) % 50)}%`,
            left: `${20 + ((i * 15) % 60)}%`,
          }}
        >
          {char}
        </motion.div>
      ))}
      
      {/* Mandala Pattern */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: isVisible ? 0.15 : 0,
          rotate: isVisible ? 360 : 0
        }}
        transition={{ 
          opacity: { duration: 0.8 },
          rotate: { duration: 120, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute inset-0 rounded-full border-2 border-pink-500/15"></div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-0.5 bg-pink-500/10 origin-center"
            style={{ transform: `translateY(-50%) rotate(${i * 22.5}deg)` }}
          ></div>
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 rounded-full border border-pink-500/10"
            style={{ transform: `scale(${0.75 - i * 0.25})` }}
          ></div>
        ))}
        
        {/* Decorative Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-pink-500/20"
            style={{ 
              top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`,
              left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        ))}
      </motion.div>
      
      {/* Sun Symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 0.25 : 0,
          scale: isVisible ? 1 : 0.8
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-[15%] right-[15%] w-16 h-16"
      >
        <div className="absolute inset-0 rounded-full bg-pink-500/20"></div>
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 h-10 w-0.5 bg-pink-500/30 origin-bottom"
            style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg)` }}
          ></div>
        ))}
      </motion.div>
    </div>
  );
};

export default SubjectIllustrations;



