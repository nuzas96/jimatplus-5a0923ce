export type DietaryPreference = 'no-preference' | 'vegetarian' | 'halal-friendly' | 'low-cost-only';

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

export interface PurchaseComparison {
  name: string;
  estimatedCost: number;
  mealsUnlocked: number;
  coverageAfterPurchase: number;
  verdict: 'selected' | 'alternative';
  reason: string;
}

export interface CoverageSummary {
  before: number;
  after: number;
  targetDays: number;
  label: string;
}

export interface RecommendationExplainer {
  pantryMealNames: string[];
  pantryMealCount: number;
  localContextNote: string;
  purchaseRationale: string;
  comparisonItems: PurchaseComparison[];
  coverageSummary: CoverageSummary;
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
  recommendationExplainer: RecommendationExplainer;
}
