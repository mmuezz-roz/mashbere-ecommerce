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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative hover:-translate-y-1.5 transition-transform duration-300 ease-out"
    >
      <Link
        href={product.category === 'sip-up' ? `/sipups/${product.slug}` : `/products/${product.slug}`}
        className="block bg-white rounded-[32px] sm:rounded-[40px] p-3 sm:p-4 transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.14)] border border-gray-50 group-hover:border-primary/10"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#FDFCFD]">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
          />

          {/* Badges */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 flex flex-col gap-2 z-10">
            {product.featured && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/90 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white/30 flex items-center gap-1.5"
              >
                <Sparkles className="w-2.5 h-2.5 fill-primary" />
                Bestseller
              </motion.div>
            )}
            {product.stock !== undefined && product.stock < 10 && product.category === 'equipment' && product.slug !== 'mashbere-retail-kiosk' && (
              <div className="bg-red-500/90 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                Low Stock
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
            className="absolute top-3 sm:top-5 right-3 sm:right-5 p-2.5 sm:p-3 bg-white/90 rounded-xl sm:rounded-2xl transition-transform duration-200 border border-white/30 z-10 hover:scale-110"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-primary'}`} />
          </button>

          <div className="absolute bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-5 flex z-10">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex-1 h-11 sm:h-14 bg-white text-gray-900 rounded-[16px] sm:rounded-[20px] font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-xl shadow-gray-900/10
                opacity-100 translate-y-0
                sm:opacity-0 sm:translate-y-6 sm:group-hover:opacity-100 sm:group-hover:translate-y-0
                transition-all duration-400 flex items-center justify-center gap-2 border border-gray-100"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              View Details
            </motion.div>
          </div>

          {/* Gradient overlay on hover (desktop) */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Card Content */}
        <div className="pt-5 sm:pt-8 pb-2 sm:pb-4 px-1 sm:px-2 space-y-2 sm:space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-widest block bg-primary/5 w-fit px-2 py-0.5 rounded-full border border-primary/10">
                {product.type || product.category}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </div>
          </div>

          <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2 min-h-[32px] sm:min-h-[40px]">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2 sm:pt-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top Rated</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-tighter bg-primary/5 px-2 py-0.5 rounded-full">
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
