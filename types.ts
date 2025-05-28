
export enum ProductCategory {
  ELECTRONICS = "Electronics",
  APPAREL = "Apparel",
  BOOKS = "Books",
  HOME_GOODS = "Home Goods",
  SPORTS = "Sports",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Assumed to be in USD
  category: ProductCategory;
  image: string; // Primary image URL (curated)
  galleryImages?: string[]; // Optional array of curated gallery image URLs
  rating: number; // 1 to 5
  colors?: string[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type NavigationLink = {
  name: string;
  path: View;
};

export enum View {
  HOME = "HOME",
  PRODUCTS = "PRODUCTS",
  PRODUCT_DETAIL = "PRODUCT_DETAIL", // New view for product detail page
  ABOUT = "ABOUT",
  CONTACT = "CONTACT",
  CART = "CART",
  LOGIN = "LOGIN",       // New
  SIGNUP = "SIGNUP",     // New
  ACCOUNT = "ACCOUNT"    // New
}

export interface AiFilterCriteria {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  colors?: string[];
  searchTerm?: string;
}

export interface ManualFilters {
  category: ProductCategory | 'all';
  priceRange: [number, number];
  minRating: number;
}

// Moved from CurrencySelector.tsx
export interface Currency {
  code: string;
  flag: string;
  name: string;
}

// New type for exchange rates
export interface ExchangeRates {
  [currencyCode: string]: number;
}

// Updated User interface for referrals and points
export interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string; // Unique code for this user to share
  points: number;       // Points earned by this user
  referredBy?: string;  // Optional: code of the user who referred them
}
