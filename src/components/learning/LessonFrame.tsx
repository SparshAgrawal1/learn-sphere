import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Play } from 'lucide-react';

interface LessonFrameProps {
  lessonUrl: string;
  onProgress?: (progress: number) => void;
}

export const LessonFrame = ({ lessonUrl, onProgress }: LessonFrameProps) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for messages from the iframe if needed for progress tracking
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'lesson-progress' && onProgress) {
        onProgress(event.data.progress);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onProgress]);

  const getCurrentUrl = () => {
    if (viewMode === 'pdf') {
      // Convert the interactive lesson URL to PDF version
      return lessonUrl.replace('.html', '-pdf.html');
    }
    return lessonUrl;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toggle Header */}
      <div className="bg-white border-b border-border p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-foreground">Lesson Content</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'interactive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('interactive')}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Interactive
            </Button>
            <Button
              variant={viewMode === 'pdf' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('pdf')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              PDF View
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {viewMode === 'interactive' ? 'Interactive demonstration mode' : 'Printable PDF format'}
        </div>
      </div>

      {/* Content Frame */}
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          src={getCurrentUrl()}
          className="lesson-frame w-full h-full border-0"
          title={`Lesson Content - ${viewMode === 'interactive' ? 'Interactive' : 'PDF'} Mode`}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms"
          key={viewMode} // Force reload when mode changes
        />
      </div>
    </div>
  );
};