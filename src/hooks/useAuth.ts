'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

export function useAuth(): AuthState & { logout: () => Promise<void>; refresh: () => void } {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  const getSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setState({
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          role: session.user.user_metadata?.role || 'customer',
        },
        loading: false,
      });
    } else {
      setState({ user: null, loading: false });
    }
  }, []);

  useEffect(() => {
    // 1. Proactive URL Cleanup - Run this immediately on mount
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const paramsToRemove = ['code', 'access_token', 'refresh_token', 'error', 'error_description', 'error_code', 'type', 'recovery_token'];
      
      let hasParams = !!url.hash;
      paramsToRemove.forEach(p => {
        if (url.searchParams.has(p)) hasParams = true;
      });

      if (hasParams) {
        url.hash = '';
        paramsToRemove.forEach(p => url.searchParams.delete(p));
        window.history.replaceState({}, '', url.toString());
      }
    }

    // 2. Initial session check
    getSession();

    // 3. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setState({
          user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            role: session.user.user_metadata?.role || 'customer',
          },
          loading: false,
        });
      } else {
        setState({ user: null, loading: false });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [getSession]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setState({ user: null, loading: false });
  }, []);

  return { ...state, logout, refresh: getSession };
}
