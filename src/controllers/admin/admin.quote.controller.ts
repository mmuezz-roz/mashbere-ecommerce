/**
 * Admin Quote Controller
 * Handles B2B quote/inquiry management for admin.
 * Reuses AdminQuoteService — does not touch the existing QuoteController.
 */
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AdminQuoteService, QuoteStatus } from '@/services/admin/admin.quote.service';
import { ApiResponse, ApiError } from '@/lib/api-response';

const updateStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed']),
});

export class AdminQuoteController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const status = searchParams.get('status') as QuoteStatus | null;
      const filters = {
        status: status ?? undefined,
        search: searchParams.get('search') ?? undefined,
        page: Number(searchParams.get('page') ?? 1),
        limit: Number(searchParams.get('limit') ?? 20),
      };
      const result = await AdminQuoteService.getAllQuotes(filters);
      return ApiResponse.success(result);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to fetch quotes';
      return ApiResponse.error(msg, 500);
    }
  }

  static async getOne(id: string) {
    try {
      const quote = await AdminQuoteService.getQuoteById(id);
      if (!quote) throw new ApiError('Quote not found', 404);
      return ApiResponse.success(quote);
    } catch (error: unknown) {
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to fetch quote';
      return ApiResponse.error(msg, 500);
    }
  }

  static async updateStatus(id: string, req: NextRequest) {
    try {
      const body = await req.json();
      const { status } = updateStatusSchema.parse(body);
      const quote = await AdminQuoteService.updateStatus(id, status);
      if (!quote) throw new ApiError('Quote not found', 404);
      return ApiResponse.success(quote, 'Quote status updated');
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Invalid status value', 400, (error as any).errors);
      }
      if (error instanceof ApiError) return ApiResponse.error(error.message, error.statusCode);
      const msg = error instanceof Error ? error.message : 'Failed to update quote';
      return ApiResponse.error(msg, 500);
    }
  }
}
