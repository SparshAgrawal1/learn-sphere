import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles, Mic, Brain, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/landing/Logo';

const ModernLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

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
    }, 1200);
  };

  const features = [
    { icon: Sparkles, label: 'Prompt-to-Simulation', desc: 'Describe any concept, get an interactive 3D model instantly', color: '#FF6B35' },
    { icon: Mic, label: 'AI Voice Tutor', desc: 'Multilingual tutor adapting to your speed and comprehension', color: '#0D9B96' },
    { icon: Brain, label: 'Deep Mastery Quiz', desc: 'Tests logic and derivations — not just surface answers', color: '#F9C326' },
    { icon: Zap, label: 'Real-Time Understanding', desc: 'Smart micro-questions ensure continuous comprehension', color: '#FF6B35' },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: '#0F0D08' }}>
      {/* Warm dark grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundSize: '60px 60px',
        backgroundImage: `linear-gradient(to right, rgba(255,107,53,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,107,53,0.5) 1px, transparent 1px)`
      }} />

      {/* Orange orb top-left */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-15 blur-[150px]"
        style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 65%)' }} />
      {/* Teal orb bottom-right */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-12 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #0D9B96 0%, transparent 65%)' }} />
      {/* Yellow mid */}
      <div className="absolute top-[40%] right-[30%] w-[250px] h-[250px] rounded-full opacity-8 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #F9C326 0%, transparent 70%)' }} />

      {/* Header */}
      <header className="relative z-20 px-8 py-5">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <Logo size="lg" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(255,107,53,0.15)', background: 'rgba(255,107,53,0.06)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF6B35' }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#FF6B35' }}>Next-Gen EdTech</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-[1440px] mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left — Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: 'rgba(255,107,53,0.9)' }}>
                  A New Paradigm in Education
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 tracking-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>
                Complex concepts,{' '}
                <span className="svg-gradient-text">visualized</span>{' '}
                instantly
              </h1>

              <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.35)' }}>
                SVG Ai transforms text into multimodal, simulation-driven learning experiences — 3D models, virtual labs, interactive physics, and an AI tutor that adapts to you.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {features.map((f, i) => (
                  <motion.div key={f.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderColor: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${f.color}18` }}>
                      <f.icon size={15} style={{ color: f.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.78)' }}>{f.label}</div>
                      <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['3D Models', 'Physics Sims', 'Virtual Labs', 'Any Language', 'Voice + Text', 'Adaptive AI'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-medium"
                    style={{ color: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,107,53,0.1)', background: 'rgba(255,107,53,0.04)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Login */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <div className="relative rounded-2xl overflow-hidden p-8"
                  style={{ background: '#191510', border: '1px solid rgba(255,107,53,0.12)', backdropFilter: 'blur(20px)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                  {/* Top glow line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.6), rgba(249,195,38,0.4), transparent)' }} />

                  {/* Corner dots */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ background: `rgba(255,107,53,${0.2 + i*0.15})` }} />)}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>Welcome back</h2>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Sign in to continue learning</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-[11px] h-3.5 w-3.5" style={{ color: 'rgba(255,255,255,0.18)' }} />
                        <Input id="email" name="email" type="email" placeholder="you@email.com"
                          className="pl-9 h-10 text-sm focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,107,53,0.12)', color: 'rgba(255,255,255,0.8)' }}
                          value={formData.email} onChange={handleInputChange} required />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-[11px] h-3.5 w-3.5" style={{ color: 'rgba(255,255,255,0.18)' }} />
                        <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Your password"
                          className="pl-9 pr-9 h-10 text-sm focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,107,53,0.12)', color: 'rgba(255,255,255,0.8)' }}
                          value={formData.password} onChange={handleInputChange} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[11px] transition-colors"
                          style={{ color: 'rgba(255,255,255,0.18)' }}>
                          {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end pt-0.5">
                      <a href="#" className="text-xs transition-colors" style={{ color: 'rgba(255,107,53,0.4)' }}>Forgot password?</a>
                    </div>

                    <button type="submit" disabled={isLoading}
                      className="w-full h-10 rounded-lg font-semibold text-sm text-white transition-all duration-300 disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #FF6B35, #E0521A)', boxShadow: '0 4px 20px rgba(255,107,53,0.3)' }}>
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : 'Sign In'}
                    </button>

                    <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      New here?{' '}
                      <a href="#" className="transition-colors" style={{ color: 'rgba(255,107,53,0.55)' }}>Create account</a>
                    </p>
                  </form>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[{ v: '5', l: 'Subjects' }, { v: 'AI', l: 'Powered' }, { v: '24/7', l: 'Access' }].map(s => (
                    <div key={s.l} className="text-center py-3 rounded-xl border"
                      style={{ borderColor: 'rgba(255,107,53,0.08)', background: 'rgba(255,107,53,0.04)' }}>
                      <div className="text-sm font-bold" style={{ color: 'rgba(255,107,53,0.7)' }}>{s.v}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.12)' }}>
          © {new Date().getFullYear()} SVG Ai — Visualize · Interact · Master
        </p>
      </div>
    </div>
  );
};

export default ModernLandingPage;
