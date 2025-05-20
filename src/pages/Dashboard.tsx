import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../contexts/BudgetContext';
import { useNavigate } from 'react-router-dom';
import BudgetProgress from '../components/ui/BudgetProgress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Edit2, 
  DollarSign,
  Wallet,
  Landmark
} from 'lucide-react';
import { formatCurrency } from '../utils/budgetHelpers';

export default function Dashboard() {
  const { 
    hasCompletedSetup, 
    totalIncome, 
    totalFixedExpenses, 
    totalVariableExpenses, 
    totalSavingsGoals,
    remainingFunds,
    income,
    fixedExpenses,
    variableExpenses,
    savingsGoals
  } = useBudget();
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // If the user hasn't completed setup, redirect to create
    if (!hasCompletedSetup && !income.length) {
      navigate('/create');
    }
  }, [hasCompletedSetup, navigate, income.length]);
  
  // Prepare data for charts
  const budgetDistributionData = [
    { name: 'Needs', value: totalFixedExpenses, color: '#1c6de8' },
    { name: 'Wants', value: totalVariableExpenses, color: '#6c45e7' },
    { name: 'Savings', value: totalSavingsGoals, color: '#22d095' },
  ].filter(item => item.value > 0);

  // Expense categories data
  const expenseCategoriesData = [
    ...fixedExpenses.map(item => ({ 
      name: item.name, 
      value: item.amount, 
      category: 'Fixed' 
    })),
    ...variableExpenses.map(item => ({ 
      name: item.name, 
      value: item.amount, 
      category: 'Variable' 
    }))
  ].sort((a, b) => b.value - a.value).slice(0, 5);
  
  const expenseColors = {
    Fixed: '#1c6de8',
    Variable: '#6c45e7'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Budget Dashboard</h1>
        <button 
          onClick={() => navigate('/create')}
          className="btn-outline flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" />
          <span>Edit Budget</span>
        </button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-white/90">Total Income</h3>
            <DollarSign className="h-5 w-5 text-white/80" />
          </div>
          <div className="text-2xl font-bold mb-2">{formatCurrency(totalIncome)}</div>
          <div className="text-sm text-white/80">Monthly</div>
        </div>
        
        <div className="card bg-white">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-slate-700">Total Expenses</h3>
            <Wallet className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold mb-2">
            {formatCurrency(totalFixedExpenses + totalVariableExpenses)}
          </div>
          <div className="flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 text-coral-500 mr-1" />
            <span className="text-slate-600">
              {Math.round(((totalFixedExpenses + totalVariableExpenses) / totalIncome) * 100)}% of income
            </span>
          </div>
        </div>
        
        <div className="card bg-white">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-slate-700">Total Savings</h3>
            <Landmark className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold mb-2">{formatCurrency(totalSavingsGoals)}</div>
          <div className="flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 text-mint-500 mr-1" />
            <span className="text-slate-600">
              {Math.round((totalSavingsGoals / totalIncome) * 100)}% of income
            </span>
          </div>
        </div>
        
        <div className={`card ${remainingFunds >= 0 ? 'bg-mint-50' : 'bg-coral-50'}`}>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`font-medium ${remainingFunds >= 0 ? 'text-mint-800' : 'text-coral-800'}`}>
              {remainingFunds >= 0 ? 'Available Funds' : 'Overspent'}
            </h3>
            {remainingFunds >= 0 ? (
              <ArrowDownRight className="h-5 w-5 text-mint-600" />
            ) : (
              <ArrowUpRight className="h-5 w-5 text-coral-600" />
            )}
          </div>
          <div className={`text-2xl font-bold mb-2 ${
            remainingFunds >= 0 ? 'text-mint-700' : 'text-coral-700'
          }`}>
            {formatCurrency(Math.abs(remainingFunds))}
          </div>
          <div className={`text-sm ${
            remainingFunds >= 0 ? 'text-mint-800' : 'text-coral-800'
          }`}>
            {remainingFunds >= 0 
              ? 'Remaining after expenses & savings' 
              : 'Over your monthly income'}
          </div>
        </div>
      </div>
      
      {/* Budget Progress */}
      <BudgetProgress />
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Budget Distribution</h2>
          <div className="h-72">
            {budgetDistributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {budgetDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Amount']} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                Add budget items to see your distribution
              </div>
            )}
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Top Expenses</h2>
          {expenseCategoriesData.length > 0 ? (
            <div className="space-y-4">
              {expenseCategoriesData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: expenseColors[item.category as keyof typeof expenseColors] }}
                      ></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-value"
                      style={{ 
                        width: `${(item.value / (totalFixedExpenses + totalVariableExpenses)) * 100}%`,
                        backgroundColor: expenseColors[item.category as keyof typeof expenseColors]
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {item.category} · {Math.round((item.value / totalIncome) * 100)}% of income
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-500">
              Add expenses to see your top spending categories
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}