
import React, { useState, useEffect, useMemo } from 'react';
import { Product, Currency, ExchangeRates, View, ProductCategory } from '../../types';
import { convertAndFormatPrice } from '../../utils/formatting';
import { StarIcon } from '../icons/StarIcon';
import { CartIcon } from '../icons/CartIcon';
import { ProductCard } from '../ProductCard';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { TruckIcon } from '../icons/TruckIcon';
import { ArrowUturnLeftIcon } from '../icons/ArrowUturnLeftIcon';
import { CheckBadgeIcon } from '../icons/CheckBadgeIcon';
import { BoltIcon } from '../icons/BoltIcon'; // For Buy Now button

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void; // New prop
  allProducts: Product[];
  selectedCurrency: Currency;
  exchangeRates: ExchangeRates;
  onNavigate: (view: View, data?: any) => void;
}

const RatingStarsDisplay: React.FC<{ rating: number, starSize?: string }> = ({ rating, starSize = "w-5 h-5" }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className={`${starSize} text-yellow-400`} filled />
        ))}
        {halfStar && <StarIcon key="half" className={`${starSize} text-yellow-400`} half />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className={`${starSize} text-yellow-400`} />
        ))}
      </div>
    );
  };

const DEFAULT_PLACEHOLDER_IMAGE = (productName: string, size: string = "800x800") => `https://placehold.co/${size}/EEE/31343C?text=${encodeURIComponent(productName.substring(0,15))}`;

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  allProducts,
  selectedCurrency,
  exchangeRates,
  onNavigate,
}) => {
  const imageGallery = useMemo(() => {
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    if (product.image) {
      return [product.image];
    }
    return [DEFAULT_PLACEHOLDER_IMAGE(product.name)];
  }, [product.galleryImages, product.image, product.name]);

  const [selectedImage, setSelectedImage] = useState<string>(imageGallery[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const pageContentPadding = "px-6 sm:px-10 md:px-16 lg:px-20";

  useEffect(() => {
    const newGallery = (product.galleryImages && product.galleryImages.length > 0) 
      ? product.galleryImages 
      : (product.image ? [product.image] : [DEFAULT_PLACEHOLDER_IMAGE(product.name)]);
    setSelectedImage(newGallery[0]);
    setQuantity(1);
  }, [product]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (product.stock > 0 && val > product.stock) val = product.stock;
    else if (product.stock === 0) val = 0; 
    setQuantity(val);
  };

  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4); 
  }, [allProducts, product.category, product.id]);

  const trustBadges = [
    { icon: <ShieldCheckIcon className="w-6 h-6 text-green-500" />, text: "Secure Checkout" },
    { icon: <TruckIcon className="w-6 h-6 text-blue-500" />, text: "Fast Shipping" },
    { icon: <ArrowUturnLeftIcon className="w-6 h-6 text-orange-500" />, text: "Easy Returns" },
    { icon: <CheckBadgeIcon className="w-6 h-6 text-purple-500" />, text: "Quality Guaranteed" },
  ];

  return (
    <div className={`container mx-auto ${pageContentPadding} py-12`}>
      <nav className="text-sm mb-6 text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex flex-wrap">
          <li className="flex items-center">
            <button onClick={() => onNavigate(View.HOME)} className="hover:text-primary dark:hover:text-primary-light">Home</button>
            <ChevronRightIcon className="w-4 h-4 mx-1 shrink-0" />
          </li>
          <li className="flex items-center">
            <button onClick={() => onNavigate(View.PRODUCTS)} className="hover:text-primary dark:hover:text-primary-light">Products</button>
            <ChevronRightIcon className="w-4 h-4 mx-1 shrink-0" />
          </li>
          <li className="flex items-center">
            <button 
                onClick={() => onNavigate(View.PRODUCTS)} 
                className="hover:text-primary dark:hover:text-primary-light"
            >
                {product.category}
            </button>
            <ChevronRightIcon className="w-4 h-4 mx-1 shrink-0" />
          </li>
          <li className="truncate max-w-[100px] xs:max-w-[150px] sm:max-w-none" aria-current="page">
            <span className="font-medium text-slate-700 dark:text-slate-200">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="animate-fade-in">
          <div className="w-3/4 mx-auto aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl mb-6 transition-all duration-300 ease-out hover:shadow-2xl">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => (e.currentTarget.src = DEFAULT_PLACEHOLDER_IMAGE(product.name))}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 w-3/4 mx-auto">
            {imageGallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden hover:opacity-80 transition-opacity
                            shadow-md hover:shadow-lg dark:shadow-black/20 dark:hover:shadow-black/30
                            ${selectedImage === img ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : ''}
                            focus:outline-none focus:ring-2 focus:ring-primary`}
                aria-label={`View image ${index + 1}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" 
                  onError={(e) => (e.currentTarget.src = DEFAULT_PLACEHOLDER_IMAGE(product.name, "200x200"))}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">{product.name}</h1>
          <div className="flex items-center mb-4">
            <RatingStarsDisplay rating={product.rating} />
            <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">({product.rating.toFixed(1)} stars, {Math.floor(product.stock * 0.8 + 5)} reviews)</span> {/* Simulated review count */}
          </div>
          <p className="text-3xl font-bold text-primary dark:text-primary-light mb-4">
            {convertAndFormatPrice(product.price, selectedCurrency, exchangeRates)}
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            {product.description.substring(0, 150)}{product.description.length > 150 && '...'}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Available Colors:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <span key={color} className="px-3 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded-full text-slate-600 dark:text-slate-300">{color}</span>
                ))}
              </div>
            </div>
          )}

          <p className={`text-sm font-semibold mb-6 ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {product.stock > 0 && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <label htmlFor="quantity" className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 p-2 border border-slate-300 dark:border-slate-600 rounded-md text-center dark:bg-slate-700 dark:text-slate-100 focus:ring-primary focus:border-primary"
                  aria-label="Product quantity"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="w-full sm:w-auto flex-grow bg-primary-light hover:bg-primary text-white dark:bg-primary dark:hover:bg-primary-dark font-semibold py-3 px-6 rounded-lg transition duration-150 ease-in-out flex items-center justify-center text-base shadow-md hover:shadow-lg"
                  disabled={product.stock === 0 || quantity === 0}
                  aria-label="Add to cart"
                >
                  <CartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => onBuyNow(product, quantity)}
                  className="w-full sm:w-auto flex-grow bg-accent hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 ease-in-out flex items-center justify-center text-base shadow-md hover:shadow-lg"
                  disabled={product.stock === 0 || quantity === 0}
                  aria-label="Buy now"
                >
                  <BoltIcon className="h-5 w-5 mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-slate-200 dark:border-slate-700">
            {trustBadges.map(badge => (
              <div key={badge.text} className="flex flex-col items-center text-center">
                {badge.icon}
                <span className="text-xs mt-1 text-slate-600 dark:text-slate-400">{badge.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Product Description</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Customer Reviews</h2>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <RatingStarsDisplay rating={product.rating} starSize="w-6 h-6" />
            <span className="ml-3 text-xl font-medium text-slate-700 dark:text-slate-200">{product.rating.toFixed(1)} out of 5</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">Based on {Math.floor(product.stock * 0.8 + 5)} user ratings.</p> {/* Simulated review count */}
          <p className="mt-4 text-slate-600 dark:text-slate-300">Detailed reviews coming soon!</p>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProd => (
              <ProductCard
                key={relatedProd.id}
                product={relatedProd}
                onAddToCart={onAddToCart} 
                selectedCurrency={selectedCurrency}
                exchangeRates={exchangeRates}
                onViewProductDetails={(productId) => onNavigate(View.PRODUCT_DETAIL, productId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Ensure correct ChevronRightIcon is used for breadcrumbs
const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);
// Ensure correct BoltIcon is used
const BoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);
