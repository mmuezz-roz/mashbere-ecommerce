'use client';

import { Bell } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

interface Props {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: Props) {
  const { openSidebar, adminUser } = useAdmin();

  const userInitial = adminUser?.full_name?.charAt(0).toUpperCase() || 'A';

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="flex items-center gap-4">
        {/* Hamburger — desktop only (mobile has one in layout) */}
        <button
          onClick={openSidebar}
          className="hidden lg:flex p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400"
          aria-label="Toggle navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
          </svg>
        </button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-black text-gray-900 truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-gray-400 font-medium truncate mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#708238] rounded-full border-2 border-white" />
          </button>
          
          <div className="flex items-center gap-3 ml-2 border-l border-gray-100 pl-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter leading-none mb-1">Administrator</span>
              <span className="text-xs font-bold text-gray-700 leading-none">{adminUser?.full_name || 'Admin'}</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#708238] to-[#4a5a25] flex items-center justify-center text-white font-black text-sm shadow-sm select-none">
              {userInitial}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
