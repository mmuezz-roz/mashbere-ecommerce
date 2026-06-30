'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Leaf, Activity } from 'lucide-react';
import { buildProductSchema } from '@/lib/schema';
import { ShareButton } from '@/components/shared/ShareButton';

interface Props {
  sipup: any;
}

export default function SipupDetailClient({ sipup }: Props) {
  const router = useRouter();

  const accentColor = sipup.accentColor || '#E8F5E9';

  return (
    <main
      className="min-h-screen font-sans"
      style={{ background: `linear-gradient(135deg, ${accentColor}, #FFFFFF)` }}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildProductSchema({
              name: sipup.name,
              image: sipup.image,
              description: sipup.desc || sipup.longDesc || sipup.description,
              url: `/sipups/${sipup.id}`,
              price: sipup.price || 0,
            })
          ),
        }}
      />

      {/* Fixed radial colour glow — mirrors popsicle page */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 60% 30%, ${accentColor}40, transparent 60%)` }}
      />

      <div className="relative z-10">
        {/* Top Nav */}
        <div className="container-responsive pt-24 sm:pt-28 lg:pt-36 pb-4 sm:pb-6 lg:pb-8">
          <div className="flex items-center justify-between">
            <Link
              href="/products?category=sip-up"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Back to SipUps"
            >
              <ArrowLeft size={18} />
            </Link>

            <ShareButton
              name={sipup.name}
              description={sipup.desc || sipup.description}
              slug={sipup.id}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="container-responsive pb-12 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Image Section — identical structure to popsicle page */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square max-w-xl mx-auto lg:mx-0 w-full"
            >
              <div
                className="absolute inset-[10%] rounded-full blur-[60px] opacity-30 animate-pulse"
                style={{ backgroundColor: accentColor }}
              />

              <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-white/40 backdrop-blur-sm border border-white/40">
                <Image
                  src={sipup.image}
                  alt={sipup.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />

                {/* Logo + label badge — same as popsicle */}
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <Image src="/photos/mashbere_logo_no_bg.webp" alt="Mashbere" width={24} height={24} />
                  </div>
                  <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/20">
                    <p className="text-white font-black text-[10px] uppercase tracking-widest">Premium SipUp</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Typography & Description — mirrors popsicle layout */}
            <div className="flex flex-col items-start space-y-6 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 w-full"
              >
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs lg:text-sm mb-2">
                  {sipup.label || sipup.subtitle || 'Premium SipUp'}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-display text-gray-900 uppercase leading-[0.9] lg:leading-[0.85] tracking-tighter mb-5 lg:mb-6">
                  {sipup.name}
                </h1>

                {/* Highlight badges */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  {sipup.highlight && (
                    <div className="inline-flex items-center gap-3 bg-[#708238]/10 px-5 py-2.5 rounded-2xl">
                      <Leaf className="w-4 h-4 text-[#708238]" />
                      <span className="text-[#708238] font-bold text-sm">{sipup.highlight}</span>
                    </div>
                  )}
                  <Link
                    href="/dietary"
                    className="inline-flex items-center gap-2 bg-[#708238]/5 border border-[#708238]/20 px-5 py-2.5 rounded-2xl text-xs font-bold text-[#708238] hover:bg-[#708238]/10 hover:border-[#708238]/30 transition-all duration-300 active:scale-[0.98]"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Dietary &amp; Allergen Guide</span>
                  </Link>
                </div>

                {/* Description */}
                <div className="space-y-6 lg:space-y-8">
                  <p className="text-gray-500 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed">
                    {sipup.desc || sipup.longDesc}
                  </p>
                </div>
              </motion.div>

              {/* CTA — mirrors popsicle page exactly */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4 w-full sm:w-auto"
              >
                <div className="space-y-6">
                  <Link
                    href="/products?category=sip-up"
                    className="group flex items-center gap-3 px-10 py-5 rounded-3xl font-black text-sm text-gray-600 uppercase tracking-widest hover:text-[#708238] transition-all bg-white shadow-sm border border-gray-100 hover:shadow-lg w-full sm:w-auto justify-center"
                  >
                    View More SipUps
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Delivery guarantee chip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="p-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl max-w-md flex items-start gap-3 shadow-[0_4px_20px_-4px_rgba(112,130,56,0.05)]"
                  >
                    <span className="text-xl leading-none mt-0.5 shrink-0 select-none">❄️</span>
                    <div className="text-xs text-gray-500 leading-relaxed font-medium">
                      UAE Same-Day Cold-Chain Delivery. See our{' '}
                      <Link href="/delivery" className="text-[#708238] font-bold underline decoration-[#708238]/30 hover:decoration-[#708238] transition-all">
                        Zero-Melt Guarantee
                      </Link>.
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Stats grid — same as popsicle fallback */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100 w-full"
              >
                {((sipup.stats || []).length > 0
                  ? sipup.stats
                  : [
                      { label: 'CALORIES', val: '90' },
                      { label: 'REAL FRUIT', val: '100%' },
                      { label: 'NO ADDED', val: 'Colours' },
                    ]
                ).map((stat: any) => (
                  <div key={stat.label} className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 tracking-widest">{stat.label}</p>
                    <p className="text-xl font-display text-gray-900">{stat.val}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
