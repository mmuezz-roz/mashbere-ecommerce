import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import { ProductCard } from '@/components/features/ProductCard';
import HeroSection from '@/components/features/HeroSection';
import ValueSection from '@/components/features/ValueSection';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { TextReveal, BodyReveal } from '@/components/shared/TextReveal';
import { ScrollRevealHeading } from '@/components/shared/ScrollRevealHeading';
import SipUpSection from '@/components/features/SipUpSection';

const ProductShowcase = dynamic(() => import('@/components/features/ProductShowcase'), {
  loading: () => <div className="h-screen bg-[#FDFBF3]" />
});
const PookeesSection = dynamic(() => import('@/components/features/PookeesSection'), {
  loading: () => <div className="h-screen bg-white" />
});
const ArchiveSection = dynamic(() => import('@/components/features/ArchiveSection'), {
  loading: () => <div className="h-[60vh] bg-[#141A0B]" />
});
const SensoryShowcaseSection = dynamic(() => import('@/components/features/SensoryShowcaseSection'), {
  loading: () => <div className="h-[50vh] bg-[#f5fce3]" />
});
const ZeroRiskPartnership = dynamic(() => import('@/components/features/ZeroRiskPartnership'));

/**
 * Homepage (Server Component)
 * Fetches featured products directly from the Service layer for optimal performance.
 */
export const metadata = {
  title: 'Mashbere | Best Wholesale Ice Cream, Pookees & Popsicles in UAE',
  description: 'Mashbere is your trusted wholesale partner for premium ice cream, pookees, popsicles, and hygienic ice cups in the UAE. We also provide zero-risk B2B ice cream kiosks.',
  alternates: {
    canonical: '/',
  },
};

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

      {/* Pookees Section – Mini Popsicles Highlight */}
      <PookeesSection />

      {/* Sensory Showcase – Avocado Silk scrollytelling (between Pookees & Archive) */}
      <SensoryShowcaseSection />

      {/* Archive Section – Flux Carousel + Bento Grid */}
      <ArchiveSection />


      {/* Featured Products Section */}
      <ScrollReveal delay={0.05}>
        <section className="container-responsive section-padding relative">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-16 lg:mb-20 gap-8 pl-2 md:pl-0">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest">
                <Star className="w-4 h-4 fill-current" />
                <span>Our Selection</span>
              </div>
              <ScrollRevealHeading
                lines={[
                  <span key="l1" className="text-[8vw] sm:text-4xl md:text-5xl lg:text-7xl">
                    Our Best
                  </span>,
                  <div key="l2" className="relative inline-block w-fit mt-2 lg:mt-4">
                    <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                    <span className="relative z-10 text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl text-white px-3 sm:px-5 py-0 block">
                      Sellers
                    </span>
                  </div>,
                ]}
                className="flex flex-col font-display text-gray-900 uppercase leading-[0.75] tracking-tighter"
              />
              <BodyReveal className="text-gray-500 text-base sm:text-lg lg:text-xl font-medium leading-relaxed" delay={0.25}>
                Discover the flavors that are taking the UAE by storm. Handcrafted, fresh, and irresistibly delicious.
              </BodyReveal>
            </div>
            <Link 
              href="/products" 
              className="group flex flex-shrink-0 items-center gap-3 bg-white border-2 border-gray-100 hover:border-primary/20 px-6 sm:px-8 py-3 sm:py-4 rounded-[16px] sm:rounded-[20px] font-black text-sm sm:text-base text-gray-900 transition-all shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:scale-105"
            >
              <span>View All Flavors</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-900 text-white rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </Link>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex sm:hidden items-center justify-end gap-2 mb-4 pr-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Swipe to explore</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>

          {/* Product Grid / Carousel */}
          <div className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scroll-smooth sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 pb-8 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 4).map(product => (
                <div key={product.id} className="snap-start shrink-0 w-[82vw] sm:w-auto">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-20 bg-gray-50 rounded-[40px] font-bold text-xl w-full">
                No products found.
              </p>
            )}
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />
        </section>
      </ScrollReveal>


      <ScrollReveal delay={0.05}>
        <ValueSection />
      </ScrollReveal>

      {/* Final CTA Section: Zero-Risk Partnership */}
      <ScrollReveal direction="up" delay={0.05}>
        <ZeroRiskPartnership />
      </ScrollReveal>
    </div>
  );
}
