import { ReactNode } from 'react';
import Header from './Header';
import { useBudget } from '../../contexts/BudgetContext';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { hasCompletedSetup } = useBudget();
  const location = useLocation();
  
  // Don't show the header on the welcome screen or during setup
  const showHeader = hasCompletedSetup || location.pathname !== '/';
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {showHeader && <Header />}
      <main className="flex-1 flex flex-col px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Budgeto. Your budget buddy.</p>
      </footer>
    </div>
  );
}