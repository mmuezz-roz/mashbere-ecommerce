"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';

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

  // Single spring on scroll — don't double-spring (was causing lag)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  // Light spring for reveal — keep it snappy
  const smoothReveal = useSpring(revealProgress, {
    stiffness: 200,
    damping: 35
  });

  const headingX = useTransform(smoothProgress, [0, 0.15, 1], ["0%", "-50%", "-50%"]);
  const translateEnd = React.useMemo(() => {
    if (screenWidth < 640) return "-86%";
    return "-95%";
  }, [screenWidth]);

  const cardsX = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", translateEnd]
  );

  // Premium Entrance Animations for Text
  const headingVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const lineVariants: Variants = {
    hidden: { y: "100%", filter: "blur(8px)" },
    visible: { 
      y: "0%", 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } 
    }
  };

  const centerClipVariants: Variants = {
    hidden: { clipPath: "inset(-20% 50% -20% 50%)", filter: "blur(8px)", scale: 0.95 },
    visible: { 
      clipPath: "inset(-20% -20% -20% -20%)", 
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  // Mobile: Swipe Down Indicator (appears at 2nd card)
  // Index 0: 0.15 start, 0.25 end
  // Index 1: 0.25 start, 0.35 end
  const swipeIndicatorOpacity = useTransform(smoothProgress, [0.22, 0.3], [0, 1]);
  const swipeIndicatorY = useTransform(smoothProgress, [0.22, 0.3], [20, 0]);

  return (
    <section ref={targetRef} className={`relative bg-[#FDFBF3] ${isMobile ? 'h-[600vh]' : 'h-[1200vh]'}`}>
      <div className="sticky top-0 h-screen flex flex-col sm:flex-row items-start sm:items-center overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center h-full w-full">
          <motion.div 
            style={{ x: isMobile ? 0 : headingX }}
            className="shrink-0 w-full sm:w-auto pl-8 sm:pl-12 lg:pl-[15vw] pt-32 lg:pt-0 mb-12 sm:mb-0 sm:mr-16 lg:mr-60 flex flex-col justify-center z-10"
          >
            <div className="flex flex-col items-start text-left max-w-4xl">
              <motion.h2 
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
                className="flex flex-col font-display text-gray-900 uppercase leading-[0.75] tracking-tighter"
              >
                <div className="overflow-hidden pb-1">
                  <motion.span 
                    variants={lineVariants}
                    className="block text-[8vw] sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl will-change-transform"
                  >
                    WE HAVE 
                  </motion.span>
                </div>
                
                <motion.div 
                  variants={centerClipVariants}
                  className="relative inline-block w-fit my-2 lg:my-4 will-change-transform"
                >
                  <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                  <span className="relative z-10 text-[12vw] sm:text-6xl md:text-7xl lg:text-[9rem] xl:text-[11rem] text-white px-5 py-0 block">
                    FREAKING
                  </span>
                </motion.div>

                <div className="overflow-hidden pt-1">
                  <motion.span 
                    variants={lineVariants}
                    className="block text-[12vw] sm:text-6xl md:text-7xl lg:text-[10rem] xl:text-[12rem] lg:whitespace-nowrap will-change-transform"
                  >
                    DELICIOUS FLAVORS
                  </motion.span>
                </div>
              </motion.h2>
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
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true, margin: isMobile ? "100px" : "100px" }}
              className="shrink-0 flex justify-center items-center h-[50vh] px-8 sm:px-16"
            >
              <Link 
                href="/products"
                className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full bg-transparent border-2 sm:border-4 border-[#7E8D5F] text-[#7E8D5F] flex flex-col items-center justify-center gap-2 sm:gap-4 transition-all duration-500 hover:scale-110 hover:bg-[#7E8D5F] hover:text-white shadow-xl hover:shadow-2xl group/cta"
              >
                <span className="font-display uppercase text-xl sm:text-2xl lg:text-3xl text-center leading-[1.1] tracking-wide">
                  Explore <br /> All <br /> Flavours
                </span>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 group-hover/cta:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Swipe Down for Pookies Indicator (Mobile Only) */}
        {isMobile && (
          <motion.div 
            style={{ opacity: swipeIndicatorOpacity, y: swipeIndicatorY }}
            className="absolute bottom-10 left-0 right-0 z-[50] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="w-12 h-1.5 bg-black/10 rounded-full mb-3" />
            <span className="font-display uppercase text-gray-900 tracking-[0.2em] text-[11px] sm:text-xs font-black opacity-60 text-center px-4">
              Swipe down for Pookies
            </span>
            <div className="mt-2 text-gray-900/40 swipe-bounce">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 13 5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ item, index, smoothProgress, isMobile }: { item: any, index: number, smoothProgress: any, isMobile: boolean }) {
  const router = useRouter();

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
    if (slug) router.push(`/products/${slug}`);
  };

  // Parallax mouse tracking — only on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax transforms
  const chickkuX = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const chickkuY = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const popsicleX = useTransform(springX, [-0.5, 0.5], [40, -40]);
  const popsicleY = useTransform(springY, [-0.5, 0.5], [40, -40]);

  // Float direction alternates per card — CSS handles the infinite loop (GPU-accelerated, no JS)
  const floatClass = index % 2 === 0 ? 'card-float-even' : 'card-float-odd';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      viewport={{ once: true, margin: '100px' }}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      className="shrink-0 flex justify-center perspective-1000"
    >
      <motion.div
        whileHover={isMobile ? undefined : { y: -8, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
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
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/ChatGPT Image May 1, 2026, 03_19_32 PM.png"
                alt="Chickku Detail"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Popsicle) - CSS float animation (GPU-only, no JS) */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/ChatGPT_Image_Apr_30__2026__05_31_32_PM-removebg-preview.png"
                  alt="Premium Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={false}
                />
              </div>
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
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/mango pieces-Photoroom.png"
                alt="Mango Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Mango Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/mango popsicle.webp"
                  alt="Mango Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-85 lg:scale-115"
                  priority={false}
                />
              </div>
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
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/tender og pieces.png"
                alt="Tender Coconut Pieces"
                fill
                className="object-contain scale-[0.85]"
              />
            </motion.div>

            {/* 3. Top Layer (Tender Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/tender popsicle.png"
                  alt="Tender Coconut Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={false}
                />
              </div>
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
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/Strawberry pices.webp"
                alt="Strawberry Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Strawberry Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/strwberry ppsicle.webp"
                  alt="Strawberry Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={false}
                />
              </div>
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
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/pista pieces.webp"
                alt="Pistachio Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Pistachio Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/pistatio popsicle.webp"
                  alt="Pistachio Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-75 lg:scale-100"
                  priority={false}
                />
              </div>
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
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/chcoalte peices.webp"
                alt="Chocolate Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Chocolate Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/chcolate popsicle.webp"
                  alt="Chocolate Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-85 lg:scale-115"
                  priority={false}
                />
              </div>
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
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none will-change-transform"
            >
              <Image 
                src="/photos/guava pieces seeds.webp"
                alt="Guava Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Guava Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none will-change-transform"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center will-change-transform ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/guava poposicle.webp"
                  alt="Guava Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-85 lg:scale-115"
                  priority={false}
                />
              </div>
            </motion.div>
          </>
        )}

        {/* Overlay for depth (inner border) */}
        <div className="absolute inset-0 border border-white/10 rounded-[48px] pointer-events-none z-30" />
      </motion.div>
    </motion.div>
  );
}

