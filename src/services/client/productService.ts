import { Product, Category } from '@/types';

/**
 * ProductService (Client)
 *
 * Handles API calls to the Next.js API routes.
 * Use this service in Client Components.
 */
export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const result = await response.json();
    return result.data;
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    // For simplicity, we fetch all and find. 
    // In a real app, you'd have an API endpoint like /api/products/[slug]
    const products = await this.getAllProducts();
    return products.find(p => p.slug === slug) ?? null;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const products = await this.getAllProducts();
    return products.find(p => p.id === id) ?? null;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(p => p.featured);
  }

  static async getProductsByCategory(category: Category): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(p => p.category === category);
  }
}
