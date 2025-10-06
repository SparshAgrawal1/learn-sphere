import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernNavigationTree } from '@/components/learning/ModernNavigationTree';
import AITutorPanel from '@/components/learning/AITutorPanel';
import ContentFrame from '@/components/learning/ContentFrame';
import { getLessonContentPath } from '@/utils/content-path-resolver';
import curriculum, { getClassCurriculum } from '@/data/curriculum';
import ClassBasedContentRenderer from '@/components/learning/ClassBasedContentRenderer';
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
  const { subject, chapter, topic } = useParams();
  const navigate = useNavigate();
  
  console.log('Learning component params:', { subject, chapter, topic });
  const [aiMessages, setAiMessages] = useState<Array<{id: string, content: string, isAi: boolean, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<any>(null);
  
  // Get selected class from session storage
  useEffect(() => {
    const classFromStorage = sessionStorage.getItem('selectedClass');
    if (classFromStorage) {
      setSelectedClass(classFromStorage);
    } else {
      // If no class is selected, redirect to class selection page
      console.log('No class selected, redirecting to class selection');
      navigate('/class-selection');
    }
  }, [navigate]);
  
  const handleContentLoad = (content: any) => {
    console.log('=== LEARNING CONTENT LOAD ===');
    console.log('Previous content path:', currentContent?.contentPath);
    console.log('New content path:', content?.contentPath);
    console.log('Selected subtopic:', content?.selectedSubtopic?.name);
    console.log('Path changed:', currentContent?.contentPath !== content?.contentPath);
    console.log('Full content object:', content);
    setCurrentContent(content);
    console.log('=== END LEARNING CONTENT LOAD ===');
  };

  // Add early return if no class is selected
  if (!selectedClass) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <h2 className="text-xl text-white mb-4">Loading...</h2>
          <p className="text-white/70">Please wait while we load your class information</p>
        </div>
      </div>
    );
  }

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
      const topicName = currentContent?.topic?.name || currentContent?.subject?.name || 'this topic';
      const responses = [
        `Great question about ${topicName}! ${newMessage.includes('gravity') ? 'Gravity is a fundamental force that attracts objects with mass toward each other.' : 'Let me help you understand this concept better.'}`,
        `That's an excellent point. In the context of ${topicName}, we need to consider the underlying principles and how they apply to real-world scenarios.`,
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
                {currentContent?.subject?.name || `${selectedClass} Grade`}
              </h1>
              <p className="glass-text-orange text-sm font-medium">
                {currentContent?.topic?.name || currentContent?.chapter?.name || 'Learning Dashboard'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-badge-orange">
              Progress: {currentContent?.topic?.progress || currentContent?.subject?.progress || 0}%
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
          <ClassBasedContentRenderer
            selectedClass={selectedClass}
            subjectId={subject}
            chapterId={chapter}
            topicId={topic}
            onContentLoad={handleContentLoad}
          />
        </div>

        {/* Center Panel - Learning Content */}
        <div className="flex-1 overflow-hidden glass-card p-0">
          {currentContent?.contentPath ? (
            <iframe 
              key={currentContent.contentPath} // Force reload when path changes
              src={currentContent.contentPath}
              className="w-full h-full border-none"
              title={`${currentContent.selectedSubtopic?.name || currentContent.topic?.name || 'Learning Content'} - ${selectedClass} Grade`}
              sandbox="allow-same-origin allow-scripts allow-forms"
              onLoad={() => console.log('Iframe loaded:', currentContent.contentPath)}
              onError={() => console.error('Iframe error loading:', currentContent.contentPath)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-xl text-white mb-4">Select a topic to begin learning</h3>
                <p className="text-white/70">Choose from the navigation panel on the left</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - AI Tutor */}
        <div className="w-80 flex-shrink-0 glass-card p-0 overflow-hidden">
          <AITutorPanel
            messages={aiMessages}
            newMessage={newMessage}
            isAiTyping={isAiTyping}
            onSendMessage={handleSendMessage}
            onMessageChange={setNewMessage}
            subtopicTitle={currentContent?.topic?.name || currentContent?.subject?.name || 'Learning'}
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