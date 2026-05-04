'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * TextReveal — editorial clip-mask word/line reveal.
 *
 * Each word slides up from y:100% to y:0 inside an overflow-hidden container,
 * staggered via framer-motion variants. Fires once when the element enters
 * the viewport (viewport: once: true). GPU-only compositor animation.
 *
 * Usage:
 *   <TextReveal text="Some Heading" as="h2" className="text-4xl font-bold" />
 *   <TextReveal lines={["Line One", "Line Two"]} stagger={0.1} />
 */

interface TextRevealProps {
  /** Single string — split into words */
  text?: string;
  /** Multiple lines — each line animates as a block (not split into words) */
  lines?: React.ReactNode[];
  /** The element to render the outer wrapper as (default 'div') */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Per-word stagger in seconds (default 0.06) */
  stagger?: number;
  /** Initial y offset in % (default 100 = full clip) */
  yOffset?: number;
  /** Animation duration per word (default 0.7s) */
  duration?: number;
  /** Delay before the first word animates (default 0) */
  delay?: number;
  /** Viewport margin (default '-60px') */
  margin?: string;
  /** Extra wrapper class for each word's overflow-hidden shell */
  wordWrapClass?: string;
  children?: React.ReactNode;
}

const containerVariants = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const wordVariants = (yOffset: number, duration: number) => ({
  hidden: { y: `${yOffset}%`, opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
});

// Simple line reveal (no word splitting) — for when you need full lines
const lineVariants = (yOffset: number, duration: number) => ({
  hidden: { y: yOffset, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
});

export function TextReveal({
  text,
  lines,
  as: Tag = 'div',
  className = '',
  stagger = 0.06,
  yOffset = 100,
  duration = 0.7,
  delay = 0,
  margin = '-60px',
  wordWrapClass = '',
  children,
}: TextRevealProps) {
  // LINES MODE — reveal each line as a block
  if (lines) {
    return (
      <motion.div
        className={className}
        variants={containerVariants(stagger * 1.5, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`overflow-hidden ${wordWrapClass}`}
          >
            <motion.div variants={lineVariants(yOffset * 0.4, duration)}>
              {line}
            </motion.div>
          </div>
        ))}
      </motion.div>
    );
  }

  // WORDS MODE — split text into words, each gets clip-reveal
  if (text) {
    const words = text.split(' ');
    return (
      <motion.div
        className={`flex flex-wrap ${className}`}
        variants={containerVariants(stagger, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={`overflow-hidden inline-block ${wordWrapClass}`}
            style={{ marginRight: '0.28em' }}
          >
            <motion.span
              className="inline-block"
              variants={wordVariants(yOffset, duration)}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    );
  }

  // CHILDREN MODE — wrap children in staggered line reveals
  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.div>
  );
}

/**
 * BodyReveal — simple fade-up for paragraph text / body copy.
 * Lighter animation than headings (no clip mask).
 */
export function BodyReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  margin = '-40px',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  margin?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
