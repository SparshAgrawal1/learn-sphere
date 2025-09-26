import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ModernNavigationTree } from '@/components/learning/ModernNavigationTree';
import AITutorPanel from '@/components/learning/AITutorPanel';
import ContentFrame from '@/components/learning/ContentFrame';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock curriculum data
const mockCurriculum = {
  physics: {
    id: 'physics',
    name: 'Physics',
    chapters: [
      {
        id: 'mechanics',
        title: 'Mechanics',
        subtopics: [
          { id: 'gravity', title: 'Gravity and Universal Gravitation', progress: 80, completed: false },
          { id: 'motion', title: 'Newton\'s Laws of Motion', progress: 100, completed: true },
          { id: 'energy', title: 'Work, Energy and Power', progress: 45, completed: false },
          { id: 'momentum', title: 'Momentum and Impulse', progress: 0, completed: false },
        ]
      },
      {
        id: 'thermodynamics',
        title: 'Thermodynamics',
        subtopics: [
          { id: 'heat', title: 'Heat and Temperature', progress: 60, completed: false },
          { id: 'laws', title: 'Laws of Thermodynamics', progress: 0, completed: false },
        ]
      }
    ]
  },
  hindi: {
    id: 'hindi',
    name: 'Hindi',
    chapters: [
      {
        id: 'grammar',
        title: 'Grammar',
        subtopics: [
          { id: 'prefixes-suffixes', title: 'Prefixes and Suffixes', progress: 75, completed: false },
          { id: 'tenses', title: 'Tenses in Hindi', progress: 0, completed: false },
          { id: 'pronouns', title: 'Pronouns and Their Usage', progress: 0, completed: false }
        ]
      },
      {
        id: 'vocabulary',
        title: 'Vocabulary',
        subtopics: [
          { id: 'common-words', title: 'Common Words and Phrases', progress: 0, completed: false },
          { id: 'idioms', title: 'Hindi Idioms and Expressions', progress: 0, completed: false }
        ]
      }
    ]
  }
};

const lessonUrls = {
  gravity: '/lessons/gravity-physics.html',
  motion: '/lessons/gravity-physics.html', // Using same lesson for demo
  energy: '/lessons/gravity-physics.html',
  heat: '/lessons/gravity-physics.html',
  'prefixes-suffixes': '/lessons/hindi-prefixes-suffixes.html',
};

const Learning = () => {
  const { subject = 'physics', topic = 'gravity' } = useParams();
  const [currentSubtopic, setCurrentSubtopic] = useState(topic);
  const [aiMessages, setAiMessages] = useState<Array<{id: string, content: string, isAi: boolean, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  const curriculum = mockCurriculum[subject as keyof typeof mockCurriculum];
  
  if (!curriculum) {
    return <div>Subject not found</div>;
  }

  const currentSubtopicData = curriculum.chapters
    .flatMap(chapter => chapter.subtopics)
    .find(subtopic => subtopic.id === currentSubtopic);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: newMessage,
      isAi: false,
      timestamp: new Date()
    };

    setAiMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Great question about ${currentSubtopicData?.title}! ${newMessage.includes('gravity') ? 'Gravity is a fundamental force that attracts objects with mass toward each other.' : 'Let me help you understand this concept better.'}`,
        `That's an excellent point. In the context of ${currentSubtopicData?.title}, we need to consider the underlying principles and how they apply to real-world scenarios.`,
        `I can see you're thinking critically about this topic. Let me break this down for you step by step...`,
      ];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        isAi: true,
        timestamp: new Date()
      };

      setAiMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleProgress = (progress: number) => {
    console.log('Lesson progress:', progress);
    // In a real app, you'd save this progress to your backend
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Glassmorphic Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="glass-button flex items-center gap-2 text-sm">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <div className="h-6 w-px" style={{ background: 'var(--border-subtle)' }}></div>
            <div>
              <h1 className="glass-text-primary text-xl font-semibold tracking-tight">
                {curriculum.name}
              </h1>
              <p className="glass-text-orange text-sm font-medium">
                {currentSubtopicData?.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-badge-orange">
              Progress: {currentSubtopicData?.progress}%
            </div>
            <Link to="/" className="glass-button flex items-center gap-2 text-sm">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Learning Interface */}
      <div className="flex-1 flex overflow-hidden gap-4 p-4">
        {/* Left Panel - Navigation */}
        <div className="w-72 flex-shrink-0 glass-card p-0 overflow-hidden">
          <ModernNavigationTree
            subject={curriculum}
            currentSubtopic={currentSubtopic}
            onSubtopicSelect={setCurrentSubtopic}
          />
        </div>

        {/* Center Panel - Learning Content */}
        <div className="flex-1 overflow-hidden glass-card p-0">
          <ContentFrame
            subtopicId={currentSubtopic}
            title={currentSubtopicData?.title || 'Select a subtopic'}
            progress={currentSubtopicData?.progress || 0}
            subjectColor="#06B6D4"
            contentUrl={lessonUrls[currentSubtopic as keyof typeof lessonUrls] || lessonUrls.gravity}
            isPdfMode={false}
            onToggleMode={() => {}}
            onNavigateSubtopic={() => {}}
            onShowAssessment={() => handleProgress(10)}
          />
        </div>

        {/* Right Panel - AI Tutor */}
        <div className="w-80 flex-shrink-0 glass-card p-0 overflow-hidden">
          <AITutorPanel
            messages={aiMessages}
            newMessage={newMessage}
            isAiTyping={isAiTyping}
            onSendMessage={handleSendMessage}
            onMessageChange={setNewMessage}
            subtopicTitle={currentSubtopicData?.title || 'Physics'}
            themeColor={{
              accent: '#06B6D4',
              bg: '#155e75'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Learning;