import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Play, RotateCcw } from 'lucide-react';
import QuizChatbot from './QuizChatbot';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
  topicName?: string;
  chapterName?: string;
  subjectName?: string;
  classNumber?: string;
  pdfPath?: string;
}

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onStartQuiz,
  topicName = 'Current Topic',
  chapterName = 'Current Chapter',
  subjectName,
  classNumber,
  pdfPath
}) => {
  const [showChatbot, setShowChatbot] = useState(false);
  // Stop all audio and narration when modal opens
  useEffect(() => {
    if (isOpen) {
      // Stop speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Stop all audio elements
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
    }
    
    // Return cleanup function to ensure narrations are stopped
    return () => {
      // Stop speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Stop all audio elements
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
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartQuiz = () => {
    setShowChatbot(true);
    onStartQuiz();
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
    onClose();
  };

  // If chatbot is shown, render the QuizChatbot component
  if (showChatbot) {
    return (
      <QuizChatbot
        topicName={topicName}
        chapterName={chapterName}
        subjectName={subjectName}
        classNumber={classNumber}
        pdfPath={pdfPath}
        onClose={handleCloseChatbot}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Quiz icon and title */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready for Quiz?</h2>
          <p className="text-gray-600">
            Test your knowledge on <span className="font-semibold text-orange-600">{topicName}</span>
          </p>
          {chapterName && (
            <p className="text-sm text-gray-500 mt-1">
              Chapter: {chapterName}
            </p>
          )}
        </div>
        
        {/* Quiz description */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">What to expect:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Multiple choice questions</li>
            <li>• Instant feedback on answers</li>
            <li>• Progress tracking</li>
            <li>• Score at the end</li>
          </ul>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleStartQuiz}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
