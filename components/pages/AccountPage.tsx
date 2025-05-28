
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { DocumentTextIcon } from '../icons/DocumentTextIcon';
import { HomeModernIcon } from '../icons/HomeModernIcon';
import { KeyIcon } from '../icons/KeyIcon';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { ArrowRightOnRectangleIcon } from '../icons/ArrowRightOnRectangleIcon';
import { GiftIcon } from '../icons/GiftIcon'; // New icon for referrals
import { BellIcon } from '../icons/BellIcon';   // New icon for notifications
import { ClipboardIcon } from '../icons/ClipboardIcon'; // New icon for copy
import { CheckCircleIcon } from '../icons/CheckCircleIcon'; // New icon for copy success


interface AccountPageProps {
  user: User | null;
  onLogout: () => void;
}

interface AccountOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  disabled?: boolean;
  interactiveElement?: React.ReactNode; // For custom elements like toggles
}

const AccountOptionItem: React.FC<AccountOptionProps> = ({ icon, title, subtitle, onClick, disabled, interactiveElement }) => (
  <li>
    <button
      onClick={onClick}
      disabled={disabled || !!interactiveElement} // Disable button if custom interactive element is present
      className={`w-full flex items-center justify-between py-4 px-1 text-left transition-colors duration-150
                  ${disabled ? 'opacity-50 cursor-not-allowed' : interactiveElement ? '' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
      aria-label={title}
    >
      <div className="flex items-center">
        <span className="mr-4 text-primary dark:text-primary-light flex-shrink-0">{icon}</span>
        <div className="flex flex-col">
            <span className="text-slate-700 dark:text-slate-200 font-medium">{title}</span>
            {subtitle && <span className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>}
            {disabled && !subtitle && <span className="text-xs text-slate-500 dark:text-slate-400">(Not Implemented)</span>}
        </div>
      </div>
      {interactiveElement ? interactiveElement : (!disabled && <ChevronRightIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />)}
    </button>
  </li>
);

export const AccountPage: React.FC<AccountPageProps> = ({ user, onLogout }) => {
  const pageContentPadding = "px-6 sm:px-10 md:px-16 lg:px-20";
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
      }
    }
  }, []);

  const handleCopyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy referral code: ', err);
        // Fallback for older browsers or if Clipboard API fails (e.g. in non-secure contexts)
        alert(`Could not copy. Your code: ${user.referralCode}`);
      });
    }
  };

  const handleNotificationToggle = async () => {
    if (!('Notification' in window)) {
      setNotificationStatus('Push notifications are not supported by your browser.');
      return;
    }

    if (Notification.permission === 'granted') {
      // Simulate disabling notifications (actual unsubscription is more complex)
      setNotificationsEnabled(false);
      setNotificationStatus('Push notifications disabled (simulated).');
      console.log("Simulated: Unsubscribed from push notifications.");
    } else if (Notification.permission === 'denied') {
      setNotificationStatus('Push notifications are blocked. Please check your browser settings.');
    } else if (Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          setNotificationStatus('Push notifications enabled! (Simulated: Subscribed to push service)');
          console.log("Simulated: Subscribed to push service.");
          // Here you would typically send the subscription object to your server
        } else {
          setNotificationStatus('Push notification permission denied.');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        setNotificationStatus('Failed to request notification permission.');
      }
    }
  };

  if (!user) {
    return (
      // Fix: Correctly format className attribute with backticks
      <div className={`container mx-auto ${pageContentPadding} py-12 text-center`}>
        <p className="text-red-500 text-lg">Access Denied. Please log in to view your account.</p>
      </div>
    );
  }

  const accountOptions: AccountOptionProps[] = [
    { icon: <DocumentTextIcon className="w-6 h-6" />, title: 'View Order History', disabled: true },
    { icon: <HomeModernIcon className="w-6 h-6" />, title: 'Manage Addresses', disabled: true },
    { icon: <KeyIcon className="w-6 h-6" />, title: 'Change Password', disabled: true },
  ];

  return (
    // Fix: Correctly format className attribute with backticks
    <div className={`py-12 ${pageContentPadding}`}>
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-light mb-6 text-center">
            My Account
          </h1>

          {/* Profile Section Card */}
          <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-300 ease-out">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <UserCircleIcon className="w-20 h-20 sm:w-24 sm:h-24 text-slate-400 dark:text-slate-500 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0" />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100">
                  {user.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mt-1 text-sm sm:text-base">
                  {user.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  User ID: {user.id}
                </p>
              </div>
            </div>
          </div>

          {/* Referrals Section Card */}
          <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-300 ease-out">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-1 pb-3 border-b border-slate-200 dark:border-slate-700 flex items-center">
              <GiftIcon className="w-6 h-6 mr-3 text-primary dark:text-primary-light" />
              Referral Program
            </h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Share your referral code with friends! When they sign up, they get bonus points, and you earn points too (details TBD by backend).
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Your Referral Code:</span>
                <strong className="text-md text-primary dark:text-primary-light tracking-wider">{user.referralCode}</strong>
                <button 
                  onClick={handleCopyReferralCode}
                  className="p-1.5 ml-auto text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-1 dark:focus:ring-offset-slate-800 transition-colors"
                  aria-label="Copy referral code"
                >
                  {copied ? <CheckCircleIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
                </button>
              </div>
               {copied && <p className="text-xs text-green-600 dark:text-green-400 text-center sm:text-left">Copied to clipboard!</p>}
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Your Points: <span className="text-lg font-bold text-accent">{user.points}</span>
              </p>
              {user.referredBy && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You were referred by code: {user.referredBy}. Thanks for joining!
                </p>
              )}
            </div>
          </div>

          {/* Account Settings Card */}
          <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-300 ease-out">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2 sm:mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
              Account Settings
            </h3>
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {accountOptions.map((option) => (
                <AccountOptionItem key={option.title} {...option} />
              ))}
              <AccountOptionItem
                icon={<BellIcon className="w-6 h-6" />}
                title="Push Notifications"
                subtitle={notificationStatus || (notificationsEnabled ? "Enabled" : "Disabled")}
                interactiveElement={
                  <label htmlFor="notification-toggle" className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="notification-toggle"
                      className="sr-only peer" 
                      checked={notificationsEnabled}
                      onChange={handleNotificationToggle} 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-light dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                }
              />
            </ul>
          </div>
          
          {/* Logout Button (Moved outside settings card for prominence) */}
           <div className="mt-8">
             <button
                onClick={onLogout}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800 transition-colors duration-150 group"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                Logout
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
