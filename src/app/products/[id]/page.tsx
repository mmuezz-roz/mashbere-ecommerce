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
    alternates: {
      canonical: `/products/${product.slug || id}`,
    },
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
  const [allPopsicles, allPookees, allEquipment, allSipups] = await Promise.all([
    ProductService.getAllPopsicles(),
    ProductService.getAllPookees(),
    ProductService.getAllEquipment(),
    ProductService.getAllSipups()
  ]);
  
  const allItems = [...allPopsicles, ...allPookees, ...allEquipment, ...allSipups];
  
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com';
  const fullImageUrl = flavor.image && flavor.image.startsWith('http') 
    ? flavor.image 
    : `${baseUrl}${flavor.image}`;

  // JSON-LD Product Schema for Rich Snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": flavor.name,
    "image": [fullImageUrl],
    "description": flavor.description || flavor.name,
    "sku": flavor.id,
    "brand": {
      "@type": "Brand",
      "name": "Mashbere"
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/products/${flavor.slug || flavor.id}`,
      "priceCurrency": "AED",
      "price": "15.00", // Standard baseline for popsicles, would be dynamic in real DB
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "20.00",
          "currency": "AED"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 2,
            "unitCode": "d"
          }
        }
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient
        flavor={flavor}
        prevFlavor={prevFlavor}
        nextFlavor={nextFlavor}
        currentIndex={currentIndex}
      />
    </>
  );
}
