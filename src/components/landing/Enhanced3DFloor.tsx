import React from 'react';
import { motion } from 'framer-motion';

interface Enhanced3DFloorProps {
  accentColor?: string;
  gridSize?: number;
  opacity?: number;
  activeSubject?: string;
}

const Enhanced3DFloor: React.FC<Enhanced3DFloorProps> = ({
  accentColor = '#3B82F6', // Default blue
  gridSize = 80,
  opacity = 0.3,
  activeSubject = 'default'
}) => {
  // Get the appropriate accent color based on theme
  const getThemeColor = () => {
    switch (activeSubject) {
      case 'mathematics': return '#10B981'; // emerald
      case 'science': return '#F59E0B'; // amber
      case 'english': return '#8B5CF6'; // violet
      case 'social': return '#EF4444'; // red
      case 'hindi': return '#06B6D4'; // cyan
      case 'sanskrit': return '#EC4899'; // pink
      default: return accentColor;
    }
  };
  
  const themeColor = getThemeColor();
  // Parse accent color to RGB for opacity control
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 59, g: 130, b: 246 }; // Default blue
  };
  
  const rgb = hexToRgb(themeColor);

  return (
    <div className="absolute top-1/4 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute bottom-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 1200px 300px at center bottom, 
              rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.7}) 0%, 
              rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.4}) 30%, 
              rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.2}) 60%,
              transparent 80%
            ),
            linear-gradient(180deg, 
              transparent 0%, 
              rgba(0, 0, 0, 0.15) 40%, 
              rgba(0, 0, 0, 0.35) 100%
            )
          `,
          transform: 'perspective(1000px) rotateX(70deg)',
          transformOrigin: 'center bottom'
        }}
      >
        {/* Enhanced Grid Pattern */}
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 1.3}) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 1.3}) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`
          }}
        />
        
        {/* Grid intersection points */}
        <div 
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 2}) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`
          }}
        />
        
        {/* Animated pulse wave */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.5}) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center'
          }}
          animate={{
            opacity: [0, opacity * 0.8, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default Enhanced3DFloor;


