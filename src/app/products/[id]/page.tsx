import { ProductService } from '@/services/server/productService';
import { ProductCard } from '@/components/features';
import ProductDetailsClient from './ProductDetailsClient';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Product Details Page (Server Component)
 * Fetches product and related data on the server for best performance and SEO.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  // Data fetching on the server
  const [product, relatedProducts] = await Promise.all([
    ProductService.getProductById(id),
    ProductService.getRelatedProducts(id)
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Interactive Client Section */}
        <ProductDetailsClient product={product} />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8 px-4">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
