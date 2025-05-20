import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  DollarSign, 
  Wallet, 
  ShieldCheck, 
  TrendingUp,
  CreditCard, 
  PercentCircle, 
  BellRing,
  Blinds 
} from 'lucide-react';

export default function Tips() {
  const tipCategories = [
    {
      title: 'Budgeting Basics',
      icon: <Wallet className="h-5 w-5 text-primary-500" />,
      tips: [
        '50/30/20 Rule: Allocate 50% of income to needs, 30% to wants, and 20% to savings.',
        'Track all expenses for at least a month to understand your spending patterns.',
        'Use automated transfers to savings on payday to make saving effortless.',
        'Review and adjust your budget quarterly as income and expenses change.'
      ]
    },
    {
      title: 'Smart Saving',
      icon: <DollarSign className="h-5 w-5 text-mint-500" />,
      tips: [
        'Build an emergency fund covering 3-6 months of essential expenses.',
        'Save for specific goals using separate accounts to avoid dipping into savings.',
        'Increase your savings rate by 1% every few months - you\'ll barely notice the difference.',
        'Consider automating investments after building your emergency fund.'
      ]
    },
    {
      title: 'Debt Management',
      icon: <CreditCard className="h-5 w-5 text-coral-600" />,
      tips: [
        'Pay off high-interest debt first (usually credit cards) using the avalanche method.',
        'For psychological wins, try the snowball method - paying off smallest debts first.',
        'Always pay more than the minimum payment on credit cards.',
        'Consider consolidating high-interest debts if you can qualify for a lower rate.'
      ]
    },
    {
      title: 'Expense Reduction',
      icon: <PercentCircle className="h-5 w-5 text-gold-500" />,
      tips: [
        'Review subscriptions quarterly and cancel those you rarely use.',
        'Plan meals and grocery lists to reduce food waste and impulse purchases.',
        'Use the 24-hour rule for non-essential purchases - wait a day before buying.',
        'Consider buying second-hand for clothing, furniture, and electronics.'
      ]
    },
    {
      title: 'Income Growth',
      icon: <TrendingUp className="h-5 w-5 text-lavender-600" />,
      tips: [
        'Develop in-demand skills through online courses or certifications.',
        'Consider a side hustle aligned with your interests or skills.',
        'Negotiate your salary when starting a new job or during performance reviews.',
        'Look for passive income opportunities like dividend stocks or content creation.'
      ]
    },
    {
      title: 'Financial Protection',
      icon: <ShieldCheck className="h-5 w-5 text-slate-600" />,
      tips: [
        'Get appropriate insurance coverage (health, renter\'s/homeowner\'s, auto).',
        'Regularly check your credit report for errors or signs of identity theft.',
        'Create a simple will and designate beneficiaries for your accounts.',
        'Use strong, unique passwords for financial accounts and enable two-factor authentication.'
      ]
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const tipVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-full mb-4">
          <Lightbulb className="h-6 w-6 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Financial Tips & Advice</h1>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Smart financial habits can help you build wealth over time. Here are some expert tips to improve your financial health.
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {tipCategories.map((category, index) => (
          <motion.div key={index} className="card" variants={tipVariants}>
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h2 className="text-xl font-semibold">{category.title}</h2>
            </div>
            <ul className="space-y-3">
              {category.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="flex items-start gap-2">
                  <span className="inline-block bg-primary-100 text-primary-600 p-1 rounded-full mt-0.5">
                    <Blinds className="h-3 w-3" />
                  </span>
                  <span className="text-slate-700">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="card bg-gradient-to-r from-primary-50 to-mint-50 border border-primary-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <BellRing className="h-6 w-6 text-primary-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Pro Tip for Young Adults</h3>
            <p className="text-slate-700 mb-3">
              The most powerful financial asset you have is <span className="font-semibold">time</span>. Starting to save and invest early, even in small amounts, can lead to significant wealth over time due to compound interest.
            </p>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-slate-600 mb-2">For example, if you invest $100 monthly starting at age 20:</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-bold text-primary-700">$48,000</p>
                  <p className="text-xs text-slate-500">Total invested by age 60</p>
                </div>
                <div>
                  <p className="font-bold text-mint-600">$318,000+</p>
                  <p className="text-xs text-slate-500">Potential value at 7% return</p>
                </div>
                <div>
                  <p className="font-bold text-gold-600">$270,000+</p>
                  <p className="text-xs text-slate-500">Growth from compound interest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}