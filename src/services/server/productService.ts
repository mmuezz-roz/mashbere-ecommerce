import 'server-only';
import { Product, Category } from '@/types';

/**
 * Seed data used during development and as a fallback.
 * In production, replace the return statements in ProductService
 * with real MongoDB queries via clientPromise.
 */
const SEED_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'classic-vanilla-dream',
    name: 'Classic Vanilla Dream',
    description: 'Premium Madagascar vanilla ice cream made with natural ingredients',
    price: 18.99,
    category: 'ice-cream',
    image: 'https://images.unsplash.com/photo-1707553851664-5985b32734c0?q=80',
    featured: false,
    flavors: ['Vanilla', 'French Vanilla'],
    variants: ['Pint', 'Quart', 'Half Gallon'],
    type: 'Creamy',
    businessType: 'b2c',
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'rich-chocolate-bliss',
    name: 'Rich Chocolate Bliss',
    description: 'Decadent Belgian chocolate ice cream with cocoa nibs',
    price: 20.49,
    category: 'ice-cream',
    image: 'https://images.unsplash.com/photo-1562790879-dfde82829db0?q=80',
    featured: false,
    flavors: ['Dark Chocolate', 'Milk Chocolate', 'White Chocolate'],
    variants: ['Pint', 'Quart', 'Half Gallon'],
    type: 'Creamy',
    businessType: 'b2c',
    stock: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'fresh-mint-delight',
    name: 'Fresh Mint Delight',
    description: 'Cool mint ice cream with organic peppermint extract',
    price: 18.99,
    category: 'ice-cream',
    image: 'https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80',
    featured: false,
    flavors: ['Mint Chip', 'Pure Mint'],
    variants: ['Pint', 'Quart'],
    type: 'Refreshing',
    businessType: 'b2c',
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'caramel-heaven',
    name: 'Caramel Heaven',
    description: 'Smooth caramel ice cream with swirls of sea salt',
    price: 22.99,
    category: 'ice-cream',
    image: 'https://images.unsplash.com/photo-1561230101-2c841778f9ae?q=80',
    featured: false,
    flavors: ['Salted Caramel', 'Classic Caramel'],
    variants: ['Pint', 'Quart', 'Half Gallon'],
    type: 'Sweet',
    businessType: 'b2c',
    stock: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'rainbow-swirl',
    name: 'Rainbow Swirl',
    description: 'A colorful mix of fruity flavors in every scoop',
    price: 24.49,
    category: 'ice-cream',
    image: 'https://images.unsplash.com/photo-1664918642014-48f578e81c2b?q=80',
    featured: false,
    flavors: ['Mixed Berry', 'Tropical'],
    variants: ['Pint', 'Quart'],
    type: 'Fruity',
    businessType: 'b2c',
    stock: 35,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    slug: 'strawberry-bliss-pops',
    name: 'Strawberry Bliss Pops',
    description: 'Fresh strawberry popsicles made with real fruit',
    price: 10.99,
    category: 'popsicle',
    image: '/photos/Popsicles 2026-04-06 at 9.39.38 PM (1).jpeg',
    featured: true,
    flavors: ['Strawberry'],
    variants: ['6-pack', '12-pack', '24-pack'],
    type: 'Fruity',
    businessType: 'b2c',
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    slug: 'mango-tango-pops',
    name: 'Mango Tango Pops',
    description: 'Tropical mango popsicles bursting with flavour',
    price: 10.99,
    category: 'popsicle',
    image: '/photos/Popsicles (2) 2026-04-06 at 9.39.38 PM.jpeg',
    featured: true,
    flavors: ['Mango'],
    variants: ['6-pack', '12-pack', '24-pack'],
    type: 'Tropical',
    businessType: 'b2c',
    stock: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    slug: 'berry-mix-collection',
    name: 'Berry Mix Collection',
    description: 'Assorted berry flavours in every pack',
    price: 12.99,
    category: 'popsicle',
    image: '/photos/Popsicles (3) 2026-04-06 at 9.39.39 PM (1).jpeg',
    featured: false,
    flavors: ['Mixed Berry', 'Blueberry', 'Raspberry'],
    variants: ['6-pack', '12-pack'],
    type: 'Healthy',
    businessType: 'b2c',
    stock: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    slug: 'rainbow-party-pack',
    name: 'Rainbow Party Pack',
    description: 'Colourful assorted popsicles perfect for parties',
    price: 18.49,
    category: 'popsicle',
    image: '/photos/Popsicles (4)  2026-04-06 at 9.39.39 PM.jpeg',
    featured: true,
    flavors: ['Assorted'],
    variants: ['12-pack', '24-pack', '48-pack'],
    type: 'Party',
    businessType: 'b2c',
    stock: 70,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sip-1',
    slug: 'sipup-tropical',
    name: 'SipUp Tropical Blast',
    description: 'Refreshing tropical fruit blend in a portable sip-up pouch.',
    price: 5.99,
    category: 'sip-up',
    image: '/photos/SipUp 2026-04-06 at 9.39.39 PM (2).jpeg',
    featured: true,
    flavors: ['Mango-Pineapple'],
    variants: ['Single', 'Pack of 10'],
    type: 'Refreshing',
    businessType: 'b2c',
    stock: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sip-2',
    slug: 'sipup-berry',
    name: 'SipUp Mixed Berry',
    description: 'Sweet and tangy mixed berry flavors in an easy-to-carry pouch.',
    price: 5.99,
    category: 'sip-up',
    image: '/photos/SipUp (2) 2026-04-06 at 9.39.39 PM (3).jpeg',
    featured: true,
    flavors: ['Raspberry-Blueberry'],
    variants: ['Single', 'Pack of 10'],
    type: 'Fruity',
    businessType: 'b2c',
    stock: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    slug: 'commercial-ice-cream-freezer',
    name: 'Commercial Ice Cream Freezer',
    description: 'Professional-grade freezer with digital temperature control. Perfect for retail stores.',
    price: 9179.99,
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1758445037219-b991718b06a6?q=80',
    featured: true,
    variants: ['Small (4ft)', 'Medium (6ft)', 'Large (8ft)'],
    type: 'Freezer',
    businessType: 'b2b',
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    slug: 'mobile-ice-cream-cart',
    name: 'Mobile Ice Cream Cart',
    description: 'Portable ice cream cart with built-in freezer. Start your mobile business today!',
    price: 4769.99,
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1768634404737-67cc7c22a05f?q=80',
    featured: true,
    variants: ['Standard', 'Premium', 'Deluxe'],
    type: 'Cart',
    businessType: 'b2b',
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    slug: 'mashbere-kiosk-v1',
    name: 'Standard Mashbere Kiosk',
    description: 'Our signature compact kiosk setup with high-visibility branding.',
    price: 15499.99,
    category: 'equipment',
    image: '/photos/kiosk 2026-04-06 at 10.08.13 PM.jpeg',
    featured: true,
    variants: ['Compact', 'Standard'],
    type: 'Kiosk',
    businessType: 'b2b',
    stock: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '13',
    slug: 'mashbere-kiosk-v2',
    name: 'Deluxe Exhibition Kiosk',
    description: 'Large scale kiosk with premium finishing, internal LED lighting and dual display units.',
    price: 24999.99,
    category: 'equipment',
    image: '/photos/kiosk 2 2026-04-06 at 10.08.13 PM.jpeg',
    featured: true,
    variants: ['Premium'],
    type: 'Kiosk',
    businessType: 'b2b',
    stock: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '14',
    slug: 'mashbere-mobile-unit',
    name: 'Mashbere Mobile Express',
    description: 'Small, agile mobile unit perfect for events and pop-up locations.',
    price: 12999.99,
    category: 'equipment',
    image: '/photos/kiosk 3 2026-04-06 at 10.08.14 PM.jpeg',
    featured: true,
    variants: ['Basic', 'Event Kit'],
    type: 'Mobile Unit',
    businessType: 'b2b',
    stock: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * ProductService (Server)
 *
 * Handles direct database access.
 * Marked with 'server-only' to prevent accidental use in Client Components.
 */
export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    // In production, this would be:
    // const client = await clientPromise;
    // const db = client.db('icedream');
    // return db.collection<Product>('products').find({}).toArray();
    return SEED_PRODUCTS;
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getAllProducts();
    return products.find(p => p.slug === slug) ?? null;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const products = await this.getAllProducts();
    return products.find(p => p.id === id) ?? null;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(p => p.featured);
  }

  static async getProductsByCategory(category: Category): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(p => p.category === category);
  }

  static async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    const product = await this.getProductById(productId);
    if (!product) return [];

    const products = await this.getAllProducts();
    return products
      .filter(p => p.category === product.category && p.id !== productId)
      .slice(0, limit);
  }
}
