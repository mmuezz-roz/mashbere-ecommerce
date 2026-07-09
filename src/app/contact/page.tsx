import React from 'react';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Mashbere | Reach Us – Ice Cream, Pooksies & Kiosk Wholesale UAE',
  description: 'Get in touch with Mashbere — the UAE\'s leading wholesale supplier of premium ice cream, popsicles, and kiosk solutions. Call, WhatsApp, or email us today.',
  keywords: [
    'contact Mashbere',
    'wholesale ice cream UAE contact',
    'ice cream supplier Dubai',
    'popsicle supplier UAE',
    'kiosk solutions contact UAE',
    'Jamees Food contact',
    'frozen desserts UAE wholesale',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Mashbere | Wholesale Ice Cream & Kiosk Solutions UAE',
    description: 'Reach out to the Mashbere team for wholesale inquiries, business partnerships, or product questions. We\'re here to help.',
    url: 'https://www.mashbere.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
