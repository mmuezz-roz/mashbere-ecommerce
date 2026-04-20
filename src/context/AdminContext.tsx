'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AdminContextValue {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  loading: boolean;
  adminUser: any | null;
}

const AdminContext = createContext<AdminContextValue>({
  sidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
  loading: true,
  adminUser: null,
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/auth/login');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error || profile?.role !== 'admin') {
          toast.error('Unauthorized access');
          router.push('/');
          return;
        }

        setAdminUser(profile);
      } catch (err) {
        console.error('Admin check failed:', err);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();
  }, [router]);

  return (
    <AdminContext.Provider
      value={{
        sidebarOpen,
        openSidebar: () => setSidebarOpen(true),
        closeSidebar: () => setSidebarOpen(false),
        loading,
        adminUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
