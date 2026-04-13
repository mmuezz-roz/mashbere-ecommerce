/**
 * Admin Product Controller
 * Handles admin CRUD for products. Reuses AdminProductService.
 * Does NOT touch or duplicate the existing ProductController.
 */
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AdminProductService } from '@/services/admin/admin.product.service';
import { ApiResponse, ApiError } from '@/lib/api-response';

const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().nonnegative('Price must be >= 0').optional().default(0),
  category: z.enum(['ice-cream', 'popsicle', 'equipment', 'sip-up']),
  businessType: z.enum(['b2c', 'b2b']).default('b2c'),
  image: z.string().min(1, 'Image URL is required'),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  isQuoteRequired: z.boolean().optional().default(false),
  flavors: z.array(z.string()).optional(),
  variants: z.array(z.string()).optional(),
  type: z.string().optional(),
  stock: z.number().int().nonnegative().default(0),
  slug: z.string().min(1, 'Slug is required'),
});

const updateProductSchema = createProductSchema.partial();

export class AdminProductController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const filters = {
        category: searchParams.get('category') ?? undefined,
        businessType: searchParams.get('businessType') ?? undefined,
        search: searchParams.get('search') ?? undefined,
        page: Number(searchParams.get('page') ?? 1),
        limit: Number(searchParams.get('limit') ?? 20),
      };
      const result = await AdminProductService.getAllProducts(filters);
      return ApiResponse.success(result);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to fetch products';
      return ApiResponse.error(msg, 500);
    }
  }

  static async create(req: NextRequest) {
    try {
      const body = await req.json();
      const validated = createProductSchema.parse(body);
      const product = await AdminProductService.createProduct(validated);
      return ApiResponse.success(product, 'Product created successfully', 201);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Validation failed', 400, error.errors);
      }
      const msg = error instanceof Error ? error.message : 'Failed to create product';
      return ApiResponse.error(msg, 500);
    }
  }

  static async getOne(id: string) {
    try {
      const product = await AdminProductService.getProductById(id);
      if (!product) throw new ApiError('Product not found', 404);
      return ApiResponse.success(product);
    } catch (error: unknown) {
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to fetch product';
      return ApiResponse.error(msg, 500);
    }
  }

  static async update(id: string, req: NextRequest) {
    try {
      const body = await req.json();
      const validated = updateProductSchema.parse(body);
      const product = await AdminProductService.updateProduct(id, validated);
      if (!product) throw new ApiError('Product not found', 404);
      return ApiResponse.success(product, 'Product updated successfully');
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Validation failed', 400, error.errors);
      }
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to update product';
      return ApiResponse.error(msg, 500);
    }
  }

  static async remove(id: string) {
    try {
      const product = await AdminProductService.deleteProduct(id);
      if (!product) throw new ApiError('Product not found', 404);
      return ApiResponse.success(null, 'Product deleted successfully');
    } catch (error: unknown) {
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to delete product';
      return ApiResponse.error(msg, 500);
    }
  }
}
