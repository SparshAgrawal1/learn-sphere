import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import custom components
import ModernNavigationPanel from '@/components/learning/ModernNavigationPanel';
import ContentFrame from '@/components/learning/ContentFrame';
import SimpleAITutorPanel from '@/components/learning/SimpleAITutorPanel';
import AssessmentPanel from '@/components/learning/AssessmentPanel';
import curriculum from '@/data/curriculum';

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

interface SubTopic {
  id: string;
  title: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
  questions?: Question[];
}

interface Topic {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  subtopics: SubTopic[];
  description: string;
}


const EnhancedTopicPage: React.FC = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const navigate = useNavigate();
  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isPdfMode, setIsPdfMode] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<any>(null);
  
  // Create particles for background
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: 2 + Math.random() * 3, // Smaller particles
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 20
  }));

  // Get selected class from session storage
  useEffect(() => {
    const classFromStorage = sessionStorage.getItem('selectedClass');
    if (classFromStorage) {
      setSelectedClass(classFromStorage);
    }
  }, []);

  // Load curriculum data when class is available
  useEffect(() => {
    if (!selectedClass || !subjectId || !topicId) return;

    const classData = curriculum[selectedClass];
    if (!classData) return;

    const subject = classData.find(s => s.id.toLowerCase() === subjectId.toLowerCase());
    if (!subject) return;

    // Find the topic in the subject's chapters
    let foundTopic = null;
    for (const chapter of subject.chapters) {
      if (chapter.topics) {
        foundTopic = chapter.topics.find(t => t.id === topicId);
        if (foundTopic) {
          setCurrentContent({
            subject: subject,
            chapter: chapter,
            topic: foundTopic
          });
          break;
        }
      }
    }
  }, [selectedClass, subjectId, topicId]);

  useEffect(() => {
    // This would normally be fetched from an API
    let mockTopic: Topic;
    
    if (subjectId === 'hindi' && topicId === 'prefixes-suffixes') {
      mockTopic = {
        id: 'prefixes-suffixes',
        title: 'Prefixes and Suffixes',
        subjectId: 'hindi',
        subjectName: 'Hindi',
        subjectColor: '#06B6D4',
        description: 'Learn how prefixes and suffixes modify Hindi words to create new meanings.',
        subtopics: [
          {
            id: 'hindi-prefixes-suffixes',
            title: 'Introduction to Prefixes and Suffixes',
            progress: 75,
            isLocked: false,
            isCompleted: false,
            questions: [
              {
                id: 'q1',
                text: 'What is the Hindi term for prefix?',
                options: [
                  { id: 'a', text: 'प्रत्यय (pratyay)' },
                  { id: 'b', text: 'उपसर्ग (upsarg)' },
                  { id: 'c', text: 'विभक्ति (vibhakti)' },
                  { id: 'd', text: 'संधि (sandhi)' }
                ],
                correctAnswer: 'b'
              },
              {
                id: 'q2',
                text: 'Which of the following is NOT a Hindi prefix?',
                options: [
                  { id: 'a', text: 'अ' },
                  { id: 'b', text: 'सु' },
                  { id: 'c', text: 'दुर्' },
                  { id: 'd', text: 'ता' }
                ],
                correctAnswer: 'd'
              }
            ]
          }
        ]
      };
    } else {
      mockTopic = {
        id: 'gravity',
        title: 'Gravitation',
        subjectId: 'science',
        subjectName: 'Science',
        subjectColor: '#F59E0B',
        description: 'Learn about the force that shapes our universe and governs planetary motion.',
        subtopics: [
          {
            id: 'gravity-physics',
            title: 'Introduction to Gravity',
            progress: 75,
            isLocked: false,
            isCompleted: false,
            questions: [
            {
              id: 'q1',
              text: 'What is the gravitational force between two objects proportional to?',
              options: [
                { id: 'a', text: 'The sum of their masses' },
                { id: 'b', text: 'The product of their masses' },
                { id: 'c', text: 'The difference of their masses' },
                { id: 'd', text: 'The ratio of their masses' }
              ],
              correctAnswer: 'b'
            },
            {
              id: 'q2',
              text: 'How does the gravitational force change as the distance between two objects increases?',
              options: [
                { id: 'a', text: 'It increases proportionally' },
                { id: 'b', text: 'It decreases proportionally' },
                { id: 'c', text: 'It decreases with the square of the distance' },
                { id: 'd', text: 'It remains constant' }
              ],
              correctAnswer: 'c'
            }]
          },
          {
            id: 'laws-planetary-motion',
            title: 'Laws of Planetary Motion',
            progress: 0,
            isLocked: false,
            isCompleted: false,
            questions: []
          },
          {
            id: 'gravitational-field',
            title: 'Gravitational Field',
            progress: 0,
            isLocked: true,
            isCompleted: false,
            questions: []
          },
          {
            id: 'gravitational-potential',
            title: 'Gravitational Potential Energy',
            progress: 0,
            isLocked: true,
            isCompleted: false,
            questions: []
          }
        ]
      };
    }
    
    setTopic(mockTopic);
    
    // Set the first non-locked subtopic as active
    const firstAvailableSubtopic = mockTopic.subtopics.find(st => !st.isLocked);
    if (firstAvailableSubtopic) {
      setActiveSubtopicId(firstAvailableSubtopic.id);
    }
    
  }, [topicId, subjectId]);
  
  const handleSubtopicClick = (subtopicId: string) => {
    setActiveSubtopicId(subtopicId);
    setShowAssessment(false);
    
    // Close mobile navigation if open
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
    }
  };
  
  // Toggle between interactive and PDF mode
  const handleToggleMode = () => {
    setIsPdfMode(prev => !prev);
  };
  
  
  const handleShowAssessment = () => {
    setShowAssessment(true);
    setAssessmentCompleted(false);
    setSelectedAnswers({});
  };
  
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  const handleSubmitAssessment = () => {
    const activeSubtopic = topic?.subtopics.find(st => st.id === activeSubtopicId);
    if (!activeSubtopic?.questions) return;
    
    // Calculate score
    let correctCount = 0;
    activeSubtopic.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / activeSubtopic.questions.length) * 100);
    setAssessmentScore(score);
    setAssessmentCompleted(true);
    
    // Update topic completion if score is 80% or higher
    if (score >= 80) {
      const updatedSubtopics = topic.subtopics.map(st => {
        if (st.id === activeSubtopicId) {
          return { ...st, progress: 100, isCompleted: true };
        }
        return st;
      });
      
      setTopic(prev => prev ? { ...prev, subtopics: updatedSubtopics } : null);
      
      // Unlock next subtopic if available
      const currentIndex = topic.subtopics.findIndex(st => st.id === activeSubtopicId);
      if (currentIndex < topic.subtopics.length - 1) {
        const nextSubtopic = topic.subtopics[currentIndex + 1];
        if (nextSubtopic.isLocked) {
          const updatedSubtopicsWithUnlock = updatedSubtopics.map((st, idx) => {
            if (idx === currentIndex + 1) {
              return { ...st, isLocked: false };
            }
            return st;
          });
          
          setTopic(prev => prev ? { ...prev, subtopics: updatedSubtopicsWithUnlock } : null);
        }
      }
    }
  };
  
  // Get active subtopic
  const activeSubtopic = topic?.subtopics.find(st => st.id === activeSubtopicId);
  
  // Get previous and next subtopics for navigation
  const getAdjacentSubtopics = () => {
    if (!topic) return { prev: null, next: null };
    
    const currentIndex = topic.subtopics.findIndex(st => st.id === activeSubtopicId);
    const prev = currentIndex > 0 ? topic.subtopics[currentIndex - 1] : null;
    const next = currentIndex < topic.subtopics.length - 1 ? topic.subtopics[currentIndex + 1] : null;
    
    return { prev, next };
  };
  
  const { prev: prevSubtopic, next: nextSubtopic } = getAdjacentSubtopics();
  
  // Theme color based on subject
  const getThemeColor = () => {
    // Use the explicit subjectId from URL params if available
    const currentSubjectId = subjectId || topic?.subjectId;
    
    switch (currentSubjectId) {
      case 'mathematics': return { accent: '#10B981', bg: '#064e3b' };
      case 'science': return { accent: '#F59E0B', bg: '#78350f' };
      case 'english': return { accent: '#8B5CF6', bg: '#4c1d95' };
      case 'social': return { accent: '#EF4444', bg: '#7f1d1d' };
      case 'hindi': return { accent: '#06B6D4', bg: '#155e75' };
      case 'sanskrit': return { accent: '#EC4899', bg: '#831843' };
      default: return { accent: '#3B82F6', bg: '#1e40af' };
    }
  };
  
  const themeColor = getThemeColor();
  
  // Get subject-specific background illustration
  const getSubjectIllustration = () => {
    const currentSubjectId = subjectId || topic?.subjectId;
    
    switch (currentSubjectId) {
      case 'mathematics':
        return (
          <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mathematics Illustration */}
            <g className="mathematics-elements">
              <circle cx="200" cy="150" r="50" stroke="#10B981" strokeWidth="2" strokeDasharray="5 5" />
              <circle cx="200" cy="150" r="30" stroke="#10B981" strokeWidth="2" />
              <line x1="150" y1="150" x2="250" y2="150" stroke="#10B981" strokeWidth="2" />
              <line x1="200" y1="100" x2="200" y2="200" stroke="#10B981" strokeWidth="2" />
              
              <path d="M500 120 Q 550 50, 600 120" stroke="#10B981" strokeWidth="2" fill="none" />
              <path d="M500 150 L 550 100 L 600 150" stroke="#10B981" strokeWidth="2" fill="none" />
              
              <text x="350" y="300" fill="#10B981" fontSize="14">y = mx + b</text>
              <text x="150" y="350" fill="#10B981" fontSize="14">E = mc²</text>
              <text x="550" y="400" fill="#10B981" fontSize="14">a² + b² = c²</text>
            </g>
          </svg>
        );
      case 'science':
        return (
          <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Science Illustration */}
            <g className="science-elements">
              {/* Atom */}
              <ellipse cx="400" cy="200" rx="80" ry="30" stroke="#F59E0B" strokeWidth="2" fill="none" transform="rotate(0, 400, 200)" />
              <ellipse cx="400" cy="200" rx="80" ry="30" stroke="#F59E0B" strokeWidth="2" fill="none" transform="rotate(60, 400, 200)" />
              <ellipse cx="400" cy="200" rx="80" ry="30" stroke="#F59E0B" strokeWidth="2" fill="none" transform="rotate(120, 400, 200)" />
              <circle cx="400" cy="200" r="15" fill="#F59E0B" fillOpacity="0.5" />
              
              {/* Molecule */}
              <circle cx="200" cy="400" r="15" fill="#F59E0B" fillOpacity="0.5" />
              <circle cx="250" cy="350" r="15" fill="#F59E0B" fillOpacity="0.5" />
              <circle cx="150" cy="350" r="15" fill="#F59E0B" fillOpacity="0.5" />
              <line x1="200" y1="400" x2="250" y2="350" stroke="#F59E0B" strokeWidth="2" />
              <line x1="200" y1="400" x2="150" y2="350" stroke="#F59E0B" strokeWidth="2" />
            </g>
          </svg>
        );
      case 'hindi':
        return (
          <svg className="absolute h-full w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hindi Illustration */}
            <g className="hindi-elements">
              <text x="300" y="200" fill="#06B6D4" fontSize="28">अ आ इ ई</text>
              <text x="300" y="250" fill="#06B6D4" fontSize="28">क ख ग घ</text>
              
              {/* Decorative Elements */}
              <path d="M150 150 C 200 100, 250 200, 300 150" stroke="#06B6D4" strokeWidth="2" fill="none" />
              <path d="M150 170 C 200 120, 250 220, 300 170" stroke="#06B6D4" strokeWidth="2" fill="none" />
              
              <path d="M500 150 C 550 100, 600 200, 650 150" stroke="#06B6D4" strokeWidth="2" fill="none" />
              <path d="M500 170 C 550 120, 600 220, 650 170" stroke="#06B6D4" strokeWidth="2" fill="none" />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-black/80 text-white overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          opacity: 0.5
        }}
      />
      
      {/* Subject-specific background illustration */}
      {getSubjectIllustration()}
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `rgba(${parseInt(themeColor.accent.slice(1, 3), 16)}, ${parseInt(themeColor.accent.slice(3, 5), 16)}, ${parseInt(themeColor.accent.slice(5, 7), 16)}, 0.2)`,
          }}
          animate={{
            y: [0, -30, -10, -25, 0],
            x: [0, 20, -15, 5, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
      
      {/* 3D Floor Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at center bottom, 
              rgba(${parseInt(themeColor.accent.slice(1, 3), 16)}, ${parseInt(themeColor.accent.slice(3, 5), 16)}, ${parseInt(themeColor.accent.slice(5, 7), 16)}, 0.15) 0%, 
              rgba(${parseInt(themeColor.accent.slice(1, 3), 16)}, ${parseInt(themeColor.accent.slice(3, 5), 16)}, ${parseInt(themeColor.accent.slice(5, 7), 16)}, 0.08) 40%, 
              rgba(${parseInt(themeColor.accent.slice(1, 3), 16)}, ${parseInt(themeColor.accent.slice(3, 5), 16)}, ${parseInt(themeColor.accent.slice(5, 7), 16)}, 0.03) 70%,
              transparent 100%
            ),
            linear-gradient(180deg, 
              transparent 0%, 
              rgba(0, 0, 0, 0.1) 40%, 
              rgba(0, 0, 0, 0.2) 100%
            )
          `,
          transform: 'perspective(1000px) rotateX(75deg)',
          transformOrigin: 'center bottom'
        }}
      >
        {/* Enhanced Grid Pattern */}
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(${parseInt(themeColor.accent.slice(1, 3), 16)}, ${parseInt(themeColor.accent.slice(3, 5), 16)}, ${parseInt(themeColor.accent.slice(5, 7), 16)}, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${parseInt(themeColor.accent.slice(1, 3), 16)}, ${parseInt(themeColor.accent.slice(3, 5), 16)}, ${parseInt(themeColor.accent.slice(5, 7), 16)}, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Assessment Panel - Shown when assessment is active */}
      <AnimatePresence>
        {showAssessment && activeSubtopic?.questions && (
          <motion.div 
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AssessmentPanel
              questions={activeSubtopic.questions}
              selectedAnswers={selectedAnswers}
              onSelectAnswer={handleAnswerSelect}
              onSubmit={handleSubmitAssessment}
              assessmentCompleted={assessmentCompleted}
              assessmentScore={assessmentScore}
              themeColor={themeColor.accent}
              onClose={() => setShowAssessment(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Layout */}
      <div className="flex w-full h-full p-2 gap-2 z-10">
        {/* Left Side - Navigation Panel */}
        <div className={`${isMobileNavOpen ? 'block absolute inset-0 z-10' : 'hidden'} md:block md:w-1/5 lg:w-1/6 z-10`}>
          {topic && (
            <ModernNavigationPanel
              topic={topic}
              activeSubtopicId={activeSubtopicId}
              onSubtopicClick={handleSubtopicClick}
              onShowAssessment={handleShowAssessment}
              isMobile={isMobileNavOpen}
              onClose={() => setIsMobileNavOpen(false)}
            />
          )}
        </div>
        
        {/* Center Panel - Content */}
        <div className="flex-grow relative rounded-2xl overflow-hidden">
          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center justify-between p-2 bg-black/40 backdrop-blur-md border-b border-white/10">
            <motion.button 
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </motion.button>
            
            <h3 className="text-xs font-medium">{activeSubtopic?.title || topic?.title}</h3>
            
            <motion.button 
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10"
              onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </motion.button>
          </div>
          
          {/* Content Area */}
          {activeSubtopic ? (
            <ContentFrame
              subtopicId={activeSubtopic.id}
              title={activeSubtopic.title}
              progress={activeSubtopic.progress}
              subjectColor={themeColor.accent}
              contentUrl={`/lessons/${activeSubtopic.id}.html`}
              pdfUrl={`/lessons/${activeSubtopic.id}-pdf.html`}
              isPdfMode={isPdfMode}
              onToggleMode={handleToggleMode}
              onShowAssessment={handleShowAssessment}
              prevSubtopic={prevSubtopic}
              nextSubtopic={nextSubtopic}
              onNavigateSubtopic={handleSubtopicClick}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <motion.div 
                className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor.accent}40, ${themeColor.accent}10)`,
                    boxShadow: `0 0 20px ${themeColor.accent}20`
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-2">Select a topic to begin</h3>
                <p className="text-xs text-white/70">Choose a topic from the navigation panel to start learning</p>
              </motion.div>
            </div>
          )}
        </div>
        
        {/* Right Side - AI Tutor Panel */}
        <div className={`${isMobileChatOpen ? 'block absolute inset-0 z-10' : 'hidden'} md:block md:w-1/5 lg:w-1/6 z-10`}>
          <SimpleAITutorPanel
            subtopicTitle={activeSubtopic?.title || currentContent?.topic?.name || 'Select a topic'}
            themeColor={themeColor}
            isMobile={isMobileChatOpen}
            onClose={() => setIsMobileChatOpen(false)}
            pdfPath={currentContent?.topic?.pdfPath}
            chapterName={currentContent?.topic?.name}
            classNumber={selectedClass}
            subjectName={currentContent?.subject?.name}
            onTogglePdfMode={handleToggleMode}
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedTopicPage;