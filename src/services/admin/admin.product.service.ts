/**
 * Admin Product Service
 * Extends the existing ProductService with admin-specific operations.
 * Reuses existing Product model — backward compatible.
 */
import Product, { IProduct } from '@/models/Product';
import connectDB from '@/lib/mongoose';

export interface AdminProductFilters {
  category?: string;
  businessType?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AdminProductStats {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
}

export class AdminProductService {
  /** Get all products with optional filters and pagination */
  static async getAllProducts(filters: AdminProductFilters = {}) {
    await connectDB();

    const { category, businessType, search, page = 1, limit = 20 } = filters;
    const query: Record<string, unknown> = {};

    if (category) query.category = category;
    if (businessType) query.businessType = businessType;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** Create a product with admin-extended fields */
  static async createProduct(data: Partial<IProduct> & Record<string, unknown>) {
    await connectDB();
    const product = new Product(data);
    return await product.save();
  }

  /** Safe update — uses $set so we never accidentally wipe fields */
  static async updateProduct(id: string, data: Partial<IProduct> & Record<string, unknown>) {
    await connectDB();
    return await Product.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  /** Hard delete */
  static async deleteProduct(id: string) {
    await connectDB();
    return await Product.findByIdAndDelete(id);
  }

  /** Get single product by ID */
  static async getProductById(id: string) {
    await connectDB();
    return await Product.findById(id).lean();
  }

  /** Aggregate stats for dashboard */
  static async getStats(): Promise<AdminProductStats> {
    await connectDB();
    const [total, lowStock, outOfStock] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ stock: { $gt: 0, $lte: 10 } }),
      Product.countDocuments({ stock: 0 }),
    ]);
    return { total, active: total - outOfStock, lowStock, outOfStock };
  }
}
