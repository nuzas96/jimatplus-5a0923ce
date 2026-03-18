import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Package, Utensils } from 'lucide-react';
import { SurvivalResult } from '@/lib/types';

interface SurvivalPlanProps {
  result: SurvivalResult;
  onViewShopping: () => void;
  onBack: () => void;
}

const SurvivalPlan = ({ result, onViewShopping, onBack }: SurvivalPlanProps) => {
  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="max-w-lg w-full">
        <button onClick={onBack} className="font-label text-muted-foreground mb-8 hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4 inline mr-1" />Back to results
        </button>

        <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
          <h2 className="font-display text-3xl text-foreground mb-2">Your 3-Day Survival Plan</h2>
          <p className="text-muted-foreground mb-3">This plan prioritizes pantry reuse first and keeps spending minimal.</p>
          <p className="text-sm text-muted-foreground/80 mb-8">{result.recommendationExplainer.coverageSummary.label} after one strategic purchase.</p>
        </motion.div>

        <div className="relative mb-8">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {result.meals.map((meal, index) => (
            <motion.div
              key={meal.day}
              {...fadeUp}
              transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
              className="relative pl-12 pb-6 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-card shadow-card flex items-center justify-center border border-border">
                <span className="font-mono text-xs font-bold text-foreground">{meal.day}</span>
              </div>
              <div className="bg-card p-5 rounded-2xl shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-4 h-4 text-primary" />
                  <span className="font-label text-muted-foreground">Day {meal.day}</span>
                </div>
                <h3 className="text-foreground font-semibold text-lg">{meal.name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {meal.ingredients.map(ingredient => (
                    <span key={ingredient} className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-md">
                      {ingredient}
                    </span>
                  ))}
                </div>
                {meal.estimatedCost > 0 && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    + RM{meal.estimatedCost.toFixed(2)} purchase needed
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} transition={{ delay: 0.5, duration: 0.4 }} className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card p-5 rounded-2xl shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-status-safe" />
              <span className="font-label text-muted-foreground">Pantry Used</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {result.pantryItemsUsed.map(item => (
                <span key={item} className="px-2.5 py-0.5 bg-status-safe/10 text-status-safe-foreground text-xs rounded-md font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-card">
            <span className="font-label text-muted-foreground block mb-2">Missing</span>
            <div className="flex flex-wrap gap-1.5">
              {result.missingIngredients.length > 0 ? result.missingIngredients.map(item => (
                <span key={item} className="px-2.5 py-0.5 bg-status-tight/10 text-status-tight-foreground text-xs rounded-md font-medium">
                  {item}
                </span>
              )) : (
                <span className="text-xs text-muted-foreground">None</span>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.6, duration: 0.4 }} className="bg-card p-5 rounded-2xl shadow-card mb-8">
          <span className="font-label text-muted-foreground block mb-1">Estimated Total Cost</span>
          <span className="font-mono text-2xl font-bold text-foreground">
            RM{result.totalEstimatedCost.min.toFixed(2)} - RM{result.totalEstimatedCost.max.toFixed(2)}
          </span>
          <p className="text-sm text-muted-foreground mt-3">
            Pantry-first meals handle the early stretch. The extra spend is mainly for {result.cheapestNextPurchase.name.toLowerCase()} to reduce the risk of running short.
          </p>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onViewShopping}
          className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold shadow-elevated transition-all hover:opacity-90"
        >
          See Shopping Summary
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default SurvivalPlan;
