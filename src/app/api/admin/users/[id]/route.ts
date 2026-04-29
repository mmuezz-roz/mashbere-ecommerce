import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/lib/api-response';

/**
 * PATCH /api/admin/users/[id]
 * Updates a user's role
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { id } = await params;

    if (!body.role) {
      return ApiResponse.error('Role is required', 400);
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ role: body.role })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return ApiResponse.success(data, 'User role updated successfully');
  } catch (error: any) {
    console.error('Admin User Update Error:', error);
    return ApiResponse.error(error.message, 500);
  }
}
