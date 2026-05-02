import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import SipupDetailClient from './SipupDetailClient';

interface Props {
  params: { id: string };
}

export default async function SipUpDetailPage({ params }: Props) {
  const { id } = await params;

  // Fetch the specific sipup from Supabase
  const sipup = await ProductService.getSipupDetail(id);

  if (!sipup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFD] p-4">
        <h1 className="text-4xl font-display text-gray-900 mb-6">SipUp Not Found</h1>
        <Link 
          href="/"
          className="flex items-center gap-2 text-[#708238] font-bold hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  return <SipupDetailClient sipup={sipup} />;
}
