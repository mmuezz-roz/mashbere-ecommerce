"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants, AnimatePresence } from 'framer-motion';

const SHOWCASE_ITEMS = [
  { 
    id: 1, 
    name: "Chikku", 
    label: "Natural Sweetness",
    desc: "The unique, malty sweetness of farm-fresh Sapota (Chikku) in every creamy bite.",
    bgColor: "#F3F0DA", 
    textColor: "#4D461F", 
    image: "/photos/05.webp",
    accentImage: "/photos/05.webp"
  },
  { 
    id: 2, 
    name: "Mango", 
    label: "King of Fruits",
    desc: "Sun-ripened Alphonso mangoes blended into a smooth, golden tropical delight.",
    bgColor: "#FEF3C7", 
    textColor: "#92400E", 
    image: "/photos/02.webp",
    accentImage: "/photos/02.webp"
  },
  { 
    id: 3, 
    name: "Tender Coconut", 
    label: "Creamy & Fresh",
    desc: "Crafted with 100% real coconut water and tender pulp for a refreshing island escape.",
    bgColor: "#E7F3F3", 
    textColor: "#1E3D3D", 
    image: "/photos/01.webp",
    accentImage: "/photos/01.webp"
  },
  { 
    id: 4, 
    name: "Strawberry", 
    label: "Berry Fresh",
    desc: "Bursting with the flavor of sun-ripened organic strawberries and natural fruit chunks.",
    bgColor: "#FDF2F2", 
    textColor: "#9B1C1C", 
    image: "/photos/strawberry-popsicle.webp",
    accentImage: "/photos/strawberry-popsicle.webp"
  },
  { 
    id: 5, 
    name: "Pistachio", 
    label: "Nutty Perfection",
    desc: "Roasted premium pistachios from Bronte, Sicily, providing an unmatched earthy richness.",
    bgColor: "#EAF3DA", 
    textColor: "#2D361C", 
    image: "/photos/pistachio-popsicle.webp",
    accentImage: "/photos/pistachio-popsicle.webp"
  },
  { 
    id: 6, 
    name: "Chocolate", 
    label: "Rich & Indulgent",
    desc: "Pure Belgian cocoa blended with organic cream for a velvety, dark chocolate experience.",
    bgColor: "#F5E6DA", 
    textColor: "#4A2C10", 
    image: "/photos/chocolate-popsicle.webp",
    accentImage: "/photos/chocolate-popsicle.webp"
  },
  { 
    id: 7, 
    name: "Guava", 
    label: "Pink Bliss",
    desc: "The exotic, sweet and tangy flavor of pink guava with a touch of chilli salt.",
    bgColor: "#FDF2F8", 
    textColor: "#9D174D", 
    image: "/photos/guava-popsicle.webp",
    accentImage: "/photos/guava-popsicle.webp"
  },
];

