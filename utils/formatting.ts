
import { Currency, ExchangeRates } from '../types';

export const getCurrencySymbol = (currencyCode: string): string => {
  switch (currencyCode?.toUpperCase()) {
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    case 'EUR':
      return '€';
    default:
      return currencyCode || ''; // Fallback to code if symbol not found or code is undefined
  }
};

export const convertAndFormatPrice = (
  usdPrice: number,
  targetCurrency: Currency,
  exchangeRates: ExchangeRates
): string => {
  if (typeof usdPrice !== 'number' || !targetCurrency || !exchangeRates) {
    return 'N/A'; // Or some error state
  }

  const rate = exchangeRates[targetCurrency.code];
  if (typeof rate !== 'number') {
    // Fallback to USD if rate not found for the target currency
    return `${getCurrencySymbol('USD')}${usdPrice.toFixed(2)}`;
  }

  const convertedPrice = usdPrice * rate;
  const symbol = getCurrencySymbol(targetCurrency.code);
  
  return `${symbol}${convertedPrice.toFixed(2)}`;
};
