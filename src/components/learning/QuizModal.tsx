import React, { useEffect, useState } from 'react';
import { X, Play, RotateCcw, Brain, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizChatbot from './QuizChatbot';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
  topicName?: string;
  chapterName?: string;
  subjectName?: string;
  classNumber?: string;
  pdfPath?: string;
}

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onStartQuiz,
  topicName = 'Current Topic',
  chapterName = 'Current Chapter',
  subjectName,
  classNumber,
  pdfPath
}) => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
      if (typeof (window as any).stopNarration === 'function') (window as any).stopNarration();
      if (typeof (window as any).stopStoryNarration === 'function') (window as any).stopStoryNarration();
    }
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
      if (typeof (window as any).stopNarration === 'function') (window as any).stopNarration();
      if (typeof (window as any).stopStoryNarration === 'function') (window as any).stopStoryNarration();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartQuiz = () => {
    setShowChatbot(true);
    onStartQuiz();
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
    onClose();
  };

  if (showChatbot) {
    return (
      <QuizChatbot
        topicName={topicName}
        chapterName={chapterName}
        subjectName={subjectName}
        classNumber={classNumber}
        pdfPath={pdfPath}
        onClose={handleCloseChatbot}
      />
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          style={{ background: 'rgba(7,7,16,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
          style={{
            background: '#100E08',
            border: '1px solid rgba(255,107,53,0.15)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,53,0.08) inset',
          }}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.5), rgba(13,155,150,0.3), transparent)' }} />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-white/25 hover:text-white/50 hover:bg-white/[0.05] transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(13,155,150,0.12))',
                    border: '1px solid rgba(255,107,53,0.2)',
                    boxShadow: '0 8px 30px rgba(255,107,53,0.15)',
                  }}>
                  <Brain className="w-8 h-8 text-[#FF8C5A]" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-emerald-400"
                  style={{ boxShadow: '0 0 12px rgba(52,211,153,0.5)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Deep Mastery Quiz</h2>
              <p className="text-sm text-white/40">
                Test your understanding of{' '}
                <span className="text-[#FF8C5A]/80 font-medium">{topicName}</span>
              </p>
              {chapterName && (
                <p className="text-xs text-white/25 mt-1">{chapterName}</p>
              )}
            </div>

            {/* Features */}
            <div className="space-y-2.5 mb-7">
              {[
                { icon: Brain, text: 'Tests logic and derivations, not just answers' },
                { icon: CheckCircle, text: 'Instant explanatory feedback on each question' },
                { icon: Clock, text: 'Adaptive pacing to your understanding' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,107,53,0.12)' }}>
                    <item.icon className="w-3 h-3 text-[#FF8C5A]/70" />
                  </div>
                  <span className="text-xs text-white/45">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white/35 transition-all hover:text-white/55"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Cancel
              </button>
              <button
                onClick={handleStartQuiz}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35, #0D9B96)',
                  boxShadow: '0 8px 25px rgba(255,107,53,0.3)',
                }}
              >
                <Play className="w-3.5 h-3.5" />
                Start Quiz
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuizModal;
