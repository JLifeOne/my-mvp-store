import React from 'react';

export const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5} // Adjusted strokeWidth for this icon
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M17.25 9.75c0 3.446-3.034 6.25-6.75 6.25S3.75 13.196 3.75 9.75c0-2.855 2.15-5.418 5.188-6.169.216-.053.446.028.593.2.148.172.163.42.03.622C8.923 5.075 8.25 5.942 8.25 6.75c0 1.553 1.679 3 3.75 3s3.75-1.447 3.75-3c0-.808-.673-1.675-1.31-2.347-.132-.198-.116-.446.03-.62.148-.17.377-.25.594-.2C15.1 4.33 17.25 6.896 17.25 9.75zM12 19.5a4.5 4.5 0 004.5-4.5H7.5a4.5 4.5 0 004.5 4.5z"
      fill="currentColor" 
    />
  </svg>
);