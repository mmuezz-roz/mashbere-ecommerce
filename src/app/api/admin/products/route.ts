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

    // Get query params for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Map fields to match frontend expectations (_id and businessType)
    const products = data?.map(p => ({
      ...p,
      _id: p.id,
      businessType: p.business_type
    }));

    return ApiResponse.success({ 
      products,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    });
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

    const formattedProduct = {
      ...data,
      _id: data.id,
      businessType: data.business_type
    };

    return ApiResponse.success(formattedProduct, 'Product created successfully', 201);
  } catch (error: any) {
    console.error('Admin Product Create Error:', error);
    return ApiResponse.error(error.message, 400);
  }
}
