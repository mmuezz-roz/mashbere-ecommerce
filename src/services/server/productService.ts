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
   * Fetches all popsicles joined with their detail data
   */
  async getAllPopsicles(): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, price, image, featured, slug,
        product_details (
          subtitle, label, accent_color, bg_gradient, text_color,
          long_desc, highlight, ingredients, stats, tags, image_path
        )
      `)
      .eq('category', 'popsicle')
      .order('name', { ascending: true });

    if (error) {
      console.error('[Server] Error fetching popsicles:', error.message || error);
      return [];
    }

    return (data || []).map((p: any) => {
      const d = Array.isArray(p.product_details) ? p.product_details[0] : p.product_details;
      return {
        id: p.slug,
        name: p.name,
        subtitle: d?.subtitle ?? '',
        label: d?.label ?? '',
        image: d?.image_path ?? p.image,
        accentColor: d?.accent_color ?? '#F5F5F5',
        bgGradient: d?.bg_gradient ?? '',
        textColor: d?.text_color ?? '#111',
        desc: p.description,
        longDesc: d?.long_desc ?? p.description,
        highlight: d?.highlight ?? '',
        ingredients: d?.ingredients ?? [],
        stats: d?.stats ?? [],
        tags: d?.tags ?? [],
        price: Number(p.price),
        featured: p.featured,
      };
    });
  },

  /**
   * Fetches a single popsicle with full detail by slug
   */
  async getPopsicleDetail(slug: string): Promise<any | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, price, image, featured, slug,
        product_details (
          subtitle, label, accent_color, bg_gradient, text_color,
          long_desc, highlight, ingredients, stats, tags, image_path
        )
      `)
      .eq('category', 'popsicle')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error('[Server] Error fetching popsicle detail:', error.message || error);
      }
      return null;
    }

    if (!data) return null;
    const d = Array.isArray(data.product_details) ? data.product_details[0] : data.product_details;

    return {
      id: data.slug,
      name: data.name,
      subtitle: d?.subtitle ?? '',
      label: d?.label ?? '',
      image: d?.image_path ?? data.image,
      accentColor: d?.accent_color ?? '#F5F5F5',
      bgGradient: d?.bg_gradient ?? '',
      textColor: d?.text_color ?? '#111',
      desc: data.description,
      longDesc: d?.long_desc ?? data.description,
      highlight: d?.highlight ?? '',
      ingredients: d?.ingredients ?? [],
      stats: d?.stats ?? [],
      tags: d?.tags ?? [],
      price: Number(data.price),
      featured: data.featured,
    };
  },

  /**
   * Fetches all sipups joined with their detail data
   */
  async getAllSipups(): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, price, image, featured, slug,
        product_details (
          subtitle, label, accent_color, bg_gradient, text_color,
          long_desc, highlight, ingredients, stats, tags, image_path
        )
      `)
      .eq('category', 'sip-up')
      .order('name', { ascending: true });

    if (error) {
      console.error('[Server] Error fetching sipups:', error.message || error);
      return [];
    }

    return (data || []).map((p: any) => {
      const d = Array.isArray(p.product_details) ? p.product_details[0] : p.product_details;
      return {
        id: p.slug,
        name: p.name,
        subtitle: d?.subtitle ?? '',
        label: d?.label ?? '',
        image: d?.image_path ?? p.image,
        accentColor: d?.accent_color ?? '#F5F5F5',
        desc: p.description,
        longDesc: d?.long_desc ?? p.description,
        stats: d?.stats ?? [],
        price: Number(p.price),
        featured: p.featured,
      };
    });
  },

  /**
   * Fetches a single sipup with full detail by slug
   */
  async getSipupDetail(slug: string): Promise<any | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, price, image, featured, slug,
        product_details (
          subtitle, label, accent_color, bg_gradient, text_color,
          long_desc, highlight, ingredients, stats, tags, image_path
        )
      `)
      .eq('category', 'sip-up')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error('[Server] Error fetching sipup detail:', error.message || error);
      }
      return null;
    }

    if (!data) return null;
    const d = Array.isArray(data.product_details) ? data.product_details[0] : data.product_details;

    return {
      id: data.slug,
      name: data.name,
      subtitle: d?.subtitle ?? '',
      label: d?.label ?? '',
      image: d?.image_path ?? data.image,
      accentColor: d?.accent_color ?? '#F5F5F5',
      desc: data.description,
      longDesc: d?.long_desc ?? data.description,
      stats: d?.stats ?? [],
      price: Number(data.price),
      featured: data.featured,
    };
  },

  /**
   * Fetches all pookies joined with their detail data
   */
  async getAllPookies(): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, price, image, featured, slug,
        product_details (
          subtitle, label, accent_color, bg_gradient, text_color,
          long_desc, highlight, ingredients, stats, tags, image_path
        )
      `)
      .eq('category', 'pookies')
      .order('name', { ascending: true });

    if (error) {
      console.error('[Server] Error fetching pookies:', error.message || error);
      return [];
    }

    return (data || []).map((p: any) => {
      const d = Array.isArray(p.product_details) ? p.product_details[0] : p.product_details;
      return {
        id: p.slug,
        name: p.name,
        subtitle: d?.subtitle ?? '',
        label: d?.label ?? '',
        image: d?.image_path ?? p.image,
        accentColor: d?.accent_color ?? '#F5F5F5',
        desc: p.description,
        longDesc: d?.long_desc ?? p.description,
        stats: d?.stats ?? [],
        price: Number(p.price),
        featured: p.featured,
      };
    });
  },

  /**
   * Fetches all equipment joined with their detail data
   */
  async getAllEquipment(): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, price, image, featured, slug,
        product_details (
          subtitle, label, accent_color, bg_gradient, text_color,
          long_desc, highlight, ingredients, stats, tags, image_path
        )
      `)
      .eq('category', 'equipment')
      .order('name', { ascending: true });

    if (error) {
      console.error('[Server] Error fetching equipment:', error.message || error);
      return [];
    }

    return (data || []).map((p: any) => {
      const d = Array.isArray(p.product_details) ? p.product_details[0] : p.product_details;
      return {
        id: p.slug,
        name: p.name,
        subtitle: d?.subtitle ?? '',
        label: d?.label ?? '',
        image: d?.image_path ?? p.image,
        accentColor: d?.accent_color ?? '#F5F5F5',
        desc: p.description,
        longDesc: d?.long_desc ?? p.description,
        stats: d?.stats ?? [],
        price: Number(p.price),
        featured: p.featured,
      };
    });
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

