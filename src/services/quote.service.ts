import Quote, { IQuote } from '@/models/Quote';
import connectDB from '@/lib/mongoose';

export class QuoteService {
  static async createQuote(data: Partial<IQuote>) {
    await connectDB();
    const quote = new Quote(data);
    return await quote.save();
  }

  static async getQuotes() {
    await connectDB();
    return await Quote.find().sort({ createdAt: -1 });
  }

  static async updateQuoteStatus(id: string, status: string) {
    await connectDB();
    return await Quote.findByIdAndUpdate(id, { status }, { new: true });
  }
}
