import { ProductController } from '@/controllers/product.controller';

export async function GET(req: Request) {
  return await ProductController.getProducts(req);
}

export async function POST(req: Request) {
  return await ProductController.createProduct(req);
}
