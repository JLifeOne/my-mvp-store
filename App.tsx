
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ProductList } from './components/ProductList';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';
import { Product, ProductCategory, View, AiFilterCriteria, ManualFilters, CartItem, Currency, ExchangeRates, User } from './types';
import { INITIAL_PRODUCTS, MAX_PRICE_RANGE, CATEGORIES, AVAILABLE_CURRENCIES, MOCK_EXCHANGE_RATES } from './constants';
import { useDarkMode } from './hooks/useDarkMode';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { CartPage } from './components/pages/CartPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { AccountPage } from './components/pages/AccountPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';

const USER_SESSION_KEY = 'currentUserSession';
const WELCOME_REFERRAL_BONUS_POINTS = 10; // Points for being referred

// Helper to generate a mock referral code
const generateReferralCode = () => {
  return `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiFilters, setAiFilters] = useState<AiFilterCriteria | null>(null);
  const [manualFilters, setManualFilters] = useState<ManualFilters>({
    category: 'all',
    priceRange: [0, MAX_PRICE_RANGE],
    minRating: 0,
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(AVAILABLE_CURRENCIES[0]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(MOCK_EXCHANGE_RATES);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  useEffect(() => {
    const persistedUserJson = localStorage.getItem(USER_SESSION_KEY);
    if (persistedUserJson) {
      try {
        const persistedUser = JSON.parse(persistedUserJson) as User;
        // Ensure older persisted users have new fields
        if (!persistedUser.referralCode) {
          persistedUser.referralCode = generateReferralCode();
        }
        if (typeof persistedUser.points !== 'number') {
          persistedUser.points = 0;
        }
        setCurrentUser(persistedUser);
      } catch (error) {
        console.error("Failed to parse persisted user session:", error);
        localStorage.removeItem(USER_SESSION_KEY);
      }
    }
  }, []);


  const handleSetSelectedCurrency = useCallback((currency: Currency) => {
    setSelectedCurrency(currency);
  }, []);

  const handleSetView = useCallback((view: View, data?: any) => {
    if (view === View.PRODUCT_DETAIL && typeof data === 'string') {
      const productId = data;
      const product = INITIAL_PRODUCTS.find(p => p.id === productId);
      if (product) {
        setSelectedProductForDetail(product);
        setCurrentView(View.PRODUCT_DETAIL);
      } else {
        console.warn(`Product with ID ${productId} not found. Navigating to HOME.`);
        setCurrentView(View.HOME); 
      }
    } else {
      setSelectedProductForDetail(null); 
      setCurrentView(view);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = useCallback((email: string, password: string, keepSignedIn: boolean) => {
    const userNamePart = email.split('@')[0];
    const name = userNamePart.charAt(0).toUpperCase() + userNamePart.slice(1);
    
    // This is a mock login. In a real app, you'd fetch user data.
    // For demo purposes, if a user logs in, we'll ensure they have referral info.
    let authenticatedUser: User = { 
      id: `user-${Date.now()}`, 
      name: name, 
      email: email,
      referralCode: generateReferralCode(), // Assign a referral code
      points: 0, // Default points
    };

    // Attempt to load existing user data if it matches email, otherwise create new basic profile
    // This is simplified; a real backend would handle this.
    const potentialExistingUserJson = localStorage.getItem(USER_SESSION_KEY);
    if (potentialExistingUserJson) {
      try {
        const potentialUser = JSON.parse(potentialExistingUserJson) as User;
        if (potentialUser.email === email) {
          // "Log in" as this persisted user
           authenticatedUser = {
            ...potentialUser, // Use existing data
            name: potentialUser.name || name, // Ensure name exists
            referralCode: potentialUser.referralCode || generateReferralCode(),
            points: typeof potentialUser.points === 'number' ? potentialUser.points : 0,
          };
        }
      } catch (e) { /* ignore parsing error */ }
    }
    
    setCurrentUser(authenticatedUser);
    if (keepSignedIn) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(authenticatedUser));
    } else {
      localStorage.removeItem(USER_SESSION_KEY); // Or use session storage if preferred
    }
    handleSetView(View.ACCOUNT);
  }, [handleSetView]);

  const handleSignUp = useCallback((name: string, email: string, password: string, referralCodeInput?: string) => {
    let startingPoints = 0;
    let referredByCode: string | undefined = undefined;

    if (referralCodeInput && referralCodeInput.trim() !== "") {
      // Simulate referral code validation and bonus
      // In a real app, you'd validate this code against existing user referral codes (backend)
      console.log(`Referral code used: ${referralCodeInput}. Backend would validate this.`);
      startingPoints = WELCOME_REFERRAL_BONUS_POINTS;
      referredByCode = referralCodeInput.trim();
      // Simulate awarding points to the referrer (backend task)
      console.log(`Backend Task: User who owns referral code ${referredByCode} should be awarded points.`);
    }

    const newUser: User = { 
      id: `user-${Date.now()}`, 
      name: name, 
      email: email,
      referralCode: generateReferralCode(), // Generate a new referral code for this user
      points: startingPoints,
      referredBy: referredByCode
    };
    setCurrentUser(newUser);
    // New sign-ups typically wouldn't "keep signed in" by default, so don't persist yet unless login implies it.
    // Or, if sign-up should also log them in and persist:
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(newUser)); // Persist new user session
    
    handleSetView(View.ACCOUNT);
  }, [handleSetView]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(USER_SESSION_KEY);
    handleSetView(View.HOME);
  }, [handleSetView]);

  const applyFilters = useCallback(() => {
    setIsLoading(true);
    let tempProducts = [...products];

    if (manualFilters.category !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === manualFilters.category);
    }
    tempProducts = tempProducts.filter(p => p.price >= manualFilters.priceRange[0] && p.price <= manualFilters.priceRange[1]);
    tempProducts = tempProducts.filter(p => p.rating >= manualFilters.minRating);

    if (aiFilters) {
      if (aiFilters.category) {
        tempProducts = tempProducts.filter(p => p.category === aiFilters.category);
      }
      if (aiFilters.minPrice) {
        tempProducts = tempProducts.filter(p => p.price >= aiFilters.minPrice!);
      }
      if (aiFilters.maxPrice) {
        tempProducts = tempProducts.filter(p => p.price <= aiFilters.maxPrice!);
      }
      if (aiFilters.minRating) {
        tempProducts = tempProducts.filter(p => p.rating >= aiFilters.minRating!);
      }
      if (aiFilters.colors && aiFilters.colors.length > 0) {
        tempProducts = tempProducts.filter(p =>
          p.colors && p.colors.some(pc => aiFilters.colors!.map(c => c.toLowerCase()).includes(pc.toLowerCase()))
        );
      }
      if (aiFilters.searchTerm) {
        const searchTermLower = aiFilters.searchTerm.toLowerCase();
        tempProducts = tempProducts.filter(p =>
          p.name.toLowerCase().includes(searchTermLower) ||
          p.description.toLowerCase().includes(searchTermLower)
        );
      }
    }

    setFilteredProducts(tempProducts);
    setTimeout(() => setIsLoading(false), 300);
  }, [products, aiFilters, manualFilters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleAiFilterApply = useCallback((criteria: AiFilterCriteria) => {
    setAiFilters(criteria);
  }, []);

  const handleManualFilterChange = useCallback((filters: Partial<ManualFilters>) => {
    setManualFilters(prev => ({ ...prev, ...filters }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setAiFilters(null);
    setManualFilters({
      category: 'all',
      priceRange: [0, MAX_PRICE_RANGE],
      minRating: 0,
    });
  }, []);

  const addToCart = useCallback((product: Product, quantityToAdd: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantityToAdd, product.stock);
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      const newQuantity = Math.min(quantityToAdd, product.stock);
      return [...prevCart, { ...product, quantity: newQuantity }];
    });
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.id === productId) {
            const newQuantity = Math.min(quantity, item.stock);
            return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 }; // Ensure quantity doesn't go below 0
          }
          return item;
        })
        .filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const handleBuyNow = useCallback((product: Product, quantity: number) => {
    addToCart(product, quantity);
    handleSetView(View.CART);
  }, [addToCart, handleSetView]);

  const pageContentPadding = "px-6 sm:px-10 md:px-16 lg:px-20";

  const renderMainContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <>
            <HeroSection onShopNow={() => handleSetView(View.PRODUCTS)} />
            {/* Fix: Correctly format className attribute with backticks */}
            <div className={`container mx-auto ${pageContentPadding} py-8 lg:py-12`}>
              <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar
                  categories={CATEGORIES}
                  onAiFilterApply={handleAiFilterApply}
                  manualFilters={manualFilters}
                  onManualFilterChange={handleManualFilterChange}
                  onClearFilters={clearAllFilters}
                  isLoadingAi={isLoading}
                />
                <main className="flex-1">
                  <ProductList
                    products={filteredProducts}
                    isLoading={isLoading}
                    onAddToCart={addToCart}
                    selectedCurrency={selectedCurrency}
                    exchangeRates={exchangeRates}
                    onViewProductDetails={(productId) => handleSetView(View.PRODUCT_DETAIL, productId)}
                  />
                </main>
              </div>
            </div>
          </>
        );
      case View.PRODUCTS:
        return (
          // Fix: Correctly format className attribute with backticks
          <div className={`container mx-auto ${pageContentPadding} py-8`}>
            <div className="flex flex-col lg:flex-row gap-8">
              <Sidebar
                categories={CATEGORIES}
                onAiFilterApply={handleAiFilterApply}
                manualFilters={manualFilters}
                onManualFilterChange={handleManualFilterChange}
                onClearFilters={clearAllFilters}
                isLoadingAi={isLoading}
              />
              <main className="flex-1">
                <ProductList
                  products={filteredProducts}
                  isLoading={isLoading}
                  onAddToCart={addToCart}
                  selectedCurrency={selectedCurrency}
                  exchangeRates={exchangeRates}
                  onViewProductDetails={(productId) => handleSetView(View.PRODUCT_DETAIL, productId)}
                />
              </main>
            </div>
          </div>
        );
      case View.PRODUCT_DETAIL:
        if (selectedProductForDetail) {
          return (
            <main className="w-full"> {/* ProductDetailPage will manage its own container and padding */}
              <ProductDetailPage
                product={selectedProductForDetail}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow} 
                allProducts={INITIAL_PRODUCTS}
                selectedCurrency={selectedCurrency}
                exchangeRates={exchangeRates}
                onNavigate={handleSetView}
              />
            </main>
          );
        }
        handleSetView(View.HOME); 
        return null; 
      case View.ABOUT:
        return <main className="w-full"><AboutPage /></main>; // AboutPage will manage its own container and padding
      case View.CONTACT:
        return <main className="w-full"><ContactPage /></main>; // ContactPage will manage its own container and padding
      case View.CART:
        return (
          <main className="w-full"> {/* CartPage will manage its own container and padding */}
            <CartPage
              cartItems={cart}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              selectedCurrency={selectedCurrency}
              exchangeRates={exchangeRates}
              onNavigate={handleSetView} 
            />
          </main>
        );
      case View.LOGIN:
        return <main className="w-full"><LoginPage onLogin={handleLogin} onNavigateToSignUp={() => handleSetView(View.SIGNUP)} /></main>; // LoginPage will manage its own padding
      case View.SIGNUP:
        return <main className="w-full"><SignUpPage onSignUp={handleSignUp} onNavigateToLogin={() => handleSetView(View.LOGIN)} /></main>; // SignUpPage will manage its own padding
      case View.ACCOUNT:
        return <main className="w-full"><AccountPage user={currentUser} onLogout={handleLogout} /></main>; // AccountPage will manage its own container and padding
      default:
        return (
          <>
            <HeroSection onShopNow={() => handleSetView(View.PRODUCTS)} />
            {/* Fix: Correctly format className attribute with backticks */}
            <div className={`container mx-auto ${pageContentPadding} py-8 lg:py-12`}>
              <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar
                  categories={CATEGORIES}
                  onAiFilterApply={handleAiFilterApply}
                  manualFilters={manualFilters}
                  onManualFilterChange={handleManualFilterChange}
                  onClearFilters={clearAllFilters}
                  isLoadingAi={isLoading}
                />
                <main className="flex-1">
                  <ProductList
                    products={filteredProducts}
                    isLoading={isLoading}
                    onAddToCart={addToCart}
                    selectedCurrency={selectedCurrency}
                    exchangeRates={exchangeRates}
                    onViewProductDetails={(productId) => handleSetView(View.PRODUCT_DETAIL, productId)}
                  />
                </main>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar
        currentView={currentView}
        onNavigate={handleSetView}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        selectedCurrency={selectedCurrency}
        availableCurrencies={AVAILABLE_CURRENCIES}
        onSetSelectedCurrency={handleSetSelectedCurrency}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <div className="flex-grow">
        {renderMainContent()}
      </div>
      <Footer />
    </div>
  );
};

// Fix: Add default export for App component
export default App;
