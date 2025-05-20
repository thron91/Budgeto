import { useMemo } from 'react';
import { useBudget } from '../../contexts/BudgetContext';
import { calculateBudgetRecommendations, formatCurrency } from '../../utils/budgetHelpers';
import { 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  XCircle 
} from 'lucide-react';

export default function BudgetProgress() {
  const { 
    totalIncome, 
    totalFixedExpenses, 
    totalVariableExpenses, 
    totalSavingsGoals,
    needsPercentage,
    wantsPercentage,
    savingsPercentage
  } = useBudget();
  
  const recommendation = useMemo(() => {
    return calculateBudgetRecommendations(
      totalIncome,
      totalFixedExpenses,
      totalVariableExpenses,
      totalSavingsGoals
    );
  }, [totalIncome, totalFixedExpenses, totalVariableExpenses, totalSavingsGoals]);
  
  // Status icon based on recommendation status
  const StatusIcon = {
    excellent: <CheckCircle2 className="h-6 w-6 text-mint-500" />,
    good: <CheckCircle2 className="h-6 w-6 text-primary-500" />,
    warning: <AlertTriangle className="h-6 w-6 text-gold-500" />,
    danger: <XCircle className="h-6 w-6 text-coral-600" />
  }[recommendation.status];
  
  // Colors for the progress bars based on the status
  const getProgressColor = (category: string, percentage: number) => {
    const isOverBudget = percentage > (category === 'needs' ? 50 : category === 'wants' ? 30 : 20);
    
    if (recommendation.status === 'danger') {
      return isOverBudget ? 'bg-coral-600' : 'bg-mint-500';
    }
    
    if (recommendation.status === 'warning' && isOverBudget) {
      return 'bg-gold-500';
    }
    
    return category === 'needs' 
      ? 'bg-primary-500' 
      : category === 'wants' 
        ? 'bg-lavender-500' 
        : 'bg-mint-500';
  };

  return (
    <div className="card animate-fade-in mb-6">
      <div className="flex items-start gap-4">
        <div>
          {StatusIcon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Budget Health</h3>
          <p className="text-slate-600 mb-4">{recommendation.message}</p>
          
          {/* Progress bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium">
                  Needs (Essential): <span className="font-semibold">{needsPercentage.toFixed(1)}%</span>
                </div>
                <div className="text-sm text-slate-500">
                  Recommended: 50%
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-value ${getProgressColor('needs', needsPercentage)}`}
                  style={{ width: `${Math.min(needsPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {formatCurrency(totalFixedExpenses)} / {formatCurrency(totalIncome)}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium">
                  Wants (Non-essential): <span className="font-semibold">{wantsPercentage.toFixed(1)}%</span>
                </div>
                <div className="text-sm text-slate-500">
                  Recommended: 30%
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-value ${getProgressColor('wants', wantsPercentage)}`}
                  style={{ width: `${Math.min(wantsPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {formatCurrency(totalVariableExpenses)} / {formatCurrency(totalIncome)}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium">
                  Savings: <span className="font-semibold">{savingsPercentage.toFixed(1)}%</span>
                </div>
                <div className="text-sm text-slate-500">
                  Recommended: 20%
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-value ${getProgressColor('savings', savingsPercentage)}`}
                  style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {formatCurrency(totalSavingsGoals)} / {formatCurrency(totalIncome)}
              </div>
            </div>
          </div>
          
          {/* Adjustments suggestions */}
          {recommendation.adjustments && recommendation.adjustments.length > 0 && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <h4 className="text-sm font-medium mb-2">Suggested Adjustments:</h4>
              <ul className="space-y-2 text-sm">
                {recommendation.adjustments.map((adjustment, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      {adjustment.category === 'needs' && 'Try to reduce your essential expenses by '}
                      {adjustment.category === 'wants' && 'Consider cutting back on non-essential spending by '}
                      {adjustment.category === 'savings' && 'Try to increase your savings by '}
                      <strong>
                        {formatCurrency(Math.abs(adjustment.difference))}
                      </strong>
                      {adjustment.category === 'savings' 
                        ? ' to reach the recommended 20% savings rate.' 
                        : ' to better align with the 50/30/20 budget rule.'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}