import { describe, expect, it } from 'vitest';
import { calculateSurvival } from '@/lib/survival-engine';
import { UserInput } from '@/lib/types';

function buildInput(overrides: Partial<UserInput> = {}): UserInput {
  return {
    budget: 20,
    daysLeft: 3,
    dietaryPreference: 'no-preference',
    pantryItems: ['rice', 'eggs', 'onion', 'instant noodles'],
    ...overrides,
  };
}

describe('calculateSurvival', () => {
  it('returns the locked canonical demo outputs', () => {
    const result = calculateSurvival(buildInput());

    expect(result.daysCovered).toBe(2.8);
    expect(result.survivalScore).toBe('Tight');
    expect(result.confidenceLevel).toBe('Medium');
    expect(result.cheapestNextPurchase.name).toBe('Tofu');
    expect(result.cheapestNextPurchase.estimatedCost).toBe(4.5);
    expect(result.coverageImproved).toBe('from 2.8 days to 3+ days');
    expect(result.meals.map(meal => meal.name)).toEqual([
      'Egg Fried Rice',
      'Instant Noodles with Egg',
      'Tofu Rice Bowl',
    ]);
    expect(result.missingIngredients).toEqual(['tofu']);
  });

  it('returns a critical warning for a fragile low-budget case', () => {
    const result = calculateSurvival(buildInput({
      budget: 5,
      pantryItems: ['instant noodles'],
    }));

    expect(result.survivalScore).toBe('Critical');
    expect(result.confidenceLevel).toBe('Low');
    expect(result.urgencyWarning).toContain('critically low');
  });

  it('returns a safer result for a stronger pantry and budget', () => {
    const result = calculateSurvival(buildInput({
      budget: 35,
      pantryItems: ['rice', 'eggs', 'onion', 'instant noodles', 'bread', 'tofu'],
    }));

    expect(result.survivalScore).toBe('Safe');
    expect(['High', 'Medium']).toContain(result.confidenceLevel);
    expect(result.daysCovered).toBeGreaterThanOrEqual(3.3);
    expect(result.coverageImproved).toBe('stays at 4 days');
  });

  it('filters out non-vegetarian unlocks for vegetarian mode', () => {
    const result = calculateSurvival(buildInput({
      dietaryPreference: 'vegetarian',
      pantryItems: ['rice', 'onion', 'instant noodles'],
    }));

    expect(result.cheapestNextPurchase.name).not.toBe('Sardines');
    expect(result.meals.every(meal => meal.name !== 'Sardine Rice')).toBe(true);
  });

  it('uses a real fallback meal for an empty pantry case', () => {
    const result = calculateSurvival(buildInput({
      budget: 12,
      pantryItems: [],
    }));

    expect(result.meals[0]?.name).toBe('Tofu Starter Meal');
    expect(result.missingIngredients).toEqual(['tofu']);
    expect(result.cheapestNextPurchase.mealsUnlocked).toBe(1);
    expect(result.coverageImproved).toBe('from 0.5 days to 1+ days');
  });
});
