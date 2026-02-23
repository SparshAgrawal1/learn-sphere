import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SimpleAITutorPanel from '@/components/learning/SimpleAITutorPanel';
import ClassBasedContentRenderer from '@/components/learning/ClassBasedContentRenderer';
import QuizModal from '@/components/learning/QuizModal';
import { ArrowLeft, Home, ChevronLeft, ChevronRight, PanelLeft, PanelRight, FileText, Monitor } from 'lucide-react';
import { YouTubeEmbed } from '../components/ui/YouTubeEmbed';
import { isYouTubeURL } from '../utils/youtube-utils';
import Logo from '@/components/landing/Logo';

const Learning = () => {
  const { subject, chapter, topic } = useParams();
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<any>(null);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [showPdf, setShowPdf] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    const classFromStorage = sessionStorage.getItem('selectedClass');
    if (classFromStorage) {
      setSelectedClass(classFromStorage);
    } else {
      sessionStorage.setItem('selectedClass', '9th');
      setSelectedClass('9th');
    }

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
      if (typeof (window as any).stopNarration === 'function') (window as any).stopNarration();
      if (typeof (window as any).forceCleanupAITutor === 'function') (window as any).forceCleanupAITutor();
      if (typeof (window as any).stopStoryNarration === 'function') (window as any).stopStoryNarration();
    };
  }, [navigate]);

  const handleContentLoad = (content: any) => {
    if (content.showQuizModal) {
      setShowQuizModal(true);
      return;
    }
    setCurrentContent(content);
    setShowPdf(false);
  };

  const stopAllNarrations = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
    if (typeof (window as any).stopNarration === 'function') (window as any).stopNarration();
    if (typeof (window as any).stopStoryNarration === 'function') (window as any).stopStoryNarration();
  };

  useEffect(() => {
    stopAllNarrations();
  }, [currentContent?.contentPath]);

  if (!selectedClass) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#0891B2] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm" style={{ color: '#64748B' }}>Loading...</p>
        </div>
      </div>
    );
  }

  const getBackUrl = () => {
    if (topic && chapter && subject) return `/learn/${subject}`;
    if (chapter && subject) return `/learn/${subject}`;
    return '/dashboard';
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof (window as any).forceCleanupAITutor === 'function') (window as any).forceCleanupAITutor();
    setTimeout(() => navigate(getBackUrl()), 100);
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <header className="flex-shrink-0 h-14 flex items-center justify-between px-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo size="sm" variant="dark" />
          <div className="h-5 w-[1px] bg-slate-200" />
          <Link to={getBackUrl()} onClick={handleBackClick}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#0891B2]"
            style={{ color: '#64748B' }}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <h1 className="text-sm font-semibold leading-none" style={{ color: '#1E3A5F' }}>
              {currentContent?.subject?.name || subject || 'Learning'}
            </h1>
            <p className="text-[11px] leading-none mt-1" style={{ color: '#0891B2' }}>
              {currentContent?.topic?.name || currentContent?.chapter?.name || 'Select a topic'}
            </p>
          </div>
          {(currentContent?.topic?.pdfPath || currentContent?.pdfPath) && (
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50">
              <Monitor className={`h-3.5 w-3.5 transition-colors ${!showPdf ? 'text-[#0891B2]' : 'text-slate-400'}`} />
              <button
                onClick={() => { if (!showPdf) stopAllNarrations(); setShowPdf(!showPdf); }}
                className={`relative w-9 h-5 rounded-full transition-all duration-200 ${showPdf ? 'bg-[#0891B2]' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${showPdf ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
              </button>
              <FileText className={`h-3.5 w-3.5 transition-colors ${showPdf ? 'text-[#0891B2]' : 'text-slate-400'}`} />
            </div>
          )}
          <Link to="/dashboard" className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[#0891B2]"
            style={{ color: '#64748B' }}>
            <Home className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Navigation */}
        <div className={`flex-shrink-0 border-r border-slate-200 bg-white overflow-hidden transition-all duration-300 ease-in-out relative ${isLeftPanelOpen ? 'w-72' : 'w-0'}`}>
          {isLeftPanelOpen && (
            <div className="w-72 h-full overflow-y-auto p-4 scrollbar-thin">
              <ClassBasedContentRenderer
                selectedClass={selectedClass}
                subjectId={subject}
                chapterId={chapter}
                topicId={topic}
                onContentLoad={handleContentLoad}
              />
            </div>
          )}
          {!isLeftPanelOpen && (
            <button onClick={() => setIsLeftPanelOpen(true)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center z-20 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              <PanelLeft className="h-4 w-4" style={{ color: '#64748B' }} />
            </button>
          )}
          <button onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
            className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            {isLeftPanelOpen ? <ChevronLeft className="h-3 w-3" style={{ color: '#64748B' }} /> : <ChevronRight className="h-3 w-3" style={{ color: '#64748B' }} />}
          </button>
        </div>

        {/* Center - Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          <div className="flex-1 relative">
            {currentContent?.contentPath ? (
              showPdf && (currentContent.topic?.pdfPath || currentContent.pdfPath) ? (
                <iframe src={currentContent.topic?.pdfPath || currentContent.pdfPath} className="w-full h-full border-0" title="PDF Content" style={{ background: 'white' }} />
              ) : isYouTubeURL(currentContent.contentPath) ? (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <YouTubeEmbed url={currentContent.contentPath} className="w-full max-w-4xl aspect-video rounded-xl shadow-lg" />
                </div>
              ) : (
                <iframe src={currentContent.contentPath} className="w-full h-full border-0 bg-white" title="Learning Content" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
              )
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(8,145,178,0.1)' }}>
                    <FileText className="h-8 w-8" style={{ color: '#0891B2' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>Select a Topic</h3>
                  <p className="text-sm" style={{ color: '#64748B' }}>Choose a topic from the left panel to start learning</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel - AI Tutor */}
        <div className={`flex-shrink-0 border-l border-slate-200 bg-white overflow-hidden transition-all duration-300 ease-in-out relative ${isRightPanelOpen ? 'w-80' : 'w-0'}`}>
          {isRightPanelOpen && (
            <div className="w-80 h-full overflow-hidden">
              <SimpleAITutorPanel
                subtopicTitle={currentContent?.topic?.name || currentContent?.chapter?.name || 'Learning'}
                themeColor={{ accent: '#0891B2', bg: '#E0F2FE' }}
                pdfPath={currentContent?.topic?.pdfPath || currentContent?.pdfPath}
                chapterName={currentContent?.chapter?.name}
                classNumber={selectedClass}
                subjectName={currentContent?.subject?.name}
              />
            </div>
          )}
          {!isRightPanelOpen && (
            <button onClick={() => setIsRightPanelOpen(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center z-20 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              <PanelRight className="h-4 w-4" style={{ color: '#64748B' }} />
            </button>
          )}
          <button onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            {isRightPanelOpen ? <ChevronRight className="h-3 w-3" style={{ color: '#64748B' }} /> : <ChevronLeft className="h-3 w-3" style={{ color: '#64748B' }} />}
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onStartQuiz={() => {}}
        topicName={currentContent?.topic?.name || 'Topic'}
        chapterName={currentContent?.chapter?.name || 'Chapter'}
        subjectName={currentContent?.subject?.name}
        classNumber={selectedClass || '9th'}
        pdfPath={currentContent?.topic?.pdfPath || currentContent?.pdfPath}
      />
    </div>
  );
};

export default Learning;
