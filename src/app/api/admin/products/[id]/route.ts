import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/lib/api-response';

/**
 * GET /api/admin/products/[id]
 * Fetches a single product for editing
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    // Map fields to match frontend expectations
    const product = {
      ...data,
      _id: data.id,
      businessType: data.business_type
    };

    return ApiResponse.success(product);
  } catch (error: any) {
    console.error('Admin Product Fetch Error:', error);
    return ApiResponse.error(error.message, 404);
  }
}

/**
 * PUT /api/admin/products/[id]
 * Maps to PATCH for compatibility
 */
export const PUT = PATCH;

/**
 * PATCH /api/admin/products/[id]
 * Updates an existing product
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { id } = await params;

    if (!id || id === 'undefined' || id === 'null') {
      return ApiResponse.error('Invalid Product ID', 400);
    }

    const { data, error } = await supabase
      .from('products')
      .update({
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        image: body.image,
        featured: body.featured,
        slug: body.slug,
        stock: body.stock,
        business_type: body.businessType,
        type: body.type,
        flavors: body.flavors,
        variants: body.variants,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    const formattedProduct = {
      ...data,
      _id: data.id,
      businessType: data.business_type
    };

    return ApiResponse.success(formattedProduct, 'Product updated successfully');
  } catch (error: any) {
    console.error('Admin Product Update Error:', error);
    return ApiResponse.error(error.message, 400);
  }
}

/**
 * DELETE /api/admin/products/[id]
 * Deletes a product
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    if (!id || id === 'undefined' || id === 'null') {
      return ApiResponse.error('Invalid Product ID', 400);
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return ApiResponse.success(null, 'Product deleted successfully');
  } catch (error: any) {
    console.error('Admin Product Delete Error:', error);
    return ApiResponse.error(error.message, 400);
  }
}
