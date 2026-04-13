import Link from 'next/link';
import { ArrowRight, Star, Truck, ShieldCheck, Heart, Sparkles, Zap, Package, MapPin } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import { ProductCard } from '@/components/features/ProductCard';
import HeroSection from '@/components/features/HeroSection';
import ValueSection from '@/components/features/ValueSection';

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest">
              <Star className="w-4 h-4 fill-current" />
              <span>Our Selection</span>
            </div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-display text-gray-900 leading-none tracking-tight uppercase">
              Our Best <span className="text-primary ">Sellers</span>
            </h2>
            <p className="text-gray-500 text-lg sm:text-xl font-medium leading-relaxed">
              Discover the flavors that are taking the UAE by storm. Handcrafted, fresh, and irresistibly delicious.
            </p>
          </div>
          <Link 
            href="/products" 
            className="group flex items-center gap-3 bg-white border-2 border-gray-100 hover:border-primary/20 px-8 py-4 rounded-[20px] font-black text-gray-900 transition-all shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:scale-105"
          >
            <span>View All Flavors</span>
            <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

      <ValueSection />

      {/* Final CTA Section */}
      <section className="mt-32 lg:mt-50 mb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#141A0B] rounded-[64px] p-12 sm:p-24 relative overflow-hidden group border border-white/5">
            {/* Background Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#C4EB54]/10 rounded-full blur-[120px] transform group-hover:scale-110 transition-transform duration-[4s]" />
            <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-[#708238]/10 rounded-full blur-[100px] transform group-hover:scale-110 transition-transform duration-[5s]" />
            
            <div className="relative z-10 text-center space-y-12">
              <h2 className="text-6xl sm:text-8xl lg:text-9xl font-display text-white leading-[0.9] uppercase tracking-tighter">
                Ready to find your <br />
                <span className="text-[#C4EB54]">Perfect Scoop?</span>
              </h2>
              
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 font-medium leading-relaxed">
                Join over 5,000+ ice cream enthusiasts across the UAE. 
                Experience artisanal excellence delivered directly to your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <Link
                  href="/products"
                  className="bg-[#C4EB54] text-[#141A0B] px-14 py-5 rounded-full font-black text-lg uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/equipment"
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white px-14 py-5 rounded-full font-black text-lg uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  B2B Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
