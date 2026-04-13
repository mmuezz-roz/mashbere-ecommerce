import { QuoteController } from '@/controllers/quote.controller';

export async function POST(req: Request) {
  return await QuoteController.submitQuote(req);
}

export async function GET() {
  return await QuoteController.getQuotes();
}
