import { createClient } from '@/lib/supabase/client';
import { User } from '@/types';

/**
 * ProfileServiceClient
 * Handles fetching and updating profile data from the BROWSER.
 */
export const ProfileServiceClient = {
  async getProfile(userId: string): Promise<User | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return this.mapToUser(data);
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: updates.name,
        company_name: updates.companyName,
        phone_number: updates.phoneNumber,
        address: updates.address,
        avatar_url: updates.image,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) throw error;
    return data;
  },

  mapToUser(dbProfile: any): User {
    return {
      id: dbProfile.id,
      name: dbProfile.full_name || '',
      email: dbProfile.email || '',
      role: dbProfile.role || 'customer',
      image: dbProfile.avatar_url || '',
      companyName: dbProfile.company_name || '',
      phoneNumber: dbProfile.phone_number || '',
      address: dbProfile.address || '',
      createdAt: dbProfile.created_at || '',
      updatedAt: dbProfile.updated_at || '',
    };
  }
};
