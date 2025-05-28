import React from 'react';

export const PayPalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 70 44" xmlns="http://www.w3.org/2000/svg" {...props} role="img" aria-labelledby="paypalTitle">
    <title id="paypalTitle">PayPal</title>
    <rect width="70" height="44" rx="4" fill="white"/>
    <g transform="translate(15, 8)"> {/* Center the logo within the 70x44 white box */}
      <path fill="#003087" d="M23.684 5.18H15.53l-3.807 24.13h5.604l.982-6.247h4.01c6.312 0 9.293-3.302 10.275-9.012.81-4.804-1.27-7.87-4.856-7.87zM24.018 18.14c-.52 3.28-2.694 4.01-5.26 4.01h-2.66l1.624-10.353h2.862c2.886 0 3.753 1.254 3.434 6.343z"/>
      <path fill="#009cde" d="M39.96 10.082c-.702-1.05-1.78-1.625-3.273-1.625h-5.57l.765 4.862c2.958-.607 4.616.234 5.16 2.934.412 2.016-.94 3.21-2.787 3.21h-2.66l-3.807 24.13h5.604l.722-4.586.15-.97c.553-3.497 2.822-4.22 5.62-4.22h.982c3.453 0 5.785-1.984 6.443-5.97.702-4.22-1.027-7.106-4.554-7.76zM36.66 18.373c-.428-2.33-2.032-3.21-4.128-3.21h-1.69l.862 5.478c.52.105 1.04.15 1.592.15 1.724 0 2.586-.78 2.364-2.418z"/>
    </g>
  </svg>
);
