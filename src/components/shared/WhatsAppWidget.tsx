'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * WhatsAppWidget Component
 * A floating, interactive WhatsApp button that appears after scrolling past the first section.
 * Includes a friendly message box.
 */
export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        if (!isVisible) setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowTooltip(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && !isDismissed) {
      // Delay the message box by 3 seconds after the logo appears
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
        // Auto-hide after 5 more seconds
        const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
        return () => clearTimeout(hideTimer);
      }, 3000);
      
      return () => clearTimeout(showTimer);
    }
  }, [isVisible, isDismissed]);

  const whatsappNumber = "971502994974";
  const message = "Hi Mashbere! I need some help with...";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div 
      className="fixed bottom-20 lg:bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none"
      onMouseEnter={() => !isDismissed && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30 }}
            className="pointer-events-auto relative"
          >
            {/* Message Box / Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8, y: 10 }}
                  className="absolute bottom-[calc(100%+16px)] right-0 w-[360px] bg-white rounded-[24px] p-7 pl-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden"
                >
                  {/* Close Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowTooltip(false);
                      setIsDismissed(true);
                    }}
                    className="absolute top-3 right-3 text-gray-300 hover:text-rose-500 transition-colors p-1"
                    aria-label="Close message"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>

                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <Image 
                      src="/photos/joyfull popsicles.webp"
                      alt="Popsicles"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative z-10 flex items-start gap-3">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-black text-gray-900 uppercase tracking-wider">
                          Let's Chat
                        </span>
                        <motion.span
                          animate={{ rotate: [0, 15, -5, 15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-lg"
                        >
                          🍦
                        </motion.span>
                      </div>
                      <p className="text-[12px] font-medium text-gray-700 leading-tight">
                        Our flavor experts are <br />
                        online and ready to help.
                      </p>
                      <div className="pt-1">
                        <span className="text-[11px] font-black uppercase tracking-widest text-[#075E54] bg-[#25D366]/10 px-2 py-0.5 rounded-full">
                          Open WhatsApp
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Triangle tail */}
                  <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full hover:bg-[#128C7E] transition-all duration-300 shadow-2xl"
              aria-label="Chat on WhatsApp"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-7 h-7 sm:w-9 sm:h-9 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
