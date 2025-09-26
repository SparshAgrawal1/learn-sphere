import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, BookOpen, Feather, FileText } from 'lucide-react';
import {
  JourneyProps,
  Topic,
  DESIGN,
  getCategoryProgress,
  CategoryHeader,
  TopicCard,
  BackgroundDecoration,
  JourneyNode
} from './JourneyDesignSystem';

const EnglishJourney: React.FC<JourneyProps> = ({ topics, subjectColor, subjectId }) => {
  // Group topics by category
  const readingWriting = topics.filter(t => t.id.startsWith('eng-1') || t.id.startsWith('eng-2') || t.id.startsWith('eng-3') || t.id.startsWith('eng-4'));
  const grammar = topics.filter(t => t.id.startsWith('eng-5') || t.id.startsWith('eng-6') || t.id.startsWith('eng-7') || t.id.startsWith('eng-8') || t.id.startsWith('eng-9'));
  const literature = topics.filter(t => t.id.startsWith('eng-10') || t.id.startsWith('eng-11') || t.id.startsWith('eng-12'));

  // Background literary elements
  const literaryElements = [
    { content: '"', x: 10, y: 15, size: 60 },
    { content: '"', x: 90, y: 85, size: 60 },
    { content: '!', x: 85, y: 20, size: 40 },
    { content: '?', x: 15, y: 80, size: 40 },
    { content: '—', x: 50, y: 40, size: 50 },
    { content: ';', x: 20, y: 60, size: 30 },
    { content: '...', x: 70, y: 30, size: 30 },
    { content: 'A', x: 25, y: 25, size: 35 },
    { content: 'Z', x: 75, y: 75, size: 35 },
    { content: 'T', x: 40, y: 85, size: 35 },
    { content: 'O', x: 60, y: 15, size: 35 },
  ];

  // Book-shaped journey path coordinates
  const bookPath = {
    // Book spine
    spine: "M 100 100 L 100 500",
    // Top pages
    topPages: "M 100 100 C 150 80, 250 80, 300 100",
    // Bottom pages
    bottomPages: "M 100 500 C 150 520, 250 520, 300 500",
    // Right edge
    rightEdge: "M 300 100 L 300 500",
  };

  // Node positions for each category
  const nodePositions = {
    readingWriting: [
      { x: 150, y: 150 },
      { x: 250, y: 150 },
      { x: 150, y: 220 },
      { x: 250, y: 220 },
    ],
    grammar: [
      { x: 150, y: 300 },
      { x: 250, y: 300 },
      { x: 150, y: 370 },
      { x: 250, y: 370 },
      { x: 200, y: 430 },
    ],
    literature: [
      { x: 400, y: 200 },
      { x: 500, y: 250 },
      { x: 400, y: 300 },
    ],
  };

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Literary background elements */}
      <BackgroundDecoration elements={literaryElements} color={subjectColor} />

      {/* Main content */}
      <div className="relative z-10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Book visualization */}
          <div className="relative min-h-[600px]">
            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
              {/* Book outline */}
              <motion.path
                d={bookPath.spine}
                stroke={subjectColor}
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.path
                d={bookPath.topPages}
                stroke={subjectColor}
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.path
                d={bookPath.bottomPages}
                stroke={subjectColor}
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <motion.path
                d={bookPath.rightEdge}
                stroke={subjectColor}
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              
              {/* Page lines */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.path
                  key={i}
                  d={`M 110 ${100 + i * 50} L 290 ${100 + i * 50}`}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                />
              ))}
              
              {/* Connection lines between nodes */}
              {/* Reading & Writing connections */}
              <motion.path
                d={`M ${nodePositions.readingWriting[0].x} ${nodePositions.readingWriting[0].y} L ${nodePositions.readingWriting[1].x} ${nodePositions.readingWriting[1].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              />
              <motion.path
                d={`M ${nodePositions.readingWriting[1].x} ${nodePositions.readingWriting[1].y} L ${nodePositions.readingWriting[3].x} ${nodePositions.readingWriting[3].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              />
              <motion.path
                d={`M ${nodePositions.readingWriting[3].x} ${nodePositions.readingWriting[3].y} L ${nodePositions.readingWriting[2].x} ${nodePositions.readingWriting[2].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.9 }}
              />
              <motion.path
                d={`M ${nodePositions.readingWriting[2].x} ${nodePositions.readingWriting[2].y} L ${nodePositions.readingWriting[0].x} ${nodePositions.readingWriting[0].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.1 }}
              />
              
              {/* Connection to Grammar */}
              <motion.path
                d={`M ${nodePositions.readingWriting[2].x} ${nodePositions.readingWriting[2].y} L ${nodePositions.grammar[0].x} ${nodePositions.grammar[0].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.3 }}
              />
              
              {/* Grammar connections */}
              <motion.path
                d={`M ${nodePositions.grammar[0].x} ${nodePositions.grammar[0].y} L ${nodePositions.grammar[1].x} ${nodePositions.grammar[1].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              />
              <motion.path
                d={`M ${nodePositions.grammar[1].x} ${nodePositions.grammar[1].y} L ${nodePositions.grammar[3].x} ${nodePositions.grammar[3].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              />
              <motion.path
                d={`M ${nodePositions.grammar[3].x} ${nodePositions.grammar[3].y} L ${nodePositions.grammar[2].x} ${nodePositions.grammar[2].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.9 }}
              />
              <motion.path
                d={`M ${nodePositions.grammar[2].x} ${nodePositions.grammar[2].y} L ${nodePositions.grammar[0].x} ${nodePositions.grammar[0].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.1 }}
              />
              
              {/* Connection to final grammar node */}
              <motion.path
                d={`M ${nodePositions.grammar[2].x} ${nodePositions.grammar[2].y} L ${nodePositions.grammar[4].x} ${nodePositions.grammar[4].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.3 }}
              />
              <motion.path
                d={`M ${nodePositions.grammar[3].x} ${nodePositions.grammar[3].y} L ${nodePositions.grammar[4].x} ${nodePositions.grammar[4].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.5 }}
              />
              
              {/* Connection to Literature */}
              <motion.path
                d={`M ${nodePositions.grammar[4].x} ${nodePositions.grammar[4].y} C ${nodePositions.grammar[4].x + 50} ${nodePositions.grammar[4].y}, ${nodePositions.literature[0].x - 50} ${nodePositions.literature[0].y}, ${nodePositions.literature[0].x} ${nodePositions.literature[0].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 3.7 }}
              />
              
              {/* Literature connections */}
              <motion.path
                d={`M ${nodePositions.literature[0].x} ${nodePositions.literature[0].y} L ${nodePositions.literature[1].x} ${nodePositions.literature[1].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 4.0 }}
              />
              <motion.path
                d={`M ${nodePositions.literature[1].x} ${nodePositions.literature[1].y} L ${nodePositions.literature[2].x} ${nodePositions.literature[2].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 4.2 }}
              />
              <motion.path
                d={`M ${nodePositions.literature[2].x} ${nodePositions.literature[2].y} L ${nodePositions.literature[0].x} ${nodePositions.literature[0].y}`}
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 4.4 }}
              />
            </svg>
            
            {/* Reading & Writing Nodes */}
            <div className="absolute" style={{ left: `${nodePositions.readingWriting[0].x - 20}px`, top: `${nodePositions.readingWriting[0].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${readingWriting[0]?.id}`}>
                <JourneyNode 
                  topic={readingWriting[0]} 
                  index={1}
                  size="small"
                  color={subjectColor}
                  delay={1.5}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.readingWriting[1].x - 20}px`, top: `${nodePositions.readingWriting[1].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${readingWriting[1]?.id}`}>
                <JourneyNode 
                  topic={readingWriting[1]} 
                  index={2}
                  size="small"
                  color={subjectColor}
                  delay={1.6}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.readingWriting[2].x - 20}px`, top: `${nodePositions.readingWriting[2].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${readingWriting[2]?.id}`}>
                <JourneyNode 
                  topic={readingWriting[2]} 
                  index={3}
                  size="small"
                  color={subjectColor}
                  delay={1.7}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.readingWriting[3].x - 20}px`, top: `${nodePositions.readingWriting[3].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${readingWriting[3]?.id}`}>
                <JourneyNode 
                  topic={readingWriting[3]} 
                  index={4}
                  size="small"
                  color={subjectColor}
                  delay={1.8}
                />
              </Link>
            </div>
            
            {/* Grammar Nodes */}
            <div className="absolute" style={{ left: `${nodePositions.grammar[0].x - 20}px`, top: `${nodePositions.grammar[0].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${grammar[0]?.id}`}>
                <JourneyNode 
                  topic={grammar[0]} 
                  index={5}
                  size="small"
                  color={subjectColor}
                  delay={2.3}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.grammar[1].x - 20}px`, top: `${nodePositions.grammar[1].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${grammar[1]?.id}`}>
                <JourneyNode 
                  topic={grammar[1]} 
                  index={6}
                  size="small"
                  color={subjectColor}
                  delay={2.4}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.grammar[2].x - 20}px`, top: `${nodePositions.grammar[2].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${grammar[2]?.id}`}>
                <JourneyNode 
                  topic={grammar[2]} 
                  index={7}
                  size="small"
                  color={subjectColor}
                  delay={2.5}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.grammar[3].x - 20}px`, top: `${nodePositions.grammar[3].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${grammar[3]?.id}`}>
                <JourneyNode 
                  topic={grammar[3]} 
                  index={8}
                  size="small"
                  color={subjectColor}
                  delay={2.6}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.grammar[4].x - 20}px`, top: `${nodePositions.grammar[4].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${grammar[4]?.id}`}>
                <JourneyNode 
                  topic={grammar[4]} 
                  index={9}
                  size="small"
                  color={subjectColor}
                  delay={3.3}
                />
              </Link>
            </div>
            
            {/* Literature Nodes */}
            <div className="absolute" style={{ left: `${nodePositions.literature[0].x - 20}px`, top: `${nodePositions.literature[0].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${literature[0]?.id}`}>
                <JourneyNode 
                  topic={literature[0]} 
                  index={10}
                  size="small"
                  color={subjectColor}
                  delay={3.8}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.literature[1].x - 20}px`, top: `${nodePositions.literature[1].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${literature[1]?.id}`}>
                <JourneyNode 
                  topic={literature[1]} 
                  index={11}
                  size="small"
                  color={subjectColor}
                  delay={3.9}
                />
              </Link>
            </div>
            <div className="absolute" style={{ left: `${nodePositions.literature[2].x - 20}px`, top: `${nodePositions.literature[2].y - 20}px` }}>
              <Link to={`/learn/${subjectId}/${literature[2]?.id}`}>
                <JourneyNode 
                  topic={literature[2]} 
                  index={12}
                  size="small"
                  color={subjectColor}
                  delay={4.0}
                />
              </Link>
            </div>
            
            {/* Category Labels */}
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '200px', top: '110px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              Reading & Writing
            </motion.div>
            
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '200px', top: '270px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0 }}
            >
              Grammar
            </motion.div>
            
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '450px', top: '170px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.0 }}
            >
              Literature
            </motion.div>
          </div>
          
          {/* Right column - Topic lists */}
          <div className="space-y-8">
            {/* Reading & Writing Section */}
            <div>
              <CategoryHeader
                title="Reading & Writing"
                progress={getCategoryProgress(readingWriting)}
                color={subjectColor}
                icon={<FileText className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {readingWriting.map((topic, index) => (
                  <Link key={topic.id} to={`/learn/${subjectId}/${topic.id}`}>
                    <TopicCard
                      topic={topic}
                      color={subjectColor}
                      delay={0.5 + index * 0.1}
                    />
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Grammar Section */}
            <div>
              <CategoryHeader
                title="Grammar"
                progress={getCategoryProgress(grammar)}
                color={subjectColor}
                icon={<Feather className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {grammar.map((topic, index) => (
                  <Link key={topic.id} to={`/learn/${subjectId}/${topic.id}`}>
                    <TopicCard
                      topic={topic}
                      color={subjectColor}
                      delay={1.0 + index * 0.1}
                    />
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Literature Section */}
            <div>
              <CategoryHeader
                title="Literature"
                progress={getCategoryProgress(literature)}
                color={subjectColor}
                icon={<Book className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {literature.map((topic, index) => (
                  <Link key={topic.id} to={`/learn/${subjectId}/${topic.id}`}>
                    <TopicCard
                      topic={topic}
                      color={subjectColor}
                      delay={1.5 + index * 0.1}
                    />
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

export default EnglishJourney;



