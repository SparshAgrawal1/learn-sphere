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

interface ScienceJourneyProps {
  topics: Topic[];
  subjectColor: string;
  subjectId: string;
}

const ScienceJourney: React.FC<ScienceJourneyProps> = ({ topics, subjectColor, subjectId }) => {
  // Group topics by category
  const physics = topics.filter(t => t.id.startsWith('sci-p'));
  const chemistry = topics.filter(t => t.id.startsWith('sci-c'));
  const biology = topics.filter(t => t.id.startsWith('sci-b'));

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

  // Molecule animation points
  const molecules = [
    { x: 20, y: 30, size: 12, speed: 5 },
    { x: 80, y: 15, size: 8, speed: 7 },
    { x: 40, y: 70, size: 15, speed: 4 },
    { x: 70, y: 60, size: 10, speed: 6 },
    { x: 30, y: 85, size: 9, speed: 8 },
    { x: 85, y: 40, size: 14, speed: 3 },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Science background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        {/* Molecules */}
        {molecules.map((molecule, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${molecule.x}%`,
              top: `${molecule.y}%`,
              width: molecule.size,
              height: molecule.size,
              backgroundColor: subjectColor,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
              x: [0, molecule.size * molecule.speed / 10, 0],
              y: [0, molecule.size * molecule.speed / -15, 0],
            }}
            transition={{
              duration: molecule.speed,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
        
        {/* DNA Helix */}
        <svg className="absolute right-10 top-10 w-40 h-80 opacity-10" viewBox="0 0 100 400">
          <motion.path
            d="M20,0 Q50,50 20,100 Q50,150 20,200 Q50,250 20,300 Q50,350 20,400"
            fill="none"
            stroke={subjectColor}
            strokeWidth="3"
            animate={{
              d: ["M20,0 Q50,50 20,100 Q50,150 20,200 Q50,250 20,300 Q50,350 20,400", 
                  "M20,0 Q50,50 20,100 Q50,150 20,200 Q50,250 20,300 Q50,350 20,400"]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M80,0 Q50,50 80,100 Q50,150 80,200 Q50,250 80,300 Q50,350 80,400"
            fill="none"
            stroke={subjectColor}
            strokeWidth="3"
            animate={{
              d: ["M80,0 Q50,50 80,100 Q50,150 80,200 Q50,250 80,300 Q50,350 80,400",
                  "M80,0 Q50,50 80,100 Q50,150 80,200 Q50,250 80,300 Q50,350 80,400"]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375].map((y, i) => (
            <motion.line
              key={i}
              x1="20" y1={y} x2="80" y2={y}
              stroke={subjectColor}
              strokeWidth="2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-4">
        {/* Physics Section */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ 
                background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-white/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7] 
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">Physics</h3>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${getCategoryProgress(physics)}%`,
                      backgroundColor: subjectColor
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryProgress(physics)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-white/70">{getCategoryProgress(physics)}%</span>
              </div>
            </div>
          </div>

          {/* Physics Topics */}
          <div className="pl-10">
            <div className="relative">
              {/* Connection lines */}
              <svg className="absolute left-3 top-6 h-full w-6" style={{ zIndex: -1 }}>
                <motion.path
                  d={`M 3 0 L 3 ${physics.length * 60}`}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
              </svg>
              
              <div className="space-y-3">
                {physics.map((topic, index) => (
                  <Link 
                    to={`/learn/${subjectId}/${topic.id}`} 
                    key={topic.id}
                    className="block"
                  >
                    <motion.div 
                      className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
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

        {/* Chemistry Section */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3 relative"
              style={{ 
                background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Molecule icon */}
              <motion.div className="absolute w-6 h-6">
                <motion.div 
                  className="absolute w-2 h-2 bg-white rounded-full top-0 left-2"
                  animate={{ y: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute w-2 h-2 bg-white rounded-full bottom-0 left-0"
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                  className="absolute w-2 h-2 bg-white rounded-full bottom-0 right-0"
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div 
                  className="absolute w-1 h-1 bg-white/70 rounded-full top-1 right-1"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">Chemistry</h3>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${getCategoryProgress(chemistry)}%`,
                      backgroundColor: subjectColor
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryProgress(chemistry)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-white/70">{getCategoryProgress(chemistry)}%</span>
              </div>
            </div>
          </div>

          {/* Chemistry Topics */}
          <div className="pl-10">
            <div className="relative">
              {/* Connection lines */}
              <svg className="absolute left-3 top-6 h-full w-6" style={{ zIndex: -1 }}>
                <motion.path
                  d={`M 3 0 L 3 ${chemistry.length * 60}`}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </svg>
              
              <div className="space-y-3">
                {chemistry.map((topic, index) => (
                  <Link 
                    to={`/learn/${subjectId}/${topic.id}`} 
                    key={topic.id}
                    className="block"
                  >
                    <motion.div 
                      className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
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

        {/* Biology Section */}
        <div>
          <div className="flex items-center mb-4">
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ 
                background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* DNA icon */}
              <motion.div className="w-6 h-6 relative">
                <motion.div 
                  className="absolute left-1 top-0 w-1 h-6 bg-white/80 rounded-full"
                  animate={{ rotateZ: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute right-1 top-0 w-1 h-6 bg-white/80 rounded-full"
                  animate={{ rotateZ: [0, -10, 0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-0.5 bg-white/60 rounded-full"
                    style={{ top: i * 1.2 + 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">Biology</h3>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${getCategoryProgress(biology)}%`,
                      backgroundColor: subjectColor
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getCategoryProgress(biology)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-white/70">{getCategoryProgress(biology)}%</span>
              </div>
            </div>
          </div>

          {/* Biology Topics */}
          <div className="pl-10">
            <div className="relative">
              {/* Connection lines */}
              <svg className="absolute left-3 top-6 h-full w-6" style={{ zIndex: -1 }}>
                <motion.path
                  d={`M 3 0 L 3 ${biology.length * 60}`}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 2 }}
                />
              </svg>
              
              <div className="space-y-3">
                {biology.map((topic, index) => (
                  <Link 
                    to={`/learn/${subjectId}/${topic.id}`} 
                    key={topic.id}
                    className="block"
                  >
                    <motion.div 
                      className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
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
    </div>
  );
};

export default ScienceJourney;



