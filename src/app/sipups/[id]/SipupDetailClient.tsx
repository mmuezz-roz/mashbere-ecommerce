'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ChevronRight, Leaf, Activity } from 'lucide-react';
import { buildProductSchema } from '@/lib/schema';
import { ShareButton } from '@/components/shared/ShareButton';

interface Props {
  sipup: any;
}

export default function SipupDetailClient({ sipup }: Props) {
  const router = useRouter();

  const accentColor = sipup.accentColor || '#E8F5E9';

  return (
    <main className="min-h-screen bg-[#FDFCFD] relative overflow-hidden font-sans">
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

      {/* Radial background glow — matches popsicle style */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent)` }}
      />

      <div className="container-responsive pt-28 sm:pt-36 lg:pt-44 pb-10 lg:pb-20 relative z-10">

        {/* Top Nav: back + share */}
        <div className="flex items-center justify-between mb-12 lg:mb-20">
          <Link
            href="/products?category=sip-up"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label="Back to SipUps"
          >
            <ArrowLeft size={18} />
          </Link>

          {/* Category badge — centre */}
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest">
            <Star className="w-4 h-4 fill-current" />
            <span>Premium SipUp Collection</span>
          </div>

          <ShareButton
            name={sipup.name}
            description={sipup.desc || sipup.description}
            slug={sipup.id}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square max-w-xl mx-auto lg:mx-0 w-full"
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-full blur-[80px] opacity-40 animate-pulse"
              style={{ backgroundColor: accentColor }}
            />

            <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-12">
              <Image
                src={sipup.image}
                alt={sipup.name}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col items-start space-y-8 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Label above name */}
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs sm:text-sm">
                {sipup.label || sipup.subtitle || 'Premium SipUp'}
              </span>

              {/* Big display name — same scale as popsicle page */}
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display text-gray-900 leading-[0.85] uppercase tracking-tighter">
                {sipup.name}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl"
            >
              {sipup.desc || sipup.longDesc}
            </motion.p>

            {/* Highlight + Dietary badges */}
            {(sipup.highlight || true) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
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
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 w-full"
            >
              <Link
                href="/products?category=sip-up"
                className="group flex items-center gap-3 px-10 py-5 rounded-3xl font-black text-base text-gray-900 uppercase tracking-widest hover:text-primary transition-all bg-white shadow-sm border border-gray-100 w-full sm:w-auto justify-center"
              >
                <span>View All SipUps</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats grid */}
            {(sipup.stats || []).length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100 w-full"
              >
                {(sipup.stats || []).map((stat: any) => (
                  <div key={stat.label} className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 tracking-widest">{stat.label}</p>
                    <p className="text-xl font-display text-gray-900">{stat.val}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              /* Fallback stats if none in DB — same as popsicle page */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100 w-full"
              >
                {[
                  { label: 'CALORIES', val: '90' },
                  { label: 'REAL FRUIT', val: '100%' },
                  { label: 'NO ADDED', val: 'Colours' }
                ].map(stat => (
                  <div key={stat.label} className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 tracking-widest">{stat.label}</p>
                    <p className="text-xl font-display text-gray-900">{stat.val}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
