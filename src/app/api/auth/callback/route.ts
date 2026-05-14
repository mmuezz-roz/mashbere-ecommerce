import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');
  // Allow a `next` query param to override the post-login destination
  const next = searchParams.get('next') ?? '/equipment';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successful login — redirect to the intended destination
      return NextResponse.redirect(`${origin}${next}`);
    }

    // Exchange failed — send back to login with an error flag
    return NextResponse.redirect(`${origin}/auth/login?error=auth`);
  }

  // No code present — likely a direct hit, redirect to login
  return NextResponse.redirect(`${origin}/auth/login`);
}