export default function ProductShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      
      if (cards.length > 0) {
        const firstCard = cards[0];
        // Position that centers the first card
        const firstCardCenteredX = firstCard.offsetLeft - (clientWidth / 2) + (firstCard.clientWidth / 2);
        
        // Only show left arrow if we are significantly past the first card's center
        setCanScrollLeft(scrollLeft > firstCardCenteredX + 100);
      } else {
        setCanScrollLeft(scrollLeft > 20);
      }

      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 50);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    if (width <= 0) return;
    const index = Math.round(scrollLeft / width);
    if (index !== activeIndex) setActiveIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check after a brief delay to ensure layout
      setTimeout(checkScroll, 100);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      container?.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      
      if (cards.length === 0) return;

      // Calculate positions relative to viewport for perfect centering
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = containerRect.left + containerRect.width / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // Special case: if we are at the very beginning and scroll right, 
      // we might want to target the first card specifically.
      if (container.scrollLeft < 100 && direction === 'right') {
        closestIndex = -1; // Force next to be 0
      }

      const targetIndex = direction === 'left' 
        ? Math.max(0, closestIndex - 1) 
        : Math.min(cards.length - 1, closestIndex + 1);
      
      const targetCard = cards[targetIndex];
      if (targetCard) {
        // Vertical Align: Center the targeted CARD vertically in the viewport
        const targetCardRect = targetCard.getBoundingClientRect();
        const cardCenterY = targetCardRect.top + targetCardRect.height / 2;
        const viewportCenterY = window.innerHeight / 2;
        const verticalOffset = cardCenterY - viewportCenterY;

        window.scrollBy({
          top: verticalOffset,
          behavior: 'smooth'
        });

        // Horizontal Align: Center the targeted CARD horizontally
        const currentCardCenter = targetCardRect.left + targetCardRect.width / 2;
        const horizontalOffset = currentCardCenter - viewportCenter;
        
        container.scrollTo({
          left: container.scrollLeft + horizontalOffset,
          behavior: 'smooth'
        });
      }
    }
  };

  
  // Use horizontal scroll progress directly for the heading to avoid double-spring lag
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const headingX = useTransform(scrollXProgress, [0, 0.15, 1], ["0%", "-50%", "-50%"]);

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

  // Wheel event listener to intuitively map vertical scroll to horizontal scroll when hovering the section
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow native horizontal scrolling to pass through seamlessly (trackpad swipes)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const rect = container.getBoundingClientRect();
      // Ensure the section is fully taking up the screen before we start intercepting scroll
      const isFullyInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (!isFullyInView) return;

      const isAtStart = container.scrollLeft <= 0;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 2;

      if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
        e.preventDefault();
        // Synchronous 1:1 scroll update - zero lag, perfectly tracks the wheel/trackpad hardware
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Dynamic background color transition based on scroll
  const bgColors = SHOWCASE_ITEMS.map(item => item.bgColor);
  // Add a starting color (the section's default) and an ending color (white or default)
  const allBgColors = ["#FDFBF3", ...bgColors, "#FDFBF3"];
  // Create mapping points for the scroll progress
  const colorPoints = [0, ...SHOWCASE_ITEMS.map((_, i) => (i + 1) / (SHOWCASE_ITEMS.length + 1)), 1];
  
  const backgroundColor = useTransform(scrollXProgress, colorPoints, allBgColors);

  return (
    <motion.section 
      id="product-showcase"
      data-hide-header="true"
      style={{ backgroundColor }}
      className="relative flex flex-col overflow-hidden transition-colors duration-700"
    >
      
      {/* ── MOBILE: Heading stacked on top, then cards below ── */}
      <div className="flex flex-col lg:hidden w-full">
        {/* Heading Block */}
        <div className="pt-20 pb-8 px-6">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="flex flex-col font-display text-gray-900 uppercase leading-[0.8] tracking-tighter"
          >
            <div className="overflow-hidden pb-1">
              <motion.span
                variants={lineVariants}
                className="block text-[10vw] sm:text-4xl"
              >
                WE HAVE
              </motion.span>
            </div>

            <motion.div
              variants={centerClipVariants}
              className="relative inline-block w-fit my-2"
            >
              <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
              <span className="relative z-10 text-[14vw] sm:text-6xl text-white px-4 py-0 block">
                FREAKING
              </span>
            </motion.div>

            <div className="overflow-hidden pt-1">
              <motion.span
                variants={lineVariants}
                className="block text-[9vw] sm:text-4xl"
              >
                DELICIOUS FLAVORS
              </motion.span>
            </div>
          </motion.h2>
        </div>

        <div className="relative group/scroll">
          {/* Horizontal scroll card strip */}
          <div
            ref={isMobile ? scrollContainerRef : undefined}
            onScroll={handleScroll}
            className="w-full overflow-x-auto scrollbar-hide pb-12 pt-20 snap-x snap-mandatory"
            style={{ scrollBehavior: 'auto' }}
          >
            <motion.div 
              initial={{ x: 0 }}
              whileInView={{ x: [0, -80, 0] }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
              className="flex items-center gap-6 min-w-max px-6"
            >
              {SHOWCASE_ITEMS.map((item, index) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  index={index}
                  isMobile={isMobile}
                />
              ))}
              {/* Explore CTA */}
              <div className="shrink-0 flex justify-center items-center px-4 pr-8 snap-center">
                <Link
                  href="/products"
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-transparent border-2 border-[#7E8D5F] text-[#7E8D5F] flex flex-col items-center justify-center gap-2 transition-all duration-500 active:scale-95 pointer-events-auto"
                >
                  <span className="font-display uppercase text-lg sm:text-xl text-center leading-[1.1] tracking-wide">
                    Explore <br /> All <br /> Flavours
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Minimal Mobile Pagination Dots */}
          <div className="flex lg:hidden justify-center gap-2 pb-12">
            {[...Array(SHOWCASE_ITEMS.length + 1)].map((_, i) => (
              <div 
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i 
                    ? "w-6 h-1.5 bg-[#7E8D5F]" 
                    : "w-1.5 h-1.5 bg-[#7E8D5F]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: Absolute heading slides, cards scroll horizontally ── */}
      <div className="hidden lg:block relative min-h-screen">
        {/* Heading - Absolute positioned so it stays on screen while cards scroll */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex h-full">
          <motion.div
            style={{ x: headingX }}
            className="w-full pl-[7vw] flex flex-col justify-center"
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
                    className="block text-7xl xl:text-8xl"
                  >
                    WE HAVE
                  </motion.span>
                </div>

                <motion.div
                  variants={centerClipVariants}
                  className="relative inline-block w-fit my-4"
                >
                  <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                  <span className="relative z-10 text-[9rem] xl:text-[11rem] text-white px-5 py-0 block">
                    FREAKING
                  </span>
                </motion.div>

                <div className="overflow-hidden pt-1">
                  <motion.span
                    variants={lineVariants}
                    className="block text-[10rem] xl:text-[12rem] whitespace-nowrap"
                  >
                    DELICIOUS FLAVORS
                  </motion.span>
                </div>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls - Desktop only */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex justify-between px-10">
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => scroll('left')}
                aria-label="Scroll product showcase left"
                className="group pointer-events-auto w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-[#7E8D5F] hover:border-[#7E8D5F] transition-all duration-500 shadow-2xl"
              >
                <ChevronLeft className="w-8 h-8 text-[#7E8D5F] group-hover:text-white transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => scroll('right')}
                aria-label="Scroll product showcase right"
                className="group pointer-events-auto w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-[#7E8D5F] hover:border-[#7E8D5F] transition-all duration-500 shadow-2xl ml-auto"
              >
                <ChevronRight className="w-8 h-8 text-[#7E8D5F] group-hover:text-white transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-1/3 h-1 bg-gray-200/20 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollXProgress, originX: 0 }}
            className="w-full h-full bg-[#7E8D5F]"
          />
        </div>

        {/* Native Horizontal Scroll Container */}
        <div
          ref={!isMobile ? scrollContainerRef : undefined}
          className="w-full flex items-center overflow-x-auto scrollbar-hide relative z-20 h-full pt-56 pb-32"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex items-center min-w-max px-[15vw]">

            {/* Spacer so heading is fully visible before first card */}
            <div className="w-[80vw] shrink-0" />

            {/* Cards */}
            <div className="flex items-center gap-48">
              {SHOWCASE_ITEMS.map((item, index) => (
                <ProductCard
                  key={item.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  item={item}
                  index={index}
                  isMobile={isMobile}
                />
              ))}

              {/* Explore All Flavours Circular Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                viewport={{ once: false }}
                className="shrink-0 flex justify-center items-center h-[50vh] px-16 pr-[20vw]"
              >
                <Link
                  href="/products"
                  aria-label="View all flavors in our catalog"
                  className="w-72 h-72 rounded-full bg-transparent border-4 border-[#7E8D5F] text-[#7E8D5F] flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-110 hover:bg-[#7E8D5F] hover:text-white shadow-xl hover:shadow-2xl group/cta pointer-events-auto"
                >
                  <span className="font-display uppercase text-3xl text-center leading-[1.1] tracking-wide">
                    Explore <br /> All <br /> Flavours
                  </span>
                  <ArrowRight className="w-10 h-10 group-hover/cta:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const ProductCard = React.forwardRef<HTMLDivElement, { item: any, index: number, isMobile: boolean }>(
  ({ item, index, isMobile }, ref) => {
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
    <div
      ref={ref}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      className="shrink-0 flex justify-center perspective-1000 snap-center"
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
                src="/photos/ChatGPT Image May 1, 2026, 03_10_13 PM.webp"
                alt="Handcrafted Chikku Popsicle - Mashbere Natural Fruit Series"
                fill
                className="object-cover"
              />
            </div>

            {/* 1.5 Decorative Text Layer - CHIKKU */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <span className="font-display text-5xl lg:text-8xl text-white/90 uppercase tracking-tight select-none">
                CHIKKU
              </span>
            </div>
            
            {/* 2. Middle Layer (Chickku) - Overlaps Top */}
            <motion.div 
              style={isMobile ? {} : { x: chickkuX, y: chickkuY }}
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
            >
              <Image 
                src="/photos/ChatGPT Image May 1, 2026, 03_19_32 PM.webp"
                alt="Fresh Sapota Fruit Pieces for Chikku Flavor"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Popsicle) - CSS float animation (GPU-only, no JS) */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/ChatGPT_Image_Apr_30__2026__05_31_32_PM-removebg-preview.webp"
                  alt="Premium Chikku (Sapota) Fruit Popsicle"
                  width={450}
                  height={650}
                  className="object-contain scale-65 lg:scale-100"
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
                src="/photos/mango cardbg.webp"
                alt="Tropical Mango Orchard Background - Mashbere Freshness"
                fill
                className="object-cover scale-[1.15]"
              />
            </div>

            {/* 1.5 Decorative Text Layer - MANGO */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1">
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
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
            >
              <Image 
                src="/photos/mango pieces-Photoroom.webp"
                alt="Fresh Alphonso Mango Slices"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Mango Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/mango popsicle.webp"
                  alt="Real Mango Pulp Fruit Popsicle"
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
                src="/photos/ChatGPT Image May 2, 2026, 05_20_20 PM.webp"
                alt="Tender Coconut Palm Background"
                fill
                className="object-fill scale-[2.2]"
              />
            </div>

            {/* 1.5 Decorative Text Layer - TENDER COCONUT */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1">
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
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
            >
              <Image 
                src="/photos/tender og pieces.webp"
                alt="Authentic Tender Coconut Slices"
                fill
                className="object-contain scale-[0.85]"
              />
            </motion.div>

            {/* 3. Top Layer (Tender Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/tender og popsicle.webp"
                  alt="Creamy Tender Coconut Fruit Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-50 lg:scale-70"
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
                src="/photos/strawberry bg card.webp"
                alt="Fresh Strawberry Field - Mashbere Natural Ingredients"
                fill
                className="object-cover scale-110"
              />
            </div>

            {/* 1.5 Decorative Text Layer - STRAWBERRY */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1">
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
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
            >
              <Image 
                src="/photos/strawberry-pieces.webp"
                alt="Organic Strawberry Chunks"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Strawberry Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/strawberry-popsicle.webp"
                  alt="Strawberry Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-85 lg:scale-110"
                  priority={true}
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
                src="/photos/pistachio-bg-card.webp"
                alt="Pistachio Card Background"
                fill
                className="object-cover scale-110"
              />
            </div>

            {/* 1.5 Decorative Text Layer - PISTACHIO */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1">
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
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
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
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/pistachio-og-popsicle.webp"
                  alt="Pistachio Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-50 lg:scale-70"
                  priority={true}
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
                className="object-cover scale-110"
              />
            </div>

            {/* 1.5 Decorative Text Layer - CHOCOLATE */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1">
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
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
            >
              <Image 
                src="/photos/chocolate-pieces.webp"
                alt="Chocolate Pieces"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 3. Top Layer (Chocolate Popsicle) - CSS float animation */}
            <motion.div 
              style={isMobile ? {} : { x: popsicleX, y: popsicleY }}
              className="absolute -top-16 lg:-top-40 inset-x-0 bottom-0 z-20 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
            >
              <div
                className={`relative w-full h-[110%] lg:h-[120%] flex items-center justify-center ${floatClass}`}
                style={{ rotate: index % 2 === 0 ? '12deg' : '-12deg' } as React.CSSProperties}
              >
                <Image 
                  src="/photos/chocolate-popsicle.webp"
                  alt="Chocolate Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-95 lg:scale-125"
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
                className="object-cover scale-110"
              />
            </div>

            {/* 1.5 Decorative Text Layer - GUAVA */}
            <div 
              className="absolute inset-0 flex items-end justify-start pl-10 pb-8 lg:pl-14 lg:pb-12 z-[25] pointer-events-none"
            >
              <div className="flex flex-col items-start gap-1">
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
              className="absolute -top-12 lg:-top-24 -left-6 lg:-left-12 -right-6 lg:-right-12 -bottom-6 lg:-bottom-12 z-10 pointer-events-none"
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
                  src="/photos/guava-popsicle.webp"
                  alt="Guava Popsicle"
                  width={550}
                  height={750}
                  className="object-contain scale-95 lg:scale-125"
                  priority={false}
                />
              </div>
            </motion.div>
          </>
        )}

        {/* Overlay for depth (inner border) */}
        <div className="absolute inset-0 border border-white/10 rounded-[48px] pointer-events-none z-30" />
      </motion.div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

