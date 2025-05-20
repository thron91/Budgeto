import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useBudget } from '../../../contexts/BudgetContext';
import { formatCurrency } from '../../../utils/budgetHelpers';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetSummaryProps {
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

export default function BudgetSummary({ onNext, onPrevious, isLastStep }: BudgetSummaryProps) {
  const { 
    totalIncome, 
    totalFixedExpenses, 
    totalVariableExpenses, 
    totalSavingsGoals,
    remainingFunds,
    needsPercentage,
    wantsPercentage,
    savingsPercentage
  } = useBudget();
  
  const isBalanced = remainingFunds >= 0;
  
  // Data for pie chart
  const budgetData = [
    { name: 'Needs', value: totalFixedExpenses, color: '#1c6de8' },
    { name: 'Wants', value: totalVariableExpenses, color: '#6c45e7' },
    { name: 'Savings', value: totalSavingsGoals, color: '#22d095' },
  ];
  
  // If there's remaining funds, add that segment
  if (remainingFunds > 0) {
    budgetData.push({
      name: 'Unallocated',
      value: remainingFunds,
      color: '#fab317',
    });
  }
  
  // Filter out zero values for chart
  const filteredData = budgetData.filter(item => item.value > 0);
  
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
      
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <h3 className="font-medium mb-2">Your Monthly Budget</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Total Income</span>
            <span className="font-medium">{formatCurrency(totalIncome)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Fixed Expenses (Needs)</span>
            <span className="font-medium">
              {formatCurrency(totalFixedExpenses)} 
              <span className="text-sm text-slate-500 ml-1">
                ({needsPercentage.toFixed(1)}%)
              </span>
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Variable Expenses (Wants)</span>
            <span className="font-medium">
              {formatCurrency(totalVariableExpenses)}
              <span className="text-sm text-slate-500 ml-1">
                ({wantsPercentage.toFixed(1)}%)
              </span>
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Savings Goals</span>
            <span className="font-medium">
              {formatCurrency(totalSavingsGoals)}
              <span className="text-sm text-slate-500 ml-1">
                ({savingsPercentage.toFixed(1)}%)
              </span>
            </span>
          </div>
          
          <div className="pt-3 border-t border-slate-200">
            <div className="flex justify-between items-center font-semibold">
              <span>Remaining Funds</span>
              <span className={`${isBalanced ? 'text-mint-600' : 'text-coral-600'}`}>
                {formatCurrency(remainingFunds)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Budget Balance Feedback */}
      <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
        isBalanced ? 'bg-mint-50' : 'bg-coral-50'
      }`}>
        {isBalanced ? (
          <CheckCircle2 className="h-5 w-5 text-mint-600 mt-0.5" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-coral-600 mt-0.5" />
        )}
        
        <div className={isBalanced ? 'text-mint-800' : 'text-coral-800'}>
          <p className="font-medium">
            {isBalanced 
              ? 'Your budget is balanced!' 
              : 'Your expenses exceed your income.'}
          </p>
          <p className="text-sm mt-1">
            {isBalanced 
              ? `You have ${formatCurrency(remainingFunds)} left to allocate or save.` 
              : `You're spending ${formatCurrency(Math.abs(remainingFunds))} more than you earn.`}
          </p>
          <p className="text-sm mt-2">
            {isBalanced
              ? 'Consider putting extra funds toward savings goals or debt repayment.'
              : 'Try reducing some variable expenses or finding additional income sources.'}
          </p>
        </div>
      </div>
      
      {/* Budget Pie Chart */}
      {filteredData.length > 0 && (
        <div className="mb-6 bg-white rounded-lg">
          <h3 className="font-medium mb-3">Budget Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Amount']} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        <button 
          className="btn-outline flex items-center gap-2"
          onClick={onPrevious}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>
        
        <button 
          className="btn-primary"
          onClick={onNext}
        >
          {isLastStep ? 'Finish & Go to Dashboard' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}