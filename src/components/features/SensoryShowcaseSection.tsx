'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   SensoryShowcaseSection
   Zig-zag sensory scrollytelling — two entries that alternate
   image/text sides, matching the Stitch Sensory Showcase 2026.

   Entry 01 — AVOCADO SILK    → Image LEFT  | Text RIGHT
   Entry 02 — COFFEE LUXE     → Text LEFT   | Image RIGHT  (flipped)
───────────────────────────────────────────────────────────── */

const AVOCADO_IMG = '/photos/avokado (1).png';
const COFFEE_IMG  = '/photos/coffee (1).png';
const TORONESS_IMG = '/photos/strawberry.png';

/* ─── Entry definitions ────────────────────────────────────── */
const ENTRIES = [
  {
    id: '02',
    name: 'AVOCADO\nSILK',
    desc: 'Cold-pressed Haas avocados folded into a rich, macadamia milk base. The result is an impossibly dense, buttery texture that melts on contact with the palate.',
    tags: ['Vegan', 'High-Fat', 'Earthy'],
    quote: '"A viscosity that defies gravity, churning raw fats into a silk-like suspension."',
    img: AVOCADO_IMG,
    imgAlt: 'Avocado Silk ice cream',
    /** image on LEFT, text on RIGHT */
    imageLeft: true,
    /** lime shadow direction: right-bottom for left-image, left-bottom for right-image */
    shadowOffset: { x: 16, y: 16 },
    shadowOffsetHover: { x: 24, y: 24 },
    accentColor: '#C4EB54',
    /** Quote card position */
    quotePos: { bottom: 0, right: 0 },
    imgObjectFit: 'cover' as const,
  },
  {
    id: '03',
    name: 'TORONESS\nSTRAWBERRY',
    desc: 'Bold, sun-ripened strawberries blended into a velvety 220ml tub of pure indulgence. Every scoop is a celebration of fresh-picked flavour.',
    tags: ['Fruity', 'Premium', 'New Arrival'],
    quote: '"A celebration of the strawberry — bold, fresh, and utterly indulgent."',
    img: TORONESS_IMG,
    imgAlt: 'TORONESS Strawberry 220ml tub',
    imageLeft: false,
    shadowOffset: { x: -16, y: -16 },
    shadowOffsetHover: { x: -24, y: -24 },
    accentColor: '#FCE4EC',
    quotePos: { bottom: 0, left: 0 },
    imgObjectFit: 'contain' as const,
    badge: 'NEW',
    link: '/products/toroness-strawberry',
  },
];

