"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

const SHOWCASE_ITEMS = [
  { id: 1, name: "Strawberry Splash", bgColor: "#ffe4e6", textColor: "#be123c", image: "/photos/01.jpg" },
  { id: 2, name: "Tropical Mango", bgColor: "#fef3c7", textColor: "#b45309", image: "/photos/02.jpg" },
  { id: 3, name: "Zesty Lime", bgColor: "#dcfce7", textColor: "#15803d", image: "/photos/03.jpg" },
  { id: 4, name: "Blueberry Blast", bgColor: "#e0e7ff", textColor: "#4338ca", image: "/photos/04.jpg" },
  { id: 5, name: "Passion Peach", bgColor: "#ffedd5", textColor: "#c2410c", image: "/photos/05.jpg" },
  { id: 6, name: "Berry Swirl", bgColor: "#fce7f3", textColor: "#be185d", image: "/photos/06.jpg" },
  { id: 7, name: "Coconut Breeze", bgColor: "#f1f5f9", textColor: "#334155", image: "/photos/07.jpg" },
  { id: 8, name: "Watermelon Wave", bgColor: "#ffe4e6", textColor: "#e11d48", image: "/photos/08.jpg" },
];

export default function ProductShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth < 640) {
        setCardWidth(260); // Smaller cards on mobile
      } else {
        setCardWidth(320);
      }
    };
    
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), SHOWCASE_ITEMS.length - 1));
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  // Mouse drag functionality for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    
    if (Math.abs(walk) > 10) {
      setHasDragged(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="relative w-full py-20 sm:py-32 overflow-hidden bg-white">
      <ScrollReveal>
        <div className="container-responsive mb-12 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Premium Popsicles</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display text-gray-900 leading-none tracking-tight uppercase">
            Taste the <span className="text-primary">Magic</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative max-w-[100vw] group">
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar items-center py-10 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            paddingLeft: `calc(50vw - ${cardWidth / 2}px)`,
            paddingRight: `calc(50vw - ${cardWidth / 2}px)`,
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          {SHOWCASE_ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            const isLeft = index < activeIndex;
            
            // Calculate dynamic rotation based on position
            const rotation = isActive ? '0deg' : isLeft ? '-5deg' : '5deg';
            const scale = isActive ? '1' : '0.9';
            const opacity = isActive ? '1' : '0.6';

            return (
              <div 
                key={item.id}
                onClick={() => {
                  if (!hasDragged) scrollTo(index);
                }}
                className="snap-center shrink-0 transition-all duration-500 ease-out flex justify-center"
                style={{
                  width: `${cardWidth}px`,
                  transform: `scale(${scale}) rotate(${rotation})`,
                  opacity: opacity,
                }}
              >
                <div 
                  className="relative w-[240px] sm:w-[300px] aspect-[3/4] rounded-[40px] p-6 shadow-2xl flex flex-col items-center justify-between overflow-hidden"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {/* Outer glow/shadow inside the card */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50 z-0 pointer-events-none" />
                  
                  {/* Image container */}
                  <div className="relative w-full flex-1 z-10 mb-6 drop-shadow-2xl pointer-events-none">
                    <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-inner">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover hover:scale-110 transition-transform duration-700 ease-out" 
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Text area */}
                  <div className="relative z-10 w-full text-center pb-2 pointer-events-none">
                    <h3 
                      className="text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight"
                      style={{ color: item.textColor }}
                    >
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 sm:left-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute top-1/2 right-4 sm:right-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === SHOWCASE_ITEMS.length - 1}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Scroll Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {SHOWCASE_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
