import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types';

const fixPookeeText = (str: string | undefined | null) => {
  if (!str) return str;
  return str.replace(/Pookies/g, 'Pookees')
            .replace(/pookies/g, 'pookees')
            .replace(/POOKIES/g, 'POOKEES')
            .replace(/Pookie/g, 'Pookee')
            .replace(/pookie/g, 'pookee')
            .replace(/POOKIE/g, 'POOKEE');
};


const getPastelColor = (flavorName: string) => {
  if (!flavorName) return '#F5F5F5';
  const name = flavorName.toLowerCase();
  if (name.includes('mango')) return '#FFF8E1';
  if (name.includes('tender coconut')) return '#E7F3F3';
  if (name.includes('strawberry')) return '#F3E7F0';
  if (name.includes('pistachio')) return '#EAF3DA';
  if (name.includes('chocolate')) return '#F5E6DA';
  if (name.includes('papaya')) return '#FDF0E6';
  if (name.includes('avocado')) return '#F3F6E8';
  if (name.includes('custard apple')) return '#F6F8E8';
  if (name.includes('almond')) return '#F8EFE6';
  if (name.includes('pineapple')) return '#FFFDE7';
  if (name.includes('watermelon')) return '#FCE4EC';
  if (name.includes('guava')) return '#FCE4EC';
  if (name.includes('chikku')) return '#F3F0DA';
  return '#F5F5F5';
};


