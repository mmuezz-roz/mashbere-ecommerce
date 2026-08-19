'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Eye, Star, Heart, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard Component
 * Fully responsive — buttons are always visible on mobile (touch devices),
 * and use hover-reveal on desktop.
 */
export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block w-full h-full"
    >
      <Link
        href={product.category === 'sip-up' ? `/sipups/${product.slug}` : `/products/${product.slug}`}
        className="flex flex-col h-full bg-white rounded-[32px] sm:rounded-[40px] p-4 transition-all duration-700 ease-out hover:bg-gray-50/50 hover:scale-[1.02]"
      >
        {/* Apple-style Minimal Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#F5F5F7] transition-all duration-700 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
          <ImageWithFallback
            src={product.image}
            alt={`${product.name} - Mashbere Premium`}
            className={`w-full h-full transform transition-transform duration-[1.2s] ease-[0.22,1,0.36,1] group-hover:scale-110 ${
              product.category === 'sip-up'
                ? 'object-contain p-0 sm:p-2 mix-blend-multiply'
                : product.category === 'pookees'
                ? 'object-contain p-12 sm:p-4 mix-blend-multiply'
                : (product.category === 'toroness' || product.slug?.startsWith('toroness-'))
                ? 'object-contain p-8 sm:p-10 drop-shadow-xl'
                : 'object-cover'
            }`}
          />

          {/* Minimal Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.featured && (
              <div className="bg-black/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </div>
            )}
          </div>

          {/* Hover Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/90 backdrop-blur-xl text-gray-900 rounded-full font-bold text-xs uppercase tracking-widest px-6 py-3 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View
            </div>
          </div>
        </div>

        {/* Minimal Interactive Writings */}
        <div className="pt-6 sm:pt-8 px-2 flex flex-col flex-1 relative overflow-hidden">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors duration-300 group-hover:text-primary">
            {(product.category === 'toroness' || product.slug?.startsWith('toroness-')) ? 'Turkish Ice Cream' : (product.type || product.category)}
          </span>
          
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight leading-tight group-hover:text-primary transition-colors duration-300 mb-2">
            {product.name}
          </h3>

          {/* Description reveals on hover by sliding up */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
            <div className="overflow-hidden">
              <p className="text-gray-500 text-sm font-normal leading-relaxed pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-1 pt-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            <Star className="w-3.5 h-3.5 text-gray-400 fill-current" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top Rated</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
