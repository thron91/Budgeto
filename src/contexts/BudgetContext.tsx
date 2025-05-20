import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { BudgetData, Income, FixedExpense, VariableExpense, SavingsGoal } from '../types/budget';

interface BudgetState {
  income: Income[];
  fixedExpenses: FixedExpense[];
  variableExpenses: VariableExpense[];
  savingsGoals: SavingsGoal[];
  currentStep: number;
  hasCompletedSetup: boolean;
}

const initialState: BudgetState = {
  income: [],
  fixedExpenses: [],
  variableExpenses: [],
  savingsGoals: [],
  currentStep: 0,
  hasCompletedSetup: false,
};

type BudgetAction =
  | { type: 'SET_INCOME'; payload: Income[] }
  | { type: 'SET_FIXED_EXPENSES'; payload: FixedExpense[] }
  | { type: 'SET_VARIABLE_EXPENSES'; payload: VariableExpense[] }
  | { type: 'SET_SAVINGS_GOALS'; payload: SavingsGoal[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'COMPLETE_SETUP' }
  | { type: 'RESET_BUDGET' }
  | { type: 'LOAD_BUDGET'; payload: BudgetState };

function budgetReducer(state: BudgetState, action: BudgetAction): BudgetState {
  switch (action.type) {
    case 'SET_INCOME':
      return { ...state, income: action.payload };
    case 'SET_FIXED_EXPENSES':
      return { ...state, fixedExpenses: action.payload };
    case 'SET_VARIABLE_EXPENSES':
      return { ...state, variableExpenses: action.payload };
    case 'SET_SAVINGS_GOALS':
      return { ...state, savingsGoals: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'COMPLETE_SETUP':
      return { ...state, hasCompletedSetup: true };
    case 'RESET_BUDGET':
      return initialState;
    case 'LOAD_BUDGET':
      return action.payload;
    default:
      return state;
  }
}

interface BudgetContextType extends BudgetState {
  setIncome: (income: Income[]) => void;
  setFixedExpenses: (expenses: FixedExpense[]) => void;
  setVariableExpenses: (expenses: VariableExpense[]) => void;
  setSavingsGoals: (goals: SavingsGoal[]) => void;
  setCurrentStep: (step: number) => void;
  completeSetup: () => void;
  resetBudget: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
  totalIncome: number;
  totalFixedExpenses: number;
  totalVariableExpenses: number;
  totalSavingsGoals: number;
  remainingFunds: number;
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const setIncome = useCallback((income: Income[]) => {
    dispatch({ type: 'SET_INCOME', payload: income });
  }, []);

  const setFixedExpenses = useCallback((expenses: FixedExpense[]) => {
    dispatch({ type: 'SET_FIXED_EXPENSES', payload: expenses });
  }, []);

  const setVariableExpenses = useCallback((expenses: VariableExpense[]) => {
    dispatch({ type: 'SET_VARIABLE_EXPENSES', payload: expenses });
  }, []);

  const setSavingsGoals = useCallback((goals: SavingsGoal[]) => {
    dispatch({ type: 'SET_SAVINGS_GOALS', payload: goals });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  }, []);

  const completeSetup = useCallback(() => {
    dispatch({ type: 'COMPLETE_SETUP' });
  }, []);

  const resetBudget = useCallback(() => {
    dispatch({ type: 'RESET_BUDGET' });
  }, []);

  const saveToStorage = useCallback(() => {
    localStorage.setItem('budgeto-data', JSON.stringify(state));
  }, [state]);

  const loadFromStorage = useCallback(() => {
    const savedData = localStorage.getItem('budgeto-data');
    if (savedData) {
      dispatch({ type: 'LOAD_BUDGET', payload: JSON.parse(savedData) });
    }
  }, []);

  // Calculate totals and percentages
  const totalIncome = state.income.reduce((sum, item) => sum + item.amount, 0);
  
  const totalFixedExpenses = state.fixedExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  
  const totalVariableExpenses = state.variableExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  
  const totalSavingsGoals = state.savingsGoals.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const remainingFunds = 
    totalIncome - totalFixedExpenses - totalVariableExpenses - totalSavingsGoals;

  const needsPercentage = totalIncome > 0 
    ? (totalFixedExpenses / totalIncome) * 100 
    : 0;
    
  const wantsPercentage = totalIncome > 0 
    ? (totalVariableExpenses / totalIncome) * 100 
    : 0;
    
  const savingsPercentage = totalIncome > 0 
    ? (totalSavingsGoals / totalIncome) * 100 
    : 0;

  const value = {
    ...state,
    setIncome,
    setFixedExpenses,
    setVariableExpenses,
    setSavingsGoals,
    setCurrentStep,
    completeSetup,
    resetBudget,
    saveToStorage,
    loadFromStorage,
    totalIncome,
    totalFixedExpenses,
    totalVariableExpenses,
    totalSavingsGoals,
    remainingFunds,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}