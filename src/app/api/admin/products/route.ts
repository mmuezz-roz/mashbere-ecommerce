import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { AdminProductController } from '@/controllers/admin/admin.product.controller';

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  return AdminProductController.list(req);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  return AdminProductController.create(req);
}
