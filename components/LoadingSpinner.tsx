
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string; // Allow additional classes
  color?: string; // e.g., 'text-primary'
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '', color = 'text-primary dark:text-primary-light' }) => {
  let spinnerSizeClass = '';
  switch (size) {
    case 'sm':
      spinnerSizeClass = 'w-5 h-5 border-2';
      break;
    case 'lg':
      spinnerSizeClass = 'w-12 h-12 border-4';
      break;
    case 'md':
    default:
      spinnerSizeClass = 'w-8 h-8 border-4';
      break;
  }

  return (
    <div className={`inline-block ${spinnerSizeClass} ${color} border-solid border-t-transparent rounded-full animate-spin ${className}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};
