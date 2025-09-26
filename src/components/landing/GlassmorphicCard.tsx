import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  position: string;
}

interface GlassmorphicCardProps {
  subject: Subject;
  index: number;
  delay?: number;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ 
  subject, 
  index,
  delay = 0 
}) => {
  return (
    <motion.div
      className={`absolute ${subject.position}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay + index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <Link to={`/subject/${subject.id}`}>
        <div 
          className="w-48 h-32 rounded-2xl backdrop-blur-xl border p-4 overflow-hidden relative group cursor-pointer transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), transparent)`,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`
          }}
        >
          {/* Background Orbs */}
          <div 
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-15"
            style={{ 
              background: `radial-gradient(circle, ${subject.color}, transparent 70%)`
            }}
          />
          <div 
            className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full opacity-10"
            style={{ 
              background: `radial-gradient(circle, ${subject.color}, transparent 70%)`
            }}
          />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, ${subject.color}60, ${subject.color}40)`,
                border: `1px solid ${subject.color}30`,
                boxShadow: `0 4px 12px ${subject.color}25, 0 0 0 1px ${subject.color}15 inset`
              }}
            >
              <subject.icon size={18} className="text-white" />
            </div>
            
            <div className="text-right">
              <div 
                className="text-sm font-bold mb-1"
                style={{ color: subject.color }}
              >
                {subject.progress}%
              </div>
              <div className="w-12 h-1 bg-white/20 rounded-full">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, ${subject.color}, ${subject.color}80)`,
                    boxShadow: `0 0 8px ${subject.color}40`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  transition={{ duration: 1.5, delay: delay + index * 0.1 + 0.5 }}
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-white font-bold text-base mb-1 leading-tight">
              {subject.name}
            </h3>
            <p className="text-white/70 text-xs leading-tight mb-3">
              {subject.description}
            </p>
            
            {/* Visual Elements */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ 
                      backgroundColor: i < Math.floor(subject.progress / 20) 
                        ? `${subject.color}80` 
                        : 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                ))}
              </div>
              
              <div className="flex items-end gap-px">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i}
                    className="w-0.5 rounded-full transition-all duration-300 group-hover:opacity-100 opacity-60"
                    style={{ 
                      height: `${4 + (subject.progress / 25) + Math.random() * 4}px`,
                      backgroundColor: `${subject.color}60`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Hover Effect Overlay */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${subject.color}10, transparent, ${subject.color}05)`,
              border: `1px solid ${subject.color}20`
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default GlassmorphicCard;


