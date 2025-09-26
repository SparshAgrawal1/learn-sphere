import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, BookOpen, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/Header';
import TopicTimeline from '@/components/dashboard/TopicTimeline';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import SubjectBackgroundElements from '@/components/dashboard/SubjectBackgroundElements';
import { curriculum, getSubjectById } from '@/data/curriculum';

const SubjectDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSubject, setActiveSubject] = useState(subjectId || 'default');
  const [activeChapterId, setActiveChapterId] = useState<string | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Find the subject data
  const subject = getSubjectById(subjectId || 'default') || curriculum[0];
  
  // Refs for animation
  const splineContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set a timeout as fallback in case onLoad doesn't fire
    const timer = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true);
    }, 2000);
    
    // Listen for the spline viewer load event
    const handleSplineLoad = () => {
      setIsLoaded(true);
    };

    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
      splineViewer.addEventListener('load', handleSplineLoad);
    }
    
    return () => {
      clearTimeout(timer);
      if (splineViewer) {
        splineViewer.removeEventListener('load', handleSplineLoad);
      }
    };
  }, [isLoaded]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // State for floating particles
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
  }, [subject.id]);

  // Get background gradient based on subject
  const getBackgroundGradient = () => {
    switch (subject.id) {
      case 'mathematics':
        return 'from-emerald-950 via-teal-900 to-emerald-900';
      case 'science':
        return 'from-amber-950 via-orange-900 to-yellow-900';
      case 'english':
        return 'from-violet-950 via-purple-900 to-indigo-900';
      case 'social-science':
        return 'from-red-950 via-rose-900 to-pink-900';
      case 'hindi':
        return 'from-cyan-950 via-blue-900 to-sky-900';
      case 'sanskrit':
        return 'from-pink-950 via-fuchsia-900 to-rose-900';
      default:
        return 'from-emerald-950 via-teal-900 to-emerald-900';
    }
  };

  // Get accent color based on subject
  const getAccentColor = () => {
    switch (subject.id) {
      case 'mathematics': return 'rgba(16, 185, 129, 0.6)'; // emerald-500
      case 'science': return 'rgba(245, 158, 11, 0.6)'; // amber-500
      case 'english': return 'rgba(139, 92, 246, 0.6)'; // violet-500
      case 'social-science': return 'rgba(239, 68, 68, 0.6)'; // red-500
      case 'hindi': return 'rgba(6, 182, 212, 0.6)'; // cyan-500
      case 'sanskrit': return 'rgba(236, 72, 153, 0.6)'; // pink-500
      default: return 'rgba(16, 185, 129, 0.6)';
    }
  };
  
  // Get SVG illustration based on subject
  const getSubjectIllustration = () => {
    switch (subject.id) {
      case 'mathematics':
        return (
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
        );
      case 'science':
        return (
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
        );
      case 'english':
        return (
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
        );
      case 'social-science':
        return (
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
        );
      case 'hindi':
        return (
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
        );
      case 'sanskrit':
        return (
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
        );
      default:
        return (
          <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Default Academic Illustration */}
            <g className="default-elements">
              <circle cx="400" cy="300" r="100" stroke="#10B981" strokeWidth="2" strokeDasharray="5 5" />
              <text x="350" y="300" fill="#10B981" fontSize="24" fontFamily="serif">Learning</text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`} />
      
      {/* Subject-specific Illustration */}
      <div className="absolute inset-0">
        {getSubjectIllustration()}
      </div>
      
      {/* Subject-specific Background Elements */}
      <SubjectBackgroundElements subjectId={subject.id} />
      
      {/* Subtle Accent Light Effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b opacity-15"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${getAccentColor()}, transparent 70%)`
        }}
      ></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-soft-light"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
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

      {/* Consistent Header */}
      <Header 
        currentPage="subject"
        showBackButton={true}
        backButtonPath="/dashboard"
        backButtonText="Dashboard"
      />

      {/* 3D Floor and Environmental Effects */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Extended Perspective Floor */}
        <div className="absolute top-1/4 left-0 right-0 bottom-0 overflow-hidden">
          <div 
            className="absolute bottom-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 1200px 300px at center bottom, 
                  rgba(255, 140, 0, 0.2) 0%, 
                  rgba(255, 140, 0, 0.12) 30%, 
                  rgba(255, 140, 0, 0.06) 60%,
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
                  linear-gradient(rgba(255, 140, 0, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 140, 0, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            />
            
            {/* Grid intersection points */}
            <div 
              className="w-full h-full opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at center, rgba(255, 140, 0, 0.6) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            />
          </div>
        </div>

        {/* Enhanced Figure Shadow */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 translate-y-16 w-96 h-48">
          <motion.div 
            className="w-full h-full rounded-full"
            style={{
              background: `
                radial-gradient(ellipse 100% 100% at center, 
                  rgba(0, 0, 0, 0.6) 0%, 
                  rgba(0, 0, 0, 0.4) 30%, 
                  rgba(0, 0, 0, 0.2) 50%,
                  transparent 80%
                )
              `,
              filter: 'blur(12px)',
              transform: 'scale(1.1)'
            }}
            animate={{
              scale: [1.1, 1.15, 1.1],
              opacity: [0.8, 0.6, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner shadow for depth */}
          <motion.div 
            className="absolute inset-0 w-full h-full rounded-full"
            style={{
              background: `
                radial-gradient(ellipse 60% 60% at center, 
                  rgba(0, 0, 0, 0.3) 0%, 
                  transparent 70%
                )
              `,
              filter: 'blur(6px)'
            }}
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Ambient Lighting Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top rim light */}
          <motion.div 
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-3 opacity-25"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255, 140, 0, 0.8) 50%, transparent 100%)`,
              filter: 'blur(25px)'
            }}
            animate={{
              opacity: [0.25, 0.4, 0.25],
              width: ['384px', '420px', '384px']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Side accent lights */}
          <motion.div 
            className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-3 h-64 opacity-20"
            style={{
              background: `linear-gradient(180deg, transparent 0%, rgba(255, 140, 0, 0.6) 50%, transparent 100%)`,
              filter: 'blur(20px)'
            }}
            animate={{
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <motion.div 
            className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-3 h-64 opacity-20"
            style={{
              background: `linear-gradient(180deg, transparent 0%, rgba(255, 140, 0, 0.6) 50%, transparent 100%)`,
              filter: 'blur(20px)'
            }}
            animate={{
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Center glow beneath figure */}
          <motion.div 
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 translate-y-20 w-64 h-32 opacity-15"
            style={{
              background: `
                radial-gradient(ellipse 100% 100% at center, 
                  rgba(255, 140, 0, 0.8) 0%, 
                  rgba(255, 140, 0, 0.4) 40%,
                  transparent 80%
                )
              `,
              filter: 'blur(30px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Spline 3D Model - Centered and Unobstructed */}
      <div 
        ref={splineContainerRef}
        className="absolute inset-0 w-full h-full z-1 flex items-center justify-center"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white/70 text-lg">Loading 3D Experience...</p>
              </div>
          </div>
        )}
        <div className="w-full h-full spline-container">
          <div 
            dangerouslySetInnerHTML={{
              __html: `<spline-viewer 
                url="https://prod.spline.design/87yqiB5Y1Aeo7AL2/scene.splinecode"
                events-target="global"
                class="spline-viewer"
              ></spline-viewer>`
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full h-full pt-20">
        {/* Optimized Floating Layout */}
        <div className="absolute inset-0 pt-24 pb-16">
            {/* Left Side - Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute left-8 top-32 w-80 space-y-3"
            >
            {/* Enhanced Subject Progress Card */}
            <motion.div 
              className="backdrop-blur-xl bg-gradient-to-r from-orange-500/30 to-yellow-500/10 rounded-2xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-orange-500/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, #FF8C0080, #FF8C0060)`,
                      boxShadow: `0 4px 12px #FF8C0030`
                    }}
                  >
                    <subject.icon size={18} className="text-white" />
                    {/* Animated glow effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl"
                      style={{ 
                        background: `radial-gradient(circle, #FF8C0040 0%, transparent 70%)`
                      }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity
                      }}
                    />
                  </div>
                  {/* Subject indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-black/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-white truncate">{subject.name}</h2>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-orange-500/30 text-orange-400 text-sm font-bold">
                        {subject.progress || 60}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Progress Visualization */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>{subject.chapters.length} chapters</span>
                      <span>{subject.chapters.reduce((acc, ch) => acc + ch.topics.length, 0)} topics</span>
                    </div>
                    
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                      <motion.div 
                        className="h-full rounded-full relative"
                        style={{ 
                          background: `linear-gradient(90deg, #FF8C00, #FF8C0080)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress || 60}%` }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      >
                        {/* Animated shine effect */}
                        <motion.div 
                          className="absolute inset-0 rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, transparent 0%, #FF8C0060 50%, transparent 100%)`
                          }}
                          animate={{ 
                            x: ['-100%', '100%']
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: 1
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Compact AI Insights Panel */}
            <div className="flex-grow overflow-hidden">
              <AIInsightsPanel subject={subject} />
            </div>
            
            {/* AI Insights Card */}
            <motion.div 
              className="backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-amber-500/10 rounded-2xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-orange-500/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500/30 to-amber-500/20 flex items-center justify-center">
                  <Brain size={16} className="text-orange-400" />
                </div>
                <span className="text-white text-sm font-semibold">AI Insights</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span className="text-white/80 text-xs">Strong progress in {subject.chapters[0].name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span className="text-white/80 text-xs">Focus more on {subject.chapters[subject.chapters.length-1].name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span className="text-white/80 text-xs">Next recommended: {subject.chapters[1].topics[0].name}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
            {/* Right Side - Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute right-8 top-32 w-80 space-y-3"
            >
            <TopicTimeline 
              subject={subject}
              activeChapterId={activeChapterId}
              setActiveChapterId={setActiveChapterId}
            />
          </motion.div>
        </div>
              
      </main>

      {/* Footer */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Learn with AI by Calance. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SubjectDashboard;