'use client';

import { useState, useEffect } from 'react';
import { Send, Info, Phone } from 'lucide-react';
import { submitInquiryAction } from '@/app/actions';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import { LogIn, Lock } from 'lucide-react';
import Link from 'next/link';

interface InquiryFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  equipmentInterest: string;
  message: string;
}

const EQUIPMENT_OPTIONS = [
  'Commercial Freezer',
  'Mobile Cart',
  'Premium Kiosk',
  'Multiple Items',
] as const;

const INITIAL_STATE: InquiryFormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  equipmentInterest: '',
  message: '',
};

export default function EquipmentInquiryForm() {
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState<InquiryFormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const searchParams = useSearchParams();

  // Sync user info and handle URL parameters
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }

    const interest = searchParams.get('interest');
    if (interest) {
      setFormData(prev => ({ ...prev, equipmentInterest: interest }));
    }
  }, [user, searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitInquiryAction({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        equipmentInterest: formData.equipmentInterest,
        message: formData.message,
      });

      if (result.success) {
        setSubmitted(true);
        setFormData(INITIAL_STATE);
        toast.success('Inquiry submitted! Our team will contact you via email shortly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-xl overflow-hidden grid lg:grid-cols-2">
      {/* Form Column */}
      <div className="p-8 sm:p-12 lg:p-16 border-r border-gray-100">
        <h2 className="text-3xl font-black mb-6 text-primary uppercase tracking-tight">Request Business Inquiry</h2>

        {authLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !user ? (
          <div className="py-12 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400">
              <Lock size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-gray-900 uppercase">Login Required</h3>
              <p className="text-gray-500 max-w-xs mx-auto font-medium">
                Please log in to your account to submit a business inquiry.
              </p>
            </div>
            <Link 
              href="/auth/login" 
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              <LogIn size={18} />
              Login to Inquire
            </Link>
          </div>
        ) : submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Sent!</h3>
            <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+971 50 000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="equipmentInterest" className="text-sm font-medium text-gray-700">
                Equipment Interest
              </label>
              <select
                id="equipmentInterest"
                name="equipmentInterest"
                required
                value={formData.equipmentInterest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              >
                <option value="">Select equipment type</option>
                {EQUIPMENT_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>

      {/* Info Column */}
      <div className="bg-gray-50 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-12">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <Info className="w-6 h-6 text-primary" />
            Why Choose Our Equipment?
          </h3>
          <ul className="space-y-4 text-gray-600">
            {[
              'High-performance cooling systems optimized for UAE climate.',
              'Full maintenance and support services in Dubai & Abu Dhabi.',
              'Customizable branding options for carts and kiosks.',
            ].map((point, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-primary/10 shadow-sm">
          <p className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-widest">
            Support Hotline
          </p>
          <p className="text-lg sm:text-2xl font-black text-gray-900 whitespace-nowrap">+971 502994974</p>
          <p className="text-xs text-gray-400 mt-2">Available Mon – Sat, 9 AM – 6 PM</p>
        </div>
      </div>
    </div>
  );
}
