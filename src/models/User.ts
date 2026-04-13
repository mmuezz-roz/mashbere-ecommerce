import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '@/types';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  image?: string;
  companyName?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    role: { 
      type: String, 
      enum: ['customer', 'admin', 'b2b'], 
      default: 'customer' 
    },
    image: { type: String },
    companyName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
