import React from 'react';
import { motion } from 'framer-motion';

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

interface AssessmentPanelProps {
  questions: Question[];
  selectedAnswers: {[key: string]: string};
  onSelectAnswer: (questionId: string, answerId: string) => void;
  onSubmit: () => void;
  assessmentCompleted: boolean;
  assessmentScore: number;
  themeColor: string;
  onClose: () => void;
}

const AssessmentPanel: React.FC<AssessmentPanelProps> = ({
  questions,
  selectedAnswers,
  onSelectAnswer,
  onSubmit,
  assessmentCompleted,
  assessmentScore,
  themeColor,
  onClose
}) => {
  const allQuestionsAnswered = questions.every(q => selectedAnswers[q.id]);
  const passThreshold = 80;
  const isPassing = assessmentScore >= passThreshold;
  
  return (
    <motion.div 
      className="w-full h-full overflow-y-auto bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-xl p-6 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Check Your Understanding</h2>
          <button 
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {assessmentCompleted ? (
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(255, 255, 255, 0.05) inset'
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div 
                className={`w-24 h-24 rounded-full mb-4 flex items-center justify-center ${
                  isPassing ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
              >
                {isPassing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {isPassing ? 'Congratulations!' : 'Keep Learning!'}
              </h3>
              
              <p className="text-white/70 mb-4">
                {isPassing 
                  ? 'You have successfully completed this assessment.' 
                  : 'You need to score at least 80% to complete this topic.'}
              </p>
              
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div 
                  className={`h-full rounded-full ${
                    isPassing ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${assessmentScore}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              
              <p className="font-bold text-lg">
                Your score: {assessmentScore}%
              </p>
              
              <motion.button
                className="mt-6 px-6 py-3 rounded-xl text-white font-medium"
                style={{
                  background: isPassing 
                    ? 'linear-gradient(135deg, #10B981, #059669)' 
                    : `linear-gradient(135deg, ${themeColor}, ${themeColor}80)`,
                  boxShadow: isPassing 
                    ? '0 4px 12px rgba(16, 185, 129, 0.4)' 
                    : `0 4px 12px ${themeColor}40`
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                {isPassing ? 'Continue Learning' : 'Try Again'}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <>
            <p className="text-white/70 mb-8">
              Answer the following questions to test your understanding of the topic. You need to score at least 80% to complete this topic.
            </p>
            
            <div className="space-y-8">
              {questions.map((question, index) => (
                <motion.div 
                  key={question.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(255, 255, 255, 0.05) inset'
                  }}
                >
                  <h3 className="text-lg font-medium text-white mb-4">
                    {index + 1}. {question.text}
                  </h3>
                  
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div 
                        key={option.id}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          selectedAnswers[question.id] === option.id
                            ? `border-${themeColor} bg-white/10`
                            : 'border-white/10 hover:bg-white/5'
                        }`}
                        onClick={() => onSelectAnswer(question.id, option.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              selectedAnswers[question.id] === option.id
                                ? `bg-${themeColor} border-${themeColor}`
                                : 'bg-white/5 border border-white/30'
                            }`}
                          >
                            {selectedAnswers[question.id] === option.id && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-white">{option.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <motion.button
                className="px-6 py-3 rounded-xl text-white font-medium"
                style={{
                  background: allQuestionsAnswered 
                    ? `linear-gradient(135deg, ${themeColor}, ${themeColor}80)` 
                    : 'linear-gradient(135deg, #94a3b8, #64748b)',
                  boxShadow: allQuestionsAnswered 
                    ? `0 4px 12px ${themeColor}40` 
                    : '0 4px 12px rgba(0, 0, 0, 0.2)',
                  opacity: allQuestionsAnswered ? 1 : 0.7
                }}
                whileHover={allQuestionsAnswered ? { scale: 1.05 } : {}}
                whileTap={allQuestionsAnswered ? { scale: 0.95 } : {}}
                onClick={onSubmit}
                disabled={!allQuestionsAnswered}
              >
                Submit Answers
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AssessmentPanel;



