import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { ApiResponse } from './api-response';
import { createClient } from '@supabase/supabase-js';

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

type AdminAuthResult =
  | { error: ReturnType<typeof ApiResponse.error>; user: null }
  | { error: null; user: AdminPayload };

/**
 * Admin-only guard.
 * Supports legacy JWT cookies AND modern Supabase sessions.
 */
export async function requireAdmin(req: NextRequest): Promise<AdminAuthResult> {
  // 1. Try legacy JWT cookie first
  const token = req.cookies.get('auth-token')?.value;
  if (token) {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret) {
      try {
        const decoded = jwt.verify(token, jwtSecret) as AdminPayload;
        if (decoded.role === 'admin') {
          return { error: null, user: decoded };
        }
      } catch {
        // Fall through to Supabase if legacy token fails
      }
    }
  }

  // 2. Try Supabase Auth
  // Note: For SSR we'd use @supabase/ssr, but we can verify via token if passed in header
  // Or check for Supabase's own auth cookie
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  // In Next.js middleware/API, Supabase Auth tokens are often handled via headers
  // or cookies like 'sb-gtihbzjndppypmdzsfla-auth-token'
  const authHeader = req.headers.get('Authorization');
  const sbCookie = req.cookies.get('sb-gtihbzjndppypmdzsfla-auth-token')?.value; 

  const access_token = authHeader?.split(' ')[1] || sbCookie;

  if (access_token) {
    const { data: { user }, error } = await supabase.auth.getUser(access_token);
    
    if (!error && user) {
      // Check role in profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') {
        return {
          error: null,
          user: {
            id: user.id,
            email: user.email!,
            name: profile.full_name || 'Admin',
            role: 'admin'
          }
        };
      }
    }
  }

  return { error: ApiResponse.error('Admin access required.', 403), user: null };
}
