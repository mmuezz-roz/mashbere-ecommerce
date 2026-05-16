'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, Sparkles, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FOOTER_LINKS = {
  Explore: [
    { name: 'About Us', href: '/about' },
    { name: 'All Products', href: '/products' },
    { name: 'Ice Cream', href: '/products?category=ice-cream' },
    { name: 'Popsicles', href: '/products?category=popsicle' },
    { name: 'Commercial Equipment', href: '/equipment' },
  ],
  Support: [
    { name: 'Shipping & Returns', href: '#' },
    { name: 'Track Order', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
  Contact: [
    { icon: MapPin, text: 'Jamees Food and Beverage Trading LLC - Dubai, UAE' },
    { icon: Phone, text: '+971 502994974' },
    { icon: Mail, text: 'info@Jameesfood.com' },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[#141A0B] pt-14 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 relative overflow-hidden text-white">
      {/* Background Decorative Glow (Pistachio) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C4EB54]/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-20 w-64">
                <Image
                  src="/photos/mashbere_logo_no_bg.png"
                  alt="Mashbere Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md">
              Crafting premium artisanal frozen delights with the finest natural ingredients. 
              Delivering moments of pure joy across the UAE.
            </p>

            <div className="pt-2 pb-4">
              <Link
                href="/equipment"
                className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Partner with Us
              </Link>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">Join the Dream</h4>
              <div className="flex flex-col sm:flex-row p-1.5 bg-white/5 backdrop-blur-md rounded-[20px] border border-white/10 focus-within:border-[#C4EB54]/50 transition-all max-w-sm sm:max-w-md gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent flex-1 px-4 sm:px-5 py-2.5 sm:py-3 outline-none text-sm font-medium text-white placeholder:text-gray-500 rounded-[14px] sm:rounded-none"
                />
                <button 
                  aria-label="Subscribe to newsletter"
                  className="bg-[#C4EB54] text-[#141A0B] px-6 sm:px-8 py-2.5 sm:py-3 rounded-[14px] sm:rounded-[16px] font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/50 mb-8">Explore</h3>
              <ul className="space-y-4">
                {FOOTER_LINKS.Explore.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-[#C4EB54] font-medium transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/50 mb-8">Support</h3>
              <ul className="space-y-4">
                {FOOTER_LINKS.Support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-[#C4EB54] font-medium transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/50 mb-8">Contact</h3>
              <ul className="space-y-6">
                {FOOTER_LINKS.Contact.map((item) => (
                  <li key={item.text} className="flex gap-4">
                    <item.icon className="w-6 h-6 text-[#C4EB54] flex-shrink-0" />
                    <span className="text-gray-400 font-medium text-sm leading-snug">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Manufactured by</h4>
                  <p className="text-xs text-gray-400 font-medium">Jamees Food and Beverages Manufacturing LLC</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Marketed by</h4>
                  <p className="text-xs text-gray-400 font-medium">Jamees Food and Beverage Trading LLC</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400">
          <div className="flex gap-4 order-2 md:order-1">
            <Link 
              href="https://www.instagram.com/mashbere.ae?igsh=cTZtdmh5YXQ1dWc2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Mashbere on Instagram"
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#C4EB54]/10 hover:text-[#C4EB54] transition-all"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link 
              href="https://www.facebook.com/share/1JTDeNX7H1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Mashbere on Facebook"
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#C4EB54]/10 hover:text-[#C4EB54] transition-all"
            >
              <Facebook className="w-5 h-5" />
            </Link>
          </div>

          <div className="text-center md:text-right space-y-2 order-1 md:order-2">
            <p className="text-sm font-bold text-white italic">© 2026 Mashbere Premium Frozen Treats.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Link href="/admin" className="hover:text-[#C4EB54]">Admin Portal</Link>
              <div className="flex items-center gap-2">
                <span>Product Of UAE</span>
                <span className="text-[12px] font-sans">صُنع في الإمارات العربية المتحدة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
