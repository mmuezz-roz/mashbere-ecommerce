export type Category = 'ice-cream' | 'popsicle' | 'equipment' | 'sip-up' | 'pookees' | 'toroness';
export type BusinessType = 'b2c' | 'b2b';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipped';
export type UserRole = 'customer' | 'admin' | 'b2b';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  companyName?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  featured?: boolean;
  flavors?: string[];
  variants?: string[];
  type?: string;
  businessType?: BusinessType;
  stock?: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  paymentStatus: 'pending' | 'paid' | 'failed';
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  deliverySlot: string;
}

export interface PaymentInfo {
  method: 'card' | 'cod';
  lastFour?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  equipmentInterest: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}
