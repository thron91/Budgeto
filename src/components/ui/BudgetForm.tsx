import { useState } from 'react';
import { useBudget } from '../../contexts/BudgetContext';
import IncomeForm from './forms/IncomeForm';
import FixedExpenseForm from './forms/FixedExpenseForm';
import VariableExpenseForm from './forms/VariableExpenseForm';
import SavingsGoalForm from './forms/SavingsGoalForm';
import BudgetSummary from './forms/BudgetSummary';
import { motion } from 'framer-motion';

const steps = [
  { id: 0, name: 'Income', component: IncomeForm },
  { id: 1, name: 'Fixed Expenses', component: FixedExpenseForm },
  { id: 2, name: 'Variable Expenses', component: VariableExpenseForm },
  { id: 3, name: 'Savings Goals', component: SavingsGoalForm },
  { id: 4, name: 'Summary', component: BudgetSummary },
];

export default function BudgetForm() {
  const { 
    currentStep, 
    setCurrentStep, 
    completeSetup, 
    saveToStorage 
  } = useBudget();

  const currentStepData = steps[currentStep];
  const CurrentStepComponent = currentStepData.component;

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      saveToStorage();
    } else {
      completeSetup();
      saveToStorage();
      window.location.href = '/dashboard';
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 50
    },
    in: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -50
    }
  };

  return (
    <div className="budget-form-container">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 font-medium 
                ${
                  step.id < currentStep
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : step.id === currentStep
                    ? 'border-primary-600 bg-white text-primary-600'
                    : 'border-slate-300 bg-white text-slate-300'
                }`}
            >
              {step.id + 1}
            </button>
          ))}
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-slate-200"></div>
          </div>
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-0.5 w-1/5 ${
                  step.id < currentStep ? 'bg-primary-600' : 'bg-slate-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-between text-xs">
          {steps.map((step) => (
            <span
              key={step.id}
              className={`${
                step.id <= currentStep ? 'text-primary-600' : 'text-slate-500'
              }`}
            >
              {step.name}
            </span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <motion.div
        key={currentStep}
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      >
        <CurrentStepComponent
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
          isLastStep={currentStep === steps.length - 1}
          isFirstStep={currentStep === 0}
        />
      </motion.div>
    </div>
  );
}