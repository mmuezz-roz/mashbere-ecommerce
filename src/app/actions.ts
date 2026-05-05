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
    // 2. Logic to save order to database would go here
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
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    const { error } = await supabase.from('quotes').insert([
      {
        name: inquiry.name,
        company: inquiry.company,
        email: inquiry.email,
        phone: inquiry.phone,
        equipment_interest: inquiry.equipmentInterest,
        message: inquiry.message,
        status: 'new',
      },
    ]);

    if (error) {
      console.error('Database insertion error:', error);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Inquiry submission error:', error);
    throw new InternalServerError('Failed to submit inquiry. Please try again later.');
  }
}
