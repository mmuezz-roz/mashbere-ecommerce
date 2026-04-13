'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Package } from 'lucide-react';

export default function ValueSection() {
  return (
    <section className="py-32 bg-[#141A0B] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#708238]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#C4EB54]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Value Card 1: Express Delivery */}
          <motion.div 
            whileHover={{ y: -15, scale: 1.02 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[48px] hover:bg-white/10 hover:border-[#C4EB54]/30 transition-all duration-500 cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#708238] rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-[#708238]/20">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-display text-white mb-6 uppercase tracking-wide">
              Express <br /> <span className="text-[#C4EB54]">Delivery</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              Our expedited logistics network facilitates direct-to-door fulfillment within sixty minutes, 
              maintaining optimal thermal integrity across all seven Emirates.
            </p>
            <div className="mt-10 h-1 w-12 bg-[#708238] group-hover:w-full transition-all duration-700 rounded-full" />
          </motion.div>

          {/* Value Card 2: Quality Guarantee */}
          <motion.div 
            whileHover={{ y: -15, scale: 1.02 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[48px] hover:bg-white/10 hover:border-[#C4EB54]/30 transition-all duration-500 cursor-pointer"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:-rotate-12 transition-transform duration-500 shadow-2xl border border-white/10">
              <ShieldCheck className="w-8 h-8 text-[#C4EB54]" />
            </div>
            <h3 className="text-4xl font-display text-white mb-6 uppercase tracking-wide">
              Quality <br /> <span className="text-[#C4EB54]">Guarantee</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              We adhere to rigorous artisanal standards, sourcing exclusively premium, 
              non-GMO organic components to ensure an unparalleled sensory experience.
            </p>
            <div className="mt-10 h-1 w-12 bg-[#708238] group-hover:w-full transition-all duration-700 rounded-full" />
          </motion.div>

          {/* Value Card 3: Perfect Packaging */}
          <motion.div 
            whileHover={{ y: -15, scale: 1.02 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[48px] hover:bg-white/10 hover:border-[#C4EB54]/30 transition-all duration-500 cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#708238] rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-[#708238]/20">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-display text-white mb-6 uppercase tracking-wide">
              Perfect <br /> <span className="text-[#C4EB54]">Packaging</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              Our bespoke, temperature-controlled ecological containment systems are engineered 
              to preserve structural and textural integrity for up to four hours post-dispatch.
            </p>
            <div className="mt-10 h-1 w-12 bg-[#708238] group-hover:w-full transition-all duration-700 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
