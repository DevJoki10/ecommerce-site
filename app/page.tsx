'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Clock, Truck, Shield, Users, Award, MessageCircle, User, Home, Search, Menu, X, ChevronDown, ChevronUp, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';

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
    name: "1/4W Resistor Kit (100 pieces)",
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
  },
  {
    id: 15,
    name: "2W Metal Film Resistor 10Ω",
    price: 150,
    originalPrice: 200,
    discount: 25,
    image: null,
    rating: 4.5,
    timeLeft: "4h 10m",
    category: "electronics-components"
  },
  {
    id: 16,
    name: "Transistor Assortment Kit",
    price: 3500,
    originalPrice: 4000,
    discount: 12,
    image: null,
    rating: 4.6,
    timeLeft: "6h 30m",
    category: "electronics-components"
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
    name: "Electrolytic Capacitor Kit (55pcs)",
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
  },
  {
    id: 17,
    name: "Ceramic Capacitor Kit (100pcs)",
    price: 1800,
    image: null,
    rating: 4.7,
    category: "electronics-components"
  },
  {
    id: 18,
    name: "Diode Rectifier Kit (50pcs)",
    price: 2800,
    image: null,
    rating: 4.4,
    category: "electronics-components"
  }
];

const homeAppliances = [
  {
    id: 9,
    name: "Smart LED TV 43 inch",
    price: 180000,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    category: "home-appliances"
  },
  {
    id: 10,
    name: "Microwave Oven 20L",
    price: 65000,
    image: "https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.3,
    category: "home-appliances"
  },
  {
    id: 11,
    name: "Air Fryer 5L",
    price: 45000,
    image: "https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    category: "home-appliances"
  },
  {
    id: 12,
    name: "Electric Kettle 1.8L",
    price: 12000,
    image: "https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.2,
    category: "home-appliances"
  }
];

const topSellers = [
  ...todaysDeals.slice(0, 2),
  ...newArrivals.slice(0, 2),
  ...homeAppliances.slice(0, 2),
  {
    id: 13,
    name: "Bluetooth Speaker",
    price: 18000,
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    category: "audio-sound"
  },
  {
    id: 14,
    name: "USB-C Cable 2m",
    price: 3500,
    image: "https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    category: "wiring-connectors"
  }
];

const featuredBundles = [
  {
    id: 1,
    name: "Arduino Starter Kit Pro",
    description: "Complete kit with Arduino Uno, sensors, and components",
    price: 45000,
    originalPrice: 60000,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    items: ["Arduino Uno R3", "Breadboard", "Jumper Wires", "LED Kit", "Resistor Kit"]
  },
  {
    id: 2,
    name: "Home Audio Bundle",
    description: "Professional audio setup for your home",
    price: 120000,
    originalPrice: 150000,
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400",
    items: ["Wireless Microphone", "Bluetooth Speaker", "Audio Cables", "Stand"]
  },
  {
    id: 3,
    name: "Smart Home Starter",
    description: "Begin your smart home journey",
    price: 85000,
    originalPrice: 110000,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    items: ["Smart Switch", "Motion Sensor", "Temperature Sensor", "Hub"]
  }
];

