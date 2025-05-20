import { useState } from 'react';
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useBudget } from '../../../contexts/BudgetContext';
import { SavingsGoal } from '../../../types/budget';
import { generateId, formatCurrency } from '../../../utils/budgetHelpers';

interface SavingsGoalFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function SavingsGoalForm({ onNext, onPrevious }: SavingsGoalFormProps) {
  const { savingsGoals, setSavingsGoals, totalSavingsGoals, totalIncome } = useBudget();
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<SavingsGoal['category']>('emergency');
  const [error, setError] = useState('');

  const handleAddSavingsGoal = () => {
    // Validation
    if (!name.trim()) {
      setError('Please enter a name for this savings goal');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    const newSavingsGoal: SavingsGoal = {
      id: generateId(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
    };
    
    setSavingsGoals([...savingsGoals, newSavingsGoal]);
    
    // Reset form
    setName('');
    setAmount('');
    setCategory('emergency');
    setError('');
  };

  const handleRemoveSavingsGoal = (id: string) => {
    setSavingsGoals(savingsGoals.filter(item => item.id !== id));
  };

  const percentOfIncome = totalIncome > 0 
    ? ((totalSavingsGoals / totalIncome) * 100).toFixed(1)
    : '0';

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Savings Goals</h2>
      <p className="text-slate-600 mb-6">
        Set monthly contributions towards your savings goals. These could be for emergencies, large purchases, or future plans.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-coral-50 text-coral-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="space-y-4 mb-6">
        <div className="input-group">
          <label className="input-label" htmlFor="savings-name">
            Savings Goal Name
          </label>
          <input
            id="savings-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Emergency Fund, New Laptop"
            className="w-full"
          />
        </div>
        
        <div className="input-group">
          <label className="input-label" htmlFor="savings-amount">
            Monthly Contribution
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-500">$</span>
            </div>
            <input
              id="savings-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="0"
              step="1"
              className="w-full pl-7"
            />
          </div>
        </div>
        
        <div className="input-group">
          <label className="input-label" htmlFor="savings-category">
            Category
          </label>
          <select
            id="savings-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as SavingsGoal['category'])}
            className="w-full"
          >
            <option value="emergency">Emergency Fund</option>
            <option value="retirement">Retirement</option>
            <option value="vacation">Vacation</option>
            <option value="bigPurchase">Major Purchase</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <button 
          onClick={handleAddSavingsGoal}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Savings Goal</span>
        </button>
      </div>
      
      {/* Savings List */}
      {savingsGoals.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Your Savings Goals</h3>
          <div className="space-y-2">
            {savingsGoals.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-slate-600">
                    {formatCurrency(item.amount)} monthly
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveSavingsGoal(item.id)}
                  className="text-slate-500 hover:text-coral-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
            <div>
              <div className="font-medium">Total Monthly Savings</div>
              <div className="text-sm text-slate-600">
                {percentOfIncome}% of your income
              </div>
            </div>
            <span className="font-bold text-xl">{formatCurrency(totalSavingsGoals)}</span>
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
          className="btn-primary flex items-center gap-2"
          onClick={onNext}
        >
          <span>Next Step</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}