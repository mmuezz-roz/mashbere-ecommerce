import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import SipupDetailClient from './SipupDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const sipup = await ProductService.getSipupDetail(id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com';

  if (!sipup) {
    return { title: 'SipUp Not Found | Mashbere' };
  }

  const fullImageUrl = sipup.image && sipup.image.startsWith('http') 
    ? sipup.image 
    : `${baseUrl}${sipup.image}`;

  return {
    title: `${sipup.name} | Mashbere`,
    description: sipup.description || sipup.longDesc,
    alternates: {
      canonical: `/sipups/${id}`,
    },
    openGraph: {
      title: sipup.name,
      description: sipup.description || sipup.longDesc,
      url: `${baseUrl}/sipups/${id}`,
      images: [{ url: fullImageUrl }],
    },
  };
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
