import { Card } from '@/components/ui/card';
import { Trophy, Star, Zap, Target, Award, Medal } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'gold' | 'silver' | 'bronze';
  unlocked: boolean;
}

interface AchievementBadgesProps {
  achievements: Achievement[];
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  award: Award,
  medal: Medal,
};

export const AchievementBadges = ({ achievements }: AchievementBadgesProps) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Card className="progress-card">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">Achievements</h3>
        <p className="text-sm text-muted-foreground">
          {unlockedCount} of {achievements.length} unlocked
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {achievements.slice(0, 6).map((achievement) => {
          const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;
          
          return (
            <div
              key={achievement.id}
              className={`
                achievement-badge ${achievement.type} 
                transition-all duration-300 cursor-pointer
                ${achievement.unlocked 
                  ? 'hover:scale-110 hover:shadow-interactive' 
                  : 'opacity-30 grayscale'
                }
              `}
              title={achievement.unlocked ? achievement.description : 'Not unlocked yet'}
            >
              <IconComponent 
                className={`h-6 w-6 ${
                  achievement.unlocked ? 'text-white' : 'text-muted-foreground'
                }`} 
              />
            </div>
          );
        })}
      </div>

      {achievements.length > 6 && (
        <div className="mt-3 text-center">
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            View all {achievements.length} achievements
          </button>
        </div>
      )}
    </Card>
  );
};