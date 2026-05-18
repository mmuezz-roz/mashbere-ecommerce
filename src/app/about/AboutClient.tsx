'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IceCream, Coffee, Store, CheckCircle2, ArrowRight } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const OFFERINGS = [
  {
    icon: IceCream,
    title: 'Ice Cream & Popsicles',
    desc: 'Handcrafted from real fruit pulp. Rich, bold flavors with no artificial additives — from classic scoops to premium frozen bars.',
  },
  {
    icon: Coffee,
    title: 'Ice Cups & Ice Glass',
    desc: 'Hygienic, ready-to-use ice cups designed for beverage businesses. Consistent quality, clean presentation, delivered on demand.',
  },
  {
    icon: Store,
    title: 'Kiosk Solutions',
    desc: 'Complete turnkey frozen dessert kiosks for cafés, malls, and entrepreneurs. Equipment, supply, and support — all in one.',
  },
];

const VALUE_POINTS = [
  { label: 'Quality-first production', detail: 'Every product begins with premium, carefully selected natural ingredients.' },
  { label: 'Hygienic by design', detail: 'Our facilities and packaging meet the highest food safety standards in the UAE.' },
  { label: 'Presentation matters', detail: 'From the ice cup to the kiosk, every touchpoint is crafted to impress.' },
  { label: 'Built for business', detail: 'Reliable supply chains, scalable kiosk solutions, and dedicated B2B partnerships.' },
  { label: 'Made for the UAE market', detail: 'Flavors, formats, and operations tuned specifically for the UAE climate and culture.' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-gray-100" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div className="bg-white text-[#141A0B] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-end overflow-hidden bg-[#141A0B]
                   min-h-[75vh] sm:min-h-[80vh] lg:min-h-[90vh]
                   pb-10 sm:pb-16 lg:pb-24"
      >
        {/* Parallax background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0 origin-center">
          <Image
            src="/photos/ChatGPT Image May 16, 2026, 05_05_46 PM.webp"
            alt="Mashbere – Premium Frozen Desserts UAE"
            fill priority
            className="object-cover object-center opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141A0B] via-[#141A0B]/40 to-[#141A0B]/10" />
        </motion.div>

        {/* Content — sits bottom-left, always readable */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full px-5 sm:px-8 lg:px-16 max-w-5xl"
        >
          <FadeUp>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="h-px w-8 sm:w-10 bg-[#C4EB54]" />
              <span className="text-[#C4EB54] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em]">
                About Mashbere
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display uppercase tracking-tighter leading-[0.82] text-white
                           text-[13.5vw] xs:text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl">
              Frozen<br />
              <span className="text-[#C4EB54]">Perfected.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.22} className="mt-4 sm:mt-6 max-w-xs sm:max-w-sm md:max-w-lg">
            <p className="text-white/65 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
              Premium ice cream, artisan popsicles, hygienic ice cups, and complete kiosk solutions — crafted for the UAE.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. WHO WE ARE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">

          {/* Text block — stacks on mobile, side-by-side on lg+ */}
          <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 mb-10 sm:mb-12">
            {/* Label — hidden on mobile to save space; merged into heading */}
            <div className="hidden lg:block lg:w-56 xl:w-64 flex-shrink-0 pt-2">
              <FadeUp>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Who We Are</span>
              </FadeUp>
            </div>

            <div className="flex-1 space-y-4 sm:space-y-5">
              <FadeUp>
                {/* Mobile: show label inline above heading */}
                <span className="block lg:hidden text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-3">Who We Are</span>
                <h2 className="font-display uppercase tracking-tighter leading-none text-[#141A0B]
                               text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                  A New Standard<br />
                  <span className="text-primary">in Frozen.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed font-medium max-w-2xl">
                  Mashbere is a UAE-based premium frozen dessert brand built around one conviction: food made from real ingredients — handled with care and presented with intention — creates experiences people remember.
                </p>
              </FadeUp>
              <FadeUp delay={0.17}>
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                  We serve both consumers and businesses, offering premium ice cream, popsicles, hygienic ice cups, ice glass, and ready-to-launch kiosk solutions across the UAE.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Feature image — taller on mobile so it isn't a thin strip */}
          <FadeUp delay={0.08}>
            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[40px]
                            aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/8]">
              <Image
                src="/photos/ChatGPT Image May 1, 2026, 03_19_32 PM.webp"
                alt="Mashbere premium frozen desserts crafted from natural fruit pulp"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141A0B]/70 via-[#141A0B]/30 to-transparent" />
              <div className="absolute inset-0 flex items-end sm:items-center p-6 sm:p-10 lg:p-14">
                <p className="font-display uppercase tracking-tighter leading-tight text-white/90
                              text-2xl sm:text-3xl lg:text-4xl">
                  Real Fruit.<br />Real Craft.<br />
                  <span className="text-[#C4EB54]">Real Joy.</span>
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════════════
          3. WHAT WE OFFER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <FadeUp>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-2">Our Range</span>
                <h2 className="font-display uppercase tracking-tighter leading-none text-[#141A0B]
                               text-3xl sm:text-4xl lg:text-5xl">
                  Everything You <span className="text-primary">Need. Frozen.</span>
                </h2>
              </FadeUp>
            </div>
          </div>

          {/* Cards — single column on mobile, 3-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {OFFERINGS.map((item, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="group bg-[#F7F7F5] border border-gray-100
                               hover:bg-[#141A0B] hover:border-[#141A0B]
                               rounded-2xl sm:rounded-[28px] p-6 sm:p-7
                               transition-all duration-500 h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100
                                  flex items-center justify-center text-primary mb-5
                                  group-hover:bg-[#C4EB54]/10 group-hover:text-[#C4EB54]
                                  group-hover:border-transparent transition-all duration-500">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-sm sm:text-base uppercase tracking-tight
                                 text-[#141A0B] group-hover:text-white mb-2.5
                                 transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-white/55 font-medium
                                leading-relaxed text-sm transition-colors duration-500 flex-1">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════════════
          4. ICE CUPS & KIOSK
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center">

            {/* Text — first on mobile, second on desktop */}
            <div className="space-y-5 order-1">
              <FadeUp>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Business Solutions</span>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="font-display uppercase tracking-tighter leading-none text-[#141A0B]
                               text-3xl sm:text-5xl lg:text-6xl">
                  Ice Cups.<br />
                  <span className="text-primary">Kiosk Ready.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium">
                  Our hygienic ice cups and ice glass are engineered for food service. Produced under strict quality controls — clean, consistent, and ready for immediate use.
                </p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mashbere's kiosk solutions are a complete launchpad for entrepreneurs — compact setups to high-traffic signature kiosks, with equipment, supply, and ongoing support.
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-1">
                  {['Cafés & restaurants', 'Beverage & juice bars', 'Mall kiosks & retail', 'Entrepreneurs & franchises'].map((use, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-gray-600 font-medium text-xs sm:text-sm">{use}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.26}>
                <Link
                  href="/equipment"
                  className="group inline-flex items-center gap-2 text-primary font-black
                             text-xs sm:text-sm uppercase tracking-widest
                             hover:gap-3 transition-all duration-300"
                >
                  View Business Solutions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </FadeUp>
            </div>

            {/* Image collage — below text on mobile, left-column on desktop */}
            <FadeUp delay={0.05} className="order-2">
              {/* Mobile: single wide image; Desktop: 2-col collage */}
              <div className="block sm:hidden">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/photos/ice-glass-main.webp"
                    alt="Mashbere hygienic ice cup – ice glass UAE"
                    fill className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className="hidden sm:grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="aspect-[3/4] rounded-[20px] overflow-hidden">
                    <Image src="/photos/ice-glass-main.webp" alt="Mashbere hygienic ice cup – ice glass UAE"
                      width={400} height={530} className="object-cover w-full h-full" />
                  </div>
                  <div className="aspect-square rounded-[20px] overflow-hidden">
                    <Image src="/photos/kiosk-main.webp" alt="Mashbere ice cream kiosk solution UAE"
                      width={400} height={400} className="object-cover w-full h-full" />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="aspect-square rounded-[20px] overflow-hidden">
                    <Image src="/photos/ice-glass-lifestyle.webp" alt="Ice glass for cafes and beverage businesses UAE"
                      width={400} height={400} className="object-cover w-full h-full" />
                  </div>
                  <div className="aspect-[3/4] rounded-[20px] overflow-hidden">
                    <Image src="/photos/kiosk-size-signature.webp" alt="Mashbere signature kiosk solution UAE"
                      width={400} height={530} className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════════════
          5. WHY MASHBERE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">

          {/* On mobile: heading above list. On lg+: side-by-side with sticky heading */}
          <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 items-start">

            {/* Heading */}
            <div className="lg:w-56 xl:w-64 flex-shrink-0 mb-6 lg:mb-0 lg:sticky lg:top-28">
              <FadeUp>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-3">Why Choose Us</span>
                <h2 className="font-display uppercase tracking-tighter leading-none text-[#141A0B]
                               text-3xl sm:text-4xl lg:text-5xl">
                  Built<br /><span className="text-primary">Different.</span>
                </h2>
              </FadeUp>
            </div>

            {/* List */}
            <div className="flex-1 divide-y divide-gray-100">
              {VALUE_POINTS.map((v, i) => (
                <FadeUp key={i} delay={i * 0.06}>
                  <div className="group flex items-start gap-4 sm:gap-6 py-5 sm:py-6
                                  hover:pl-2 transition-all duration-300 cursor-default">
                    <span className="text-[10px] font-black text-gray-200 tracking-widest pt-1 flex-shrink-0 w-6">
                      0{i + 1}
                    </span>
                    <div className="flex-1 space-y-0.5">
                      <h3 className="text-base sm:text-lg font-black text-[#141A0B] tracking-tight">{v.label}</h3>
                      <p className="text-gray-400 font-medium text-xs sm:text-sm leading-relaxed">{v.detail}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-100
                                            group-hover:text-[#C4EB54] transition-colors duration-300
                                            flex-shrink-0 mt-0.5" />
                  </div>
                </FadeUp>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════════════
          6. UAE SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">
          <FadeUp>
            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[48px]">
              {/* Taller on mobile so text isn't squished */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
                <Image
                  src="/photos/ChatGPT Image May 12, 2026, 01_31_49 PM.webp"
                  alt="Mashbere – Premium frozen desserts designed for the UAE market"
                  fill className="object-cover"
                  sizes="(max-width: 640px) 100vw, 90vw"
                />
                <div className="absolute inset-0 bg-[#141A0B]/72" />
              </div>

              {/* Text overlay — bottom on mobile, centered vertically on sm+ */}
              <div className="absolute inset-0 flex flex-col justify-end sm:justify-center
                              px-6 sm:px-12 lg:px-20 pb-8 sm:pb-0">
                <span className="text-[#C4EB54] text-[9px] sm:text-[10px] font-black
                                 uppercase tracking-[0.4em] block mb-3">Made for the UAE</span>
                <h2 className="font-display uppercase tracking-tighter leading-[0.85] text-white
                               text-2xl sm:text-4xl lg:text-6xl xl:text-7xl max-w-2xl mb-3 sm:mb-5">
                  Tuned for <span className="text-[#C4EB54]">This Climate.</span><br />
                  This Culture.
                </h2>
                <p className="text-white/60 text-xs sm:text-sm lg:text-base font-medium
                              max-w-xs sm:max-w-sm lg:max-w-md leading-relaxed">
                  From Dubai's summers to the pace of its malls — every Mashbere product is built around the UAE. Our flavors reflect the diversity here. Our standards match what's expected here.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-responsive text-center">
          <FadeUp>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-5">Get Started</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-display uppercase tracking-tighter leading-[0.85] text-[#141A0B] mb-8
                           text-4xl sm:text-6xl lg:text-7xl xl:text-[8rem]">
              Try It.<br />
              <span className="text-primary">Taste It.</span><br />
              Scale It.
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto bg-[#141A0B] text-white
                           px-8 sm:px-10 py-4 rounded-full font-black text-xs sm:text-sm
                           uppercase tracking-widest hover:scale-105 active:scale-95
                           transition-all shadow-xl inline-flex items-center justify-center gap-3 group"
              >
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/equipment"
                className="w-full sm:w-auto bg-[#C4EB54] text-[#141A0B]
                           px-8 sm:px-10 py-4 rounded-full font-black text-xs sm:text-sm
                           uppercase tracking-widest hover:scale-105 active:scale-95
                           transition-all shadow-xl inline-flex items-center justify-center gap-3 group"
              >
                Start Your Business
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
