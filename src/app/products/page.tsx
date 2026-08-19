import React, { Suspense } from 'react';
import { ProductService } from '@/services/server/productService';
import FlavorsGrid from './FlavorsGrid';
import DotGrid from '@/components/ui/DotGrid';

export const metadata = {
  title: 'Turkish Ice Cream UAE | Dondurma, Popsicles & Premium Flavours | Mashbere',
  description: 'Discover authentic Turkish ice cream (Dondurma) in the UAE — stretchy, creamy & handcrafted. Also explore premium popsicles, SipUp ice cups & artisan frozen desserts. Made with 100% natural ingredients.',
  keywords: [
    'Turkish ice cream UAE',
    'Turkish ice cream Dubai',
    'Dondurma UAE',
    'Dondurma Dubai',
    'stretchy ice cream UAE',
    'artisanal ice cream UAE',
    'premium popsicles Dubai',
    'SipUp ice cups',
    'handcrafted frozen desserts UAE',
    'Mashbere ice cream',
    'ice cream supplier UAE',
    'wholesale ice cream UAE',
    'Turkish dessert UAE',
    'buy Turkish ice cream online UAE',
  ],
  alternates: {
    canonical: '/products',
  },
};

export default async function ProductsPage() {
  // Fetch from Supabase
  const [popsicles, sipups, pookees, equipment, toroness] = await Promise.all([
    ProductService.getAllPopsicles(),
    ProductService.getAllSipups(),
    ProductService.getAllPookees(),
    ProductService.getAllEquipment(),
    ProductService.getAllToroness()
  ]);

  const allItems = [
    ...popsicles.map(p => ({ ...p, category: 'popsicle' })),
    ...sipups.map(s => ({ ...s, category: 'sip-up' })),
    ...pookees.map(pk => ({ ...pk, category: 'pookees' })),
    ...equipment.map(e => ({ ...e, category: 'equipment' })),
    ...toroness.map(t => ({ ...t, category: 'toroness' }))
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFA] font-sans">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-[#1C2410] text-white">
        {/* Interactive DotGrid Background */}
        <div className="absolute inset-0 opacity-20">
          <DotGrid
            dotSize={4}
            gap={23}
            baseColor="#C4EB54"
            activeColor="#ffffff"
            proximity={100}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        
        <div className="container-responsive pt-28 pb-28 sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-48 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 animate-fade-in-up">
                <span className="w-8 sm:w-12 h-[2px] bg-[#C4EB54]"></span>
                <span className="text-[#C4EB54] font-black tracking-[0.3em] uppercase text-[10px] sm:text-xs">Premium Selection</span>
              </div>
              
              <h1 className="font-display uppercase tracking-tighter animate-fade-in-up flex flex-col gap-1 sm:gap-2" style={{ animationDelay: '100ms' }}>
                <span className="text-4xl sm:text-7xl lg:text-[5.5rem] leading-[0.9] text-white">
                  Ice Cream <span className="text-white/40">Products UAE</span>
                </span>
                <span className="text-[#C4EB54] text-3xl sm:text-6xl lg:text-[4rem] leading-[0.9] mt-2 sm:mt-4">
                  Turkish Ice Cream <span className="opacity-40 font-light mx-2">/</span> Popsicles <span className="opacity-40 font-light mx-2">/</span> SipUps
                </span>
              </h1>
            </div>

            <div className="lg:mt-24 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="border-l border-white/20 pl-6 lg:pl-8">
                <span className="block text-white font-display text-3xl sm:text-4xl mb-2">{allItems.length}</span>
                <p className="text-white/60 text-sm sm:text-base max-w-[240px] leading-relaxed font-light">
                  handcrafted flavours. All natural. All premium. Pick your obsession.
                </p>
              </div>
            </div>
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
