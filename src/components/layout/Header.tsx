import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiggyBank, LayoutDashboard, HelpCircle, Menu, X, Settings } from 'lucide-react';
import { useBudget } from '../../contexts/BudgetContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { resetBudget } = useBudget();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your budget? This will delete all your data.')) {
      resetBudget();
      localStorage.removeItem('budgeto-data');
    }
    closeMenu();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <PiggyBank className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-primary-600">Budgeto</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/dashboard'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-slate-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/create" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/create'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-slate-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <PiggyBank className="h-4 w-4" />
              <span>Budget</span>
            </Link>
            <Link 
              to="/tips" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/tips'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-slate-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Tips</span>
            </Link>
            <button 
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-coral-600 hover:bg-coral-50"
            >
              <Settings className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/dashboard'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-slate-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/create'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-slate-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={closeMenu}
            >
              Budget
            </Link>
            <Link
              to="/tips"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/tips'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-slate-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={closeMenu}
            >
              Tips
            </Link>
            <button
              onClick={handleReset}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-coral-600 hover:bg-coral-50"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </header>
  );
}