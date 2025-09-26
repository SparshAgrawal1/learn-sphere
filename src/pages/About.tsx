import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Heart, Globe, Shield, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950 text-white">
      {/* Header */}
      <header className="relative py-10 bg-indigo-950/80 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              LearnSphere Vista
            </Link>
            <Button 
              asChild
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About LearnSphere Vista</h1>
            <p className="text-xl text-blue-100/80 mb-8">
              We're on a mission to transform education through innovative technology and personalized learning experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-indigo-950/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-blue-100/80 mb-4">
                LearnSphere Vista was founded with a simple yet powerful idea: education should be engaging, accessible, and effective for every student.
              </p>
              <p className="text-blue-100/80 mb-4">
                Our team of educators, technologists, and learning scientists came together to create a platform that adapts to individual learning styles, provides immediate feedback, and makes the educational journey enjoyable.
              </p>
              <p className="text-blue-100/80">
                Today, we're proud to serve students across the globe, helping them master subjects from mathematics and science to languages and humanities through our interactive and personalized approach.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.2)] flex items-center justify-center">
                  <GraduationCap className="w-32 h-32 text-white/60" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30) * Math.PI / 180;
                    const x = 140 * Math.cos(angle);
                    const y = 140 * Math.sin(angle);
                    return (
                      <div 
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-white/50"
                        style={{
                          transform: `translate(${x + 140}px, ${y + 140}px)`
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
              We're guided by core principles that shape everything we do at LearnSphere Vista.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Mission",
                description: "To democratize quality education by providing personalized, engaging, and effective learning experiences that adapt to each student's unique needs and goals."
              },
              {
                icon: Heart,
                title: "Vision",
                description: "A world where every student has access to exceptional education that ignites their passion for learning and empowers them to reach their full potential."
              },
              {
                icon: Globe,
                title: "Impact",
                description: "We strive to make a meaningful difference in students' lives by breaking down barriers to education and fostering a lifelong love of learning."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-indigo-500/50 to-purple-500/50 flex items-center justify-center shadow-lg">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-indigo-950/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Educational Approach</h2>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
              We combine proven educational methodologies with cutting-edge technology to create a truly effective learning experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Personalized Learning Paths",
                description: "Our platform adapts to each student's strengths, weaknesses, and learning pace, creating a truly personalized educational journey."
              },
              {
                title: "Interactive Engagement",
                description: "We believe learning should be active, not passive. Our interactive lessons keep students engaged and motivated throughout their studies."
              },
              {
                title: "Immediate Feedback",
                description: "Students receive instant feedback on their work, allowing them to correct misconceptions and reinforce understanding in real-time."
              },
              {
                title: "Visual Learning",
                description: "Complex concepts are visualized through interactive diagrams, animations, and simulations to enhance comprehension and retention."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.2)] text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
            <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
              Experience the future of education with LearnSphere Vista's innovative learning platform.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-xl px-8"
            >
              <Link to="/dashboard">Get Started Now</Link>
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

export default About;



