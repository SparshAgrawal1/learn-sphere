import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, Sparkles, Mic, Brain, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Logo from '@/components/landing/Logo';

const ModernLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('selectedClass', '9th');
      navigate('/dashboard');
    }, 1000);
  };

  const sections = [
    {
      color: '#1E3A5F',
      title: 'A New Paradigm in Education',
      content: 'Pioneer AI transforms complex text into clear, interactive visual experiences instantly. Students learn by doing through real-time simulations and immersive exploration.',
      icon: Sparkles,
    },
    {
      color: '#0891B2',
      title: 'From Simple Text to Interactive Reality',
      content: 'Generate 3D anatomical models, chemical structures, physics simulations, virtual labs, and process visualizations instantly from simple prompts.',
      icon: Brain,
    },
    {
      color: '#F97316',
      title: 'Core Features',
      list: [
        'Prompt-to-Simulation',
        'AI Voice Tutor (Multilingual & Adaptive)',
        'Deep Mastery Quiz Engine (Logic-based evaluation)',
        'Real-Time Understanding Checks',
      ],
      icon: Check,
    },
    {
      color: '#F97316',
      title: 'Impact Across Learning Domains',
      content: 'K–12: Strong foundations & engaging visuals\nHigher Education: Advanced research support\nVocational Training: Hands-on applied simulations',
      icon: BarChart3,
    },
    {
      color: '#059669',
      title: 'Breaking Barriers in Learning',
      content: 'Learn in any language. Voice or text interaction. Personalized pacing. Adaptive explanations.',
      icon: Mic,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" variant="dark" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="px-5 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50"
              style={{ color: '#1E3A5F' }}
            >
              Sign In
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
              style={{ background: '#1E3A5F' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#1E3A5F' }}>
              Pioneer AI
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: '#64748B' }}>
              Transforming complex concepts into interactive learning experiences
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="px-8 py-3.5 text-base font-semibold text-white rounded-lg flex items-center gap-2 transition-all hover:shadow-lg hover:opacity-90"
                style={{ background: '#1E3A5F' }}
              >
                Start Learning <ArrowRight size={18} />
              </button>
              <button className="px-8 py-3.5 text-base font-semibold rounded-lg flex items-center gap-2 transition-all hover:bg-slate-50"
                style={{ border: '2px solid #1E3A5F', color: '#1E3A5F' }}>
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Colored Sections */}
      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-4">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-xl p-6 md:p-8"
              style={{ background: sec.color }}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{sec.title}</h3>
                  {sec.content && (
                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">{sec.content}</p>
                  )}
                  {sec.list && (
                    <ul className="space-y-1.5 mt-2">
                      {sec.list.map((item, i) => (
                        <li key={i} className="text-white/90 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm" style={{ color: '#94A3B8' }}>
            © {new Date().getFullYear()} Pioneer AI — Transforming Education
          </p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogin(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Colored top bar */}
            <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #1E3A5F, #0891B2, #F97316, #059669)' }} />

            <div className="p-8">
              <div className="text-center mb-8">
                <Logo size="md" variant="dark" />
                <p className="mt-4 text-sm" style={{ color: '#64748B' }}>Sign in to continue your learning journey</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#9CA3AF' }} />
                    <Input
                      name="email" type="email" placeholder="you@example.com"
                      className="pl-10 h-11 bg-slate-50 border-slate-200 focus:border-[#0891B2] focus:ring-[#0891B2]"
                      value={formData.email} onChange={handleInputChange} required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#9CA3AF' }} />
                    <Input
                      name="password" type={showPassword ? 'text' : 'password'} placeholder="Your password"
                      className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus:border-[#0891B2] focus:ring-[#0891B2]"
                      value={formData.password} onChange={handleInputChange} required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0891B2] focus:ring-[#0891B2]" />
                    <span style={{ color: '#64748B' }}>Remember me</span>
                  </label>
                  <a href="#" style={{ color: '#0891B2' }} className="font-medium hover:underline">Forgot password?</a>
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full h-11 rounded-lg font-semibold text-white transition-all disabled:opacity-60 hover:opacity-90"
                  style={{ background: '#1E3A5F' }}>
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </button>

                <p className="text-center text-sm" style={{ color: '#64748B' }}>
                  Don't have an account?{' '}
                  <a href="#" style={{ color: '#0891B2' }} className="font-semibold hover:underline">Create one</a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ModernLandingPage;
