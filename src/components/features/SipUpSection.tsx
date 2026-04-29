'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BounceCards from '@/components/ui/BounceCards';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

/* ── Animation helpers ── */

// Splits text into individual word spans for staggered reveal
const SplitWords = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className={`inline-block ${className ?? ''}`}
            variants={{
              hidden: { y: '110%', opacity: 0, rotateX: -40 },
              visible: { y: '0%', opacity: 1, rotateX: 0 },
            }}
            style={{ display: 'inline-block', transformOrigin: 'top' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
};

export default function SipUpSection() {
  const images = [
    '/photos/sugar.png',
    '/photos/tender.png',
    '/photos/pomo.png',
    '/photos/pineapple.png',
    '/photos/passion.png',
    '/photos/Mango.png',
    '/photos/lychee.png',
    '/photos/Grapes.png',
    '/photos/gova.png',
  ];

  const transformStyles = [
    'rotate(15deg) translate(-280px)',
    'rotate(-10deg) translate(-210px)',
    'rotate(5deg) translate(-140px)',
    'rotate(-8deg) translate(-70px)',
    'rotate(0deg) translate(0px)',
    'rotate(12deg) translate(70px)',
    'rotate(-5deg) translate(140px)',
    'rotate(10deg) translate(210px)',
    'rotate(-15deg) translate(280px)',
  ];

  return (
    <ScrollReveal hideMask={true}>
      <section className="w-full relative overflow-x-clip min-h-[600px] sm:min-h-[800px] flex items-center justify-center">

        {/* Mobile background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/ChatGPT Image Apr 29, 2026, 01_24_11 PM.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center sm:hidden"
        />

        {/* Desktop/Tablet background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/ChatGPT Image Apr 28, 2026, 07_48_22 PM.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center hidden sm:block"
        />

        {/* Very light overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-24 sm:py-32">

          {/* ── Heading: word-by-word 3D flip-up ── */}
          <motion.h2
            className="text-4xl sm:text-6xl lg:text-8xl font-display text-gray-900 leading-none tracking-tight uppercase text-center mb-4 sm:mb-6 perspective-[800px]"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.09, delayChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SplitWords text="Signature" />
            {' '}
            <SplitWords text="SipUps" className="text-primary" />
          </motion.h2>

          {/* ── Paragraph: fade + slide up ── */}
          <motion.p
            className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl text-center"
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Experience our vibrant and refreshing SipUps. Handcrafted to perfection,
            each flavor bursts with natural goodness.
          </motion.p>

          {/* ── BounceCards ── */}
          <motion.div
            className="w-full flex justify-center mt-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-5xl flex justify-center transform scale-75 sm:scale-100">
              <BounceCards
                images={images}
                containerWidth="100%"
                containerHeight={400}
                animationDelay={0.5}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.8)"
                transformStyles={transformStyles}
                enableHover={true}
              />
            </div>
          </motion.div>

        </div>
      </section>
    </ScrollReveal>
  );
}
