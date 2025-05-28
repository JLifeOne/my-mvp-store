
import React, { useState, useEffect, useRef } from 'react';
import { Currency } from '../types'; // Import Currency type

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  availableCurrencies: Currency[];
  onSetSelectedCurrency: (currency: Currency) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  availableCurrencies,
  onSetSelectedCurrency
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const buttonBaseClasses = `
    flex items-center space-x-1 text-sm px-2 py-1 sm:py-1.5 rounded-md /* Reduced py */
    text-sky-50 dark:text-slate-300 
    hover:bg-sky-500/30 dark:hover:bg-slate-700/70 
    focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:ring-offset-2 focus:ring-offset-sky-100 dark:focus:ring-offset-slate-800
    transition-colors duration-150
  `;

  const dropdownItemBaseClasses = `
    flex items-center justify-center w-full px-3 sm:px-4 py-2 text-left
    text-slate-700 dark:text-slate-200 
    hover:bg-sky-100 dark:hover:bg-slate-600
    focus:outline-none focus:bg-sky-100 dark:focus:bg-slate-600
  `;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        id="currency-selector-button"
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        aria-label={`Select currency, current currency is ${selectedCurrency.name}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={buttonBaseClasses}
      >
        
        <span className="hidden xs:inline">{selectedCurrency.code}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-28 origin-top-right bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md shadow-lg z-50
                     transition-all ease-out duration-100 opacity-100 scale-100 data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:ease-in data-[closed]:duration-75"
          data-closed={!isDropdownOpen ? "" : undefined}
          role="listbox"
          aria-orientation="vertical"
          aria-labelledby="currency-selector-button"
        >
          <ul className="text-sm py-1"> 
            {availableCurrencies.map((currency) => (
              <li key={currency.code} role="option" aria-selected={selectedCurrency.code === currency.code}>
                <button
                  type="button"
                  onClick={() => {
                    onSetSelectedCurrency(currency);
                    setIsDropdownOpen(false);
                  }}
                  className={`${dropdownItemBaseClasses} ${selectedCurrency.code === currency.code ? 'font-semibold bg-sky-50 dark:bg-slate-500' : ''}`}
                  aria-label={`Select ${currency.name}`}
                >
                  <span>{currency.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