const getDarkColor = (flavorName: string) => {
  if (!flavorName) return '#708238';
  const name = flavorName.toLowerCase();
  if (name.includes('mango')) return '#F59E0B'; // Amber-500
  if (name.includes('tender coconut')) return '#475569'; // Slate-600
  if (name.includes('strawberry') || name.includes('ruby')) return '#E11D48'; // Rose-600
  if (name.includes('pistachio')) return '#65A30D'; // Lime-600
  if (name.includes('chocolate')) return '#451A03'; // Orange-950
  if (name.includes('papaya')) return '#EA580C'; // Orange-600
  if (name.includes('avocado')) return '#4D7C0F'; // Lime-700
  if (name.includes('custard apple')) return '#65A30D'; // Lime-600
  if (name.includes('almond')) return '#9A3412'; // Orange-800
  if (name.includes('pineapple') || name.includes('sugarcane')) return '#CA8A04'; // Yellow-600
  if (name.includes('watermelon')) return '#BE123C'; // Rose-700
  if (name.includes('guava')) return '#BE185D'; // Pink-700
  if (name.includes('grape')) return '#6B21A8'; // Purple-800
  if (name.includes('chikku')) return '#78350F'; // Amber-900
  if (name.includes('lychee')) return '#BE185D'; // Pink-700
  if (name.includes('passion')) return '#9333EA'; // Purple-600
  return '#708238';
};


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
    
    // Validate if the input is a UUID to avoid Postgres type mismatch errors
    const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(isUuid ? `id.eq.${id},slug.eq.${id}` : `slug.eq.${id}`)
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
        id, name, description, price, image, featured, slug, category,
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
        name: fixPookeeText(p.name) ?? '',
        subtitle: fixPookeeText(d?.subtitle) ?? '',
        label: fixPookeeText(d?.label) ?? '',
        image: d?.image_path ?? p.image,
        accentColor: d?.accent_color ?? '#F5F5F5',
        bgGradient: d?.bg_gradient ?? '',
        textColor: getDarkColor(p.name),
        desc: fixPookeeText(p.description) ?? '',
        longDesc: fixPookeeText(d?.long_desc ?? p.description),
        highlight: d?.highlight ?? '',
        ingredients: d?.ingredients ?? [],
        stats: d?.stats ?? [],
        tags: d?.tags ?? [],
        price: Number(p.price),
        featured: p.featured,
        category: p.category,
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
        id, name, description, price, image, featured, slug, category,
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
      name: fixPookeeText(data.name),
      subtitle: fixPookeeText(d?.subtitle) ?? '',
      label: fixPookeeText(d?.label) ?? '',
      image: d?.image_path ?? data.image,
      accentColor: d?.accent_color ?? '#F5F5F5',
      bgGradient: d?.bg_gradient ?? '',
      textColor: d?.text_color ?? '#111',
      desc: fixPookeeText(data.description),
      longDesc: fixPookeeText(d?.long_desc ?? data.description),
      highlight: d?.highlight ?? '',
      ingredients: d?.ingredients ?? [],
      stats: d?.stats ?? [],
      tags: d?.tags ?? [],
      price: Number(data.price),
      featured: data.featured,
      category: data.category,
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
        id, name, description, price, image, featured, slug, category,
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
        name: fixPookeeText(p.name),
        subtitle: fixPookeeText(d?.subtitle) ?? '',
        label: fixPookeeText(d?.label) ?? '',
        // `image` keeps the original Cloudinary/PNG — used by homepage BounceCards fan display
        image: p.image,
        // `cardImage` holds the new product photo — used by FlavorsGrid cards
        cardImage: d?.image_path ?? p.image,
        accentColor: d?.accent_color ?? '#F5F5F5',
        desc: fixPookeeText(p.description),
        longDesc: fixPookeeText(d?.long_desc ?? p.description),
        stats: d?.stats ?? [],
        price: Number(p.price),
        featured: p.featured,
        category: p.category,
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
        id, name, description, price, image, featured, slug, category,
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
      name: fixPookeeText(data.name),
      subtitle: fixPookeeText(d?.subtitle) ?? '',
      label: fixPookeeText(d?.label) ?? '',
      image: d?.image_path ?? data.image,
      accentColor: d?.accent_color ?? '#F5F5F5',
      desc: fixPookeeText(data.description),
      longDesc: fixPookeeText(d?.long_desc ?? data.description),
      stats: d?.stats ?? [],
      price: Number(data.price),
      featured: data.featured,
      category: data.category,
    };
  },

  /**
   * Fetches all pookees joined with their detail data
   */
  async getAllPookees(): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, price, image, featured, slug, category,
        product_details (
          subtitle, label, accent_color, bg_gradient, text_color,
          long_desc, highlight, ingredients, stats, tags, image_path
        )
      `)
      .eq('category', 'pookies')
      .order('name', { ascending: true });

    if (error) {
      console.error('[Server] Error fetching pookees:', error.message || error);
      return [];
    }

    return (data || []).map((p: any) => {
      const d = Array.isArray(p.product_details) ? p.product_details[0] : p.product_details;
      return {
        id: p.slug,
        name: fixPookeeText(p.name),
        subtitle: fixPookeeText(d?.subtitle) ?? '',
        label: fixPookeeText(d?.label) ?? '',
        image: d?.image_path ?? p.image,
        accentColor: getPastelColor(p.name),
        desc: fixPookeeText(p.description),
        longDesc: fixPookeeText(d?.long_desc ?? p.description),
        stats: d?.stats ?? [],
        price: Number(p.price),
        featured: p.featured,
        category: 'pookees',
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
        id, name, description, price, image, featured, slug, category,
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
        name: fixPookeeText(p.name),
        subtitle: fixPookeeText(d?.subtitle) ?? '',
        label: fixPookeeText(d?.label) ?? '',
        image: d?.image_path ?? p.image,
        accentColor: d?.accent_color ?? '#F5F5F5',
        desc: fixPookeeText(p.description),
        longDesc: fixPookeeText(d?.long_desc ?? p.description),
        stats: d?.stats ?? [],
        price: Number(p.price),
        featured: p.featured,
        category: p.category,
      };
    });
  },

  /**
   * Maps database record to TypeScript Product interface
   */
  mapToProduct(dbProduct: any): Product {
    return {
      id: dbProduct.id,
      name: fixPookeeText(dbProduct.name) ?? '',
      description: fixPookeeText(dbProduct.description) ?? '',
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

