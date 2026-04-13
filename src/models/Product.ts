import mongoose, { Schema, Document } from 'mongoose';
import { Category, BusinessType } from '@/types';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  featured: boolean;
  flavors?: string[];
  variants?: string[];
  type?: string;
  businessType: BusinessType;
  stock: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
      type: String, 
      enum: ['ice-cream', 'popsicle', 'equipment', 'sip-up'], 
      required: true 
    },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    flavors: [{ type: String }],
    variants: [{ type: String }],
    type: { type: String },
    businessType: { 
      type: String, 
      enum: ['b2c', 'b2b'], 
      default: 'b2c' 
    },
    stock: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Index for better search performance
ProductSchema.index({ name: 'text', description: 'text', category: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
