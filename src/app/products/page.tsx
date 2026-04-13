import { Suspense } from 'react';
import { ProductService } from '@/services/server/productService';
import ProductListingClient from './ProductListingClient';

/**
 * Product Listing Page (Server Component)
 * Handles initial sequence of data fetching on the server.
 */
export default async function ProductListingPage() {
  // Pre-fetch all products on the server
  const products = await ProductService.getAllProducts();

  return (
    <div className="min-h-screen bg-[#FDFCFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display mb-4 uppercase tracking-tighter">
            Our Premium <span className="text-primary">Collection</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl font-medium max-w-2xl">
            Experience the pinnacle of artisanal frozen treats and professional equipment.
          </p>
        </div>

        <Suspense fallback={<div>Loading filters and products...</div>}>
          <ProductListingClient initialProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}
