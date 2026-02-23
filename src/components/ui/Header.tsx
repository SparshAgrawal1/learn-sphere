import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Bell } from 'lucide-react';
import Logo from '@/components/landing/Logo';

interface HeaderProps {
  userName?: string;
  showBackButton?: boolean;
  backButtonPath?: string;
  backButtonText?: string;
  currentPage?: 'dashboard' | 'subject' | 'topic' | 'landing' | 'class-selection';
  selectedClass?: string | null;
  showClassSelector?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  userName = 'Student',
  showBackButton = false,
  backButtonPath = '/dashboard',
  backButtonText = 'Back',
  currentPage = 'dashboard',
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (typeof (window as any).forceCleanupAITutor === 'function') {
      (window as any).forceCleanupAITutor();
    }
    setTimeout(() => navigate(backButtonPath), 100);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-3">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Logo size="md" />
          
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors ml-4"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {backButtonText}
            </button>
          )}
        </div>
        
        {currentPage !== 'landing' && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/40 hidden md:block">
              {userName}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
            >
              <Bell size={15} className="text-white/50" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.06] transition-colors"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(249,195,38,0.1))' }}
            >
              <User size={15} className="text-white/70" />
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
