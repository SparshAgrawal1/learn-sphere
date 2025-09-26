import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Globe, Landmark, TrendingUp } from 'lucide-react';
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

const SocialScienceJourney: React.FC<JourneyProps> = ({ topics, subjectColor, subjectId }) => {
  // Group topics by category
  const history = topics.filter(t => t.id.startsWith('soc-h'));
  const geography = topics.filter(t => t.id.startsWith('soc-g'));
  const politicalScience = topics.filter(t => t.id.startsWith('soc-p'));
  const economics = topics.filter(t => t.id.startsWith('soc-e'));

  // Background social science elements
  const backgroundElements = [
    { content: <Globe size={30} />, x: 15, y: 20, opacity: 0.08 },
    { content: <Clock size={30} />, x: 80, y: 15, opacity: 0.08 },
    { content: <Landmark size={30} />, x: 25, y: 75, opacity: 0.08 },
    { content: <TrendingUp size={30} />, x: 70, y: 85, opacity: 0.08 },
    { content: '1789', x: 40, y: 30, size: 24, opacity: 0.08 },
    { content: '1945', x: 60, y: 40, size: 24, opacity: 0.08 },
    { content: '1947', x: 20, y: 60, size: 24, opacity: 0.08 },
    { content: '1991', x: 75, y: 65, size: 24, opacity: 0.08 },
  ];

  // Timeline for history topics
  const timelineYears = [
    { year: '1700', x: 100 },
    { year: '1750', x: 150 },
    { year: '1800', x: 200 },
    { year: '1850', x: 250 },
    { year: '1900', x: 300 },
    { year: '1950', x: 350 },
    { year: '2000', x: 400 },
  ];

  // Map coordinates for geography topics
  const mapCoordinates = [
    { name: 'North', x: 300, y: 100 },
    { name: 'East', x: 400, y: 200 },
    { name: 'West', x: 200, y: 200 },
    { name: 'South', x: 300, y: 300 },
    { name: 'Central', x: 300, y: 200 },
    { name: 'Northeast', x: 400, y: 100 },
  ];

  // Institution positions for political science
  const institutionPositions = [
    { name: 'Parliament', x: 150, y: 400 },
    { name: 'Executive', x: 300, y: 400 },
    { name: 'Judiciary', x: 450, y: 400 },
    { name: 'Constitution', x: 300, y: 350 },
    { name: 'Democracy', x: 300, y: 450 },
  ];

  // Economy chart for economics
  const economyPoints = [
    { x: 150, y: 550 },
    { x: 200, y: 530 },
    { x: 250, y: 540 },
    { x: 300, y: 520 },
    { x: 350, y: 500 },
    { x: 400, y: 480 },
    { x: 450, y: 470 },
  ];

  return (
    <div className="relative w-full h-full min-h-[700px]">
      {/* Social Science background elements */}
      <BackgroundDecoration elements={backgroundElements} color={subjectColor} />

      {/* Main content */}
      <div className="relative z-10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Visual journey map */}
          <div className="relative min-h-[700px]">
            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
              {/* Timeline for history */}
              <motion.line
                x1="100" y1="150" x2="400" y2="150"
                stroke={subjectColor}
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              
              {/* Timeline markers */}
              {timelineYears.map((marker, i) => (
                <g key={`year-${i}`}>
                  <motion.line
                    x1={marker.x} y1="145" x2={marker.x} y2="155"
                    stroke={subjectColor}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                  />
                  <motion.text
                    x={marker.x} y="175"
                    fill="white"
                    fontSize="10"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                  >
                    {marker.year}
                  </motion.text>
                </g>
              ))}
              
              {/* India map outline (simplified) */}
              <motion.path
                d="M 250 100 C 280 80, 350 90, 380 110 C 400 130, 410 180, 400 220 C 390 260, 370 290, 350 310 C 330 330, 290 340, 250 330 C 210 320, 190 290, 180 260 C 170 230, 180 190, 200 160 C 220 130, 230 110, 250 100 Z"
                fill="none"
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
              
              {/* Map markers */}
              {mapCoordinates.map((marker, i) => (
                <motion.circle
                  key={`map-${i}`}
                  cx={marker.x} cy={marker.y} r="5"
                  fill={subjectColor}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 3 + i * 0.1 }}
                />
              ))}
              
              {/* Political institutions */}
              <motion.rect
                x="250" y="320" width="100" height="60"
                rx="5" ry="5"
                fill="none"
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 4 }}
              />
              
              {/* Connecting lines between institutions */}
              <motion.line
                x1="300" y1="350" x2="150" y2="400"
                stroke={subjectColor}
                strokeWidth="1.5"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 4.5 }}
              />
              <motion.line
                x1="300" y1="350" x2="300" y2="400"
                stroke={subjectColor}
                strokeWidth="1.5"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 4.7 }}
              />
              <motion.line
                x1="300" y1="350" x2="450" y2="400"
                stroke={subjectColor}
                strokeWidth="1.5"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 4.9 }}
              />
              <motion.line
                x1="300" y1="350" x2="300" y2="450"
                stroke={subjectColor}
                strokeWidth="1.5"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 5.1 }}
              />
              
              {/* Economics chart */}
              <motion.line
                x1="150" y1="550" x2="450" y2="550"
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 5.5 }}
              />
              <motion.line
                x1="150" y1="550" x2="150" y2="450"
                stroke={subjectColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 5.5 }}
              />
              
              {/* Chart line */}
              <motion.path
                d={`M ${economyPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                fill="none"
                stroke={subjectColor}
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 6 }}
              />
              
              {/* Chart points */}
              {economyPoints.map((point, i) => (
                <motion.circle
                  key={`econ-${i}`}
                  cx={point.x} cy={point.y} r="4"
                  fill={subjectColor}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 6 + i * 0.1 }}
                />
              ))}
            </svg>
            
            {/* History Topic Nodes */}
            {history.map((topic, index) => {
              // Position along the timeline
              const x = 100 + (index * 60);
              const y = 120;
              
              return (
                <div 
                  key={`history-${index}`} 
                  className="absolute"
                  style={{ 
                    left: `${x - 20}px`, 
                    top: `${y - 20}px`,
                    zIndex: 10
                  }}
                >
                  <Link to={`/learn/${subjectId}/${topic.id}`}>
                    <JourneyNode 
                      topic={topic} 
                      index={index + 1}
                      size="small"
                      color={subjectColor}
                      delay={1.5 + index * 0.2}
                    />
                  </Link>
                  
                  {/* Topic name tooltip */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs whitespace-nowrap"
                    style={{ top: '40px' }}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + index * 0.2 }}
                  >
                    {topic.name}
                  </motion.div>
                </div>
              );
            })}
            
            {/* Geography Topic Nodes */}
            {geography.map((topic, index) => {
              // Position on the map
              const position = mapCoordinates[index % mapCoordinates.length];
              
              return (
                <div 
                  key={`geography-${index}`} 
                  className="absolute"
                  style={{ 
                    left: `${position.x - 20}px`, 
                    top: `${position.y - 20}px`,
                    zIndex: 10
                  }}
                >
                  <Link to={`/learn/${subjectId}/${topic.id}`}>
                    <JourneyNode 
                      topic={topic} 
                      index={history.length + index + 1}
                      size="small"
                      color={subjectColor}
                      delay={3 + index * 0.2}
                    />
                  </Link>
                  
                  {/* Topic name tooltip */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs whitespace-nowrap"
                    style={{ top: index % 2 === 0 ? '40px' : '-30px' }}
                    initial={{ opacity: 0, y: index % 2 === 0 ? -5 : 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5 + index * 0.2 }}
                  >
                    {topic.name}
                  </motion.div>
                </div>
              );
            })}
            
            {/* Political Science Topic Nodes */}
            {politicalScience.map((topic, index) => {
              // Position around the constitution
              const position = institutionPositions[index % institutionPositions.length];
              
              return (
                <div 
                  key={`polsci-${index}`} 
                  className="absolute"
                  style={{ 
                    left: `${position.x - 20}px`, 
                    top: `${position.y - 20}px`,
                    zIndex: 10
                  }}
                >
                  <Link to={`/learn/${subjectId}/${topic.id}`}>
                    <JourneyNode 
                      topic={topic} 
                      index={history.length + geography.length + index + 1}
                      size="small"
                      color={subjectColor}
                      delay={4.5 + index * 0.2}
                    />
                  </Link>
                  
                  {/* Topic name tooltip */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs whitespace-nowrap"
                    style={{ top: index % 2 === 0 ? '40px' : '-30px' }}
                    initial={{ opacity: 0, y: index % 2 === 0 ? -5 : 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5 + index * 0.2 }}
                  >
                    {topic.name}
                  </motion.div>
                </div>
              );
            })}
            
            {/* Economics Topic Nodes */}
            {economics.map((topic, index) => {
              // Position along the chart
              const x = economyPoints[index % economyPoints.length].x;
              const y = economyPoints[index % economyPoints.length].y - 10;
              
              return (
                <div 
                  key={`econ-${index}`} 
                  className="absolute"
                  style={{ 
                    left: `${x - 20}px`, 
                    top: `${y - 20}px`,
                    zIndex: 10
                  }}
                >
                  <Link to={`/learn/${subjectId}/${topic.id}`}>
                    <JourneyNode 
                      topic={topic} 
                      index={history.length + geography.length + politicalScience.length + index + 1}
                      size="small"
                      color={subjectColor}
                      delay={6 + index * 0.2}
                    />
                  </Link>
                  
                  {/* Topic name tooltip */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs whitespace-nowrap"
                    style={{ top: '-30px' }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 6.5 + index * 0.2 }}
                  >
                    {topic.name}
                  </motion.div>
                </div>
              );
            })}
            
            {/* Category Labels */}
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '250px', top: '80px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              History
            </motion.div>
            
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '300px', top: '230px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0 }}
            >
              Geography
            </motion.div>
            
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '300px', top: '320px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.0 }}
            >
              Political Science
            </motion.div>
            
            <motion.div 
              className="absolute bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium"
              style={{ left: '300px', top: '430px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.0 }}
            >
              Economics
            </motion.div>
          </div>
          
          {/* Right column - Topic lists */}
          <div className="space-y-8">
            {/* History Section */}
            <div>
              <CategoryHeader
                title="History"
                progress={getCategoryProgress(history)}
                color={subjectColor}
                icon={<Clock className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {history.map((topic, index) => (
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
            
            {/* Geography Section */}
            <div>
              <CategoryHeader
                title="Geography"
                progress={getCategoryProgress(geography)}
                color={subjectColor}
                icon={<Globe className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {geography.map((topic, index) => (
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
            
            {/* Political Science Section */}
            <div>
              <CategoryHeader
                title="Political Science"
                progress={getCategoryProgress(politicalScience)}
                color={subjectColor}
                icon={<Landmark className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {politicalScience.map((topic, index) => (
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
            
            {/* Economics Section */}
            <div>
              <CategoryHeader
                title="Economics"
                progress={getCategoryProgress(economics)}
                color={subjectColor}
                icon={<TrendingUp className="h-5 w-5 text-white" />}
              />
              <div className="pl-8 space-y-2">
                {economics.map((topic, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialScienceJourney;



