import React from 'react';
import FaqClient from './FaqClient';

export const metadata = {
  title: 'Frequently Asked Questions & Support | Mashbere Premium UAE',
  description: 'Find answers to common questions about Mashbere artisanal popsicles, cold-chain dry-ice delivery, event catering, custom wholesale treats, and payments in the UAE.',
  keywords: ['Mashbere FAQ Dubai', 'ice cream catering UAE', 'wholesale ice cream supplier Dubai', 'support Mashbere', 'dry ice delivery questions UAE'],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ & Customer Support Hub | Mashbere UAE',
    description: 'Got questions about our zero-melt delivery, dietary guidelines, or private event catering? Explore our comprehensive support center.',
    url: 'https://www.mashbere.ae/faq',
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
