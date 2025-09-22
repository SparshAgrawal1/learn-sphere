import { useEffect, useRef } from 'react';

interface LessonFrameProps {
  lessonUrl: string;
  onProgress?: (progress: number) => void;
}

export const LessonFrame = ({ lessonUrl, onProgress }: LessonFrameProps) => {
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

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        src={lessonUrl}
        className="lesson-frame w-full h-full"
        title="Interactive Lesson"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};