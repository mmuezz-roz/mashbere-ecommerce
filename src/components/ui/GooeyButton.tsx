"use client";

import React, { useRef, useState, useId } from 'react';
import './GooeyButton.css';

interface GooeyButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  particleCount?: number;
  particleDistances?: [number, number];
}

const GooeyButton: React.FC<GooeyButtonProps> = ({ 
  children, 
  onClick, 
  className = "",
  particleCount = 12,
  particleDistances = [80, 5]
}) => {
  const filterRef = useRef<HTMLSpanElement>(null);
  const uniqueId = useId();
  const buttonId = `gooey-button-filter-${uniqueId.replace(/:/g, '')}`;
  
  const animationTime = 600;
  const timeVariance = 300;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];

  const noise = (n: number = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLSpanElement) => {
    const d = particleDistances as [number, number];
    const r = 100;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const handleMouseEnter = () => {
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  return (
    <div 
      className={`gooey-button-wrapper ${className}`} 
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <defs>
          <filter id={buttonId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      <div className="gooey-button-content">
        {children}
      </div>
      <span 
        className="effect filter" 
        ref={filterRef} 
        style={{ filter: `url('#${buttonId}')` }}
      />
    </div>
  );
};

export default GooeyButton;
