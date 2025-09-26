import React from 'react';
import { motion } from 'framer-motion';
import { Subject } from '@/data/curriculum';
import { 
  BarChart3, 
  Trophy, 
  Target
} from 'lucide-react';

interface AIInsightsPanelProps {
  subject: Subject;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ subject }) => {
  // Calculate progress statistics
  const totalTopics = subject.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0);
  const completedTopics = subject.chapters.reduce((sum, chapter) => {
    return sum + chapter.topics.filter(topic => topic.completed).length;
  }, 0);
  
  const completionPercentage = Math.round((completedTopics / totalTopics) * 100);
  
  // Find next recommended topics
  const nextTopics = findNextRecommendedTopics(subject);
  
  // Get chapter progress
  const chapterProgress = getChapterProgress(subject);

  return (
    <div className="space-y-4">
      {/* Study Progress Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-xl bg-black/40 rounded-full px-4 py-2 border border-white/20 flex items-center gap-3"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
          <BarChart3 size={12} className="text-white" />
        </div>
        <span className="text-white text-sm font-medium">Study Progress</span>
      </motion.div>

      {/* Overall Progress Card - Increased padding and content */}
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="backdrop-blur-xl bg-black/40 rounded-2xl p-5 border border-white/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${subject.color}60, ${subject.color}40)`,
                boxShadow: `0 4px 12px ${subject.color}30`
              }}
            >
              <Trophy size={18} className="text-white" />
            </div>
            <span className="text-white text-sm font-semibold">{subject.name} Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">{completionPercentage}%</span>
          </div>
        </div>
        
        {/* Progress Bar - Taller */}
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${subject.color}, ${subject.color}80)` }}
          />
        </div>
        
        <div className="mt-3 text-white/70 text-xs">
          {completedTopics} of {totalTopics} topics completed
        </div>
      </motion.div>
      
      {/* Next Steps Card - Increased padding and content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="backdrop-blur-xl bg-black/40 rounded-2xl p-5 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ 
              background: 'linear-gradient(135deg, #10B98160, #10B98140)',
              boxShadow: '0 4px 12px #10B98130'
                  }}
                >
            <Target size={18} className="text-white" />
          </div>
          <span className="text-white text-sm font-semibold">Recommended Next</span>
                </div>
        
        <div className="space-y-3">
          {nextTopics.length > 0 ? (
            nextTopics.slice(0, 3).map((topic, index) => (
              <div key={index} className="flex items-center gap-3 py-1">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-white/90 text-sm">{topic.name}</span>
              </div>
            ))
          ) : (
            <div className="text-white/70 text-sm py-2">
              Great job! You've completed all current topics.
              </div>
            )}
          </div>
      </motion.div>
          
    </div>
  );
};

// Helper function to find next recommended topics
function findNextRecommendedTopics(subject: Subject) {
  const nextTopics: Array<{name: string, chapterId: string}> = [];
  
  // Find chapters with incomplete topics
  for (const chapter of subject.chapters) {
    const incompleteTopics = chapter.topics.filter(topic => !topic.completed);
    
    // If there are incomplete topics in this chapter, add the first one
    if (incompleteTopics.length > 0) {
      nextTopics.push({
        name: incompleteTopics[0].name,
        chapterId: chapter.id
      });
    }
  }
  
  // Sort by chapter order (assuming chapters are already in logical order)
  return nextTopics;
}

// Helper function to analyze performance and provide insights
function analyzePerformance(subject: Subject) {
  const strengths: string[] = [];
  const improvementAreas: string[] = [];
  
  // Calculate chapter completion percentages
  const chapterProgress = subject.chapters.map(chapter => {
    const totalTopics = chapter.topics.length;
    const completedTopics = chapter.topics.filter(topic => topic.completed).length;
    const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    
    return {
      id: chapter.id,
      name: chapter.name,
      progress
    };
  });
  
  // Find strengths (chapters with high completion)
  const highProgressChapters = chapterProgress
    .filter(chapter => chapter.progress >= 75)
    .sort((a, b) => b.progress - a.progress);
  
  if (highProgressChapters.length > 0) {
    strengths.push(`Strong understanding of ${highProgressChapters[0].name} concepts (${highProgressChapters[0].progress}% complete).`);
  } else {
    // If no high progress chapters, find the highest one
    const bestChapter = chapterProgress.sort((a, b) => b.progress - a.progress)[0];
    if (bestChapter && bestChapter.progress > 0) {
      strengths.push(`Making good progress in ${bestChapter.name} (${bestChapter.progress}% complete).`);
    } else {
      strengths.push(`Getting started with ${subject.name}. Keep going!`);
    }
  }
  
  // Find improvement areas (chapters with low completion)
  const lowProgressChapters = chapterProgress
    .filter(chapter => chapter.progress < 50 && chapter.progress > 0)
    .sort((a, b) => a.progress - b.progress);
  
  if (lowProgressChapters.length > 0) {
    improvementAreas.push(`Focus more on ${lowProgressChapters[0].name} (only ${lowProgressChapters[0].progress}% complete).`);
  } else {
    // Find untouched chapters
    const untouchedChapters = chapterProgress.filter(chapter => chapter.progress === 0);
    if (untouchedChapters.length > 0) {
      improvementAreas.push(`Begin exploring ${untouchedChapters[0].name} to expand your knowledge.`);
    } else {
      improvementAreas.push(`Great work! Try tackling more advanced concepts in ${subject.name}.`);
    }
  }
  
  return { strengths, improvementAreas };
}

// Helper function to get chapter progress
function getChapterProgress(subject: Subject) {
  return subject.chapters.map(chapter => {
    const totalTopics = chapter.topics.length;
    const completedTopics = chapter.topics.filter(topic => topic.completed).length;
    const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    
    return {
      id: chapter.id,
      name: chapter.name,
      progress
    };
  }).sort((a, b) => b.progress - a.progress);
}

export default AIInsightsPanel;