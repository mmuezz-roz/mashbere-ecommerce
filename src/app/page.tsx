import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import { ProductCard } from '@/components/features/ProductCard';
import HeroSection from '@/components/features/HeroSection';
import ValueSection from '@/components/features/ValueSection';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import SipUpSection from '@/components/features/SipUpSection';
import ProductShowcase from '@/components/features/ProductShowcase';
import PookiesSection from '@/components/features/PookiesSection';
import ZeroRiskPartnership from '@/components/features/ZeroRiskPartnership';
import GooeyButton from '@/components/ui/GooeyButton';

/**
 * Homepage (Server Component)
 * Fetches featured products directly from the Service layer for optimal performance.
 */
export default async function Home() {
  // Fetch data on the server
  const [featuredProducts, allSipups] = await Promise.all([
    ProductService.getFeaturedProducts(),
    ProductService.getAllSipups()
  ]);

  return (
    <div className="flex flex-col bg-[#FDFCFD]">
      {/* Hero Section (Client Component) */}
      <HeroSection />

      {/* SipUp Section */}
      <SipUpSection sipups={allSipups} />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Pookies Section – Mini Popsicles Highlight */}
      <PookiesSection />

      {/* Explore All Flavours CTA */}
      <div className="bg-[#FDFCFA] py-16 lg:py-24 flex flex-col items-center justify-center text-center px-4">
        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4">15 Premium Flavours</p>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display text-gray-900 uppercase leading-none tracking-tighter mb-8">
          Explore the <span className="text-[#708238]">Full Collection</span>
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          From classic Tender Coconut to exotic Avocado and heritage Datella — discover every handcrafted popsicle flavour in one place.
        </p>
        <GooeyButton particleCount={20}>
          <Link 
            href="/products"
            className="group inline-flex items-center gap-4 bg-[#1C2410] text-white px-10 py-5 rounded-full font-black text-base uppercase tracking-widest shadow-2xl shadow-black/20 hover:bg-[#708238] hover:shadow-[#708238]/30 transition-all hover:scale-105"
          >
            <span>Explore All Flavours</span>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </GooeyButton>
      </div>

      {/* Featured Products Section */}
      <ScrollReveal>
        <section className="container-responsive section-padding relative">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-16 lg:mb-20 gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest">
                <Star className="w-4 h-4 fill-current" />
                <span>Our Selection</span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display text-gray-900 leading-none tracking-tight uppercase">
                Our Best <span className="text-primary ">Sellers</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                Discover the flavors that are taking the UAE by storm. Handcrafted, fresh, and irresistibly delicious.
              </p>
            </div>
            <GooeyButton>
              <Link 
                href="/products" 
                className="group flex flex-shrink-0 items-center gap-3 bg-white border-2 border-gray-100 hover:border-primary/20 px-6 sm:px-8 py-3 sm:py-4 rounded-[16px] sm:rounded-[20px] font-black text-sm sm:text-base text-gray-900 transition-all shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:scale-105"
              >
                <span>View All Flavors</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-900 text-white rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </Link>
            </GooeyButton>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-20 bg-gray-50 rounded-[40px] font-bold text-xl">
                No products found.
              </p>
            )}
          </div>
        </section>
      </ScrollReveal>


      <ScrollReveal delay={0.3}>
        <ValueSection />
      </ScrollReveal>

      {/* Final CTA Section: Zero-Risk Partnership */}
      <ScrollReveal direction="up" delay={0.4}>
        <ZeroRiskPartnership />
      </ScrollReveal>
    </div>
  );
}
