import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/Header';

const ClassSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousClass, setPreviousClass] = useState<string | null>(null);
  
  // Check if user is coming from dashboard to change class
  useEffect(() => {
    // Get the previously selected class if any
    const classFromStorage = sessionStorage.getItem('selectedClass');
    if (classFromStorage) {
      setPreviousClass(classFromStorage);
    }
  }, []);
  
  // Generate floating particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 10, // 10-40px
    speed: Math.random() * 15 + 15, // 15-30s
    opacity: Math.random() * 0.25 + 0.05, // 0.05-0.3
    delay: Math.random() * 5, // 0-5s delay
    scale: Math.random() * 0.5 + 0.8, // 0.8-1.3 scale
    color: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)]
  }));

  const handleClassSelection = (classLevel: '9th' | '10th') => {
    // Store the selected class in session storage
    sessionStorage.setItem('selectedClass', classLevel);
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Enhanced Background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/80 to-black/90 z-0"></div>
      
      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(29, 78, 216, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          opacity: 0.5
        }}
      />
      
      {/* Accent Lights */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)'
        }}
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light z-0"></div>
      
      {/* Floating particles */}
      {particles.map((particle: any) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`,
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`,
          }}
          animate={{
            y: [0, -30, -10, -25, 0],
            x: [0, 20, -15, 5, 0],
            scale: [particle.scale, particle.scale * 1.1, particle.scale],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
      
      {/* Consistent Header */}
      <Header 
        currentPage="class-selection" 
        showBackButton={true}
        backButtonPath={previousClass ? '/dashboard' : '/'}
        backButtonText={previousClass ? 'Back to Dashboard' : 'Back to Home'}
      />

      {/* Main Content */}
      <main className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="max-w-4xl w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {previousClass ? 'Change Your Class' : 'Select Your Class'}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {previousClass 
                ? `Currently selected: ${previousClass} Grade. Choose a different class below.` 
                : 'Choose your class level to access customized curriculum and learning materials'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* 9th Grade Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/10 rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-blue-500/20"
              onClick={() => handleClassSelection('9th')}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.6))`,
                    boxShadow: `0 4px 12px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2) inset`
                  }}
                >
                  <BookOpen size={28} className="text-white" />
                  {/* Animated glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl"
                    style={{ 
                      background: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`
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
                <h2 className="text-2xl font-bold text-white">9th Grade</h2>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>Complete 9th grade curriculum</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>Interactive lessons for all subjects</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>Personalized learning path</span>
                </li>
              </ul>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center gap-2"
                onClick={() => handleClassSelection('9th')}
              >
                <span>Select 9th Grade</span>
                <ChevronRight size={16} />
              </Button>
            </motion.div>

            {/* 10th Grade Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 via-violet-500/15 to-indigo-500/10 rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-purple-500/20"
              onClick={() => handleClassSelection('10th')}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.6))`,
                    boxShadow: `0 4px 12px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2) inset`
                  }}
                >
                  <GraduationCap size={28} className="text-white" />
                  {/* Animated glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl"
                    style={{ 
                      background: `radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)`
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
                <h2 className="text-2xl font-bold text-white">10th Grade</h2>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Complete 10th grade curriculum</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Advanced interactive content</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Board exam preparation</span>
                </li>
              </ul>

              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex items-center justify-center gap-2"
                onClick={() => handleClassSelection('10th')}
              >
                <span>Select 10th Grade</span>
                <ChevronRight size={16} />
              </Button>
            </motion.div>
          </div>
        </div>
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

export default ClassSelectionPage;
