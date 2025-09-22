import { KnowledgeSphere } from '@/components/dashboard/KnowledgeSphere';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { AchievementBadges } from '@/components/dashboard/AchievementBadges';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - in a real app, this would come from your backend
const mockSubjects = [
  { name: 'Physics', progress: 65, color: 'hsl(var(--sphere-physics))' },
  { name: 'Chemistry', progress: 40, color: 'hsl(var(--sphere-chemistry))' },
  { name: 'Math', progress: 80, color: 'hsl(var(--sphere-math))' },
  { name: 'Biology', progress: 25, color: 'hsl(var(--sphere-biology))' },
];

const mockAchievements = [
  { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: 'star', type: 'gold' as const, unlocked: true },
  { id: '2', name: 'Physics Master', description: 'Complete 10 physics topics', icon: 'trophy', type: 'silver' as const, unlocked: true },
  { id: '3', name: 'Speed Learner', description: 'Complete a topic in under 30 minutes', icon: 'zap', type: 'bronze' as const, unlocked: true },
  { id: '4', name: 'Perfectionist', description: 'Score 100% on 5 quizzes', icon: 'target', type: 'gold' as const, unlocked: false },
  { id: '5', name: 'Consistent', description: 'Learn for 7 days in a row', icon: 'award', type: 'silver' as const, unlocked: false },
  { id: '6', name: 'Explorer', description: 'Try lessons from all subjects', icon: 'medal', type: 'bronze' as const, unlocked: false },
];

const Dashboard = () => {
  const overallProgress = Math.round(mockSubjects.reduce((acc, subject) => acc + subject.progress, 0) / mockSubjects.length);
  const topicsInProgress = 3;
  const completedTopics = 24;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, Priya!</h1>
              <p className="text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
            <Button asChild className="rounded-xl">
              <Link to="/learn/physics/gravity">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Knowledge Sphere Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Learning Universe</h2>
            <p className="text-muted-foreground">Watch your knowledge grow across different subjects</p>
          </div>
          <KnowledgeSphere subjects={mockSubjects} />
        </section>

        {/* Progress Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Progress Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProgressCard
              title="Overall Progress"
              value={`${overallProgress}%`}
              subtitle="Across all subjects"
              icon="trending"
              progress={overallProgress}
              color="primary"
            />
            <ProgressCard
              title="Topics in Progress"
              value={topicsInProgress}
              subtitle="Currently learning"
              icon="book"
              color="secondary"
            />
            <ProgressCard
              title="Topics Completed"
              value={completedTopics}
              subtitle="Successfully finished"
              icon="check"
              color="success"
            />
          </div>
        </section>

        {/* Achievements and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Achievements</h2>
            <AchievementBadges achievements={mockAchievements} />
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Continue Learning</h2>
            <div className="space-y-4">
              {mockSubjects.map((subject) => (
                <Button
                  key={subject.name}
                  asChild
                  variant="outline"
                  className="w-full justify-between h-auto p-4 hover:shadow-interactive transition-all duration-300"
                >
                  <Link to={`/learn/${subject.name.toLowerCase()}`}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                      <div className="text-left">
                        <div className="font-semibold">{subject.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {subject.progress}% complete
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      <Play className="h-4 w-4" />
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;