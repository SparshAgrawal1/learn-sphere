import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/ui/Header';
import curriculum, { getClassCurriculum } from '@/data/curriculum';

const Interactive3DDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [classCurriculum, setClassCurriculum] = useState(curriculum['9th']);

  useEffect(() => {
    const cls = sessionStorage.getItem('selectedClass');
    if (!cls) sessionStorage.setItem('selectedClass', '9th');
    setClassCurriculum(getClassCurriculum(cls || '9th'));
  }, []);

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/learn/${encodeURIComponent(subjectId)}`);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: '#0F0D08' }}>
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundSize: '60px 60px',
        backgroundImage: `linear-gradient(to right, rgba(255,107,53,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,107,53,0.5) 1px, transparent 1px)`
      }} />

      {/* Orange orb top-left */}
      <div className="absolute -top-20 -left-10 w-[500px] h-[500px] rounded-full opacity-10 blur-[150px]"
        style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 65%)' }} />
      {/* Teal orb bottom-right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-8 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #0D9B96 0%, transparent 65%)' }} />

      <Header currentPage="dashboard" />

      <main className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-16">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.18)', color: 'rgba(255,107,53,0.85)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF6B35' }} />
            9th Grade · 5 Subjects
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>
            What would you like to{' '}
            <span className="svg-gradient-text">learn today?</span>
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Each subject is powered by AI simulations, voice tutoring, and deep mastery quizzes.
          </p>
        </motion.div>

        {/* Subject grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl w-full">
          {classCurriculum.map((subject, index) => {
            const Icon = subject.icon;
            const isHovered = hoveredId === subject.id;

            return (
              <motion.div key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                onMouseEnter={() => setHoveredId(subject.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSubjectSelect(subject.id)}
                className="group cursor-pointer">
                <div className="relative p-6 rounded-2xl border transition-all duration-300 h-full overflow-hidden"
                  style={{
                    background: isHovered ? `${subject.color}08` : '#191510',
                    borderColor: isHovered ? `${subject.color}25` : 'rgba(255,107,53,0.08)',
                    boxShadow: isHovered ? `0 20px 50px ${subject.color}0F` : 'none',
                  }}>
                  {/* Top line glow on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-400"
                    style={{ width: isHovered ? '70%' : '0%', background: `linear-gradient(90deg, transparent, ${subject.color}80, transparent)` }} />

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ background: `${subject.color}15`, boxShadow: isHovered ? `0 4px 20px ${subject.color}18` : 'none' }}>
                    <Icon size={19} style={{ color: subject.color }} />
                  </div>

                  <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.88)' }}>{subject.name}</h3>
                  <p className="text-xs leading-relaxed mb-5 line-clamp-2" style={{ color: 'rgba(255,255,255,0.28)' }}>{subject.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {subject.chapters.length} {subject.chapters.length === 1 ? 'chapter' : 'chapters'}
                    </span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{ background: isHovered ? `${subject.color}18` : 'rgba(255,255,255,0.03)' }}>
                      <ChevronRight size={13}
                        style={{ color: isHovered ? subject.color : 'rgba(255,255,255,0.18)' }}
                        className="transition-all duration-300 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer tag */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-12 flex items-center gap-3">
          <div className="h-[1px] w-8" style={{ background: 'rgba(255,107,53,0.15)' }} />
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>
            Multimodal · Simulation-Driven · Adaptive AI
          </span>
          <div className="h-[1px] w-8" style={{ background: 'rgba(255,107,53,0.15)' }} />
        </motion.div>
      </main>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.12)' }}>
          © {new Date().getFullYear()} SVG Ai — Visualize · Interact · Master
        </p>
      </div>
    </div>
  );
};

export default Interactive3DDashboard;
