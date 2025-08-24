'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowLeft, 
  Shield, 
  Truck, 
  Share2,
  Plus,
  Minus
} from 'lucide-react';

// Mock product data - in real app, this would come from API/database
const getProductById = (id: string) => {
  const products = {
    '1': {
      id: '1',
      name: 'Arduino Uno R3 Development Board',
      price: 15000,
      originalPrice: 20000,
      discount: 25,
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      reviewCount: 156,
      category: 'sensors-modules',
      inStock: true,
      stockCount: 45,
      description: 'The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.',
      keyFeatures: [
        'ATmega328P microcontroller',
        '14 digital I/O pins (6 PWM outputs)',
        '6 analog input pins',
        '16 MHz crystal oscillator',
        'USB connection for programming',
        'Power jack (7-12V recommended)',
        'ICSP header for direct programming',
        'Reset button'
      ],
      specifications: {
        'Microcontroller': 'ATmega328P',
        'Operating Voltage': '5V',
        'Input Voltage (recommended)': '7-12V',
        'Input Voltage (limit)': '6-20V',
        'Digital I/O Pins': '14 (6 PWM)',
        'Analog Input Pins': '6',
        'DC Current per I/O Pin': '20 mA',
        'DC Current for 3.3V Pin': '50 mA',
        'Flash Memory': '32 KB (0.5 KB bootloader)',
        'SRAM': '2 KB',
        'EEPROM': '1 KB',
        'Clock Speed': '16 MHz',
        'Length': '68.6 mm',
        'Width': '53.4 mm',
        'Weight': '25 g'
      },
      applications: [
        'IoT projects and prototyping',
        'Educational electronics learning',
        'Home automation systems',
        'Robotics and motor control',
        'Sensor data acquisition',
        'LED lighting projects',
        'Temperature monitoring',
        'Security systems'
      ],
      usage: [
        'Connect to computer via USB cable',
        'Install Arduino IDE software',
        'Select Arduino Uno board type',
        'Write or load your sketch code',
        'Upload code to the board',
        'Connect sensors and components',
        'Power via USB or external adapter',
        'Monitor serial output if needed'
      ],
      cautions: [
        'Do not exceed input voltage limits (6-20V)',
        'Avoid short circuits on I/O pins',
        'Use proper current limiting resistors',
        'Disconnect power when wiring',
        'Handle with care to avoid static damage',
        'Do not reverse polarity on power connections',
        'Keep away from moisture and extreme temperatures',
        'Use genuine Arduino boards for best compatibility'
      ]
    },
    '3': {
      id: '3',
      name: '1/4W Resistor Kit (100 pieces)',
      price: 2500,
      originalPrice: 3000,
      discount: 17,
      image: null,
      rating: 4.7,
      reviewCount: 89,
      category: 'electronics-components',
      inStock: true,
      stockCount: 120,
      description: 'Complete assortment of 1/4W carbon film resistors ranging from 0.20Ω to 910kΩ. Perfect for electronics projects, repairs, and prototyping. Each resistor is color-coded for easy identification.',
      keyFeatures: [
        '100 pieces assorted resistor kit',
        '1/4W power rating',
        'Carbon film construction',
        'Color-coded for easy identification',
        '±5% tolerance',
        'Wide resistance range (0.20Ω - 910kΩ)',
        'Suitable for breadboard use',
        'Lead-free construction'
      ],
      specifications: {
        'Power Rating': '1/4W (0.25W)',
        'Tolerance': '±5%',
        'Temperature Coefficient': '±200 ppm/°C',
        'Operating Temperature': '-55°C to +155°C',
        'Resistance Range': '0.20Ω to 910kΩ',
        'Construction': 'Carbon Film',
        'Lead Material': 'Tinned Copper',
        'Body Length': '6.5mm ±0.5mm',
        'Body Diameter': '2.3mm ±0.3mm',
        'Lead Diameter': '0.6mm ±0.05mm',
        'Lead Length': '28mm ±3mm',
        'Packaging': 'Bulk pack with value list'
      },
      applications: [
        'Electronic circuit prototyping',
        'Current limiting applications',
        'Voltage divider circuits',
        'Pull-up and pull-down resistors',
        'LED current limiting',
        'Analog signal conditioning',
        'Filter circuits',
        'Amplifier biasing'
      ],
      usage: [
        'Identify resistance value using color code',
        'Check polarity (resistors are non-polar)',
        'Insert into breadboard or PCB',
        'Solder connections if permanent',
        'Verify resistance with multimeter',
        'Ensure power rating is adequate',
        'Use appropriate safety margins',
        'Store unused resistors properly'
      ],
      cautions: [
        'Do not exceed 1/4W power rating',
        'Avoid overheating during soldering',
        'Check resistance value before use',
        'Use proper wattage for your application',
        'Handle leads carefully to avoid breakage',
        'Store in dry environment',
        'Avoid mechanical stress on body',
        'Double-check connections in critical circuits'
      ]
    }
  };
  
  return products[id as keyof typeof products] || null;
};

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('details');
  const [isSaved, setIsSaved] = useState(false);
  
  const product = getProductById(params.id as string);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isElectronicsComponent = product.category === 'electronics-components';
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
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
              <Link href="/" className="text-2xl font-bold text-blue-600">
                <span style={{ color: '#6db33f' }}>KJ Electronics</span>
              </Link>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              {product.image && !isElectronicsComponent ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">⚡</div>
                    <p className="text-xl text-gray-600 font-medium">Electronics Component</p>
                    <p className="text-gray-500 mt-2">High Quality Guaranteed</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-lg font-medium ml-2">{product.rating}</span>
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold" style={{ color: '#6db33f' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge className="bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                      -{product.discount}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-gray-600">({product.stockCount} available)</span>
                </div>
              </div>

              {/* Quality Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Product Quality</span>
                    <span className="text-sm font-medium text-blue-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Delivery Time</span>
                    <span className="text-sm font-medium text-green-600">66%</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className={`w-full text-lg py-6 ${
                    isElectronicsComponent 
                      ? 'hover:bg-green-700' 
                      : 'hover:bg-green-700'
                  }`}
                  style={{ backgroundColor: '#6db33f' }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - {formatPrice(product.price * quantity)}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  {isSaved ? 'Saved for Later' : 'Save for Later'}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 rounded-none border-b">
              <TabsTrigger value="details" className="rounded-none">Details</TabsTrigger>
              <TabsTrigger value="features" className="rounded-none">Key Features</TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none">Specifications</TabsTrigger>
              <TabsTrigger value="applications" className="rounded-none">Applications</TabsTrigger>
              <TabsTrigger value="usage" className="rounded-none">Usage</TabsTrigger>
              <TabsTrigger value="caution" className="rounded-none">Caution</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="details" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl">Product Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.description}
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Quality Assurance</h4>
                        <p className="text-blue-800 text-sm">
                          All our products undergo rigorous quality testing to ensure they meet international standards.
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Warranty</h4>
                        <p className="text-green-800 text-sm">
                          Backed by manufacturer warranty and our 30-day return policy for your peace of mind.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {product.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specs" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl">Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700">{key}:</span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl">Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.applications.map((application, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{application}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl">Usage Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {product.usage.map((step, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="caution" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600">Safety Precautions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-800 font-medium mb-2">⚠️ Important Safety Information</p>
                      <p className="text-red-700 text-sm">
                        Please read and follow all safety precautions to avoid damage to the product or injury.
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {product.cautions.map((caution, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{caution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}