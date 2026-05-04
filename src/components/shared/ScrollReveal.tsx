'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  hideMask?: boolean;
  disableAnimation?: boolean;
}

export const ScrollReveal = ({ 
  children, 
  width = "100%", 
  className,
  delay = 0.1,
  direction = 'up',
  hideMask = false,
  disableAnimation = false
}: ScrollRevealProps) => {
  // Reduced initial offset from 100px → 30px to prevent jarring layout jumps
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':    return { y: 30, opacity: 0 };
      case 'down':  return { y: -30, opacity: 0 };
      case 'left':  return { x: 30, opacity: 0 };
      case 'right': return { x: -30, opacity: 0 };
      default:      return { y: 30, opacity: 0 };
    }
  };

  return (
    // Removed overflow:hidden — was clipping child content and causing paint issues
    <div style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={{
          // No scale transform — scale causes full subtree repaint on every frame
          hidden: disableAnimation ? { opacity: 0 } : { ...getInitialPosition(), opacity: 0 },
          visible: { y: 0, x: 0, opacity: 1 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        // Snappier duration: 0.7s instead of 1.2s — eliminates the sluggish feel
        transition={{ duration: disableAnimation ? 0.3 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
