import { motion } from 'framer-motion';
import { ArrowRight, Calendar, AlertTriangle, ShoppingCart, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const VALUE_HIGHLIGHTS = [
  { icon: Calendar, title: 'Predict', text: 'How many days your food can realistically cover', delay: 0.4 },
  { icon: AlertTriangle, title: 'Warn', text: 'What happens if you don\'t act before allowance day', delay: 0.5 },
  { icon: ShoppingCart, title: 'Recommend', text: 'The lowest-cost stabilizing action before things become critical', delay: 0.6 },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 gradient-surface relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl w-full text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card mb-4"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary tracking-wide">JiMAT+ Score</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-sm uppercase tracking-[0.24em] text-muted-foreground/75 mb-4"
        >
          Student Food Security Decision Engine
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-foreground mb-5"
          style={{ textWrap: 'balance' }}
        >
          Can your food and budget
          <span className="text-primary"> really last until allowance day?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed"
        >
          Enter your remaining budget, pantry items, and pricing context. JiMAT+ estimates meal coverage, recommends the cheapest stabilizing action, and surfaces support before the gap becomes critical.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-muted-foreground/60 mb-10 max-w-sm mx-auto italic"
        >
          You have not run out yet. JiMAT+ helps you act before food insecurity becomes critical.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VALUE_HIGHLIGHTS.map(({ icon: Icon, title, text, delay }) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay }}
              className="glass-card rounded-2xl p-4 text-center hover:shadow-card transition-shadow duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3 mx-auto">
                <Icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="mt-10 inline-flex items-center gap-3 gradient-warm text-primary-foreground px-10 py-4.5 rounded-2xl text-base font-semibold shadow-glow transition-all hover:shadow-elevated"
        >
          Start My JiMAT+ Check
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-4 text-xs text-muted-foreground/40 font-medium tracking-wide"
        >
          No login · Private · Built for students
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
