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

// JSON-LD Schema for Google Rich Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you prevent the ice cream and popsicles from melting during delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We utilize a specialized Zero-Melt Protocol. All orders are packed inside thick, heavy-duty Expanded Polystyrene (EPS) thermal boxes loaded with industrial-grade solid dry ice pellets at -78.5°C."
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver to all Emirates in the UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We deliver across all seven Emirates. Dubai and Sharjah receive daily deliveries. Other Emirates are serviced on scheduled weekly routes."
      }
    },
    {
      "@type": "Question",
      "name": "Are your popsicles and ice cream vegan and gluten-free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many of our flavors are 100% vegan and gluten-free! All of our fruit-based popsicles are made with 100% natural fruit pulp, making them dairy-free, vegan, and gluten-free."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer catering services for private parties, birthdays, or weddings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We provide premium catering solutions across the UAE. We can deploy our beautiful signature mobile kiosk carts, complete with professional attendants and customized menus."
      }
    }
  ]
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}