const categories = [
  { 
    name: "Sensors & Modules", 
    icon: "🔧", 
    count: "500+ items",
    slug: "sensors-modules",
    subcategories: [
      { name: "Basic Sensors", slug: "basic-sensors" },
      { name: "Environmental & Utility Sensors", slug: "environmental-sensors" },
      { name: "Smart Modules & IoT Boards", slug: "smart-modules" },
      { name: "Display & Control", slug: "display-control" },
      { name: "Motors & Drivers", slug: "motors-drivers" },
      { name: "Power Modules", slug: "power-modules" },
      { name: "Microcontrollers & Boards", slug: "microcontrollers" },
      { name: "DIY Kits", slug: "diy-kits" },
      { name: "Cooling & Fans", slug: "cooling-fans" },
      { name: "Transformers", slug: "transformers" }
    ]
  },
  { 
    name: "Electronics & Components", 
    icon: "⚡", 
    count: "1000+ items",
    slug: "electronics-components",
    subcategories: [
      { name: "Resistors", slug: "resistors" },
      { name: "Capacitors", slug: "capacitors" },
      { name: "Transistors", slug: "transistors" },
      { name: "Diodes & Rectifiers", slug: "diodes-rectifiers" },
      { name: "ICs (Integrated Circuits)", slug: "integrated-circuits" }
    ]
  },
  { 
    name: "Power & Energy Solutions", 
    icon: "🔋", 
    count: "300+ items",
    slug: "power-energy",
    subcategories: [
      { name: "Batteries", slug: "batteries" },
      { name: "Chargers & Power Management", slug: "chargers-power" },
      { name: "Inverters & Solar Systems", slug: "inverters-solar" },
      { name: "Converters and Adapters", slug: "converters-adapters" }
    ]
  },
  { 
    name: "Electrical Tools & Equipment", 
    icon: "🛠️", 
    count: "200+ items",
    slug: "tools-equipment",
    subcategories: [
      { name: "Measurement Tools", slug: "measurement-tools" },
      { name: "Soldering Tools & Accessories", slug: "soldering-tools" },
      { name: "Heat & Rework Tools", slug: "heat-rework-tools" },
      { name: "Battery Welding & Assembly", slug: "battery-welding" },
      { name: "PCB Fabrication & Prototyping", slug: "pcb-fabrication" }
    ]
  },
  { 
    name: "Audio & Sound Systems", 
    icon: "🎵", 
    count: "150+ items",
    slug: "audio-sound",
    subcategories: [
      { name: "Microphones", slug: "microphones" },
      { name: "Sound & Musical Accessories", slug: "sound-accessories" },
      { name: "Home Theater", slug: "home-theater" },
      { name: "Public Address Systems", slug: "pa-systems" }
    ]
  },
  { 
    name: "Electronics Wiring & Connectors", 
    icon: "🔌", 
    count: "400+ items",
    slug: "wiring-connectors",
    subcategories: [
      { name: "Cables & Wires", slug: "cables-wires" },
      { name: "Connectors & Terminals", slug: "connectors-terminals" },
      { name: "Cable Management", slug: "cable-management" }
    ]
  },
  { 
    name: "Home Essentials and Appliances", 
    icon: "🏠", 
    count: "100+ items",
    slug: "home-appliances",
    subcategories: [
      { name: "Kitchen Appliances", slug: "kitchen-appliances" },
      { name: "Home Electronics", slug: "home-electronics" },
      { name: "Gaming & Accessories", slug: "gaming-accessories" }
    ]
  }
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
  },
  {
    id: 4,
    name: "Fatima Ahmed",
    rating: 5,
    comment: "Amazing customer support and fast shipping to Abuja!",
    product: "Smart Home Kit",
    date: "3 days ago"
  },
  {
    id: 5,
    name: "David Okafor",
    rating: 4,
    comment: "Great selection of components. Very satisfied with my purchase.",
    product: "Sensor Bundle",
    date: "1 week ago"
  }
];

