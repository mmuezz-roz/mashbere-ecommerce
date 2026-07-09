'use client';

/**
 * ClientProviders.tsx
 *
 * A client-boundary wrapper that safely loads browser-only components
 * using dynamic imports with `ssr: false`. This pattern is required in
 * Next.js 15 because `ssr: false` is forbidden inside Server Components.
 *
 * layout.tsx (Server Component) → ClientProviders (Client Component) →
 *   dynamic ClickSpark + PageLoader (client-only, no SSR)
 */

import dynamic from 'next/dynamic';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'sonner';
import ConditionalLayout from '@/components/shared/ConditionalLayout';

// Browser-only components — only rendered on the client to avoid hydration
// mismatches caused by canvas, requestAnimationFrame, ResizeObserver, etc.
const ClickSpark = dynamic(() => import('@/components/ui/ClickSpark'), {
  ssr: false,
  loading: () => <>{/* nothing while loading */}</>,
});

const PageLoader = dynamic(
  () => import('@/components/shared/PageLoader').then((m) => m.PageLoader),
  { ssr: false }
);

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageLoader />
      <CartProvider>
        <ClickSpark
          sparkColor="#C4EB54"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={10}
          duration={600}
          extraScale={1.2}
        >
          <ConditionalLayout>{children}</ConditionalLayout>
        </ClickSpark>
        <Toaster position="top-center" richColors />
      </CartProvider>
    </>
  );
}
