'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BounceCards from '@/components/ui/BounceCards';
import { BodyReveal } from '@/components/shared/TextReveal';
import { ScrollRevealHeading } from '@/components/shared/ScrollRevealHeading';

import { useRouter } from 'next/navigation';
import { SIPUPS } from '@/data/sipups';




interface Props {
  sipups?: any[];
}

export default function SipUpSection({ sipups = [] }: Props) {
  const router = useRouter();
  const images = sipups.map(s => s.image);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleCardClick = (idx: number) => {
    const sipup = sipups[idx];
    if (sipup) {
      router.push(`/sipups/${sipup.id}`);
    }
  };

  return (
    <section className="w-full relative overflow-x-clip min-h-[600px] sm:min-h-[800px] flex items-center justify-center">

        {/* Mobile background image */}
        <div className="absolute inset-0 sm:hidden">
          <Image
            src="/photos/ChatGPT Image Apr 29, 2026, 01_24_11 PM.png"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Desktop/Tablet background image */}
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/photos/ChatGPT Image Apr 28, 2026, 07_48_22 PM.png"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Very light overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-24 sm:py-32">

          {/* ── Heading — scroll-scrubbing reveal ── */}
          <ScrollRevealHeading
            lines={[
              <span key="l1" className="text-[7vw] sm:text-5xl md:text-6xl lg:text-8xl">
                Signature
              </span>,
              <div key="l2" className="relative inline-block w-fit mt-2 lg:mt-4">
                <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                <span className="relative z-10 text-[9vw] sm:text-6xl md:text-7xl lg:text-9xl text-white px-3 sm:px-5 py-0 block">
                  SipUps
                </span>
              </div>,
            ]}
            className="flex flex-col font-display text-gray-900 uppercase leading-[0.75] tracking-tighter items-center justify-center mb-8 sm:mb-12"
          />

          {/* ── Paragraph ── */}
          <BodyReveal
            className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl text-center"
            delay={0.15}
          >
            Experience our vibrant and refreshing SipUps. Handcrafted to perfection,
            each flavor bursts with natural goodness.
          </BodyReveal>

          {/* ── BounceCards ── */}
          <motion.div
            className="w-full flex justify-center mt-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                enableHover={!isMobile}
                isMobile={isMobile}
                onCardClick={handleCardClick}
              />
            </div>
          </motion.div>

        </div>
      </section>
  );
}
