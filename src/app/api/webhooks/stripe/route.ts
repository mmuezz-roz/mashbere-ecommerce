import { StripeController } from '@/controllers/stripe.controller';

export async function POST(req: Request) {
  return await StripeController.handleWebhook(req);
}

// Next.js config to disable body parsing for webhooks if needed
// However, in App Router, we use req.text() which is fine.
export const dynamic = 'force-dynamic';
