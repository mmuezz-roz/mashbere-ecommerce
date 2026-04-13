import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-8">
        <ShoppingBag className="w-12 h-12 text-pink-500" />
      </div>
      <h1 className="text-4xl font-black mb-4">Melted Away!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved. Let's get you back to something delicious.
      </p>
      <Link
        href="/"
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
