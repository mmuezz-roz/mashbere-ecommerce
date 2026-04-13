'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { ProductCard } from '@/components/features/ProductCard';
import { Product } from '@/types';

interface ProductListingClientProps {
  initialProducts: Product[];
}

export default function ProductListingClient({ initialProducts }: ProductListingClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedType !== 'all' && product.type !== selectedType) return false;
      
      if (priceRange !== 'all') {
        const price = product.price;
        if (priceRange === 'under-5' && price >= 5) return false;
        if (priceRange === '5-10' && (price < 5 || price > 10)) return false;
        if (priceRange === '10-100' && (price < 10 || price > 100)) return false;
        if (priceRange === 'over-100' && price <= 100) return false;
      }
      return true;
    });
  }, [initialProducts, selectedCategory, selectedType, priceRange]);

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

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Filters Toggle Button (Mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-200"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Filters Sidebar */}
      <aside className={`
        lg:block lg:w-64 xl:w-72 flex-shrink-0
        ${showFilters ? 'block' : 'hidden'}
      `}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-primary hover:text-primary/80 font-medium">
                Clear all
              </button>
            )}
          </div>

          {/* Category Section */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-gray-400">Category</h4>
            <div className="space-y-3">
              {['all', 'sip-up', 'ice-cream', 'popsicle', 'equipment'].map(category => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 capitalize">
                    {category === 'all' ? 'All Products' : category.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Section */}
          {types.length > 0 && (
            <div className="mb-8">
              <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-gray-400">Type</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    checked={selectedType === 'all'}
                    onChange={() => setSelectedType('all')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">All Types</span>
                </label>
                {types.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Section */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-gray-400">Price Range</h4>
            <div className="space-y-3">
              {[
                { value: 'all', label: 'All Prices' },
                { value: 'under-5', label: 'Under AED 5' },
                { value: '5-10', label: 'AED 5 - AED 10' },
                { value: '10-100', label: 'AED 10 - AED 100' },
                { value: 'over-100', label: 'Over AED 100' },
              ].map(range => (
                <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    checked={priceRange === range.value}
                    onChange={() => setPriceRange(range.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Products Grid Area */}
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
          <p>Showing <strong>{filteredProducts.length}</strong> products</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">No matching flavors</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to find your perfect treat.</p>
            <button
              onClick={clearFilters}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
