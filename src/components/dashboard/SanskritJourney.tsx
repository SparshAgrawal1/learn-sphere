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

interface SanskritJourneyProps {
  topics: Topic[];
  subjectColor: string;
  subjectId: string;
}

const SanskritJourney: React.FC<SanskritJourneyProps> = ({ topics, subjectColor, subjectId }) => {
  // Group topics by category
  const readingWriting = topics.filter(t => t.id.startsWith('san-r') || t.id.startsWith('san-w'));
  const grammar = topics.filter(t => t.id.startsWith('san-g'));
  const literature = topics.filter(t => t.id.startsWith('san-l'));

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

  // Function to render a topic node
  const renderTopicNode = (topic: Topic, index: number, total: number, row: number) => {
    // Calculate position - evenly distribute across the available space
    const isCompleted = topic.completed;
    const isInProgress = topic.progress > 0 && !isCompleted;
    
    return (
      <Link 
        to={`/learn/${subjectId}/${topic.id}`} 
        key={topic.id}
        className="block"
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Circle with number */}
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center border-2 relative z-10"
            style={{ 
              borderColor: '#00B5D8',
              background: isCompleted 
                ? `linear-gradient(135deg, ${subjectColor}, ${subjectColor}80)`
                : 'linear-gradient(135deg, #ffffff20, #ffffff10)',
              boxShadow: isCompleted 
                ? `0 0 15px ${subjectColor}50`
                : '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="text-2xl font-bold text-white"
              animate={{ scale: isInProgress ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
            
            {/* Progress indicator */}
            {isInProgress && (
              <div className="absolute bottom-0 text-xs font-medium text-white bg-blue-500 rounded-full px-2 py-0.5">
                {topic.progress}%
              </div>
            )}
            
            {/* Completion indicator */}
            {isCompleted && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle className="h-3 w-3 text-white" />
              </motion.div>
            )}
          </motion.div>
          
          {/* Topic name */}
          <div className="text-center mt-2 w-full text-white">
            <div className="text-sm font-medium">{topic.name}</div>
            <div className="text-xs text-white/60">
              {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : ''}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  // Render connection lines between nodes
  const renderConnections = () => {
    return (
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
        {/* First row connections */}
        <motion.path
          d="M 130 40 L 250 40"
          stroke="#FF0080"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M 370 40 L 490 40"
          stroke="#FF0080"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.path
          d="M 610 40 L 730 40"
          stroke="#FF0080"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        
        {/* Connection from first to second row */}
        <motion.path
          d="M 730 70 C 770 100, 770 140, 730 170"
          stroke="#FF0080"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2 }}
        />
        
        {/* Second row connections */}
        <motion.path
          d="M 610 190 L 730 190"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
        <motion.path
          d="M 370 190 L 490 190"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 3 }}
        />
        <motion.path
          d="M 130 190 L 250 190"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
        />
        
        {/* Connection from second to third row */}
        <motion.path
          d="M 130 220 C 90 250, 90 290, 130 320"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 4 }}
        />
        
        {/* Third row connections */}
        <motion.path
          d="M 130 340 L 250 340"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 4.5 }}
        />
        <motion.path
          d="M 370 340 L 490 340"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 5 }}
        />
        <motion.path
          d="M 610 340 L 730 340"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 5.5 }}
        />
        
        {/* Connection from third to fourth row */}
        <motion.path
          d="M 730 370 C 770 400, 770 440, 730 470"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 6 }}
        />
        
        {/* Fourth row connections */}
        <motion.path
          d="M 610 490 L 730 490"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 6.5 }}
        />
        <motion.path
          d="M 370 490 L 490 490"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 7 }}
        />
        <motion.path
          d="M 130 490 L 250 490"
          stroke="#00B5D8"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 7.5 }}
        />
      </svg>
    );
  };

  return (
    <div className="relative w-full overflow-x-auto pb-10">
      <div className="min-w-[800px] h-[600px] relative p-4" style={{ overflowY: 'visible' }}>
        {/* Background Sanskrit text */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          {['संस्कृतम्', 'अध्ययनम्', 'विद्या', 'ज्ञानम्', 'शब्दः', 'वाक्यम्'].map((word, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl font-bold"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                color: subjectColor
              }}
              animate={{
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        {/* Connection lines */}
        {renderConnections()}

        {/* First row - Reading & Writing */}
        <div className="flex justify-around absolute top-0 left-0 w-full">
          {readingWriting.slice(0, 4).map((topic, index) => (
            <div key={topic.id} className="mx-2" style={{ position: 'absolute', left: `${index * 120 + 50}px`, top: '20px' }}>
              {renderTopicNode(topic, index, readingWriting.length, 1)}
            </div>
          ))}
        </div>
        
        {/* Second row - Grammar */}
        <div className="flex justify-around absolute top-[150px] left-0 w-full">
          {grammar.slice(0, 4).map((topic, index) => (
            <div key={topic.id} className="mx-2" style={{ position: 'absolute', left: `${(3-index) * 120 + 50}px`, top: '20px' }}>
              {renderTopicNode(topic, index + 4, grammar.length, 2)}
            </div>
          ))}
        </div>
        
        {/* Third row - Literature (first part) */}
        <div className="flex justify-around absolute top-[300px] left-0 w-full">
          {literature.slice(0, 4).map((topic, index) => (
            <div key={topic.id} className="mx-2" style={{ position: 'absolute', left: `${index * 120 + 50}px`, top: '20px' }}>
              {renderTopicNode(topic, index + 8, literature.length, 3)}
            </div>
          ))}
        </div>
        
        {/* Fourth row - Literature (second part) */}
        <div className="flex justify-around absolute top-[450px] left-0 w-full">
          {literature.slice(4, 8).map((topic, index) => (
            <div key={topic.id} className="mx-2" style={{ position: 'absolute', left: `${(3-index) * 120 + 50}px`, top: '20px' }}>
              {renderTopicNode(topic, index + 12, literature.length, 4)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SanskritJourney;













