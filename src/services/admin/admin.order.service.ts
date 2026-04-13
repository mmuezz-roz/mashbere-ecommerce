/**
 * Admin Order Service
 * Extends the existing OrderService with admin-specific operations.
 * Reuses existing Order model — backward compatible.
 */
import Order, { IOrder } from '@/models/Order';
import connectDB from '@/lib/mongoose';
import { OrderStatus } from '@/types';

export interface AdminOrderFilters {
  status?: OrderStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export class AdminOrderService {
  /** Get all orders with optional status filter and pagination */
  static async getAllOrders(filters: AdminOrderFilters = {}) {
    await connectDB();

    const { status, search, page = 1, limit = 20 } = filters;
    const query: Record<string, unknown> = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { 'deliveryInfo.email': { $regex: search, $options: 'i' } },
        { 'deliveryInfo.firstName': { $regex: search, $options: 'i' } },
        { 'deliveryInfo.lastName': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(query),
    ]);

    return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** Get single order by ID */
  static async getOrderById(id: string) {
    await connectDB();
    return await Order.findById(id).lean();
  }

  /** Safe status update using $set */
  static async updateOrderStatus(id: string, status: OrderStatus) {
    await connectDB();
    return await Order.findByIdAndUpdate(id, { $set: { status } }, { new: true });
  }

  /** Aggregate stats for dashboard */
  static async getStats() {
    await connectDB();
    const [total, pending, processing, completed, revenue] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'processing' }),
      Order.countDocuments({ status: 'completed' }),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
    ]);

    return {
      total,
      pending,
      processing,
      completed,
      revenue: revenue[0]?.total ?? 0,
    };
  }
}
