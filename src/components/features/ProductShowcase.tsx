"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

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
    stiffness: 40,
    damping: 25,
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
    <section ref={targetRef} className="relative h-[1200vh] bg-[#FDFBF3]">
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
            {SHOWCASE_ITEMS.map((item, index) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                index={index} 
                smoothProgress={smoothProgress} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item, index, smoothProgress }: { item: any, index: number, smoothProgress: any }) {
  const mouseX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const start = 0.15 + (index * 0.1);
  const end = start + 0.1;
  const scale = useTransform(smoothProgress, [start - 0.05, start, end], [0.9, 1, 0.9]);

  // Parallax transforms: Hover right (0.5) -> move left (-X)
  const chickkuX = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const chickkuY = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  
  const popsicleX = useTransform(mouseX, [-0.5, 0.5], [40, -40]);
  const popsicleY = useTransform(mouseY, [-0.5, 0.5], [40, -40]);

  return (
    <motion.div 
      style={{ scale }}
      initial={{ x: 100, scale: 0.95 }}
      whileInView={{ x: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      viewport={{ once: true }}
      className="shrink-0 flex justify-center perspective-1000"
    >
      <motion.div 
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[90vw] lg:w-[779.23px] aspect-[779.23/571.58] rounded-[48px] overflow-visible shadow-2xl group/card"
        style={{ 
          backgroundColor: item.bgColor,
          rotate: index % 2 === 0 ? '-3deg' : '3deg'
        }}
      >
        {index === 0 && (
          <>
            {/* 1. Background Image - Stays clipped */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden">
              <Image 
                src="/photos/ChatGPT Image May 1, 2026, 03_10_13 PM.png"
                alt="Card Background"
                fill
                className="object-cover"
              />
            </div>
            
            {/* 2. Middle Layer (Chickku) - Overlaps Top */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
            >
              <Image 
                src="/photos/ChatGPT Image May 1, 2026, 03_19_32 PM.png"
                alt="Chickku Detail"
                fill
                className="object-contain"
                quality={100}
                unoptimized
              />
            </motion.div>

            {/* 3. Top Layer (Popsicle) - Overlaps Top + High Shadow */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: index % 2 === 0 ? [12, 15, 12] : [-12, -15, -12]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center"
              >
                <Image 
                  src="/photos/ChatGPT_Image_Apr_30__2026__05_31_32_PM-removebg-preview.png"
                  alt="Premium Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  quality={100}
                  unoptimized
                  priority
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Overlay for depth (inner border) */}
        <div className="absolute inset-0 border border-white/10 rounded-[48px] pointer-events-none z-30" />
      </motion.div>
    </motion.div>
  );
}

