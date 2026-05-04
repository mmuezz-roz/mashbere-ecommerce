'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BodyReveal } from '@/components/shared/TextReveal';
import { ScrollRevealHeading } from '@/components/shared/ScrollRevealHeading';

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

        {/* Main Heading — line-by-line clip reveal on load */}
        <ScrollRevealHeading
          lines={[
            <span key="l1" className="text-[14vw] sm:text-6xl md:text-7xl lg:text-[8rem] font-display text-white uppercase tracking-tight drop-shadow-2xl">
              &quot;SCOOP UP SOME
            </span>,
            <div key="l2" className="relative inline-block w-fit -mt-2 sm:-mt-4 lg:-mt-6">
              <div className="absolute inset-0 bg-[#C4EB54] -rotate-2 transform scale-y-110 shadow-[0_0_40px_rgba(196,235,84,0.3)]" />
              <span className="relative z-10 text-[17vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-display text-[#141A0B] px-4 sm:px-8 py-0 block tracking-tight">
                SWEETNESS!&quot;
              </span>
            </div>,
          ]}
          className="flex flex-col items-center leading-[0.75] mb-6 sm:mb-8"
        />

        {/* Supporting Description */}
        <BodyReveal
          className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-medium mb-10 sm:mb-12 px-2"
          delay={0.55}
          margin="0px"
        >
          Take a moment to indulge - every scoop reveals rich flavor, silky texture, and a perfectly balanced sweetness crafted to delight your senses.
        </BodyReveal>

        {/* CTA Button */}
        <BodyReveal delay={0.75} margin="0px">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <Link
              href="/products"
              className="inline-block bg-[#C4EB54] text-[#141A0B] px-10 sm:px-14 py-4 rounded-full font-black text-sm sm:text-base uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Explore Flavours
            </Link>
          </div>
        </BodyReveal>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-5 h-8 border border-white/20 rounded-full flex justify-center p-1 z-40">
        <div className="w-1 h-2 bg-white/40 rounded-full scroll-indicator-dot" />
      </div>
    </section>
  );
}
