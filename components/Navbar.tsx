
import React, { useState } from 'react';
import { NAVIGATION_LINKS, APP_NAME } from '../constants';
import { View, NavigationLink, Currency, User } from '../types'; // Added User
import { DarkModeToggle } from './DarkModeToggle';
import { CartIcon } from './icons/CartIcon';
import { UserIcon } from './icons/UserIcon';
import { Logo } from './icons/Logo';
import { SearchIcon } from './icons/SearchIcon';
import { CurrencySelector } from './CurrencySelector';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cartItemCount: number;
  selectedCurrency: Currency;
  availableCurrencies: Currency[];
  onSetSelectedCurrency: (currency: Currency) => void;
  currentUser: User | null; // New prop
  onLogout: () => void;      // New prop
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  isDarkMode, 
  toggleDarkMode, 
  cartItemCount,
  selectedCurrency,
  availableCurrencies,
  onSetSelectedCurrency,
  currentUser,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search submitted:', searchQuery);
      // Here you would typically navigate to a search results view or filter products
      // For now, just clearing the query.
      // Example: onNavigate(View.PRODUCTS, { searchTerm: searchQuery });
      setSearchQuery(''); 
    }
  };

  const navIconBaseStyle = `p-1 sm:p-1.5 rounded-full text-gray-200 dark:text-slate-300 hover:text-white dark:hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-sky-100 dark:focus:ring-offset-slate-800 transition-colors`;
  const navTextButtonBaseStyle = `px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-sky-100 dark:focus:ring-offset-slate-800 transition-colors duration-150 text-sky-50 dark:text-slate-300 hover:text-accent dark:hover:text-pink-400 font-medium text-sm`;


  return (
    <div className="sticky top-0 z-50 pt-2 sm:pt-3 pb-2 sm:pb-3 print:hidden"> 
      <nav
        className="relative animate-fade-in bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 dark:from-slate-800 dark:via-slate-900 dark:to-black backdrop-blur-md rounded-xl container mx-auto px-6 sm:px-8 py-2.5
                   shadow-[0_-8px_15px_-3px_rgba(168,85,247,0.5),_0_8px_15px_-3px_rgba(168,85,247,0.5)]
                   dark:shadow-[0_-8px_15px_-3px_rgba(147,51,234,0.5),_0_8px_15px_-3px_rgba(147,51,234,0.5)]
                   hover:shadow-[0_-12px_25px_-5px_rgba(192,132,252,0.6),_0_12px_25px_-5px_rgba(192,132,252,0.6)]
                   dark:hover:shadow-[0_-12px_25px_-5px_rgba(168,85,247,0.6),_0_12px_25px_-5px_rgba(168,85,247,0.6)]
                   transition-all duration-300 ease-in-out hover:scale-[1.015] h-16" // Reduced height
      >
        <div className="relative flex items-center justify-between h-full z-10">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <button
              onClick={() => onNavigate(View.HOME)}
              className="flex items-center space-x-1.5 sm:space-x-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-sky-100 dark:focus:ring-offset-slate-800 rounded-md p-0.5 -ml-0.5"
              aria-label="Go to Homepage"
            >
              <Logo className="w-7 h-7 sm:w-8 sm:h-8 text-white dark:text-sky-300 group-hover:opacity-80 transition-opacity" />
              <span className="text-base sm:text-lg font-semibold text-white dark:text-slate-100 hidden xs:inline group-hover:opacity-80 transition-opacity">
                {APP_NAME}
              </span>
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center px-2 sm:px-4 group">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-32 xs:w-40 sm:w-44 md:w-52 
                         max-w-xs lg:max-w-sm xl:max-w-md
                         transition-all duration-300 ease-in-out 
                         md:group-hover:w-1/2 md:group-focus-within:w-1/2 mt-1" // Changed mt-3 to mt-1
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-slate-200/90 dark:text-slate-400/90 group-focus-within:text-sky-700 dark:group-focus-within:text-sky-300 transition-colors duration-300" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search products"
                className="w-full h-9 pl-10 pr-4 py-2 rounded-full text-sm
                           bg-white/25 dark:bg-slate-800/40
                           text-white dark:text-slate-100
                           placeholder:text-slate-200/80 dark:placeholder:text-slate-400/80
                           border border-transparent
                           focus:bg-white/90 dark:focus:bg-slate-700/70
                           focus:text-slate-900 dark:focus:text-slate-50
                           focus:placeholder:text-slate-500 dark:focus:placeholder:text-slate-300
                           focus:outline-none focus:ring-2 focus:ring-white/70 dark:focus:ring-sky-400/70 focus:ring-offset-2 focus:ring-offset-sky-600 dark:focus:ring-offset-black
                           transition-all duration-300 ease-in-out"
              />
            </form>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0"> {/* Reduced space-x */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5 text-sm"> {/* Reduced space-x */}
              {NAVIGATION_LINKS.map((link: NavigationLink) => (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.path)}
                  className={`px-2.5 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-sky-100 dark:focus:ring-offset-slate-800 transition-colors duration-150 text-sm
                    ${currentView === link.path
                      ? 'text-white dark:text-sky-300 font-semibold underline decoration-2 underline-offset-4' 
                      : 'text-sky-50 dark:text-slate-300 hover:text-accent dark:hover:text-pink-400 font-medium'
                    }`}
                  aria-current={currentView === link.path ? 'page' : undefined}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5"> {/* Reduced space-x */}
              {currentUser ? (
                <button onClick={onLogout} className={navTextButtonBaseStyle}>
                  Logout
                </button>
              ) : (
                <>
                  <button onClick={() => onNavigate(View.LOGIN)} className={navTextButtonBaseStyle}>
                    Login
                  </button>
                  <button onClick={() => onNavigate(View.SIGNUP)} className={navTextButtonBaseStyle}>
                    Sign Up
                  </button>
                </>
              )}
            </div>
            
            <CurrencySelector 
              selectedCurrency={selectedCurrency}
              availableCurrencies={availableCurrencies}
              onSetSelectedCurrency={onSetSelectedCurrency}
            />
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <button
              onClick={() => onNavigate(View.CART)}
              className={`${navIconBaseStyle} relative`}
              aria-label={`View Cart, ${cartItemCount} items`}
            >
              <CartIcon className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Reduced icon size */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full"> {/* Adjusted badge size/font */}
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate(currentUser ? View.ACCOUNT : View.LOGIN)}
              className={navIconBaseStyle}
              aria-label={currentUser ? "View Account" : "Login or Sign Up"}
            >
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Reduced icon size */}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${navIconBaseStyle} md:hidden`}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Reduced icon size */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className={`md:hidden border-t ${isDarkMode ? 'border-slate-700/50' : 'border-sky-300/70'} mt-2 pt-2 pb-1.5`}> {/* Reduced mt/pt/pb */}
            <div className="space-y-1">
              {NAVIGATION_LINKS.map((link: NavigationLink) => (
                <button
                  key={`mobile-${link.name}`}
                  onClick={() => {
                    onNavigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-sky-100 dark:focus:ring-offset-slate-800
                    ${currentView === link.path
                      ? 'text-white dark:text-sky-300 font-semibold bg-blue-600/50 dark:bg-slate-700/50' 
                      : 'text-sky-100 dark:text-slate-300 hover:text-accent dark:hover:text-pink-400 hover:bg-blue-500/30 dark:hover:bg-slate-700/50 font-medium'
                    }`} // Reduced py, text-sm
                  aria-current={currentView === link.path ? 'page' : undefined}
                >
                  {link.name}
                </button>
              ))}
              <div className="border-t border-sky-300/70 dark:border-slate-700/50 pt-1.5 mt-1.5"> {/* Reduced pt/mt */}
                {currentUser ? (
                   <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-sky-100 dark:text-slate-300 hover:text-accent dark:hover:text-pink-400 hover:bg-blue-500/30 dark:hover:bg-slate-700/50 font-medium" // Reduced py, text-sm
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => { onNavigate(View.LOGIN); setMobileMenuOpen(false); }}
                      className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-sky-100 dark:text-slate-300 hover:text-accent dark:hover:text-pink-400 hover:bg-blue-500/30 dark:hover:bg-slate-700/50 font-medium" // Reduced py, text-sm
                    >
                      Login
                    </button>
                     <button
                      onClick={() => { onNavigate(View.SIGNUP); setMobileMenuOpen(false); }}
                      className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-sky-100 dark:text-slate-300 hover:text-accent dark:hover:text-pink-400 hover:bg-blue-500/30 dark:hover:bg-slate-700/50 font-medium" // Reduced py, text-sm
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
