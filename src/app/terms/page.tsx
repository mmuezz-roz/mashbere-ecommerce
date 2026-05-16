import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, FileText, Globe, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Mashbere',
  description: 'Terms and conditions for using the Mashbere website and services.',
};

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: Scale,
      content: 'By accessing or using the Mashbere website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
    },
    {
      title: 'Use License',
      icon: FileText,
      content: 'Permission is granted to temporarily view the materials (information or images) on Mashbere\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.'
    },
    {
      title: 'Service Scope',
      icon: Globe,
      content: 'Mashbere provides information about artisanal frozen treats and commercial equipment. Our partnership inquiries and services are primarily focused on the United Arab Emirates market, though international inquiries are welcome.'
    },
    {
      title: 'Disclaimers',
      icon: AlertCircle,
      content: 'The materials on Mashbere\'s website are provided on an \'as is\' basis. Mashbere makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.'
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
            Terms of <span className="text-[#708238]">Service</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl font-light leading-relaxed">
            Last updated: May 17, 2026. Please read these terms carefully.
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
