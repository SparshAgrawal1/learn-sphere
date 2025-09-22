import { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle, Play, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Subtopic {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  subtopics: Subtopic[];
  expanded?: boolean;
}

interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface NavigationTreeProps {
  subject: Subject;
  currentSubtopic?: string;
  onSubtopicSelect: (subtopicId: string) => void;
}

export const NavigationTree = ({ subject, currentSubtopic, onSubtopicSelect }: NavigationTreeProps) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(subject.chapters.map(chapter => chapter.id))
  );

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  return (
    <Card className="h-full overflow-hidden bg-sidebar-background border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-bold text-lg text-sidebar-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-sidebar-primary" />
          {subject.name}
        </h2>
      </div>

      <div className="overflow-y-auto h-full pb-4">
        {subject.chapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const completedSubtopics = chapter.subtopics.filter(s => s.completed).length;
          const totalSubtopics = chapter.subtopics.length;
          const chapterProgress = Math.round((completedSubtopics / totalSubtopics) * 100);

          return (
            <div key={chapter.id} className="border-b border-sidebar-border/50 last:border-0">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full px-4 py-3 text-left hover:bg-sidebar-accent transition-colors duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 flex-1">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-sidebar-primary" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-sidebar-primary" />
                  )}
                  <span className="font-medium text-sidebar-foreground group-hover:text-sidebar-primary transition-colors">
                    {chapter.title}
                  </span>
                </div>
                <div className="text-xs text-sidebar-foreground/60">
                  {completedSubtopics}/{totalSubtopics}
                </div>
              </button>

              {isExpanded && (
                <div className="pl-6 pb-2">
                  {chapter.subtopics.map((subtopic) => (
                    <button
                      key={subtopic.id}
                      onClick={() => onSubtopicSelect(subtopic.id)}
                      className={`
                        w-full px-4 py-2 text-left text-sm transition-all duration-200 rounded-lg mr-4 mb-1
                        flex items-center justify-between group hover:shadow-sm
                        ${currentSubtopic === subtopic.id
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                          : subtopic.completed
                          ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                          : 'hover:bg-sidebar-accent text-sidebar-foreground'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {subtopic.completed ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : currentSubtopic === subtopic.id ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-current opacity-50" />
                        )}
                        <span className="truncate">{subtopic.title}</span>
                      </div>
                      
                      {subtopic.progress > 0 && !subtopic.completed && (
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1 bg-sidebar-accent rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-sidebar-primary transition-all duration-500" 
                              style={{ width: `${subtopic.progress}%` }}
                            />
                          </div>
                          <span className="text-xs opacity-60">{subtopic.progress}%</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};