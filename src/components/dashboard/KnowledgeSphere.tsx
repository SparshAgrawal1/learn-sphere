interface Subject {
  name: string;
  progress: number;
  color: string;
}

interface KnowledgeSphereProps {
  subjects: Subject[];
}

export const KnowledgeSphere = ({ subjects }: KnowledgeSphereProps) => {
  // Calculate overall progress
  const overallProgress = Math.round(
    subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length
  );

  return (
    <div className="relative flex flex-col items-center">
      {/* Spline 3D Element */}
      <div className="spline-container relative">
        <iframe 
          src='https://my.spline.design/r4xbot-wG0D4Zm6eCKUTE99uf4n3VYp/' 
          frameBorder='0' 
          width='400' 
          height='400'
          className="rounded-2xl shadow-spline"
        />
        
        {/* Overlay Progress Display */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-glass backdrop-blur-md border border-glow rounded-2xl px-6 py-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-glow">
              {overallProgress}%
            </div>
            <div className="text-sm text-muted-foreground font-medium">Complete</div>
          </div>
        </div>

        {/* Subject Progress Indicators */}
        <div className="absolute top-4 right-4 space-y-2">
          {subjects.map((subject, index) => (
            <div
              key={subject.name}
              className="flex items-center space-x-2 bg-glass backdrop-blur-sm border border-glow/50 rounded-lg px-3 py-2"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <span className="text-xs font-medium text-foreground">{subject.name}</span>
              <span className="text-xs text-primary-glow">{subject.progress}%</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold text-foreground">Your Learning Universe</h3>
        <p className="text-muted-foreground mt-1">
          Interactive 3D knowledge across {subjects.length} subjects
        </p>
      </div>
    </div>
  );
};