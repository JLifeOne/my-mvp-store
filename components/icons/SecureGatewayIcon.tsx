import React from 'react';

export const SecureGatewayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" {...props} role="img" aria-labelledby="secureGatewayTitle">
    <title id="secureGatewayTitle">Secure Payment Gateway</title>
    <rect width="100" height="60" rx="8" fill="#007AFF"/>
    {/* White symbol - approximation of the user's image */}
    <g stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Horizontal lines */}
      <line x1="25" y1="20" x2="75" y2="20" />
      <line x1="25" y1="40" x2="75" y2="40" />
      {/* Vertical connectors */}
      <line x1="40" y1="20" x2="40" y2="40" />
      <line x1="60" y1="20" x2="60" y2="40" />
      {/* Small horizontal extensions from vertical lines */}
      <line x1="35" y1="25" x2="45" y2="25" />
      <line x1="35" y1="35" x2="45" y2="35" />
      <line x1="55" y1="25" x2="65" y2="25" />
      <line x1="55" y1="35" x2="65" y2="35" />
    </g>
  </svg>
);
