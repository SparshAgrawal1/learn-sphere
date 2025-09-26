import React from 'react';
import { motion } from 'framer-motion';

interface SubjectBackgroundElementsProps {
  subjectId: string;
}

const SubjectBackgroundElements: React.FC<SubjectBackgroundElementsProps> = ({ subjectId }) => {
  const getBackgroundElements = () => {
    switch (subjectId) {
      case 'mathematics':
        return (
          <>
            {/* Mathematical symbols */}
            <motion.div
              className="absolute top-20 left-20 text-orange-500/10 text-6xl font-bold select-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              π
            </motion.div>
            <motion.div
              className="absolute top-40 right-32 text-orange-400/15 text-4xl font-bold select-none"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ∑
            </motion.div>
            <motion.div
              className="absolute bottom-32 left-32 text-orange-600/12 text-5xl font-bold select-none"
              animate={{ rotate: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              ∫
            </motion.div>
            <motion.div
              className="absolute bottom-40 right-20 text-orange-500/8 text-3xl font-bold select-none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              √
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-10 text-orange-400/10 text-4xl font-bold select-none"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              ∞
            </motion.div>
          </>
        );

      case 'science':
        return (
          <>
            {/* Science symbols */}
            <motion.div
              className="absolute top-24 left-16 text-orange-500/12 text-5xl select-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              ⚛️
            </motion.div>
            <motion.div
              className="absolute top-32 right-24 text-orange-400/10 text-4xl select-none"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🧬
            </motion.div>
            <motion.div
              className="absolute bottom-28 left-28 text-orange-600/15 text-6xl select-none"
              animate={{ scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🔬
            </motion.div>
            <motion.div
              className="absolute bottom-36 right-16 text-orange-500/8 text-3xl select-none"
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚗️
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-8 text-orange-400/12 text-4xl select-none"
              animate={{ opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              🌍
            </motion.div>
          </>
        );

      case 'english':
        return (
          <>
            {/* English/Literature symbols */}
            <motion.div
              className="absolute top-28 left-24 text-orange-500/10 text-5xl select-none"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              📚
            </motion.div>
            <motion.div
              className="absolute top-36 right-28 text-orange-400/12 text-4xl select-none"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              ✍️
            </motion.div>
            <motion.div
              className="absolute bottom-32 left-20 text-orange-600/8 text-6xl select-none"
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              📖
            </motion.div>
            <motion.div
              className="absolute bottom-44 right-24 text-orange-500/15 text-3xl select-none"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🎭
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-8 text-orange-400/10 text-4xl select-none"
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              💭
            </motion.div>
          </>
        );

      case 'hindi':
        return (
          <>
            {/* Hindi/Sanskrit symbols */}
            <motion.div
              className="absolute top-32 left-20 text-orange-500/12 text-4xl font-bold select-none"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              ॐ
            </motion.div>
            <motion.div
              className="absolute top-40 right-32 text-orange-400/10 text-5xl select-none"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              📜
            </motion.div>
            <motion.div
              className="absolute bottom-36 left-24 text-orange-600/15 text-3xl font-bold select-none"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              अ
            </motion.div>
            <motion.div
              className="absolute bottom-28 right-20 text-orange-500/8 text-4xl font-bold select-none"
              animate={{ rotate: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              क
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-12 text-orange-400/12 text-3xl font-bold select-none"
              animate={{ opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              स्वर
            </motion.div>
          </>
        );

      case 'sanskrit':
        return (
          <>
            {/* Sanskrit symbols */}
            <motion.div
              className="absolute top-24 left-28 text-orange-500/10 text-5xl font-bold select-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              श्लो
            </motion.div>
            <motion.div
              className="absolute top-44 right-24 text-orange-400/12 text-4xl font-bold select-none"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              मन्त्र
            </motion.div>
            <motion.div
              className="absolute bottom-40 left-16 text-orange-600/8 text-6xl font-bold select-none"
              animate={{ scale: [0.7, 1.3, 0.7] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              वेद
            </motion.div>
            <motion.div
              className="absolute bottom-32 right-28 text-orange-500/15 text-3xl font-bold select-none"
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              गुरु
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-12 text-orange-400/10 text-4xl font-bold select-none"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              योग
            </motion.div>
          </>
        );

      case 'social-science':
        return (
          <>
            {/* Social Science symbols */}
            <motion.div
              className="absolute top-28 left-32 text-orange-500/12 text-5xl select-none"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              🏛️
            </motion.div>
            <motion.div
              className="absolute top-36 right-20 text-orange-400/10 text-4xl select-none"
              animate={{ y: [-7, 7, -7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🗺️
            </motion.div>
            <motion.div
              className="absolute bottom-44 left-24 text-orange-600/15 text-6xl select-none"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚖️
            </motion.div>
            <motion.div
              className="absolute bottom-28 right-32 text-orange-500/8 text-3xl select-none"
              animate={{ rotate: [-12, 12, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              🏺
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-16 text-orange-400/12 text-4xl select-none"
              animate={{ opacity: [0.08, 0.25, 0.08] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              🌐
            </motion.div>
          </>
        );

      default:
        return (
          <>
            {/* Default academic symbols */}
            <motion.div
              className="absolute top-32 left-24 text-orange-500/10 text-5xl select-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              🎓
            </motion.div>
            <motion.div
              className="absolute bottom-32 right-24 text-orange-400/12 text-4xl select-none"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              📚
            </motion.div>
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
      {getBackgroundElements()}
    </div>
  );
};

export default SubjectBackgroundElements;



