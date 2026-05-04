'use client';

import React from 'react';
import { 
  User, 
  LogOut, 
  ChevronDown,
  LayoutDashboard,
  ShoppingBag
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Link 
        href="/auth/login" 
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#708238] shadow-lg hover:scale-110 active:scale-95 transition-all text-sm font-bold"
      >
        <User className="w-5 h-5" />
      </Link>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
    : user.email?.[0].toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 pr-1.5 sm:pr-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all outline-none group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#708238] font-black text-xs shadow-inner">
            {initials}
          </div>
          <span className="hidden sm:block text-xs font-bold text-white max-w-[80px] truncate">
            {user.name || 'Account'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-white/50 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-[200] min-w-[200px] bg-[#1a2110]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        >
          <div className="px-3 py-3 border-b border-white/5 mb-1">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-0.5">Account</p>
            <p className="text-sm font-bold text-white truncate">{user.email}</p>
          </div>

          <DropdownMenu.Item asChild>
            <Link 
              href="/profile"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors outline-none cursor-pointer"
            >
              <User size={16} />
              <span className="text-xs font-bold">My Profile</span>
            </Link>
          </DropdownMenu.Item>

          {/* <DropdownMenu.Item asChild>
            <Link 
              href="/cart"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors outline-none cursor-pointer sm:hidden"
            >
              <ShoppingBag size={16} />
              <span className="text-xs font-bold">My Cart</span>
            </Link>
          </DropdownMenu.Item> */}

          {user.role === 'admin' && (
            <DropdownMenu.Item asChild>
              <Link 
                href="/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-[#C4EB54] transition-colors outline-none cursor-pointer"
              >
                <LayoutDashboard size={16} />
                <span className="text-xs font-bold font-display uppercase">Admin Portal</span>
              </Link>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator className="h-px bg-white/5 my-1" />

          <DropdownMenu.Item 
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors outline-none cursor-pointer font-semibold"
          >
            <LogOut size={16} />
            <span className="text-xs font-bold">Sign Out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
