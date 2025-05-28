import React, { useState, useEffect } from 'react';
import { APP_NAME, FOOTER_TEXT, MOCK_JUST_ORDERED_NOTIFICATIONS, MOCK_BEST_SELLING_NOTIFICATIONS } from '../constants';
import { Logo } from './icons/Logo';
import { ShoppingBagIcon } from './icons/ShoppingBagIcon';
import { FireIcon } from './icons/FireIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { MastercardIcon } from './icons/MastercardIcon';
import { PayPalIcon } from './icons/PayPalIcon';
import { NowPaymentsIcon } from './icons/NowPaymentsIcon';
import { SecureGatewayIcon } from './icons/SecureGatewayIcon';


interface TickerItemProps {
  icon: React.ReactNode;
  text: string;
  keyProp: string | number; // Key to trigger re-render for animation
}

const TickerItem: React.FC<TickerItemProps> = ({ icon, text, keyProp }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50); // Short delay to trigger transition
    return () => clearTimeout(timer);
  }, [keyProp]);

  return (
    <div
      key={keyProp}
      className={`flex items-center space-x-2 text-xs sm:text-sm text-slate-300 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <span className="flex-shrink-0 w-4 h-4">{icon}</span>
      <span className="truncate" title={text}>{text}</span>
    </div>
  );
};


export const Footer: React.FC = () => {
  const [justOrderedIndex, setJustOrderedIndex] = useState(0);
  const [bestSellingIndex, setBestSellingIndex] = useState(0);

  useEffect(() => {
    const justOrderedInterval = setInterval(() => {
      setJustOrderedIndex(prevIndex => (prevIndex + 1) % MOCK_JUST_ORDERED_NOTIFICATIONS.length);
    }, 5500); // Change every 5.5 seconds

    const bestSellingInterval = setInterval(() => {
      setBestSellingIndex(prevIndex => (prevIndex + 1) % MOCK_BEST_SELLING_NOTIFICATIONS.length);
    }, 7500); // Change every 7.5 seconds

    return () => {
      clearInterval(justOrderedInterval);
      clearInterval(bestSellingInterval);
    };
  }, []);

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon className="w-5 h-5" />, href: '#' },
    { name: 'Twitter', icon: <TwitterIcon className="w-5 h-5" />, href: '#' },
    { name: 'Instagram', icon: <InstagramIcon className="w-5 h-5" />, href: '#' },
    { name: 'LinkedIn', icon: <LinkedInIcon className="w-5 h-5" />, href: '#' },
  ];

  const paymentMethods = [
    { name: 'NOWPayments', icon: <NowPaymentsIcon className="h-8 w-auto" /> }, // Adjusted height
    { name: 'Mastercard', icon: <MastercardIcon className="h-8 w-auto" /> }, // Adjusted height
    { name: 'PayPal', icon: <PayPalIcon className="h-8 w-auto" /> }, // Adjusted height
    { name: 'Secure Gateway', icon: <SecureGatewayIcon className="h-8 w-auto" /> }, // Adjusted height
  ];

  return (
    <footer className="bg-[#000435] border-t border-slate-700 transition-colors duration-300 print:hidden">
      <div className="container mx-auto px-6 sm:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="space-y-2">
            <div className="flex items-center flex-shrink-0">
              <Logo className="h-9 w-9 mr-2 text-primary dark:text-primary-light" />
              <span className="font-semibold text-xl text-slate-100">{APP_NAME}</span>
            </div>
            <div className="flex flex-col gap-2 text-left w-full">
                <TickerItem
                icon={<ShoppingBagIcon className="text-sky-400" />}
                text={MOCK_JUST_ORDERED_NOTIFICATIONS[justOrderedIndex]}
                keyProp={`just-ordered-${justOrderedIndex}`}
                />
                <TickerItem
                icon={<FireIcon className="text-red-400" />}
                text={MOCK_BEST_SELLING_NOTIFICATIONS[bestSellingIndex]}
                keyProp={`best-selling-${bestSellingIndex}`}
                />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-md font-semibold text-slate-200 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Shipping Information</a></li>
            </ul>
            <h4 className="text-md font-semibold text-slate-200 uppercase tracking-wider pt-2">Follow Us</h4>
            <div className="flex space-x-3">
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-300 hover:text-accent transition-colors"
                  aria-label={`Follow us on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-md font-semibold text-slate-200 uppercase tracking-wider">WE ACCEPT</h4>
            <div className="flex flex-wrap gap-2 items-center">
              {paymentMethods.map(method => (
                <div key={method.name} className="p-0.5 rounded shadow-sm flex items-center justify-center" title={method.name}>
                  {/* Removed individual bg-white, icons will manage their own backgrounds if needed or be transparent */}
                  {method.icon}
                </div>
              ))}
            </div>
             <p className="text-xs text-slate-400 pt-2">
                Payment processing is handled securely. Actual payment methods and adjustments are managed by administrators via the backend.
            </p>
            <div className="pt-2">
                <h4 className="text-md font-semibold text-slate-200 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-1 text-sm mt-2">
                    <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Terms of Service</a></li>
                </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-2 text-center">
          <p className="text-xs text-slate-400">
            {FOOTER_TEXT} <br />
            ERP integration for product and order management is handled server-side.
          </p>
        </div>
      </div>
    </footer>
  );
};
