import { MetadataRoute } from 'next';
import { ProductService } from '@/services/server/productService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com';

  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/equipment',
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

  // All products are accessible via /products/[id]
  const productRoutes = [
    ...popsicles.map((p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...sipups.map((s) => ({
      url: `${baseUrl}/products/${s.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
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
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...productRoutes];
}
