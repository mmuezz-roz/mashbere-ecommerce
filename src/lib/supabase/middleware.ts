import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // getUser(). A simple mistake can make it very hard to debug
  // issues with sessions being lost.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect Admin Routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      // Check if user has admin role in profiles
      // We use a shorter timeout or skip if possible during build
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError || profile?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (e) {
      // If DB check fails during build/edge, don't crash, just redirect to safe zone
      console.error('Middleware Admin Check Error:', e);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return supabaseResponse;
}
