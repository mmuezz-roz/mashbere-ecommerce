'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const ALL_TAGS = [
  'All', 'Tropical', 'Creamy', 'Nutty', 'Refreshing', 'Exotic', 'Premium',
  'Gourmet', 'Rich', 'Nostalgic', 'Wellness', 'Arabian', 'Decadent', 'Fruity',
  'New Arrival', 'Strawberry', 'Chocolate', 'Vanilla', 'Avocado', 'Banana',
  'Biscuit', 'Peanut Butter',
];

const CATEGORIES = [
  { id: 'All',       label: 'All',       emoji: '✦',  toroness: false },
  { id: 'popsicle',  label: 'Popsicles', emoji: '🍦', toroness: false },
  { id: 'sip-up',    label: 'SipUps',    emoji: '🥤', toroness: false },
  { id: 'pookees',   label: 'Pookees',   emoji: '🍬', toroness: false },
  { id: 'equipment', label: 'B2B',       emoji: '🏭', toroness: false },
  { id: 'toroness',  label: 'Turkish Ice Cream', emoji: '✦',  toroness: true  },
];

interface Flavor {
  id: string;
  name: string;
  subtitle: string;
  label: string;
  image: string;
  cardImage?: string;
  hoverImage?: string;
  accentColor: string;
  bgGradient?: string;
  textColor?: string;
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
  const categoryParam = searchParams.get('category');

  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [toggledId, setToggledId] = useState<string | null>(null);

