import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, X } from 'lucide-react';
import { DietaryPreference, UserInput } from '@/lib/types';

interface InputFlowProps {
  onSubmit: (input: UserInput) => void;
  onBack: () => void;
}

const COMMON_ITEMS = ['rice', 'eggs', 'onion', 'instant noodles', 'bread', 'sardines', 'garlic', 'soy sauce', 'oil'];
const DIETARY_OPTIONS: Array<{ value: DietaryPreference; label: string }> = [
  { value: 'no-preference', label: 'No Preference' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'halal-friendly', label: 'Halal-Friendly' },
  { value: 'low-cost-only', label: 'Low-Cost Only' },
];

const InputFlow = ({ onSubmit, onBack }: InputFlowProps) => {
  const [budget, setBudget] = useState('');
  const [daysLeft, setDaysLeft] = useState('');
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
    setPantryItems(pantryItems.filter(existingItem => existingItem !== item));
  };

  const handleSubmit = () => {
    if (!budget || !daysLeft) {
      return;
    }

    onSubmit({
      budget: parseFloat(budget),
      daysLeft: parseInt(daysLeft, 10),
      dietaryPreference: dietary,
      pantryItems,
    });
  };

  const isValid = budget && parseFloat(budget) > 0 && daysLeft && parseInt(daysLeft, 10) > 0;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-lg w-full"
      >
        <button onClick={onBack} className="font-label text-muted-foreground mb-8 hover:text-foreground transition-colors">
          &larr; Back
        </button>

        <h2 className="font-display text-3xl text-foreground mb-2">Tell us your current food situation</h2>
        <p className="text-muted-foreground mb-10">We&apos;ll calculate whether your food and budget can last.</p>

        <div className="bg-card p-6 rounded-2xl shadow-card mb-4">
          <label className="font-label text-muted-foreground mb-3 block">Remaining Budget (RM)</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-mono text-lg">RM</span>
            <input
              type="number"
              value={budget}
              onChange={event => setBudget(event.target.value)}
              placeholder="20"
              className="flex-1 bg-transparent font-mono text-2xl text-foreground outline-none placeholder:text-muted-foreground/40 ring-0 focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1 transition-all duration-150"
            />
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-card mb-4">
          <label className="font-label text-muted-foreground mb-3 block">Days Left Until Next Allowance</label>
          <input
            type="number"
            value={daysLeft}
            onChange={event => setDaysLeft(event.target.value)}
            placeholder="3"
            className="w-full bg-transparent font-mono text-2xl text-foreground outline-none placeholder:text-muted-foreground/40 ring-0 focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1 transition-all duration-150"
          />
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-card mb-4">
          <label className="font-label text-muted-foreground mb-3 block">Dietary Preference</label>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => setDietary(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  dietary === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-card mb-8">
          <label className="font-label text-muted-foreground mb-1 block">What Do You Still Have At Home?</label>
          <p className="text-sm text-muted-foreground/70 mb-4">
            Add simple ingredients like rice, eggs, onion, instant noodles, bread, or sardines.
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentItem}
              onChange={event => setCurrentItem(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && addItem(currentItem)}
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

          <div className="flex flex-wrap gap-1.5 mb-4">
            {COMMON_ITEMS.filter(item => !pantryItems.includes(item)).map(item => (
              <button
                key={item}
                onClick={() => addItem(item)}
                className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-md hover:bg-muted/70 transition-colors border border-border/50"
              >
                + {item}
              </button>
            ))}
          </div>

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
