
import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  const iconColor = isDarkMode ? "text-slate-300" : "text-gray-200"; 
  const hoverColor = isDarkMode ? "hover:text-sky-300" : "hover:text-white";
  const focusRingOffset = isDarkMode ? "dark:focus:ring-offset-slate-800" : "focus:ring-offset-sky-100";

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-1 sm:p-1.5 rounded-full ${iconColor} ${hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${focusRingOffset} transition-colors`} // Reduced padding
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" /> // Reduced icon size
      ) : (
        <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" /> // Reduced icon size
      )}
    </button>
  );
};
