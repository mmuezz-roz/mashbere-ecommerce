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
  isUnauthorized: boolean;
  adminUser: any | null;
}

const AdminContext = createContext<AdminContextValue>({
  sidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
  loading: true,
  isUnauthorized: false,
  adminUser: null,
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
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
          setIsUnauthorized(true);
          toast.error('ACCESS DENIED: Administrative Privileges Required', {
            id: 'admin-denied',
            duration: 5000,
          });
          router.replace('/');
          return;
        }

        setAdminUser(profile);
      } catch (err) {
        console.error('Admin check failed:', err);
        setIsUnauthorized(true);
        router.replace('/auth/login');
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
        isUnauthorized,
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
