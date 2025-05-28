
import React, { useState } from 'react';
import { APP_NAME } from '../../constants';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pageContentPadding = "px-6 sm:px-10 md:px-16 lg:px-20";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    console.log({ name, email, message });
    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className={`container mx-auto ${pageContentPadding} py-8 bg-white dark:bg-slate-800 shadow-xl rounded-lg`}>
      <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-light mb-8 text-center">
        Contact Us
      </h1>
      <div className="max-w-2xl mx-auto">
        {isSubmitted ? (
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-3 rounded-md relative text-center" role="alert">
            <strong className="font-bold">Thank you!</strong>
            <span className="block sm:inline"> Your message has been received. We'll get back to you soon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-700 dark:text-slate-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-700 dark:text-slate-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-700 dark:text-slate-100"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:bg-primary-light dark:hover:bg-primary dark:text-slate-900"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
        <div className="mt-12 text-center text-slate-600 dark:text-slate-400">
          <h2 className="text-xl font-semibold mb-2">Other ways to reach us:</h2>
          <p><strong>Email:</strong> support@{APP_NAME.toLowerCase().replace(/\s+/g, '')}.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> 123 MVP Lane, Tech City, TC 54321</p>
        </div>
      </div>
    </div>
  );
};
