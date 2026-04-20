/**
 * Admin Order Controller
 * Handles order listing and status updates for admin.
 * Reuses AdminOrderService — does not touch the existing OrderService.
 */
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AdminOrderService } from '@/services/admin/admin.order.service';
import { ApiResponse, ApiError } from '@/lib/api-response';
import { OrderStatus } from '@/types';

const validStatuses: OrderStatus[] = ['pending', 'processing', 'completed', 'cancelled', 'shipped'];

const updateStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'cancelled', 'shipped']),
});

export class AdminOrderController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const status = searchParams.get('status') as OrderStatus | null;
      const filters = {
        status: status && validStatuses.includes(status) ? status : undefined,
        search: searchParams.get('search') ?? undefined,
        page: Number(searchParams.get('page') ?? 1),
        limit: Number(searchParams.get('limit') ?? 20),
      };
      const result = await AdminOrderService.getAllOrders(filters);
      return ApiResponse.success(result);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to fetch orders';
      return ApiResponse.error(msg, 500);
    }
  }

  static async getOne(id: string) {
    try {
      const order = await AdminOrderService.getOrderById(id);
      if (!order) throw new ApiError('Order not found', 404);
      return ApiResponse.success(order);
    } catch (error: unknown) {
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to fetch order';
      return ApiResponse.error(msg, 500);
    }
  }

  static async updateStatus(id: string, req: NextRequest) {
    try {
      const body = await req.json();
      const { status } = updateStatusSchema.parse(body);
      const order = await AdminOrderService.updateOrderStatus(id, status);
      if (!order) throw new ApiError('Order not found', 404);
      return ApiResponse.success(order, 'Order status updated');
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Invalid status value', 400, (error as any).errors);
      }
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to update order';
      return ApiResponse.error(msg, 500);
    }
  }
}
