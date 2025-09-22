import { useEffect, useRef } from 'react';

interface Subject {
  name: string;
  progress: number;
  color: string;
}

interface KnowledgeSphereProps {
  subjects: Subject[];
}

export const KnowledgeSphere = ({ subjects }: KnowledgeSphereProps) => {
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add subtle mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!sphereRef.current) return;
      
      const rect = sphereRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 20;
      const deltaY = (e.clientY - centerY) / 20;
      
      sphereRef.current.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!sphereRef.current) return;
      sphereRef.current.style.transform = 'translateX(0) translateY(0) rotateY(0) rotateX(0)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={sphereRef}
        className="knowledge-sphere relative cursor-pointer transition-transform duration-200 ease-out"
        style={{ 
          background: `conic-gradient(
            from 0deg,
            hsl(var(--sphere-physics)) 0deg ${subjects[0]?.progress * 3.6 || 0}deg,
            hsl(var(--progress-incomplete)) ${subjects[0]?.progress * 3.6 || 0}deg 90deg,
            hsl(var(--sphere-chemistry)) 90deg ${90 + (subjects[1]?.progress * 3.6 || 0)}deg,
            hsl(var(--progress-incomplete)) ${90 + (subjects[1]?.progress * 3.6 || 0)}deg 180deg,
            hsl(var(--sphere-math)) 180deg ${180 + (subjects[2]?.progress * 3.6 || 0)}deg,
            hsl(var(--progress-incomplete)) ${180 + (subjects[2]?.progress * 3.6 || 0)}deg 270deg,
            hsl(var(--sphere-biology)) 270deg ${270 + (subjects[3]?.progress * 3.6 || 0)}deg,
            hsl(var(--progress-incomplete)) ${270 + (subjects[3]?.progress * 3.6 || 0)}deg 360deg
          )`
        }}
      >
        {/* Center glow effect */}
        <div className="absolute inset-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {Math.round(subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length)}%
            </div>
            <div className="text-xs text-white/80 font-medium">Complete</div>
          </div>
        </div>

        {/* Subject labels */}
        {subjects.map((subject, index) => {
          const angle = (index * 90) - 45; // Position labels between segments
          const radius = 140;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={subject.name}
              className="absolute text-xs font-semibold text-gray-700 bg-white/90 px-2 py-1 rounded-full shadow-sm"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                left: '50%',
                top: '50%',
              }}
            >
              {subject.name}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-foreground">Your Learning Universe</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Interactive knowledge across {subjects.length} subjects
        </p>
      </div>
    </div>
  );
};