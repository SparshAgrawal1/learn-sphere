import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, BookOpen, Sparkles, Rocket, Brain, Star, Zap, Layers, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import EnhancedBackground from '@/components/landing/EnhancedBackground';
import Header from '@/components/ui/Header';

const ModernLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
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
    color: string;
  }>>([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const count = Math.floor(Math.random() * 10) + 25; // 25-35 particles
      const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 10, // 10-40px
          speed: Math.random() * 15 + 15, // 15-30s
          opacity: Math.random() * 0.25 + 0.05, // 0.05-0.3
          delay: Math.random() * 5, // 0-5s delay
          scale: Math.random() * 0.5 + 0.8, // 0.8-1.3 scale
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
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
      
      <motion.div 
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)'
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)'
        }}
        animate={{
          y: [0, 20, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light z-0"></div>
      
      {/* Floating particles */}
      {particles.map((particle) => (
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
      <Header currentPage="landing" />

      {/* Spline 3D Model - Centered and Unobstructed */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
        <div className="w-full h-full spline-container">
          <spline-viewer 
            url="https://prod.spline.design/87yqiB5Y1Aeo7AL2/scene.splinecode"
            events-target="global"
            className="spline-viewer"
            style={{ minHeight: '200px', minWidth: '200px' }}
          ></spline-viewer>
        </div>
      </div>

      {/* Main Content - Using the same layout structure as SubjectDashboard */}
      <main className="relative z-10 w-full h-full">
        {/* Optimized Floating Layout */}
        <div className="absolute inset-0 pt-24 pb-16">
          {/* Left Side - Platform Info Card (SWAPPED) - INCREASED SIZE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute left-8 top-24 w-96 space-y-3"
          >
            {/* Platform Info Card - ENHANCED */}
            <motion.div 
              className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-indigo-500/10 rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                boxShadow: '0 10px 30px rgba(79, 70, 229, 0.2), 0 0 0 1px rgba(79, 70, 229, 0.1) inset'
              }}
            >
              {/* Header with Logo */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.6))`,
                      boxShadow: `0 4px 12px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2) inset`
                    }}
                  >
                    <Sparkles size={20} className="text-white" />
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
                  {/* Indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-black/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold text-white">Learn Sphere Vista</h1>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-xs text-white/60 ml-1">5.0 (2.4k reviews)</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-5">
                <p className="text-white/80 text-sm leading-relaxed">
                  An immersive AI-powered learning platform designed for 9th grade students across all subjects. Our interactive approach combines cutting-edge technology with proven educational methods.
                </p>
              </div>
              
              {/* Feature List */}
              <div className="space-y-3.5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(16, 185, 129, 0.4))`,
                      boxShadow: `0 3px 8px rgba(16, 185, 129, 0.3)`
                    }}
                  >
                    <BookOpen size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Interactive 3D Learning</h3>
                    <p className="text-xs text-white/60">Engage with immersive 3D models and simulations</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.4))`,
                      boxShadow: `0 3px 8px rgba(59, 130, 246, 0.3)`
                    }}
                  >
                    <Brain size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">AI-Powered Tutoring</h3>
                    <p className="text-xs text-white/60">Personalized learning assistance available 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, rgba(236, 72, 153, 0.6), rgba(236, 72, 153, 0.4))`,
                      boxShadow: `0 3px 8px rgba(236, 72, 153, 0.3)`
                    }}
                  >
                    <Layers size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Curriculum-Aligned</h3>
                    <p className="text-xs text-white/60">Perfectly matched to your school's requirements</p>
                  </div>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">6+</div>
                  <div className="text-xs text-white/60">Subjects</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">500+</div>
                  <div className="text-xs text-white/60">Lessons</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">24/7</div>
                  <div className="text-xs text-white/60">Support</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white flex items-center justify-center gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <span>Explore Platform</span>
                <ChevronRight size={16} />
              </Button>
              
              {/* Enhanced Decorative Elements */}
              <div className="absolute bottom-3 right-3 opacity-40">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: '#8B5CF6' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Login Card (SWAPPED) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute right-8 top-32 w-80 space-y-3"
          >
            {/* Login Form Card */}
            <motion.div 
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/10 rounded-2xl p-5 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-blue-500/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.6))`,
                      boxShadow: `0 4px 12px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2) inset`
                    }}
                  >
                    <User size={18} className="text-white" />
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
                  {/* Indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-black/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white">Welcome Back</h2>
                  <p className="text-white/70 text-xs">Sign in to continue your learning journey</p>
                </div>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90 text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 glass-card border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500/50"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90 text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 glass-card border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500/50"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-white/50 hover:text-white/80"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, rememberMe: checked === true }))
                      }
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <Label htmlFor="rememberMe" className="text-white/70 text-xs">Remember me</Label>
                  </div>
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-xs">Forgot password?</a>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                
                <div className="text-center text-white/70 text-xs">
                  Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Register</a>
                </div>
              </form>
              
              {/* Enhanced Decorative Elements */}
              <div className="absolute bottom-2 right-2 opacity-40">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: '#3B82F6' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
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

export default ModernLandingPage;