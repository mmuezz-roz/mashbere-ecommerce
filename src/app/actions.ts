'use server';

import { DeliveryInfo, Inquiry } from '@/types';
import { BadRequestError, InternalServerError } from '@/lib/errors';

/**
 * processCheckoutAction
 * Server Action for handling order placement.
 */
export async function processCheckoutAction(formData: DeliveryInfo) {
  // 1. Validation Logic
  if (!formData.email || !formData.address) {
    throw new BadRequestError('Required fields are missing');
  }

  try {
    // 2. Logic to save to MongoDB would go here
    console.log('Processing order on server for:', formData.email);
    
    // Simulate DB delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
  } catch (error) {
    console.error('Checkout processing error:', error);
    throw new InternalServerError('Failed to process order. Please try again later.');
  }
}

/**
 * submitInquiryAction
 * Server Action for B2B inquiry form.
 */
export async function submitInquiryAction(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) {
  try {
    // Logic to save enquiry to 'inquiries' collection
    console.log('New B2B Inquiry received:', inquiry.company || inquiry.name);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  } catch (error) {
    throw new InternalServerError('Failed to submit inquiry');
  }
}
