import './globals.css';
import { Inter, Bebas_Neue } from 'next/font/google';
import Script from 'next/script';
import ClientProviders from '@/components/shared/ClientProviders';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const bebas = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com'),
  title: 'Mashbere | Wholesale Ice Cream, Pookees, Popsicles & Kiosks in UAE',
  description: 'Mashbere is the top wholesale supplier for premium artisanal ice cream, pookees, popsicles, and ice cream kiosks in the UAE. Partner with us for high-margin frozen treats.',
  keywords: [
    'wholesale ice cream UAE',
    'ice cream supplier Dubai',
    'popsicle supplier UAE',
    'pookees UAE',
    'ice cream kiosk UAE',
    'frozen desserts wholesale UAE',
    'Mashbere',
    'Jamees Food UAE',
    'artisan ice cream Dubai',
    'premium ice cream supplier UAE',
    'ice glass UAE',
    'sipup UAE',
    'kiosk solution UAE',
  ],
  icons: {
    icon: '/photos/mashbere icon.png',
  },
  verification: {
    google: 'rMZnh5V9v9sYih5zJb5-gklsLpRSSKeZLfBY-g5L4TQ',
  },
  openGraph: {
    title: 'Mashbere | Wholesale Ice Cream, Pookees, Popsicles & Kiosks in UAE',
    description: 'Mashbere is the top wholesale supplier for premium artisanal ice cream, pookees, popsicles, and ice cream kiosks in the UAE. Partner with us for high-margin frozen treats.',
    url: 'https://mashbere.com',
    siteName: 'Mashbere',
    images: [
      {
        url: '/photos/green_hero_splash.webp',
        width: 1200,
        height: 630,
        alt: 'Mashbere Premium Ice Cream & Equipment',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mashbere | Wholesale Ice Cream, Pookees, Popsicles & Kiosks in UAE',
    description: 'Mashbere is the top wholesale supplier for premium artisanal ice cream, pookees, popsicles, and ice cream kiosks in the UAE.',
    images: ['/photos/green_hero_splash.webp'],
  },
};

export const viewport = {
  themeColor: '#ffffff',
  colorScheme: 'only light',
};

// JSON-LD Organization Schema for Brand Authority
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mashbere",
  "url": "https://mashbere.com",
  "logo": "https://mashbere.com/photos/mashbere_logo_no_bg.webp",
  "description": "Premium artisanal frozen delights, pookees, popsicles, and wholesale B2B ice cream kiosks in the UAE.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "UAE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971-50-299-4974",
    "contactType": "customer service",
    "email": "info@Jameesfood.com",
    "areaServed": "AE",
    "availableLanguage": ["English", "Arabic"]
  },
  "sameAs": [
    "https://www.instagram.com/mashbere.ae",
    "https://www.facebook.com/share/1JTDeNX7H1/"
  ]
};

// JSON-LD LocalBusiness Schema for Local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Mashbere",
  "image": "https://mashbere.com/photos/mashbere_logo_no_bg.webp",
  "url": "https://mashbere.com",
  "telephone": "+971-50-299-4974",
  "email": "info@Jameesfood.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2048,
    "longitude": 55.2708
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "description": "Wholesale supplier of premium artisanal ice cream, pookees, popsicles, and ice cream kiosks in the UAE.",
  "servesCuisine": "Ice Cream, Frozen Desserts",
  "priceRange": "$$",
  "hasMap": "https://maps.google.com/?q=Dubai,UAE",
  "sameAs": [
    "https://www.instagram.com/mashbere.ae",
    "https://www.facebook.com/share/1JTDeNX7H1/"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} font-sans`}>
        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
