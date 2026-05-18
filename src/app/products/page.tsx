import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import FlavorsGrid from './FlavorsGrid';
import { Suspense } from 'react';
 
export const metadata = {
  title: 'Ice Cream Products UAE | Popsicles, Ice Cups & Flavours | Mashbere',
  description: 'Indulge in the best artisanal ice cream, handcrafted popsicles, & premium ice cups in the UAE. Made with 100% natural ingredients. Explore our flavors today!',
  keywords: ['artisanal ice cream UAE', 'premium popsicles Dubai', 'SipUp ice cups', 'handcrafted frozen desserts', 'Mashbere ice cream', 'ice cream supplier UAE', 'wholesale ice cream UAE'],
  alternates: {
    canonical: '/products',
  },
};

export default async function ProductsPage() {
  // Fetch from Supabase
  const [popsicles, sipups, pookies, equipment] = await Promise.all([
    ProductService.getAllPopsicles(),
    ProductService.getAllSipups(),
    ProductService.getAllPookies(),
    ProductService.getAllEquipment()
  ]);

  const allItems = [
    ...popsicles.map(p => ({ ...p, category: 'popsicle' })),
    ...sipups.map(s => ({ ...s, category: 'sip-up' })),
    ...pookies.map(pk => ({ ...pk, category: 'pookies' })),
    ...equipment.map(e => ({ ...e, category: 'equipment' }))
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFA] font-sans">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-[#1C2410] text-white">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        
        <div className="container-responsive pt-28 pb-28 sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-48 relative z-10">


          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              {/* Badge removed for cleaner mobile layout and better UX */}

              <h1 className="font-display uppercase tracking-tighter animate-fade-in-up flex flex-col gap-2 sm:gap-3" style={{ animationDelay: '100ms' }}>
                <span className="text-3xl sm:text-6xl lg:text-[5rem] leading-[1.1] sm:leading-[0.95] max-w-full">
                  Ice Cream Products UAE <span className="hidden sm:inline-block px-2 opacity-50">|</span>
                </span>
                <span className="text-[#C4EB54] text-lg sm:text-4xl lg:text-[3.5rem] leading-[1.2] sm:leading-[1.1] max-w-full">
                  Popsicles <span className="mx-1 sm:mx-2 text-white/30">&bull;</span> Ice Cups <span className="mx-1 sm:mx-2 text-white/30">&bull;</span> Flavours
                </span>
                <span className="text-sm sm:text-xl lg:text-2xl font-sans normal-case tracking-normal text-white/70 mt-1 sm:mt-4">
                  Crafted by Mashbere
                </span>
              </h1>
            </div>

            <p className="text-white/60 text-base lg:text-lg max-w-sm leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              {allItems.length} handcrafted flavours. All natural. All premium. Pick your obsession.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Client Component for Search/Filter/Grid */}
      <Suspense fallback={<div className="container-responsive py-20 text-center text-gray-400">Loading catalog...</div>}>
        <FlavorsGrid flavors={allItems} />
      </Suspense>
    </main>
  );
}
