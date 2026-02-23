import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SimpleAITutorPanel from '@/components/learning/SimpleAITutorPanel';
import ClassBasedContentRenderer from '@/components/learning/ClassBasedContentRenderer';
import QuizModal from '@/components/learning/QuizModal';
import { ArrowLeft, Home, ChevronLeft, ChevronRight, PanelLeft, PanelRight, FileText, Monitor } from 'lucide-react';
import { YouTubeEmbed } from '../components/ui/YouTubeEmbed';
import { isYouTubeURL } from '../utils/youtube-utils';

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
      <div className="h-screen flex items-center justify-center bg-[#0F0D08]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm">Loading...</p>
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
    <div className="h-screen flex flex-col bg-[#0F0D08]">
      {/* Header bar */}
      <header className="flex-shrink-0 h-14 flex items-center justify-between px-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <Link
            to={getBackUrl()}
            onClick={handleBackClick}
            className="flex items-center gap-1.5 text-white/35 hover:text-orange-400/80 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="h-4 w-[1px] bg-white/[0.08]" />
          <div>
            <h1 className="text-sm font-semibold text-white/80 leading-none">
              {currentContent?.subject?.name || subject || 'Learning'}
            </h1>
            <p className="text-[11px] text-orange-400/50 leading-none mt-1">
              {currentContent?.topic?.name || currentContent?.chapter?.name || 'Select a topic'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentContent?.topic?.pdfPath && (
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <Monitor className={`h-3.5 w-3.5 transition-colors ${!showPdf ? 'text-orange-400' : 'text-white/25'}`} />
              <button
                onClick={() => {
                  if (!showPdf) stopAllNarrations();
                  setShowPdf(!showPdf);
                }}
                className={`relative w-9 h-5 rounded-full transition-all duration-200 ${showPdf ? 'bg-orange-500' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${showPdf ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
              </button>
              <FileText className={`h-3.5 w-3.5 transition-colors ${showPdf ? 'text-orange-400' : 'text-white/25'}`} />
            </div>
          )}

          <Link to="/dashboard" className="flex items-center gap-1.5 text-white/25 hover:text-orange-400/60 text-xs transition-colors">
            <Home className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main learning area */}
      <div className="flex-1 flex overflow-hidden gap-0 relative">
        {/* Left - Navigation */}
        <div className={`flex-shrink-0 border-r border-white/[0.06] bg-[#0F0D08] overflow-hidden transition-all duration-300 ease-in-out relative ${
          isLeftPanelOpen ? 'w-72' : 'w-0'
        }`}>
          <ClassBasedContentRenderer
            selectedClass={selectedClass}
            subjectId={subject}
            chapterId={chapter}
            topicId={topic}
            onContentLoad={handleContentLoad}
          />

          {isLeftPanelOpen && (
            <button
              onClick={() => setIsLeftPanelOpen(false)}
              className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10 border border-orange-500/20 bg-[#0F0D08] hover:bg-orange-500/10 transition-colors"
            >
              <ChevronLeft className="h-3 w-3 text-white/40" />
            </button>
          )}
        </div>

        {!isLeftPanelOpen && (
          <button
            onClick={() => setIsLeftPanelOpen(true)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center z-20 border border-orange-500/20 bg-[#0F0D08] hover:bg-orange-500/10 transition-colors"
          >
            <PanelLeft className="h-4 w-4 text-white/40" />
          </button>
        )}

        {/* Center - Content */}
        <div className={`flex-1 overflow-hidden bg-[#0D0D12] transition-all duration-300 ${
          !isLeftPanelOpen ? 'ml-12' : ''
        } ${!isRightPanelOpen ? 'mr-12' : ''}`}>
          {currentContent?.contentPath ? (
            (showPdf && currentContent?.topic?.pdfPath) ? (
              <iframe
                key={currentContent.topic.pdfPath}
                src={`${currentContent.topic.pdfPath}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full border-none"
                title={`${currentContent.topic?.name || 'Content'} - PDF`}
              />
            ) :
            (currentContent.contentType === 'video' || isYouTubeURL(currentContent.contentPath)) ? (
              <YouTubeEmbed
                url={currentContent.contentPath}
                title={currentContent.selectedSubtopic?.name || currentContent.topic?.name || 'Video'}
                className="w-full h-full"
                showThumbnail={false}
                autoplay={false}
              />
            ) : (
              <iframe
                key={currentContent.contentPath}
                src={currentContent.contentPath}
                className="w-full h-full border-none"
                title={currentContent.selectedSubtopic?.name || currentContent.topic?.name || 'Content'}
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(14,165,233,0.1))' }}
                >
                  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="url(#empty-grad)" strokeWidth="2" fill="none" />
                    <path d="M20 10L30 16V26L20 32L10 26V16L20 10Z" fill="url(#empty-grad)" fillOpacity="0.1" />
                    <defs>
                      <linearGradient id="empty-grad" x1="5" y1="4" x2="35" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00D4AA" />
                        <stop offset="1" stopColor="#0EA5E9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white/70 mb-2">Select a topic</h3>
                <p className="text-sm text-white/30">Choose from the navigation panel to begin your learning journey</p>
              </div>
            </div>
          )}
        </div>

        {/* Right - AI Tutor */}
        <div className={`flex-shrink-0 border-l border-white/[0.06] bg-[#0F0D08] overflow-hidden transition-all duration-300 ease-in-out relative ${
          isRightPanelOpen ? 'w-80' : 'w-0'
        }`}>
          <SimpleAITutorPanel
            subtopicTitle={currentContent?.topic?.name || currentContent?.subject?.name || 'Learning'}
            themeColor={{ accent: '#FF6B35', bg: '#1C0E06' }}
            pdfPath={currentContent?.topic?.pdfPath}
            chapterName={currentContent?.topic?.name}
            classNumber={selectedClass}
            subjectName={currentContent?.chapter?.name || currentContent?.subject?.name}
            onTogglePdfMode={() => {
              if (!showPdf) stopAllNarrations();
              setShowPdf(!showPdf);
            }}
          />

          {isRightPanelOpen && (
            <button
              onClick={() => setIsRightPanelOpen(false)}
              className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10 border border-teal-500/20 bg-[#0F0D08] hover:bg-teal-500/10 transition-colors"
            >
              <ChevronRight className="h-3 w-3 text-white/40" />
            </button>
          )}
        </div>

        {!isRightPanelOpen && (
          <button
            onClick={() => setIsRightPanelOpen(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center z-20 border border-teal-500/20 bg-[#0F0D08] hover:bg-teal-500/10 transition-colors"
          >
            <PanelRight className="h-4 w-4 text-white/40" />
          </button>
        )}
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onStartQuiz={() => setShowQuizModal(true)}
        topicName={currentContent?.topic?.name}
        chapterName={currentContent?.chapter?.name}
        subjectName={currentContent?.chapter?.name || currentContent?.subject?.name}
        classNumber={selectedClass}
        pdfPath={currentContent?.topic?.pdfPath}
      />
    </div>
  );
};

export default Learning;
