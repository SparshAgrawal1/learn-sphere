import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import Logo from '@/components/landing/Logo';
import { Button } from '@/components/ui/button';

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
  userName = 'Bhavya',
  showBackButton = false,
  backButtonPath = '/dashboard',
  backButtonText = 'Back to Dashboard',
  currentPage = 'dashboard',
  selectedClass = null,
  showClassSelector = false
}) => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-8 py-3 backdrop-blur-md bg-gradient-to-b from-black/40 to-transparent border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Logo size="md" />
          
          {showBackButton && (
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-2"
              onClick={() => navigate(backButtonPath)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              {backButtonText}
            </Button>
          )}
          
          {showClassSelector && (
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-2"
              onClick={() => {
                // Clear any existing class selection to force re-selection
                sessionStorage.removeItem('selectedClass');
                navigate('/class-selection');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Change Class
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {selectedClass && currentPage !== 'landing' && currentPage !== 'class-selection' && (
            <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-white/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span className="text-white font-medium">{selectedClass} Grade</span>
            </div>
          )}
          
          {userName && currentPage !== 'landing' && (
            <div className="text-white/70 text-base">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 font-medium">{userName}</span>
            </div>
          )}
          
          {currentPage !== 'landing' && (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Bell size={18} className="text-white/70" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Settings size={18} className="text-white/70" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 transition-colors"
              >
                <User size={18} className="text-white" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
