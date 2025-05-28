
import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
    // className="fill-current text-primary dark:text-primary-light" // Example colors, can be overridden by props
  >
    <g className="transform group-hover:scale-110 transition-transform duration-200 ease-in-out">
      {/* Shopping Bag Shape */}
      <path 
        d="M15 30 H85 L80 85 H20 Z" 
        className="fill-current text-sky-500 dark:text-sky-400"
      />
      {/* Handle */}
      <path 
        d="M35 30 Q50 10 65 30" 
        strokeWidth="8" 
        strokeLinecap="round"
        className="stroke-current text-slate-700 dark:text-slate-300"
        fill="none"
      />
      {/* Star or accent */}
      <polygon 
        points="50,38 55,48 65,48 58,55 60,65 50,60 40,65 42,55 35,48 45,48" 
        className="fill-current text-yellow-400 dark:text-yellow-300" 
      />
    </g>
  </svg>
);
