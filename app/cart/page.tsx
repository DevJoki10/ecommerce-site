'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, CreditCard, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    name: "Arduino Uno R3",
    price: 15000,
    originalPrice: 20000,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    quantity: 2,
    category: "sensors-modules"
  },
  {
    id: 3,
    name: "1/4W Resistor Kit",
    price: 2500,
    originalPrice: 3000,
    image: null,
    quantity: 1,
    category: "electronics-components"
  },
  {
    id: 7,
    name: "JBL Wireless Microphone",
    price: 35000,
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400",
    quantity: 1,
    category: "audio-sound"
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      'WELCOME10': { discount: 0.1, minAmount: 5000 },
      'NEWUSER20': { discount: 0.2, minAmount: 10000 },
      'BULK50': { discount: 5000, minAmount: 50000, type: 'fixed' }
    };

    const coupon = validCoupons[couponCode as keyof typeof validCoupons];
    if (coupon && subtotal >= coupon.minAmount) {
      setAppliedCoupon({ code: couponCode, discount: coupon.type === 'fixed' ? coupon.discount : coupon.discount });
      setCouponCode('');
    } else {
      alert('Invalid coupon code or minimum amount not met');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? 
    (appliedCoupon.discount < 1 ? subtotal * appliedCoupon.discount : appliedCoupon.discount) : 0;
  const deliveryFee = subtotal > 50000 ? 0 : 2500;
  const total = subtotal - discount + deliveryFee;

  const CartItemCard = ({ item }: { item: any }) => {
    const isElectronicsComponent = item.category === 'electronics-components';

    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {item.image && !isElectronicsComponent ? (
              <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <p className="text-xs text-gray-600">Component</p>
                </div>
              </div>
            )}

            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-lg" style={{ color: '#6db33f' }}>
                  {formatPrice(item.price)}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-3 py-1 font-medium min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Shopping Cart ({cartItems.length})</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Link href="/">
              <Button style={{ backgroundColor: '#6db33f' }} className="hover:bg-green-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
              
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}

              {/* Coupon Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Apply Coupon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={applyCoupon}
                      style={{ backgroundColor: '#6db33f' }}
                      className="hover:bg-green-700"
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 p-2 bg-green-50 rounded-md">
                      <p className="text-sm text-green-700">
                        Coupon "{appliedCoupon.code}" applied! 
                        {appliedCoupon.discount < 1 
                          ? ` ${(appliedCoupon.discount * 100)}% discount`
                          : ` ${formatPrice(appliedCoupon.discount)} off`
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      Delivery Fee
                    </span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <p className="text-xs text-gray-600">
                      Free delivery on orders over {formatPrice(50000)}
                    </p>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span style={{ color: '#6db33f' }}>{formatPrice(total)}</span>
                  </div>

                  <Link href="/checkout">
                    <Button 
                      className="w-full text-lg py-6"
                      style={{ backgroundColor: '#6db33f' }}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Fast Delivery</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}