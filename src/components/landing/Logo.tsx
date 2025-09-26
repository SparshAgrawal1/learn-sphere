import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md',
  animated = true
}) => {
  // Size mappings
  const sizeMap = {
    sm: { text: 'text-lg', icon: 'w-5 h-5' },
    md: { text: 'text-xl', icon: 'w-6 h-6' },
    lg: { text: 'text-2xl', icon: 'w-7 h-7' }
  };
  
  // Color mappings
  const colorMap = {
    default: {
      text: 'text-white',
      gradient: 'from-blue-500 to-teal-400'
    },
    light: {
      text: 'text-gray-900',
      gradient: 'from-blue-600 to-teal-500'
    },
    dark: {
      text: 'text-white',
      gradient: 'from-blue-400 to-teal-300'
    }
  };
  
  const selectedSize = sizeMap[size];
  const selectedColor = colorMap[variant];
  
  return (
    <Link to="/" className="flex items-center gap-2 no-underline">
      <div className="relative">
        <motion.div 
          className={`${selectedSize.icon} rounded-lg bg-gradient-to-br ${selectedColor.gradient} flex items-center justify-center`}
          animate={animated ? { 
            boxShadow: [
              '0 0 0 rgba(59, 130, 246, 0.4)', 
              '0 0 8px rgba(59, 130, 246, 0.6)', 
              '0 0 0 rgba(59, 130, 246, 0.4)'
            ] 
          } : undefined}
          transition={animated ? { 
            duration: 2, 
            repeat: Infinity,
            repeatType: 'reverse'
          } : undefined}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-3/4 h-3/4 text-white"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </motion.div>
        
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{ 
              border: '2px solid rgba(59, 130, 246, 0.6)',
              opacity: 0.6
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.2, 0.6]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        )}
      </div>
      
      <div className={`font-bold ${selectedSize.text} ${selectedColor.text}`}>
        LearnSphere
      </div>
    </Link>
  );
};

export default Logo;


