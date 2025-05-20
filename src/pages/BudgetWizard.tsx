import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BudgetForm from '../components/ui/BudgetForm';
import { useBudget } from '../contexts/BudgetContext';
import { useNavigate } from 'react-router-dom';

export default function BudgetWizard() {
  const { hasCompletedSetup } = useBudget();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If the user has already completed setup, redirect to dashboard
    if (hasCompletedSetup) {
      navigate('/dashboard');
    }
  }, [hasCompletedSetup, navigate]);
  
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create Your Budget</h1>
        <p className="text-slate-600">
          Let's build a personalized budget in a few simple steps.
        </p>
      </div>
      
      <BudgetForm />
    </motion.div>
  );
}