
import React from 'react';
import { CartItem, Currency, ExchangeRates, View } from '../../types';
import { TrashIcon } from '../icons/TrashIcon';
import { CreditCardIcon } from '../icons/CreditCardIcon'; // New Icon
import { convertAndFormatPrice, getCurrencySymbol } from '../../utils/formatting';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  selectedCurrency: Currency;
  exchangeRates: ExchangeRates;
  onNavigate: (view: View, data?: any) => void; // New prop for navigation
}

export const CartPage: React.FC<CartPageProps> = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  selectedCurrency,
  exchangeRates,
  onNavigate
}) => {
  const subtotalUSD = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalConverted = subtotalUSD * (exchangeRates[selectedCurrency.code] || 1);

  const taxRate = 0.08; 
  const taxesConverted = subtotalConverted * taxRate;
  const totalConverted = subtotalConverted + taxesConverted;
  const pageContentPadding = "px-6 sm:px-10 md:px-16 lg:px-20";

  if (cartItems.length === 0) {
    return (
      <div className={`container mx-auto ${pageContentPadding} py-12 text-center`}>
        <img 
            src="https://source.unsplash.com/400x300/?empty,cart,sad" 
            alt="Empty shopping cart" 
            className="mx-auto mb-8 rounded-lg shadow-md opacity-80 w-64 h-48 object-cover" 
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-700 dark:text-slate-200 mb-4">Your Cart is Empty</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything yet. Explore our amazing products and find something you love!
        </p>
        <button
            onClick={() => onNavigate(View.PRODUCTS)}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-lg"
        >
            Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={`container mx-auto ${pageContentPadding} py-8`}>
      <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-light mb-10 text-center">
        Review Your Order & Checkout
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
        {/* Cart Items Section */}
        <div className="lg:w-2/3 space-y-6">
          {cartItems.map(item => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6 shadow-md flex-shrink-0" 
                onError={(e) => (e.currentTarget.src = `https://placehold.co/150x150/EEE/31343C?text=${encodeURIComponent(item.name.substring(0,10))}`)}
              />
              <div className="flex-grow text-left">
                <button 
                  onClick={() => onNavigate(View.PRODUCT_DETAIL, item.id)}
                  className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 hover:text-primary dark:hover:text-primary-light transition-colors focus:outline-none focus:underline"
                  title={`View details for ${item.name}`}
                >
                  {item.name}
                </button>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.category}</p>
                <p className="text-md sm:text-lg font-bold text-primary dark:text-primary-light mt-2">
                  {convertAndFormatPrice(item.price, selectedCurrency, exchangeRates)}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center">
                    <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity for {item.name}</label>
                    <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    max={item.stock > 0 ? item.stock : 99} // Assuming stock > 0 if in cart
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                    className="w-16 p-2 border border-slate-300 dark:border-slate-600 rounded-md text-center dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    aria-label={`Quantity for ${item.name}`}
                    />
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <TrashIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3 bg-slate-50 dark:bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl self-start sticky top-28">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
            Order Summary
          </h2>
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{convertAndFormatPrice(subtotalUSD, selectedCurrency, exchangeRates)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Taxes ({(taxRate * 100).toFixed(0)}%)</span>
              <span className="font-medium">
                 {`${getCurrencySymbol(selectedCurrency.code)}${taxesConverted.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-800 dark:text-slate-50 pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
              <span>Total</span>
              <span>
                {`${getCurrencySymbol(selectedCurrency.code)}${totalConverted.toFixed(2)}`}
              </span>
            </div>
          </div>
          <button 
            className="mt-10 w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 sm:py-4 px-4 rounded-lg transition duration-150 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-light focus:ring-opacity-50 text-base sm:text-lg flex items-center justify-center group"
            aria-label="Proceed to payment (Not Implemented)"
            onClick={() => alert("Checkout process is not implemented in this demo.")} // Placeholder action
          >
            <CreditCardIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2.5 transition-transform duration-200 ease-in-out group-hover:scale-110" />
            Proceed to Checkout
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
            Further payment and shipping options would appear in a real application.
          </p>
        </div>
      </div>
    </div>
  );
};
