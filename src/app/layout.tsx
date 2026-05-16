import './globals.css';
import { Inter, Bebas_Neue } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'sonner';
import Script from 'next/script';
import ConditionalLayout from '@/components/shared/ConditionalLayout';

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
  title: 'Mashbere | Premium Ice Cream & Equipment',
  description: 'Shop premium ice cream, popsicles and professional equipment at Mashbere.',
  icons: {
    icon: '/photos/mashbere icon.png',
  },
  verification: {
    google: 'rMZnh5V9v9sYih5zJb5-gklsLpRSSKeZLfBY-g5L4TQ',
  },
  openGraph: {
    title: 'Mashbere | Premium Ice Cream & Equipment',
    description: 'Shop premium ice cream, popsicles and professional equipment at Mashbere.',
    url: 'https://mashbere.com',
    siteName: 'Mashbere',
    images: [
      {
        url: '/photos/green_hero_splash.png',
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
    title: 'Mashbere | Premium Ice Cream & Equipment',
    description: 'Shop premium ice cream, popsicles and professional equipment at Mashbere.',
    images: ['/photos/green_hero_splash.png'],
  },
};

// JSON-LD Organization Schema for Brand Authority
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mashbere",
  "url": "https://mashbere.com",
  "logo": "https://mashbere.com/photos/mashbere_logo_no_bg.png",
  "description": "Premium artisanal frozen delights and professional B2B ice cream equipment in the UAE.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "UAE"
  },
  "sameAs": [
    "https://www.instagram.com/mashbere.ae",
    "https://www.facebook.com/share/1JTDeNX7H1/"
  ]
};

import { PageLoader } from '@/components/shared/PageLoader';
import ClickSpark from '@/components/ui/ClickSpark';
import SmoothScroll from '@/components/shared/SmoothScroll';

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
        <PageLoader />
        <CartProvider>
          <ClickSpark sparkColor="#C4EB54" sparkSize={12} sparkRadius={20} sparkCount={10} duration={600} extraScale={1.2}>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ClickSpark>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
