import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Dynamic Metadata for SEO & Social Sharing
 */
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await ProductService.getProductById(id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com';

  if (!product) {
    return {
      title: 'Product Not Found | Mashbere',
    };
  }

  const fullImageUrl = product.image && product.image.startsWith('http') 
    ? product.image 
    : `${baseUrl}${product.image}`;

  return {
    title: `${product.name} | Mashbere`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${baseUrl}/products/${product.slug || id}`,
      siteName: 'Mashbere',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'en_AE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [fullImageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  // We need to fetch all to know prev/next.
  // In a real large DB, we might do cursor-based or adjacent queries,
  // but for 15 products, fetching all once is totally fine.
  const [allPopsicles, allPookies, allEquipment, allSipups] = await Promise.all([
    ProductService.getAllPopsicles(),
    ProductService.getAllPookies(),
    ProductService.getAllEquipment(),
    ProductService.getAllSipups()
  ]);
  
  const allItems = [...allPopsicles, ...allPookies, ...allEquipment, ...allSipups];
  
  const currentIndex = allItems.findIndex(f => f.id === id);
  const flavor = allItems[currentIndex];

  if (!flavor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFA] p-4">
        <h1 className="text-5xl font-display text-gray-900 uppercase mb-6">Not Found</h1>
        <Link href="/products" className="flex items-center gap-2 text-[#708238] font-bold hover:gap-3 transition-all">
          <ArrowLeft size={18} />
          Back to All Flavours
        </Link>
      </div>
    );
  }

  const prevFlavor = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextFlavor = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <ProductDetailClient
      flavor={flavor}
      prevFlavor={prevFlavor}
      nextFlavor={nextFlavor}
      currentIndex={currentIndex}
    />
  );
}
