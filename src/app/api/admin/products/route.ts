import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/lib/api-response';

/**
 * GET /api/admin/products
 * Fetch all products for the admin dashboard
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Admin API GET - Current User:', user?.email || 'NOT AUTHENTICATED');

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return ApiResponse.success({ products: data });
  } catch (error: any) {
    console.error('Admin Products Fetch Error:', error);
    return ApiResponse.error(error.message, 500);
  }
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Admin API POST - Current User:', user?.email || 'NOT AUTHENTICATED');

    const body = await req.json();
    
    // Ensure slug is present
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: body.name,
          description: body.description,
          price: body.price,
          category: body.category,
          image: body.image,
          featured: body.featured || false,
          slug: body.slug,
          stock: body.stock || 0,
          business_type: body.businessType || 'b2c',
          type: body.type,
          flavors: body.flavors || [],
          variants: body.variants || [],
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return ApiResponse.success(data, 'Product created successfully', 201);
  } catch (error: any) {
    console.error('Admin Product Create Error:', error);
    return ApiResponse.error(error.message, 400);
  }
}
