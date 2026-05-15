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
  
  // Use database sipups if available, otherwise fallback to local data
  // Filter out any miscategorized items (like ice sticks) that shouldn't be in the bottle section
  const displaySipups = (sipups.length > 0 ? sipups : SIPUPS)
    .filter(s => s.name.toLowerCase().includes('sipup') || s.name.toLowerCase().includes('mango') || s.name.toLowerCase().includes('pomegranate') || s.name.toLowerCase().includes('lychee') || s.name.toLowerCase().includes('coconut') || s.name.toLowerCase().includes('sugarcane') || s.name.toLowerCase().includes('grape') || s.name.toLowerCase().includes('guava') || s.name.toLowerCase().includes('pineapple') || s.name.toLowerCase().includes('passion'))
    .filter(s => !s.name.toLowerCase().includes('stick'));

  const images = displaySipups.map(s => s.image);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate dynamic transform styles based on the number of sipups
  const transformStyles = React.useMemo(() => {
    const count = displaySipups.length;
    if (count === 0) return [];

    return displaySipups.map((_, i) => {
      // Calculate horizontal spread
      // For desktop: spread from -280 to 280
      // For mobile: spread from -44vw to 44vw
      const stepDesktop = 560 / (count > 1 ? count - 1 : 1);
      const stepMobile = 88 / (count > 1 ? count - 1 : 1);
      
      const translateX = -280 + i * stepDesktop;
      const translateVW = -44 + i * stepMobile;
      
      // Alternating rotations for a natural "fan" look
      const rotations = [15, -10, 5, -8, 0, 12, -5, 10, -15];
      const rotate = rotations[i % rotations.length];

      return isMobile 
        ? `rotate(${rotate}deg) translate(${translateVW}vw)` 
        : `rotate(${rotate}deg) translate(${translateX}px)`;
    });
  }, [displaySipups.length, isMobile]);

  const handleCardClick = (idx: number) => {
    const sipup = displaySipups[idx];
    if (sipup) {
      router.push(`/sipups/${sipup.id}`);
    }
  };

  return (
    <section className="w-full relative overflow-x-clip min-h-[600px] sm:min-h-[800px] flex items-center justify-center">

        {/* Mobile background image */}
        <div 
          className="absolute inset-0 sm:hidden"
          style={{ 
            backgroundImage: 'url("/photos/ChatGPT Image Apr 29, 2026, 01_24_11 PM.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          aria-hidden="true"
        />

        {/* Desktop/Tablet background image */}
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{ 
            backgroundImage: 'url("/photos/ChatGPT Image Apr 28, 2026, 07_48_22 PM.png")',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          aria-hidden="true"
        />

        {/* Very light overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-24 sm:py-32">

          {/* Custom Heading for independent inline animations */}
          <motion.h2
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2, delayChildren: 0.1 }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="flex flex-row items-center justify-center gap-0 sm:gap-0 lg:gap-0 font-display text-gray-900 uppercase leading-[0.75] tracking-tighter mb-8 sm:mb-12"
          >
            <div className="overflow-hidden py-1 flex">
              <motion.span 
                variants={{
                  hidden: { y: "100%", filter: "blur(8px)" },
                  visible: { 
                    y: "0%", filter: "blur(0px)",
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
                  }
                }}
                className="block text-[10vw] sm:text-5xl md:text-6xl lg:text-8xl whitespace-nowrap will-change-transform"
              >
                Signature
              </motion.span>
            </div>

            <motion.div
              variants={{
                hidden: { clipPath: "inset(-20% 50% -20% 50%)", filter: "blur(8px)", scale: 0.95 },
                visible: { 
                  clipPath: "inset(-20% -20% -20% -20%)", filter: "blur(0px)", scale: 1,
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className="relative inline-block w-fit will-change-transform"
            >
              <Image
                src="/photos/sipUp writings.png"
                alt="SipUps"
                width={600}
                height={200}
                className="h-[14vw] sm:h-[70px] md:h-[90px] lg:h-[130px] w-auto object-contain"
                priority
              />
            </motion.div>
          </motion.h2>

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
            <div className="w-full max-w-5xl flex justify-center transform scale-100 z-20">
              <BounceCards
                images={images}
                containerWidth="100%"
                containerHeight={500}
                animationDelay={0.3}
                animationStagger={0.05}
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
