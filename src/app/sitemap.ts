import { MetadataRoute } from 'next';
import { ProductService } from '@/services/server/productService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com';

  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/equipment',
    '/about',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch all categories for dynamic product routes
  const [popsicles, sipups, equipment, pookies] = await Promise.all([
    ProductService.getAllPopsicles(),
    ProductService.getAllSipups(),
    ProductService.getAllEquipment(),
    ProductService.getAllPookies(),
  ]);

  // Combined product routes with correct URL logic
  const productRoutes = [
    ...popsicles.map((p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...sipups.map((s) => ({
      url: `${baseUrl}/sipups/${s.id}`, // Fixed: Sipups are served from /sipups/
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7, // Higher priority for Sipups
    })),
    ...equipment.map((e) => ({
      url: `${baseUrl}/products/${e.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...pookies.map((p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...productRoutes];
}
