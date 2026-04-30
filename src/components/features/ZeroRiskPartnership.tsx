'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  TrendingUp, 
  ChevronRight, 
  Quote, 
  Handshake,
  ChevronRight as ChevronIcon,
  ShoppingBag,
  CircleDollarSign,
  Sun,
  Leaf
} from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    id: '01',
    icon: Package,
    title: "No Investment",
    desc: "We install the Mashbere freezer in your store — completely free.",
  },
  {
    id: '02',
    icon: Truck,
    title: "No Effort",
    desc: "Daily restocking, cleaning, and maintenance handled by our team.",
  },
  {
    id: '03',
    icon: TrendingUp,
    title: "Pure Profit",
    desc: "Earn on every sale with high-margin products (up to 100% markup).",
  },
];

const SELLING_POINTS = [
  { icon: Leaf, text: '100% real fruit pulp' },
  { icon: CircleDollarSign, text: 'Affordable pricing (AED 2–5)' },
  { icon: ShoppingBag, text: 'High impulse-buy product' },
  { icon: Sun, text: 'Designed for UAE climate' },
];

export default function ZeroRiskPartnership() {
  return (
    <section className="w-full bg-white font-sans overflow-hidden">
      {/* Top Header & Steps */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* Section Header with Lines */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 sm:w-20 bg-[#708238]" />
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight text-center">
            NO INVESTMENT. NO EFFORT. <span className="text-[#708238]">PURE PROFIT.</span>
          </h2>
          <div className="h-px w-12 sm:w-20 bg-[#708238]" />
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white border border-gray-100 rounded-[32px] p-8 sm:p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] flex flex-col items-center text-center max-w-[340px] w-full"
              >
                {/* Number Badge */}
                <div className="absolute top-6 left-6 w-10 h-10 bg-[#708238] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 bg-[#708238]/5 rounded-3xl flex items-center justify-center mb-8">
                  <step.icon className="w-10 h-10 text-[#708238]" />
                </div>

                <h3 className="text-xl font-black text-[#708238] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>

              {/* Connector Arrow */}
              {i !== STEPS.length - 1 && (
                <div className="hidden lg:block text-gray-300">
                  <ChevronRight size={32} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Why Mashbere Sells Fast Section */}
      <div className="w-full bg-[#FDFBF3] py-12 relative overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none bg-no-repeat opacity-60 sm:opacity-100"
          style={{ 
            backgroundImage: "url('/photos/ChatGPT Image Apr 30, 2026, 03_21_47 PM.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
          }} 
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-10">
            <h2 className="text-5xl sm:text-7xl font-black text-gray-900 leading-[0.9] uppercase tracking-tighter">
              WHY <br />
              <span className="text-[#708238]">MASHBERE</span> <br />
              SELLS FAST
            </h2>

            <div className="space-y-4 max-w-sm">
              {SELLING_POINTS.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-full shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#708238] rounded-full flex items-center justify-center text-white">
                    <item.icon size={20} />
                  </div>
                  <span className="text-gray-800 font-bold text-sm sm:text-base">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Content - Space filled by background image */}
          <div className="hidden lg:block h-[300px]" />
        </div>

        {/* Quote Box */}
        <div className="max-w-2xl mx-auto mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1E2710] border border-white/10 rounded-[24px] p-6 sm:p-8 relative flex flex-col items-center text-center group shadow-2xl"
          >
            <Quote className="absolute top-4 left-4 text-[#C4EB54]/10 w-8 h-8 rotate-180" />
            <Quote className="absolute bottom-4 right-4 text-[#C4EB54]/10 w-8 h-8" />
            
            <p className="text-base sm:text-xl text-white font-bold leading-relaxed max-w-lg">
              Our products combine premium quality with fast turnover, ensuring consistent sales and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Start Earning Footer Section */}
      <div className="w-full bg-[#4A5D23] py-12 px-4 relative overflow-hidden text-center text-white">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Handshake Badge */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#4A5D23] shadow-xl mb-6">
            <Handshake size={32} />
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-4">
            START EARNING
          </h2>
          <p className="text-base sm:text-lg font-medium text-white/80 max-w-2xl mx-auto mb-8">
            Partner with Mashbere today and turn your store into a high-profit destination.
          </p>

          <Link href="/equipment">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFD700] text-gray-900 px-8 py-4 rounded-full font-black text-base sm:text-lg uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:bg-[#FFE44D] transition-colors"
            >
              LET'S GET STARTED
              <ChevronIcon size={20} strokeWidth={3} />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

