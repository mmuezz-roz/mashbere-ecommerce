'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  FileText, LogOut, X, ChevronRight, IceCream,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products',  href: '/admin/products',  icon: Package },
  { label: 'Orders',    href: '/admin/orders',    icon: ShoppingBag },
  { label: 'Quotes',    href: '/admin/quotes',    icon: FileText },
  { label: 'Users',     href: '/admin/users',     icon: Users },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-40 flex flex-col
          bg-[#1a1a1a] border-r border-white/5
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#708238] to-[#4a5a25] flex items-center justify-center shadow-lg">
              <IceCream size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-sm tracking-tight">Mashbere</p>
              <p className="text-white/30 text-xs font-medium">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                  transition-all duration-200
                  ${active
                    ? 'bg-[#708238]/20 text-[#a3c45a] border border-[#708238]/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <Icon size={18} className={active ? 'text-[#a3c45a]' : 'text-white/30 group-hover:text-white/60'} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} className="text-[#a3c45a]" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut size={18} />
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
