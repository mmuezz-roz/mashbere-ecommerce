import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { AdminOrderController } from '@/controllers/admin/admin.order.controller';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  return AdminOrderController.getOne(id);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  return AdminOrderController.updateStatus(id, req);
}
