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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} font-sans`}>
        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
