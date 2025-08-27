'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Grid, List, Filter, Star, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

// Mock category data
const categoryData = {
  'sensors-modules': {
    name: 'Sensors & Modules',
    description: 'Electronic sensors, modules, and IoT components for your projects',
    products: [
      {
        id: 1,
        name: "Arduino Uno R3",
        price: 15000,
        originalPrice: 20000,
        discount: 25,
        image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
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
        category: "sensors-modules"
      },
      {
        id: 5,
        name: "DHT22 Temperature Sensor",
        price: 8000,
        image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.5,
        category: "sensors-modules"
      },
      {
        id: 4,
        name: "ESP32 Development Board",
        price: 12000,
        originalPrice: 15000,
        discount: 20,
        image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        category: "sensors-modules"
      }
    ]
  },
  'electronics-components': {
    name: 'Electronics & Components',
    description: 'Basic electronic components like resistors, capacitors, and ICs',
    products: [
      {
        id: 3,
        name: "1/4W Resistor Kit (100 pieces)",
        price: 2500,
        originalPrice: 3000,
        discount: 17,
        image: null,
        rating: 4.7,
        category: "electronics-components"
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
        id: 15,
        name: "2W Metal Film Resistor 10Ω",
        price: 150,
        image: null,
        rating: 4.5,
        category: "electronics-components"
      },
      {
        id: 16,
        name: "Transistor Assortment Kit (NPN/PNP)",
        price: 3500,
        image: null,
        rating: 4.6,
        category: "electronics-components"
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
      },
      {
        id: 19,
        name: "IC Socket Kit (8-40 pin)",
        price: 3200,
        image: null,
        rating: 4.6,
        category: "electronics-components"
      },
      {
        id: 20,
        name: "LED Assortment Kit (200pcs)",
        price: 2200,
        image: null,
        rating: 4.8,
        category: "electronics-components"
      }
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});

  const category = categoryData[params.slug as keyof typeof categoryData];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link href="/">
            <Button style={{ backgroundColor: '#6db33f' }}>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

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

  const ProductCard = ({ product, isListView = false }: { product: any, isListView?: boolean }) => {
    const isInCart = cartItems[product.id] > 0;
    const isElectronicsComponent = product.category === 'electronics-components';

    if (isListView) {
      return (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {product.image && !isElectronicsComponent ? (
                <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-center">
                    <div className="text-3xl mb-1">⚡</div>
                    <p className="text-xs text-gray-600">Component</p>
                  </div>
                </div>
              )}

              <div className="flex-1">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-green-600">{product.name}</h3>
                </Link>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-xl" style={{ color: '#6db33f' }}>
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <Badge className="bg-red-500 hover:bg-red-600">
                        -{product.discount}%
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {!isInCart ? (
                  <Button
                    onClick={() => addToCart(product.id)}
                    style={{ backgroundColor: '#6db33f' }}
                    className="hover:bg-green-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 bg-green-50 rounded-md p-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(product.id, cartItems[product.id] - 1)}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="font-medium px-2" style={{ color: '#6db33f' }}>{cartItems[product.id]}</span>
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
                
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
        <CardContent className="p-0">
          {product.image && !isElectronicsComponent ? (
            <div className="relative overflow-hidden rounded-t-lg">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
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
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-green-600">{product.name}</h3>
            </Link>
            
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

            {!isInCart ? (
              <Button
                onClick={() => addToCart(product.id)}
                className="w-full hover:bg-green-700"
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href="/" className="text-2xl font-bold" style={{ color: '#6db33f' }}>
                KJ Electronics
              </Link>
            </div>
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
          <p className="text-sm text-gray-500 mt-2">{category.products.length} products found</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold">Filters</h3>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Customer Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRatings([...selectedRatings, rating]);
                            } else {
                              setSelectedRatings(selectedRatings.filter(r => r !== rating));
                            }
                          }}
                        />
                        <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-gray-600">& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 100000]);
                    setSelectedRatings([]);
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    style={{ backgroundColor: viewMode === 'grid' ? '#6db33f' : undefined }}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    style={{ backgroundColor: viewMode === 'list' ? '#6db33f' : undefined }}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div>
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} isListView />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button style={{ backgroundColor: '#6db33f' }}>1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}