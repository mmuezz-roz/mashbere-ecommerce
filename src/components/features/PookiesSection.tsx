'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PookiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.pookies-reveal').forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
              el.classList.add('pookies-visible');
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
        .pookies-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pookies-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .pookies-badge {
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
        .pookies-badge::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #3a5c2a;
          opacity: 0.6;
        }
        .pookies-badge-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border: 1.5px solid #3a5c2a;
          border-radius: 50%;
        }
        .pookies-title {
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 900;
          color: #1a3210;
          line-height: 0.9;
          letter-spacing: -0.02em;
          font-family: 'Georgia', serif;
          margin-bottom: 10px;
        }
        .pookies-subtitle {
          font-size: clamp(18px, 2.5vw, 28px);
          font-weight: 700;
          color: #1a3210;
          margin-bottom: 18px;
          font-family: 'Georgia', serif;
        }
        .pookies-desc {
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 500;
          color: #4a5a42;
          line-height: 1.625;
          max-width: 320px;
          margin-bottom: 32px;
        }
        .pookies-features {
          display: flex;
          gap: 32px;
          margin-bottom: 36px;
        }
        .pookies-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }
        .pookies-feature-icon {
          width: 40px;
          height: 40px;
          border: 1.5px solid #a8b89a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a5c2a;
        }
        .pookies-feature-label {
          font-family: var(--font-sans);
          font-size: 13px;
          color: #4a5a42;
          font-weight: 600;
          text-align: center;
          line-height: 1.3;
        }
        .pookies-cta {
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
        .pookies-cta:hover {
          background: #2d5c1a;
          transform: translateX(3px);
        }
        .pookies-cta-arrow {
          font-size: 16px;
          transition: transform 0.2s;
        }
        .pookies-cta:hover .pookies-cta-arrow {
          transform: translateX(4px);
        }
        .pookies-logo-swap {
          cursor: pointer;
        }
        .pookies-logo-swap:hover .pookies-logo-ar {
          opacity: 1 !important;
        }
        .pookies-logo-swap .pookies-logo-en {
          transition: opacity 0.35s ease;
        }
        .pookies-logo-swap:hover .pookies-logo-en {
          opacity: 0;
        }
        @media (max-width: 768px) {
          .pookies-content-wrap {
            padding: 64px 32px 64px 32px !important;
            max-width: 100% !important;
          }
          .pookies-section-inner {
            min-height: 110vw !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ background: '#f5f0e8', marginTop: '64px' }}
      >
        {/* Full background image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/photos/ChatGPT Image May 2, 2026, 11_13_00 PM.png')`,
            backgroundSize: '110%',
            backgroundPosition: '60% center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Left gradient overlay so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.92) 38%, rgba(245,240,232,0.55) 58%, rgba(245,240,232,0) 75%)',
          }}
        />

        {/* Top and Bottom soft transition overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,240,232,1) 0%, rgba(245,240,232,0) 15%, rgba(245,240,232,0) 85%, rgba(245,240,232,1) 100%)',
          }}
        />

        {/* Content */}
        <div
          className="pookies-section-inner relative z-10 flex items-center"
          style={{ minHeight: '720px' }}
        >
          <div
            className="pookies-content-wrap"
            style={{ maxWidth: '520px', padding: '100px 0 100px 7vw' }}
          >
            {/* Pookies ICE Logo — hover to toggle Arabic version */}
            <div
              className="pookies-reveal pookies-logo-swap"
              style={{ marginBottom: '-30px', width: '260px', position: 'relative', height: 'auto' }}
            >
              {/* English logo (default) */}
              <img
                src="/photos/1777754998295-8d335e3c-14f9-4866-a8af-da578df1ec7b_1.png"
                alt="Pookies ICE Logo"
                className="pookies-logo-en"
                style={{ width: '260px', height: 'auto', display: 'block' }}
              />
              {/* Arabic logo (shown on hover) */}
              <img
                src="/photos/1777755025290-b62df529-b435-4d41-9f8e-5fe5c87d201d_1.png"
                alt="بوكيز آيس Logo"
                className="pookies-logo-ar"
                style={{
                  width: '260px',
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

            {/* Introducing badge */}
            <div className="pookies-badge pookies-reveal">
              <span className="pookies-badge-icon">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="3" stroke="#3a5c2a" strokeWidth="1.2" />
                  <circle cx="4" cy="4" r="1.2" fill="#3a5c2a" />
                </svg>
              </span>
              Introducing
            </div>

            {/* POOKIES */}
            <h2 className="pookies-title pookies-reveal">POOKIES</h2>

            {/* Small Pops. Big Joy. */}
            <p className="pookies-subtitle pookies-reveal">Small Pops. Big Joy.</p>

            {/* Description */}
            <p className="pookies-desc pookies-reveal">
              Bite-sized indulgence crafted with real ingredients. Perfect for quick cravings and everyday treats.
            </p>

            {/* Feature icons */}
            <div className="pookies-features pookies-reveal">
              {/* Real Ingredients */}
              <div className="pookies-feature">
                <div className="pookies-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C8 2 5 5 5 8.5C5 10.43 6.34 12 8 12C9.66 12 11 10.43 11 8.5C11 5 8 2 8 2Z" stroke="#3a5c2a" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M8 12V14" stroke="#3a5c2a" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="pookies-feature-label">Real<br/>Ingredients</span>
              </div>

              {/* Perfect Snack */}
              <div className="pookies-feature">
                <div className="pookies-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="5" y="9" width="6" height="5" rx="1" stroke="#3a5c2a" strokeWidth="1.2"/>
                    <path d="M6.5 9V7C6.5 5.62 7.17 4.5 8 4.5C8.83 4.5 9.5 5.62 9.5 7V9" stroke="#3a5c2a" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="8" cy="3.5" r="1" stroke="#3a5c2a" strokeWidth="1.2"/>
                  </svg>
                </div>
                <span className="pookies-feature-label">Perfect<br/>Snack</span>
              </div>

              {/* Loved by Everyone */}
              <div className="pookies-feature">
                <div className="pookies-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 12.5C8 12.5 3 9.5 3 6.5C3 4.84 4.34 3.5 6 3.5C7 3.5 7.87 4 8 4.5C8.13 4 9 3.5 10 3.5C11.66 3.5 13 4.84 13 6.5C13 9.5 8 12.5 8 12.5Z" stroke="#3a5c2a" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="pookies-feature-label">Loved by<br/>Everyone</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pookies-reveal">
              <Link href="/products?category=pookies" className="pookies-cta">
                Explore Flavors
                <span className="pookies-cta-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
