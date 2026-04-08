import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, Heart, Info, RotateCcw, ShoppingCart, Wallet } from 'lucide-react';
import { SurvivalResult, UserInput } from '@/lib/types';

interface ShoppingSummaryProps {
  result: SurvivalResult;
  input: UserInput;
  onRestart: () => void;
  onBack: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

function getStatusFromCoverage(coverage: number, targetDays: number): 'Safe' | 'Tight' | 'Critical' {
  if (coverage >= targetDays) return 'Safe';
  if (coverage >= targetDays * 0.7) return 'Tight';
  return 'Critical';
}

const statusColors = {
  Safe: 'bg-status-safe/10 text-status-safe',
  Tight: 'bg-status-tight/10 text-status-tight',
  Critical: 'bg-status-critical/10 text-status-critical',
};

const ShoppingSummary = ({ result, input, onRestart, onBack }: ShoppingSummaryProps) => {
  const selectedComparison = result.recommendationExplainer.comparisonItems.find(item => item.verdict === 'selected');
  const coverageChanged = result.recommendationExplainer.coverageSummary.afterDisplay !== result.recommendationExplainer.coverageSummary.beforeDisplay;
  const hasPurchase = result.cheapestNextPurchase.estimatedCost > 0;
  const isNoUrgentPurchase = result.cheapestNextPurchase.name === 'No urgent purchase needed';
  const projectedStatus = getStatusFromCoverage(
    result.recommendationExplainer.coverageSummary.after,
    result.recommendationExplainer.coverageSummary.targetDays,
  );
  const budgetSpentPercent = hasPurchase ? (result.cheapestNextPurchase.estimatedCost / input.budget) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 gradient-surface">
      <div className="max-w-lg w-full">
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />Back to plan
        </motion.button>

        <motion.div {...fadeUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-1">JiMAT+ Shopping Summary</h2>
          <p className="text-sm text-muted-foreground mb-8">
            {hasPurchase
              ? 'One low-cost move to stabilize your plan without overspending.'
              : isNoUrgentPurchase
                ? 'You are already in a stable position for this period.'
                : 'Your budget is too tight for a helpful purchase right now.'}
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="glass-card p-4 rounded-2xl mb-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {hasPurchase
                ? 'Optimized for survival coverage and affordability, not full nutrition planning.'
                : 'Reflects the safest next step for your coverage and budget position.'}
            </p>
          </div>
        </motion.div>

        {/* Best Next Purchase — product card style */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="relative rounded-3xl shadow-elevated mb-4 overflow-hidden gradient-border"
        >
          <div className="bg-card p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.04] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center shadow-sm">
                  <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-label text-primary">{hasPurchase ? 'Best Next Purchase' : 'Best Next Step'}</span>
                </div>
              </div>
              <h3 className="text-foreground text-2xl font-bold">{result.cheapestNextPurchase.name}</h3>
              <p className="font-mono text-lg text-primary font-semibold mt-1">
                RM{result.cheapestNextPurchase.estimatedCost.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{result.cheapestNextPurchase.reason}</p>
            </div>
          </div>
        </motion.div>

        {/* Budget breakdown with visual bar */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="glass-card rounded-2xl mb-4 overflow-hidden"
        >
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="font-label text-foreground">Budget Breakdown</span>
            </div>
          </div>
          <div className="divide-y divide-border/40">
            <div className="flex items-center justify-between p-4">
              <span className="text-sm text-muted-foreground">Starting Budget</span>
              <span className="font-mono font-semibold text-foreground">RM{input.budget.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm text-muted-foreground">Suggested Spend</span>
              <span className="font-mono font-semibold text-status-tight">- RM{result.cheapestNextPurchase.estimatedCost.toFixed(2)}</span>
            </div>
            {hasPurchase && (
              <div className="px-4 py-3">
                <div className="w-full h-2 bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - budgetSpentPercent}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                    className="h-full gradient-warm rounded-full"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 text-right">{(100 - budgetSpentPercent).toFixed(0)}% of budget preserved</p>
              </div>
            )}
            <div className="flex items-center justify-between p-4 bg-status-safe/[0.04]">
              <span className="text-sm font-semibold text-foreground">Remaining Budget</span>
              <span className="font-mono font-bold text-status-safe-foreground text-lg">RM{result.budgetAfterShopping.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.4 }} className="grid grid-cols-2 gap-3 mb-4">
          <div className="glass-card p-4 rounded-2xl text-center">
            <span className="font-label text-muted-foreground block mb-2">Meals Unlocked</span>
            <span className="font-mono text-2xl font-bold text-foreground">
              {selectedComparison?.mealsUnlocked ?? result.cheapestNextPurchase.mealsUnlocked}
            </span>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <span className="font-label text-muted-foreground block mb-2">Coverage</span>
            <div className="flex items-center justify-center gap-1">
              <ArrowUpRight className={`w-4 h-4 ${coverageChanged ? 'text-status-safe' : 'text-muted-foreground'}`} />
              <span className={`text-sm font-semibold ${coverageChanged ? 'text-status-safe-foreground' : 'text-muted-foreground'}`}>
                {result.coverageImproved}
              </span>
            </div>
          </div>
        </motion.div>

        {hasPurchase && (
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.34, duration: 0.4 }}
            className="glass-card p-5 rounded-2xl mb-4"
          >
            <p className="text-sm font-semibold text-foreground mb-3">Before vs After This Purchase</p>
            <div className="space-y-2">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 items-center">
                <span className="text-xs font-medium text-muted-foreground">Days covered</span>
                <span className="rounded-lg bg-muted/20 px-3 py-2 text-center font-mono text-sm font-semibold text-foreground">
                  {result.recommendationExplainer.coverageSummary.beforeDisplay}
                </span>
                <span className="rounded-lg bg-primary/8 px-3 py-2 text-center font-mono text-sm font-semibold text-primary">
                  {result.recommendationExplainer.coverageSummary.afterDisplay}
                </span>
              </div>
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 items-center">
                <span className="text-xs font-medium text-muted-foreground">Survival status</span>
                <span className={`rounded-lg px-3 py-2 text-center text-sm font-semibold ${statusColors[result.survivalScore]}`}>
                  {result.survivalScore}
                </span>
                <span className={`rounded-lg px-3 py-2 text-center text-sm font-semibold ${statusColors[projectedStatus]}`}>
                  {projectedStatus}
                </span>
              </div>
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 items-center">
                <span className="text-xs font-medium text-muted-foreground">Budget after action</span>
                <span className="rounded-lg bg-muted/20 px-3 py-2 text-center font-mono text-sm font-semibold text-foreground">
                  RM{input.budget.toFixed(2)}
                </span>
                <span className="rounded-lg bg-primary/8 px-3 py-2 text-center font-mono text-sm font-semibold text-primary">
                  RM{result.budgetAfterShopping.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Warm final message */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04]" />
          <div className="relative glass-card p-5 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium mb-1.5">Next move</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {result.finalMessage}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="w-full inline-flex items-center justify-center gap-3 gradient-warm text-primary-foreground px-8 py-4 rounded-2xl text-base font-semibold shadow-glow transition-all hover:shadow-elevated"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </motion.button>
      </div>
    </div>
  );
};

export default ShoppingSummary;
