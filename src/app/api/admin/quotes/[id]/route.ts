import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    
    // Check admin auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { status } = await req.json();
    if (!status) return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });

    const { error } = await supabase
      .from('quotes')
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error updating quote status:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
