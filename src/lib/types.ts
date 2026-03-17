export type DietaryPreference = 'no-preference' | 'vegetarian' | 'halal' | 'no-pork';

export interface UserInput {
  budget: number;
  daysLeft: number;
  dietaryPreference: DietaryPreference;
  pantryItems: string[];
}

export type SurvivalStatus = 'Safe' | 'Tight' | 'Critical';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface MealSuggestion {
  day: number;
  name: string;
  ingredients: string[];
  estimatedCost: number;
}

export interface ShoppingItem {
  name: string;
  estimatedCost: number;
  mealsUnlocked: number;
  reason: string;
}

export interface SurvivalResult {
  survivalScore: SurvivalStatus;
  confidenceLevel: ConfidenceLevel;
  daysCovered: number;
  urgencyWarning: string;
  cheapestNextPurchase: ShoppingItem;
  meals: MealSuggestion[];
  pantryItemsUsed: string[];
  missingIngredients: string[];
  totalEstimatedCost: { min: number; max: number };
  budgetAfterShopping: number;
  coverageImproved: string;
  finalMessage: string;
}
