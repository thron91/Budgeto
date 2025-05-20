import { useState } from 'react';
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useBudget } from '../../../contexts/BudgetContext';
import { FixedExpense } from '../../../types/budget';
import { generateId, formatCurrency } from '../../../utils/budgetHelpers';

interface FixedExpenseFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function FixedExpenseForm({ onNext, onPrevious }: FixedExpenseFormProps) {
  const { fixedExpenses, setFixedExpenses, totalFixedExpenses, totalIncome } = useBudget();
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<FixedExpense['category']>('housing');
  const [error, setError] = useState('');

  const handleAddExpense = () => {
    // Validation
    if (!name.trim()) {
      setError('Please enter a name for this expense');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    const newExpense: FixedExpense = {
      id: generateId(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
    };
    
    setFixedExpenses([...fixedExpenses, newExpense]);
    
    // Reset form
    setName('');
    setAmount('');
    setCategory('housing');
    setError('');
  };

  const handleRemoveExpense = (id: string) => {
    setFixedExpenses(fixedExpenses.filter(item => item.id !== id));
  };

  const percentOfIncome = totalIncome > 0 
    ? ((totalFixedExpenses / totalIncome) * 100).toFixed(1)
    : '0';

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Fixed Monthly Expenses</h2>
      <p className="text-slate-600 mb-6">
        Add your essential expenses that you pay regularly each month. These are typically bills and payments that stay the same.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-coral-50 text-coral-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="space-y-4 mb-6">
        <div className="input-group">
          <label className="input-label" htmlFor="expense-name">
            Expense Name
          </label>
          <input
            id="expense-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Rent, Phone bill"
            className="w-full"
          />
        </div>
        
        <div className="input-group">
          <label className="input-label" htmlFor="expense-amount">
            Monthly Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-500">$</span>
            </div>
            <input
              id="expense-amount"
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
          <label className="input-label" htmlFor="expense-category">
            Category
          </label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as FixedExpense['category'])}
            className="w-full"
          >
            <option value="housing">Housing (Rent/Mortgage)</option>
            <option value="transport">Transportation</option>
            <option value="utilities">Utilities</option>
            <option value="insurance">Insurance</option>
            <option value="subscription">Subscriptions</option>
            <option value="debt">Debt Payments</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <button 
          onClick={handleAddExpense}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Fixed Expense</span>
        </button>
      </div>
      
      {/* Expenses List */}
      {fixedExpenses.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Your Fixed Expenses</h3>
          <div className="space-y-2">
            {fixedExpenses.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-slate-600">
                    {formatCurrency(item.amount)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveExpense(item.id)}
                  className="text-slate-500 hover:text-coral-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
            <div>
              <div className="font-medium">Total Fixed Expenses</div>
              <div className="text-sm text-slate-600">
                {percentOfIncome}% of your income
              </div>
            </div>
            <span className="font-bold text-xl">{formatCurrency(totalFixedExpenses)}</span>
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