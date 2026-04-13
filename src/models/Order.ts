import mongoose, { Schema, Document } from 'mongoose';
import { OrderStatus } from '@/types';

export interface IOrder extends Document {
  userId?: string;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    selectedVariant?: string;
    image: string;
  }>;
  total: number;
  status: OrderStatus;
  deliveryInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    deliverySlot: string;
  };
  paymentInfo: {
    method: 'card' | 'cod';
    lastFour?: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        selectedVariant: { type: String },
        image: { type: String, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'processing', 'completed', 'cancelled', 'shipped'], 
      default: 'pending' 
    },
    deliveryInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      deliverySlot: { type: String, required: true },
    },
    paymentInfo: {
      method: { type: String, enum: ['card', 'cod'], default: 'cod' },
      lastFour: { type: String },
    },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'paid', 'failed'], 
      default: 'pending' 
    },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
