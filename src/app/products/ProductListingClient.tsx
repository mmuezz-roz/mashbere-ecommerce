'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/features/ProductCard';
import { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductListingClientProps {
  initialProducts: Product[];
}

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'sip-up', label: 'Sip Up' },
  { value: 'popsicle', label: 'Popsicles' },
  { value: 'pookees', label: 'Pookees' },
  { value: 'equipment', label: 'Equipment' },
];

const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: '2', label: 'SipUp & Pookees' },
  { value: '5', label: 'Popsicles' },
  { value: 'other', label: 'Other' },
];

export default function ProductListingClient({ initialProducts }: ProductListingClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        && !product.description?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedType !== 'all' && product.type !== selectedType) return false;
      if (priceRange !== 'all') {
        const price = product.price;
        if (priceRange === '2' && price !== 2) return false;
        if (priceRange === '5' && price !== 5) return false;
        if (priceRange === 'other' && (price === 2 || price === 5)) return false;
      }
      return true;
    });
  }, [initialProducts, selectedCategory, selectedType, priceRange, searchQuery]);

  const types = useMemo(() => {
    const typeSet = new Set(initialProducts.map(p => p.type).filter(Boolean));
    return Array.from(typeSet) as string[];
  }, [initialProducts]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setPriceRange('all');
  };

  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedType !== 'all',
    priceRange !== 'all',
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.07)] border border-gray-50">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h3 className="font-black text-sm sm:text-base uppercase tracking-widest text-gray-800">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs font-black text-primary hover:text-primary/70 uppercase tracking-widest transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-6 sm:mb-8">
        <h4 className="font-black mb-3 text-[10px] uppercase tracking-[0.3em] text-gray-400">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                selectedCategory === cat.value
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      {types.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h4 className="font-black mb-3 text-[10px] uppercase tracking-[0.3em] text-gray-400">Type</h4>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                selectedType === 'all' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              All Types
            </button>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  selectedType === type ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <h4 className="font-black mb-3 text-[10px] uppercase tracking-[0.3em] text-gray-400">Price Range</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map(range => (
            <button
              key={range.value}
              onClick={() => setPriceRange(range.value)}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                priceRange === range.value ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Internal Backlinks for SEO & Customer Trust */}
      <div className="border-t border-gray-100 pt-5 mt-6 space-y-3">
        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400">Treat Guides</h4>
        <div className="space-y-2.5">
          <Link
            href="/dietary"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <span className="text-sm select-none">🌱</span>
            Dietary & Allergen Guide
          </Link>
          <Link
            href="/delivery"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <span className="text-sm select-none">❄️</span>
            Cold-Chain Delivery Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8">

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100 font-black text-sm text-gray-700 hover:border-primary/30 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        <p className="text-xs text-gray-400 font-bold">
          <span className="text-gray-800 font-black">{filteredProducts.length}</span> products
        </p>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <FilterContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block lg:w-60 xl:w-68 flex-shrink-0">
        <div className="sticky top-28">
          <FilterContent />
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1 min-w-0">
        {/* Desktop result count */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500 font-medium">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[32px] p-8 sm:p-12 text-center border border-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-7 h-7 sm:w-8 sm:h-8 text-gray-300" />
            </div>
            <h3 className="font-black text-lg sm:text-xl mb-2 text-gray-900 uppercase tracking-tight">No matching flavors</h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">Try adjusting your filters to find your perfect treat.</p>
            <button
              onClick={clearFilters}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-primary transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
