import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { AdminQuoteController } from '@/controllers/admin/admin.quote.controller';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  return AdminQuoteController.getOne(id);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  return AdminQuoteController.updateStatus(id, req);
}