const seasonalPromotions = [
  {
    id: 1,
    title: "New Year Electronics Sale",
    subtitle: "Up to 40% off on selected items",
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600",
    cta: "Shop Sale"
  },
  {
    id: 2,
    title: "Back to School Special",
    subtitle: "Student discounts on learning kits",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
    cta: "Get Discount"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
  const { user, loading, signOut } = useAuth();

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

  const toggleCategory = (categorySlug: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categorySlug]: !prev[categorySlug]
    }));
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
            <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-t-lg flex items-center justify-center">
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
              <span className="font-bold text-lg" style={{ color: '#6db33f' }}>
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
                    ? 'hover:bg-green-700 text-white'
                    : 'hover:bg-green-700'
                }`}
                style={{ backgroundColor: '#6db33f' }}
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between bg-green-50 rounded-md p-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCartQuantity(product.id, cartItems[product.id] - 1)}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <span className="font-medium" style={{ color: '#6db33f' }}>{cartItems[product.id]}</span>
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
              <Link href="/" className="text-2xl font-bold" style={{ color: '#6db33f' }}>
                KJ Electronics
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    Welcome, {user.profile?.full_name || user.email}
                  </span>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" style={{ backgroundColor: '#6db33f' }}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {Object.keys(cartItems).length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs" style={{ backgroundColor: '#6db33f' }}>
                      {Object.values(cartItems).reduce((a, b) => a + b, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>
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
                <h2 className="text-xl font-bold" style={{ color: '#6db33f' }}>KJ Electronics</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {!loading && (
                  <div className="flex gap-2">
                    {user ? (
                      <div className="w-full">
                        <p className="text-sm text-gray-700 mb-2">
                          Welcome, {user.profile?.full_name || user.email}
                        </p>
                        <Button onClick={signOut} variant="outline" className="w-full">
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Link href="/auth/login" className="flex-1">
                          <Button className="w-full" style={{ backgroundColor: '#6db33f' }}>
                            Login
                          </Button>
                        </Link>
                        <Link href="/auth/signup" className="flex-1">
                          <Button variant="outline" className="w-full">
                            Signup
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Link href="/track-orders" className="block py-2 text-gray-700 hover:text-green-600">
                    Track Orders
                  </Link>
                  <Link href="/sell" className="block py-2 text-gray-700 hover:text-green-600">
                    Sell on KJ Electronics
                  </Link>
                  <Link href="/stores" className="block py-2 text-gray-700 hover:text-green-600">
                    Physical Stores
                  </Link>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category, index) => (
                      <div key={index}>
                        <div 
                          className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-green-600 cursor-pointer"
                          onClick={() => toggleCategory(category.slug)}
                        >
                          <span>{category.icon} {category.name}</span>
                          {expandedCategories[category.slug] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                        {expandedCategories[category.slug] && (
                          <div className="ml-6 space-y-1">
                            {category.subcategories.map((sub, subIndex) => (
                              <Link
                                key={subIndex}
                                href={`/category/${sub.slug}`}
                                className="block py-1 text-xs text-gray-600 hover:text-green-600"
                              >
                                🔹 {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
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
                    <Button size="sm" style={{ backgroundColor: '#6db33f' }}>Subscribe</Button>
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
              <Button style={{ backgroundColor: '#6db33f' }}>Search</Button>
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
                    <Button size="lg" style={{ backgroundColor: '#6db33f' }} className="hover:bg-green-700">
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
              <Link href="/deals" className="font-medium" style={{ color: '#6db33f' }}>
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
              <Link href="/new-arrivals" className="font-medium" style={{ color: '#6db33f' }}>
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
              {categories.slice(0, 8).map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.slug}`}
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

        {/* Home Appliances */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Home Appliances</h2>
              <Link href="/category/home-appliances" className="font-medium" style={{ color: '#6db33f' }}>
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeAppliances.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Sellers */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Top Sellers</h2>
              <Link href="/top-sellers" className="font-medium" style={{ color: '#6db33f' }}>
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {topSellers.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Bundles */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Bundles</h2>
              <Link href="/bundles" className="font-medium" style={{ color: '#6db33f' }}>
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBundles.map((bundle) => (
                <Card key={bundle.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={bundle.image}
                        alt={bundle.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        Save {formatPrice(bundle.originalPrice - bundle.price)}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{bundle.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{bundle.description}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-xl" style={{ color: '#6db33f' }}>
                          {formatPrice(bundle.price)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(bundle.originalPrice)}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {bundle.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full" style={{ backgroundColor: '#6db33f' }}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add Bundle to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Promotions */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Seasonal Promotions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seasonalPromotions.map((promo) => (
                <Card key={promo.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                        <p className="text-lg mb-4">{promo.subtitle}</p>
                        <Button style={{ backgroundColor: '#6db33f' }} className="hover:bg-green-700">
                          {promo.cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="py-12 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Shop With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyShopWithUs.map((item, index) => (
                <Card key={index} className="text-center border-0 shadow-md">
                  <CardContent className="p-6">
                    <item.icon className="h-12 w-12 mx-auto mb-4" style={{ color: '#6db33f' }} />
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                    <p className="text-gray-700 mb-4 text-sm">"{review.comment}"</p>
                    <div className="text-sm">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-gray-600">{review.product}</p>
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
                className="mt-4 hover:text-green-700"
                style={{ color: '#6db33f' }}
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </Button>
            </div>
            
            {/* Footer Image */}
            <div className="mt-8">
              <Image
                src="/images/carousel/carosel1.jpg"
                alt="KJ Electronics Store"
                width={800}
                height={400}
                className="mx-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#6db33f' }}>KJ Electronics</h3>
              <p className="text-gray-300 mb-4">Nigeria's premier electronics and components marketplace.</p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/track-orders" className="hover:text-white">Track Orders</Link></li>
                <li><Link href="/sell" className="hover:text-white">Sell on KJ Electronics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
                <li><Link href="/warranty" className="hover:text-white">Warranty</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+234 123 456 7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@kjelectronics.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KJ Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-40">
        <div className="grid grid-cols-4 gap-1">
          <Link href="/">
            <Button variant="ghost" className="flex-col h-16 rounded-none">
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" className="flex-col h-16 rounded-none relative">
              <ShoppingCart className="h-5 w-5 mb-1" />
              <span className="text-xs">Cart</span>
              {Object.keys(cartItems).length > 0 && (
                <Badge className="absolute top-2 right-4 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs" style={{ backgroundColor: '#6db33f' }}>
                  {Object.values(cartItems).reduce((a, b) => a + b, 0)}
                </Badge>
              )}
            </Button>
          </Link>
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