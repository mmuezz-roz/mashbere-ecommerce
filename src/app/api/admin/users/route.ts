import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { AdminUserController } from '@/controllers/admin/admin.user.controller';

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  return AdminUserController.list(req);
}
