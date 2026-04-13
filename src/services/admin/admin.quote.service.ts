/**
 * Admin Quote Service
 * Extends the existing QuoteService with admin-specific operations.
 * Reuses existing Quote model — backward compatible.
 */
import Quote, { IQuote } from '@/models/Quote';
import connectDB from '@/lib/mongoose';

export type QuoteStatus = 'new' | 'contacted' | 'closed';

export interface AdminQuoteFilters {
  status?: QuoteStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export class AdminQuoteService {
  /** Get all quotes with optional filters and pagination */
  static async getAllQuotes(filters: AdminQuoteFilters = {}) {
    await connectDB();

    const { status, search, page = 1, limit = 20 } = filters;
    const query: Record<string, unknown> = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { equipmentInterest: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [quotes, total] = await Promise.all([
      Quote.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Quote.countDocuments(query),
    ]);

    return { quotes, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** Get single quote by ID */
  static async getQuoteById(id: string) {
    await connectDB();
    return await Quote.findById(id).lean();
  }

  /** Safe status update */
  static async updateStatus(id: string, status: QuoteStatus) {
    await connectDB();
    return await Quote.findByIdAndUpdate(id, { $set: { status } }, { new: true });
  }

  /** Aggregate stats */
  static async getStats() {
    await connectDB();
    const [total, newCount, contacted, closed] = await Promise.all([
      Quote.countDocuments(),
      Quote.countDocuments({ status: 'new' }),
      Quote.countDocuments({ status: 'contacted' }),
      Quote.countDocuments({ status: 'closed' }),
    ]);
    return { total, new: newCount, contacted, closed };
  }
}
