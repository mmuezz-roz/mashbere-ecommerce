import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { ApiResponse } from '@/lib/api-response';
import { AdminProductService } from '@/services/admin/admin.product.service';
import { AdminOrderService } from '@/services/admin/admin.order.service';
import { AdminUserService } from '@/services/admin/admin.user.service';
import { AdminQuoteService } from '@/services/admin/admin.quote.service';

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const [products, orders, users, quotes] = await Promise.all([
      AdminProductService.getStats(),
      AdminOrderService.getStats(),
      AdminUserService.getStats(),
      AdminQuoteService.getStats(),
    ]);

    return ApiResponse.success({ products, orders, users, quotes });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch stats';
    return ApiResponse.error(msg, 500);
  }
}
