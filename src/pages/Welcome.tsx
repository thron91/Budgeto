import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiggyBank, BarChart3, ArrowRight, Lightbulb, Target } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8">
        <PiggyBank className="h-24 w-24 text-primary-600 mx-auto" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-2">Welcome to Budgeto</h1>
        <p className="text-xl text-slate-600">Smart budgeting for young adults</p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="max-w-xl mb-10">
        <p className="text-lg text-slate-700 mb-6">
          Learning to manage your money doesn't have to be complicated. 
          Budgeto helps you create a personalized budget that works for your lifestyle.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card-hover flex flex-col items-center p-4">
            <Target className="h-10 w-10 text-primary-500 mb-3" />
            <h3 className="font-medium mb-1">Set Goals</h3>
            <p className="text-sm text-slate-600">
              Define your income, expenses, and savings goals
            </p>
          </div>
          
          <div className="card-hover flex flex-col items-center p-4">
            <BarChart3 className="h-10 w-10 text-lavender-500 mb-3" />
            <h3 className="font-medium mb-1">Visualize</h3>
            <p className="text-sm text-slate-600">
              See where your money goes with clear charts
            </p>
          </div>
          
          <div className="card-hover flex flex-col items-center p-4">
            <Lightbulb className="h-10 w-10 text-mint-500 mb-3" />
            <h3 className="font-medium mb-1">Get Insights</h3>
            <p className="text-sm text-slate-600">
              Receive personalized tips to improve your finances
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/create')}
          className="btn-primary text-lg py-3 px-8 flex items-center gap-2"
        >
          <span>Create Your Budget</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}