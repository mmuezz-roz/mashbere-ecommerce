import { ProductService } from '@/services/server/productService';
import { ProductCard } from '@/components/features';
import EquipmentInquiryForm from './EquipmentInquiryForm';
import { Quote, Package, ChevronDown } from 'lucide-react';
import { Suspense } from 'react';

/**
 * Equipment Page (Server Component)
 * Fetches B2B equipment products on the server for optimal performance.
 */
export default async function EquipmentPage() {
  const equipment = await ProductService.getProductsByCategory('equipment');

  return (
    <div className="min-h-screen bg-[#FDFCFD] pb-24">

      {/* Hero */}
      <section className="bg-[#141A0B] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#C4EB54]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#708238]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-[#C4EB54]/10 border border-[#C4EB54]/20 px-4 py-2 rounded-full mb-6">
              <Package className="w-4 h-4 text-[#C4EB54]" />
              <span className="text-[#C4EB54] text-xs font-black uppercase tracking-widest">B2B Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display uppercase tracking-tight leading-none mb-4 sm:mb-6">
              Empower Your <br />
              <span className="text-[#C4EB54]">Business</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed mb-8 sm:mb-10 max-w-xl">
              From commercial freezers to mobile kiosks, we provide best-in-class equipment
              to help you start and grow your ice cream business across the UAE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-[#C4EB54] text-[#141A0B] px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#C4EB54]/20"
              >
                <Quote className="w-4 h-4" />
                Get a Quote
              </a>
              <a
                href="#products"
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                View Catalog
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-primary/60">Our Range</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight mt-1">
            B2B Product <span className="text-primary">Catalog</span>
          </h2>
        </div>

        {equipment.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {equipment.map(product => (
              <ProductCard key={product.id} product={product} />
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
