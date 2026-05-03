"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
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
];

export default function ProductShowcase() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  const [screenWidth, setScreenWidth] = React.useState(1200);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  });

  const smoothReveal = useSpring(revealProgress, {
    stiffness: 100,
    damping: 30
  });

  const headingX = useTransform(scrollYProgress, [0, 0.15, 1], ["0%", "-20%", "-20%"]);
  const translateEnd = React.useMemo(() => {
    if (screenWidth < 640) return "-86%";
    return "-95%";
  }, [screenWidth]);

  const cardsX = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", translateEnd]
  );

  // Scroll Reveal for Heading Lines (now tied to early revealProgress)
  const textOpacity1 = useTransform(smoothReveal, [0, 0.4], [0, 1]);
  const textY1 = useTransform(smoothReveal, [0, 0.4], [60, 0]);
  
  const textOpacity2 = useTransform(smoothReveal, [0.2, 0.6], [0, 1]);
  const textY2 = useTransform(smoothReveal, [0.2, 0.6], [60, 0]);
  
  const textOpacity3 = useTransform(smoothReveal, [0.4, 0.8], [0, 1]);
  const textY3 = useTransform(smoothReveal, [0.4, 0.8], [60, 0]);

  return (
    <section ref={targetRef} className={`relative bg-[#FDFBF3] ${isMobile ? 'h-[600vh]' : 'h-[1200vh]'}`}>
      <div className="sticky top-0 h-screen flex flex-col sm:flex-row items-start sm:items-center pt-20 sm:pt-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center h-full w-full">
          <motion.div 
            style={{ x: isMobile ? 0 : headingX }}
            className="shrink-0 w-full sm:w-auto pl-8 sm:pl-12 lg:pl-[15vw] mb-12 sm:mb-0 sm:mr-16 lg:mr-60 flex flex-col justify-center z-10"
          >
            <div className="flex flex-col items-start text-left max-w-4xl">
              <h2 className="flex flex-col font-display text-gray-900 uppercase leading-[0.75] tracking-tighter">
                <motion.span 
                  style={{ opacity: textOpacity1, y: textY1 }}
                  className="text-[8vw] sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl"
                >
                  WE HAVE 
                </motion.span>
                <motion.div 
                  style={{ opacity: textOpacity2, y: textY2 }}
                  className="relative inline-block w-fit my-2 lg:my-4"
                >
                  <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                  <span className="relative z-10 text-[12vw] sm:text-6xl md:text-7xl lg:text-[9rem] xl:text-[11rem] text-white px-5 py-0 block">
                    FREAKING
                  </span>
                </motion.div>
                <motion.span 
                  style={{ opacity: textOpacity3, y: textY3 }}
                  className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[10rem] xl:text-[12rem]"
                >
                  DELICIOUS FLAVORS
                </motion.span>
              </h2>
            </div>
          </motion.div>

          {/* Cards Container - Independent Transform - Higher Z-Index */}
          <motion.div 
            style={{ x: cardsX }} 
            className="flex items-center gap-8 sm:gap-12 lg:gap-20 pr-[20vw] z-30 pl-8 sm:pl-0"
          >
            {SHOWCASE_ITEMS.map((item, index) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                index={index} 
                smoothProgress={smoothProgress} 
                isMobile={isMobile}
              />
            ))}
            
            {/* Explore All Flavours Circular Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: isMobile ? "100px" : "100px" }}
              className="shrink-0 flex justify-center items-center h-[50vh] px-8 sm:px-16"
            >
              <Link 
                href="/products"
                className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full bg-[#1C2410] text-white flex flex-col items-center justify-center gap-2 sm:gap-4 transition-all duration-500 hover:scale-110 hover:bg-[#708238] shadow-2xl group/cta"
              >
                <span className="font-display uppercase text-xl sm:text-2xl lg:text-3xl text-center leading-[1.1] tracking-wide">
                  Explore <br /> All <br /> Flavours
                </span>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 group-hover/cta:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        

      </div>
    </section>
  );
}

function ProductCard({ item, index, smoothProgress, isMobile }: { item: any, index: number, smoothProgress: any, isMobile: boolean }) {
  const router = useRouter();
  
  // Define mapped popsicle data based on index
  const popsicleMap: Record<number, string> = {
    0: 'chikku',
    1: 'mango',
    2: 'tender-coconut',
    3: 'strawberry',
    4: 'pistachio',
    5: 'chocolate',
    6: 'guava'
  };

  const handleCardClick = () => {
    const slug = popsicleMap[index];
    if (slug) {
      router.push(`/products/${slug}`);
    }
  };
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
      initial={{ x: isMobile ? 20 : 40, opacity: 0, scale: 0.95 }}
      whileInView={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: 0, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      viewport={{ once: true, margin: isMobile ? "100px" : "100px" }}
      className="shrink-0 flex justify-center perspective-1000"
    >
      <motion.div 
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleCardClick}
        className="relative w-[90vw] md:w-[500px] lg:w-[779.23px] aspect-[779.23/571.58] rounded-[48px] overflow-visible shadow-2xl group/card cursor-pointer"
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
                className="object-cover will-change-transform"
              />
            </div>

            {/* 1.5 Decorative Text Layer - CHIKKU */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none will-change-transform">
                CHIKKU
              </span>
            </div>
            
            {/* 2. Middle Layer (Chickku) - Overlaps Top */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/ChatGPT Image May 1, 2026, 03_19_32 PM.png"
                alt="Chickku Detail"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Popsicle) - Overlaps Top + High Shadow */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
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
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform"
              >
                <Image 
                  src="/photos/ChatGPT_Image_Apr_30__2026__05_31_32_PM-removebg-preview.png"
                  alt="Premium Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {index === 1 && (
          <>
            {/* 1. Background Image - scaled up to hide white edges */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden">
              <Image 
                src="/photos/mango cardbg.png"
                alt="Mango Card Background"
                fill
                className="object-cover scale-[1.15] will-change-transform"
              />
            </div>

            {/* 1.5 Decorative Text Layer - MANGO */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1 will-change-transform">
                <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none leading-none">
                  MANGO
                </span>
                <span className="font-display text-2xl lg:text-4xl text-white/70 uppercase tracking-widest select-none leading-none">
                  ALPHONSO
                </span>
              </div>
            </div>
            
            {/* 2. Middle Layer (Mango Pieces) - Parallax */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/mango pieces-Photoroom.png"
                alt="Mango Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Mango Popsicle) - Floating Animation */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
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
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform"
              >
                <Image 
                  src="/photos/mango popsicle.webp"
                  alt="Mango Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-85 lg:scale-115"
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          </>
        )}


        {index === 2 && (
          <>
            {/* 1. Background Image - Stays clipped */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden">
              <Image 
                src="/photos/ChatGPT Image May 2, 2026, 05_20_20 PM.png"
                alt="Tender Coconut Card Background"
                fill
                className="object-fill scale-[2.2] will-change-transform"
              />
            </div>

            {/* 1.5 Decorative Text Layer - TENDER COCONUT */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1 will-change-transform">
                <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none leading-none">
                  TENDER
                </span>
                <span className="font-display text-2xl lg:text-4xl text-white/70 uppercase tracking-widest select-none leading-none">
                  COCONUT
                </span>
              </div>
            </div>
            
            {/* 2. Middle Layer (Tender Pieces) - Overlaps Top */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/tender og pieces.png"
                alt="Tender Coconut Pieces"
                fill
                className="object-contain scale-[0.85]"
              />
            </motion.div>

            {/* 3. Top Layer (Tender Popsicle) - Overlaps Top + Floating Animation */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
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
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform"
              >
                <Image 
                  src="/photos/tender popsicle.png"
                  alt="Tender Coconut Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {index === 3 && (
          <>
            {/* 1. Background Image - Stays clipped */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden">
              <Image 
                src="/photos/strawberry bg card.png"
                alt="Strawberry Card Background"
                fill
                className="object-cover scale-110 will-change-transform"
              />
            </div>

            {/* 1.5 Decorative Text Layer - STRAWBERRY */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1 will-change-transform">
                <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none leading-none">
                  STRAWBERRY
                </span>
                <span className="font-display text-2xl lg:text-4xl text-white/70 uppercase tracking-widest select-none leading-none">
                  SWEET & TART
                </span>
              </div>
            </div>
            
            {/* 2. Middle Layer (Strawberry Pieces) - Overlaps Top */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/Strawberry pices.webp"
                alt="Strawberry Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Strawberry Popsicle) - Overlaps Top + Floating Animation */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
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
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform"
              >
                <Image 
                  src="/photos/strwberry ppsicle.webp"
                  alt="Strawberry Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {index === 4 && (
          <>
            {/* 1. Background Image - Stays clipped */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden">
              <Image 
                src="/photos/pistatio bg card.webp"
                alt="Pistachio Card Background"
                fill
                className="object-cover scale-110 will-change-transform"
              />
            </div>

            {/* 1.5 Decorative Text Layer - PISTACHIO */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1 will-change-transform">
                <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none leading-none">
                  PISTACHIO
                </span>
                <span className="font-display text-2xl lg:text-4xl text-white/70 uppercase tracking-widest select-none leading-none">
                  BRONTE GOLD
                </span>
              </div>
            </div>
            
            {/* 2. Middle Layer (Pista Pieces) - Overlaps Top */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/pista pieces.webp"
                alt="Pistachio Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Pistachio Popsicle) - Overlaps Top + Floating Animation */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
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
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform"
              >
                <Image 
                  src="/photos/pistatio popsicle.webp"
                  alt="Pistachio Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {index === 5 && (
          <>
            {/* 1. Background Image - Stays clipped */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden">
              <Image 
                src="/photos/chocolate bgcard.webp"
                alt="Chocolate Card Background"
                fill
                className="object-cover scale-110 will-change-transform"
              />
            </div>

            {/* 1.5 Decorative Text Layer - CHOCOLATE */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1 will-change-transform">
                <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none leading-none">
                  CHOCOLATE
                </span>
                <span className="font-display text-2xl lg:text-4xl text-white/70 uppercase tracking-widest select-none leading-none">
                  BELGIAN DARK
                </span>
              </div>
            </div>
            
            {/* 2. Middle Layer (Chocolate Pieces) - Overlaps Top */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/chcoalte peices.webp"
                alt="Chocolate Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Chocolate Popsicle) - Overlaps Top + Floating Animation */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
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
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform"
              >
                <Image 
                  src="/photos/chcolate popsicle.webp"
                  alt="Chocolate Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-85 lg:scale-115"
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {index === 6 && (
          <>
            {/* 1. Background Image - Stays clipped */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden">
              <Image 
                src="/photos/guava bgCard.webp"
                alt="Guava Card Background"
                fill
                className="object-cover scale-110 will-change-transform"
              />
            </div>

            {/* 1.5 Decorative Text Layer - GUAVA */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1 will-change-transform">
                <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none leading-none">
                  GUAVA
                </span>
                <span className="font-display text-2xl lg:text-4xl text-white/70 uppercase tracking-widest select-none leading-none">
                  PINK BLISS
                </span>
              </div>
            </div>
            
            {/* 2. Middle Layer (Guava Pieces) - Overlaps Top */}
            <motion.div 
              style={{ x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/guava pieces seeds.webp"
                alt="Guava Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Guava Popsicle) - Overlaps Top + Floating Animation */}
            <motion.div 
              style={{ x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
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
                className="relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform"
              >
                <Image 
                  src="/photos/guava poposicle.webp"
                  alt="Guava Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-85 lg:scale-115"
                  priority={index < 2}
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

