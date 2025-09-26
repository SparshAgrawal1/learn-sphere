import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, BookOpen, FileText, Feather, Book, Clock, Globe, Landmark, TrendingUp, Languages } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  progress: number;
  completed: boolean;
}

interface ModernJourneyViewProps {
  topics: Topic[];
  subjectColor: string;
  subjectId: string;
  subjectName: string;
}

const ModernJourneyView: React.FC<ModernJourneyViewProps> = ({ 
  topics, 
  subjectColor, 
  subjectId,
  subjectName
}) => {
  // Group topics by category based on subject
  const getCategoryGroups = () => {
    if (subjectId === 'mathematics') {
      return [
        {
          title: 'Number Systems',
          topics: topics.filter(t => ['math-1', 'math-2', 'math-3'].includes(t.id)),
          icon: <span className="text-white font-bold">N</span>
        },
        {
          title: 'Algebra',
          topics: topics.filter(t => ['math-4', 'math-5'].includes(t.id)),
          icon: <span className="text-white font-bold">A</span>
        },
        {
          title: 'Geometry',
          topics: topics.filter(t => ['math-6', 'math-7', 'math-8', 'math-9', 'math-10', 'math-11'].includes(t.id)),
          icon: <span className="text-white font-bold">G</span>
        },
        {
          title: 'Mensuration & Statistics',
          topics: topics.filter(t => ['math-12', 'math-13', 'math-14'].includes(t.id)),
          icon: <span className="text-white font-bold">M</span>
        }
      ];
    } else if (subjectId === 'science') {
      return [
        {
          title: 'Physics',
          topics: topics.filter(t => t.id.startsWith('sci-p')),
          icon: <span className="text-white font-bold">P</span>
        },
        {
          title: 'Chemistry',
          topics: topics.filter(t => t.id.startsWith('sci-c')),
          icon: <span className="text-white font-bold">C</span>
        },
        {
          title: 'Biology',
          topics: topics.filter(t => t.id.startsWith('sci-b')),
          icon: <span className="text-white font-bold">B</span>
        }
      ];
    } else if (subjectId === 'english') {
      return [
        {
          title: 'Reading & Writing',
          topics: topics.filter(t => ['eng-1', 'eng-2', 'eng-3', 'eng-4'].includes(t.id)),
          icon: <FileText className="h-5 w-5 text-white" />
        },
        {
          title: 'Grammar',
          topics: topics.filter(t => ['eng-5', 'eng-6', 'eng-7', 'eng-8', 'eng-9'].includes(t.id)),
          icon: <Feather className="h-5 w-5 text-white" />
        },
        {
          title: 'Literature',
          topics: topics.filter(t => ['eng-10', 'eng-11', 'eng-12'].includes(t.id)),
          icon: <Book className="h-5 w-5 text-white" />
        }
      ];
    } else if (subjectId === 'social') {
      return [
        {
          title: 'History',
          topics: topics.filter(t => t.id.startsWith('soc-h')),
          icon: <Clock className="h-5 w-5 text-white" />
        },
        {
          title: 'Geography',
          topics: topics.filter(t => t.id.startsWith('soc-g')),
          icon: <Globe className="h-5 w-5 text-white" />
        },
        {
          title: 'Political Science',
          topics: topics.filter(t => t.id.startsWith('soc-p')),
          icon: <Landmark className="h-5 w-5 text-white" />
        },
        {
          title: 'Economics',
          topics: topics.filter(t => t.id.startsWith('soc-e')),
          icon: <TrendingUp className="h-5 w-5 text-white" />
        }
      ];
    } else if (subjectId === 'hindi') {
      return [
        {
          title: 'व्याकरण (Grammar)',
          topics: topics.filter(t => t.id.startsWith('hin-g')),
          icon: <FileText className="h-5 w-5 text-white" />
        },
        {
          title: 'गद्य (Prose)',
          topics: topics.filter(t => t.id.startsWith('hin-p')),
          icon: <BookOpen className="h-5 w-5 text-white" />
        },
        {
          title: 'कविता (Poetry)',
          topics: topics.filter(t => t.id.startsWith('hin-po')),
          icon: <Feather className="h-5 w-5 text-white" />
        },
        {
          title: 'पूरक पुस्तक (Supplementary)',
          topics: topics.filter(t => t.id.startsWith('hin-s')),
          icon: <Book className="h-5 w-5 text-white" />
        }
      ];
    } else if (subjectId === 'sanskrit') {
      return [
        {
          title: 'Reading & Writing',
          topics: topics.filter(t => t.id.startsWith('san-r') || t.id.startsWith('san-w')),
          icon: <FileText className="h-5 w-5 text-white" />
        },
        {
          title: 'Grammar',
          topics: topics.filter(t => t.id.startsWith('san-g')),
          icon: <Languages className="h-5 w-5 text-white" />
        },
        {
          title: 'Literature',
          topics: topics.filter(t => t.id.startsWith('san-l')),
          icon: <BookOpen className="h-5 w-5 text-white" />
        }
      ];
    } else {
      // Default grouping - just show all topics
      return [{
        title: 'Topics',
        topics: topics,
        icon: <BookOpen className="h-5 w-5 text-white" />
      }];
    }
  };

  // Calculate progress for each category
  const categoryGroups = getCategoryGroups().map(group => ({
    ...group,
    progress: group.topics.length > 0 
      ? Math.round(group.topics.reduce((sum, topic) => sum + topic.progress, 0) / group.topics.length)
      : 0
  }));

  // State for active category
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <div className="w-full">
      {/* Category tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {categoryGroups.map((group, index) => (
            <motion.button
              key={`tab-${index}`}
              className={`px-4 py-2 rounded-lg mr-2 flex items-center gap-2 transition-all ${
                activeCategory === index 
                  ? 'bg-white/10 border border-white/20' 
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ 
                  background: activeCategory === index 
                    ? `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)` 
                    : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {group.icon}
              </div>
              <span className="text-white font-medium whitespace-nowrap">{group.title}</span>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">
                {group.topics.length}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Progress overview */}
      <div className="mb-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-3">Progress Overview</h3>
        <div className="space-y-3">
          {categoryGroups.map((group, index) => (
            <div key={`progress-${index}`} className="flex items-center">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ 
                  background: `linear-gradient(135deg, ${subjectColor}40, ${subjectColor}20)`
                }}
              >
                {group.icon}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/80">{group.title}</span>
                  <span className="text-white font-medium">{group.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${group.progress}%`,
                      backgroundImage: `linear-gradient(to right, ${subjectColor}, ${subjectColor}80)`,
                      boxShadow: `0 0 10px ${subjectColor}40`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${group.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active category topics */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`category-${activeCategory}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-black/30 to-transparent">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ 
                  background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`
                }}
              >
                {categoryGroups[activeCategory].icon}
              </div>
              {categoryGroups[activeCategory].title}
            </h3>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryGroups[activeCategory].topics.map((topic, index) => (
                <Link 
                  to={`/learn/${subjectId}/${topic.id}`} 
                  key={topic.id}
                  className="block"
                >
                  <motion.div 
                    className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center justify-between h-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      boxShadow: `0 0 15px ${subjectColor}30`
                    }}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 255, 255, 0.05) inset'
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 relative">
                        {/* Progress circle */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                          {/* Background circle */}
                          <circle 
                            cx="18" cy="18" r="16" 
                            fill="none" 
                            stroke="rgba(255, 255, 255, 0.1)" 
                            strokeWidth="2.5"
                          />
                          
                          {/* Progress arc */}
                          {topic.progress > 0 && (
                            <motion.circle 
                              cx="18" cy="18" r="16" 
                              fill="none" 
                              stroke={topic.completed ? "#10B981" : subjectColor}
                              strokeWidth="2.5"
                              strokeDasharray="100"
                              strokeDashoffset={100 - topic.progress}
                              strokeLinecap="round"
                              initial={{ strokeDashoffset: 100 }}
                              animate={{ strokeDashoffset: 100 - topic.progress }}
                              transition={{ duration: 1, delay: 0.1 * index }}
                              transform="rotate(-90 18 18)"
                            />
                          )}
                          
                          {/* Topic number */}
                          <text 
                            x="18" y="18" 
                            textAnchor="middle" 
                            dominantBaseline="central"
                            fill="white"
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {index + 1}
                          </text>
                        </svg>
                        
                        {/* Completion indicator */}
                        {topic.completed && (
                          <motion.div 
                            className="absolute -top-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-black/30"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                      
                      <div>
                        <div className="text-white font-medium">{topic.name}</div>
                        <div className="text-xs text-white/60">
                          {topic.completed ? 'Completed' : topic.progress > 0 ? `${topic.progress}% complete` : 'Not started'}
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-white/50" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ModernJourneyView;



