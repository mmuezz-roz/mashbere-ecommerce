import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import FlavorsGrid from './FlavorsGrid';
import { Suspense } from 'react';
 
export const metadata = {
  title: 'Artisanal Ice Cream, Popsicles & SipUps Collection | Mashbere',
  description: 'Explore the complete Mashbere collection of premium artisanal frozen treats. From handcrafted popsicles to our signature SipUp ice cups, discover the best flavors in the UAE.',
  keywords: ['artisanal ice cream flavors', 'premium popsicles UAE', 'SipUp collection', 'mini popsicles Dubai', 'handcrafted frozen desserts'],
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
        
        <div className="container-responsive py-16 lg:py-24 relative z-10">


          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[#C4EB54] font-black text-xs uppercase tracking-widest mb-6 animate-fade-in-up">
                <Star className="w-3 h-3 fill-current" />
                <span>Premium Collection</span>
              </div>

              <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-display uppercase leading-[0.85] tracking-tighter animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                ALL<br />
                <span className="text-[#C4EB54]">FLAVOURS</span>
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
