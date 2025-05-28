import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

interface CaptchaProps {
  captchaLength?: number;
}

export interface CaptchaRef {
  verify: () => boolean;
  refresh: () => void;
}

const generateCaptchaString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Captcha = forwardRef<CaptchaRef, CaptchaProps>(({ captchaLength = 6 }, ref) => {
  const [captchaText, setCaptchaText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  const refreshCaptcha = useCallback(() => {
    setCaptchaText(generateCaptchaString(captchaLength));
    setUserInput('');
  }, [captchaLength]);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  useImperativeHandle(ref, () => ({
    verify: () => {
      return userInput.toLowerCase() === captchaText.toLowerCase();
    },
    refresh: () => {
      refreshCaptcha();
    }
  }));

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div 
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md select-none w-full"
          aria-label={`CAPTCHA text: ${captchaText.split('').join(' ')}`}
        >
          <span className="font-mono text-xl tracking-widest text-slate-700 dark:text-slate-200">
            {captchaText}
          </span>
        </div>
        <button
          type="button"
          onClick={refreshCaptcha}
          className="p-2 text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 dark:focus:ring-offset-slate-800 rounded-md transition-colors"
          aria-label="Refresh CAPTCHA"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter CAPTCHA"
        aria-label="CAPTCHA input"
        required
        className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
});

Captcha.displayName = 'Captcha';
