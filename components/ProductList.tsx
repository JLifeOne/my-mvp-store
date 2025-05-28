
import React, { useState, useMemo } from 'react';
import { Product, Currency, ExchangeRates } from '../types';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from './LoadingSpinner';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product, quantity?: number) => void; // Allow quantity
  selectedCurrency: Currency;
  exchangeRates: ExchangeRates;
  onViewProductDetails: (productId: string) => void; // New prop
}

const ITEMS_PER_PAGE = 8;

export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  isLoading, 
  onAddToCart, 
  selectedCurrency, 
  exchangeRates,
  onViewProductDetails 
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const visibleProducts = useMemo(() => {
    return products.slice(0, visibleCount);
  }, [products, visibleCount]);

  const loadMoreProducts = () => {
    setVisibleCount(prevCount => Math.min(prevCount + ITEMS_PER_PAGE, products.length));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <img src="https://picsum.photos/seed/no-product/300/200" alt="No products found" className="mx-auto mb-4 rounded-lg opacity-70" />
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No Products Found</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            selectedCurrency={selectedCurrency}
            exchangeRates={exchangeRates}
            onViewProductDetails={onViewProductDetails} // Pass down
          />
        ))}
      </div>
      {visibleCount < products.length && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMoreProducts}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};