import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernNavigationTree } from '@/components/learning/ModernNavigationTree';
import SimpleAITutorPanel from '@/components/learning/SimpleAITutorPanel';
import ContentFrame from '@/components/learning/ContentFrame';
import { getLessonContentPath } from '@/utils/content-path-resolver';
import curriculum, { getClassCurriculum } from '@/data/curriculum';
import ClassBasedContentRenderer from '@/components/learning/ClassBasedContentRenderer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, ChevronLeft, ChevronRight, PanelLeft, PanelRight, FileText, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { YouTubeEmbed } from '../components/ui/YouTubeEmbed';
import { isYouTubeURL } from '../utils/youtube-utils';

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
  
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<any>(null);
  
  // Panel visibility states
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  
  // PDF/Visual content toggle state
  const [showPdf, setShowPdf] = useState(false);
  
  // Get selected class from session storage
  useEffect(() => {
    const classFromStorage = sessionStorage.getItem('selectedClass');
    if (classFromStorage) {
      setSelectedClass(classFromStorage);
    } else {
      // If no class is selected, redirect to class selection page
      navigate('/class-selection');
    }

    // Cleanup function to stop any ongoing narrations when component unmounts or navigates
    return () => {
      // Stop any speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Stop any audio elements
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      
      // Call any global narration stop functions that might exist
      if (typeof (window as any).stopNarration === 'function') {
        (window as any).stopNarration();
      }
      
      // Stop any story narration
      if (typeof (window as any).stopStoryNarration === 'function') {
        (window as any).stopStoryNarration();
      }
    };
  }, [navigate]);
  
  const handleContentLoad = (content: any) => {
    // Debug: Log the content being received
    console.log('Learning.tsx - handleContentLoad received:', content);
    console.log('Learning.tsx - topic pdfPath:', content?.topic?.pdfPath);
    console.log('Learning.tsx - topic name:', content?.topic?.name);
    console.log('Learning.tsx - subject name:', content?.subject?.name);
    
    setCurrentContent(content);
    // Reset PDF toggle to visual content when new content is loaded
    setShowPdf(false);
  };

  // Helper function to stop all narrations
  const stopAllNarrations = () => {
    // Stop speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Stop any audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    // Call any global narration stop functions that might exist
    if (typeof (window as any).stopNarration === 'function') {
      (window as any).stopNarration();
    }
    
    // Stop any story narration
    if (typeof (window as any).stopStoryNarration === 'function') {
      (window as any).stopStoryNarration();
    }
  };

  // Cleanup narrations when content changes
  useEffect(() => {
    // Stop any ongoing narrations when content changes
    stopAllNarrations();
  }, [currentContent?.contentPath]);

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


  const handleProgress = (progress: number) => {
    // In a real app, you'd save this progress to your backend
  };

  // Get the appropriate back navigation URL
  const getBackUrl = () => {
    if (topic && chapter && subject) {
      // If viewing a topic, go back to chapter/subject view (the Science page with chapters)
      return `/subject/${subject}`;
    } else if (chapter && subject) {
      // If viewing a chapter, go back to subject view  
      return `/subject/${subject}`;
    } else if (subject) {
      // If viewing a subject, go back to dashboard
      return '/dashboard';
    }
    // Default fallback
    return '/dashboard';
  };

  const getBackLabel = () => {
    if (topic || chapter) {
      return 'Back to Chapters';
    } else if (subject) {
      return 'Back to Dashboard';
    }
    return 'Dashboard';
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Glassmorphic Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              to={getBackUrl()} 
              className="glass-button flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              {getBackLabel()}
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
            
            {/* PDF/Visual Toggle Button - only show if topic has PDF */}
            {currentContent?.topic?.pdfPath && (
              <div className="flex items-center gap-2 glass-card p-2">
                <Monitor className={`h-4 w-4 transition-colors ${!showPdf ? 'text-orange-400' : 'text-white/50'}`} />
                <button
                  onClick={() => {
                    // Stop all narrations when switching to PDF
                    if (!showPdf) {
                      stopAllNarrations();
                    }
                    setShowPdf(!showPdf);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                    showPdf ? 'bg-orange-500' : 'bg-white/20'
                  }`}
                  title={showPdf ? 'Switch to Visual Content' : 'Switch to PDF'}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    showPdf ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
                <FileText className={`h-4 w-4 transition-colors ${showPdf ? 'text-orange-400' : 'text-white/50'}`} />
              </div>
            )}
            
            <Link to="/" className="glass-button flex items-center gap-2 text-sm">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Learning Interface */}
      <div className="flex-1 flex overflow-hidden gap-4 p-4 relative">
        {/* Left Panel - Navigation */}
        <div className={`flex-shrink-0 glass-card p-0 overflow-hidden transition-all duration-300 ease-in-out relative ${
          isLeftPanelOpen ? 'w-72' : 'w-0 opacity-0 pointer-events-none'
        }`}>
          <ClassBasedContentRenderer
            selectedClass={selectedClass}
            subjectId={subject}
            chapterId={chapter}
            topicId={topic}
            onContentLoad={handleContentLoad}
          />
          
          {/* Left Panel Toggle Button - positioned on the right side */}
          {isLeftPanelOpen && (
            <button
              onClick={() => setIsLeftPanelOpen(false)}
              className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 border-2 border-white/20"
              title="Collapse navigation panel"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Left Panel Collapsed Toggle Button */}
        {!isLeftPanelOpen && (
          <button
            onClick={() => setIsLeftPanelOpen(true)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-20 border-2 border-white/20"
            title="Expand navigation panel"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        )}

        {/* Center Panel - Learning Content */}
        <div className={`flex-1 overflow-hidden glass-card p-0 transition-all duration-300 ease-in-out ${
          !isLeftPanelOpen && !isRightPanelOpen ? 'mx-16' : 
          !isLeftPanelOpen ? 'ml-16' : 
          !isRightPanelOpen ? 'mr-16' : ''
        }`}>
          {currentContent?.contentPath ? (
            // Check if user wants to view PDF and PDF exists
            (showPdf && currentContent?.topic?.pdfPath) ? (
              <iframe 
                key={currentContent.topic.pdfPath} // Force reload when PDF path changes
                src={`${currentContent.topic.pdfPath}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full border-none"
                title={`${currentContent.topic?.name || 'Learning Content'} - PDF Guide - ${selectedClass} Grade`}
                onLoad={() => {/* PDF loaded successfully */}}
                onError={() => console.error('Error loading PDF:', currentContent.topic.pdfPath)}
              />
              
            ) : 
            // Check if it's a YouTube video
            (currentContent.contentType === 'video' || isYouTubeURL(currentContent.contentPath)) ? (
              <YouTubeEmbed
                url={currentContent.contentPath}
                title={`${currentContent.selectedSubtopic?.name || currentContent.topic?.name || 'Learning Content'} - ${selectedClass} Grade`}
                className="w-full h-full"
                showThumbnail={false}
                autoplay={false}
              />
            ) : (
              <iframe 
                key={currentContent.contentPath} // Force reload when path changes
                src={currentContent.contentPath}
                className="w-full h-full border-none"
                title={`${currentContent.selectedSubtopic?.name || currentContent.topic?.name || 'Learning Content'} - ${selectedClass} Grade`}
                sandbox="allow-same-origin allow-scripts allow-forms"
                onLoad={() => {/* Content loaded */}}
                onError={() => console.error('Error loading content:', currentContent.contentPath)}
              />
            )
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
        <div className={`flex-shrink-0 glass-card p-0 overflow-hidden transition-all duration-300 ease-in-out relative ${
          isRightPanelOpen ? 'w-80' : 'w-0 opacity-0 pointer-events-none'
        }`}>
          <SimpleAITutorPanel
            subtopicTitle={currentContent?.topic?.name || currentContent?.subject?.name || 'Learning'}
            themeColor={{
              accent: '#06B6D4',
              bg: '#155e75'
            }}
            pdfPath={currentContent?.topic?.pdfPath}
            chapterName={currentContent?.topic?.name}
            classNumber={selectedClass}
            subjectName={currentContent?.subject?.name}
            onTogglePdfMode={() => {
              // Stop all narrations when switching to PDF
              if (!showPdf) {
                stopAllNarrations();
              }
              setShowPdf(!showPdf);
            }}
          />
          
          {/* Right Panel Toggle Button - positioned on the left side */}
          {isRightPanelOpen && (
            <button
              onClick={() => setIsRightPanelOpen(false)}
              className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 border-2 border-white/20"
              title="Collapse AI assistant panel"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Right Panel Collapsed Toggle Button */}
        {!isRightPanelOpen && (
          <button
            onClick={() => setIsRightPanelOpen(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-20 border-2 border-white/20"
            title="Expand AI assistant panel"
          >
            <PanelRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Learning;