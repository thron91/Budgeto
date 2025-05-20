import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Welcome from './pages/Welcome';
import BudgetWizard from './pages/BudgetWizard';
import Dashboard from './pages/Dashboard';
import Tips from './pages/Tips';
import Layout from './components/layout/Layout';
import { useBudget } from './contexts/BudgetContext';

function App() {
  const location = useLocation();
  const { loadFromStorage } = useBudget();
  
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome />} />
          <Route path="/create" element={<BudgetWizard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;