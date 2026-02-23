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
  const sizeMap = {
    sm: { text: 'text-lg', sub: 'text-[8px]', icon: 28, gap: 'gap-2' },
    md: { text: 'text-xl', sub: 'text-[9px]', icon: 32, gap: 'gap-2.5' },
    lg: { text: 'text-3xl', sub: 'text-[11px]', icon: 40, gap: 'gap-3' }
  };

  const s = sizeMap[size];

  return (
    <Link to="/" className={`flex items-center ${s.gap} no-underline group`}>
      <div className="relative">
        <motion.div
          className="flex items-center justify-center"
          animate={animated ? { 
            filter: [
              'drop-shadow(0 0 4px rgba(0, 212, 170, 0.3))',
              'drop-shadow(0 0 8px rgba(0, 212, 170, 0.5))',
              'drop-shadow(0 0 4px rgba(0, 212, 170, 0.3))'
            ]
          } : undefined}
          transition={animated ? { duration: 3, repeat: Infinity } : undefined}
        >
          <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none">
            <path
              d="M20 4L35 12V28L20 36L5 28V12L20 4Z"
              stroke="url(#logo-grad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20 10L30 16V26L20 32L10 26V16L20 10Z"
              fill="url(#logo-grad)"
              fillOpacity="0.12"
              stroke="url(#logo-grad)"
              strokeWidth="1.5"
            />
            <circle cx="20" cy="21" r="4" fill="url(#logo-grad)" />
            <defs>
              <linearGradient id="logo-grad" x1="5" y1="4" x2="35" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B35" />
                <stop offset="1" stopColor="#F9C326" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      <div className="flex flex-col leading-none">
        <div className={`font-bold ${s.text} text-white tracking-tight`}>
          SVG <span className="svg-gradient-text">Ai</span>
        </div>
        <div className={`${s.sub} font-medium tracking-[0.25em] text-white/40 uppercase`}>
          Visualize · Interact · Master
        </div>
      </div>
    </Link>
  );
};

export default Logo;
