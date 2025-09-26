import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Feather, FileText, BookMarked } from 'lucide-react';
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

const HindiJourney: React.FC<JourneyProps> = ({ topics, subjectColor, subjectId }) => {
  // Group topics by category
  const grammar = topics.filter(t => t.id.startsWith('hin-g'));
  const prose = topics.filter(t => t.id.startsWith('hin-p'));
  const poetry = topics.filter(t => t.id.startsWith('hin-po'));
  const supplementary = topics.filter(t => t.id.startsWith('hin-s'));

  // Background Hindi cultural elements
  const culturalElements = [
    { content: 'अ', x: 10, y: 15, size: 40 },
    { content: 'आ', x: 85, y: 20, size: 40 },
    { content: 'इ', x: 20, y: 80, size: 40 },
    { content: 'ई', x: 75, y: 85, size: 40 },
    { content: 'क', x: 30, y: 40, size: 40 },
    { content: 'ख', x: 60, y: 30, size: 40 },
    { content: 'ग', x: 40, y: 60, size: 40 },
    { content: 'घ', x: 70, y: 65, size: 40 },
    { content: '।', x: 25, y: 25, size: 40 },
    { content: '॥', x: 80, y: 45, size: 40 },
    { content: 'ॐ', x: 50, y: 75, size: 50 },
  ];

  // Create a river-like flowing path for topics
  const createRiverPath = () => {
    // Start point
    const startX = 100;
    const startY = 100;
    
    // Control points for the flowing river
    const points = [
      { x: startX, y: startY },
      { x: startX + 100, y: startY + 50 },
      { x: startX + 50, y: startY + 150 },
      { x: startX + 200, y: startY + 200 },
      { x: startX + 150, y: startY + 300 },
      { x: startX + 300, y: startY + 350 },
      { x: startX + 400, y: startY + 250 },
      { x: startX + 500, y: startY + 300 },
      { x: startX + 550, y: startY + 200 },
      { x: startX + 450, y: startY + 100 },
      { x: startX + 600, y: startY + 50 },
    ];
    
    // Generate SVG path
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Create a curved line to the next point
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      
      // Control points for the curve (simplified Bezier)
      const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 2;
      const cp1y = prevPoint.y;
      const cp2x = prevPoint.x + (currentPoint.x - prevPoint.x) / 2;
      const cp2y = currentPoint.y;
      
      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentPoint.x} ${currentPoint.y}`;
    }
    
    return {
      path: pathD,
      points
    };
  };

  const riverPath = createRiverPath();
  
  // Calculate node positions along the river
  const calculateNodePositions = () => {
    const allTopics = [...grammar, ...prose, ...poetry, ...supplementary];
    const totalTopics = allTopics.length;
    const positions = [];
    
    // Place nodes along the river path
    for (let i = 0; i < totalTopics; i++) {
      // Calculate position based on the river path points
      const pointIndex = Math.min(Math.floor(i * (riverPath.points.length - 1) / (totalTopics - 1)), riverPath.points.length - 1);
      const nextPointIndex = Math.min(pointIndex + 1, riverPath.points.length - 1);
      
      // Interpolate between points for smoother distribution
      const t = (i * (riverPath.points.length - 1) / (totalTopics - 1)) - pointIndex;
      
      const x = riverPath.points[pointIndex].x * (1 - t) + riverPath.points[nextPointIndex].x * t;
      const y = riverPath.points[pointIndex].y * (1 - t) + riverPath.points[nextPointIndex].y * t;
      
      // Add some randomness for natural flow
      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 20;
      
      positions.push({
        x: x + offsetX,
        y: y + offsetY,
        topic: allTopics[i]
      });
    }
    
    return positions;
  };
  
  const nodePositions = calculateNodePositions();

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Hindi cultural background elements */}
      <BackgroundDecoration elements={culturalElements} color={subjectColor} />

      {/* Main content */}
      <div className="relative z-10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - River flow visualization */}
          <div className="relative min-h-[600px]">
            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
              {/* River path */}
              <motion.path
                d={riverPath.path}
                stroke={subjectColor}
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              
              {/* River flow animation */}
              <motion.path
                d={riverPath.path}
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0.6}
                strokeDasharray="5 15"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  pathOffset: [0, 1]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Connecting lines between nodes */}
              {nodePositions.map((node, i) => {
                if (i < nodePositions.length - 1) {
                  return (
                    <motion.path
                      key={`line-${i}`}
                      d={`M ${node.x} ${node.y} L ${nodePositions[i+1].x} ${nodePositions[i+1].y}`}
                      stroke={subjectColor}
                      strokeWidth="2"
                      opacity={0.8}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
                    />
                  );
                }
                return null;
              })}
            </svg>
            
            {/* Topic nodes along the river */}
            {nodePositions.map((node, i) => (
              <div 
                key={`node-${i}`} 
                className="absolute"
                style={{ 
                  left: `${node.x - 20}px`, 
                  top: `${node.y - 20}px`,
                  zIndex: 10
                }}
              >
                <Link to={`/learn/${subjectId}/${node.topic.id}`}>
                  <JourneyNode 
                    topic={node.topic} 
                    index={i + 1}
                    size="small"
                    color={subjectColor}
                    delay={2 + i * 0.15}
                  />
                </Link>
                
                {/* Topic name tooltip */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs whitespace-nowrap"
                  style={{ top: i % 2 === 0 ? '40px' : '-30px' }}
                  initial={{ opacity: 0, y: i % 2 === 0 ? -5 : 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + i * 0.15 }}
                >
                  {node.topic.name}
                </motion.div>
              </div>
            ))}
            
            {/* Category Labels */}
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '150px', top: '60px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              व्याकरण (Grammar)
            </motion.div>
            
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '250px', top: '180px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0 }}
            >
              गद्य (Prose)
            </motion.div>
            
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '450px', top: '220px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              कविता (Poetry)
            </motion.div>
          </div>
          
          {/* Right column - Topic lists */}
          <div className="space-y-8">
            {/* Grammar Section */}
            <div>
              <CategoryHeader
                title="व्याकरण (Grammar)"
                progress={getCategoryProgress(grammar)}
                color={subjectColor}
                icon={<FileText className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {grammar.map((topic, index) => (
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
            
            {/* Prose Section */}
            <div>
              <CategoryHeader
                title="गद्य (Prose)"
                progress={getCategoryProgress(prose)}
                color={subjectColor}
                icon={<BookOpen className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {prose.map((topic, index) => (
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
            
            {/* Poetry Section */}
            <div>
              <CategoryHeader
                title="कविता (Poetry)"
                progress={getCategoryProgress(poetry)}
                color={subjectColor}
                icon={<Feather className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {poetry.map((topic, index) => (
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
            
            {/* Supplementary Section */}
            {supplementary.length > 0 && (
              <div>
                <CategoryHeader
                  title="पूरक पुस्तक (Supplementary)"
                  progress={getCategoryProgress(supplementary)}
                  color={subjectColor}
                  icon={<BookMarked className="h-5 w-5 text-white" />}
                />
                <div className="pl-8 space-y-2">
                  {supplementary.map((topic, index) => (
                    <Link key={topic.id} to={`/learn/${subjectId}/${topic.id}`}>
                      <TopicCard
                        topic={topic}
                        color={subjectColor}
                        delay={2.0 + index * 0.1}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HindiJourney;



