import { createClient } from '@/lib/supabase/server';
import { User } from '@/types';

/**
 * ProfileService
 * Handles fetching and updating user profile data from Supabase.
 */
export const ProfileService = {
  /**
   * Fetches the profile for a specific user ID
   */
  async getProfile(userId: string): Promise<User | null> {
    const supabase = await createClient();
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

  /**
   * Updates the profile data for a specific user
   */
  async updateProfile(userId: string, updates: Partial<User>) {
    const supabase = await createClient();
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

  /**
   * Maps Database (snake_case) to Frontend (camelCase)
   */
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
