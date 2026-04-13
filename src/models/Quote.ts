import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  name: string;
  company?: string;
  email: string;
  equipmentInterest: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    equipmentInterest: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['new', 'contacted', 'closed'], 
      default: 'new' 
    },
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema);
