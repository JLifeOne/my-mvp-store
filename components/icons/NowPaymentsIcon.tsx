import React from 'react';

export const NowPaymentsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" {...props} role="img" aria-labelledby="nowpaymentsTitle">
    <title id="nowpaymentsTitle">NOWPayments</title>
    <rect width="100" height="60" rx="8" fill="white"/>
    {/* Scaled and positioned elements. This is an approximation based on the image. */}
    <g transform="translate(15, 10) scale(1.5)">
      {/* Yellow 'N' like shape */}
      <path d="M10 5 L10 25 L20 15 L20 35 L30 35 L30 15 L20 25 L20 5 L10 5 Z" fill="#FFD100"/>
      {/* Blue 'A' and 'W' like shapes */}
      <path d="M18 15 L22 15 L20 20 Z" fill="#007AFF" /> 
      <path d="M28 20 L32 20 L30 25 Z M28 30 L32 30 L30 25 Z" fill="#007AFF" />
      <path d="M35 5 L35 35 L40 35 L40 20 L45 35 L50 35 L50 5 L45 5 L45 15 L40 5 L35 5 Z" fill="#007AFF"/>
    </g>
    {/* Text "NOW" (optional, if the logo has it clearly) - simplified */}
    {/* <text x="20" y="45" fontFamily="Arial, sans-serif" fontSize="10" fill="#007AFF" fontWeight="bold">NOW</text> */}
  </svg>
);
