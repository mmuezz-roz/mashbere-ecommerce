import React from 'react';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Mashbere | Premium Ice Cream, Ice Cups & Kiosk Solutions UAE',
  description: 'Mashbere is a UAE-based premium frozen dessert brand offering ice cream, popsicles, hygienic ice cups (ice glass), and complete kiosk solutions for businesses across the UAE.',
  keywords: ['premium ice cream UAE', 'ice cups UAE', 'ice glass UAE', 'kiosk solutions UAE', 'frozen desserts Dubai', 'popsicles UAE', 'frozen kiosk UAE'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Mashbere | Premium Frozen Desserts UAE',
    description: 'Discover Mashbere — premium ice cream, popsicles, hygienic ice cups, and kiosk solutions built for the UAE market.',
    url: 'https://www.mashbere.ae/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
