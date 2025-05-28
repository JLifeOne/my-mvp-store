
import React, { useState, useRef } from 'react';
import { PasswordInput } from '../PasswordInput';
import { APP_NAME } from '../../constants';
import { Captcha, CaptchaRef } from '../Captcha';

interface LoginPageProps {
  onLogin: (email: string, password: string, keepSignedIn: boolean) => void;
  onNavigateToSignUp: () => void;
}

type ForgotPasswordStep = 'login' | 'forgot_email_entry' | 'forgot_code_entry' | 'forgot_success';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const captchaRef = useRef<CaptchaRef>(null);
  const pageContentPadding = "px-6 sm:px-10 md:px-16 lg:px-20";

  const [forgotPasswordStep, setForgotPasswordStep] = useState<ForgotPasswordStep>('login');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const clearFormFields = (clearEmail = false) => {
    if (clearEmail) setEmail('');
    setPassword('');
    setResetCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setKeepSignedIn(false);
  };

  const handleSignInSubmit = () => {
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (captchaRef.current && !captchaRef.current.verify()) {
      setError('Invalid CAPTCHA. Please try again.');
      captchaRef.current.refresh();
      return;
    }

    onLogin(email, password, keepSignedIn);
  };

  const handleForgotPasswordClick = () => {
    setError('');
    setSuccessMessage('');
    setForgotPasswordStep('forgot_email_entry');
    // Keep email if already entered, clear password fields
    setPassword(''); 
    setResetCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    captchaRef.current?.refresh();
  };

  const handleSendResetLink = () => {
    setError('');
    setSuccessMessage('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (captchaRef.current && !captchaRef.current.verify()) {
      setError('Invalid CAPTCHA. Please try again.');
      captchaRef.current.refresh();
      return;
    }
    // Simulate sending reset link
    setForgotPasswordStep('forgot_code_entry');
    setSuccessMessage('Simulated: Reset code sent to your email. For this demo, please use "123456" as the reset code.');
    // Do not clear email here
    captchaRef.current?.refresh();
  };

  const handleResetPasswordSubmit = () => {
    setError('');
    setSuccessMessage('');
    if (!resetCode || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields for password reset.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // Simulate code validation
    if (resetCode !== '123456') {
      setError('Invalid reset code. Please try again.');
      return;
    }
    setForgotPasswordStep('forgot_success');
    setSuccessMessage('Your password has been successfully reset! You can now sign in with your new password.');
    clearFormFields(false); // Keep email for potential prefill if user navigates back to login
  };
  
  const handleBackToSignIn = () => {
    setError('');
    setSuccessMessage('');
    setForgotPasswordStep('login');
    clearFormFields(true); // Clear email when going back to full login
    captchaRef.current?.refresh();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotPasswordStep === 'login') {
      handleSignInSubmit();
    } else if (forgotPasswordStep === 'forgot_email_entry') {
      handleSendResetLink();
    } else if (forgotPasswordStep === 'forgot_code_entry') {
      handleResetPasswordSubmit();
    }
  };

  const renderFormContent = () => {
    if (forgotPasswordStep === 'forgot_success') {
      return (
        <div className="text-center">
          <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900 dark:text-slate-100">
            Password Reset Successful!
          </h2>
          {successMessage && <p className="text-center text-sm text-green-600 dark:text-green-400 py-2 mt-4">{successMessage}</p>}
          <button
            type="button"
            onClick={handleBackToSignIn}
            className="mt-6 group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:bg-primary-light dark:hover:bg-primary dark:text-slate-900 dark:focus:ring-offset-slate-800"
          >
            Back to Sign In
          </button>
        </div>
      );
    }

    return (
      <>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-slate-100">
            {forgotPasswordStep === 'login' && `Sign in to ${APP_NAME}`}
            {forgotPasswordStep === 'forgot_email_entry' && 'Reset Your Password'}
            {forgotPasswordStep === 'forgot_code_entry' && 'Enter New Password'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          {error && <p className="text-center text-sm text-red-600 dark:text-red-400 py-2 -mt-4 mb-2">{error}</p>}
          {/*
            FIX: Removed redundant `forgotPasswordStep !== 'forgot_success'` check.
            At this point in the code, if `forgotPasswordStep` was 'forgot_success',
            the function would have already returned. So, the check is always true here.
          */}
          {successMessage && <p className="text-center text-sm text-green-600 dark:text-green-400 py-2 -mt-4 mb-2">{successMessage}</p>}

          {(forgotPasswordStep === 'login' || forgotPasswordStep === 'forgot_email_entry') && (
            <div className="rounded-md shadow-sm">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${forgotPasswordStep === 'login' ? 'rounded-t-md' : 'rounded-md'}`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {forgotPasswordStep === 'login' && (
            <div className="-mt-px">
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          )}
          
          {(forgotPasswordStep === 'login' || forgotPasswordStep === 'forgot_email_entry') && (
            <div className="pt-2">
              <Captcha ref={captchaRef} />
            </div>
          )}

          {forgotPasswordStep === 'forgot_code_entry' && (
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="reset-code" className="sr-only">Reset Code</label>
                <input
                  id="reset-code"
                  name="resetCode"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Reset Code (e.g., 123456)"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                />
              </div>
              <div className="-mt-px">
                <PasswordInput
                  id="new-password"
                  name="newPassword"
                  autoComplete="new-password"
                  required
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="-mt-px">
                <PasswordInput
                  id="confirm-new-password"
                  name="confirmNewPassword"
                  autoComplete="new-password"
                  required
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          )}

          {forgotPasswordStep === 'login' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="keep-signed-in"
                  name="keep-signed-in"
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary-light border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700"
                />
                <label htmlFor="keep-signed-in" className="ml-2 block text-sm text-gray-900 dark:text-slate-300">
                  Keep me signed in
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary focus:outline-none focus:underline"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:bg-primary-light dark:hover:bg-primary dark:text-slate-900 dark:focus:ring-offset-slate-800"
            >
              {forgotPasswordStep === 'login' && 'Sign in'}
              {forgotPasswordStep === 'forgot_email_entry' && 'Send Reset Link'}
              {forgotPasswordStep === 'forgot_code_entry' && 'Reset Password'}
            </button>
          </div>
          
          {forgotPasswordStep !== 'login' && (
             <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={handleBackToSignIn}
                  className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary focus:outline-none focus:underline"
                >
                  Back to Sign In
                </button>
              </div>
          )}
        </form>

        {forgotPasswordStep === 'login' && (
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-slate-400">
            Don't have an account?{' '}
            <button
                onClick={onNavigateToSignUp}
                className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary focus:outline-none focus:underline"
            >
                Sign up
            </button>
            </p>
        )}
      </>
    );
  };

  return (
    <div className={`min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 ${pageContentPadding}`}>
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl">
        {renderFormContent()}
      </div>
    </div>
  );
};
