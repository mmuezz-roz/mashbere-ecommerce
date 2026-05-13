'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, ChevronRight, Leaf, Send } from 'lucide-react';
import { ShareButton } from '@/components/shared/ShareButton';

interface Props {
  flavor: any;
  prevFlavor: any | null;
  nextFlavor: any | null;
  currentIndex: number;
}

export default function ProductDetailClient({ flavor, prevFlavor, nextFlavor, currentIndex }: Props) {
  const router = useRouter();
  const isKiosk = flavor.id === 'mashbere-retail-kiosk';
  const isIceGlass = flavor.id === 'uae-ice-cup-ready-to-use-ice-glass' || flavor.id === 'mashbere-ice-glass';
  const isB2B = isKiosk || isIceGlass;
  const displayImage = isKiosk ? '/photos/kiosk-main.jpeg' : flavor.image;
  const projectGreen = '#708238';
  const mainAccent = isB2B ? (isIceGlass ? '#BAE6FD' : projectGreen) : flavor.accentColor;

  // Split longDesc into first paragraph and the rest
  const paragraphs = (flavor.longDesc || '').split('\n\n');
  const firstPara = paragraphs[0];
  const remainingContent = paragraphs.slice(1).join('\n\n');

  return (
    <main className="min-h-screen font-sans" style={{ background: isB2B ? `linear-gradient(135deg, #F8F9FA 0%, #FDFCFB 100%)` : `linear-gradient(135deg, ${flavor.accentColor}, #FFFFFF)` }}>
      {/* Dynamic color glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 60% 30%, ${mainAccent}40, transparent 60%)` }}
      />

      <div className="relative z-10">
        {/* Top Nav - Optimized for cinematic feel and Header spacing */}
        <div className={`container-responsive ${isKiosk ? 'pt-24 sm:pt-26 lg:pt-32' : 'pt-24 sm:pt-28 lg:pt-36'} pb-4 sm:pb-6 lg:pb-8`}>
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>
            
            <ShareButton 
              name={flavor.name} 
              description={flavor.description} 
              slug={flavor.id} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="container-responsive pb-20">
          <div className="block lg:flow-root"> {/* Clearfix container */}
            
            {/* Image Section - Floated for B2B text wrap */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`relative mb-10 lg:mb-6 ${isB2B ? 'lg:float-left lg:w-1/2 lg:pr-12' : 'lg:w-1/2'}`}
            >
              <div
                className="absolute inset-[10%] rounded-full blur-[60px] opacity-30 animate-pulse"
                style={{ backgroundColor: mainAccent }}
              />

              <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-white/40 backdrop-blur-sm border border-white/40">
                <Image
                  src={displayImage}
                  alt={flavor.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <Image src="/photos/mashbere_logo_no_bg.png" alt="Mashbere" width={24} height={24} />
                  </div>
                  <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/20">
                    <p className="text-white font-black text-[10px] uppercase tracking-widest">Premium Selection</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Typography & Description - Flowing around image */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-sm mb-2">{flavor.subtitle}</p>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display text-gray-900 uppercase leading-[0.85] tracking-tighter mb-6">
                  {flavor.name}
                </h1>

                {/* Highlight badge */}
                <div className="inline-flex items-center gap-3 bg-[#708238]/10 px-5 py-2.5 rounded-2xl mb-8">
                  <Leaf className="w-4 h-4 text-[#708238]" />
                  <span className="text-[#708238] font-bold text-sm">{flavor.highlight}</span>
                </div>

                {/* Main Description Text - Wraps around the floated image */}
                <div className="text-gray-700 text-xl leading-relaxed font-medium whitespace-pre-line">
                  {flavor.longDesc}
                </div>
              </motion.div>
            </div>

            <div className="clear-both" />
          </div>

            {flavor.id === 'mashbere-retail-kiosk' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-20 border-t border-gray-100 pt-16"
              >
                <div className="flex flex-col gap-1 mb-12">
                  <p className="text-[#708238] font-black uppercase tracking-[0.3em] text-[10px]">Specifications</p>
                  <h3 className="font-display text-gray-900 text-4xl uppercase tracking-tighter">Available Sizes</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Compact Size */}
                  <div className="flex flex-col gap-6 group">
                    <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-white/40 border border-white group-hover:border-[#708238]/20 transition-colors duration-500">
                      <Image 
                        src="/photos/kiosk-size-compact.jpeg" 
                        alt="Compact Retail Kiosk" 
                        fill 
                        className="object-contain p-8" 
                      />
                    </div>
                    <div className="space-y-4 px-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-2xl font-display text-gray-900 uppercase">Compact Edition</h4>
                        <span className="text-[#708238] font-black text-xs uppercase tracking-widest">114cm Width</span>
                      </div>
                      <div className="flex items-center gap-6 text-gray-400">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest mb-1">Depth</span>
                          <span className="text-sm font-bold text-gray-600">70cm</span>
                        </div>
                        <div className="w-px h-6 bg-gray-100" />
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest mb-1">Height</span>
                          <span className="text-sm font-bold text-gray-600">200cm</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signature Size */}
                  <div className="flex flex-col gap-6 group">
                    <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-white/40 border border-white group-hover:border-[#708238]/20 transition-colors duration-500">
                      <Image 
                        src="/photos/kiosk-size-signature.jpeg" 
                        alt="Signature Retail Kiosk" 
                        fill 
                        className="object-contain p-8" 
                      />
                    </div>
                    <div className="space-y-4 px-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-2xl font-display text-gray-900 uppercase">Signature Edition</h4>
                        <span className="text-[#708238] font-black text-xs uppercase tracking-widest">147cm Width</span>
                      </div>
                      <div className="flex items-center gap-6 text-gray-400">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest mb-1">Depth</span>
                          <span className="text-sm font-bold text-gray-600">70cm</span>
                        </div>
                        <div className="w-px h-6 bg-gray-100" />
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest mb-1">Height</span>
                          <span className="text-sm font-bold text-gray-600">200cm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mashbere Ice Glass - Interactive Section */}
            {isIceGlass && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-20 border-t border-gray-100 pt-16"
              >
                <div className="flex flex-col gap-1 mb-12">
                  <p className="text-[#708238] font-black uppercase tracking-[0.3em] text-[10px]">Packaging & Quality</p>
                  <h3 className="font-display text-gray-900 text-4xl uppercase tracking-tighter">Bulk Solutions for B2B</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Box Display */}
                  <div className="flex flex-col gap-6 group">
                    <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-white/40 border border-white group-hover:border-[#708238]/20 transition-all duration-500 shadow-sm hover:shadow-xl">
                      <Image 
                        src="/photos/ice-glass-box.jpeg" 
                        alt="Mashbere Ice Glass Bulk Box" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-6 right-6 px-4 py-2 bg-[#708238] rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                        12 Cups Per Box
                      </div>
                    </div>
                    <div className="space-y-3 px-2">
                      <h4 className="text-2xl font-display text-gray-900 uppercase">Sealed Bulk Solutions</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Engineered for efficiency, our insulated transport boxes contain 12 premium ice glasses, ensuring maximum freshness and easy inventory management for high-traffic venues.
                      </p>
                    </div>
                  </div>

                  {/* New Usage Image (ice cube 4) */}
                  <div className="flex flex-col gap-6 group">
                    <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-white/40 border border-white group-hover:border-[#708238]/20 transition-all duration-500 shadow-sm hover:shadow-xl">
                      <Image 
                        src="/photos/ice-glass-usage.jpeg" 
                        alt="Mashbere Ice Glass Usage" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="space-y-3 px-2">
                      <h4 className="text-2xl font-display text-gray-900 uppercase">Modern Refreshment</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        The perfect companion for travel, events, and offices. Our ready-to-use sealed cups eliminate the need for loose ice, providing a sophisticated and hygienic experience.
                      </p>
                    </div>
                  </div>

                  {/* Lifestyle Display */}
                  <div className="flex flex-col gap-6 group">
                    <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-white/40 border border-white group-hover:border-[#708238]/20 transition-all duration-500 shadow-sm hover:shadow-xl">
                      <Image 
                        src="/photos/ice-glass-lifestyle.jpeg" 
                        alt="Mashbere Ice Glass Lifestyle" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="space-y-3 px-2">
                      <h4 className="text-2xl font-display text-gray-900 uppercase">Cinematic Experience</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Crafted for the modern lifestyle, our crystal ice glasses offer a slow-melt performance that preserves the flavor and aesthetic of your most sophisticated beverages.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hygiene & Travel Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                  {[
                    { label: 'Hygienic', desc: '100% Sealed' },
                    { label: 'Portable', desc: 'Travel Ready' },
                    { label: 'Convenient', desc: 'Ready to Use' },
                    { label: 'B2B', desc: 'Bulk Supply' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white text-center hover:bg-[#708238]/5 transition-colors">
                      <p className="text-[#708238] font-black text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-gray-900 font-bold text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Key Features</p>
                <div className="flex flex-wrap gap-3">
                  {(flavor.ingredients || []).map((ing: string) => (
                    <span key={ing} className="px-4 py-2 bg-white rounded-2xl text-sm font-bold text-gray-700 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      {ing}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
              >
                {(flavor.stats || []).map((stat: any) => (
                  <div key={stat.label} className="bg-white/30 backdrop-blur-sm p-4 rounded-3xl border border-white/40">
                    <p className="text-3xl font-display text-gray-900 mb-1">{stat.val}</p>
                    <p className="text-[10px] font-black text-[#708238] uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center pt-8"
            >
              {(flavor.category === 'equipment' || flavor.id === 'mashbere-retail-kiosk' || flavor.id === 'mashbere-ice-glass') ? (
                <Link
                  href={`/equipment?interest=${encodeURIComponent(flavor.name)}#contact`}
                  className="group bg-[#1C2410] text-white px-16 py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-black/20 flex items-center gap-4 hover:bg-[#708238] hover:shadow-[#708238]/30 transition-all w-full sm:w-auto justify-center"
                >
                  <Send size={20} />
                  Request Partnership Inquiry
                </Link>
              ) : (
                <Link
                  href="/products"
                  className="group flex items-center gap-3 px-12 py-6 rounded-3xl font-black text-sm text-gray-600 uppercase tracking-widest hover:text-[#708238] transition-all bg-white shadow-sm border border-gray-100 hover:shadow-lg"
                >
                  More Flavours
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>

          {/* Prev / Next Navigation */}
          {(prevFlavor || nextFlavor) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-20 pt-12 border-t border-gray-200"
            >
              <p className="text-center text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Explore More</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {prevFlavor && (
                  <Link href={`/products/${prevFlavor.id}`}>
                    <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all shadow-sm border border-transparent hover:border-gray-100 hover:shadow-md">
                      <ArrowLeft size={18} className="text-gray-400 group-hover:text-[#708238] transition-colors shrink-0" />
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                        <Image src={prevFlavor.image} alt={prevFlavor.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Previous</p>
                        <p className="font-display text-gray-900 uppercase text-lg leading-none">{prevFlavor.name}</p>
                      </div>
                    </div>
                  </Link>
                )}
                {nextFlavor && (
                  <Link href={`/products/${nextFlavor.id}`}>
                    <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all shadow-sm border border-transparent hover:border-gray-100 hover:shadow-md justify-end text-right">
                      <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Next</p>
                        <p className="font-display text-gray-900 uppercase text-lg leading-none">{nextFlavor.name}</p>
                      </div>
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                        <Image src={nextFlavor.image} alt={nextFlavor.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-[#708238] transition-colors shrink-0" />
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
