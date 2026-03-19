import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingDown, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const PROOF_POINTS = [
  { icon: Shield, text: 'Know exactly how many days you can survive' },
  { icon: TrendingDown, text: 'See the risk before it hits' },
  { icon: Zap, text: 'Find the one purchase that changes everything' },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 gradient-hero relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        {/* Brand badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
          <span className="text-sm font-semibold text-primary tracking-wide font-display">JiMAT+</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs tracking-[0.3em] text-muted-foreground/60 uppercase mb-6 font-display"
        >
          Student Food Survival Engine
        </motion.p>

        {/* Hero headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-foreground mb-6"
        >
          Will your food
          <br />
          <span className="text-gradient">last until</span>
          <br />
          <span className="text-gradient-accent">allowance day?</span>
        </motion.h1>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-10"
        >
          Enter what you have. JiMAT+ tells you how far it stretches — and the
          one move that makes the difference.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="inline-flex items-center gap-3 gradient-warm text-primary-foreground px-10 py-4.5 rounded-2xl text-lg font-bold shadow-glow transition-all font-display tracking-tight"
        >
          Check My Survival
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Proof points */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {PROOF_POINTS.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground font-medium">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Footer tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="mt-14 text-xs text-muted-foreground/40 font-medium tracking-widest uppercase"
        >
          No login · Private · Built for students
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
