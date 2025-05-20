// Common types for budget items
export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
}

// Income types
export interface Income extends BudgetItem {
  category: 'salary' | 'grant' | 'sideJob' | 'other';
  frequency: 'monthly' | 'biweekly' | 'weekly';
}

// Fixed expense types
export interface FixedExpense extends BudgetItem {
  category: 'housing' | 'transport' | 'utilities' | 'insurance' | 'subscription' | 'debt' | 'other';
}

// Variable expense types
export interface VariableExpense extends BudgetItem {
  category: 'food' | 'shopping' | 'entertainment' | 'health' | 'education' | 'travel' | 'other';
}

// Savings goal types
export interface SavingsGoal extends BudgetItem {
  category: 'emergency' | 'retirement' | 'vacation' | 'bigPurchase' | 'education' | 'other';
  targetDate?: Date;
  targetAmount?: number;
}

// Overall budget data structure
export interface BudgetData {
  income: Income[];
  fixedExpenses: FixedExpense[];
  variableExpenses: VariableExpense[];
  savingsGoals: SavingsGoal[];
}

// Budget model recommendations
export interface BudgetRules {
  needsPercentage: number; // Recommended percentage for needs (fixed expenses)
  wantsPercentage: number; // Recommended percentage for wants (variable expenses)
  savingsPercentage: number; // Recommended percentage for savings
}

// Default 50/30/20 rule
export const DEFAULT_BUDGET_RULE: BudgetRules = {
  needsPercentage: 50,
  wantsPercentage: 30,
  savingsPercentage: 20,
};

// Budget recommendation interface
export interface BudgetRecommendation {
  status: 'excellent' | 'good' | 'warning' | 'danger';
  message: string;
  adjustments?: {
    category: 'needs' | 'wants' | 'savings';
    currentAmount: number;
    recommendedAmount: number;
    difference: number;
  }[];
}