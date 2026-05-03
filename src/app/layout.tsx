import './globals.css';
import { Inter, Bebas_Neue } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'sonner';
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
  title: 'Mashbere | Premium Ice Cream & Equipment',
  description: 'Shop premium ice cream, popsicles and professional equipment at Mashbere.',
};

import { PageLoader } from '@/components/shared/PageLoader';
import ClickSpark from '@/components/ui/ClickSpark';
import SmoothScroll from '@/components/shared/SmoothScroll';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} font-sans`}>
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
