
import { Product, ProductCategory, NavigationLink, View, Currency } from './types';

export const APP_NAME = "My MVP Store";

export const NAVIGATION_LINKS: NavigationLink[] = [
  { name: "Home", path: View.HOME },
  { name: "Products", path: View.PRODUCTS },
  { name: "About", path: View.ABOUT },
  { name: "Contact", path: View.CONTACT },
];

// Moved from CurrencySelector.tsx and exported
export const AVAILABLE_CURRENCIES: Currency[] = [
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
];

// New: Mock exchange rates (base USD)
export const MOCK_EXCHANGE_RATES: { [key: string]: number } = {
  USD: 1,
  GBP: 0.80, // 1 USD = 0.80 GBP
  EUR: 0.92, // 1 USD = 0.92 EUR
};


export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-fidelity wireless headphones with noise cancellation and long battery life. Perfect for immersive audio experiences.',
    price: 199.99,
    category: ProductCategory.ELECTRONICS,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdpcmVsZXNzJTIwaGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5, colors: ['Black', 'White'], stock: 15
  },
  {
    id: '2',
    name: 'Smartwatch Series 7',
    description: 'Latest generation smartwatch with advanced health tracking, GPS, and a vibrant always-on display.',
    price: 399.00,
    category: ProductCategory.ELECTRONICS,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609581574996-a6ae2353c5aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8, colors: ['Silver', 'Space Gray'], stock: 20
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly t-shirt made from 100% organic cotton. Soft, breathable, and durable.',
    price: 29.99,
    category: ProductCategory.APPAREL,
    image: "https://images.unsplash.com/photo-1581655353564-df123a5eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581655353564-df123a5eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622470953794-aa6c76ea06a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9yZ2FuaWMlMjBjb3R0b24lMjB0c2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.2, colors: ['Blue', 'Green', 'Red'], stock: 50
  },
  {
    id: '4',
    name: 'Running Shoes XYZ',
    description: 'Lightweight and durable running shoes for all terrains, featuring advanced cushioning technology.',
    price: 120.50,
    category: ProductCategory.APPAREL,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460353581680-5185a2950e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6, colors: ['Neon Yellow', 'Black'], stock: 30
  },
  {
    id: '5',
    name: 'The Great Novel',
    description: 'A captivating novel by a bestselling author. A story of adventure, mystery, and romance.',
    price: 15.99,
    category: ProductCategory.BOOKS,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9, stock: 100
  },
  {
    id: '6',
    name: 'Learn React Today',
    description: 'Comprehensive guide to learning React development, from basics to advanced concepts. Includes projects.',
    price: 45.00,
    category: ProductCategory.BOOKS,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3QlMjBqc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3QlMjBqc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555099962-4199c345e546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7, stock: 75
  },
  {
    id: '7',
    name: 'Ergonomic Office Chair',
    description: 'Supportive and comfortable chair for long working hours, with adjustable lumbar support and armrests.',
    price: 250.00,
    category: ProductCategory.HOME_GOODS,
    image: "https://images.unsplash.com/photo-1580480055273-228ff53825b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1580480055273-228ff53825b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519947484064-3569b76197d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604950582992-972219870360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXJnb25vbWljJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnVybml0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.4, colors: ['Black', 'Gray'], stock: 10
  },
  {
    id: '8',
    name: 'Smart Coffee Maker',
    description: 'Wi-Fi enabled coffee maker that brews your perfect cup. Control it from your phone.',
    price: 89.99,
    category: ProductCategory.HOME_GOODS,
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607968058703-075369a50884?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598800888058-bda73805ac70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600057207400-019c6372a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwaG9tZSUyMGRldmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.3, stock: 25
  },
  {
    id: '9',
    name: 'Yoga Mat Premium',
    description: 'Eco-friendly, non-slip yoga mat for your practice. Extra thick for comfort and support.',
    price: 39.99,
    category: ProductCategory.SPORTS,
    image: "https://images.unsplash.com/photo-1591291621164-2c62f21ea809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1591291621164-2c62f21ea809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1575052814086-c18803e27928?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZpdG5lc3MlMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8, colors: ['Purple', 'Teal'], stock: 40
  },
  {
    id: '10',
    name: 'Adjustable Dumbbells',
    description: 'Space-saving adjustable dumbbells for home workouts. Easily change weights from 5 to 50 lbs.',
    price: 299.99,
    category: ProductCategory.SPORTS,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVtYmJlbGxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVtYmJlbGxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594737625787-a89abd313954?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtYmJlbGxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6, stock: 12
  },
  {
    id: '11',
    name: 'HD Webcam',
    description: '1080p HD webcam for clear video calls and streaming. Built-in microphone and privacy cover.',
    price: 59.99,
    category: ProductCategory.ELECTRONICS,
    image: "https://images.unsplash.com/photo-1618384887924-3e5fb90e0885?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViY2FtfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1618384887924-3e5fb90e0885?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViY2FtfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593005510323-f209f5e86928?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ViY2FtfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29tcHV0ZXIlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394833478-85896993cb06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RyZWFtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.3, stock: 30
  },
  {
    id: '12',
    name: 'Winter Jacket',
    description: 'Warm and waterproof jacket for cold weather. Insulated, breathable, and stylish design.',
    price: 150.00,
    category: ProductCategory.APPAREL,
    image: "https://images.unsplash.com/photo-1515754388709-2ead2906fb02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyJTIwamFja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1515754388709-2ead2906fb02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyJTIwamFja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605750961079-c96919ea8270?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ludGVyJTIwamFja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576006554530-37b371c4a0a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ludGVyJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG91dGRvb3IlMjBhcHBhcmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7, colors: ['Navy', 'Red'], stock: 22
  },
];

export const MAX_PRICE_RANGE = 500; // Assuming this is in USD
export const PRICE_STEP = 10;
export const GEMINI_API_KEY = process.env.API_KEY; // Ensure this is set in your environment

export const FOOTER_TEXT = `© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`;

export const CATEGORIES = Object.values(ProductCategory);

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const MOCK_JUST_ORDERED_NOTIFICATIONS = [
  "Someone in New York, USA just ordered Wireless Headphones!",
  "A Smartwatch Series 7 was just purchased from London, UK!",
  "Organic Cotton T-Shirt heading to sunny California, USA!",
  "A customer in Berlin, DE just bought Running Shoes XYZ!",
  "The Great Novel is on its way to Tokyo, JP!",
  "Learn React Today just shipped to Toronto, CA!",
];

export const MOCK_BEST_SELLING_NOTIFICATIONS = [
  "Trending now: The Great Novel is flying off the shelves!",
  "Hot item: Running Shoes XYZ are a customer favorite this week!",
  "Don't miss out: Ergonomic Office Chair is a top seller!",
  "Popular Pick: Wireless Headphones are in high demand!",
  "Best Seller Alert: Smartwatch Series 7 continues to impress!",
];