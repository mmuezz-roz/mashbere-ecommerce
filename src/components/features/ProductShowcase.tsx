"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const SHOWCASE_ITEMS = [
  { 
    id: 1, 
    name: "Tender Coconut", 
    label: "Creamy & Fresh",
    desc: "Crafted with 100% real coconut water and tender pulp for a refreshing island escape.",
    bgColor: "#E7F3F3", 
    textColor: "#1E3D3D", 
    image: "/photos/01.jpg",
    accentImage: "/photos/01.jpg" // Using same for floating effect
  },
  { 
    id: 2, 
    name: "Chocolate", 
    label: "Rich & Indulgent",
    desc: "Pure Belgian cocoa blended with organic cream for a velvety, dark chocolate experience.",
    bgColor: "#F5E6DA", 
    textColor: "#4A2C10", 
    image: "/photos/02.jpg",
    accentImage: "/photos/02.jpg"
  },
  { 
    id: 3, 
    name: "Pistachio", 
    label: "Nutty Perfection",
    desc: "Roasted premium pistachios from Bronte, Sicily, providing an unmatched earthy richness.",
    bgColor: "#EAF3DA", 
    textColor: "#2D361C", 
    image: "/photos/03.jpg",
    accentImage: "/photos/03.jpg"
  },
  { 
    id: 4, 
    name: "Watermelon", 
    label: "Summer Bliss",
    desc: "High-juice content watermelon with a hint of lime for the ultimate summer cooldown.",
    bgColor: "#F3E7EA", 
    textColor: "#4D1F28", 
    image: "/photos/04.jpg",
    accentImage: "/photos/04.jpg"
  },
  { 
    id: 5, 
    name: "Chikku", 
    label: "Natural Sweetness",
    desc: "The unique, malty sweetness of farm-fresh Sapota (Chikku) in every creamy bite.",
    bgColor: "#F3F0DA", 
    textColor: "#4D461F", 
    image: "/photos/05.jpg",
    accentImage: "/photos/05.jpg"
  },
  { 
    id: 6, 
    name: "Strawberry", 
    label: "Berry Fresh",
    desc: "Bursting with the flavor of sun-ripened organic strawberries and natural fruit chunks.",
    bgColor: "#F3E7F0", 
    textColor: "#4D1F43", 
    image: "/photos/06.jpg",
    accentImage: "/photos/06.jpg"
  },
  { 
    id: 7, 
    name: "Hazelnut", 
    label: "Golden Roast",
    desc: "Creamy hazelnut praline with crushed roasted bits for a sophisticated nutty crunch.",
    bgColor: "#F3F3F3", 
    textColor: "#333333", 
    image: "/photos/07.jpg",
    accentImage: "/photos/07.jpg"
  },
  { 
    id: 8, 
    name: "Mango", 
    label: "King of Fruits",
    desc: "Made with authentic Alphonso mangoes for a thick, golden, and tropical flavor burst.",
    bgColor: "#F3F0DA", 
    textColor: "#4D461F", 
    image: "/photos/08.jpg",
    accentImage: "/photos/08.jpg"
  },
];

