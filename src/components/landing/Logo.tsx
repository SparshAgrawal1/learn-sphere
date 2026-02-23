import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'dark' }) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', gap: 'gap-2' },
    md: { icon: 34, text: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 42, text: 'text-2xl', gap: 'gap-3' },
  };
  const s = sizeMap[size];
  const textColor = variant === 'dark' ? '#1E3A5F' : '#FFFFFF';

  return (
    <Link to="/" className={`flex items-center ${s.gap} no-underline group`}>
      {/* Icon mark */}
      <div className="relative flex-shrink-0">
        <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none">
          {/* Outer ring */}
          <circle cx="20" cy="20" r="18" stroke="#0891B2" strokeWidth="2.5" fill="none" />
          {/* Inner shape - abstract P */}
          <path
            d="M14 12h8c3.314 0 6 2.686 6 6s-2.686 6-6 6h-4v6h-4V12z"
            fill="#1E3A5F"
          />
          {/* AI dot */}
          <circle cx="28" cy="28" r="4" fill="#F97316" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`font-bold ${s.text} tracking-tight`} style={{ color: textColor }}>
          Pioneer <span style={{ color: '#0891B2' }}>AI</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
