
import React from 'react';

interface HeroSectionProps {
  onShopNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow }) => {
  return (
    <div className="relative bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 dark:from-slate-800 dark:via-slate-900 dark:to-black text-white container mx-auto px-4 py-20 sm:py-32 rounded-xl shadow-2xl overflow-hidden">
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        {/* Example: SVG pattern or subtle image */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroPattern" patternUnits="userSpaceOnUse" width="50" height="50" >
              <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="currentColor" fillOpacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroPattern)" />
        </svg>
      </div>
      
      <div className="relative text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-sky-200 dark:text-sky-300">My MVP Store</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-sky-100 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
          Discover amazing products, curated just for you. Experience the future of online shopping with AI-powered recommendations.
        </p>
        <button
          onClick={onShopNow}
          className="bg-white text-blue-600 dark:bg-sky-400 dark:text-slate-900 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg text-lg sm:text-xl shadow-lg hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-500"
        >
          Shop Now
        </button>
      </div>
      {/* Decorative elements (optional) */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-300 dark:bg-sky-700 rounded-full opacity-30 animate-pulse-fast"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-400 dark:bg-indigo-800 rounded-full opacity-30 animate-spin-slow"></div>
    </div>
  );
};
