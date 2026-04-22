import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import { ProductCard } from '@/components/features/ProductCard';
import HeroSection from '@/components/features/HeroSection';
import ValueSection from '@/components/features/ValueSection';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

/**
 * Homepage (Server Component)
 * Fetches featured products directly from the Service layer for optimal performance.
 */
export default async function Home() {
  // Fetch data on the server
  const featuredProducts = await ProductService.getFeaturedProducts();

  return (
    <div className="flex flex-col bg-[#FDFCFD]">
      {/* Hero Section (Client Component) */}
      <HeroSection />

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

      {/* Final CTA Section */}
      <ScrollReveal direction="up" delay={0.4}>
        <section className="section-padding">
          <div className="container-responsive">
            <div className="bg-[#141A0B] rounded-[40px] sm:rounded-[56px] lg:rounded-[64px] p-8 sm:p-16 lg:p-24 relative overflow-hidden group border border-white/5">
              {/* Background Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#C4EB54]/10 rounded-full blur-[120px] transform group-hover:scale-110 transition-transform duration-[4s]" />
              <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-[#708238]/10 rounded-full blur-[100px] transform group-hover:scale-110 transition-transform duration-[5s]" />

              <div className="relative z-10 text-center space-y-6 sm:space-y-10">
                <h2 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-display text-white leading-[0.9] uppercase tracking-tighter">
                  Ready to find your <br />
                  <span className="text-[#C4EB54]">Perfect Scoop?</span>
                </h2>

                <p className="max-w-xl mx-auto text-sm sm:text-base lg:text-xl text-gray-400 font-medium leading-relaxed px-2">
                  Indulge in a new standard of ice cream where rich flavors, premium quality, and unforgettable taste come together in every bite.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-2 sm:pt-4 items-center">
                  <Link
                    href="/products"
                    className="w-full sm:w-auto bg-[#C4EB54] text-[#141A0B] px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-sm sm:text-base lg:text-lg uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all text-center"
                  >
                    Shop Collection
                  </Link>
                  <Link
                    href="/equipment"
                    className="w-full sm:w-auto bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-sm sm:text-base lg:text-lg uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all text-center"
                  >
                    B2B Solutions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
