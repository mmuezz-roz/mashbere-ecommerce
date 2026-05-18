'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Quote, Package, ChevronDown } from 'lucide-react';

const slides = [
  {
    image: '/photos/ChatGPT Image May 12, 2026, 07_22_45 PM.webp',
    label: 'B2B Solutions',
    title: (
      <>
        <span>ICE CREAM</span>
        <div className="relative inline-block w-fit">
          <div className="absolute inset-0 bg-[#708238] -rotate-1 transform scale-y-110" />
          <span className="relative z-10 text-white px-2 sm:px-5 py-0 block">KIOSK SOLUTIONS</span>
        </div>
      </>
    ),
    description: 'Launch your business with ready-to-use ice cream kiosk solutions in the UAE. Mashbere provides premium ice products, reliable retail setups, and seamless logistics for high-performing locations.'
  },
  {
    image: '/photos/ChatGPT Image May 12, 2026, 01_31_49 PM.webp',
    mobileImage: '/photos/mobile view ice cup bg.webp',
    label: 'Professional Grade',
    title: (
      <>
        <span>Premium</span>
        <div className="relative inline-block w-fit">
          <div className="absolute inset-0 bg-[#708238] -rotate-1 transform scale-y-110" />
          <span className="relative z-10 text-white px-2 sm:px-5 py-0 block">Ice Cubes UAE</span>
        </div>
      </>
    ),
    description: 'Setting the Mashbere Ice Glass standard. Our Hygienic Ice Cup UAE technology ensures crystal clear, perfectly preserved ice for your business.   '
  }
];

export default function EquipmentHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isInteracting) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isInteracting]);

  const currentSlide = slides[currentIndex];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      className="relative h-[90svh] sm:min-h-[120vh] flex flex-col justify-start pt-[18svh] sm:pt-[22vh] overflow-hidden bg-[#141A0B]"
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      onTouchCancel={() => setIsInteracting(false)}
    >
      {/* Background Carousel - Simple Fade */}
      <AnimatePresence initial={false}>
        {slides.map((slide, index) => (
          index === currentIndex && (
            <motion.div
              key={slide.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0"
            >
              {/* Subtle dark overlay to normalize brightness and improve legibility */}
              <div className="absolute inset-0 bg-black/[0.08] z-10" />

              {/* Desktop Image */}
              <Image
                src={slide.image}
                alt={`Premium Equipment Showcase ${index + 1}`}
                fill
                priority
                className={`object-cover object-center ${slide.mobileImage ? 'hidden sm:block' : ''}`}
              />
              {/* Mobile Image */}
              {slide.mobileImage && (
                <Image
                  src={slide.mobileImage}
                  alt={`Premium Equipment Showcase ${index + 1} Mobile`}
                  fill
                  priority
                  className="object-cover object-center sm:hidden"
                />
              )}
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Content — pushed down from navbar on mobile, centred on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 left-5 sm:left-6 lg:left-8 right-5 sm:right-6 lg:left-8 max-w-4xl"
          >
            {/* Label badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#708238]/10 border border-[#708238]/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-6">
              <Package className="w-3.5 h-3.5 text-[#708238]" />
              <span className="text-[#708238] text-[9px] sm:text-xs font-black uppercase tracking-widest">
                {currentSlide.label}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={itemVariants} className="text-[10.5vw] min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display uppercase tracking-tighter leading-[0.88] mb-3 sm:mb-6 flex flex-col items-start gap-1 sm:gap-2">
              {currentSlide.title}
            </motion.h1>

            {/* Description Container with Independent Glass Box */}
            <motion.div variants={itemVariants} className="relative mb-6 sm:mb-10 w-fit group">
              {/* Premium Glass Box - Only for Slide 2 */}
              {currentIndex === 1 && (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  className="absolute inset-0 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl z-0" 
                  style={{ backfaceVisibility: 'hidden' }}
                />
              )}

                  {/* Description — visible on most screens */}
                  <p className={`relative z-10 hidden min-[400px]:block text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed max-w-xs sm:max-w-2xl font-semibold ${
                    currentIndex === 1 ? 'p-4 sm:p-6 lg:p-8 text-[#141A0B]' : 'text-[#141A0B]/80'
                  }`}>
                    {currentSlide.description}
                  </p>

                  {/* Short version on tiny screens */}
                  <p className={`relative z-10 block min-[400px]:hidden text-xs leading-snug max-w-[260px] font-bold ${
                    currentIndex === 1 ? 'p-3.5 text-[#141A0B]' : 'text-[#141A0B]/75'
                  }`}>
                    {currentSlide.description}
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 sm:gap-4">
                  <a
                    href="#contact"
                    aria-label="Request a business quote"
                    className="flex items-center justify-center gap-2 bg-[#708238] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full font-black text-[10px] sm:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#708238]/20"
                  >
                    <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Get a Quote
                  </a>
                  <a
                    href="#products"
                    aria-label="View our full equipment catalog"
                    className={`flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full font-black text-[10px] sm:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border ${
                      currentIndex === 1
                        ? 'bg-[#EAF3DA] border-[#EAF3DA] text-[#141A0B] shadow-lg shadow-[#EAF3DA]/20'
                        : 'bg-[#141A0B]/5 border-[#141A0B]/10 text-[#141A0B] hover:border-[#141A0B]/20'
                    }`}
                  >
                    View Catalog
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-[20%] sm:bottom-[15%] left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group relative py-2"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`h-1 rounded-full transition-all duration-700 ease-in-out ${
                idx === currentIndex ? 'w-12 sm:w-16 bg-[#708238]' : 'w-6 sm:w-8 bg-[#141A0B]/20 group-hover:bg-[#141A0B]/40'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
