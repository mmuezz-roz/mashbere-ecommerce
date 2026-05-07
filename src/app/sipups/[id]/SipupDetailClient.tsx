'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ChevronRight } from 'lucide-react';

interface Props {
  sipup: any;
}

export default function SipupDetailClient({ sipup }: Props) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FDFCFD] relative overflow-hidden font-sans">
      {/* Background Decorative Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at 50% 50%, ${sipup.accentColor}, transparent)` }}
      />

      <div className="container-responsive pt-28 sm:pt-36 lg:pt-44 pb-10 lg:pb-20 relative z-10">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12 lg:mb-20">


          <div className="flex items-center gap-2 bg-[#708238]/10 px-4 py-2 rounded-full text-[#708238] font-black text-xs uppercase tracking-widest">
            <Star className="w-4 h-4 fill-current" />
            <span>Signature Selection</span>
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
              style={{ backgroundColor: sipup.accentColor }}
            />
            
            <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-12">
              <Image 
                src={sipup.image}
                alt={sipup.name}
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
              <span className="text-[#708238] font-black uppercase tracking-[0.3em] text-xs sm:text-sm">
                {sipup.label}
              </span>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display text-gray-900 leading-[0.85] uppercase tracking-tighter">
                {sipup.name}
              </h1>

              {/* Price Display */}
              {sipup.price > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-baseline gap-2 mt-4"
                >
                  <span className="text-2xl font-black text-gray-300 uppercase tracking-widest">AED</span>
                  <span className="text-6xl font-black text-[#708238] tracking-tighter">{sipup.price}</span>
                </motion.div>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl"
            >
              {sipup.longDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 w-full"
            >
              <Link href="/#sipups" className="group flex items-center gap-3 px-10 py-5 rounded-3xl font-black text-base text-gray-900 uppercase tracking-widest hover:text-[#708238] transition-all bg-white shadow-sm border border-gray-100 w-full sm:w-auto justify-center">
                <span>View More Flavors</span>
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
              {(sipup.stats || []).map((stat: any) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{stat.label}</p>
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
