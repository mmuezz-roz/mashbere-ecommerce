import Product, { IProduct } from '@/models/Product';
import connectDB from '@/lib/mongoose';

export class ProductService {
  static async getAllProducts(filters: any = {}) {
    await connectDB();
    return await Product.find(filters).sort({ createdAt: -1 });
  }

  static async getProductBySlug(slug: string) {
    await connectDB();
    return await Product.findOne({ slug });
  }

  static async getProductById(id: string) {
    await connectDB();
    return await Product.findById(id);
  }

  static async createProduct(data: Partial<IProduct>) {
    await connectDB();
    const product = new Product(data);
    return await product.save();
  }

  static async updateProduct(id: string, data: Partial<IProduct>) {
    await connectDB();
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProduct(id: string) {
    await connectDB();
    return await Product.findByIdAndDelete(id);
  }
}
