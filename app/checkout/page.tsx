'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, Mail, User, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Arduino Uno R3",
    price: 15000,
    quantity: 2,
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "sensors-modules"
  },
  {
    id: 3,
    name: "1/4W Resistor Kit",
    price: 2500,
    quantity: 1,
    image: null,
    category: "electronics-components"
  }
];

// WhatsApp notification function
const sendWhatsAppNotification = async (orderData: any) => {
  const ADMIN_PHONE = "+2348123456789"; // Replace with actual admin WhatsApp number
  const API_KEY = "your_callmebot_api_key"; // Replace with actual API key
  
  const message = `New order from ${orderData.customerName} (${orderData.whatsappNumber}):
${orderData.items.map((item: any) => `- ${item.quantity} × ${item.name} – ₦${item.price.toLocaleString()} each`).join('\n')}
Delivery Fee: ₦${orderData.deliveryFee.toLocaleString()}
Total: ₦${orderData.total.toLocaleString()}`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encodedMessage}&apikey=${API_KEY}`;

  try {
    await fetch(url, { method: 'GET' });
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
  }
};

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Info
    fullName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    
    // Billing Address
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    
    // Shipping Address
    sameAsBilling: true,
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    
    // Payment & Delivery
    paymentMethod: 'card',
    deliveryMethod: 'standard',
    notes: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + deliveryFee;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmDelivery = async () => {
    // Prepare order data for WhatsApp notification
    const orderData = {
      customerName: formData.fullName,
      whatsappNumber: formData.whatsappNumber,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      deliveryFee,
      total
    };

    // Send WhatsApp notification silently
    await sendWhatsAppNotification(orderData);
    
    // Proceed to next step
    setStep(4);
  };

  const OrderSummaryCard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.image && item.category !== 'electronics-components' ? (
              <div className="w-12 h-12 relative rounded overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium" style={{ color: '#6db33f' }}>
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span style={{ color: '#6db33f' }}>{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cart
                </Button>
              </Link>
              <Link href="/" className="text-2xl font-bold" style={{ color: '#6db33f' }}>
                KJ Electronics
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Information', icon: User },
              { step: 2, title: 'Shipping', icon: Truck },
              { step: 3, title: 'Payment', icon: CreditCard },
              { step: 4, title: 'Complete', icon: CheckCircle }
            ].map(({ step: stepNum, title, icon: Icon }) => (
              <div key={stepNum} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNum ? 'text-white' : 'bg-gray-200 text-gray-600'
                }`} style={{ backgroundColor: step >= stepNum ? '#6db33f' : undefined }}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 font-medium ${step >= stepNum ? 'text-green-600' : 'text-gray-600'}`}>
                  {title}
                </span>
                {stepNum < 4 && <div className="w-16 h-0.5 bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
                      <Input
                        id="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billingAddress">Billing Address *</Label>
                    <Textarea
                      id="billingAddress"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      placeholder="Enter your full address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City *</Label>
                      <Input
                        id="billingCity"
                        value={formData.billingCity}
                        onChange={(e) => handleInputChange('billingCity', e.target.value)}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingState">State *</Label>
                      <Input
                        id="billingState"
                        value={formData.billingState}
                        onChange={(e) => handleInputChange('billingState', e.target.value)}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingPostalCode">Postal Code</Label>
                      <Input
                        id="billingPostalCode"
                        value={formData.billingPostalCode}
                        onChange={(e) => handleInputChange('billingPostalCode', e.target.value)}
                        placeholder="Postal Code"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => setStep(2)} 
                    className="w-full"
                    style={{ backgroundColor: '#6db33f' }}
                    disabled={!formData.fullName || !formData.email || !formData.phone || !formData.whatsappNumber || !formData.billingAddress}
                  >
                    Continue to Shipping
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onCheckedChange={(checked) => handleInputChange('sameAsBilling', checked as boolean)}
                    />
                    <Label htmlFor="sameAsBilling">Same as billing address</Label>
                  </div>

                  {!formData.sameAsBilling && (
                    <>
                      <div>
                        <Label htmlFor="shippingAddress">Shipping Address *</Label>
                        <Textarea
                          id="shippingAddress"
                          value={formData.shippingAddress}
                          onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                          placeholder="Enter shipping address"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="shippingCity">City *</Label>
                          <Input
                            id="shippingCity"
                            value={formData.shippingCity}
                            onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                            placeholder="City"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingState">State *</Label>
                          <Input
                            id="shippingState"
                            value={formData.shippingState}
                            onChange={(e) => handleInputChange('shippingState', e.target.value)}
                            placeholder="State"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingPostalCode">Postal Code</Label>
                          <Input
                            id="shippingPostalCode"
                            value={formData.shippingPostalCode}
                            onChange={(e) => handleInputChange('shippingPostalCode', e.target.value)}
                            placeholder="Postal Code"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <Label>Delivery Method</Label>
                    <RadioGroup 
                      value={formData.deliveryMethod} 
                      onValueChange={(value) => handleInputChange('deliveryMethod', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-gray-600">3-5 business days</p>
                            </div>
                            <p className="font-medium">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-gray-600">1-2 business days</p>
                            </div>
                            <p className="font-medium">{formatPrice(5000)}</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={() => setStep(3)} 
                      className="flex-1"
                      style={{ backgroundColor: '#6db33f' }}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit/Debit Card</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>Bank Transfer</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>Cash on Delivery</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any special instructions for your order"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleConfirmDelivery}
                      className="flex-1"
                      style={{ backgroundColor: '#6db33f' }}
                    >
                      Confirm Delivery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4" style={{ color: '#6db33f' }} />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your order. We've received your request and will contact you shortly to confirm delivery details.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <p>Order Number: #KJ{Date.now()}</p>
                    <p>We'll send updates to: {formData.email}</p>
                    <p>WhatsApp notifications: {formData.whatsappNumber}</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link href="/">
                      <Button style={{ backgroundColor: '#6db33f' }}>
                        Continue Shopping
                      </Button>
                    </Link>
                    <Button variant="outline">
                      Track Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummaryCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}