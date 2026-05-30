'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { TextReveal, BodyReveal } from '@/components/shared/TextReveal';
import { ScrollRevealHeading } from '@/components/shared/ScrollRevealHeading';

export default function PookeesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.pookees-reveal').forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
              el.classList.add('pookees-visible');
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .pookees-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pookees-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .pookees-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #3a5c2a;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .pookees-badge::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #3a5c2a;
          opacity: 0.6;
        }
        .pookees-badge-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border: 1.5px solid #3a5c2a;
          border-radius: 50%;
        }
        .pookees-title {
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 900;
          color: #1a3210;
          line-height: 0.9;
          letter-spacing: -0.02em;
          font-family: 'Georgia', serif;
          margin-bottom: 10px;
        }
        .pookees-subtitle {
          font-size: clamp(18px, 2.5vw, 28px);
          font-weight: 700;
          color: #1a3210;
          margin-bottom: 18px;
          font-family: 'Georgia', serif;
        }
        .pookees-desc {
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 500;
          color: #4a5a42;
          line-height: 1.625;
          max-width: 320px;
          margin-bottom: 32px;
        }
        .pookees-features {
          display: flex;
          gap: 32px;
          margin-bottom: 36px;
        }
        .pookees-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }
        .pookees-feature-icon {
          width: 56px;
          height: 56px;
          background: #e6e9e1;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2d3e24;
          margin-bottom: 12px;
        }
        .pookees-feature-label {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #1a1a1a;
          font-weight: 800;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .pookees-feature-desc {
          font-family: var(--font-sans);
          font-size: 12px;
          color: #666;
          font-weight: 500;
          text-align: center;
          line-height: 1.4;
          max-width: 140px;
        }
        .pookees-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #1a3210;
          color: #fff;
          padding: 14px 28px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
          border: none;
          cursor: pointer;
        }
        .pookees-cta:hover {
          background: #2d5c1a;
          transform: translateX(3px);
        }
        .pookees-cta-arrow {
          font-size: 16px;
          transition: transform 0.2s;
        }
        .pookees-cta:hover .pookees-cta-arrow {
          transform: translateX(4px);
        }
        .pookees-logo-swap {
          cursor: pointer;
        }
        .pookees-logo-swap:hover .pookees-logo-ar {
          opacity: 1 !important;
        }
        .pookees-logo-swap .pookees-logo-en {
          transition: opacity 0.35s ease;
        }
        .pookees-logo-swap:hover .pookees-logo-en {
          opacity: 0;
        }
        .pookees-main-section {
          margin-top: 64px;
        }
        @media (max-width: 1200px) {
          .pookees-main-section {
            margin-top: 32px;
          }
          .pookees-content-wrap {
            padding: 160px 0 80px 5vw !important;
            max-width: 480px !important;
          }
          .pookees-bg {
            background-size: cover !important;
            background-position: center right !important;
          }
        }
        @media (max-width: 768px) {
          .pookees-main-section {
            margin-top: 0 !important;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
          }
          .pookees-content-wrap {
            padding: 140px 24px 64px 24px !important;
            max-width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .pookees-section-inner {
            min-height: auto !important;
          }
          .pookees-title {
            font-size: clamp(40px, 14vw, 72px) !important;
          }
          .pookees-subtitle {
            font-size: clamp(16px, 5vw, 24px) !important;
          }
          .pookees-desc {
            max-width: 280px !important;
            font-size: 14px !important;
            margin-left: 0 !important;
            text-align: left !important;
          }
          .pookees-features {
            flex-wrap: wrap;
            gap: 20px !important;
            justify-content: center;
          }
          .pookees-feature {
            flex: 0 0 calc(33% - 14px);
            min-width: 80px;
          }
          .pookees-logo-en, .pookees-logo-ar {
            width: min(220px, 55vw) !important;
          }
          .pookees-bg {
            background-image: url('/photos/ChatGPT Image May 3, 2026, 04_41_21 PM.webp') !important;
            background-size: cover !important;
            background-position: center center !important;
          }
          .pookees-cta {
            padding: 14px 24px !important;
          }
        }
        @media (max-width: 400px) {
          .pookees-title {
            font-size: 36px !important;
          }
          .pookees-feature-icon {
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="pookees-main-section relative w-full overflow-hidden"
        style={{ background: '#f5f0e8' }}
      >
        {/* Full background image */}
        <div
          className="absolute inset-0 w-full h-full pookees-bg"
          style={{
            backgroundImage: `url('/photos/ChatGPT Image May 2, 2026, 11_13_00 PM.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Left gradient overlay so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(245,240,232,0.95) 0%, rgba(245,240,232,0.85) 35%, rgba(245,240,232,0.4) 55%, rgba(245,240,232,0) 75%)',
          }}
        />

        {/* Top and Bottom soft transition overlay - reduced to prevent 'cutting' look */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,240,232,0.8) 0%, rgba(245,240,232,0) 8%, rgba(245,240,232,0) 92%, rgba(245,240,232,0.8) 100%)',
          }}
        />



        {/* Content */}
        <div
          className="pookees-section-inner relative z-10 flex items-center"
          style={{ minHeight: '720px' }}
        >
          <div
            className="pookees-content-wrap"
            style={{ maxWidth: '520px', padding: '180px 0 100px 7vw' }}
          >
            {/* Pookees ICE Logo — hover to toggle Arabic version */}
            <div
              className="pookees-reveal pookees-logo-swap"
              style={{ marginBottom: '-30px', width: 'min(260px, 60vw)', position: 'relative', height: 'auto' }}
            >
              {/* English logo (default) */}
              <img
                src="/photos/1777754998295-8d335e3c-14f9-4866-a8af-da578df1ec7b_1.webp"
                alt="Pookees ICE Logo"
                className="pookees-logo-en"
                style={{ width: 'min(260px, 60vw)', height: 'auto', display: 'block' }}
              />
              {/* Arabic logo (shown on hover) */}
              <img
                src="/photos/1777755025290-b62df529-b435-4d41-9f8e-5fe5c87d201d_1.webp"
                alt="بوكيز آيس Logo"
                className="pookees-logo-ar"
                style={{
                  width: 'min(260px, 60vw)',
                  height: 'auto',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                }}
              />
            </div>

            {/* Introducing badge with lines */}
            <div className="pookees-badge pookees-reveal flex items-center gap-4 w-full">
              <div className="pookees-badge-line" />
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 11a7 7 0 0 1-7 7c-1.1 0-1.35-.16-2-.5Z"/>
                  <path d="M11 20c-1-3 .5-6 1.5-8.5"/>
                </svg>
                <span className="text-[#3a5c2a] font-bold tracking-[0.2em] uppercase text-[11px]">Introducing</span>
              </div>
              <div className="pookees-badge-line" />
            </div>

            {/* Heading — editorial clip-mask reveal matching ProductShowcase */}
            <ScrollRevealHeading
              variant="left"
              lines={[
                <div key="pookee" className="relative inline-block w-fit mb-3 lg:mb-6">
                  <div className="absolute inset-0 bg-[#7E8D5F] -rotate-1 transform scale-y-110" />
                  <span className="relative z-10 text-[14vw] sm:text-7xl md:text-8xl lg:text-[10rem] text-white px-5 py-0 block leading-none">
                    POOKEE
                  </span>
                </div>,
                <span key="small" className="text-[7vw] sm:text-4xl md:text-5xl lg:text-6xl">
                  Small Pops.
                </span>,
                <span key="big" className="text-[10vw] sm:text-6xl md:text-7xl lg:text-[8rem] lg:whitespace-nowrap">
                  Big Joy.
                </span>,
              ]}
              className="flex flex-col font-display text-gray-900 uppercase leading-[0.75] tracking-tighter mb-10"
            />

            {/* Description */}
            <BodyReveal delay={0.4}>
              <p className="pookees-desc">
                Bite-sized indulgence crafted with real ingredients. Perfect for quick cravings and everyday treats.
              </p>
            </BodyReveal>
            {/* Feature icons */}
            <div className="pookees-features pookees-reveal">
              {/* Real Ingredients */}
              <div className="pookees-feature">
                <div className="pookees-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 11a7 7 0 0 1-7 7c-1.1 0-1.35-.16-2-.5Z"/>
                    <path d="M11 20c-1-3 .5-6 1.5-8.5"/>
                  </svg>
                </div>
                <span className="pookees-feature-label">Real Ingredients</span>
                <p className="pookees-feature-desc">Made with quality ingredients you can trust.</p>
              </div>
 
              {/* Perfect Snack */}
              <div className="pookees-feature">
                <div className="pookees-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5"/>
                    <path d="M12 18V4"/>
                    <path d="M10 18h4"/>
                    <rect x="6" y="11" width="12" height="7" rx="2"/>
                  </svg>
                </div>
                <span className="pookees-feature-label">Perfect Snack</span>
                <p className="pookees-feature-desc">The perfect bite-sized treat for anytime, anywhere.</p>
              </div>
 
              {/* Loved by Everyone */}
              <div className="pookees-feature">
                <div className="pookees-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </div>
                <span className="pookees-feature-label">Loved by Everyone</span>
                <p className="pookees-feature-desc">Crafted for all ages to enjoy and savor together.</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pookees-reveal w-full flex flex-col items-center gap-4">
              <Link href="/products?category=pookees" className="pookees-cta !rounded-full !px-12 !py-5 !bg-[#2d3e24] !font-black !text-[13px]">
                Explore Flavors
                <span className="pookees-cta-arrow">→</span>
              </Link>
              
              <div className="flex items-center gap-2 text-[#666] text-[11px] font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 11a7 7 0 0 1-7 7c-1.1 0-1.35-.16-2-.5Z"/>
                </svg>
                Delicious moments in every pop
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
