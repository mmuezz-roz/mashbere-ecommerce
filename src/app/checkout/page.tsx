'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Construction, Clock, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Checkout() {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFCFD] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        {/* Navigation back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        <div className="bg-white rounded-[40px] p-8 sm:p-16 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] border border-gray-50 text-center relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C4EB54] via-[#708238] to-[#C4EB54]" />
          
          <div className="w-24 h-24 bg-[#f4f6ef] rounded-[32px] flex items-center justify-center mx-auto mb-8 transform -rotate-12 shadow-sm">
            <Construction className="w-12 h-12 text-[#708238]" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight mb-6 leading-tight">
            Our Delivery System is <span className="text-[#708238]">Chilling</span>
          </h1>

          <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
            We're currently perfecting our premium logistics network to ensure your treats arrive in perfect temperature. 
            <strong> Online ordering and delivery are temporary unavailable.</strong>
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-[#f4f6ef] p-6 rounded-[24px] text-left">
              <Clock className="w-6 h-6 text-[#708238] mb-3" />
              <h3 className="font-black uppercase text-xs tracking-widest mb-1">Coming Soon</h3>
              <p className="text-sm text-gray-500 font-medium tracking-tight">Full UAE-wide delivery starting Q3 2026.</p>
            </div>
            <div className="bg-[#f4f6ef] p-6 rounded-[24px] text-left">
              <Mail className="w-6 h-6 text-[#708238] mb-3" />
              <h3 className="font-black uppercase text-xs tracking-widest mb-1">Stay Notified</h3>
              <p className="text-sm text-gray-500 font-medium tracking-tight">Follow us on social media for launch updates.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[#141A0B] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#708238] transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              Keep Exploring
            </Link>
            <button
              onClick={() => router.push('/')}
              className="bg-white border-2 border-gray-100 text-gray-600 px-10 py-5 rounded-full font-black uppercase tracking-widest hover:border-[#708238] hover:text-[#708238] transition-all"
            >
              Back to Home
            </button>
          </div>

          {/* Social Links placeholder */}
          <div className="mt-12 pt-8 border-t border-gray-50 flex justify-center gap-6">
            {['Instagram', 'Facebook', 'TikTok'].map(platform => (
              <span key={platform} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
