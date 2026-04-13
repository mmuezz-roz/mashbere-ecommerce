'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFCFD] flex items-center justify-center pt-32 sm:pt-40">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-display uppercase mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 font-medium">
            Discover our premium selection of artisanal treats and begin your culinary journey.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#141A0B] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#708238] transform hover:scale-105 transition-all shadow-xl shadow-[#141A0B]/20"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display mb-12 uppercase tracking-tighter">
          Shopping <span className="text-primary">Cart</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedVariant}`}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 truncate">
                          {item.name}
                        </h3>
                        {item.selectedVariant && (
                          <p className="text-sm text-gray-600">
                            Size: {item.selectedVariant}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-pink-500 transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-pink-500 transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-black text-xl text-gray-900">
                          AED {(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-gray-500">
                            AED {item.price.toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>AED {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>AED {(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-black text-2xl text-primary">
                    AED {(getCartTotal() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[#141A0B] text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#708238] shadow-2xl shadow-[#141A0B]/20 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/products"
                className="w-full text-center text-gray-400 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors block py-2"
              >
                Continue Shopping
              </Link>

              {/* Promo Badge */}
              <div className="mt-8 p-6 bg-primary/5 rounded-[32px] border border-primary/10">
                <p className="text-xs text-center font-black tracking-widest uppercase text-primary">
                  🎉 Premium Express Shipping Applied
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
