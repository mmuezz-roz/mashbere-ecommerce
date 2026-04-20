'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section 
      className="relative h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#141A0B]"
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

      {/* Content Container (Spacing matching screenshot) */}
      <div className="relative z-20 container-responsive flex flex-col items-center text-center pt-[35vh]">
        
        {/* Massive Two-Line Heading (Exact casing and punctuation) */}
        <motion.h1 
          className="flex flex-col items-center leading-[0.8] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[14vw] sm:text-[9rem] lg:text-[11rem] font-display text-white uppercase tracking-tight drop-shadow-2xl">
            "SCOOP UP SOME
          </span>
          <span className="text-[14vw] sm:text-[9rem] lg:text-[11rem] font-display text-[#C4EB54] uppercase tracking-tight drop-shadow-2xl">
            SWEETNESS!
          </span>
        </motion.h1>

        {/* Supporting Description (Exact text and punctuation) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-medium mb-12"
        >
          "Nothing beats the creamy, dreamy bliss of a perfectly scooped ice cream on 
          a warm day. Whether it's the rich decadence of chocolate,
        </motion.p>

        {/* Visual Element & Centered Button (Pill style matching ref) */}
        <div className="relative w-full max-w-3xl flex justify-center items-end">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative w-full aspect-[4/3] flex items-center justify-center"
          >
             {/* The CTA Button is overlaid on the visual as per the screenshot */}
             <div className="absolute bottom-10 z-30">
               <Link
                 href="/products"
                 className="bg-[#141A0B]/90 text-white px-10 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-2xl hover:bg-[#C4EB54] hover:text-[#141A0B] transition-all border border-white/10"
               >
                 Shop Now
               </Link>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
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
