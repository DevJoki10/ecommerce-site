import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';

export const FilterBar = () => {
  const { sortBy, setSortBy } = useStore();

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <SlidersHorizontal size={20} />
            <span className="font-medium">Filter & Sort</span>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { value: 'featured', label: 'Featured' },
              { value: 'newest', label: 'Newest' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'rating', label: 'Top Rated' },
            ].map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  sortBy === option.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
