import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types';

/**
 * ProductService
 * Handles all server-side product data fetching from Supabase.
 * Uses createServerClient to work correctly in Server Components & API routes.
 */
export const ProductService = {
  /**
   * Fetches all products
   */
  async getAllProducts(): Promise<Product[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Server] Error fetching products:', error.message || error);
      return [];
    }

    return (data || []).map(this.mapToProduct);
  },

  /**
   * Fetches featured products for the homepage
   */
  async getFeaturedProducts(): Promise<Product[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(8);

    if (error) {
      console.error('[Server] Error fetching featured products:', error.message || error);
      return [];
    }

    return (data || []).map(this.mapToProduct);
  },

  /**
   * Fetches a single product by ID or slug
   */
  async getProductById(id: string): Promise<Product | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('[Server] Error fetching product by ID:', error.message || error);
      }
      return null;
    }

    return data ? this.mapToProduct(data) : null;
  },

  /**
   * Fetches products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Server] Error fetching products by category:', error.message || error);
      return [];
    }

    return (data || []).map(this.mapToProduct);
  },

  /**
   * Fetches related products (same category)
   */
  async getRelatedProducts(id: string): Promise<Product[]> {
    // First get the target product's category
    const product = await this.getProductById(id);
    if (!product) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', product.category)
      .neq('id', product.id)
      .limit(4);

    if (error) {
      console.error('[Server] Error fetching related products:', error.message || error);
      return [];
    }

    return (data || []).map(this.mapToProduct);
  },

  /**
   * Maps database record to TypeScript Product interface
   */
  mapToProduct(dbProduct: any): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      description: dbProduct.description,
      price: Number(dbProduct.price),
      category: dbProduct.category,
      image: dbProduct.image,
      featured: dbProduct.featured,
      flavors: dbProduct.flavors,
      variants: dbProduct.variants,
      type: dbProduct.type,
      businessType: dbProduct.business_type,
      stock: dbProduct.stock,
      slug: dbProduct.slug,
      createdAt: dbProduct.created_at,
      updatedAt: dbProduct.updated_at,
    };
  }
};
