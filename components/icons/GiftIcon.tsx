
import React from 'react';

export const GiftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16.5 9.75V7.5A2.25 2.25 0 0 0 14.25 5.25h-4.5A2.25 2.25 0 0 0 7.5 7.5v2.25m9 0H7.5m9 0c0 1.036-.293 2.002-.813 2.826M7.5 9.75c0 1.036.293 2.002.813 2.826m0 0V15a2.25 2.25 0 0 0 2.25 2.25h3A2.25 2.25 0 0 0 15.75 15v-2.424m-6.937 0c.041.02.082.042.124.063" 
    /> 
    {/* Simplified gift icon parts based on Heroicons gift */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 19.5v-8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v17.25m0 0H5.25m6.75 0H18.75M12 4.5c0 2.485-2.015 4.5-4.5 4.5V4.5m4.5 0c2.485 0 4.5 2.015 4.5 4.5V4.5" />
  </svg>
);
// This is a more complex/stylized gift icon. If a simpler one is preferred, adjust.
// A very simple one:
// export const GiftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 19.5v-8.25m18 0A2.25 2.25 0 0 0 18.75 9H5.25A2.25 2.25 0 0 0 3 11.25m18 0v-7.5A2.25 2.25 0 0 0 18.75 1.5H5.25A2.25 2.25 0 0 0 3 3.75v7.5m15-7.5h-12" />
//   </svg>
// );
