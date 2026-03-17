import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';

interface CalculatingScreenProps {
  onComplete: () => void;
}

const CalculatingScreen = ({ onComplete }: CalculatingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex flex-col items-center"
      >
        <Shield className="w-10 h-10 text-primary mb-6 animate-pulse" />
        <h2 className="font-display text-2xl text-foreground mb-2">Calculating your survival plan</h2>
        <p className="text-sm text-muted-foreground mb-8">Analyzing pantry, budget, and meal options...</p>
        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CalculatingScreen;
