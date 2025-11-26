# ShopHub - Modern E-Commerce Platform

A professional, mobile-first e-commerce platform built with React, TypeScript, Vite, Supabase, and Tailwind CSS. Features a stunning UI with animations, advanced search, filtering, shopping cart, and trust-building elements.

## Features

### 1. Modern User Experience
- Mobile-first responsive design optimized for all devices
- Smooth animations and micro-interactions with Framer Motion
- No horizontal overflow issues
- Intuitive navigation with sticky headers
- Professional color scheme avoiding purple/indigo tones

### 2. Advanced Search & Filtering
- Real-time product search across name, description, and brand
- Category-based filtering
- Multiple sort options: Featured, Newest, Price (Low to High), Price (High to Low), Top Rated
- Dynamic product grid with animated transitions

### 3. Shopping Experience
- Interactive product cards with hover effects
- Add to cart with instant feedback
- Wishlist functionality
- Shopping cart sidebar with quantity management
- Product ratings and review counts
- Sale badges and discount percentages
- Stock management

### 4. Trust-Building Features
- Trust badges (Secure Payment, Fast Delivery, 24/7 Support, Quality Guarantee)
- Customer reviews and ratings system
- Live chat support widget
- Verified purchase badges
- Money-back guarantee messaging

### 5. Database & Backend
- Supabase PostgreSQL database with Row Level Security
- Complete schema with products, categories, reviews, cart, orders
- Optimized queries with indexes
- Real-time updates capability
- Secure authentication ready

### 6. SEO Optimized
- Proper meta tags for search engines
- Open Graph tags for social sharing
- Twitter Card integration
- Semantic HTML structure
- Performance optimized

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (environment variables are pre-configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Environment variables are already configured in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. The database schema is already set up with sample data including:
   - 6 categories (Electronics, Fashion, Home & Living, Beauty, Sports, Books)
   - 14+ sample products
   - Complete e-commerce tables structure

4. Start development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Main navigation with search
│   ├── CategoryNav.tsx     # Category filter navigation
│   ├── HeroSection.tsx     # Hero banner with animations
│   ├── FilterBar.tsx       # Sort options
│   ├── ProductGrid.tsx     # Product listing with filtering
│   ├── ProductCard.tsx     # Individual product card
│   ├── Cart.tsx            # Shopping cart sidebar
│   ├── TrustBadges.tsx     # Trust-building elements
│   ├── LiveChat.tsx        # Live support widget
│   └── Footer.tsx          # Footer with links
├── lib/
│   └── supabase.ts         # Supabase client configuration
├── store/
│   └── useStore.ts         # Zustand state management
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles with Tailwind

```

## Database Schema

### Tables
- **categories**: Product categories with hierarchical support
- **products**: Product catalog with pricing, stock, ratings
- **reviews**: Customer reviews with ratings and verification
- **cart_items**: Shopping cart management
- **wishlists**: User wishlists
- **orders**: Order history and tracking
- **order_items**: Individual items in orders
- **user_profiles**: Extended user information

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access for products and categories
- User-specific access for cart, orders, and reviews
- Authenticated user policies for data protection

## Key Features Implementation

### Mobile Optimization
- Uses `overflow-x-hidden` at multiple levels
- Responsive breakpoints: mobile-first approach
- Touch-friendly interface elements
- Maximum viewport scale to prevent zoom issues

### Animations
- Page load animations
- Product card hover effects
- Cart slide-in transitions
- Scroll-triggered animations
- Button press feedback
- Loading states

### Performance
- Code splitting ready
- Optimized images with Pexels stock photos
- Lazy loading support
- Efficient state management
- Build output: ~534KB (minified)

## Future Enhancements

Ready for integration:
- Stripe payment processing
- User authentication with Supabase Auth
- Product detail pages
- Advanced review system
- Order tracking
- Email notifications
- Analytics integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
