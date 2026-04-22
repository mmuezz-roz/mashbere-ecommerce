'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Share2, ArrowLeft, Check, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || '');
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || '');
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const isEquipment = product.category === 'equipment';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Breadcrumb & Navigation */}
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link href="/products" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Catalog
        </Link>
        <span className="text-gray-200">/</span>
        <span className="text-gray-900 capitalize">{product.category.replace('-', ' ')}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
        {/* Visual Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 shadow-2xl max-h-[70vw] sm:max-h-none"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover select-none"
          />
          <AnimatePresence>
            {product.featured && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-8 left-8 bg-white/90 backdrop-blur-md text-primary font-black px-6 py-2 rounded-full shadow-lg text-sm uppercase tracking-tighter"
              >
                Signature selection
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Product Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">(120+ Reviews)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-none">
            {product.name}
          </h1>

          <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-primary to-[#8ba145] bg-clip-text text-transparent mb-6 sm:mb-8">
            AED {product.price.toFixed(2)}
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-6 sm:mb-10 leading-relaxed max-w-xl">
            {product.description}
          </p>

          <div className="space-y-5 sm:space-y-8 mb-8 sm:mb-12">
            {/* Configuration Options */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Select Flavor</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(flavor => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                        selectedFlavor === flavor
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-100 hover:border-primary/20 bg-white text-gray-600'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Choose Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                        selectedVariant === variant
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-100 hover:border-primary/20 bg-white text-gray-600'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isEquipment && (
              <div className="flex items-center bg-gray-100 p-2 rounded-2xl w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl hover:bg-white hover:shadow-sm transition-all flex items-center justify-center font-bold text-xl"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl hover:bg-white hover:shadow-sm transition-all flex items-center justify-center font-bold text-xl"
                >
                  +
                </button>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`flex-1 py-4 sm:py-5 px-6 sm:px-8 rounded-2xl font-black text-sm sm:text-base lg:text-lg shadow-2xl transition-all flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-widest ${
                addedToCart 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-900 text-white hover:bg-primary hover:-translate-y-1 active:scale-95 shadow-gray-200'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-6 h-6" />
                  Successfully Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
