'use client';

import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Menu, IceCream, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, openSidebar, closeSidebar, loading, isUnauthorized } = useAdmin();
  const router = useRouter();

  if (isUnauthorized) {
    return null; // Let the redirect handle it, show nothing to avoid flash
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#141A0B]">
        <div className="w-12 h-12 border-4 border-[#C4EB54] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={closeSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={openSidebar}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#708238] to-[#4a5a25] flex items-center justify-center">
              <IceCream size={14} className="text-white" />
            </div>
            <span className="font-black text-gray-900 text-sm">Admin Panel</span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
