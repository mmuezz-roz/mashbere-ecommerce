'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Package, Check } from 'lucide-react';
import { TextReveal, BodyReveal } from '@/components/shared/TextReveal';
import { ScrollRevealHeading } from '@/components/shared/ScrollRevealHeading';

const VALUES = [
  {
    icon: Truck,
    iconBg: 'bg-[#708238]',
    iconColor: 'text-white',
    iconShadow: 'shadow-[#708238]/20',
    iconHover: 'group-hover:rotate-12',
    title: 'Express',
    highlight: 'Delivery',
    description:
      'We are refining our express logistics to ensure your premium treats arrive in perfect condition, every single time.',
    points: [
      'Temperature-controlled transit',
      'Real-time order tracking',
      'Carefully handled packaging',
    ],
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-white/10',
    iconColor: 'text-[#C4EB54]',
    iconShadow: '',
    iconHover: 'group-hover:-rotate-12',
    title: 'Artisanal',
    highlight: 'Quality',
    description:
      'Crafted with precision and the finest ingredients to deliver a rich, smooth, and consistently refined experience.',
    points: [
      'Premium, responsibly sourced ingredients',
      'Clean recipes, no unnecessary additives',
      'Consistent taste in every scoop',
    ],
  },
  {
    icon: Package,
    iconBg: 'bg-[#708238]',
    iconColor: 'text-white',
    iconShadow: 'shadow-[#708238]/20',
    iconHover: 'group-hover:rotate-12',
    title: 'Premium',
    highlight: 'Presentation',
    description:
      'Designed to elevate every moment from the first glance to the final bite with our bespoke design language.',
    points: [
      'Elegant, detail-focused design',
      'Crafted to preserve texture & freshness',
      'A premium experience in every serving',
    ],
  },
];

export default function ValueSection() {
  return (
    <section className="section-padding bg-[#141A0B] relative overflow-hidden section-contain">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#708238]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#C4EB54]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Label + Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <BodyReveal margin="-40px" className="mb-6 lg:mb-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-[#C4EB54]/60 block">
              Why Choose Mashbere
            </span>
          </BodyReveal>
          <ScrollRevealHeading
            lines={[
              <span key="l1" className="text-[8vw] sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-white">
                WE BUILD ON
              </span>,
              <div key="l2" className="relative inline-block w-fit my-2 lg:my-4">
                <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                <span className="relative z-10 text-[12vw] sm:text-6xl md:text-7xl lg:text-[9rem] xl:text-[11rem] text-white px-5 py-0 block">
                  PREMIUM
                </span>
              </div>,
              <span key="l3" className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[10rem] xl:text-[12rem] lg:whitespace-nowrap text-[#C4EB54]">
                VALUES
              </span>,
            ]}
            className="flex flex-col font-display text-white uppercase leading-[0.75] tracking-tighter items-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 lg:p-10 rounded-[36px] sm:rounded-[48px] hover:bg-white/8 hover:border-[#C4EB54]/30 transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${v.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-10 ${v.iconHover} transition-transform duration-500 shadow-2xl ${v.iconShadow} border border-white/10`}
                >
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${v.iconColor}`} />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display text-white mb-3 sm:mb-6 uppercase tracking-wide">
                  <TextReveal text={v.title} className="text-white" duration={0.6} stagger={0.08} delay={i * 0.05} />
                  <TextReveal text={v.highlight} className="text-[#C4EB54]" duration={0.6} stagger={0.08} delay={i * 0.05 + 0.1} />
                </h3>
                <BodyReveal className="flex-grow text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed font-medium mb-6" delay={0.15 + i * 0.05}>
                  {v.description}
                </BodyReveal>
                
                {v.points && (
                  <ul className="space-y-4 mb-10">
                    {v.points.map((point) => (
                      <li key={point} className="feature-point flex items-start gap-3 text-gray-400 text-xs sm:text-sm font-medium group/item">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C4EB54]/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#C4EB54]" />
                        </div>
                        <span className="leading-tight">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto h-0.5 w-10 bg-[#708238] group-hover:w-full transition-all duration-700 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
