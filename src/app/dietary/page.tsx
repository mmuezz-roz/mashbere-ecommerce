import React from 'react';
import DietaryClient from './DietaryClient';

export const metadata = {
  title: 'Dietary & Allergen Guide | Mashbere Premium UAE',
  description: 'Explore the ingredients, allergens, and nutritional profiles of Mashbere premium frozen treats. Find vegan, gluten-free, dairy-free, and nut-free ice creams and popsicles in the UAE.',
  keywords: ['vegan ice cream Dubai', 'gluten-free popsicles UAE', 'allergen-free desserts UAE', 'dietary guide Mashbere', 'organic frozen treats Dubai'],
  alternates: {
    canonical: '/dietary',
  },
  openGraph: {
    title: 'Ingredients & Dietary Guide | Mashbere UAE',
    description: 'We believe in clean labels. Filter our premium ice creams and popsicles by vegan, gluten-free, dairy-free, and nut-free certifications.',
    url: 'https://www.mashbere.ae/dietary',
  },
};

export default function DietaryPage() {
  return <DietaryClient />;
}
