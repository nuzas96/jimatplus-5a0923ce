import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X, Plus } from 'lucide-react';
import { UserInput, DietaryPreference } from '@/lib/types';

interface InputFlowProps {
  onSubmit: (input: UserInput) => void;
  onBack: () => void;
}

const COMMON_ITEMS = ['rice', 'eggs', 'onion', 'instant noodles', 'bread', 'sardines', 'garlic', 'soy sauce', 'oil'];

const InputFlow = ({ onSubmit, onBack }: InputFlowProps) => {
  const [budget, setBudget] = useState<string>('');
  const [daysLeft, setDaysLeft] = useState<string>('');
  const [dietary, setDietary] = useState<DietaryPreference>('no-preference');
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState('');

  const addItem = (item: string) => {
    const trimmed = item.trim().toLowerCase();
    if (trimmed && !pantryItems.includes(trimmed)) {
      setPantryItems([...pantryItems, trimmed]);
    }
    setCurrentItem('');
  };

  const removeItem = (item: string) => {
    setPantryItems(pantryItems.filter(i => i !== item));
  };

  const handleSubmit = () => {
    if (!budget || !daysLeft) return;
    onSubmit({
      budget: parseFloat(budget),
      daysLeft: parseInt(daysLeft),
      dietaryPreference: dietary,
      pantryItems,
    });
  };

  const isValid = budget && parseFloat(budget) > 0 && daysLeft && parseInt(daysLeft) > 0;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-lg w-full"
      >
        <button onClick={onBack} className="font-label text-muted-foreground mb-8 hover:text-foreground transition-colors">
          ← Back
        </button>

        <h2 className="font-display text-3xl text-foreground mb-2">Tell us your current food situation</h2>
        <p className="text-muted-foreground mb-10">We'll calculate whether your food and budget can last.</p>

        {/* Budget */}
        <div className="bg-card p-6 rounded-2xl shadow-card mb-4">
          <label className="font-label text-muted-foreground mb-3 block">Remaining Budget</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-mono text-lg">RM</span>
            <input
              type="number"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="20"
              className="flex-1 bg-transparent font-mono text-2xl text-foreground outline-none placeholder:text-muted-foreground/40 ring-0 focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1 transition-all duration-150"
            />
          </div>
        </div>

        {/* Days Left */}
        <div className="bg-card p-6 rounded-2xl shadow-card mb-4">
          <label className="font-label text-muted-foreground mb-3 block">Days Until Next Allowance</label>
          <input
            type="number"
            value={daysLeft}
            onChange={e => setDaysLeft(e.target.value)}
            placeholder="3"
            className="w-full bg-transparent font-mono text-2xl text-foreground outline-none placeholder:text-muted-foreground/40 ring-0 focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1 transition-all duration-150"
          />
        </div>

        {/* Dietary */}
        <div className="bg-card p-6 rounded-2xl shadow-card mb-4">
          <label className="font-label text-muted-foreground mb-3 block">Dietary Preference</label>
          <div className="flex flex-wrap gap-2">
            {(['no-preference', 'vegetarian', 'halal', 'no-pork'] as DietaryPreference[]).map(pref => (
              <button
                key={pref}
                onClick={() => setDietary(pref)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  dietary === pref
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {pref === 'no-preference' ? 'No Preference' : pref === 'no-pork' ? 'No Pork' : pref.charAt(0).toUpperCase() + pref.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Pantry */}
        <div className="bg-card p-6 rounded-2xl shadow-card mb-8">
          <label className="font-label text-muted-foreground mb-1 block">What Do You Still Have At Home?</label>
          <p className="text-sm text-muted-foreground/70 mb-4">
            Add simple ingredients like rice, eggs, onion, instant noodles, bread, or sardines.
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentItem}
              onChange={e => setCurrentItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem(currentItem)}
              placeholder="Type an item..."
              className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            />
            <button
              onClick={() => addItem(currentItem)}
              className="bg-primary text-primary-foreground p-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick-add */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {COMMON_ITEMS.filter(i => !pantryItems.includes(i)).map(item => (
              <button
                key={item}
                onClick={() => addItem(item)}
                className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-md hover:bg-muted/70 transition-colors border border-border/50"
              >
                + {item}
              </button>
            ))}
          </div>

          {/* Tags */}
          {pantryItems.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pantryItems.map(item => (
                <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg">
                  {item}
                  <button onClick={() => removeItem(item)} className="hover:text-destructive transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold shadow-elevated transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Generate My Survival Plan
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default InputFlow;
