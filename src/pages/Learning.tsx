import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavigationTree } from '@/components/learning/NavigationTree';
import { AITutor } from '@/components/learning/AITutor';
import { LessonFrame } from '@/components/learning/LessonFrame';
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
  }
};

const lessonUrls = {
  gravity: '/lessons/gravity-physics.html',
  motion: '/lessons/gravity-physics.html', // Using same lesson for demo
  energy: '/lessons/gravity-physics.html',
  heat: '/lessons/gravity-physics.html',
};

const Learning = () => {
  const { subject = 'physics', topic = 'gravity' } = useParams();
  const [currentSubtopic, setCurrentSubtopic] = useState(topic);
  
  const curriculum = mockCurriculum[subject as keyof typeof mockCurriculum];
  
  if (!curriculum) {
    return <div>Subject not found</div>;
  }

  const currentSubtopicData = curriculum.chapters
    .flatMap(chapter => chapter.subtopics)
    .find(subtopic => subtopic.id === currentSubtopic);

  const handleAskQuestion = async (question: string): Promise<string> => {
    // Simulate AI response - in real app, this would call your AI service
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      `Great question about ${currentSubtopicData?.title}! ${question.includes('gravity') ? 'Gravity is a fundamental force that attracts objects with mass toward each other.' : 'Let me help you understand this concept better.'}`,
      `That's an excellent point. In the context of ${currentSubtopicData?.title}, we need to consider the underlying principles and how they apply to real-world scenarios.`,
      `I can see you're thinking critically about this topic. Let me break this down for you step by step...`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleProgress = (progress: number) => {
    console.log('Lesson progress:', progress);
    // In a real app, you'd save this progress to your backend
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-lg text-foreground">
              {curriculum.name} - {currentSubtopicData?.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Interactive learning with AI assistance
            </p>
          </div>
        </div>
        
        <Button asChild variant="outline" size="sm">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Link>
        </Button>
      </header>

      {/* Main Learning Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Navigation Tree */}
        <div className="w-80 flex-shrink-0 border-r border-border">
          <NavigationTree
            subject={curriculum}
            currentSubtopic={currentSubtopic}
            onSubtopicSelect={setCurrentSubtopic}
          />
        </div>

        {/* Center Panel - Learning Content */}
        <div className="flex-1 overflow-hidden">
          <LessonFrame
            lessonUrl={lessonUrls[currentSubtopic as keyof typeof lessonUrls] || lessonUrls.gravity}
            onProgress={handleProgress}
          />
        </div>

        {/* Right Panel - AI Tutor */}
        <div className="w-80 flex-shrink-0 border-l border-border">
          <AITutor
            currentTopic={currentSubtopicData?.title || 'Physics'}
            onAskQuestion={handleAskQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default Learning;