import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContentLoaderProps {
  subjectId?: string;
  topicId?: string;
  lessonId?: string;
  contentPath?: string; // Optional direct path to content
}

const ContentLoader: React.FC<ContentLoaderProps> = ({ 
  subjectId, 
  topicId, 
  lessonId, 
  contentPath 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Stop any ongoing narrations before loading new content
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
        if (typeof window.stopNarration === 'function') {
          window.stopNarration();
        }
        
        // Stop any story narration
        if (typeof window.stopStoryNarration === 'function') {
          window.stopStoryNarration();
        }
        
        // Get selected class from session storage
        const selectedClass = sessionStorage.getItem('selectedClass');
        
        if (!selectedClass) {
          navigate('/class-selection');
          return;
        }

        let path = '';
        
        // If direct content path is provided, use it
        if (contentPath) {
          path = contentPath;
        } 
        // Otherwise construct path from subject, topic, lesson IDs
        else if (subjectId && topicId && lessonId) {
          // Map the class to the corresponding folder in FinalContent
          const classFolder = selectedClass === '9th' ? 'Class 9th' : 'Class 10th';
          
          // Construct the path based on the subject, topic, and lesson
          path = `/FinalContent/${classFolder}/${subjectId}/${topicId}/${lessonId}`;
        } else {
          throw new Error('Either contentPath or subjectId+topicId+lessonId must be provided');
        }

        // Create an iframe to load the content
        const iframe = document.getElementById('content-frame') as HTMLIFrameElement;
        if (iframe) {
          iframe.src = path;
          iframe.onload = () => setLoading(false);
          iframe.onerror = () => {
            setError(`Failed to load content at ${path}`);
            setLoading(false);
          };
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error loading content');
        setLoading(false);
      }
    };

    loadContent();

    // Cleanup function to stop narrations when component unmounts
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
      if (typeof window.stopNarration === 'function') {
        window.stopNarration();
      }
      
      // Stop any story narration
      if (typeof window.stopStoryNarration === 'function') {
        window.stopStoryNarration();
      }
    };
  }, [subjectId, topicId, lessonId, contentPath, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-red-500 text-xl mb-4">Error Loading Content</div>
        <div className="text-white/70">{error}</div>
        <button 
          className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white/70 text-lg">Loading Content...</p>
          </div>
        </div>
      )}
      <iframe 
        id="content-frame"
        className="w-full h-full border-none"
        title="Learning Content"
        sandbox="allow-same-origin allow-scripts allow-forms"
      ></iframe>
    </div>
  );
};

export default ContentLoader;
