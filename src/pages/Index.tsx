import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, Brain, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen text-white" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-soft-light"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20 backdrop-blur-md"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                  LearnSphere Vista
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100">
                  An interactive learning platform designed to make education engaging, personalized, and effective.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-xl px-8"
                  >
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <span>Start Learning</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-8"
                  >
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.3)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="w-32 h-32 text-white/80" />
                  </div>
                  
                  {/* Orbiting Subject Icons */}
                  {[
                    { icon: BookOpen, angle: 0, color: '#10B981' },
                    { icon: Brain, angle: 72, color: '#F59E0B' },
                    { icon: Lightbulb, angle: 144, color: '#8B5CF6' },
                    { icon: Users, angle: 216, color: '#EF4444' },
                    { icon: Sparkles, angle: 288, color: '#06B6D4' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{ 
                        width: 60, 
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: `${item.color}40`,
                        border: `2px solid ${item.color}80`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 20px ${item.color}40`
                      }}
                      initial={{ 
                        x: Math.cos(item.angle * Math.PI / 180) * 180,
                        y: Math.sin(item.angle * Math.PI / 180) * 180
                      }}
                      animate={{ 
                        x: [
                          Math.cos(item.angle * Math.PI / 180) * 180,
                          Math.cos((item.angle + 10) * Math.PI / 180) * 190,
                          Math.cos(item.angle * Math.PI / 180) * 180
                        ],
                        y: [
                          Math.sin(item.angle * Math.PI / 180) * 180,
                          Math.sin((item.angle + 10) * Math.PI / 180) * 190,
                          Math.sin(item.angle * Math.PI / 180) * 180
                        ]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      <item.icon className="h-8 w-8" style={{ color: item.color }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative py-20 bg-indigo-950/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Education Through Technology</h2>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
              Our platform combines interactive learning paths, personalized feedback, and engaging content to create an immersive educational experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Interactive Learning Journeys",
                description: "Follow personalized learning paths that adapt to your progress and learning style.",
                color: "from-emerald-500 to-teal-700"
              },
              {
                icon: Brain,
                title: "AI-Powered Tutoring",
                description: "Get instant help and feedback from our intelligent tutoring system that understands your needs.",
                color: "from-amber-500 to-orange-700"
              },
              {
                icon: Sparkles,
                title: "Achievement System",
                description: "Earn badges and track your progress as you master new concepts and skills.",
                color: "from-violet-500 to-purple-700"
              },
              {
                icon: BookOpen,
                title: "Rich Content Library",
                description: "Access comprehensive lessons covering the entire curriculum with multimedia resources.",
                color: "from-red-500 to-rose-700"
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description: "Connect with peers and educators to enhance your understanding through discussion.",
                color: "from-cyan-500 to-blue-700"
              },
              {
                icon: Lightbulb,
                title: "Practical Applications",
                description: "Apply your knowledge to real-world scenarios and problem-solving challenges.",
                color: "from-pink-500 to-fuchsia-700"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.2)] text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
            <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already benefiting from our innovative educational platform.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-xl px-8 py-6 text-lg"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                <span>Start Your Learning Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950/80 border-t border-white/10 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                LearnSphere Vista
              </h2>
              <p className="text-blue-100/60 mt-2">Transforming education through technology</p>
            </div>
            <div className="flex gap-8">
              <Link to="/about" className="text-blue-100/80 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-blue-100/80 hover:text-white transition-colors">Contact</Link>
              <Link to="/privacy" className="text-blue-100/80 hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="text-blue-100/80 hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-blue-100/60">
            <p>© {new Date().getFullYear()} LearnSphere Vista. All rights reserved.</p>
          </div>
      </div>
      </footer>
    </div>
  );
};

export default Index;
