import { ProductService } from '@/services/server/productService';
import { B2BProductCard } from '@/components/features';
import EquipmentInquiryForm from './EquipmentInquiryForm';
import EquipmentHero from './EquipmentHero';
import { Package } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Commercial Ice Cream Equipment & Kiosk Solutions UAE | Mashbere',
  description: 'Elevate your business with Mashbere professional B2B solutions. We provide high-end retail kiosks, hygienic ice glass systems, and premium equipment for the UAE hospitality industry.',
  keywords: ['commercial ice cream equipment UAE', 'retail kiosk solutions Dubai', 'ice cup filling machine', 'B2B frozen desserts UAE', 'ice glass manufacturing'],
  alternates: {
    canonical: '/equipment',
  },
};

/**
 * Equipment Page (Server Component)
 * Fetches B2B equipment products on the server for optimal performance.
 */
export default async function EquipmentPage() {
  const equipment = await ProductService.getProductsByCategory('equipment');

  return (
    <div className="min-h-screen bg-[#FDFCFD] pb-24">

      {/* Hero Carousel */}
      <EquipmentHero />

      {/* Catalog */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-primary/60">Our Range</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight mt-1">
            B2B Product <span className="text-primary">Catalog</span>
          </h2>
        </div>

        {equipment.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-10">
            {equipment.map(product => (
              <B2BProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-12 text-center border border-gray-50 shadow-sm">
            <Package className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <p className="text-gray-400 font-bold text-lg">Equipment catalog coming soon.</p>
          </div>
        )}
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-primary/60">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight mt-1">
            Business <span className="text-primary">Inquiry</span>
          </h2>
        </div>
        <Suspense fallback={<div className="h-96 bg-white rounded-[40px] animate-pulse flex items-center justify-center text-gray-300">Loading Form...</div>}>
          <EquipmentInquiryForm />
        </Suspense>
      </section>
    </div>
  );
}
