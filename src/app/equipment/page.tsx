import { ProductService } from '@/services/server/productService';
import { ProductCard } from '@/components/features';
import EquipmentInquiryForm from './EquipmentInquiryForm';
import { Quote } from 'lucide-react';

/**
 * Equipment Page (Server Component)
 * Fetches B2B equipment products on the server for optimal performance.
 */
export default async function EquipmentPage() {
  const equipment = await ProductService.getProductsByCategory('equipment');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              Empower Your <span className="text-primary italic">Business</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              From commercial freezers to mobile kiosks, we provide the best-in-class equipment
              to help you start and grow your ice cream business in the UAE.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2"
              >
                <Quote className="w-5 h-5" />
                Get a Quote
              </a>
              <a
                href="#products"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all"
              >
                View Catalog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-12">
          B2B Product <span className="text-primary">Catalog</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Contact Form — extracted to its own Client Component */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EquipmentInquiryForm />
      </section>
    </div>
  );
}
