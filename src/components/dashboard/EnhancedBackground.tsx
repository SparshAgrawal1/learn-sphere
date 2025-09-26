import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedBackgroundProps {
  theme: string;
  isTransitioning: boolean;
}

// SVG illustrations for each subject
const subjectIllustrations = {
  emerald: (
    <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mathematics Illustration - Geometric patterns, formulas, etc. */}
      <g className="mathematics-elements">
        <circle cx="200" cy="150" r="50" stroke="#10B981" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx="200" cy="150" r="30" stroke="#10B981" strokeWidth="2" />
        <line x1="150" y1="150" x2="250" y2="150" stroke="#10B981" strokeWidth="2" />
        <line x1="200" y1="100" x2="200" y2="200" stroke="#10B981" strokeWidth="2" />
        
        <path d="M500 120 Q 550 50, 600 120" stroke="#10B981" strokeWidth="2" fill="none" />
        <path d="M500 150 L 550 100 L 600 150" stroke="#10B981" strokeWidth="2" fill="none" />
        
        <text x="350" y="300" fill="#10B981" fontSize="20">y = mx + b</text>
        <text x="150" y="350" fill="#10B981" fontSize="20">E = mc²</text>
        <text x="550" y="400" fill="#10B981" fontSize="20">a² + b² = c²</text>
        
        <rect x="400" y="150" width="60" height="60" stroke="#10B981" strokeWidth="2" fill="none" />
        <rect x="430" y="180" width="60" height="60" stroke="#10B981" strokeWidth="2" fill="none" />
        
        <path d="M100 450 Q 150 350, 200 450 T 300 450" stroke="#10B981" strokeWidth="2" fill="none" />
        <path d="M650 250 C 700 200, 700 100, 650 50" stroke="#10B981" strokeWidth="2" fill="none" />
      </g>
    </svg>
  ),
  amber: (
    <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Science Illustration - Atoms, molecules, lab equipment, etc. */}
      <g className="science-elements">
        {/* Atom */}
        <ellipse cx="400" cy="200" rx="80" ry="30" stroke="#F59E0B" strokeWidth="2" fill="none" transform="rotate(0, 400, 200)" />
        <ellipse cx="400" cy="200" rx="80" ry="30" stroke="#F59E0B" strokeWidth="2" fill="none" transform="rotate(60, 400, 200)" />
        <ellipse cx="400" cy="200" rx="80" ry="30" stroke="#F59E0B" strokeWidth="2" fill="none" transform="rotate(120, 400, 200)" />
        <circle cx="400" cy="200" r="15" fill="#F59E0B" fillOpacity="0.5" />
        
        {/* Molecule */}
        <circle cx="200" cy="400" r="15" fill="#F59E0B" fillOpacity="0.5" />
        <circle cx="250" cy="350" r="15" fill="#F59E0B" fillOpacity="0.5" />
        <circle cx="150" cy="350" r="15" fill="#F59E0B" fillOpacity="0.5" />
        <line x1="200" y1="400" x2="250" y2="350" stroke="#F59E0B" strokeWidth="2" />
        <line x1="200" y1="400" x2="150" y2="350" stroke="#F59E0B" strokeWidth="2" />
        
        {/* Lab Equipment */}
        <path d="M600 350 L 580 450 L 620 450 Z" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <rect x="590" y="450" width="20" height="10" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <path d="M650 400 C 650 420, 670 420, 670 400 L 670 350 L 650 350 Z" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <rect x="645" y="400" width="30" height="10" stroke="#F59E0B" strokeWidth="2" fill="none" />
        
        {/* DNA Helix */}
        <path d="M100 100 C 120 120, 140 80, 160 100 C 180 120, 200 80, 220 100" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <path d="M100 150 C 120 130, 140 170, 160 150 C 180 130, 200 170, 220 150" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <line x1="100" y1="100" x2="100" y2="150" stroke="#F59E0B" strokeWidth="2" />
        <line x1="160" y1="100" x2="160" y2="150" stroke="#F59E0B" strokeWidth="2" />
        <line x1="220" y1="100" x2="220" y2="150" stroke="#F59E0B" strokeWidth="2" />
      </g>
    </svg>
  ),
  violet: (
    <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* English Illustration - Books, quills, letters, etc. */}
      <g className="english-elements">
        {/* Open Book */}
        <path d="M350 200 C 350 150, 450 150, 450 200" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        <path d="M350 200 C 350 250, 450 250, 450 200" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        <line x1="400" y1="150" x2="400" y2="250" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="5 5" />
        
        {/* Quill */}
        <path d="M200 350 C 180 330, 150 300, 180 280 C 210 260, 230 280, 220 300 L 180 340" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        <path d="M180 340 L 170 350 L 180 360 L 190 350 Z" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        
        {/* Letters and Words */}
        <text x="500" y="300" fill="#8B5CF6" fontSize="24" fontFamily="serif">A B C</text>
        <text x="500" y="340" fill="#8B5CF6" fontSize="24" fontFamily="serif">X Y Z</text>
        <text x="100" y="200" fill="#8B5CF6" fontSize="20" fontFamily="serif">Poetry</text>
        <text x="600" y="200" fill="#8B5CF6" fontSize="20" fontFamily="serif">Prose</text>
        
        {/* Scroll */}
        <path d="M650 400 C 630 380, 630 350, 650 330 L 700 330 C 720 350, 720 380, 700 400 Z" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        <path d="M650 330 C 670 330, 670 400, 650 400" stroke="#8B5CF6" strokeWidth="1" fill="none" />
        <path d="M700 330 C 680 330, 680 400, 700 400" stroke="#8B5CF6" strokeWidth="1" fill="none" />
      </g>
    </svg>
  ),
  red: (
    <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Social Science Illustration - Globe, landmarks, people, etc. */}
      <g className="social-science-elements">
        {/* Globe */}
        <circle cx="400" cy="200" r="80" stroke="#EF4444" strokeWidth="2" fill="none" />
        <ellipse cx="400" cy="200" rx="80" ry="20" stroke="#EF4444" strokeWidth="1" fill="none" />
        <path d="M320 200 L 480 200" stroke="#EF4444" strokeWidth="1" />
        <path d="M400 120 L 400 280" stroke="#EF4444" strokeWidth="1" />
        <path d="M400 200 C 380 160, 420 160, 400 120" stroke="#EF4444" strokeWidth="1" fill="none" />
        <path d="M400 200 C 420 240, 380 240, 400 280" stroke="#EF4444" strokeWidth="1" fill="none" />
        
        {/* Landmarks */}
        <path d="M200 400 L 200 350 L 180 350 L 180 400 Z" stroke="#EF4444" strokeWidth="2" fill="none" />
        <path d="M190 350 L 190 330 L 210 330 L 210 350" stroke="#EF4444" strokeWidth="2" fill="none" />
        <path d="M600 400 L 600 320 L 620 320 L 620 400" stroke="#EF4444" strokeWidth="2" fill="none" />
        <path d="M590 350 L 630 350" stroke="#EF4444" strokeWidth="2" />
        
        {/* People */}
        <circle cx="100" cy="350" r="10" stroke="#EF4444" strokeWidth="2" fill="none" />
        <path d="M100 360 L 100 390" stroke="#EF4444" strokeWidth="2" />
        <path d="M100 370 L 80 380" stroke="#EF4444" strokeWidth="2" />
        <path d="M100 370 L 120 380" stroke="#EF4444" strokeWidth="2" />
        <path d="M100 390 L 90 410" stroke="#EF4444" strokeWidth="2" />
        <path d="M100 390 L 110 410" stroke="#EF4444" strokeWidth="2" />
        
        <circle cx="140" cy="350" r="10" stroke="#EF4444" strokeWidth="2" fill="none" />
        <path d="M140 360 L 140 390" stroke="#EF4444" strokeWidth="2" />
        <path d="M140 370 L 120 380" stroke="#EF4444" strokeWidth="2" />
        <path d="M140 370 L 160 380" stroke="#EF4444" strokeWidth="2" />
        <path d="M140 390 L 130 410" stroke="#EF4444" strokeWidth="2" />
        <path d="M140 390 L 150 410" stroke="#EF4444" strokeWidth="2" />
      </g>
    </svg>
  ),
  cyan: (
    <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hindi Illustration - Devanagari script, cultural elements, etc. */}
      <g className="hindi-elements">
        {/* Devanagari Script */}
        <text x="300" y="200" fill="#06B6D4" fontSize="40" fontFamily="serif">अ आ इ ई</text>
        <text x="300" y="250" fill="#06B6D4" fontSize="40" fontFamily="serif">क ख ग घ</text>
        
        {/* Decorative Elements */}
        <path d="M150 150 C 200 100, 250 200, 300 150" stroke="#06B6D4" strokeWidth="2" fill="none" />
        <path d="M150 170 C 200 120, 250 220, 300 170" stroke="#06B6D4" strokeWidth="2" fill="none" />
        
        <path d="M500 150 C 550 100, 600 200, 650 150" stroke="#06B6D4" strokeWidth="2" fill="none" />
        <path d="M500 170 C 550 120, 600 220, 650 170" stroke="#06B6D4" strokeWidth="2" fill="none" />
        
        {/* Cultural Symbol - Om */}
        <path d="M400 400 C 380 380, 380 350, 400 330 C 420 350, 420 380, 400 400" stroke="#06B6D4" strokeWidth="2" fill="none" />
        <path d="M400 330 C 420 310, 450 310, 470 330 C 490 350, 490 380, 470 400" stroke="#06B6D4" strokeWidth="2" fill="none" />
        <path d="M400 365 L 470 365" stroke="#06B6D4" strokeWidth="2" />
        <path d="M440 365 C 460 365, 460 400, 440 400" stroke="#06B6D4" strokeWidth="2" fill="none" />
        <path d="M440 400 L 420 430" stroke="#06B6D4" strokeWidth="2" />
      </g>
    </svg>
  ),
  pink: (
    <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sanskrit Illustration - Ancient scripts, symbols, etc. */}
      <g className="sanskrit-elements">
        {/* Sanskrit Script */}
        <text x="300" y="150" fill="#EC4899" fontSize="36" fontFamily="serif">संस्कृतम्</text>
        <text x="250" y="250" fill="#EC4899" fontSize="24" fontFamily="serif">अ आ इ ई उ ऊ</text>
        
        {/* Decorative Borders */}
        <path d="M150 300 L 200 300 L 200 350 L 250 350 L 250 400 L 300 400" stroke="#EC4899" strokeWidth="2" fill="none" />
        <path d="M500 300 L 450 300 L 450 350 L 400 350 L 400 400 L 350 400" stroke="#EC4899" strokeWidth="2" fill="none" />
        
        {/* Mandala Elements */}
        <circle cx="325" cy="450" r="50" stroke="#EC4899" strokeWidth="2" fill="none" />
        <circle cx="325" cy="450" r="40" stroke="#EC4899" strokeWidth="1" fill="none" />
        <circle cx="325" cy="450" r="30" stroke="#EC4899" strokeWidth="1" fill="none" />
        <circle cx="325" cy="450" r="20" stroke="#EC4899" strokeWidth="1" fill="none" />
        <path d="M275 450 L 375 450" stroke="#EC4899" strokeWidth="1" />
        <path d="M325 400 L 325 500" stroke="#EC4899" strokeWidth="1" />
        <path d="M290 415 L 360 485" stroke="#EC4899" strokeWidth="1" />
        <path d="M290 485 L 360 415" stroke="#EC4899" strokeWidth="1" />
        
        {/* Ancient Symbol */}
        <path d="M600 350 L 650 350 L 650 400 L 600 400 Z" stroke="#EC4899" strokeWidth="2" fill="none" />
        <path d="M600 350 L 650 400" stroke="#EC4899" strokeWidth="1" />
        <path d="M650 350 L 600 400" stroke="#EC4899" strokeWidth="1" />
        <circle cx="625" cy="375" r="10" stroke="#EC4899" strokeWidth="1" fill="none" />
      </g>
    </svg>
  )
};

