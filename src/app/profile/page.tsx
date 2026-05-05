'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  ShoppingBag, 
  LogOut,
  ChevronRight,
  Camera,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ProfileServiceClient as ProfileService } from '@/services/client/profileService';
import { User } from '@/types';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, loading: authLoading, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    // Redirect if not logged in
    if (!authLoading && !authUser) {
      router.push('/auth/login');
      return;
    }

    // Fetch full profile data from Supabase
    const fetchProfile = async () => {
      if (authUser?.id) {
        setLoading(true);
        try {
          const data = await ProfileService.getProfile(authUser.id);
          setProfile(data);
          setFormData(data || {});
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          toast.error('Could not load profile details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [authUser, authLoading, router]);

  const handleSave = async () => {
    if (!authUser?.id) return;
    
    setLoading(true);
    try {
      await ProfileService.updateProfile(authUser.id, formData);
      setProfile({ ...profile, ...formData } as User);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Update Profile Error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch {
      toast.error('Logout failed');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFD]">
        <Loader2 className="w-10 h-10 animate-spin text-[#708238]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFD] pb-24 lg:pb-12">
      {/* 1. Header/Cover Area */}
      <div className="relative h-48 sm:h-64 bg-[#141A0B] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4EB54] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#708238] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>

      {/* 2. Profile Content Container */}
      <div className="container-responsive -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-[#708238] flex items-center justify-center text-white text-4xl font-black shadow-2xl overflow-hidden">
                  {profile?.image ? (
                    <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    profile?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-primary transition-colors border border-gray-100">
                  <Camera size={18} />
                </button>
              </div>

              <div className="mt-6 w-full flex flex-col items-center">
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-center font-bold text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Full Name"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-2xl font-black text-gray-900 text-center uppercase tracking-tight">
                    {profile?.name || 'Guest User'}
                  </h1>
                )}
              </div>
              
              <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>{profile?.role || 'Customer'} Member</span>
              </div>

              <div className="w-full h-px bg-gray-100 my-8" />

              <div className="w-full space-y-4">
                <button 
                  onClick={() => router.push('/cart')}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <ShoppingBag size={20} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">My Orders</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                </button>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-rose-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                      <LogOut size={20} />
                    </div>
                    <span className="text-sm font-bold text-rose-600">Sign Out</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section: Details & Forms */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                    <UserIcon size={16} />
                  </div>
                  Personal Information
                </h2>
                {isEditing && (
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="text-[10px] font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email Address - READ ONLY */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Address</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl opacity-60">
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-sm font-bold text-gray-700">{profile?.email}</span>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Phone Number</label>
                  <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${isEditing ? 'bg-white border-primary/50' : 'bg-gray-50 border-gray-100'}`}>
                    <Phone size={18} className="text-gray-400" />
                    {isEditing ? (
                      <input 
                        type="tel"
                        value={formData.phoneNumber || ''}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="bg-transparent text-sm font-bold text-gray-900 w-full outline-none"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-700">{profile?.phoneNumber || 'Not provided'}</span>
                    )}
                  </div>
                </div>

                {/* Business/Company */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Company Name</label>
                  <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${isEditing ? 'bg-white border-primary/50' : 'bg-gray-50 border-gray-100'}`}>
                    <Building2 size={18} className="text-gray-400" />
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.companyName || ''}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="bg-transparent text-sm font-bold text-gray-900 w-full outline-none"
                        placeholder="Enter company name"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-700">{profile?.companyName || 'B2C Account'}</span>
                    )}
                  </div>
                </div>

                {/* Member Since - READ ONLY */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Member Since</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl opacity-60">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="text-sm font-bold text-gray-700">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric'}) : '—'}
                    </span>
                  </div>
                </div>

                {/* Address (Full Width) */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Default Shipping Address</label>
                  <div className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${isEditing ? 'bg-white border-primary/50' : 'bg-gray-50 border-gray-100'}`}>
                    <MapPin size={18} className="text-gray-400 mt-0.5" />
                    {isEditing ? (
                      <textarea 
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="bg-transparent text-sm font-bold text-gray-900 w-full outline-none h-20 resize-none"
                        placeholder="Enter full shipping address"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-700 leading-relaxed">
                        {profile?.address || 'No shipping address saved yet.'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  disabled={loading}
                  className="bg-[#141A0B] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#141A0B]/20 flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin text-white/50" />}
                  {isEditing ? 'Save Changes' : 'Update Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
