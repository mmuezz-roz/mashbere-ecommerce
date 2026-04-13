import Order, { IOrder } from '@/models/Order';
import connectDB from '@/lib/mongoose';

export class OrderService {
  static async createOrder(data: any) {
    await connectDB();
    const order = new Order(data);
    return await order.save();
  }

  static async getOrderById(id: string) {
    await connectDB();
    return await Order.findById(id).populate('userId');
  }

  static async getOrdersByUserId(userId: string) {
    await connectDB();
    return await Order.find({ userId }).sort({ createdAt: -1 });
  }

  static async updateOrder(id: string, data: Partial<IOrder>) {
    await connectDB();
    return await Order.findByIdAndUpdate(id, data, { new: true });
  }

  static async updateOrderBySessionId(sessionId: string, data: Partial<IOrder>) {
    await connectDB();
    return await Order.findOneAndUpdate({ stripeSessionId: sessionId }, data, { new: true });
  }
}
