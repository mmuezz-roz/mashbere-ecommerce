'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GooeyButton from '@/components/ui/GooeyButton';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center sm:justify-start overflow-hidden bg-[#141A0B]"
    >
      {/* Background Image (Cover) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/green_hero_splash.png"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141A0B]/80 via-transparent to-[#141A0B]" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 container-responsive flex flex-col items-center text-center pt-10 sm:pt-36 lg:pt-[30vh] pb-10 sm:pb-32 lg:pb-40">

        {/* Main Heading — scales gracefully across all viewports */}
        <motion.h1
          className="flex flex-col items-center leading-[0.85] mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11vw] sm:text-7xl lg:text-[9rem] font-display text-white uppercase tracking-tight drop-shadow-2xl">
            "SCOOP UP SOME
          </span>
          <span className="text-[11vw] sm:text-7xl lg:text-[9rem] font-display text-[#C4EB54] uppercase tracking-tight drop-shadow-2xl">
            SWEETNESS!"
          </span>
        </motion.h1>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-medium mb-10 sm:mb-12 px-2"
        >
          Take a moment to indulge  - every scoop reveals rich flavor, silky texture, and a perfectly balanced sweetness crafted to delight your senses.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <GooeyButton particleCount={20} particleDistances={[120, 10]}>
            <Link
              href="/products"
              className="inline-block bg-[#C4EB54] text-[#141A0B] px-10 sm:px-14 py-4 rounded-full font-black text-sm sm:text-base uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Shop Now
            </Link>
          </GooeyButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-5 h-8 border border-white/20 rounded-full flex justify-center p-1 z-40"
      >
        <div className="w-1 h-2 bg-white/40 rounded-full" />
      </motion.div>
    </section>
  );
}
