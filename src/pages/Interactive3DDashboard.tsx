import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronRight,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedBackground from '@/components/landing/EnhancedBackground';
import Enhanced3DFloor from '@/components/landing/Enhanced3DFloor';
import Header from '@/components/ui/Header';
import SubjectBackgroundElements from '@/components/dashboard/SubjectBackgroundElements';
import curriculum, { getClassCurriculum } from '@/data/curriculum';

const Interactive3DDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSubject, setActiveSubject] = useState('default');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [classCurriculum, setClassCurriculum] = useState(curriculum['9th']);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Refs for animation
  const splineContainerRef = useRef<HTMLDivElement>(null);
  
  // Parse query params to set initial subject and get selected class from session storage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    if (subjectParam) {
      handleSubjectHover(subjectParam);
    }
    
    // Get selected class from session storage
    const classFromStorage = sessionStorage.getItem('selectedClass');
    if (classFromStorage) {
      setSelectedClass(classFromStorage);
      // Update curriculum based on selected class
      const classSpecificCurriculum = getClassCurriculum(classFromStorage);
      setClassCurriculum(classSpecificCurriculum);
    } else {
      // If no class is selected, redirect to class selection page
      navigate('/class-selection');
    }
  }, [location, navigate]);
  
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

  // Handle window resize for responsive positioning
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubjectHover = (subjectId: string) => {
    if (activeSubject !== subjectId) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSubject(subjectId);
        setIsTransitioning(false);
      }, 300);
    }
  };
  
  const handleSubjectSelect = (subjectId: string) => {
    // Navigate to subject dashboard
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Enhanced Background */}
      <EnhancedBackground 
        theme={activeSubject}
        isTransitioning={isTransitioning}
      />
      
      {/* Subject-specific Background Elements */}
      {activeSubject !== 'default' && (
        <SubjectBackgroundElements subjectId={activeSubject} />
      )}

      {/* Enhanced 3D Floor */}
      <Enhanced3DFloor activeSubject={activeSubject} />

      {/* Consistent Header with Class Selector */}
      <Header 
        currentPage="dashboard" 
        selectedClass={selectedClass}
        showClassSelector={true}
      />

      {/* Spline 3D Model - Centered and Unobstructed */}
      <div 
        ref={splineContainerRef}
        className="absolute inset-0 w-full h-full z-0 flex items-center justify-center"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white/70 text-lg">Loading 3D Experience...</p>
            </div>
          </div>
        )}
        <div className="w-full h-full spline-container">
          <spline-viewer 
            url="https://prod.spline.design/87yqiB5Y1Aeo7AL2/scene.splinecode"
            events-target="global"
            class="spline-viewer"
          ></spline-viewer>
        </div>
      </div>

        {/* Main Content */}
        <main className="relative z-10 w-full h-full pt-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              {/* Subject Cards - Larger and Further from Center */}
              <div className="absolute inset-0">
                {classCurriculum.map((subject, index) => {
                  // Calculate position to form a circle around the center
                  const angle = (index * (360 / classCurriculum.length)) * (Math.PI / 180);
                  
                  // Use responsive radius that maintains 1860px alignment for wider screens
                  const getResponsiveRadius = () => {
                    if (windowWidth <= 1200) return 280; // Smaller screens
                    if (windowWidth <= 1600) return 320; // Medium screens
                    if (windowWidth <= 1860) return 360; // Large screens up to 1860px
                    // For screens wider than 1860px, maintain the same radius as 1860px
                    return 360; // Fixed radius to maintain 1860px alignment
                  };
                  
                  const radius = getResponsiveRadius();
                  const xPos = Math.cos(angle) * radius;
                  const yPos = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={subject.id}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${xPos}px)`,
                        top: `calc(50% + ${yPos}px)`,
                        transform: `translate(-50%, -50%)`,
                      }}
                    >
                      <div 
                        className={`
                          w-40 h-28 rounded-3xl backdrop-blur-xl
                          flex flex-col items-start justify-between
                          cursor-pointer subject-card
                          transition-all duration-500 ease-out
                          p-4 relative overflow-hidden
                          ${activeSubject === subject.id ? 'scale-110' : 'scale-100 hover:scale-105'}
                        `}
                        style={{
                          background: activeSubject === subject.id 
                            ? `linear-gradient(135deg, ${subject.color}20, ${subject.color}08, transparent)`
                            : `linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06), transparent)`,
                          border: activeSubject === subject.id 
                            ? `1px solid ${subject.color}40` 
                            : '1px solid rgba(255, 255, 255, 0.25)',
                          boxShadow: activeSubject === subject.id 
                            ? `0 12px 40px ${subject.color}25, 0 0 0 1px ${subject.color}15 inset` 
                            : `0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.15) inset`,
                        }}
                        onMouseEnter={() => handleSubjectHover(subject.id)}
                        onClick={() => handleSubjectSelect(subject.id)}
                      >
                        {/* Enhanced Background Gradient Orbs */}
                        <div 
                          className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-20"
                          style={{ 
                            background: `radial-gradient(circle, ${subject.color}, transparent 70%)`
                          }}
                        />
                        <div 
                          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full opacity-15"
                          style={{ 
                            background: `radial-gradient(circle, ${subject.color}, transparent 70%)`
                          }}
                        />
                        
                        {/* Header with Icon and Progress */}
                        <div className="flex items-center justify-between w-full">
                          <div 
                            className="w-8 h-8 rounded-2xl flex items-center justify-center"
                            style={{ 
                              background: `linear-gradient(135deg, ${subject.color}80, ${subject.color}60)`,
                              boxShadow: `0 4px 12px ${subject.color}30, 0 0 0 1px ${subject.color}20 inset`
                            }}
                          >
                            <subject.icon size={16} className="text-white" />
                          </div>
                          
                          <div className="text-right">
                            <div 
                              className="text-base font-bold"
                              style={{ color: subject.color }}
                            >
                              {subject.progress}%
                            </div>
                            <div className="w-12 h-1 bg-white/25 rounded-full mt-1">
                              <div 
                                className="h-full rounded-full transition-all duration-700" 
                                style={{ 
                                  width: `${subject.progress}%`,
                                  background: `linear-gradient(90deg, ${subject.color}, ${subject.color}80)`,
                                  boxShadow: `0 0 8px ${subject.color}40`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Subject Name and Details */}
                        <div>
                          <h3 className="text-base font-bold text-white leading-tight mb-1">
                            {subject.name}
                          </h3>
                          <p className="text-sm text-white/70 leading-tight">
                            {subject.chapters.length} chapters
                          </p>
                        </div>
                        
                        {/* Enhanced Decorative Elements */}
                        <div className="absolute bottom-2 right-2 opacity-40">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div 
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: subject.color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

      {/* Footer */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} Learn with AI by Calance. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Interactive3DDashboard;