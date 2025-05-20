import { useState } from 'react';
import { PlusCircle, Trash2, ArrowRight } from 'lucide-react';
import { useBudget } from '../../../contexts/BudgetContext';
import { Income } from '../../../types/budget';
import { generateId, formatCurrency } from '../../../utils/budgetHelpers';

interface IncomeFormProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
}

export default function IncomeForm({ onNext, isFirstStep }: IncomeFormProps) {
  const { income, setIncome, totalIncome } = useBudget();
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Income['category']>('salary');
  const [frequency, setFrequency] = useState<Income['frequency']>('monthly');
  const [error, setError] = useState('');

  const handleAddIncome = () => {
    // Validation
    if (!name.trim()) {
      setError('Please enter a name for this income source');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    const newIncome: Income = {
      id: generateId(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      frequency,
    };
    
    setIncome([...income, newIncome]);
    
    // Reset form
    setName('');
    setAmount('');
    setCategory('salary');
    setFrequency('monthly');
    setError('');
  };

  const handleRemoveIncome = (id: string) => {
    setIncome(income.filter(item => item.id !== id));
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Let's start with your income</h2>
      <p className="text-slate-600 mb-6">
        Add all your income sources to get an accurate picture of your available funds.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-coral-50 text-coral-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="space-y-4 mb-6">
        <div className="input-group">
          <label className="input-label" htmlFor="income-name">
            Income Source Name
          </label>
          <input
            id="income-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Main Job, Side Hustle"
            className="w-full"
          />
        </div>
        
        <div className="input-group">
          <label className="input-label" htmlFor="income-amount">
            Amount (Monthly)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-500">$</span>
            </div>
            <input
              id="income-amount"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <label className="input-label" htmlFor="income-category">
              Category
            </label>
            <select
              id="income-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Income['category'])}
              className="w-full"
            >
              <option value="salary">Salary</option>
              <option value="grant">Grant/Scholarship</option>
              <option value="sideJob">Side Job</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="income-frequency">
              Frequency
            </label>
            <select
              id="income-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Income['frequency'])}
              className="w-full"
            >
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleAddIncome}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Income Source</span>
        </button>
      </div>
      
      {/* Income List */}
      {income.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Your Income Sources</h3>
          <div className="space-y-2">
            {income.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-slate-600">
                    {formatCurrency(item.amount)} · {item.frequency}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveIncome(item.id)}
                  className="text-slate-500 hover:text-coral-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
            <span className="font-medium">Total Monthly Income</span>
            <span className="font-bold text-xl">{formatCurrency(totalIncome)}</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        {!isFirstStep && (
          <button className="btn-outline" onClick={onPrevious}>
            Back
          </button>
        )}
        <button 
          className="btn-primary ml-auto flex items-center gap-2"
          onClick={onNext}
        >
          <span>Next Step</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}