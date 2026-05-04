'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ScrollRevealHeadingProps {
  lines: React.ReactNode[];
  className?: string;
  as?: React.ElementType;
}

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const lineVariants: Variants = {
  hidden: { y: "100%", filter: "blur(8px)" },
  visible: { 
    y: "0%", 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

const centerClipVariants: Variants = {
  hidden: { clipPath: "inset(-20% 50% -20% 50%)", filter: "blur(8px)", scale: 0.95 },
  visible: { 
    clipPath: "inset(-20% -20% -20% -20%)", 
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export function ScrollRevealHeading({ lines, className = '', as: Component = 'h2' }: ScrollRevealHeadingProps) {
  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      variants={headingVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
      className={className}
    >
      {lines.map((line, i) => {
        let isHighlighted = false;
        
        // Detect if the line is the "highlighted" box (which uses a relative inline-block layout)
        if (React.isValidElement(line) && line.props && typeof (line.props as any).className === 'string') {
          const className = (line.props as any).className;
          isHighlighted = className.includes('relative') && className.includes('inline-block');
        }

        if (isHighlighted) {
          return (
            <motion.div key={i} variants={centerClipVariants} className="will-change-transform w-fit">
              {line}
            </motion.div>
          );
        }

        return (
          <div key={i} className="overflow-hidden py-1 flex">
            <motion.div variants={lineVariants} className="will-change-transform w-fit">
              {line}
            </motion.div>
          </div>
        );
      })}
    </MotionComponent>
  );
}
