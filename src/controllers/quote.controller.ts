import { QuoteService } from '@/services/quote.service';
import { ApiResponse } from '@/lib/api-response';
import { z } from 'zod';

const quoteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email'),
  equipmentInterest: z.string().min(1, 'Selection is required'),
  message: z.string().min(1, 'Message is required'),
});

export class QuoteController {
  static async submitQuote(req: Request) {
    try {
      const body = await req.json();
      const validatedData = quoteSchema.parse(body);
      const quote = await QuoteService.createQuote(validatedData);
      return ApiResponse.success(quote, 'Quote request submitted successfully', 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Validation Error', 400, error.errors);
      }
      return ApiResponse.error(error.message, 500);
    }
  }

  static async getQuotes() {
    try {
      const quotes = await QuoteService.getQuotes();
      return ApiResponse.success(quotes);
    } catch (error: any) {
      return ApiResponse.error(error.message, 500);
    }
  }
}
