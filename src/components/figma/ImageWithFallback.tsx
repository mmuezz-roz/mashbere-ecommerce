'use client';

import React, { useState } from 'react';
import { optimizeCloudinaryUrl } from '@/lib/imageOptimizer';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  fallback = 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=800&auto=format&fit=crop&q=60',
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const finalSrc = error ? fallback : optimizeCloudinaryUrl(src as string);

  return (
    <img
      src={finalSrc}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
