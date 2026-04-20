'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Account', href: '/auth/login', icon: User },
  { name: 'Cart', href: '/cart', icon: ShoppingBag },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden h-[var(--bottom-nav-height)] bg-[#0d1108]/95 backdrop-blur-xl border-t border-white/5">
      <div className="h-full max-w-md mx-auto px-6 flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.name === 'Account' ? '/auth/login' : item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full transition-colors group"
            >
              <div className={`relative flex flex-col items-center gap-0.5 ${
                isActive ? 'text-[#8ba145]' : 'text-foreground/40'
              }`}>
                <Icon className={`transition-transform duration-200 ${isActive ? 'w-5 h-5 scale-110' : 'w-5 h-5 group-hover:scale-105'}`} strokeWidth={isActive ? 2.5 : 2} />
                
                {item.name === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#8ba145] text-[#0d1108] text-[9px] font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
                
                <span className={`text-[9px] font-medium uppercase tracking-tighter ${
                  isActive ? 'opacity-100' : 'opacity-60'
                }`}>
                  {item.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-[#8ba145] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
