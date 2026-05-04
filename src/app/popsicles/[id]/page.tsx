'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ChevronRight } from 'lucide-react';
import { POPSICLES } from '@/data/popsicles';

export default function PopsicleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const popsicle = POPSICLES.find(p => p.id === id);

  if (!popsicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFD] p-4">
        <h1 className="text-4xl font-display text-gray-900 mb-6">Popsicle Not Found</h1>
        <Link 
          href="/"
          className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCFD] relative overflow-hidden font-sans">
      {/* Background Decorative Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at 50% 50%, ${popsicle.accentColor}, transparent)` }}
      />

      <div className="container-responsive pt-28 sm:pt-36 lg:pt-44 pb-10 lg:pb-20 relative z-10">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12 lg:mb-20">
          <div className="lg:hidden" />

          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest">
            <Star className="w-4 h-4 fill-current" />
            <span>Premium Popsicle Collection</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square max-w-xl mx-auto lg:mx-0 w-full"
          >
            {/* Soft Glow behind image */}
            <div 
              className="absolute inset-0 rounded-full blur-[80px] opacity-40 animate-pulse"
              style={{ backgroundColor: popsicle.accentColor }}
            />
            
            <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-12">
              <Image 
                src={popsicle.image}
                alt={popsicle.name}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col items-start space-y-8 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs sm:text-sm">
                {popsicle.label}
              </span>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display text-gray-900 leading-[0.85] uppercase tracking-tighter">
                {popsicle.name}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl"
            >
              {popsicle.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 w-full"
            >
              <Link href="/products" className="group flex items-center gap-3 px-10 py-5 rounded-3xl font-black text-base text-gray-900 uppercase tracking-widest hover:text-primary transition-all bg-white shadow-sm border border-gray-100 w-full sm:w-auto justify-center">
                <span>View All Flavors</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Nutrition/Details Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100 w-full"
            >
              {[
                { label: 'CALORIES', val: '85' },
                { label: 'REAL FRUIT', val: '100%' },
                { label: 'DAIRY', val: 'ORGANIC' }
              ].map(stat => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 tracking-widest">{stat.label}</p>
                  <p className="text-xl font-display text-gray-900">{stat.val}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
