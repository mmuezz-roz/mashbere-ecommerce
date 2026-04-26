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
}

export const ScrollReveal = ({ 
  children, 
  width = "100%", 
  className,
  delay = 0.2,
  direction = 'up',
  hideMask = false
}: ScrollRevealProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 100, opacity: 0 };
      case 'down': return { y: -100, opacity: 0 };
      case 'left': return { x: 100, opacity: 0 };
      case 'right': return { x: -100, opacity: 0 };
      default: return { y: 100, opacity: 0 };
    }
  };

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: { ...getInitialPosition(), filter: "blur(10px)", scale: 0.95 },
          visible: { y: 0, x: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      
      {/* Modern Masking Effect */}
      {!hideMask && (
        <motion.div
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
            background: "#C4EB54",
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
};
