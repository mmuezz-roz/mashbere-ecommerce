'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.0,           // Slightly snappier feel (was 1.2)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,    // Less aggressive (was 1)
        touchMultiplier: 1.5,    // Reduced from 2 - prevents touch jitter
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
