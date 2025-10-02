'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Grid3X3 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const categories = [
  { 
    name: "Sensors & Modules", 
    icon: "🔧", 
    count: "500+ items",
    slug: "sensors-modules",
    subcategories: [
      { name: "Basic Sensors", slug: "basic-sensors", items: ["Temperature Sensors", "Pressure Sensors", "Motion Sensors", "Light Sensors"] },
      { name: "Environmental & Utility Sensors", slug: "environmental-sensors", items: ["Air Quality", "Humidity", "Gas Sensors", "Water Sensors"] },
      { name: "Smart Modules & IoT Boards", slug: "smart-modules", items: ["WiFi Modules", "Bluetooth", "LoRa Modules", "GSM Modules"] },
      { name: "Display & Control", slug: "display-control", items: ["LCD Displays", "OLED", "Touch Screens", "Keypads"] },
      { name: "Motors & Drivers", slug: "motors-drivers", items: ["Servo Motors", "Stepper Motors", "DC Motors", "Motor Drivers"] },
      { name: "Power Modules", slug: "power-modules", items: ["Voltage Regulators", "Buck Converters", "Boost Converters", "Power Supplies"] },
      { name: "Microcontrollers & Boards", slug: "microcontrollers", items: ["Arduino", "Raspberry Pi", "ESP32", "STM32"] },
      { name: "DIY Kits", slug: "diy-kits", items: ["Starter Kits", "Learning Kits", "Project Kits", "Educational Sets"] }
    ]
  },
  { 
    name: "Electronics & Components", 
    icon: "⚡", 
    count: "1000+ items",
    slug: "electronics-components",
    subcategories: [
      { name: "Resistors", slug: "resistors", items: ["Carbon Film", "Metal Film", "Wire Wound", "Variable Resistors"] },
      { name: "Capacitors", slug: "capacitors", items: ["Electrolytic", "Ceramic", "Tantalum", "Film Capacitors"] },
      { name: "Transistors", slug: "transistors", items: ["NPN Transistors", "PNP Transistors", "MOSFETs", "JFETs"] },
      { name: "Diodes & Rectifiers", slug: "diodes-rectifiers", items: ["Signal Diodes", "Power Diodes", "Zener Diodes", "LEDs"] },
      { name: "ICs (Integrated Circuits)", slug: "integrated-circuits", items: ["Operational Amplifiers", "Logic Gates", "Microcontrollers", "Memory ICs"] }
    ]
  },
  { 
    name: "Power & Energy Solutions", 
    icon: "🔋", 
    count: "300+ items",
    slug: "power-energy",
    subcategories: [
      { name: "Batteries", slug: "batteries", items: ["Lithium Ion", "Lead Acid", "NiMH", "Alkaline"] },
      { name: "Chargers & Power Management", slug: "chargers-power", items: ["Battery Chargers", "Power Banks", "UPS Systems", "Solar Chargers"] },
      { name: "Inverters & Solar Systems", slug: "inverters-solar", items: ["Pure Sine Wave", "Modified Sine Wave", "Solar Panels", "Charge Controllers"] },
      { name: "Converters and Adapters", slug: "converters-adapters", items: ["DC-DC Converters", "AC-DC Adapters", "USB Chargers", "Power Adapters"] }
    ]
  },
  { 
    name: "Electrical Tools & Equipment", 
    icon: "🛠️", 
    count: "200+ items",
    slug: "tools-equipment",
    subcategories: [
      { name: "Measurement Tools", slug: "measurement-tools", items: ["Multimeters", "Oscilloscopes", "Function Generators", "Power Supplies"] },
      { name: "Soldering Tools & Accessories", slug: "soldering-tools", items: ["Soldering Irons", "Soldering Stations", "Solder Wire", "Flux"] },
      { name: "Heat & Rework Tools", slug: "heat-rework-tools", items: ["Heat Guns", "Rework Stations", "Desoldering Tools", "Hot Air Stations"] },
      { name: "PCB Fabrication & Prototyping", slug: "pcb-fabrication", items: ["Breadboards", "Perfboards", "PCB Design", "Etching Kits"] }
    ]
  },
  { 
    name: "Audio & Sound Systems", 
    icon: "🎵", 
    count: "150+ items",
    slug: "audio-sound",
    subcategories: [
      { name: "Microphones", slug: "microphones", items: ["Dynamic Mics", "Condenser Mics", "Wireless Mics", "Lavalier Mics"] },
      { name: "Sound & Musical Accessories", slug: "sound-accessories", items: ["Speakers", "Amplifiers", "Audio Cables", "Mixers"] },
      { name: "Home Theater", slug: "home-theater", items: ["Surround Sound", "Soundbars", "Subwoofers", "AV Receivers"] },
      { name: "Public Address Systems", slug: "pa-systems", items: ["PA Speakers", "Wireless Systems", "Conference Systems", "Installation"] }
    ]
  },
  { 
    name: "Electronics Wiring & Connectors", 
    icon: "🔌", 
    count: "400+ items",
    slug: "wiring-connectors",
    subcategories: [
      { name: "Cables & Wires", slug: "cables-wires", items: ["Hookup Wire", "Coaxial Cable", "Ethernet Cable", "Power Cables"] },
      { name: "Connectors & Terminals", slug: "connectors-terminals", items: ["USB Connectors", "Audio Jacks", "Terminal Blocks", "Pin Headers"] },
      { name: "Cable Management", slug: "cable-management", items: ["Cable Ties", "Heat Shrink", "Cable Sleeves", "Wire Nuts"] }
    ]
  },
  { 
    name: "Home Essentials and Appliances", 
    icon: "🏠", 
    count: "100+ items",
    slug: "home-appliances",
    subcategories: [
      { name: "Kitchen Appliances", slug: "kitchen-appliances", items: ["Microwaves", "Air Fryers", "Blenders", "Coffee Makers"] },
      { name: "Home Electronics", slug: "home-electronics", items: ["Smart TVs", "Sound Systems", "Smart Home", "Security Systems"] },
      { name: "Gaming & Accessories", slug: "gaming-accessories", items: ["Gaming Consoles", "Controllers", "Gaming Headsets", "Gaming Chairs"] }
    ]
  }
];

