import { ProductService } from '@/services/product.service';
import { ApiResponse, ApiError } from '@/lib/api-response';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive(),
  category: z.enum(['ice-cream', 'popsicle', 'equipment', 'sip-up']),
  image: z.string().url(),
  businessType: z.enum(['b2c', 'b2b']),
  stock: z.number().int().nonnegative(),
  slug: z.string().min(1),
  flavors: z.array(z.string()).optional(),
  variants: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export class ProductController {
  static async getProducts(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const category = searchParams.get('category');
      const businessType = searchParams.get('businessType');
      
      const filters: any = {};
      if (category) filters.category = category;
      if (businessType) filters.businessType = businessType;

      const products = await ProductService.getAllProducts(filters);
      return ApiResponse.success(products);
    } catch (error: any) {
      return ApiResponse.error(error.message, 500);
    }
  }

  static async getProduct(id: string) {
    try {
      const product = await ProductService.getProductById(id);
      if (!product) throw new ApiError('Product not found', 404);
      return ApiResponse.success(product);
    } catch (error: any) {
      return ApiResponse.error(error.message, error.statusCode || 500);
    }
  }

  static async createProduct(req: Request) {
    try {
      const body = await req.json();
      const validatedData = productSchema.parse(body);
      const product = await ProductService.createProduct(validatedData);
      return ApiResponse.success(product, 'Product created successfully', 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Validation Error', 400, (error as any).errors);
      }
      return ApiResponse.error(error.message, 500);
    }
  }

  static async updateProduct(id: string, req: Request) {
    try {
      const body = await req.json();
      const product = await ProductService.updateProduct(id, body);
      if (!product) throw new ApiError('Product not found', 404);
      return ApiResponse.success(product, 'Product updated successfully');
    } catch (error: any) {
      return ApiResponse.error(error.message, error.statusCode || 500);
    }
  }

  static async deleteProduct(id: string) {
    try {
      const product = await ProductService.deleteProduct(id);
      if (!product) throw new ApiError('Product not found', 404);
      return ApiResponse.success(null, 'Product deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(error.message, error.statusCode || 500);
    }
  }
}
