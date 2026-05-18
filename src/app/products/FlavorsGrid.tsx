'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ChevronLeft, ChevronRight } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

const ALL_TAGS = ['All', 'Tropical', 'Creamy', 'Nutty', 'Refreshing', 'Exotic', 'Premium', 'Gourmet', 'Rich', 'Nostalgic', 'Wellness', 'Arabian', 'Decadent', 'Fruity'];

interface Flavor {
  id: string;
  name: string;
  subtitle: string;
  label: string;
  image: string;
  accentColor: string;
  desc: string;
  tags: string[];
  price: number;
  featured: boolean;
  category?: string;
}

interface Props {
  flavors: Flavor[];
}

export default function FlavorsGrid({ flavors }: Props) {
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get('category') || 'popsicle';

  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = flavors.filter(f => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.desc.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || (f.tags || []).includes(activeTag);
    const matchCategory = activeCategory === 'All' || f.category === activeCategory;
    return matchSearch && matchTag && matchCategory;
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const tagsRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (tagsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tagsRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const currentTagsRef = tagsRef.current;
    if (currentTagsRef) {
      currentTagsRef.addEventListener('scroll', checkScroll);
    }
    window.addEventListener('resize', checkScroll);
    return () => {
      if (currentTagsRef) {
        currentTagsRef.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollTags = (direction: 'left' | 'right') => {
    if (tagsRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      tagsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToGrid = () => {
    if (containerRef.current) {
      const y = containerRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    setActiveTag('All');
    scrollToGrid();
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    scrollToGrid();
  };

  return (
    <div ref={containerRef}>
      {/* Filter Bar */}
      <div className="relative z-20 bg-[#FDFCFA] border-b border-gray-100">
        <div className="container-responsive py-3 lg:py-10">
          <div className="flex flex-col gap-4 lg:gap-10">
            {/* Category Filter */}
            <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar scroll-smooth">
              {[
                { id: 'All', label: 'All Flavours' },
                { id: 'popsicle', label: 'Signature Popsicles' },
                { id: 'sip-up', label: 'Premium SipUps' },
                { id: 'pookies', label: 'Mini Pookies' },
                { id: 'equipment', label: 'B2B Solutions' }
              ].map(cat => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`shrink-0 px-6 lg:px-12 py-2.5 lg:py-5 rounded-full text-[10px] lg:text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-[#1C2410] text-[#C4EB54] shadow-2xl shadow-[#1C2410]/40 ring-4 ring-[#1C2410]/5'
                      : 'bg-white border border-gray-200 text-gray-400 hover:text-[#1C2410] hover:border-[#1C2410]/20 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Search and Tags Row */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-12">
              {/* Search input container */}
              <div className="relative w-full lg:max-w-md group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#708238] transition-colors" />
                <input
                  type="text"
                  placeholder="What are you craving today?..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 lg:py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#708238]/10 focus:bg-white focus:border-[#708238]/30 transition-all shadow-sm group-hover:shadow-md"
                />
              </div>

              {/* Tags Container with Arrows */}
              <div className="relative flex-1 flex items-center gap-3 overflow-hidden group/tags">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl lg:bg-transparent lg:p-0 shrink-0">
                  <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-gray-400">Filter:</span>
                </div>

                <div className="relative flex-1 flex items-center overflow-hidden">
                  {/* Left Arrow */}
                  <AnimatePresence>
                    {canScrollLeft && (
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onClick={() => scrollTags('left')}
                        className="absolute left-0 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-900 hover:bg-[#1C2410] hover:text-white transition-all duration-300 hidden lg:flex"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div 
                    ref={tagsRef}
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full lg:px-2"
                  >
                    {ALL_TAGS.map(tag => (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTagClick(tag)}
                        className={`shrink-0 px-4 lg:px-6 py-2 lg:py-3 rounded-xl text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                          activeTag === tag
                            ? 'bg-[#708238] text-white shadow-xl shadow-[#708238]/20'
                            : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <AnimatePresence>
                    {canScrollRight && (
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => scrollTags('right')}
                        className="absolute right-0 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-900 hover:bg-[#1C2410] hover:text-white transition-all duration-300 hidden lg:flex"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-responsive py-12 lg:py-20">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <p className="text-gray-400 text-xl font-bold">No flavours found.</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8"
            >
              {filtered.map((flavor, i) => {
                const isB2B = flavor.category === 'equipment';
                return (
                <motion.div
                  key={flavor.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={(flavor.category === 'sip-up' && flavor.id !== 'mashbere-ice-glass') ? `/sipups/${flavor.id}` : `/products/${flavor.id}`}>
                    {isB2B ? (
                      <div 
                        className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#708238]/10 hover:border-[#708238]/30 flex flex-col h-full"
                        onMouseEnter={() => setHoveredId(flavor.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        {/* Subtle top accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#708238] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20" />
                        
                        <div className="aspect-[4/3] relative overflow-hidden bg-gray-50/50 flex items-center justify-center border-b border-gray-50">
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <Image
                            src={flavor.image}
                            alt={flavor.name}
                            fill
                            className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          />
                          {/* Minimal overlay arrow */}
                          <div className={`absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#708238] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col bg-white">
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#708238] mb-1.5">
                            {flavor.subtitle || 'B2B Solution'}
                          </p>
                          <h3 className="font-display text-gray-900 text-xl uppercase tracking-tight leading-none mb-3 group-hover:text-[#708238] transition-colors">
                            {flavor.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                            {flavor.desc}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="group relative rounded-[28px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        style={{ backgroundColor: flavor.accentColor }}
                        onMouseEnter={() => setHoveredId(flavor.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        {/* Featured badge */}
                        {flavor.featured && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="w-7 h-7 bg-[#708238] rounded-full flex items-center justify-center shadow-lg">
                              <Star className="w-3.5 h-3.5 fill-white text-white" />
                            </div>
                          </div>
                        )}
                        {/* Tag chip */}
                        <div className="absolute top-3 left-3 z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                            {(flavor.tags || [])[0] ?? ''}
                          </span>
                        </div>

                        {/* Image */}
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={flavor.image}
                            alt={flavor.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          />
                          <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${hoveredId === flavor.id ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}>
                            <span className="text-white font-black text-sm uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                              View Details
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-1.5">
                            {flavor.subtitle}
                          </p>
                          <h3 className="font-display text-black text-xl lg:text-2xl uppercase tracking-tight leading-[0.9] mb-3">
                            {flavor.name}
                          </h3>
                          <p className="text-xs text-black/60 leading-relaxed line-clamp-2 font-medium">
                            {flavor.desc}
                          </p>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm font-bold mt-12 uppercase tracking-widest"
        >
          Showing {filtered.length} of {flavors.length} flavours
        </motion.p>
      </div>
    </div>
  );
}
