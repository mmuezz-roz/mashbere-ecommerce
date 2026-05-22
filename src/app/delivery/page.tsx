import React from 'react';
import DeliveryClient from './DeliveryClient';

export const metadata = {
  title: 'Cold-Chain Delivery & Shipping | Mashbere Premium UAE',
  description: 'Mashbere premium zero-melt delivery across the UAE. Explore our cold-chain delivery schedule, Emirate shipping rates, and dry-ice safe-handling guidelines.',
  keywords: ['ice cream delivery Dubai', 'frozen treats shipping UAE', 'dry ice delivery Abu Dhabi', 'zero-melt guarantee Mashbere', 'cold-chain logistics UAE'],
  alternates: {
    canonical: '/delivery',
  },
  openGraph: {
    title: 'Zero-Melt Delivery & Shipping | Mashbere UAE',
    description: 'We deliver artisanal frozen treats in pristine condition across the UAE using optimized dry-ice packing and refrigerated transport.',
    url: 'https://www.mashbere.ae/delivery',
  },
};

export default function DeliveryPage() {
  return <DeliveryClient />;
}
