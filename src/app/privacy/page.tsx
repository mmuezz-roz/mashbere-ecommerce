import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, Cookie } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Mashbere',
  description: 'Learn how Mashbere handles and protects your data.',
};

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Eye,
      content: 'We collect information you provide directly to us, such as when you request a partnership inquiry, sign up for our newsletter, or contact us. This may include your name, email address, phone number, and business details.'
    },
    {
      title: 'How We Use Your Information',
      icon: ShieldCheck,
      content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you about your inquiries, and to send you updates about our premium products (if you have opted in).'
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: 'We take the security of your data seriously. We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your details.'
    },
    {
      title: 'Cookies & Tracking',
      icon: Cookie,
      content: 'We use cookies to enhance your experience on our website, analyze site traffic, and understand where our visitors are coming from. You can choose to disable cookies through your browser settings.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFA] pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#708238] font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:gap-3 transition-all mb-6 sm:mb-8 bg-[#708238]/5 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display text-gray-900 uppercase tracking-tighter leading-[0.9] mb-6">
            Privacy <span className="text-[#708238]">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl font-light leading-relaxed">
            Last updated: May 17, 2026. Your privacy is our priority.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-12">
          {sections.map((section, idx) => (
            <section key={idx} className="group">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#708238]/10 flex items-center justify-center shrink-0 group-hover:bg-[#708238] group-hover:text-white transition-all duration-500">
                  <section.icon size={24} className="text-[#708238] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h2 className="text-2xl font-display text-gray-900 uppercase tracking-tight mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}

          <div className="mt-12 p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="space-y-2">
              <p className="text-[#708238] font-bold">info@Jameesfood.com</p>
              <p className="text-gray-500 text-sm">Dubai, United Arab Emirates</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
