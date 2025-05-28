
import React, { useState, useEffect } from 'react';
import { Product, Currency, ExchangeRates } from '../types';
import { CartIcon } from './icons/CartIcon';
import { StarIcon } from './icons/StarIcon';
import { convertAndFormatPrice } from '../utils/formatting';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void; // Allow quantity
  selectedCurrency: Currency;
  exchangeRates: ExchangeRates;
  onViewProductDetails: (productId: string) => void; // New prop
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className="w-4 h-4 text-yellow-400" filled />
      ))}
      {halfStar && <StarIcon key="half" className="w-4 h-4 text-yellow-400" half />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
      ))}
      <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">({rating.toFixed(1)})</span>
    </div>
  );
};


export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, selectedCurrency, exchangeRates, onViewProductDetails }) => {
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(product.image);

  useEffect(() => {
    setCurrentImageSrc(product.image); 
  }, [product.image]);

  const handleImageError = () => {
    const fallbackSrc = `https://placehold.co/600x400/EEE/31343C?text=${encodeURIComponent(product.name)}`;
    setCurrentImageSrc(fallbackSrc);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl group">
      <button 
        onClick={() => onViewProductDetails(product.id)}
        className="relative aspect-square overflow-hidden block w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-t-xl"
        aria-label={`View details for ${product.name}`}
      >
        <img 
          src={currentImageSrc} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
          {product.category}
        </div>
      </button>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <button 
            onClick={() => onViewProductDetails(product.id)} 
            className="text-left focus:outline-none"
            aria-label={`View details for ${product.name}`}
        >
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-1 truncate hover:text-primary dark:hover:text-primary-light transition-colors" title={product.name}>
            {product.name}
            </h3>
        </button>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {product.description.length > 60 ? `${product.description.substring(0, 60)}...` : product.description}
        </p>
        
        <div className="mb-3">
          <RatingStars rating={product.rating} />
        </div>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl sm:text-2xl font-bold text-primary dark:text-primary-light">
            {convertAndFormatPrice(product.price, selectedCurrency, exchangeRates)}
          </p>
          <button
            onClick={() => onAddToCart(product)} // Defaults to quantity 1
            className="bg-primary-light hover:bg-primary text-white dark:bg-primary dark:hover:bg-primary-dark font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-150 ease-in-out flex items-center text-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <CartIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};