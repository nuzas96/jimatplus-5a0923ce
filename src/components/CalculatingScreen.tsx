import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CalculatingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  'Checking your pantry...',
  'Matching meal options...',
  'Estimating coverage...',
  'Finding the best next purchase...',
];

const CalculatingScreen = ({ onComplete }: CalculatingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 1.5;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 25), STEPS.length - 1);
    if (idx > stepIndex) {
      setCompletedSteps(prev => [...prev, stepIndex]);
    }
    setStepIndex(idx);
  }, [progress, stepIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gradient-surface relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center max-w-xs w-full relative z-10"
      >
        {/* Animated ring */}
        <div className="relative w-24 h-24 mb-8">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
            <motion.circle
              cx="48" cy="48" r="42" fill="none"
              stroke="url(#progressGradient)" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * Math.min(progress, 100)) / 100}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(168, 56%, 38%)" />
                <stop offset="100%" stopColor="hsl(152, 50%, 40%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-lg font-bold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <h2 className="font-display text-xl text-foreground mb-6 text-center">Analyzing your situation</h2>

        {/* Step list with checkmarks */}
        <div className="w-full space-y-2.5 mb-8">
          {STEPS.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isActive = i === stepIndex && !isCompleted;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  isCompleted ? 'text-primary' : isActive ? 'text-foreground' : 'text-muted-foreground/40'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isCompleted ? 'bg-primary/15' : isActive ? 'bg-muted' : 'bg-muted/40'
                }`}>
                  {isCompleted ? (
                    <Check className="w-3 h-3 text-primary" />
                  ) : isActive ? (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <span className={`font-medium ${isActive ? 'text-foreground' : ''}`}>{step}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-warm rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CalculatingScreen;
