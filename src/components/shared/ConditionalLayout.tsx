'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import SmoothScroll from '@/components/shared/SmoothScroll';
import ScrollProgress from '@/components/shared/ScrollProgress';
import { Suspense } from 'react';

// Dynamically import WhatsAppWidget client-side only to avoid hydration mismatch
// (uses localStorage + scroll listeners that differ between SSR and client)
const WhatsAppWidget = dynamic(() => import('@/components/shared/WhatsAppWidget'), { ssr: false });

const AUTH_ROUTES = ['/auth/login', '/auth/register', '/auth/forgot-password'];
// Admin panel uses its own layout — exclude from public Header/Footer
const ADMIN_ROUTES = ['/admin'];

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminPage = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <ScrollProgress />
        <Suspense fallback={<div className="h-20" />}>
          <Header />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />

        <WhatsAppWidget />
      </div>
    </SmoothScroll>
  );
}
