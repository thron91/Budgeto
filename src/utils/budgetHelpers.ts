import { 
  Income, 
  FixedExpense, 
  VariableExpense, 
  SavingsGoal, 
  BudgetRules, 
  DEFAULT_BUDGET_RULE,
  BudgetRecommendation
} from '../types/budget';

/**
 * Generate a unique ID for budget items
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate budgeting recommendations based on the 50/30/20 rule
 */
export function calculateBudgetRecommendations(
  totalIncome: number,
  totalNeeds: number,
  totalWants: number,
  totalSavings: number,
  rules: BudgetRules = DEFAULT_BUDGET_RULE
): BudgetRecommendation {
  if (totalIncome === 0) {
    return {
      status: 'warning',
      message: 'Please add your income to get personalized recommendations.',
    };
  }

  const actualNeedsPercentage = (totalNeeds / totalIncome) * 100;
  const actualWantsPercentage = (totalWants / totalIncome) * 100;
  const actualSavingsPercentage = (totalSavings / totalIncome) * 100;
  
  const needsDifference = actualNeedsPercentage - rules.needsPercentage;
  const wantsDifference = actualWantsPercentage - rules.wantsPercentage;
  const savingsDifference = rules.savingsPercentage - actualSavingsPercentage;
  
  const recommendedNeeds = (rules.needsPercentage / 100) * totalIncome;
  const recommendedWants = (rules.wantsPercentage / 100) * totalIncome;
  const recommendedSavings = (rules.savingsPercentage / 100) * totalIncome;
  
  const adjustments = [];
  
  if (needsDifference > 5) {
    adjustments.push({
      category: 'needs' as const,
      currentAmount: totalNeeds,
      recommendedAmount: recommendedNeeds,
      difference: totalNeeds - recommendedNeeds,
    });
  }
  
  if (wantsDifference > 5) {
    adjustments.push({
      category: 'wants' as const,
      currentAmount: totalWants,
      recommendedAmount: recommendedWants,
      difference: totalWants - recommendedWants,
    });
  }
  
  if (savingsDifference > 5) {
    adjustments.push({
      category: 'savings' as const,
      currentAmount: totalSavings,
      recommendedAmount: recommendedSavings,
      difference: recommendedSavings - totalSavings,
    });
  }
  
  // Determine overall status
  let status: BudgetRecommendation['status'] = 'excellent';
  let message = 'Your budget is well balanced! You\'re following the 50/30/20 rule nicely.';
  
  if (totalNeeds + totalWants + totalSavings > totalIncome) {
    status = 'danger';
    message = 'Your expenses exceed your income. Consider reducing some expenses to avoid debt.';
  } else if (adjustments.length === 1) {
    status = 'good';
    message = 'Your budget is good but could use a small adjustment.';
  } else if (adjustments.length > 1) {
    status = 'warning';
    message = 'Your budget needs some rebalancing to follow the 50/30/20 rule.';
  }
  
  return {
    status,
    message,
    adjustments: adjustments.length > 0 ? adjustments : undefined,
  };
}

/**
 * Get category icon name for different budget items
 */
export function getCategoryIcon(category: string): string {
  const categoryIcons: Record<string, string> = {
    // Income categories
    salary: 'BriefcaseBusiness',
    grant: 'GraduationCap',
    sideJob: 'Hammer',
    
    // Fixed expense categories
    housing: 'Home',
    transport: 'Car',
    utilities: 'Lightbulb',
    insurance: 'Shield',
    subscription: 'SubscriptionIcon',
    debt: 'Landmark',
    
    // Variable expense categories
    food: 'UtensilsCrossed',
    shopping: 'ShoppingBag',
    entertainment: 'Film',
    health: 'Stethoscope',
    education: 'BookOpen',
    travel: 'Plane',
    
    // Savings categories
    emergency: 'Umbrella',
    retirement: 'Hourglass',
    vacation: 'PalmTree',
    bigPurchase: 'Package',
    
    // Default
    other: 'CircleDot',
  };
  
  return categoryIcons[category] || 'CircleDot';
}

/**
 * Get category label for display
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    // Income categories
    salary: 'Salary',
    grant: 'Grant/Scholarship',
    sideJob: 'Side Job',
    
    // Fixed expense categories
    housing: 'Housing',
    transport: 'Transportation',
    utilities: 'Utilities',
    insurance: 'Insurance',
    subscription: 'Subscriptions',
    debt: 'Debt Payments',
    
    // Variable expense categories
    food: 'Food & Dining',
    shopping: 'Shopping',
    entertainment: 'Entertainment',
    health: 'Health & Wellness',
    education: 'Education',
    travel: 'Travel',
    
    // Savings categories
    emergency: 'Emergency Fund',
    retirement: 'Retirement',
    vacation: 'Vacation',
    bigPurchase: 'Major Purchase',
    
    // Default
    other: 'Other',
  };
  
  return labels[category] || 'Other';
}