export default function ProductShowcase() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Main scroll progress for the horizontal movement (sticky)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Early reveal progress for the text entrance (triggers as it comes into view)
  const { scrollYProgress: revealProgress } = useScroll({
    target: targetRef,
    offset: ["start 100%", "start 30%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const smoothReveal = useSpring(revealProgress, {
    stiffness: 100,
    damping: 30
  });

  const headingX = useTransform(smoothProgress, [0, 0.15, 1], ["0%", "-20%", "-20%"]);
  const cardsX = useTransform(smoothProgress, [0, 1], ["0%", "-88%"]);

  // Scroll Reveal for Heading Lines (now tied to early revealProgress)
  const textOpacity1 = useTransform(smoothReveal, [0, 0.4], [0, 1]);
  const textY1 = useTransform(smoothReveal, [0, 0.4], [60, 0]);
  
  const textOpacity2 = useTransform(smoothReveal, [0.2, 0.6], [0, 1]);
  const textY2 = useTransform(smoothReveal, [0.2, 0.6], [60, 0]);
  
  const textOpacity3 = useTransform(smoothReveal, [0.4, 0.8], [0, 1]);
  const textY3 = useTransform(smoothReveal, [0.4, 0.8], [60, 0]);

  return (
    <section ref={targetRef} className="relative h-[800vh] bg-[#FDFBF3]">
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row items-start lg:items-center overflow-hidden pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center h-full w-full">
          {/* Lead Heading Slide - Independent Transform */}
          <motion.div 
            style={{ x: isMobile ? 0 : headingX }}
            className="shrink-0 w-full lg:w-auto pl-8 sm:pl-12 lg:pl-[15vw] mb-12 lg:mb-0 lg:mr-60 flex flex-col justify-center z-10"
          >
            <div className="flex flex-col items-start text-left">
              <motion.div 
                style={{ opacity: textOpacity1, y: textY1 }}
                className="inline-flex items-center gap-2 bg-[#7E8D5F]/10 px-4 py-2 rounded-full text-[#7E8D5F] font-black text-xs uppercase tracking-widest mb-6 lg:mb-10"
              >
                <Star className="w-4 h-4 fill-current" />
                <span>Premium Collection</span>
              </motion.div>
              
              <h2 className="flex flex-col font-display text-gray-900 uppercase leading-[0.75] tracking-tighter">
                <motion.span 
                  style={{ opacity: textOpacity1, y: textY1 }}
                  className="text-[8vw] sm:text-5xl lg:text-7xl xl:text-8xl"
                >
                  WE HAVE 
                </motion.span>
                <motion.div 
                  style={{ opacity: textOpacity2, y: textY2 }}
                  className="relative inline-block w-fit my-2 lg:my-4"
                >
                  <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                  <span className="relative z-10 text-[12vw] sm:text-8xl lg:text-[9rem] xl:text-[11rem] text-white px-5 py-0 block">
                    FREAKING
                  </span>
                </motion.div>
                <motion.span 
                  style={{ opacity: textOpacity3, y: textY3 }}
                  className="text-[14vw] sm:text-9xl lg:text-[11rem] xl:text-[13rem]"
                >
                  DELICIOUS FLAVORS
                </motion.span>
              </h2>
            </div>
          </motion.div>

          {/* Cards Container - Independent Transform - Higher Z-Index */}
          <motion.div 
            style={{ x: cardsX }} 
            className="flex items-center gap-8 lg:gap-20 pr-[20vw] z-30 pl-8 lg:pl-0"
          >
            {SHOWCASE_ITEMS.map((item, index) => {
              // Calculate relative progress for each card to handle active/inactive states
              const start = 0.15 + (index * 0.1);
              const end = start + 0.1;
              
              // Scale and Opacity based on whether the card is in the center-ish area
              const scale = useTransform(smoothProgress, [start - 0.05, start, end], [0.9, 1, 0.9]);
              const opacity = useTransform(smoothProgress, [start - 0.05, start, end], [0.7, 1, 0.7]);
              
              // Parallax: Background moves slower
              const bgY = useTransform(smoothProgress, [start - 0.1, end + 0.1], ["0%", "10%"]);

              return (
                <motion.div 
                  key={item.id}
                  style={{ scale, opacity }}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  viewport={{ once: true }}
                  className="shrink-0 flex justify-center perspective-1000"
                >
                  <motion.div 
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-[90vw] lg:w-[779.23px] aspect-[779.23/571.58] rounded-[48px] overflow-visible shadow-2xl group/card"
                    style={{ 
                      backgroundColor: item.bgColor,
                      rotate: index % 2 === 0 ? '-3deg' : '3deg'
                    }}
                  >
                    {/* Bottom-aligned content */}
                    <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10 z-10 text-left">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B4513] mb-2 block">
                          {item.label}
                        </span>
                        <h3 className="text-3xl lg:text-5xl font-display uppercase leading-none text-white mb-4">
                          {item.name}
                        </h3>
                        <p className="text-sm lg:text-base text-white/70 font-medium leading-relaxed line-clamp-2" style={{ fontFamily: '"VC Nudge Trial Normal", sans-serif' }}>
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Overlay for depth */}
                    <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none z-30" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
