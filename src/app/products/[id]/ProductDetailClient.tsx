'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, ChevronRight, Leaf, Send, X, Info, ShieldCheck, Plane, Zap, Truck, Sparkles, Activity } from 'lucide-react';
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
  const [selectedCard, setSelectedCard] = useState<any>(null);

  // Split longDesc into intro, how it works, and conclusion for Kiosk
  const parseKioskContent = () => {
    const parts = (flavor.longDesc || '').split('\n\n');
    const intro = parts[0];
    const howItWorksRaw = parts.find((p: string) => p.includes('How It Works:')) || '';
    const howItWorksSteps: { title: string; desc: string }[] = howItWorksRaw
      .split('\n')
      .filter((line: string) => line.startsWith('•'))
      .map((line: string) => {
        const [title, ...descParts] = line.replace('• ', '').split(': ');
        return { title, desc: descParts.join(': ') };
      });
    const conclusion = parts.find((p: string) => p.includes('tasting session')) || '';
    return { intro, howItWorksSteps, conclusion };
  };

  const getIceGlassSteps = () => [
    { title: "Pure Source", desc: "UV-purified, food-grade water crystalized into high-density cubes." },
    { title: "Sealed Hygiene", desc: "Instantly sealed in a controlled environment to eliminate contamination." },
    { title: "Cold Chain", desc: "Stored and delivered at optimal temperatures to maintain crystal clarity." }
  ];

  const { intro, howItWorksSteps, conclusion, remainingContent } = isKiosk 
    ? { ...parseKioskContent(), remainingContent: '' } 
    : { 
        intro: (flavor.longDesc || '').split('\n\n')[0], 
        howItWorksSteps: isIceGlass ? getIceGlassSteps() : [], 
        conclusion: '', 
        remainingContent: (flavor.longDesc || '').split('\n\n').slice(1).join('\n\n') 
      };

  const iceGlassCards = [
    {
      id: 'box',
      title: "Sealed Bulk Solutions",
      desc: "Engineered for efficiency, our insulated transport boxes contain 12 premium ice glasses, ensuring maximum freshness and easy inventory management for high-traffic venues.",
      image: "/photos/ice-glass-box.jpeg",
      hoverImage: "/photos/ice-glass-lifestyle.jpeg",
      modalImage: "/photos/ice-glass-lifestyle.jpeg",
      badge: "12 Cups Per Box"
    },
    {
      id: 'usage',
      title: "Modern Refreshment",
      desc: "The perfect companion for travel, events, and offices. Our ready-to-use sealed cups eliminate the need for loose ice, providing a sophisticated and hygienic experience.",
      image: "/photos/ice-glass-usage.jpeg",
      hoverImage: "/photos/mobile view ice cup bg.webp",
      modalImage: "/photos/ice-glass-usage.jpeg"
    }
  ];

  return (
    <main className="min-h-screen font-sans" style={{ background: isB2B ? `linear-gradient(135deg, #F8F9FA 0%, #FDFCFB 100%)` : `linear-gradient(135deg, ${flavor.accentColor}, #FFFFFF)` }}>
      {/* Schema.org Structured Data for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": flavor.name,
            "image": [
              flavor.image?.startsWith('http') 
                ? flavor.image 
                : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com'}${flavor.image}`
            ],
            "description": flavor.desc || flavor.longDesc || flavor.description,
            "brand": {
              "@type": "Brand",
              "name": "Mashbere"
            },
            "offers": {
              "@type": "Offer",
              "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com'}/products/${flavor.id}`,
              "priceCurrency": "AED",
              "price": flavor.price || 0,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })
        }}
      />
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
        <div className="container-responsive pb-12 lg:pb-20">
          <div className="block lg:flow-root">
            
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`relative mb-6 lg:mb-6 ${isB2B ? 'lg:float-left lg:w-1/2 lg:pr-12' : 'lg:w-1/2 lg:mx-auto'}`}
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

            {/* Typography & Description */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs lg:text-sm mb-2">{flavor.subtitle}</p>
                <h1 className="text-4xl sm:text-5xl lg:text-8xl font-display text-gray-900 uppercase leading-[0.9] lg:leading-[0.85] tracking-tighter mb-5 lg:mb-6">
                  {flavor.name}
                </h1>

                {/* Highlight badge */}
                <div className="inline-flex items-center gap-3 bg-[#708238]/10 px-5 py-2.5 rounded-2xl mb-8">
                  <Leaf className="w-4 h-4 text-[#708238]" />
                  <span className="text-[#708238] font-bold text-sm">{flavor.highlight}</span>
                </div>

                {/* Main Description Text */}
                <div className="space-y-8 lg:space-y-12">
                  <p className="text-gray-500 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed">
                    {intro}
                  </p>

                  {isKiosk && howItWorksSteps.length > 0 && (
                    <section className="mt-16">
                      <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#708238] mb-10">How It Works</h2>
                      <div className="grid grid-cols-1 gap-6">
                        {howItWorksSteps.map((step, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-[32px] hover:bg-white hover:shadow-xl hover:shadow-[#708238]/5 transition-all duration-500"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-[#708238]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-[#708238] font-display text-xl">{idx + 1}</span>
                              </div>
                              <div>
                                <h3 className="text-2xl font-display text-gray-900 uppercase mb-2 tracking-tight">
                                  {step.title}
                                </h3>
                                <p className="text-gray-500 font-light text-lg leading-relaxed">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {!isKiosk && !isIceGlass && remainingContent && (
                    <div className="text-gray-700 text-base leading-relaxed font-medium whitespace-pre-line">
                      {remainingContent}
                    </div>
                  )}

                  {isKiosk && conclusion && (
                    <div className="bg-[#708238]/5 p-6 lg:p-10 rounded-3xl lg:rounded-[40px] border border-[#708238]/10">
                      <p className="text-[#708238] text-base lg:text-xl font-light leading-relaxed italic">
                        {conclusion}
                      </p>
                    </div>
                  )}
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
                className="mt-10 lg:mt-20 border-t border-gray-100 pt-10 lg:pt-16"
              >
                <div className="flex flex-col gap-1 mb-7 lg:mb-12">
                  <p className="text-[#708238] font-black uppercase tracking-[0.3em] text-[10px]">Specifications</p>
                  <h3 className="font-display text-gray-900 text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter">Available Sizes</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                  {/* Compact Size */}
                  <div className="flex flex-col gap-4 lg:gap-6 group">
                    <div className="relative w-full aspect-[4/3] rounded-2xl lg:rounded-[32px] overflow-hidden bg-white/40 border border-white group-hover:border-[#708238]/20 transition-colors duration-500">
                      <Image 
                        src="/photos/kiosk-size-compact.jpeg" 
                        alt="Compact Retail Kiosk" 
                        fill 
                        className="object-contain p-4 lg:p-8" 
                      />
                    </div>
                    <div className="space-y-3 lg:space-y-4 px-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg lg:text-2xl font-display text-gray-900 uppercase">Compact Edition</h4>
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
                  <div className="flex flex-col gap-4 lg:gap-6 group">
                    <div className="relative w-full aspect-[4/3] rounded-2xl lg:rounded-[32px] overflow-hidden bg-white/40 border border-white group-hover:border-[#708238]/20 transition-colors duration-500">
                      <Image 
                        src="/photos/kiosk-size-signature.jpeg" 
                        alt="Signature Retail Kiosk" 
                        fill 
                        className="object-contain p-4 lg:p-8" 
                      />
                    </div>
                    <div className="space-y-3 lg:space-y-4 px-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg lg:text-2xl font-display text-gray-900 uppercase">Signature Edition</h4>
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
                className="mt-10 lg:mt-20 border-t border-gray-100 pt-10 lg:pt-16"
              >
                <section className="mb-10 lg:mb-20">
                  <h2 className="text-xs lg:text-sm font-black uppercase tracking-[0.4em] text-[#708238] mb-6 lg:mb-10">Quality Process</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {howItWorksSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="group relative bg-white/40 backdrop-blur-md border border-white/60 p-5 lg:p-8 rounded-2xl lg:rounded-[32px] hover:bg-white hover:shadow-lg lg:hover:shadow-xl hover:shadow-[#708238]/5 transition-all duration-500"
                      >
                        <div className="flex items-start gap-4 lg:gap-6">
                          <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-[#708238]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                            <span className="text-[#708238] font-display text-base lg:text-xl">{idx + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-base lg:text-2xl font-display text-gray-900 uppercase mb-1 lg:mb-2 tracking-tight">
                              {step.title}
                            </h3>
                            <p className="text-gray-500 font-light text-sm lg:text-lg leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <div className="mt-8 lg:mt-20">
                  <div className="flex flex-col gap-1 mb-7 lg:mb-12">
                    <p className="text-[#708238] font-black uppercase tracking-[0.3em] text-[10px]">Packaging & Showcase</p>
                    <h3 className="font-display text-gray-900 text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter">B2B Excellence</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {iceGlassCards.map((card) => (
                      <motion.div
                        key={card.id}
                        onClick={() => setSelectedCard(card)}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="flex flex-col gap-5 group cursor-pointer"
                      >
                        <div className="relative w-full aspect-square rounded-[32px] overflow-hidden border border-white/60 group-hover:border-[#708238]/30 transition-all duration-500 shadow-md hover:shadow-2xl">
                          {/* Base image */}
                          <Image 
                            src={card.image} 
                            alt={card.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          {/* Hover image crossfade — only shown if hoverImage exists */}
                          {card.hoverImage && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              <Image 
                                src={card.hoverImage} 
                                alt={`${card.title} lifestyle`} 
                                fill 
                                className="object-cover scale-[1.04]"
                              />
                              {/* Subtle vignette overlay on hover image */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>
                          )}
                          {card.badge && (
                            <div className="absolute top-5 right-5 px-4 py-2 bg-[#708238]/90 backdrop-blur-sm rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                              {card.badge}
                            </div>
                          )}
                          {/* CTA pill — slides up on hover */}
                          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-2 text-[#708238] font-black text-[10px] uppercase tracking-widest shadow-xl whitespace-nowrap">
                              <Info size={13} />
                              View Details
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1 px-1">
                          <h4 className="text-2xl font-display text-gray-900 uppercase group-hover:text-[#708238] transition-colors duration-300">{card.title}</h4>
                          <p className="text-[#708238]/70 text-[10px] font-black uppercase tracking-widest">Tap to explore</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hygiene & Travel Grid - Interactive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8 lg:mt-20">
                  {[
                    { label: 'Hygienic', desc: '100% Sealed', detail: 'Ice is never touched by human hands. Fully sealed for maximum safety and absolute purity.', icon: ShieldCheck },
                    { label: 'Portable', desc: 'Travel Ready', detail: 'Compact, durable cup designed for on-the-go convenience. Take your crystal-clear ice anywhere.', icon: Plane },
                    { label: 'Convenient', desc: 'Ready to Use', detail: 'Pre-portioned and ready instantly. Just peel the seal and pour in your favorite beverage.', icon: Zap },
                    { label: 'B2B', desc: 'Bulk Supply', detail: 'Optimized for retail, events, and hospitality. Scalable supply with consistent, premium quality.', icon: Truck }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="group relative bg-white/40 backdrop-blur-sm p-5 lg:p-8 rounded-2xl lg:rounded-3xl border border-white overflow-hidden transition-all duration-500 hover:bg-white hover:shadow-lg lg:hover:shadow-xl lg:hover:shadow-[#708238]/10 hover:-translate-y-1 lg:h-[280px]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#708238]/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 lg:group-hover:scale-150" />
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-[#708238]/10 flex items-center justify-center mb-4 lg:mb-6 lg:group-hover:bg-[#708238] transition-colors duration-500">
                            <Icon className="text-[#708238] lg:group-hover:text-white transition-colors duration-500" size={20} />
                          </div>
                          <p className="text-[#708238] font-black text-[10px] uppercase tracking-widest mb-1 lg:mb-2">{item.label}</p>
                          <h4 className="text-gray-900 font-display text-lg lg:text-xl mb-1 lg:mb-3">{item.desc}</h4>
                          <div className="h-auto opacity-100 lg:h-0 lg:opacity-0 lg:group-hover:h-auto lg:group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-1 lg:mt-2">{item.detail}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {flavor.ingredients && flavor.ingredients.length > 0 && (
            <div className="mt-10 lg:mt-20">
              {/* Ingredients (Key Features) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#708238]/10 flex items-center justify-center">
                    <Sparkles size={16} className="text-[#708238]" />
                  </div>
                  <p className="text-xs font-black text-[#708238] uppercase tracking-widest">Key Features</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {flavor.ingredients.map((ing: string, idx: number) => (
                    <div key={ing} className="group flex items-center gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white hover:bg-white hover:shadow-lg transition-all duration-300">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-gray-400 font-bold text-sm">0{idx + 1}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                        {ing}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center pt-6"
            >
              {(flavor.category === 'equipment' || flavor.id === 'mashbere-retail-kiosk' || flavor.id === 'mashbere-ice-glass') ? (
                <Link
                  href={`/equipment?interest=${encodeURIComponent(flavor.name)}#contact`}
                  className="group relative bg-[#708238] text-white px-8 py-5 sm:px-16 sm:py-6 rounded-2xl sm:rounded-3xl font-black text-[11px] sm:text-sm uppercase tracking-[0.15em] sm:tracking-widest shadow-[0_20px_40px_-12px_rgba(112,130,56,0.3)] sm:shadow-2xl sm:shadow-black/20 flex items-center gap-3 sm:gap-4 transition-all w-full sm:w-auto justify-center active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span className="relative z-10">Request Partnership Inquiry</span>
                </Link>
              ) : (
                <Link
                  href={flavor.category ? `/products?category=${flavor.category}` : "/products"}
                  className="group flex items-center gap-3 px-12 py-6 rounded-3xl font-black text-sm text-gray-600 uppercase tracking-widest hover:text-[#708238] transition-all bg-white shadow-sm border border-gray-100 hover:shadow-lg"
                >
                  View More Flavours
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
              className="mt-10 pt-8 lg:mt-20 lg:pt-12 border-t border-gray-200"
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

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/20 hover:bg-black/40 md:bg-black/10 md:hover:bg-black/20 flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <X size={20} className="text-white md:text-gray-900" />
              </button>

              {/* Image Side */}
              <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-auto shrink-0">
                <Image
                  src={selectedCard.modalImage || selectedCard.image}
                  alt={selectedCard.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto bg-white flex flex-col">
                <p className="text-[#708238] font-black uppercase tracking-[0.3em] text-[10px] mb-2 md:mb-4">Product Detail</p>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-display text-gray-900 uppercase leading-none tracking-tighter mb-4 md:mb-8">
                  {selectedCard.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base md:text-xl font-light leading-relaxed whitespace-pre-line">
                  {selectedCard.desc}
                </p>
                
                <div className="mt-6 md:mt-auto pt-6 md:pt-12">
                  <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-[#708238]/5 border border-[#708238]/10 flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#708238] flex items-center justify-center text-white shrink-0">
                      <Leaf size={16} className="md:w-5 md:h-5" />
                    </div>
                    <p className="text-[#708238] font-medium text-xs md:text-sm">Mashbere Quality Guarantee: Pure, Crystal, and Hygienic.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </main>
  );
}
