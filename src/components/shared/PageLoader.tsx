'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';

export const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#141A0B] text-white"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-80 h-40 sm:w-[500px] sm:h-[250px] mb-2"
            >
              <Image
                src="/photos/mashbere_logo_no_bg.webp"
                alt="Mashbere Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </motion.div>
            
            <div className="flex flex-col items-center space-y-6">
              <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute top-0 bottom-0 w-[40%] bg-[#C4EB54] shadow-[0_0_20px_#C4EB54]"
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[#C4EB54]/60 font-black uppercase tracking-[0.4em] text-xs text-center"
              >
                Exquisite Flavors Await
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
