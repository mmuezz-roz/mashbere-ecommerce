import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { AdminQuoteController } from '@/controllers/admin/admin.quote.controller';

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  return AdminQuoteController.list(req);
}