export default function CategoryMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setActiveCategory(null);
      }, 200);
    }
  };

  const handleCategoryHover = (categorySlug: string) => {
    if (!isMobile) {
      setActiveCategory(categorySlug);
    }
  };

  const toggleMobileCategory = (categorySlug: string) => {
    if (isMobile) {
      setActiveCategory(activeCategory === categorySlug ? null : categorySlug);
    }
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveCategory(null);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Desktop/Mobile Toggle Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50"
        onClick={isMobile ? toggleMobileMenu : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Grid3X3 className="h-5 w-5" />
        <span className="font-medium">Shop by Category</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Desktop Mega Menu */}
      {!isMobile && isOpen && (
        <div
          className="absolute top-full left-0 w-screen max-w-6xl bg-white border border-gray-200 shadow-xl z-50 rounded-b-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex">
            {/* Categories Sidebar */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">All Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <div
                    key={category.slug}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      activeCategory === category.slug
                        ? 'bg-green-100 text-green-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onMouseEnter={() => handleCategoryHover(category.slug)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{category.name}</p>
                        <p className="text-xs text-gray-500">{category.count}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Subcategories Content */}
            <div className="flex-1 p-6">
              {activeCategory ? (
                <div>
                  {(() => {
                    const category = categories.find(cat => cat.slug === activeCategory);
                    if (!category) return null;
                    
                    return (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.count}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.slug} className="space-y-3">
                              <Link
                                href={`/category/${subcategory.slug}`}
                                className="font-semibold text-green-600 hover:text-green-700 block"
                              >
                                {subcategory.name}
                              </Link>
                              <ul className="space-y-2">
                                {subcategory.items.map((item, index) => (
                                  <li key={index}>
                                    <Link
                                      href={`/category/${subcategory.slug}?filter=${encodeURIComponent(item)}`}
                                      className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                                    >
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <Link
                            href={`/category/${category.slug}`}
                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                          >
                            View All {category.name}
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Grid3X3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Hover over a category to see subcategories</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Accordion Menu */}
      {isMobile && isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-50 rounded-b-lg max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">All Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.slug} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                    onClick={() => toggleMobileCategory(category.slug)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{category.name}</p>
                        <p className="text-xs text-gray-500">{category.count}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        activeCategory === category.slug ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {activeCategory === category.slug && (
                    <div className="border-t border-gray-200 p-3 bg-gray-50">
                      <div className="space-y-3">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.slug}>
                            <Link
                              href={`/category/${subcategory.slug}`}
                              className="font-medium text-green-600 hover:text-green-700 block mb-2"
                              onClick={() => setIsOpen(false)}
                            >
                              {subcategory.name}
                            </Link>
                            <div className="grid grid-cols-2 gap-1 ml-2">
                              {subcategory.items.slice(0, 4).map((item, index) => (
                                <Link
                                  key={index}
                                  href={`/category/${subcategory.slug}?filter=${encodeURIComponent(item)}`}
                                  className="text-xs text-gray-600 hover:text-green-600 py-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  • {item}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-2 border-t border-gray-200">
                          <Link
                            href={`/category/${category.slug}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            View All {category.name} →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}