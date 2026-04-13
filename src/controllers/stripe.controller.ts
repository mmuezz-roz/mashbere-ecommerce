import { stripe } from '@/lib/stripe';
import { ApiResponse } from '@/lib/api-response';
import { OrderService } from '@/services/order.service';
import { headers } from 'next/headers';

export class StripeController {
  static async createCheckoutSession(req: Request) {
    try {
      const { items, deliveryInfo, userId } = await req.json();

      // Create a pending order first
      const order = await OrderService.createOrder({
        userId,
        items,
        total: items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0),
        deliveryInfo,
        paymentStatus: 'pending',
        status: 'pending',
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        metadata: {
          orderId: order._id.toString(),
        },
      });

      // Update order with session ID
      await OrderService.updateOrder(order._id, { stripeSessionId: session.id });

      return ApiResponse.success({ url: session.url });
    } catch (error: any) {
      console.error('Stripe Session Error:', error);
      return ApiResponse.error(error.message, 500);
    }
  }

  static async handleWebhook(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature') as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      return ApiResponse.error(`Webhook Error: ${error.message}`, 400);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      
      // Update order status to paid
      await OrderService.updateOrderBySessionId(session.id, {
        paymentStatus: 'paid',
        status: 'processing',
      });
    }

    return ApiResponse.success({ received: true });
  }
}
