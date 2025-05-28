
import React, { useState, useCallback } from 'react';
import { ProductCategory, AiFilterCriteria, ManualFilters } from '../types';
import { geminiService } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { MAX_PRICE_RANGE, PRICE_STEP } from '../constants';

interface SidebarProps {
  categories: ProductCategory[];
  onAiFilterApply: (criteria: AiFilterCriteria) => void;
  manualFilters: ManualFilters;
  onManualFilterChange: (filters: Partial<ManualFilters>) => void;
  onClearFilters: () => void;
  isLoadingAi: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  onAiFilterApply,
  manualFilters,
  onManualFilterChange,
  onClearFilters,
  isLoadingAi: isParentLoading,
}) => {
  const [aiQuery, setAiQuery] = useState<string>('');
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAiSearch = useCallback(async () => {
    if (!aiQuery.trim()) {
      setAiError("Please enter a search query.");
      return;
    }
    setIsAiProcessing(true);
    setAiError(null);
    try {
      const criteria = await geminiService.getFiltersFromQuery(aiQuery, categories);
      onAiFilterApply(criteria);
    } catch (error) {
      console.error("AI Filter Error:", error);
      setAiError(error instanceof Error ? error.message : "Failed to get AI filters. Please try again.");
    } finally {
      setIsAiProcessing(false);
    }
  }, [aiQuery, categories, onAiFilterApply]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onManualFilterChange({ category: e.target.value as ProductCategory | 'all' });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), manualFilters.priceRange[1] - PRICE_STEP);
    onManualFilterChange({ priceRange: [value, manualFilters.priceRange[1]] });
  };
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), manualFilters.priceRange[0] + PRICE_STEP);
    onManualFilterChange({ priceRange: [manualFilters.priceRange[0], value] });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onManualFilterChange({ minRating: Number(e.target.value) });
  };


  return (
    <aside className="w-full lg:w-72 xl:w-80 lg:sticky lg:top-24 self-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-100">Filter Products</h3>

      {/* AI Powered Search */}
      <div className="mb-6">
        <label htmlFor="ai-search" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Smart Search (AI Powered)
        </label>
        <div className="flex flex-col space-y-2">
          <textarea
            id="ai-search"
            rows={3}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-slate-100"
            placeholder="e.g., 'red t-shirts under $50' or 'electronics with 4+ stars'"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            disabled={isAiProcessing || isParentLoading}
          />
          <button
            onClick={handleAiSearch}
            disabled={isAiProcessing || isParentLoading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center disabled:opacity-50"
          >
            {(isAiProcessing || isParentLoading) && <LoadingSpinner size="sm" className="mr-2" />}
            {isAiProcessing ? 'Thinking...' : 'Filter with AI'}
          </button>
        </div>
        {aiError && <p className="text-red-500 text-xs mt-1">{aiError}</p>}
      </div>
      
      <hr className="my-6 border-slate-200 dark:border-slate-700" />

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Category
        </label>
        <select
          id="category-filter"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-slate-100"
          value={manualFilters.category}
          onChange={handleCategoryChange}
          disabled={isParentLoading}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Price Range
        </label>
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>${manualFilters.priceRange[0]}</span>
                <span>${manualFilters.priceRange[1]}</span>
            </div>
            <input
                type="range"
                min="0"
                max={MAX_PRICE_RANGE}
                step={PRICE_STEP}
                value={manualFilters.priceRange[0]}
                onChange={handleMinPriceChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
                disabled={isParentLoading}
            />
            <input
                type="range"
                min="0"
                max={MAX_PRICE_RANGE}
                step={PRICE_STEP}
                value={manualFilters.priceRange[1]}
                onChange={handleMaxPriceChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
                disabled={isParentLoading}
            />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label htmlFor="rating-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Minimum Rating
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            id="rating-filter"
            min="0"
            max="5"
            step="0.5"
            value={manualFilters.minRating}
            onChange={handleRatingChange}
            className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
            disabled={isParentLoading}
          />
          <span className="text-sm text-slate-600 dark:text-slate-300 w-8 text-right">{manualFilters.minRating.toFixed(1)}★</span>
        </div>
      </div>
      
      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        disabled={isParentLoading}
        className="w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-100 font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
      >
        Clear All Filters
      </button>
    </aside>
  );
};
