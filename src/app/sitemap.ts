import { MetadataRoute } from 'next';
import { ProductService } from '@/services/server/productService';
import { blogPosts } from '@/data/blogPosts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mashbere.com';

  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/equipment',
    '/about',
    '/contact',
    '/blog',
    '/delivery',
    '/dietary',
    '/faq',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }));

  // Blog post routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));


  // Fetch all categories for dynamic product routes
  const [popsicles, sipups, equipment, pookees] = await Promise.all([
    ProductService.getAllPopsicles(),
    ProductService.getAllSipups(),
    ProductService.getAllEquipment(),
    ProductService.getAllPookees(),
  ]);

  // Combined product routes with correct URL logic
  const productRoutes = [
    ...popsicles.map((p) => ({
      url: `${baseUrl}/products/${p.slug || p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...sipups.map((s) => ({
      url: `${baseUrl}/sipups/${s.slug || s.id}`, // Fixed: Sipups are served from /sipups/
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7, // Higher priority for Sipups
    })),
    ...equipment.map((e) => ({
      url: `${baseUrl}/products/${e.slug || e.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...pookees.map((p) => ({
      url: `${baseUrl}/products/${p.slug || p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
