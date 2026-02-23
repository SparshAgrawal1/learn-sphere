import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, User, Bell, LogOut } from 'lucide-react';
import Logo from '@/components/landing/Logo';
import curriculum, { getClassCurriculum } from '@/data/curriculum';

const Interactive3DDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [classCurriculum, setClassCurriculum] = useState(curriculum['9th']);

  useEffect(() => {
    const cls = sessionStorage.getItem('selectedClass');
    if (!cls) sessionStorage.setItem('selectedClass', '9th');
    setClassCurriculum(getClassCurriculum(cls || '9th'));
  }, []);

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/learn/${encodeURIComponent(subjectId)}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('selectedClass');
    navigate('/');
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo size="md" variant="dark" />
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors">
              <Bell size={17} style={{ color: '#64748B' }} />
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors">
              <User size={17} style={{ color: '#64748B' }} />
            </button>
            <button onClick={handleLogout}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-colors">
              <LogOut size={17} style={{ color: '#EF4444' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(8,145,178,0.1)', color: '#0891B2' }}>
            <BookOpen size={14} />
            <span className="text-xs font-semibold">9th Grade</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#1E3A5F' }}>
            Welcome back, Student
          </h1>
          <p className="text-base" style={{ color: '#64748B' }}>
            Pick a subject and continue your learning journey.
          </p>
        </motion.div>

        {/* Subject Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classCurriculum.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
                onClick={() => handleSubjectSelect(subject.id)}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white border border-slate-200/80 hover:border-slate-300">
                  {/* Colored top bar */}
                  <div className="h-2" style={{ background: subject.color }} />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${subject.color}15` }}>
                        <Icon size={22} style={{ color: subject.color }} />
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 group-hover:bg-slate-200 transition-colors">
                        <ArrowRight size={16} style={{ color: '#64748B' }} className="transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-1" style={{ color: '#1E3A5F' }}>{subject.name}</h3>
                    <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#64748B' }}>{subject.description}</p>

                    {/* Progress */}
                    <div className="flex items-center justify-between text-xs mb-2" style={{ color: '#94A3B8' }}>
                      <span>{subject.chapters.length} {subject.chapters.length === 1 ? 'chapter' : 'chapters'}</span>
                      <span>{subject.progress || 0}% complete</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${subject.progress || 0}%`, background: subject.color }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Subjects', value: '5', color: '#1E3A5F' },
            { label: 'Chapters', value: '5', color: '#0891B2' },
            { label: 'AI Tutoring', value: '24/7', color: '#F97316' },
            { label: 'Quizzes', value: 'Adaptive', color: '#059669' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/80 text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs font-medium" style={{ color: '#94A3B8' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs" style={{ color: '#94A3B8' }}>
            © {new Date().getFullYear()} Pioneer AI — Transforming Education
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Interactive3DDashboard;
