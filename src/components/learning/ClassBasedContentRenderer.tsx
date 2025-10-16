import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import curriculum, { getClassCurriculum, getClassSubjectById } from '@/data/curriculum';
import { Subject, Chapter, Topic, Subtopic } from '@/data/curriculum';

interface ClassBasedContentRendererProps {
  selectedClass: string | null;
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
  onContentLoad?: (content: any) => void;
}

const ClassBasedContentRenderer: React.FC<ClassBasedContentRendererProps> = ({
  selectedClass,
  subjectId,
  chapterId,
  topicId,
  onContentLoad
}) => {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL LOGIC OR EARLY RETURNS
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<{
    subject?: Subject;
    chapter?: Chapter;
    topic?: Topic;
    contentPath?: string;
    selectedSubtopic?: Subtopic;
    curriculum?: Subject[];
  }>({});
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(null);
  const [hasAutoSelected, setHasAutoSelected] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Ref to prevent multiple simultaneous loads
  const isLoadingRef = useRef(false);

  // Handle subtopic selection - MUST be defined before any conditional returns
  const handleSubtopicSelect = useCallback((subtopic: Subtopic) => {
    // Directly set the selected subtopic ID
    setSelectedSubtopicId(subtopic.id);
    setHasAutoSelected(true); // Mark as manually selected
    
    if (onContentLoad) {
      const contentToLoad = {
        ...currentContent,
        contentPath: subtopic.contentPath,
        selectedSubtopic: subtopic
      };
      
      // Debug: Log the content being passed
      console.log('handleSubtopicSelect - contentToLoad:', contentToLoad);
      console.log('handleSubtopicSelect - topic pdfPath:', currentContent.topic?.pdfPath);
      
      // Use requestAnimationFrame to ensure proper timing and prevent loops
      requestAnimationFrame(() => {
        onContentLoad(contentToLoad);
      });
    }
  }, [currentContent, onContentLoad]);

  // Debug: Log state changes (reduced logging)
  useEffect(() => {
    console.log('Selected subtopic changed:', selectedSubtopicId);
  }, [selectedSubtopicId]);

  // Debug: Track hasAutoSelected changes
  useEffect(() => {
    console.log('hasAutoSelected changed:', hasAutoSelected);
  }, [hasAutoSelected]);

  // Fallback to ensure initializing doesn't get stuck
  useEffect(() => {
    if (isInitializing) {
      const timeout = setTimeout(() => {
        setIsInitializing(false);
      }, 2000); // 2 second fallback
      
      return () => clearTimeout(timeout);
    }
  }, [isInitializing]);

  useEffect(() => {
    const loadContent = async () => {
      // Prevent multiple simultaneous loads
      if (isLoadingRef.current) {
        return;
      }
      
      try {
        isLoadingRef.current = true;
        setLoading(true);
        setError(null);

        if (!selectedClass) {
          navigate('/class-selection');
          return;
        }

        // Only log essential information to reduce console spam
        // console.log('Loading content for:', { selectedClass, subjectId, chapterId, topicId });

        // Get the curriculum for the selected class
        const classCurriculum = getClassCurriculum(selectedClass);
        
        if (!classCurriculum || classCurriculum.length === 0) {
          throw new Error(`No curriculum found for class ${selectedClass}`);
        }

        let subject: Subject | undefined;
        let chapter: Chapter | undefined;
        let topic: Topic | undefined;
        let contentPath: string | undefined;

        // Find the subject
        if (subjectId) {
          // Decode URL parameters
          const decodedSubjectId = decodeURIComponent(subjectId);
          const decodedChapterId = chapterId ? decodeURIComponent(chapterId) : undefined;
          const decodedTopicId = topicId ? decodeURIComponent(topicId) : undefined;
          
          // Try exact match first
          subject = getClassSubjectById(selectedClass, decodedSubjectId) || getClassSubjectById(selectedClass, subjectId);
          
          // If not found, try case-insensitive match
          if (!subject) {
            const curriculum = getClassCurriculum(selectedClass);
            subject = curriculum.find(s => s.id.toLowerCase() === subjectId.toLowerCase());
          }
          
          // If still not found, try with different capitalizations
          if (!subject) {
            const curriculum = getClassCurriculum(selectedClass);
            const capitalizedId = subjectId.charAt(0).toUpperCase() + subjectId.slice(1).toLowerCase();
            subject = curriculum.find(s => s.id === capitalizedId);
          }
          
          if (!subject) {
            console.error(`Subject not found: ${subjectId}`);
            throw new Error(`Subject ${subjectId} not found for class ${selectedClass}`);
          }

          // Find the chapter
          if (decodedChapterId && subject.chapters) {
            // Try exact match first with decoded ID
            chapter = subject.chapters.find(ch => ch.id === decodedChapterId);
            
            // If not found, try with original ID
            if (!chapter) {
              chapter = subject.chapters.find(ch => ch.id === chapterId);
            }
            
            // If not found, try case-insensitive match
            if (!chapter) {
              chapter = subject.chapters.find(ch => ch.id.toLowerCase() === decodedChapterId.toLowerCase());
            }
            
            if (!chapter) {
              console.error(`Available chapters for subject ${subject.id}:`, subject.chapters.map(ch => ch.id));
              console.error(`Trying to find chapter: "${chapterId}"`);
              
              // Check if chapterId might actually be a topic name - search all chapters for this topic
              let foundTopic = null;
              let foundChapter = null;
              
              for (const ch of subject.chapters) {
                const topic = ch.topics?.find(t => 
                  t.id === chapterId || 
                  t.id.toLowerCase() === chapterId.toLowerCase() ||
                  t.name === chapterId ||
                  t.name.toLowerCase() === chapterId.toLowerCase()
                );
                if (topic) {
                  foundTopic = topic;
                  foundChapter = ch;
                  break;
                }
              }
              
              if (foundTopic && foundChapter) {
                // Redirect to the correct URL structure
                navigate(`/learn/${subjectId}/${foundChapter.id}/${foundTopic.id}`);
                return;
              }
              
              throw new Error(`Chapter ${chapterId} not found in subject ${subjectId}`);
            }
            
            // Found chapter, continuing...

            // Find the topic
            if (decodedTopicId && chapter.topics) {
              // Try exact match first with decoded ID
              topic = chapter.topics.find(t => t.id === decodedTopicId);
              
              // If not found, try with original ID
              if (!topic) {
                topic = chapter.topics.find(t => t.id === topicId);
              }
              
              // If not found, try case-insensitive match
              if (!topic) {
                topic = chapter.topics.find(t => t.id.toLowerCase() === decodedTopicId.toLowerCase());
              }
              
              if (!topic) {
                console.error(`Available topics for chapter ${chapter.id}:`, chapter.topics.map(t => t.id));
                throw new Error(`Topic ${topicId} not found in chapter ${chapterId}`);
              }
              
              // Topic found, processing subtopics...
              
              // If topic has subtopics, don't set contentPath yet (will be set when subtopic is selected)
              // If no subtopics, set the topic's contentPath directly
              if (!topic.subtopics || topic.subtopics.length === 0) {
                contentPath = topic.contentPath;
              } else {
                // Topic has subtopics, will auto-select first one
              }
            }
          }
        }

        const content = {
          subject,
          chapter,
          topic,
          contentPath,
          curriculum: classCurriculum
        };

        setCurrentContent(content);
        
        // Reset auto-selection state when topic changes
        setHasAutoSelected(false);
        setSelectedSubtopicId(null);
        // Only set initializing if we have subtopics that need auto-selection
        if (topic && topic.subtopics && topic.subtopics.length > 0) {
          setIsInitializing(true);
        } else {
          setIsInitializing(false);
        }
        
        // Don't call onContentLoad here - let the auto-selection useEffect handle it
        // This prevents double content loading and flickering

        setLoading(false);
        isLoadingRef.current = false; // Reset loading ref
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error loading content');
        setLoading(false);
        isLoadingRef.current = false; // Reset loading ref
      }
    };

    loadContent();
  }, [selectedClass, subjectId, chapterId, topicId, navigate]); // Remove onContentLoad to prevent unnecessary reloads

  // Auto-load content based on topic structure
  useEffect(() => {
    // Only auto-select if we have a topic, haven't auto-selected yet, and no subtopic is currently selected
    if (currentContent.topic && !hasAutoSelected && !selectedSubtopicId) {
      if (currentContent.topic.subtopics && currentContent.topic.subtopics.length > 0) {
        // Auto-select the first subtopic only on initial load
        const firstSubtopic = currentContent.topic.subtopics[0];
        
        setSelectedSubtopicId(firstSubtopic.id);
        setHasAutoSelected(true);
        setIsInitializing(false); // Set immediately to show subtopics list
        
        // Use requestAnimationFrame to prevent loops and ensure proper timing
        requestAnimationFrame(() => {
          if (onContentLoad) {
            const contentToLoad = {
              ...currentContent,
              contentPath: firstSubtopic.contentPath,
              selectedSubtopic: firstSubtopic
            };
            
            // Debug: Log the content being passed
            console.log('Auto-selection - contentToLoad:', contentToLoad);
            console.log('Auto-selection - topic pdfPath:', currentContent.topic?.pdfPath);
            
            onContentLoad(contentToLoad);
          }
        });
      } else if (currentContent.topic.contentPath) {
        // If no subtopics, load the topic content directly
        setHasAutoSelected(true);
        setIsInitializing(false); // Set immediately
        requestAnimationFrame(() => {
          if (onContentLoad) {
            const contentToLoad = {
              ...currentContent,
              contentPath: currentContent.topic.contentPath
            };
            
            // Debug: Log the content being passed
            console.log('Direct topic load - contentToLoad:', contentToLoad);
            console.log('Direct topic load - topic pdfPath:', currentContent.topic?.pdfPath);
            
            onContentLoad(contentToLoad);
          }
        });
      }
    }
    
    // Ensure initializing is false if we have a topic but conditions aren't met for auto-selection
    if (currentContent.topic && isInitializing && (hasAutoSelected || selectedSubtopicId)) {
      setIsInitializing(false);
    }
  }, [currentContent.topic?.id]); // Remove onContentLoad from dependencies to prevent re-runs

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white/70 text-lg">Loading {selectedClass} Grade Content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-red-500 text-xl mb-4">Error Loading Content</div>
        <div className="text-white/70 mb-6">{error}</div>
        <button 
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          onClick={() => navigate('/class-selection')}
        >
          Select Different Class
        </button>
      </div>
    );
  }

  // Render content based on what's available
  if (currentContent.topic) {
    // If topic has subtopics, show them as a list on the left
    if (currentContent.topic.subtopics && currentContent.topic.subtopics.length > 0) {
      return (
        <div className="h-full flex flex-col">
          {/* Fixed header section */}
          <div className="p-6 pb-0 flex-shrink-0">
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentContent.topic.name}
            </h2>
            <p className="text-white/70 mb-6">
              {selectedSubtopicId ? 'Select a different subtopic or view the overview' : 'Select a subtopic to view the content'}
            </p>
          </div>
          
          {/* Scrollable content area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full px-6 pb-6 overflow-y-auto scrollbar-hide">
              {isInitializing ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-white/70">Loading subtopics...</span>
                </div>
              ) : (
                <>
                  <div className="grid gap-3 pb-4">
                  {currentContent.topic.subtopics.map((subtopic) => (
                    <div 
                      key={subtopic.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                        selectedSubtopicId === subtopic.id 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400 shadow-lg transform scale-[1.02]' 
                          : 'bg-white/10 border-white/10 hover:bg-white/20 hover:border-white/20'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSubtopicSelect(subtopic);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">{subtopic.name}</h4>
                        {selectedSubtopicId === subtopic.id && (
                          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-medium flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-white/60 text-sm">Interactive content</p>
                        {subtopic.progress !== undefined && (
                          <div className="flex items-center">
                            <div className="w-12 h-1 bg-white/20 rounded-full mr-2">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                style={{ width: `${subtopic.progress}%` }}
                              />
                            </div>
                            <span className="text-white/70 text-xs">{subtopic.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  </div>
                  
                  {/* Show main topic content option if available */}
                  {!isInitializing && currentContent.topic.contentPath && (
                    <div className="pb-4">
                      <button 
                        className={`w-full p-3 rounded-lg transition-colors flex items-center justify-between ${
                          selectedSubtopicId === null 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        onClick={() => {
                          // Use state updater to prevent stale closures
                          setSelectedSubtopicId(currentSelectedId => {
                            // Prevent duplicate selections
                            if (currentSelectedId === null) {
                              return currentSelectedId;
                            }
                            
                            // Mark that user has made a manual selection
                            setHasAutoSelected(true);
                            
                            if (onContentLoad && currentContent.topic?.contentPath) {
                              // Use requestAnimationFrame to ensure proper timing
                              requestAnimationFrame(() => {
                                onContentLoad({
                                  ...currentContent,
                                  contentPath: currentContent.topic?.contentPath,
                                  selectedSubtopic: undefined
                                });
                              });
                            }
                            
                            return null; // Set to null for main topic
                          });
                        }}
                      >
                        <span>View Main Topic Overview</span>
                        {selectedSubtopicId === null && (
                          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // If no subtopics, show a simple message (content will auto-load via useEffect)
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {currentContent.topic.name}
        </h2>
        <p className="text-white/70">
          Content is loading in the main area...
        </p>
      </div>
    );
  }

  if (currentContent.chapter) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {currentContent.chapter.name}
        </h2>
        <div className="grid gap-4">
          {currentContent.chapter.topics?.map((topic) => (
            <div 
              key={topic.id}
              className="p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => {
                // Navigate to topic
                if (currentContent.subject) {
                  navigate(`/learn/${currentContent.subject.id}/${currentContent.chapter?.id}/${topic.id}`);
                }
              }}
            >
              <h3 className="text-lg font-semibold text-white">{topic.name}</h3>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-white/20 rounded-full h-2 mr-4">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
                <span className="text-white/70 text-sm">{topic.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentContent.subject) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {currentContent.subject.name}
        </h1>
        <p className="text-white/70 mb-6">{currentContent.subject.description}</p>
        <div className="grid gap-4">
          {currentContent.subject.chapters?.map((chapter) => (
            <div 
              key={chapter.id}
              className="p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => {
                // Navigate to chapter
                navigate(`/learn/${currentContent.subject?.id}/${chapter.id}`);
              }}
            >
              <h3 className="text-lg font-semibold text-white">{chapter.name}</h3>
              <p className="text-white/60 text-sm mt-1">
                {chapter.topics?.length || 0} topics
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show curriculum overview
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-2">
        {selectedClass} Grade Curriculum
      </h1>
      <p className="text-white/70 mb-6">
        Select a subject to begin your learning journey
      </p>
      <div className="grid gap-4">
        {currentContent.curriculum?.map((subject) => (
          <div 
            key={subject.id}
            className="p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
            onClick={() => {
              navigate(`/learn/${subject.id}`);
            }}
          >
            <div className="flex items-center">
              <subject.icon className="w-8 h-8 mr-3" style={{ color: subject.color }} />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{subject.name}</h3>
                <p className="text-white/60 text-sm">{subject.description}</p>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">{subject.progress}%</div>
                <div className="w-16 h-2 bg-white/20 rounded-full mt-1">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${subject.progress}%`,
                      backgroundColor: subject.color
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassBasedContentRenderer;
