import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnhancedBackgroundProps {
  accentColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  theme?: string;
  isTransitioning?: boolean;
}

const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({
  accentColor = '#3B82F6', // Default blue
  intensity = 'medium',
  theme = 'default',
  isTransitioning = false
}) => {
  // Get background gradient classes based on theme - to match SubjectDashboard exactly
  const getBackgroundGradient = (subjectId: string) => {
    switch (subjectId) {
      case 'Mathematics':
        return 'bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900';
      case 'Science':
        return 'bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-900';
      case 'English':
        return 'bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-900';
      case 'Social Science':
        return 'bg-gradient-to-br from-red-950 via-rose-900 to-pink-900';
      case 'Hindi':
        return 'bg-gradient-to-br from-cyan-950 via-blue-900 to-sky-900';
      case 'Sanskrit':
        return 'bg-gradient-to-br from-pink-950 via-fuchsia-900 to-rose-900';
      default:
        return 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900';
    }
  };

  // Get the appropriate accent color based on theme - match exactly with SubjectDashboard
  const getAccentColor = () => {
    switch (theme) {
      case 'Mathematics': return 'rgba(16, 185, 129, 0.6)'; // emerald-500
      case 'Science': return 'rgba(245, 158, 11, 0.6)'; // amber-500
      case 'English': return 'rgba(139, 92, 246, 0.6)'; // violet-500
      case 'Social Science': return 'rgba(239, 68, 68, 0.6)'; // red-500
      case 'Hindi': return 'rgba(6, 182, 212, 0.6)'; // cyan-500
      case 'Sanskrit': return 'rgba(236, 72, 153, 0.6)'; // pink-500
      default: return 'rgba(59, 130, 246, 0.6)'; // default blue
    }
  };
  
  const accentColorValue = getAccentColor();
  // Generate particles
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
  }>>([]);
  
  // Set intensity levels
  const intensityMap = {
    low: { particles: 8, gridOpacity: 0.02, accentOpacity: 0.1 },
    medium: { particles: 15, gridOpacity: 0.03, accentOpacity: 0.15 },
    high: { particles: 25, gridOpacity: 0.04, accentOpacity: 0.2 }
  };
  
  const settings = intensityMap[intensity];
  
  // Parse accent color to RGB for opacity control
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 59, g: 130, b: 246 }; // Default blue
  };
  
  // For particles, use the hex color of the accent
  const getHexColor = () => {
    switch (theme) {
      case 'Mathematics': return '#10B981'; // emerald
      case 'Science': return '#F59E0B'; // amber
      case 'English': return '#8B5CF6'; // violet
      case 'Social Science': return '#EF4444'; // red
      case 'Hindi': return '#06B6D4'; // cyan
      case 'Sanskrit': return '#EC4899'; // pink
      default: return accentColor;
    }
  };
  
  const rgb = hexToRgb(getHexColor());
  
  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: settings.particles }).map((_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 20
    }));
    
    setParticles(newParticles);
  }, [settings.particles, theme]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <motion.div 
        className={`absolute inset-0 z-0 ${getBackgroundGradient(theme)}`}
        animate={{
          opacity: isTransitioning ? 0 : 1
        }}
        transition={{
          duration: 0.5
        }}
      />
      
      {/* Overlay for smooth transitions */}
      {isTransitioning && (
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 0.8
          }}
          style={{
            background: `radial-gradient(circle at center, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15), transparent 70%)`
          }}
        />
      )}
      
      {/* Regular background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #1a1a1a 100%)',
          opacity: 0.8
        }}
      />
      
      {/* Grid pattern - exactly as in SubjectDashboard */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Noise Texture - exactly as in SubjectDashboard */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-soft-light z-0"></div>
      
      {/* Accent lights */}
      {/* Subtle Accent Light Effect - exactly as in SubjectDashboard */}
      <div 
        className="absolute inset-0 bg-gradient-to-b opacity-15 z-0"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accentColorValue}, transparent 70%)`,
        }}
      />
      
      {/* Light Effects - match shadowing effect of SubjectDashboard */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent z-0"></div>
      
      {/* Floating Particles - exactly as in SubjectDashboard */}
      <div className="absolute inset-0 text-white/30 overflow-hidden z-0">
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
              scale: 0.8 + Math.random() * 0.5,
              opacity: 0.1 + Math.random() * 0.15
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedBackground;
