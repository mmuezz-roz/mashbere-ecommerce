import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductService } from '@/services/server/productService';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  // We need to fetch all to know prev/next.
  // In a real large DB, we might do cursor-based or adjacent queries,
  // but for 15 products, fetching all once is totally fine.
  const [allPopsicles, allPookies, allEquipment] = await Promise.all([
    ProductService.getAllPopsicles(),
    ProductService.getAllPookies(),
    ProductService.getAllEquipment()
  ]);
  
  const allItems = [...allPopsicles, ...allPookies, ...allEquipment];
  
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
