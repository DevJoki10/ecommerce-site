import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { TrustBadges } from './components/TrustBadges';
import { LiveChat } from './components/LiveChat';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

      <Header />
      <CategoryNav />
      <HeroSection />
      <FilterBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ProductGrid />
      </main>

      <TrustBadges />
      <Footer />
      <Cart />
      <LiveChat />
    </div>
  );
}

export default App;
