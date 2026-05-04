"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BounceCards.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number | string;
  containerHeight?: number | string;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  isMobile?: boolean;
  onCardClick?: (index: number) => void;
}

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = true,
  isMobile = false,
  onCardClick
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use gsap.context to scope all selectors to containerRef
    const ctx = gsap.context(() => {
      // q() is scoped to containerRef - no more global .card selection!
      const q = gsap.utils.selector(containerRef);

      if (isMobile) {
        // Single-run entrance from below for mobile
        gsap.from(q('.card-inner'), {
          y: 80,
          opacity: 0,
          scale: 0.7,
          rotate: () => (Math.random() - 0.5) * 60,
          stagger: 0.05,
          duration: 1.0,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
            once: true,
          }
        });
        return;
      }

      // Desktop: clean single-run entrance, no scrub (scrub causes lag)
      gsap.from(q('.card-inner'), {
        y: 60,
        opacity: 0,
        scale: 0.85,
        stagger: 0.07,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images.length, isMobile]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
          zIndex: 50
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        gsap.to(target, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
          zIndex: 10
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(target, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
        zIndex: 10
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx} cursor-pointer`}
          style={{
            transform: transformStyles[idx] ?? 'none',
            zIndex: 10,
            willChange: 'transform'
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onClick={() => onCardClick?.(idx)}
        >
          <div className="card-inner w-full h-full relative" style={{ willChange: 'transform, opacity' }}>
            <Image
              className="image"
              src={src}
              alt={`card-${idx}`}
              fill
              sizes="(max-width: 640px) 140px, 180px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
