'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Clock, Truck, Shield, Users, Award, MessageCircle, User, Home, Search, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const carouselItems = [
  {
    id: 1,
    title: "Latest Electronics & Components",
    subtitle: "Discover cutting-edge technology",
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "Professional Audio Equipment",
    subtitle: "Studio-grade sound systems",
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Explore Audio"
  },
  {
    id: 3,
    title: "Smart Home Solutions",
    subtitle: "Transform your living space",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Smart Home"
  }
];

const todaysDeals = [
  {
    id: 1,
    name: "Arduino Uno R3",
    price: 15000,
    originalPrice: 20000,
    discount: 25,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    timeLeft: "2h 30m",
    category: "sensors-modules"
  },
  {
    id: 2,
    name: "Raspberry Pi 4 4GB",
    price: 85000,
    originalPrice: 100000,
    discount: 15,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    timeLeft: "5h 15m",
    category: "sensors-modules"
  },
  {
    id: 3,
    name: "1/4W Resistor Kit",
    price: 2500,
    originalPrice: 3000,
    discount: 17,
    image: null,
    rating: 4.7,
    timeLeft: "1h 45m",
    category: "electronics-components"
  },
  {
    id: 4,
    name: "ESP32 Development Board",
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    timeLeft: "3h 20m",
    category: "sensors-modules"
  }
];

const newArrivals = [
  {
    id: 5,
    name: "DHT22 Temperature Sensor",
    price: 8000,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    category: "sensors-modules"
  },
  {
    id: 6,
    name: "Capacitor Kit 55pcs",
    price: 4500,
    image: null,
    rating: 4.8,
    category: "electronics-components"
  },
  {
    id: 7,
    name: "JBL Wireless Microphone",
    price: 35000,
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    category: "audio-sound"
  },
  {
    id: 8,
    name: "12V 7.2Ah Battery",
    price: 25000,
    image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    category: "power-energy"
  }
];

const categories = [
  { name: "Sensors & Modules", icon: "🔧", count: "500+ items" },
  { name: "Electronics & Components", icon: "⚡", count: "1000+ items" },
  { name: "Power & Energy", icon: "🔋", count: "300+ items" },
  { name: "Tools & Equipment", icon: "🛠️", count: "200+ items" },
  { name: "Audio & Sound", icon: "🎵", count: "150+ items" },
  { name: "Wiring & Connectors", icon: "🔌", count: "400+ items" },
  { name: "Home Appliances", icon: "🏠", count: "100+ items" },
  { name: "Gaming & Accessories", icon: "🎮", count: "80+ items" }
];

const whyShopWithUs = [
  { icon: Shield, title: "Quality Guarantee", desc: "100% authentic products" },
  { icon: Truck, title: "Fast Delivery", desc: "Same day delivery available" },
  { icon: Users, title: "Expert Support", desc: "24/7 technical assistance" },
  { icon: Award, title: "Best Prices", desc: "Competitive pricing guaranteed" }
];

