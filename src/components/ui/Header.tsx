import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, ChevronLeft } from 'lucide-react';
import Logo from '@/components/landing/Logo';

interface HeaderProps {
  userName?: string;
  showBackButton?: boolean;
  backButtonPath?: string;
  backButtonText?: string;
  currentPage?: 'dashboard' | 'subject' | 'topic' | 'landing' | 'class-selection';
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" variant="dark" />

          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors hover:bg-slate-100"
              style={{ color: '#64748B' }}
            >
              <ChevronLeft size={16} />
              {backButtonText}
            </button>
          )}
        </div>

        {currentPage !== 'landing' && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium hidden md:block" style={{ color: '#64748B' }}>
              {userName}
            </span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors">
              <Bell size={15} style={{ color: '#64748B' }} />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1E3A5F, #0891B2)' }}>
              <User size={15} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
