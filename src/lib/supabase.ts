/**
 * Browser Supabase client — singleton re-exported from the unified lib.
 * Kept for backward compatibility with files that import `{ supabase }`.
 */
import { createClient } from '@/lib/supabase/client';

export const supabase = createClient();
