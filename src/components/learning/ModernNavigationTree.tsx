import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, CheckCircle, Play, BookOpen, Clock } from 'lucide-react';

interface Subtopic {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  subtopics: Subtopic[];
  expanded?: boolean;
}

interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface ModernNavigationTreeProps {
  subject: Subject;
  currentSubtopic?: string;
  onSubtopicSelect: (subtopicId: string) => void;
}

export const ModernNavigationTree = ({ subject, currentSubtopic, onSubtopicSelect }: ModernNavigationTreeProps) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(subject.chapters.map(chapter => chapter.id))
  );

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-3">
          <div className="glass-icon-orange w-8 h-8 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="glass-text-primary font-semibold text-lg">{subject.name}</h2>
            <p className="glass-text-tertiary text-sm">Learning Path</p>
          </div>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto glass-scrollbar">
        {subject.chapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const completedSubtopics = chapter.subtopics.filter(s => s.completed).length;
          const totalSubtopics = chapter.subtopics.length;
          const chapterProgress = Math.round((completedSubtopics / totalSubtopics) * 100);

          return (
            <div key={chapter.id} className="border-b border-white/5 last:border-0">
              {/* Chapter Header */}
              <motion.button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full px-6 py-4 text-left transition-all duration-300 flex items-center justify-between group"
                style={{
                  background: isExpanded 
                    ? 'linear-gradient(135deg, var(--glass-white-subtle), var(--glass-white-faint))' 
                    : 'transparent'
                }}
                whileHover={{
                  background: 'linear-gradient(135deg, var(--glass-white-subtle), var(--glass-white-faint))'
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-4 w-4 glass-text-tertiary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="glass-text-primary font-medium text-sm">{chapter.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="glass-progress-mini w-16">
                        <div 
                          className="glass-progress-mini-fill"
                          style={{ width: `${chapterProgress}%` }}
                        />
                      </div>
                      <span className="glass-text-tertiary text-xs">
                        {completedSubtopics}/{totalSubtopics}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="glass-badge text-xs">
                  {chapterProgress}%
                </div>
              </motion.button>

              {/* Chapter Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-2">
                      {chapter.subtopics.map((subtopic, index) => (
                        <motion.button
                          key={subtopic.id}
                          onClick={() => onSubtopicSelect(subtopic.id)}
                          className={`w-full px-6 py-3 text-left transition-all duration-300 flex items-center gap-3 group ${
                            currentSubtopic === subtopic.id 
                              ? 'glass-card-orange mx-2 my-1 rounded-xl' 
                              : 'hover:bg-white/5'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          {/* Status Icon */}
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            subtopic.completed 
                              ? 'glass-icon-orange' 
                              : currentSubtopic === subtopic.id
                                ? 'glass-icon-orange'
                                : 'glass-icon'
                          }`}>
                            {subtopic.completed ? (
                              <CheckCircle className="h-3 w-3 text-white" />
                            ) : (
                              <Play className="h-3 w-3 text-white" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-sm leading-tight ${
                              currentSubtopic === subtopic.id ? 'glass-text-primary' : 'glass-text-secondary'
                            }`}>
                              {subtopic.title}
                            </h4>
                            
                            {/* Progress Bar */}
                            <div className="mt-2">
                              <div className="glass-progress-mini">
                                <motion.div 
                                  className="glass-progress-mini-fill"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${subtopic.progress}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                />
                              </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 glass-text-tertiary text-xs">
                                <Clock className="h-3 w-3" />
                                <span>{Math.floor(Math.random() * 20 + 5)} min</span>
                              </div>
                              <div className="glass-badge-orange text-xs">
                                {subtopic.progress}%
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModernNavigationTree;



