'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Account', href: '/auth/login', icon: User }, // Or /profile if logged in
  { name: 'Cart', href: '/cart', icon: ShoppingBag },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md lg:hidden">
      <div className="bg-[#1E2710]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] px-8 py-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.name === 'Account' ? '/auth/login' : item.href}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`relative p-2 rounded-2xl transition-all duration-300 ${
                isActive ? 'text-[#C4EB54]' : 'text-white/40 group-hover:text-white'
              }`}>
                <Icon className="w-6 h-6" />
                {item.name === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C4EB54] text-[#141A0B] text-[10px] font-black flex items-center justify-center rounded-full border-2 border-[#1E2710]">
                    {cartCount}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/5 rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'text-[#C4EB54]' : 'text-white/20'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