const customerReviews = [
  {
    id: 1,
    name: "Adebayo Johnson",
    rating: 5,
    comment: "Excellent quality components. Fast delivery and great customer service!",
    product: "Arduino Starter Kit",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Sarah Williams",
    rating: 5,
    comment: "Perfect for my electronics projects. Highly recommended!",
    product: "Resistor Kit",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Michael Chen",
    rating: 4,
    comment: "Good quality and reasonable prices. Will order again.",
    product: "ESP32 Module",
    date: "2 weeks ago"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (productId: number) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cartItems };
      delete newCart[productId];
      setCartItems(newCart);
    } else {
      setCartItems(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const ProductCard = ({ product, showTimer = false }: { product: any, showTimer?: boolean }) => {
    const isInCart = cartItems[product.id] > 0;
    const isElectronicsComponent = product.category === 'electronics-components';

    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
        <CardContent className="p-0">
          {product.image && !isElectronicsComponent ? (
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {product.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  -{product.discount}%
                </Badge>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-sm text-gray-600">Electronics Component</p>
              </div>
              {product.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  -{product.discount}%
                </Badge>
              )}
            </div>
          )}
          
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
            
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-lg text-blue-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {showTimer && product.timeLeft && (
              <div className="flex items-center gap-1 mb-3 text-red-600">
                <Clock className="h-3 w-3" />
                <span className="text-xs font-medium">{product.timeLeft} left</span>
              </div>
            )}

            {!isInCart ? (
              <Button
                onClick={() => addToCart(product.id)}
                className={`w-full ${
                  isElectronicsComponent
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between bg-blue-50 rounded-md p-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCartQuantity(product.id, cartItems[product.id] - 1)}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <span className="font-medium text-blue-600">{cartItems[product.id]}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCartQuantity(product.id, cartItems[product.id] + 1)}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="text-2xl font-bold text-blue-600">
                KJ Electronics
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {Object.keys(cartItems).length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {Object.values(cartItems).reduce((a, b) => a + b, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-blue-600">KJ Electronics</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button className="flex-1">Login</Button>
                  <Button variant="outline" className="flex-1">Signup</Button>
                </div>
                
                <div className="space-y-2">
                  <Link href="/track-orders" className="block py-2 text-gray-700 hover:text-blue-600">
                    Track Orders
                  </Link>
                  <Link href="/sell" className="block py-2 text-gray-700 hover:text-blue-600">
                    Sell on KJ Electronics
                  </Link>
                  <Link href="/stores" className="block py-2 text-gray-700 hover:text-blue-600">
                    Physical Stores
                  </Link>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        {category.icon} {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Contact Us</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📧 info@kjelectronics.com</p>
                    <p>📞 +234 123 456 7890</p>
                    <p>💬 WhatsApp Support</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Get Latest Deals</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Enter email" className="flex-1" />
                    <Button size="sm">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16">
        {/* Search Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for electronics, components, sensors..."
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>
        </div>

        {/* Hero Carousel */}
        <section className="relative h-96 overflow-hidden">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div className="relative h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
                    <p className="text-xl md:text-2xl mb-8">{item.subtitle}</p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      {item.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselItems.length)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Today's Deals */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Today's Deals</h2>
              <Link href="/deals" className="text-blue-600 hover:text-blue-700 font-medium">
                View All Deals
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {todaysDeals.map((product) => (
                <ProductCard key={product.id} product={product} showTimer />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
              <Link href="/new-arrivals" className="text-blue-600 hover:text-blue-700 font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Shop With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyShopWithUs.map((item, index) => (
                <Card key={index} className="text-center border-0 shadow-md">
                  <CardContent className="p-6">
                    <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customerReviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{review.comment}"</p>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-gray-600">{review.product}</p>
                      </div>
                      <p className="text-gray-500">{review.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Description */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kariola Johnson Electronics Store Nigeria - Nigeria's No. 1 Shopping Destination
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
                Shop for everything you need on KJ Electronics - Nigeria's premier online marketplace for electronics, 
                components, and technology solutions. From Arduino boards and Raspberry Pi to resistors, capacitors, 
                and advanced sensor modules, we offer the largest selection of authentic electronics components in Nigeria. 
                Our extensive catalog includes professional audio equipment, power solutions, home appliances, and cutting-edge 
                IoT devices. With over 2000+ products from trusted brands, competitive prices, and nationwide delivery, 
                KJ Electronics is your one-stop destination for all electronics needs. Whether you're a hobbyist, 
                student, engineer, or business owner, discover quality components backed by our 100% authenticity guarantee 
                and expert technical support.
              </p>
              <Button
                variant="ghost"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-40">
        <div className="grid grid-cols-4 gap-1">
          <Button variant="ghost" className="flex-col h-16 rounded-none">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 rounded-none relative">
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-xs">Cart</span>
            {Object.keys(cartItems).length > 0 && (
              <Badge className="absolute top-2 right-4 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                {Object.values(cartItems).reduce((a, b) => a + b, 0)}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" className="flex-col h-16 rounded-none">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 rounded-none">
            <MessageCircle className="h-5 w-5 mb-1" />
            <span className="text-xs">Chat</span>
          </Button>
        </div>
      </div>

      {/* Fixed Chat and Profile Buttons (Desktop) */}
      <div className="hidden md:block">
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-pink-500 hover:bg-pink-600 shadow-lg z-40"
          onClick={() => {
            // Tidio chat integration would go here
            console.log('Opening Tidio chat...');
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        <Button
          className="fixed bottom-24 right-6 rounded-full w-14 h-14 bg-pink-500 hover:bg-pink-600 shadow-lg z-40"
        >
          <User className="h-6 w-6" />
        </Button>
      </div>

      {/* Back to Top Button */}
      {scrollY > 300 && (
        <Button
          className="fixed bottom-6 left-6 rounded-full w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white shadow-lg z-40"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </Button>
      )}
    </div>
  );
}