/* ─── Single entry component ─────────────────────────────────
   Handles both zig (imageLeft=true) and zag (imageLeft=false)
───────────────────────────────────────────────────────────── */
function ShowcaseEntry({ entry, index }: { entry: typeof ENTRIES[0]; index: number }) {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [imgWrapRef.current, textRef.current].filter(Boolean) as HTMLElement[];
    const baseDelay = index * 0.08;

    targets.forEach((el, i) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(40px)';
      el.style.transition = `opacity 0.85s cubic-bezier(0.2,0.8,0.2,1) ${baseDelay + i * 0.15}s, transform 0.85s cubic-bezier(0.2,0.8,0.2,1) ${baseDelay + i * 0.15}s`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity   = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10 }
    );

    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [index]);

  const shadowId  = `sensory-shadow-${entry.id}`;
  const wrapId    = `sensory-wrap-${entry.id}`;

  /* Pad the image side so the quote card / shadow don't clip.
     For imageLeft=true  → shadow goes bottom-right  → pad bottom + right.
     For imageLeft=false → shadow goes top-left       → pad top    + left. */
  /* Tailwind padding classes instead of hardcoded styles */
  const padClass = entry.imageLeft
    ? "pb-3 pr-3 md:pb-8 md:pr-8"
    : "pt-3 pl-3 md:pt-8 md:pl-8";

  /* ── Image block ── */
  /* On mobile only: always show image first. max-md: applies only below md breakpoint. */
  const imgOrderClass = entry.imageLeft ? '' : 'max-md:order-1';
  const ImageBlock = (
    <div
      ref={imgWrapRef}
      id={wrapId}
      className={`relative col-span-12 md:col-span-7 group ${padClass} ${imgOrderClass}`}
    >
      <style>{`
        #${shadowId} {
          transform: translate(${entry.shadowOffset.x * 0.5}px, ${entry.shadowOffset.y * 0.5}px);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 768px) {
          #${shadowId} {
            transform: translate(${entry.shadowOffset.x}px, ${entry.shadowOffset.y}px);
          }
        }
        #${wrapId}:hover #${shadowId} {
          transform: translate(${entry.shadowOffsetHover.x}px, ${entry.shadowOffsetHover.y}px);
        }
      `}</style>

      {/* Electric-lime offset shadow */}
      <div
        id={shadowId}
        className="absolute inset-0 -z-10"
        style={{ background: entry.accentColor, borderRadius: '16px' }}
      />

      {/* Product image */}
      <div className="relative z-10 w-full overflow-hidden shadow-xl" style={{ borderRadius: '16px', background: entry.imgObjectFit === 'contain' ? '#fafaf8' : '#e6e8e6' }}>
        <img
          src={entry.img}
          alt={entry.imgAlt}
          className="w-full h-full"
          style={{
            aspectRatio: entry.imageLeft ? '5/4' : '4/4',
            objectFit: entry.imgObjectFit,
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Floating quote card */}
      <div
        className="absolute hidden md:block"
        style={{
          ...entry.quotePos,
          background: '#f5fce3',
          padding: '28px 32px',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          maxWidth: '300px',
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            lineHeight: '1.65',
            color: '#444936',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          {entry.quote}
        </p>
      </div>
    </div>
  );

  /* ── Text block ── */
  /* On mobile only: always show text after image. max-md: applies only below md breakpoint. */
  const txtOrderClass = entry.imageLeft ? '' : 'max-md:order-2';
  const TextBlock = (
    <div
      ref={textRef}
      className={`col-span-12 md:col-span-4 flex flex-col ${txtOrderClass}`}
      style={{ gap: 'clamp(16px, 4vw, 28px)' }}
    >
      {/* Ghost number + Heading */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        <span
          className="leading-none select-none shrink-0"
          style={{
            fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
            fontSize: 'clamp(72px, 10vw, 120px)',
            color: '#708238',
            opacity: 0.2,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {entry.id}
        </span>
        <h2
          className="leading-none uppercase"
          style={{
            fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
            fontSize: 'clamp(40px, 6vw, 64px)',
            color: '#141A0B',
            lineHeight: 1,
            letterSpacing: '0.02em',
            whiteSpace: 'pre-line',
          }}
        >
          {entry.name}
        </h2>
        {/* NEW badge for TORONESS */}
        {(entry as any).badge && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              background: '#E11D48',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: '9999px',
              marginLeft: '8px',
              verticalAlign: 'middle',
            }}
          >
            {(entry as any).badge}
          </span>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(15px, 1.8vw, 19px)',
          lineHeight: '1.6',
          color: '#444936',
          margin: 0,
        }}
      >
        {entry.desc}
      </p>

      {/* Tag pills */}
      <div className="flex flex-wrap" style={{ gap: '10px' }}>
        {entry.tags.map(tag => (
          <span
            key={tag}
            style={{
              padding: '8px 16px',
              background: tag === 'New Arrival' ? 'rgba(225,29,72,0.08)' : 'rgba(112,130,56,0.10)',
              color: tag === 'New Arrival' ? '#E11D48' : '#708238',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '9999px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Shop Now CTA for linked entries (TORONESS) */}
      {(entry as any).link && (
        <Link
          href={(entry as any).link}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#E11D48',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
            width: 'fit-content',
          }}
        >
          Shop Now →
        </Link>
      )}
    </div>
  );

  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        gap: '24px',
      }}
    >
      {entry.imageLeft ? (
        <>
          {ImageBlock}
          <div className="col-span-12 md:col-span-1 hidden md:block" aria-hidden="true" />
          {TextBlock}
        </>
      ) : (
        <>
          {TextBlock}
          <div className="col-span-12 md:col-span-1 hidden md:block" aria-hidden="true" />
          {ImageBlock}
        </>
      )}
    </div>
  );
}

/* ─── Main exported component ────────────────────────────────── */
export default function SensoryShowcaseSection() {
  return (
    <section
      className="relative w-full z-20"
      aria-label="Sensory Showcase"
      style={{
        paddingLeft:  'clamp(16px, 5vw, 80px)',
        paddingRight: 'clamp(16px, 5vw, 80px)',
      }}
    >
      {/* Section Header */}
      <div className="text-center pt-20 pb-4 md:pt-32 md:pb-8">
        <span
          className="block uppercase"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: '#708238', /* moss-green */
            marginBottom: '16px',
          }}
        >
          The Experience
        </span>
        <h2
          className="leading-none uppercase"
          style={{
            fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
            fontSize: 'clamp(48px, 8vw, 64px)',
            color: '#141A0B',
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          CRAFTED PERFECTION
        </h2>
      </div>

      {ENTRIES.map((entry, i) => (
        <div
          key={entry.id}
          style={{
            paddingTop:    'clamp(40px, 8vw, 120px)',
            paddingBottom: 'clamp(40px, 8vw, 120px)',
            /* Subtle divider between entries */
            borderTop: i > 0 ? '1px solid rgba(112,130,56,0.10)' : 'none',
          }}
        >
          <ShowcaseEntry entry={entry} index={i} />
        </div>
      ))}
    </section>
  );
}