  // Sync state with URL search params on navigation (e.g. browser back/forward)
  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    } else {
      setActiveCategory('All');
    }
  }, [searchParams]);

  const filtered = flavors.filter(f => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.desc.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || (f.tags || []).includes(activeTag);
    const matchCategory = activeCategory === 'All' || f.category === activeCategory;
    return matchSearch && matchTag && matchCategory;
  });

  // Per-category product count
  const countFor = (catId: string) =>
    catId === 'All' ? flavors.length : flavors.filter(f => f.category === catId).length;

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
    const el = tagsRef.current;
    if (el) el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollTags = (direction: 'left' | 'right') => {
    if (tagsRef.current) {
      tagsRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
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

    // Update browser URL query param without triggering full reload so back button returns to this category
    const url = new URL(window.location.href);
    if (id === 'All') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', id);
    }
    window.history.replaceState(null, '', url.pathname + url.search);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    scrollToGrid();
  };

  return (
    <div ref={containerRef}>

      {/* ══════════════════════════════════════════════════════════
          STICKY FILTER / CATEGORY BAR
      ══════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-30 bg-white/85 backdrop-blur-2xl border-b border-black/[0.07] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)]">
        <div className="container-responsive">

          {/* ────────────────────────────────────────────────────────
              MOBILE ONLY  (hidden on lg+)
          ──────────────────────────────────────────────────────── */}
          <div className="lg:hidden py-3 space-y-2.5">

            {/* Scrollable category pill row */}
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat.id;
                const count = countFor(cat.id);

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={[
                      'relative shrink-0 flex items-center gap-1.5 rounded-full border',
                      'transition-all duration-300 select-none active:scale-95',
                      'px-3.5 py-2',
                      isActive
                        ? cat.toroness
                          ? 'bg-gradient-to-r from-rose-500 to-pink-600 border-transparent text-white shadow-lg shadow-rose-400/30'
                          : 'bg-[#1C2410] border-transparent text-white shadow-md shadow-black/15'
                        : cat.toroness
                          ? 'bg-rose-50 border-rose-200/60 text-rose-600'
                          : 'bg-white border-black/[0.09] text-gray-600',
                    ].join(' ')}
                  >
                    {/* emoji icon */}
                    <span className="text-sm leading-none select-none">{cat.emoji}</span>

                    {/* label */}
                    <span className="text-[13px] font-semibold tracking-tight leading-none whitespace-nowrap">
                      {cat.label}
                    </span>

                    {/* count badge */}
                    {count > 0 && (
                      <span
                        className={[
                          'inline-flex items-center justify-center rounded-full',
                          'text-[10px] font-bold leading-none px-1.5 py-0.5 min-w-[18px]',
                          isActive ? 'bg-white/20 text-white' : 'bg-black/[0.06] text-gray-400',
                        ].join(' ')}
                      >
                        {count}
                      </span>
                    )}

                    {/* NEW badge for Toroness when inactive */}
                    {cat.toroness && !isActive && (
                      <span className="ml-0.5 px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-rose-100 text-rose-600 rounded-full border border-rose-200/60 leading-none">
                        NEW
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search + result count row */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  placeholder="Search flavours&#x2026;"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-[13px] bg-black/[0.04] border border-black/[0.07] rounded-full font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>
              {/* Inline result count */}
              <span className="shrink-0 text-[12px] font-semibold text-gray-400 whitespace-nowrap pr-0.5">
                <span className="text-gray-900 font-black">{filtered.length}</span> items
              </span>
            </div>

          </div>

          {/* ────────────────────────────────────────────────────────
              DESKTOP ONLY  (hidden on mobile)
          ──────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-4 lg:gap-5 py-4 lg:py-5">

            {/* Category Segmented Control */}
            <div className="w-full overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex items-center gap-1 p-1.5 bg-black/[0.03] rounded-full border border-black/[0.04] backdrop-blur-md min-w-full sm:min-w-0 justify-start sm:justify-center">
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const isToroness = cat.toroness;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`relative shrink-0 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-medium tracking-tight transition-colors duration-200 select-none flex items-center gap-2 ${
                        isActive
                          ? isToroness
                            ? 'text-white font-semibold'
                            : 'text-gray-900 font-semibold'
                          : isToroness
                            ? 'text-rose-600 hover:text-rose-700 font-medium'
                            : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPillDesktop"
                          className={`absolute inset-0 rounded-full ${
                            isToroness
                              ? 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-md shadow-rose-500/25'
                              : 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-black/[0.04]'
                          }`}
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                      {cat.toroness && !isActive && (
                        <span className="relative z-10 px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-rose-100 text-rose-600 rounded-full border border-rose-200/60">
                          NEW
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search + Tags row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-black/[0.03]">
              <div className="relative w-full sm:max-w-xs group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  placeholder="Search flavours..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs lg:text-sm bg-black/[0.03] border border-black/[0.04] rounded-full font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              {/* Tags filter */}
              <div className="relative flex-1 flex items-center gap-2 overflow-hidden">
                <div className="flex items-center gap-1.5 text-gray-400 shrink-0 px-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium tracking-wide uppercase">Filter</span>
                </div>

                <div className="relative flex-1 flex items-center overflow-hidden">
                  <AnimatePresence>
                    {canScrollLeft && (
                      <motion.button
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        onClick={() => scrollTags('left')}
                        className="absolute left-0 z-20 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full shadow-md border border-black/5 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div
                    ref={tagsRef}
                    className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full lg:px-2 py-0.5"
                  >
                    {ALL_TAGS.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          activeTag === tag
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'bg-black/[0.03] text-gray-600 hover:bg-black/[0.07] hover:text-gray-900'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {canScrollRight && (
                      <motion.button
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        onClick={() => scrollTags('right')}
                        className="absolute right-0 z-20 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full shadow-md border border-black/5 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PRODUCTS GRID
      ══════════════════════════════════════════════════════════ */}
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
                    <Link
                      href={
                        (flavor.category === 'sip-up' && flavor.id !== 'mashbere-ice-glass')
                          ? `/sipups/${flavor.id}`
                          : `/products/${flavor.id}`
                      }
                    >
                      {isB2B ? (
                        /* B2B / Equipment Card */
                        <div
                          className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#708238]/10 hover:border-[#708238]/30 flex flex-col h-full"
                          onMouseEnter={() => setHoveredId(flavor.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          {/* Top accent bar */}
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
                            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#708238] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                              </svg>
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
                        /* Ice Cream / Popsicle / SipUp / Toroness / Pookees Card */
                        <div
                          className="group relative rounded-[28px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                          style={{
                            background: (flavor.category === 'toroness' || flavor.category === 'pookees') && flavor.bgGradient
                              ? flavor.bgGradient
                              : flavor.accentColor,
                          }}
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

                          {/* Tag chip on hover */}
                          <div className="absolute top-3 left-3 z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                              {(flavor.tags || [])[0] ?? ''}
                            </span>
                          </div>

                          {/* Image area */}
                          {(() => {
                            const hasAlt = !!flavor.hoverImage;
                            const primarySrc = flavor.category === 'sip-up'
                              ? (flavor.cardImage || flavor.image)
                              : flavor.image;
                            return (
                              <div className={`${flavor.category === 'toroness' ? 'aspect-[4/3]' : 'aspect-square'} relative overflow-hidden flex items-center justify-center`}>
                                <Image
                                  src={primarySrc}
                                  alt={flavor.name}
                                  fill
                                  className={`transition-transform duration-700 ${flavor.category === 'toroness' ? 'object-contain p-6 group-hover:scale-90' : 'object-cover group-hover:scale-110'}`}
                                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                                {hasAlt && (
                                  <div className={`absolute inset-0 transition-opacity duration-500 ${hoveredId === flavor.id ? 'opacity-100' : 'opacity-0'}`}>
                                    <Image
                                      src={flavor.hoverImage!}
                                      alt={`${flavor.name} detail`}
                                      fill
                                      className={`transition-transform duration-700 ${flavor.category === 'toroness' ? 'object-contain p-6 group-hover:scale-90' : 'object-cover group-hover:scale-110'}`}
                                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    />
                                  </div>
                                )}
                                {/* View Details overlay */}
                                <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${hoveredId === flavor.id ? 'opacity-100' : 'opacity-0'} flex items-center justify-center z-10`}>
                                  <span className="text-white font-black text-sm uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                    View Details
                                  </span>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Info */}
                          <div className="p-5">
                            <p
                              className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5"
                              style={{
                                color: (flavor.category === 'toroness' || flavor.category === 'pookees') && flavor.textColor
                                  ? `${flavor.textColor}99`
                                  : 'rgba(0,0,0,0.4)',
                              }}
                            >
                              {flavor.subtitle}
                            </p>
                            <h3
                              className="font-display text-xl lg:text-2xl uppercase tracking-tight leading-[0.9] mb-3"
                              style={{
                                color: (flavor.category === 'toroness' || flavor.category === 'pookees') && flavor.textColor
                                  ? flavor.textColor
                                  : '#000',
                              }}
                            >
                              {flavor.name}
                            </h3>
                            <p
                              className="text-xs leading-relaxed line-clamp-2 font-medium"
                              style={{
                                color: (flavor.category === 'toroness' || flavor.category === 'pookees') && flavor.textColor
                                  ? `${flavor.textColor}99`
                                  : 'rgba(0,0,0,0.6)',
                              }}
                            >
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
