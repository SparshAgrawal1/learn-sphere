import { Card } from '@/components/ui/card';
import { TrendingUp, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: 'trending' | 'book' | 'check' | 'clock';
  progress?: number;
  color?: 'primary' | 'secondary' | 'success';
}

const iconMap = {
  trending: TrendingUp,
  book: BookOpen,
  check: CheckCircle,
  clock: Clock,
};

const colorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
};

export const ProgressCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  progress,
  color = 'primary' 
}: ProgressCardProps) => {
  const IconComponent = iconMap[icon];
  const iconColor = colorMap[color];

  return (
    <Card className="progress-card group hover:shadow-interactive transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <IconComponent className={`h-5 w-5 ${iconColor}`} />
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground">{value}</span>
          </div>
          
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          
          {progress !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-muted-foreground">Progress</span>
                <span className="text-xs font-bold text-foreground">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};