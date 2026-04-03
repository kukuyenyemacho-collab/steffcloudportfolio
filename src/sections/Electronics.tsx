import { useEffect, useRef, useState } from 'react';
import {
  Cpu,
  ShoppingCart,
  Battery,
  Wifi,
  Check,
  X,
  Plus,
  Minus,
  ArrowLeft,
  MessageCircle,
  Send,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  image: string;
  inStock: boolean;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Oraimo FreePods 3',
    category: 'Earphones',
    price: 2499,
    originalPrice: 3499,
    description: 'True Wireless Earbuds with Active Noise Cancellation, 35-hour playtime, and deep bass.',
    features: ['Active Noise Cancellation', '35 Hours Playtime', 'Touch Controls', 'IPX5 Water Resistant'],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    inStock: true,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Oraimo FreePods 2',
    category: 'Earphones',
    price: 1499,
    originalPrice: 1999,
    description: 'Compact wireless earbuds with clear sound quality and comfortable fit.',
    features: ['24 Hours Playtime', 'Bluetooth 5.0', 'Voice Assistant', 'Comfortable Fit'],
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80',
    inStock: true,
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'HP Pavilion 15',
    category: 'Laptops',
    price: 65000,
    originalPrice: 75000,
    description: '15.6" FHD Laptop with Intel Core i5, 8GB RAM, 512GB SSD. Perfect for work and entertainment.',
    features: ['Intel Core i5 12th Gen', '8GB DDR4 RAM', '512GB SSD', '15.6" FHD Display'],
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    inStock: true,
    badge: 'Hot Deal',
  },
  {
    id: 4,
    name: 'Dell Inspiron 14',
    category: 'Laptops',
    price: 55000,
    description: '14" Business Laptop with Intel Core i3, 4GB RAM, 256GB SSD. Lightweight and portable.',
    features: ['Intel Core i3 11th Gen', '4GB DDR4 RAM', '256GB SSD', '14" HD Display'],
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
    inStock: true,
  },
  {
    id: 5,
    name: 'Lenovo IdeaPad 3',
    category: 'Laptops',
    price: 45000,
    originalPrice: 52000,
    description: 'Budget-friendly laptop for students and everyday use with reliable performance.',
    features: ['AMD Ryzen 3', '4GB RAM', '256GB SSD', '15.6" HD Display'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    inStock: true,
  },
  {
    id: 6,
    name: 'Oraimo Watch 2',
    category: 'Smartwatches',
    price: 3999,
    originalPrice: 4999,
    description: 'Smart fitness tracker with heart rate monitor, sleep tracking, and 7-day battery life.',
    features: ['Heart Rate Monitor', 'Sleep Tracking', '7-Day Battery', 'Water Resistant'],
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    inStock: true,
    badge: 'New',
  },
  {
    id: 7,
    name: 'Oraimo PowerBank 20000mAh',
    category: 'Accessories',
    price: 2499,
    description: 'High-capacity power bank with fast charging support for all your devices.',
    features: ['20000mAh Capacity', 'Fast Charging', 'Dual USB Ports', 'LED Indicator'],
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80',
    inStock: true,
  },
  {
    id: 8,
    name: 'Samsung Galaxy A14',
    category: 'Phones',
    price: 18999,
    originalPrice: 21999,
    description: '6.6" smartphone with 64GB storage, 4GB RAM, and 50MP triple camera.',
    features: ['6.6" Display', '64GB Storage', '50MP Camera', '5000mAh Battery'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    inStock: true,
    badge: 'Trending',
  },
  {
    id: 9,
    name: 'Oraimo Necklace OEB-E54D',
    category: 'Earphones',
    price: 1799,
    description: 'Neckband-style wireless earphones with magnetic earbuds and 15-hour battery.',
    features: ['15 Hours Playtime', 'Magnetic Earbuds', 'Neckband Design', 'Clear Sound'],
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
    inStock: true,
  },
];

const categories = ['All', 'Earphones', 'Laptops', 'Phones', 'Smartwatches', 'Accessories'];

const WHATSAPP_NUMBER = '254118407026'; // Full number format with country code

export function Electronics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return `KSH ${price.toLocaleString()}`;
  };

  // Send individual product purchase to WhatsApp
  const buyProductOnWhatsApp = (product: Product) => {
    const logoUrl = `${window.location.origin}/logo.jpg`;
    
    let message = `*Steff Cloud Electronics - Product Purchase*\n\n`;
    message += `🛒 *Product Details:*\n\n`;
    message += `*${product.name}*\n`;
    message += `📂 Category: ${product.category}\n`;
    message += `💰 Price: ${formatPrice(product.price)}\n`;
    message += `📝 Description: ${product.description}\n`;
    message += `🖼️ Image: ${product.image}\n\n`;
    message += `*Features:*\n`;
    product.features.forEach((feature) => {
      message += `✓ ${feature}\n`;
    });
    message += `\n`;
    message += `*Payment via M-Pesa Till: 3401106*\n`;
    message += `Or Bank Transfer (available on request)\n\n`;
    message += `Logo: ${logoUrl}\n\n`;
    message += `I want to purchase this product. Please contact me to complete the order. Thank you! 🧡`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success('Product inquiry sent to WhatsApp!');
  };

  // Send order to WhatsApp
  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return;

    const logoUrl = `${window.location.origin}/logo.jpg`;
    
    let message = `*Steff Cloud Electronics Order*\n\n`;
    message += `🛒 *Order Details:*\n\n`;
    
    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.product.name}*\n`;
      message += `   Category: ${item.product.category}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ${formatPrice(item.product.price)} each\n`;
      message += `   Subtotal: ${formatPrice(item.product.price * item.quantity)}\n`;
      message += `   Image: ${item.product.image}\n\n`;
    });
    
    message += `*Total Amount: ${formatPrice(cartTotal)}*\n\n`;
    message += `Payment via M-Pesa Till: 3401106\n`;
    message += `Or Bank Transfer (available on request)\n\n`;
    message += `Logo: ${logoUrl}\n\n`;
    message += `Thank you for choosing Steff Cloud! 🧡`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success('Order sent to WhatsApp!');
    setCart([]);
    setIsCartOpen(false);
  };

  // Product Detail View
  if (selectedProduct) {
    return (
      <section className="relative py-20 lg:py-32 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="flex items-center gap-2 text-steff-gray hover:text-steff-orange transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-steff-cream">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="text-sm font-medium text-steff-orange mb-2">
                {selectedProduct.category}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-steff-black mb-4">
                {selectedProduct.name}
              </h1>
              
              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-steff-orange">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-xl text-steff-gray-light line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-steff-gray text-lg mb-8">
                {selectedProduct.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-steff-black mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {selectedProduct.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-steff-gray"
                    >
                      <div className="w-6 h-6 rounded-full bg-steff-orange/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-steff-orange" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => buyProductOnWhatsApp(selectedProduct)}
                  disabled={!selectedProduct.inStock}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-6 disabled:opacity-50"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Buy Product on WhatsApp
                </Button>
                <Button
                  onClick={() => {
                    addToCart(selectedProduct);
                    toast.success('Added to cart!');
                  }}
                  disabled={!selectedProduct.inStock}
                  variant="outline"
                  className="flex-1 border-steff-orange text-steff-orange hover:bg-steff-orange hover:text-white font-medium px-8 py-6 disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Payment Info */}
              <div className="mt-8 p-4 bg-steff-cream rounded-xl">
                <h4 className="font-semibold text-steff-black mb-2">Payment Options</h4>
                <p className="text-sm text-steff-gray">
                  M-Pesa Till: 3401106 | Bank Transfer available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="electronics"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orange-blob w-[600px] h-[600px] -top-64 -right-64 opacity-15" />
        <div className="orange-blob w-[500px] h-[500px] -bottom-48 -left-48 opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-steff-orange/10 rounded-full mb-4">
              <Cpu className="w-4 h-4 text-steff-orange" />
              <span className="text-sm font-medium text-steff-orange">
                Electronics Store
              </span>
            </div>
            <h2 className="reveal opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-steff-black">
              Quality<span className="text-gradient-orange"> Electronics</span>
            </h2>
            <p className="reveal opacity-0 stagger-2 text-steff-gray mt-3 max-w-xl">
              Browse our collection of premium electronics at competitive prices.
              All products come with warranty.
            </p>
          </div>

          {/* Cart & WhatsApp Buttons */}
          <div className="reveal opacity-0 stagger-2 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-steff-orange text-white rounded-xl hover:bg-steff-orange-dark transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              {cart.length > 0 && (
                <span className="bg-white text-steff-orange px-2 py-0.5 rounded-full text-sm font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="reveal opacity-0 stagger-3 flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-steff-orange text-white shadow-orange-lg'
                  : 'bg-steff-cream text-steff-gray hover:bg-steff-orange/10 hover:text-steff-orange'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid - 2 per row on small screens */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="reveal opacity-0 group bg-white rounded-xl md:rounded-2xl overflow-hidden card-shadow-hover border border-steff-orange/5"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              {/* Product Image */}
              <div 
                className="relative aspect-square overflow-hidden bg-steff-cream cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 py-0.5 md:px-3 md:py-1 bg-steff-orange text-white text-xs font-bold rounded-full">
                    {product.badge}
                  </div>
                )}
                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 md:px-4 md:py-2 bg-white text-steff-black text-xs md:text-sm font-bold rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-5">
                <div className="text-xs font-medium text-steff-orange mb-1">
                  {product.category}
                </div>
                <h3 
                  className="text-sm md:text-lg font-semibold text-steff-black mb-2 group-hover:text-steff-orange transition-colors cursor-pointer line-clamp-1"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base md:text-xl font-bold text-steff-orange">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs md:text-sm text-steff-gray-light line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => buyProductOnWhatsApp(product)}
                    disabled={!product.inStock}
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-xs md:text-sm font-medium py-2 md:py-3 disabled:opacity-50"
                  >
                    <ShoppingBag className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    Buy on WhatsApp
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      variant="outline"
                      className="flex-1 border-steff-orange text-steff-orange hover:bg-steff-orange hover:text-white text-xs md:text-sm font-medium py-2 disabled:opacity-50"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      Add
                    </Button>
                    <Button
                      onClick={() => setSelectedProduct(product)}
                      variant="outline"
                      className="px-2 md:px-4 border-steff-gray text-steff-gray hover:bg-steff-gray hover:text-white text-xs md:text-sm"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* View More Products Card */}
          <a
            href="https://electronics.steffcloud.online"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal opacity-0 group bg-gradient-to-br from-steff-orange to-steff-orange-dark rounded-xl md:rounded-2xl overflow-hidden card-shadow-hover border border-steff-orange/5 flex flex-col items-center justify-center p-6 md:p-8 min-h-[300px] md:min-h-[400px] cursor-pointer hover:scale-105 transition-transform"
            style={{ animationDelay: `${(products.length + 4) * 0.1}s` }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2">
              View More Products
            </h3>
            <p className="text-white/80 text-sm text-center mb-4">
              Explore our full catalog of electronics
            </p>
            <div className="flex items-center gap-2 text-white font-medium">
              <span>electronics.steffcloud.online</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Payment Info Banner */}
        <div className="reveal opacity-0 mt-12 md:mt-16 bg-gradient-to-r from-steff-orange to-steff-orange-dark rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">
                Payment Options
              </h3>
              <p className="text-white/90 text-sm md:text-base">
                We accept Lipa Na M-Pesa (Buy Goods Till: 3401106) and Bank Transfer
              </p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 px-3 py-2 md:px-4 bg-white/20 rounded-lg">
                <Wifi className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm">M-Pesa</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 md:px-4 bg-white/20 rounded-lg">
                <Battery className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm">Bank</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl text-steff-black flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-steff-orange" />
              Your Cart
            </DialogTitle>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 text-steff-gray-light mx-auto mb-4" />
              <p className="text-steff-gray">Your cart is empty</p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 bg-steff-orange hover:bg-steff-orange-dark text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 my-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 md:gap-4 p-3 md:p-4 bg-steff-cream rounded-xl"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-steff-black text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-steff-orange font-bold mt-1 text-sm">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 md:gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white flex items-center justify-center hover:bg-steff-orange hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-medium text-steff-black text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white flex items-center justify-center hover:bg-steff-orange hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-steff-gray hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Total */}
              <div className="border-t border-steff-orange/20 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base md:text-lg font-semibold text-steff-black">
                    Total
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-steff-orange">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-steff-gray mb-4">
                  Payment via M-Pesa Till: 3401106 or Bank Transfer
                </p>
                <Button
                  onClick={sendOrderToWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-5 md:py-6 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                  Order via WhatsApp
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
