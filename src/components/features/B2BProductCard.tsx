'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { motion } from 'framer-motion';

interface B2BProductCardProps {
  product: Product;
}

/**
 * B2BProductCard Component
 * Premium, minimalist mobile-first UI inspired by Apple/Stripe.
 * Designed for high-end B2B equipment catalog.
 */
export function B2BProductCard({ product }: B2BProductCardProps) {
  const mossGreen = '#708238';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col h-full bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500"
      >
        {/* Image Container - Clean, no overlays on top */}
        <div className="relative aspect-[1/1] bg-[#F9F9F9] overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Subtle Badge */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-sm">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#708238]">Premium</span>
              </div>
            )}
            {product.slug !== 'mashbere-retail-kiosk' && product.stock !== undefined && product.stock < 10 && (
              <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-sm">
                <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">Low Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Area - Spacious and breathable */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-3">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#708238]/60 block">
              {product.type || product.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h3>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Minimal Metadata */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Top Rated</span>
            </div>
          </div>


        </div>
      </Link>
    </motion.div>
  );
}
