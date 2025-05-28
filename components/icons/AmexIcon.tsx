
import React from 'react';
// This is a placeholder simple SVG. For actual Amex logo, a more accurate SVG would be used.
export const AmexIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="32" height="24" rx="2" fill="#006FCF"/>
    <rect x="3" y="10" width="26" height="4" fill="#FFF"/>
    <rect x="12" y="5" width="8" height="14" fill="#FFF"/>
    <rect x="14" y="3" width="4" height="18" fill="#006FCF"/>
    <rect x="5" y="12" width="22" height="2" fill="#006FCF"/>
  </svg>
);