const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({ theme, isTransitioning }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    delay: number;
    scale: number;
  }>>([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const count = Math.floor(Math.random() * 10) + 20; // 20-30 particles
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 15, // 15-45px
          speed: Math.random() * 15 + 15, // 15-30s
          opacity: Math.random() * 0.25 + 0.1, // 0.1-0.35
          delay: Math.random() * 5, // 0-5s delay
          scale: Math.random() * 0.5 + 0.8, // 0.8-1.3 scale
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
  }, [theme]);

  // Get background gradient based on theme
  const getBackgroundGradient = () => {
    switch (theme) {
      case 'emerald':
        return 'from-emerald-950 via-teal-900 to-emerald-900';
      case 'amber':
        return 'from-amber-950 via-orange-900 to-yellow-900';
      case 'violet':
        return 'from-violet-950 via-purple-900 to-indigo-900';
      case 'red':
        return 'from-red-950 via-rose-900 to-pink-900';
      case 'cyan':
        return 'from-cyan-950 via-blue-900 to-sky-900';
      case 'pink':
        return 'from-pink-950 via-fuchsia-900 to-rose-900';
      default:
        return 'from-emerald-950 via-teal-900 to-emerald-900';
    }
  };

  // Get accent color based on theme
  const getAccentColor = () => {
    switch (theme) {
      case 'emerald': return 'rgba(16, 185, 129, 0.6)'; // emerald-500
      case 'amber': return 'rgba(245, 158, 11, 0.6)'; // amber-500
      case 'violet': return 'rgba(139, 92, 246, 0.6)'; // violet-500
      case 'red': return 'rgba(239, 68, 68, 0.6)'; // red-500
      case 'cyan': return 'rgba(6, 182, 212, 0.6)'; // cyan-500
      case 'pink': return 'rgba(236, 72, 153, 0.6)'; // pink-500
      default: return 'rgba(16, 185, 129, 0.6)';
    }
  };

  // Get subject illustration based on theme
  const getSubjectIllustration = () => {
    switch (theme) {
      case 'emerald': return subjectIllustrations.emerald;
      case 'amber': return subjectIllustrations.amber;
      case 'violet': return subjectIllustrations.violet;
      case 'red': return subjectIllustrations.red;
      case 'cyan': return subjectIllustrations.cyan;
      case 'pink': return subjectIllustrations.pink;
      default: return subjectIllustrations.emerald;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background Gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1 
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Subject-specific Illustration */}
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {getSubjectIllustration()}
      </motion.div>
      
      {/* Accent Light Effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${getAccentColor()}, transparent 60%)`
        }}
      ></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-soft-light"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 text-white/30 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ 
              scale: 0,
              opacity: 0
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
              scale: particle.scale,
              opacity: particle.opacity
            }}
            transition={{
              duration: particle.speed,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Light Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent"></div>
    </div>
  );
};

export default EnhancedBackground;



