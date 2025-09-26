import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, Lock } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  progress: number;
  completed: boolean;
}

interface MathematicsJourneyProps {
  topics: Topic[];
  subjectColor: string;
  subjectId: string;
}

const MathematicsJourney: React.FC<MathematicsJourneyProps> = ({ topics, subjectColor, subjectId }) => {
  // Group topics by category
  const numberSystems = topics.filter(t => ['math-1', 'math-2', 'math-3'].includes(t.id));
  const algebra = topics.filter(t => ['math-4', 'math-5'].includes(t.id));
  const geometry = topics.filter(t => ['math-6', 'math-7', 'math-8', 'math-9', 'math-10', 'math-11'].includes(t.id));
  const mensuration = topics.filter(t => ['math-12', 'math-13'].includes(t.id));
  const statistics = topics.filter(t => ['math-14'].includes(t.id));

  // Calculate the overall progress for each category
  const getCategoryProgress = (categoryTopics: Topic[]) => {
    if (categoryTopics.length === 0) return 0;
    return Math.round(
      categoryTopics.reduce((sum, topic) => sum + topic.progress, 0) / categoryTopics.length
    );
  };

  const getTopicIcon = (topic: Topic) => {
    if (topic.completed) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (topic.progress > 0) return <motion.div className="h-3 w-3 rounded-full bg-blue-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />;
    return <Lock className="h-3 w-3 text-gray-400" />;
  };

  return (
    <div className="relative w-full h-full">
      {/* Mathematical symbols background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        {['+', '−', '×', '÷', '=', '≠', '≈', '√', 'π', '∞', '∫', '∑', '∏', 'Δ', '∇', '∂', 'θ', 'φ', 'λ'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: subjectColor
            }}
            animate={{
              y: [0, Math.random() * 10 - 5],
              opacity: [0.7, 0.3, 0.7]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 p-4">
        {/* Number Tree visualization */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <motion.div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ 
                background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
              }}
            >
              <span className="text-white text-sm font-bold">1</span>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">Number Systems</h3>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${getCategoryProgress(numberSystems)}%`,
                      backgroundColor: subjectColor
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryProgress(numberSystems)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-white/70">{getCategoryProgress(numberSystems)}%</span>
              </div>
            </div>
          </div>

          <div className="pl-10 space-y-3">
            {numberSystems.map((topic) => (
              <Link 
                to={`/learn/${subjectId}/${topic.id}`} 
                key={topic.id}
                className="block"
              >
                <motion.div 
                  className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: `0 0 15px ${subjectColor}30`
                  }}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 255, 255, 0.05) inset'
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3">
                      {getTopicIcon(topic)}
                    </div>
                    <span className="text-white">{topic.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white/70 text-sm mr-2">{topic.progress}%</span>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Algebra Branch */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <motion.div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ 
                background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
              }}
            >
              <span className="text-white text-sm font-bold">2</span>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">Algebra</h3>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${getCategoryProgress(algebra)}%`,
                      backgroundColor: subjectColor
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryProgress(algebra)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-white/70">{getCategoryProgress(algebra)}%</span>
              </div>
            </div>
          </div>

          <div className="pl-10 space-y-3">
            {algebra.map((topic) => (
              <Link 
                to={`/learn/${subjectId}/${topic.id}`} 
                key={topic.id}
                className="block"
              >
                <motion.div 
                  className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: `0 0 15px ${subjectColor}30`
                  }}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 255, 255, 0.05) inset'
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3">
                      {getTopicIcon(topic)}
                    </div>
                    <span className="text-white">{topic.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white/70 text-sm mr-2">{topic.progress}%</span>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Geometry Network */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <motion.div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ 
                background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
              }}
            >
              <span className="text-white text-sm font-bold">3</span>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">Geometry</h3>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${getCategoryProgress(geometry)}%`,
                      backgroundColor: subjectColor
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryProgress(geometry)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-white/70">{getCategoryProgress(geometry)}%</span>
              </div>
            </div>
          </div>

          {/* Geometry Network Visualization */}
          <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-3">
            {geometry.map((topic) => (
              <Link 
                to={`/learn/${subjectId}/${topic.id}`} 
                key={topic.id}
                className="block"
              >
                <motion.div 
                  className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: `0 0 15px ${subjectColor}30`
                  }}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 255, 255, 0.05) inset'
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3">
                      {getTopicIcon(topic)}
                    </div>
                    <span className="text-white">{topic.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white/70 text-sm mr-2">{topic.progress}%</span>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mensuration and Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mensuration */}
          <div>
            <div className="flex items-center mb-4">
              <motion.div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                style={{ 
                  background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
                }}
              >
                <span className="text-white text-sm font-bold">4</span>
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-white">Mensuration</h3>
                <div className="flex items-center">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${getCategoryProgress(mensuration)}%`,
                        backgroundColor: subjectColor
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${getCategoryProgress(mensuration)}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-xs text-white/70">{getCategoryProgress(mensuration)}%</span>
                </div>
              </div>
            </div>

            <div className="pl-10 space-y-3">
              {mensuration.map((topic) => (
                <Link 
                  to={`/learn/${subjectId}/${topic.id}`} 
                  key={topic.id}
                  className="block"
                >
                  <motion.div 
                    className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      boxShadow: `0 0 15px ${subjectColor}30`
                    }}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 255, 255, 0.05) inset'
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        {getTopicIcon(topic)}
                      </div>
                      <span className="text-white">{topic.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white/70 text-sm mr-2">{topic.progress}%</span>
                      <ChevronRight className="h-4 w-4 text-white/50" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div>
            <div className="flex items-center mb-4">
              <motion.div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                style={{ 
                  background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
                }}
              >
                <span className="text-white text-sm font-bold">5</span>
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-white">Statistics</h3>
                <div className="flex items-center">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${getCategoryProgress(statistics)}%`,
                        backgroundColor: subjectColor
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${getCategoryProgress(statistics)}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-xs text-white/70">{getCategoryProgress(statistics)}%</span>
                </div>
              </div>
            </div>

            <div className="pl-10 space-y-3">
              {statistics.map((topic) => (
                <Link 
                  to={`/learn/${subjectId}/${topic.id}`} 
                  key={topic.id}
                  className="block"
                >
                  <motion.div 
                    className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      boxShadow: `0 0 15px ${subjectColor}30`
                    }}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 255, 255, 0.05) inset'
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        {getTopicIcon(topic)}
                      </div>
                      <span className="text-white">{topic.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white/70 text-sm mr-2">{topic.progress}%</span>
                      <ChevronRight className="h-4 w-4 text-white/50" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicsJourney;



