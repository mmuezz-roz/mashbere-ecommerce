'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   ArchiveSection
   Matches the "Asymmetrical Sensory Grid" (SENSORY ARCHIVE)
   from the new Stitch design.
───────────────────────────────────────────────────────────── */

const IMAGES = {
  feature: '/photos/coffee (1).png',
  stacked1: '/photos/strawberry.png',
  stacked2: '/photos/vanil.png',
};

export default function ArchiveSection() {
  return (
    <>
      <style>{`
        /* Scrim and hover effects */
        .sensory-feature-card:hover .sensory-bg {
          transform: scale(1.03);
        }
        .sensory-feature-card:hover .sensory-content {
          transform: translateY(0);
        }
        
        .sensory-stack-1:hover .sensory-bg {
          transform: scale(1.05);
        }
        .sensory-stack-1:hover .sensory-scrim {
          opacity: 1;
        }
        .sensory-stack-1:hover .sensory-title {
          transform: translateY(0);
        }
        
        .sensory-stack-2:hover .sensory-bg {
          transform: scale(1.05);
        }

        .sensory-btn {
          transition: background-color 0.3s ease;
        }
        .sensory-btn:hover {
          background-color: #ffffff !important;
        }
      `}</style>

      <section
        className="relative w-full z-30"
        style={{
          background: '#dee6cd', /* surface-container-high */
          paddingTop: 'clamp(48px, 10vw, 120px)',
          paddingBottom: 'clamp(48px, 10vw, 120px)',
          paddingLeft: 'clamp(16px, 5vw, 80px)',
          paddingRight: 'clamp(16px, 5vw, 80px)',
          boxShadow: '0 -20px 40px rgba(0,0,0,0.05)',
        }}
      >
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: 'clamp(32px, 6vw, 80px)' }}>
          <span
            className="block uppercase"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: '#506600', /* primary */
              marginBottom: '16px',
            }}
          >
            Curated Selections
          </span>
          <h2
            className="leading-none uppercase"
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: 'clamp(48px, 8vw, 64px)',
              color: '#141A0B', /* obsidian-green */
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            FLAVOR GALLERY
          </h2>
        </div>

        {/* 12-Column Grid */}
        <div
          className="grid items-stretch"
          style={{
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '24px',
          }}
        >
          {/* ── LEFT: Large Feature Image (8 cols) ── */}
          <div
            className="sensory-feature-card group relative col-span-12 md:col-span-8 overflow-hidden rounded-2xl shadow-xl"
            style={{ height: 'clamp(320px, 80vw, 700px)' }}
          >
            {/* Background Image */}
            <div
              className="sensory-bg absolute inset-0 bg-no-repeat bg-center transition-transform duration-1000 ease-out"
              style={{ backgroundImage: `url('${IMAGES.feature}')`, backgroundSize: '80%' }}
            />
            {/* Gradient Scrim */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(20,26,11,0.9) 0%, rgba(20,26,11,0.2) 50%, transparent 100%)',
              }}
            />
            
            {/* Content Overlay */}
            <div
              className="sensory-content absolute bottom-0 left-0 w-full z-10 flex flex-row items-end justify-between gap-4 transition-transform duration-500 ease-out"
              style={{
                padding: 'clamp(20px, 4vw, 48px)',
                transform: 'translateY(16px)',
              }}
            >
              <div>

                <h3
                  className="leading-none uppercase"
                  style={{
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 'clamp(32px, 8vw, 64px)',
                    color: '#f5fce3', /* surface */
                    letterSpacing: '0.02em',
                    margin: 0,
                  }}
                >
                  COFFEE<br />LUXE
                </h3>
              </div>
              
              <Link href="/products" passHref>
                <button
                  className="sensory-btn flex items-center justify-center rounded-full shadow-lg shrink-0"
                  style={{
                    width: 'clamp(40px, 10vw, 56px)',
                    height: 'clamp(40px, 10vw, 56px)',
                    background: '#C4EB54',
                    color: '#141A0B',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="View Coffee Luxe details"
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Stacked Images (4 cols) ── */}
          {/* Mobile: side-by-side row | md+: stacked column fills height of big card */}
          <div className="col-span-12 md:col-span-4 flex flex-row md:flex-col gap-4 md:gap-6 md:h-full">
            
            {/* Stacked 1: Strawberry */}
            <div
              className="sensory-stack-1 group relative flex-1 overflow-hidden rounded-2xl shadow-lg z-20 md:-ml-12"
              style={{ minHeight: 'clamp(160px, 40vw, 338px)' }}
            >
              <div
                className="sensory-bg absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-1000 ease-out"
                style={{ backgroundImage: `url('${IMAGES.stacked1}')` }}
              />
              <div
                className="sensory-scrim absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(20,26,11,0.8) 0%, transparent 100%)',
                  opacity: 0.8,
                }}
              />
              <div className="absolute bottom-0 left-0 w-full" style={{ padding: 'clamp(12px, 3vw, 32px)' }}>
                <h4
                  className="sensory-title leading-none uppercase transition-transform duration-500"
                  style={{
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 'clamp(20px, 4vw, 48px)',
                    color: '#C4EB54',
                    margin: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  TORONESS<br />STRAWBERRY
                </h4>
              </div>
            </div>

            {/* Stacked 2: Vanilla */}
            <div
              className="sensory-stack-2 group relative flex-1 overflow-hidden rounded-2xl shadow-lg"
              style={{ minHeight: 'clamp(160px, 40vw, 338px)' }}
            >
              <div
                className="sensory-bg absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-1000 ease-out"
                style={{ backgroundImage: `url('${IMAGES.stacked2}')` }}
              />
              <div
                className="sensory-scrim absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(20,26,11,0.8) 0%, transparent 100%)',
                  opacity: 0.8,
                }}
              />
              <div className="absolute bottom-0 left-0 w-full" style={{ padding: 'clamp(12px, 3vw, 32px)' }}>
                <h4
                  className="sensory-title leading-none uppercase transition-transform duration-500"
                  style={{
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 'clamp(20px, 4vw, 48px)',
                    color: '#C4EB54',
                    margin: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  VANILLA
                </h4>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
