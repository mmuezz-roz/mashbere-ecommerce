'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, X, Home, LayoutGrid, Building2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { UserMenu } from '@/components/auth/UserMenu';
import { ArrowLeft } from 'lucide-react';
import GooeyNav from '@/components/ui/GooeyNav';

export default function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile search trigger from URL
  useEffect(() => {
    if (searchParams.get('search') === 'true') {
      setIsMobileSearchOpen(true);
      // Clean up the URL after opening
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('search');
      const queryString = newParams.toString();
      const newUrl = pathname + (queryString ? `?${queryString}` : '');
      window.history.replaceState(null, '', newUrl);
    }
  }, [searchParams, pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header 
        className={`fixed left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl transition-all duration-500 ease-in-out ${
          isHidden 
            ? 'top-0 -translate-y-[150%] opacity-0 pointer-events-none' 
            : 'top-3 sm:top-6 translate-y-0 opacity-100 pointer-events-auto'
        }`}
      >
        <div className={`backdrop-blur-xl rounded-[32px] sm:rounded-[40px] px-2 sm:px-8 py-1 sm:py-3 flex items-center justify-between border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 ${
          isScrolled ? 'bg-[#1E2710]/95' : 'bg-[#708238]/80'
        }`}>
          
          <AnimatePresence mode="wait">
            {!isMobileSearchOpen ? (
              <motion.div 
                key="header-content"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="w-full flex items-center justify-between relative"
              >
                {/* DESKTOP: Navigation Links (Left) */}
                <nav className="hidden lg:flex items-center">
                  <GooeyNav
                    items={[
                      { label: 'Home', href: '/' },
                      { label: 'Products', href: '/products' },
                      { label: 'For Business', href: '/equipment' },
                    ]}
                    initialActiveIndex={
                      pathname === '/' 
                        ? 0 
                        : pathname.startsWith('/equipment')
                          ? 2
                          : pathname.startsWith('/products')
                            ? 1
                            : 0
                    }
                  />
                </nav>

                {/* LOGO & BACK: Left on Mobile, Center on Desktop */}
                <div className="flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 gap-2 sm:gap-4">
                  {/* MOBILE BACK BUTTON (Visible only on mobile, and not on home page) */}
                  {pathname !== '/' && (
                    <button 
                      onClick={() => router.back()}
                      className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="Go back"
                    >
                      <ArrowLeft size={16} />
                    </button>
                  )}

                  <Link href="/" className="group flex items-center">
                    <div className="relative w-32 sm:w-44 lg:w-80 h-16 sm:h-20 lg:h-32 transition-all group-hover:scale-105">
                      {/* English Logo (Default) */}
                      <Image
                        src="/photos/mashbere_logo_no_bg.png"
                        alt="Mashbere Logo"
                        fill
                        className="object-contain brightness-0 invert transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                        priority
                      />
                      {/* Arabic Logo (Hover) */}
                      <Image
                        src="/photos/1777758274783-6846d2ef-8359-49ac-9256-60655e81b0d0_4.png"
                        alt="Mashbere Arabic Logo"
                        fill
                        className="object-contain brightness-0 invert opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                        priority
                      />
                    </div>
                  </Link>
                </div>

                {/* ACTIONS (Right) */}
                <div className="flex items-center gap-2">
                  {/* Mobile Menu Trigger */}
                  <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>

                  <div className="hidden lg:flex items-center gap-3">
                    <button 
                      onClick={() => setIsSearchOpen(true)}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shadow-lg hover:bg-white hover:text-[#708238] transition-all"
                    >
                      <Search className="w-5 h-5" />
                    </button>

                    <UserMenu />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* MOBILE EXPANDED SEARCH */
              <motion.div 
                key="mobile-search"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex items-center gap-4"
              >
                <form onSubmit={handleSearch} className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C4EB54]" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search our premium collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full py-3.5 pl-12 pr-6 text-sm text-white placeholder:text-white/30 focus:bg-white/20 focus:border-[#C4EB54]/50 outline-none transition-all shadow-inner"
                  />
                </form>
                <button 
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-[#C4EB54] transition-colors"
                >
                  <span className="text-xl font-light">✕</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Modern Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#141A0B]/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors p-4"
            >
              <span className="text-sm font-black uppercase tracking-widest text-[#C4EB54]">Close (Esc)</span>
            </button>

            <form onSubmit={handleSearch} className="w-full max-w-4xl space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[#C4EB54] uppercase tracking-[0.5em] block">
                  What are you craving?
                </label>
                <div className="relative border-b-2 border-white/10 focus-within:border-[#C4EB54] transition-colors pb-4 flex items-center gap-6">
                  <Search className="w-10 h-10 text-white/20" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search flavors, equipment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-white text-4xl sm:text-6xl font-display uppercase outline-none placeholder:text-white/10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                {['Pistachio', 'Vanilla', 'Commercial Mixer', 'Popsicles'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="text-[10px] font-black text-white/40 hover:text-[#C4EB54] uppercase tracking-widest border border-white/5 px-4 py-2 rounded-full transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[300] bg-[#141A0B] lg:hidden flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-2 py-1 border-b border-white/5">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="group flex items-center">
                <div className="relative w-32 h-16">
                  <Image
                    src="/photos/mashbere_logo_no_bg.png"
                    alt="Mashbere Logo"
                    fill
                    className="object-contain brightness-0 invert"
                    priority
                  />
                </div>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white mr-4"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="space-y-1">
                {[
                  { label: 'Home', href: '/', icon: Home },
                  { label: 'Products', href: '/products', icon: LayoutGrid },
                  { label: 'For Business', href: '/equipment', icon: Building2 },
                  { label: 'Account', href: user ? '/profile' : '/auth/login', icon: User },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 py-4 px-2 text-2xl font-display uppercase tracking-wider text-white hover:text-[#C4EB54] transition-colors border-b border-white/5"
                  >
                    <item.icon className="w-6 h-6 text-[#C4EB54]" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="p-8 bg-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">
                Premium Ice Cream & Equipment
              </p>
              <div className="flex justify-between items-end">
                <span className="text-[#C4EB54] text-xs font-bold">© 2026 Mashbere</span>
                <div className="flex gap-4">
                  {/* Social links could go here */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
