import { StripeController } from '@/controllers/stripe.controller';

export async function POST(req: Request) {
  return await StripeController.createCheckoutSession(req);
}
