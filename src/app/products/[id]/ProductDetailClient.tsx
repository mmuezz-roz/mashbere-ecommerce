'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, ChevronRight, Leaf, Send } from 'lucide-react';

interface Props {
  flavor: any;
  prevFlavor: any | null;
  nextFlavor: any | null;
  currentIndex: number;
}

export default function ProductDetailClient({ flavor, prevFlavor, nextFlavor, currentIndex }: Props) {
  const router = useRouter();

  return (
    <main className="min-h-screen font-sans" style={{ background: `linear-gradient(135deg, ${flavor.accentColor}, #FFFFFF)` }}>
      {/* Dynamic color glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 60% 30%, ${flavor.accentColor}80, transparent 60%)` }}
      />

      <div className="relative z-10">
        {/* Top Nav */}
        <div className="container-responsive pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 lg:pb-20">
          <div className="flex items-center justify-between">
            <div className="lg:hidden" />

            <Link href="/products" className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-xs font-bold uppercase tracking-widest transition-colors">
              All Flavours
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-responsive pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow */}
              <div
                className="absolute inset-[10%] rounded-full blur-[60px] opacity-50 animate-pulse"
                style={{ backgroundColor: flavor.accentColor }}
              />


              <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-white/40 backdrop-blur-sm">
                <Image
                  src={flavor.image}
                  alt={flavor.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Tags floating below */}
              <div className="flex gap-2 mt-4 justify-center flex-wrap">
                {(flavor.tags || []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-widest text-gray-600 shadow-sm border border-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="flex flex-col space-y-8">
              {/* Label + Name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-4 h-4 text-[#708238] fill-current" />
                  <span className="text-[#708238] font-black uppercase tracking-[0.3em] text-xs">{flavor.label}</span>
                </div>
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-sm mb-2">{flavor.subtitle}</p>
                <h1 className="text-7xl sm:text-8xl lg:text-9xl font-display text-gray-900 uppercase leading-[0.85] tracking-tighter">
                  {flavor.name}
                </h1>

                {/* Price Display */}
                {flavor.price > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-baseline gap-2 mt-4 sm:mt-6"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-gray-300 uppercase tracking-widest">AED</span>
                    <span className="text-6xl sm:text-7xl font-black text-[#708238] tracking-tighter">{flavor.price}</span>
                  </motion.div>
                )}
              </motion.div>

              {/* Highlight badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="inline-flex items-center gap-3 bg-[#708238]/10 px-5 py-3 rounded-2xl self-start"
              >
                <Leaf className="w-4 h-4 text-[#708238]" />
                <span className="text-[#708238] font-bold text-sm">{flavor.highlight}</span>
              </motion.div>

              {/* Long description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-lg leading-relaxed max-w-xl whitespace-pre-line"
              >
                {flavor.longDesc}
              </motion.div>

              {flavor.category === 'equipment' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-col gap-6 mt-8 p-6 bg-white rounded-[32px] shadow-sm border border-gray-100"
                >
                  <h3 className="font-display text-gray-900 text-2xl uppercase">Kiosk Dimensions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-sm font-black uppercase tracking-widest text-[#708238]">Compact Kiosk</p>
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image src="/photos/KIOSK Size 2.jpeg" alt="Compact Kiosk Size" fill className="object-contain p-4" />
                      </div>
                      <p className="text-xs text-gray-500 text-center font-medium">114cm (W) x 70cm (D) x 200cm (H)</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-sm font-black uppercase tracking-widest text-[#708238]">Signature Kiosk</p>
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image src="/photos/KIOSK SIze.jpeg" alt="Signature Kiosk Size" fill className="object-contain p-4" />
                      </div>
                      <p className="text-xs text-gray-500 text-center font-medium">147cm (W) x 70cm (D) x 200cm (H)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Key Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {(flavor.ingredients || []).map((ing: string) => (
                    <span key={ing} className="px-3 py-1.5 bg-white rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100">
                      {ing}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200"
              >
                {(flavor.stats || []).map((stat: any) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-display text-gray-900 mb-1">{stat.val}</p>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-4 flex-wrap"
              >
                {(flavor.category === 'equipment' || flavor.id === 'mashbere-retail-kiosk') ? (
                  <Link
                    href={`/equipment?interest=${encodeURIComponent(flavor.name)}#contact`}
                    className="group bg-[#1C2410] text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-black/20 flex items-center gap-3 hover:bg-[#708238] hover:shadow-[#708238]/30 transition-all w-full sm:w-auto justify-center"
                  >
                    <Send size={18} />
                    Enquiry
                  </Link>
                ) : (
                  <>

                    <Link
                      href="/products"
                      className="group flex items-center gap-2 px-8 py-5 rounded-3xl font-black text-sm text-gray-500 uppercase tracking-widest hover:text-[#708238] transition-all bg-white shadow-sm border border-gray-100"
                    >
                      More Flavours
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </div>

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
