import React from 'react';

export const MastercardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" {...props} role="img" aria-labelledby="mastercardTitle">
    <title id="mastercardTitle">Mastercard</title>
    <defs>
      <linearGradient id="mastercardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#EB001B', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#F79E1B', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    {/* Applying white background to match other icons' container style, if icon itself doesn't have one */}
    <rect width="38" height="24" rx="3" fill="white"/>
    <circle cx="14" cy="12" r="7" fill="#EB001B"/>
    <circle cx="24" cy="12" r="7" fill="#F79E1B"/>
    <path d="M20.9,12a7,7,0,0,1-6.9,7,7,7,0,0,0,0-14,7,7,0,0,1,6.9,7Z" fill="#FF5F00"/>
  </svg>
);
