'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, Star, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard Component
 * Implements a high-end, interactive card design with motion effects.
 */
export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="group relative"
    >
      <Link
        href={`/products/${product.id}`}
        className="block bg-white rounded-[40px] p-4 transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-gray-50 group-hover:border-primary/10"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#FDFCFD]">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
          />
          
          {/* Glass Overlay Badges */}
          <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
            {product.featured && (
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white/70 backdrop-blur-xl text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-2"
              >
                <Sparkles className="w-3 h-3 fill-primary" />
                Bestseller
              </motion.div>
            )}
            {product.stock !== undefined && product.stock < 10 && (
              <div className="bg-red-500/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg border border-white/20">
                Low Stock
              </div>
            )}
          </div>

          <button className="absolute top-5 right-5 p-3 bg-white/70 backdrop-blur-xl rounded-2xl text-gray-400 hover:text-primary hover:scale-110 transition-all border border-white/20 z-10">
            <Heart className="w-5 h-5" />
          </button>

          {/* Action Buttons - Animated Slide Up */}
          <div className="absolute bottom-5 inset-x-5 flex gap-3 z-10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-gray-900 text-white rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-gray-900/40 opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-primary"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to cart
            </motion.button>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-white text-gray-900 rounded-[20px] font-black shadow-2xl shadow-gray-900/10 opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 delay-75 transition-all duration-500 flex items-center justify-center border border-gray-100"
            >
              <Eye className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Gradient Tint */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="pt-8 pb-4 px-2 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest block bg-primary/5 w-fit px-2 py-0.5 rounded-full border border-primary/10">
                {product.type || product.category}
              </span>
              <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 min-h-[40px]">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold line-through">
                AED {(product.price * 1.2).toFixed(2)}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-black text-gray-900">AED</span>
                <span className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                Highly Rated
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
