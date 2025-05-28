
import React from 'react';
import { APP_NAME } from '../../constants';

export const AboutPage: React.FC = () => {
  const pageContentPadding = "px-6 sm:px-10 md:px-16 lg:px-20";
  return (
    <div className={`container mx-auto ${pageContentPadding} py-8 bg-white dark:bg-slate-800 shadow-xl rounded-lg`}>
      <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-light mb-6 text-center">
        About {APP_NAME}
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto text-slate-700 dark:text-slate-300">
        <p>
          Welcome to <strong>{APP_NAME}</strong>, your premier destination for an innovative online shopping experience. 
          We are passionate about bringing you high-quality products combined with cutting-edge technology to make your shopping journey seamless and enjoyable.
        </p>
        <img 
          src="https://picsum.photos/seed/aboutus/800/400" 
          alt="Our team or storefront" 
          className="rounded-lg my-6 shadow-md"
        />
        <h2 className="text-2xl font-semibold text-primary dark:text-primary-light mt-8 mb-4">Our Mission</h2>
        <p>
          Our mission is to revolutionize e-commerce by leveraging the power of artificial intelligence to provide personalized recommendations, 
          intuitive search capabilities, and an overall delightful user experience. We believe that shopping should be easy, fun, and tailored to your individual needs.
        </p>
        <h2 className="text-2xl font-semibold text-primary dark:text-primary-light mt-8 mb-4">Why Choose Us?</h2>
        <ul>
          <li><strong>Curated Selection:</strong> We handpick the best products across various categories to ensure quality and value.</li>
          <li><strong>AI-Powered Experience:</strong> Our smart features, like AI-driven filtering and recommendations, help you find exactly what you're looking for, faster.</li>
          <li><strong>Customer-Centric:</strong> Your satisfaction is our top priority. We are committed to providing excellent customer service and support.</li>
          <li><strong>Modern & Secure:</strong> Enjoy a sleek, user-friendly interface built on the latest technologies, ensuring your data and transactions are secure.</li>
        </ul>
        <p className="mt-8 text-center">
          Thank you for choosing {APP_NAME}. We're excited to have you as part of our community!
        </p>
      </div>
    </div>
  );
};
