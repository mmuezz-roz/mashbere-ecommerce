import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/lib/api-response';

/**
 * GET /api/admin/users
 * Lists all users with pagination, search, and role filtering
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Admin Users GET - Current User:', user?.email || 'NOT AUTHENTICATED');

    const { searchParams } = new URL(req.url);
    console.log('Search Params:', searchParams.toString());
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const role = searchParams.get('role');
    
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' });

    if (role) {
      query = query.eq('role', role);
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) throw error;

    // Map database fields to the format the frontend expects
    const users = (data || []).map(profile => ({
      _id: profile.id,
      name: profile.full_name || 'Anonymous',
      email: profile.email,
      role: profile.role || 'customer',
      image: profile.avatar_url, // Added avatar support
      companyName: profile.company_name,
      createdAt: profile.created_at
    }));

    return ApiResponse.success({
      users,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    });
  } catch (error: any) {
    console.error('Admin Users Fetch Error:', error);
    return ApiResponse.error(error.message, 500);
  }
}
