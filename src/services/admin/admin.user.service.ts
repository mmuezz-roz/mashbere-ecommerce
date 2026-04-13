/**
 * Admin User Service
 * Extends the existing UserService with admin-specific operations.
 * Reuses existing User model — backward compatible.
 */
import User from '@/models/User';
import connectDB from '@/lib/mongoose';
import { UserRole } from '@/types';

export interface AdminUserFilters {
  role?: UserRole;
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export class AdminUserService {
  /** Get all users with optional filters and pagination */
  static async getAllUsers(filters: AdminUserFilters = {}) {
    await connectDB();

    const { role, search, page = 1, limit = 20 } = filters;
    const query: Record<string, unknown> = {};

    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(query),
    ]);

    return { users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** Get single user by ID */
  static async getUserById(id: string) {
    await connectDB();
    return await User.findById(id).lean();
  }

  /**
   * Toggle user active state.
   * We use a soft-delete via role manipulation:
   * 'suspended' is stored as a new role value, keeping the record intact.
   * Alternatively update an `isActive` field safely with $set.
   */
  static async setUserRole(id: string, role: string) {
    await connectDB();
    return await User.findByIdAndUpdate(id, { $set: { role } }, { new: true });
  }

  /** Aggregate stats for dashboard */
  static async getStats() {
    await connectDB();
    const [total, admins, b2b, customers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ role: 'b2b' }),
      User.countDocuments({ role: 'customer' }),
    ]);
    return { total, admins, b2b, customers };
  }
}
