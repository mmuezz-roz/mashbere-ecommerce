'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShare } from '@/hooks/useShare';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  name: string;
  description?: string;
  slug: string;
  className?: string;
}

/**
 * A premium, glassmorphic Share Button component.
 */
export const ShareButton: React.FC<ShareButtonProps> = ({ 
  name, 
  description, 
  slug, 
  className 
}) => {
  const { share } = useShare();

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Construct the full URL
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/products/${slug}`;

    share({
      title: `${name} | Mashbere`,
      text: `Try this from Mashbere 🍧: ${name}`,
      url: url,
    });
  };

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
        "bg-white/30 backdrop-blur-md border border-white/40 shadow-lg shadow-black/5",
        "hover:bg-white/50 hover:border-white/60",
        className
      )}
      aria-label={`Share ${name}`}
    >
      <Share2 className="w-5 h-5 text-gray-900/80" />
      
      {/* Subtle outer glow effect */}
      <span className="absolute inset-0 rounded-full bg-white/20 blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};
