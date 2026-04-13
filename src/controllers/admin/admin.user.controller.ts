/**
 * Admin User Controller
 * Handles user listing and role management for admin.
 * Reuses AdminUserService — does not touch the existing UserController.
 */
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AdminUserService } from '@/services/admin/admin.user.service';
import { ApiResponse, ApiError } from '@/lib/api-response';
import { UserRole } from '@/types';

const updateRoleSchema = z.object({
  role: z.enum(['customer', 'admin', 'b2b']),
});

export class AdminUserController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const role = searchParams.get('role') as UserRole | null;
      const filters = {
        role: role ?? undefined,
        search: searchParams.get('search') ?? undefined,
        page: Number(searchParams.get('page') ?? 1),
        limit: Number(searchParams.get('limit') ?? 20),
      };
      const result = await AdminUserService.getAllUsers(filters);
      return ApiResponse.success(result);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to fetch users';
      return ApiResponse.error(msg, 500);
    }
  }

  static async getOne(id: string) {
    try {
      const user = await AdminUserService.getUserById(id);
      if (!user) throw new ApiError('User not found', 404);
      return ApiResponse.success(user);
    } catch (error: unknown) {
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to fetch user';
      return ApiResponse.error(msg, 500);
    }
  }

  static async updateRole(id: string, req: NextRequest) {
    try {
      const body = await req.json();
      const { role } = updateRoleSchema.parse(body);
      const user = await AdminUserService.setUserRole(id, role);
      if (!user) throw new ApiError('User not found', 404);
      return ApiResponse.success(user, 'User role updated');
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Invalid role value', 400, error.errors);
      }
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to update user';
      return ApiResponse.error(msg, 500);
    }
  }
}
