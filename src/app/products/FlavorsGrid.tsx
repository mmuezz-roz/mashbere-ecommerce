'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star } from 'lucide-react';

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

  return (
    <>
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#FDFCFA]/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-responsive py-4">
          <div className="flex flex-col gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full">
              {[
                { id: 'All', label: 'All Flavours' },
                { id: 'popsicle', label: 'Signature Popsicles' },
                { id: 'sip-up', label: 'Premium SipUps' },
                { id: 'pookies', label: 'Pookies' },
                { id: 'equipment', label: 'B2B Equipment' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#1C2410] text-[#C4EB54] shadow-lg shadow-[#1C2410]/20'
                      : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search and Tags */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search flavours..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-full text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#708238]/30 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    activeTag === tag
                      ? 'bg-[#708238] text-white shadow-lg shadow-[#708238]/20'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6"
            >
              {filtered.map((flavor, i) => (
                <motion.div
                  key={flavor.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={flavor.category === 'sip-up' ? `/sipups/${flavor.id}` : `/products/${flavor.id}`}>
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
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
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
                      <div className="p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                          {flavor.subtitle}
                        </p>
                        <h3 className="font-display text-gray-900 text-lg lg:text-xl uppercase tracking-tight leading-none mb-2">
                          {flavor.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {flavor.desc}
                        </p>
                        <div className="flex gap-1 mt-3 flex-wrap">
                          {(flavor.tags || []).slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-white/60 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
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
    </>
  );
}
