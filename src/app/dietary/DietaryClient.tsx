'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Check, 
  Info, 
  ArrowRight,
  TrendingDown,
  Heart,
  Shield,
  Layers,
  Leaf,
  ChevronDown
} from 'lucide-react';

// ─── Data & Types ────────────────────────────────────────────────────────────

interface ProductDietaryInfo {
  id: string;
  name: string;
  category: 'popsicle' | 'ice-cream' | 'sip-up';
  image: string;
  bgColor: string;
  textColor: string;
  slug: string;
  shortDesc: string;
  tags: string[]; // e.g. ["Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"]
  ingredients: string;
  nutritionalValue: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber?: string;
  };
  allergens: string[];
}

const DIETARY_PRODUCTS: ProductDietaryInfo[] = [
  {
    id: 'mango',
    name: 'Alphonso Mango Popsicle',
    category: 'popsicle',
    image: '/photos/mango popsicle.webp',
    bgColor: '#FEF3C7',
    textColor: '#92400E',
    slug: 'mango',
    shortDesc: 'Sun-ripened Alphonso mangoes blended into a smooth, golden tropical delight.',
    tags: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Calorie'],
    ingredients: 'Fresh Alphonso Mango Pulp (65%), Purified Water, Organic Cane Sugar, Citric Acid, Natural Citrus Pectin (Vegetable-derived Stabilizer).',
    nutritionalValue: {
      calories: 78,
      protein: '0.4g',
      carbs: '18.5g',
      fat: '0.1g',
      fiber: '1.2g'
    },
    allergens: []
  },
  {
    id: 'strawberry',
    name: 'Wild Strawberry Popsicle',
    category: 'popsicle',
    image: '/photos/strawberry-popsicle.webp',
    bgColor: '#FDF2F2',
    textColor: '#9B1C1C',
    slug: 'strawberry',
    shortDesc: 'Bursting with the flavor of sun-ripened organic strawberries and natural fruit chunks.',
    tags: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Calorie'],
    ingredients: 'Organic Strawberry Pulp & Chunks (60%), Purified Water, Organic Cane Sugar, Citric Acid, Pectin, Elderberry Extract (for natural red hue).',
    nutritionalValue: {
      calories: 72,
      protein: '0.5g',
      carbs: '17.2g',
      fat: '0.1g',
      fiber: '1.6g'
    },
    allergens: []
  },
  {
    id: 'tender-coconut',
    name: 'Tender Coconut Popsicle',
    category: 'popsicle',
    image: '/photos/tender og popsicle.webp',
    bgColor: '#E7F3F3',
    textColor: '#1E3D3D',
    slug: 'tender-coconut',
    shortDesc: 'Crafted with 100% real coconut water and tender pulp for a refreshing island escape.',
    tags: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'],
    ingredients: '100% Pure Tender Coconut Water (50%), Tender Coconut Meat pieces (25%), Purified Water, Organic Cane Sugar, Pectin.',
    nutritionalValue: {
      calories: 85,
      protein: '0.7g',
      carbs: '19.1g',
      fat: '0.8g',
      fiber: '1.1g'
    },
    // Coconut is technically a drupe, but classified as tree nut by US FDA. We mark it.
    allergens: ['Coconut']
  },
  {
    id: 'chikku',
    name: 'Artisanal Chikku Popsicle',
    category: 'popsicle',
    image: '/photos/ChatGPT_Image_Apr_30__2026__05_31_32_PM-removebg-preview.webp',
    bgColor: '#F3F0DA',
    textColor: '#4D461F',
    slug: 'chikku',
    shortDesc: 'The unique, malty sweetness of farm-fresh Sapota (Chikku) in every creamy bite.',
    tags: ['Gluten-Free', 'Nut-Free', 'Vegetarian'],
    ingredients: 'Fresh Sapota (Chikku) Fruit Pulp (55%), Local Organic Milk, Fresh Cream, Cane Sugar, Natural Plant Stabilizers.',
    nutritionalValue: {
      calories: 112,
      protein: '1.8g',
      carbs: '22.0g',
      fat: '2.5g',
      fiber: '0.9g'
    },
    allergens: ['Milk']
  },
  {
    id: 'pistachio',
    name: 'Bronte Pistachio Popsicle',
    category: 'popsicle',
    image: '/photos/pistachio-popsicle.webp',
    bgColor: '#EAF3DA',
    textColor: '#2D361C',
    slug: 'pistachio',
    shortDesc: 'Roasted premium pistachios from Bronte, Sicily, providing an unmatched earthy richness.',
    tags: ['Gluten-Free', 'Vegetarian'],
    ingredients: 'Bronte Sicilian Pistachio Paste (20%), Roasted Chopped Pistachios (5%), Fresh Whole Milk, Organic Double Cream, Raw Cane Sugar, Natural Plant Stabilizers.',
    nutritionalValue: {
      calories: 145,
      protein: '3.2g',
      carbs: '18.0g',
      fat: '6.8g',
      fiber: '1.4g'
    },
    allergens: ['Nuts (Pistachio)', 'Milk']
  },
  {
    id: 'chocolate',
    name: 'Belgian Dark Chocolate Popsicle',
    category: 'popsicle',
    image: '/photos/chocolate-popsicle.webp',
    bgColor: '#F5E6DA',
    textColor: '#4A2C10',
    slug: 'chocolate',
    shortDesc: 'Pure Belgian cocoa blended with organic cream for a velvety, dark chocolate experience.',
    tags: ['Gluten-Free', 'Nut-Free', 'Vegetarian'],
    ingredients: 'Premium Belgian Dark Cocoa Paste (70% cocoa solids), Fresh Cow Whole Milk, Fresh Cream, Raw Cane Sugar, Natural Cocoa Butter, Organic Vanilla Bean Extract.',
    nutritionalValue: {
      calories: 130,
      protein: '2.5g',
      carbs: '15.5g',
      fat: '5.2g',
      fiber: '2.0g'
    },
    allergens: ['Milk']
  },
  {
    id: 'guava',
    name: 'Pink Guava Chilli Popsicle',
    category: 'popsicle',
    image: '/photos/guava-popsicle.webp',
    bgColor: '#FDF2F8',
    textColor: '#9D174D',
    slug: 'guava',
    shortDesc: 'The exotic, sweet and tangy flavor of pink guava with a touch of spicy chilli salt.',
    tags: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Calorie'],
    ingredients: 'Natural Pink Guava Pulp (62%), Purified Water, Cane Sugar, Red Chilli Powder, Pink Himalayan Salt, Organic Citrus Pectin.',
    nutritionalValue: {
      calories: 65,
      protein: '0.3g',
      carbs: '15.0g',
      fat: '0.1g',
      fiber: '1.8g'
    },
    allergens: []
  }
];

const DIETARY_TAGS = ['All', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Calorie'];

// ─── Animation Helper ────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DietaryClient() {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Dynamic filtering logic
  const filteredProducts = useMemo(() => {
    return DIETARY_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedTag === 'All') {
        return matchesSearch;
      } else {
        return matchesSearch && product.tags.includes(selectedTag);
      }
    });
  }, [selectedTag, searchQuery]);

  const toggleExpandCard = (id: string) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

  return (
    <div className="bg-[#FDFCFD] text-[#141A0B] overflow-x-hidden min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 bg-[#141A0B] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C4EB54_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C4EB54]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-responsive relative z-10">
          <div className="max-w-4xl space-y-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 bg-[#C4EB54]/10 border border-[#C4EB54]/20 px-4 py-2 rounded-full text-[#C4EB54] font-black text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>100% Clean Label Guarantee</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl">
                Pure Ingredients.<br />
                <span className="text-[#C4EB54]">Clean Craft.</span>
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2} className="max-w-2xl">
              <p className="text-white/60 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                At Mashbere, we believe in complete transparency. Our frozen treats are made with zero artificial colors, hydrogenated fats, or synthetic preservatives. Filter below to discover treats matching your lifestyle.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC SEARCH AND FILTER CONTROLS */}
      <section className="py-10 bg-[#F7F7F5] border-y border-gray-100 sticky top-16 sm:top-20 z-40 backdrop-blur-md bg-opacity-95">
        <div className="container-responsive">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            
            {/* Tag Buttons list */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center lg:justify-start">
              {DIETARY_TAGS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setExpandedCardId(null);
                    }}
                    className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#141A0B] text-white shadow-md'
                        : 'bg-white border border-gray-100 text-gray-500 hover:text-[#141A0B] hover:border-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Search Input bar */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search ingredients or flavor..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setExpandedCardId(null);
                }}
                className="w-full bg-white border border-gray-100 rounded-full py-3.5 pl-11 pr-6 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCTS DIETARY LISTING GRID */}
      <section className="py-16 sm:py-24">
        <div className="container-responsive">
          
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {filteredProducts.map((product) => {
                  const isExpanded = expandedCardId === product.id;
                  
                  return (
                    <motion.div
                      layout
                      key={product.id}
                      className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-xl shadow-gray-100/30 hover:shadow-2xl hover:border-gray-200/50 transition-all duration-500 flex flex-col justify-between"
                    >
                      {/* Top main area */}
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          {/* Image container */}
                          <div 
                            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl flex-shrink-0 flex items-center justify-center p-3 overflow-hidden shadow-inner"
                            style={{ backgroundColor: product.bgColor }}
                          >
                            <Image 
                              src={product.image}
                              alt={product.name}
                              width={120}
                              height={120}
                              className="object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Text info */}
                          <div className="space-y-3 flex-1">
                            <div className="flex flex-wrap gap-1.5">
                              {product.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="px-2.5 py-0.5 rounded-full bg-gray-50 border border-gray-100 text-gray-400 font-bold text-[9px] uppercase tracking-wide"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <h3 className="font-display uppercase tracking-tight text-xl sm:text-2xl text-gray-900 leading-snug">
                              {product.name}
                            </h3>
                            
                            <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
                              {product.shortDesc}
                            </p>
                          </div>
                        </div>

                        {/* Collapsed/Expanded ingredients section */}
                        <div className="mt-6 border-t border-gray-50 pt-5">
                          <button
                            onClick={() => toggleExpandCard(product.id)}
                            className="w-full flex items-center justify-between font-black text-xs uppercase tracking-widest text-[#7E8D5F] hover:text-[#141A0B] transition-colors"
                          >
                            <span>Ingredients & Nutrition Facts</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                className="overflow-hidden space-y-5 pt-4"
                              >
                                {/* Ingredients */}
                                <div className="space-y-1.5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                  <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Full Ingredients List</h4>
                                  <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
                                    {product.ingredients}
                                  </p>
                                </div>

                                {/* Allergens */}
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Declared Allergens:</span>
                                  {product.allergens.length > 0 ? (
                                    product.allergens.map((allergen) => (
                                      <span key={allergen} className="bg-red-50 text-red-700 px-3 py-1 rounded-full font-bold text-xs border border-red-100">
                                        Contains {allergen}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="bg-green-50 text-[#7E8D5F] px-3 py-1 rounded-full font-bold text-xs border border-green-100">
                                      Allergen-Free
                                    </span>
                                  )}
                                </div>

                                {/* Nutritional Value Grid Table */}
                                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                                  <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>Nutrition Profile</span>
                                    <span>Per Bar (80ml)</span>
                                  </div>
                                  <div className="divide-y divide-gray-50 bg-white font-medium text-xs text-gray-600">
                                    <div className="px-4 py-2.5 flex justify-between">
                                      <span>Calories</span>
                                      <span className="font-bold text-gray-900">{product.nutritionalValue.calories} kcal</span>
                                    </div>
                                    <div className="px-4 py-2.5 flex justify-between">
                                      <span>Protein</span>
                                      <span className="font-bold text-gray-900">{product.nutritionalValue.protein}</span>
                                    </div>
                                    <div className="px-4 py-2.5 flex justify-between">
                                      <span>Carbohydrates</span>
                                      <span className="font-bold text-gray-900">{product.nutritionalValue.carbs}</span>
                                    </div>
                                    <div className="px-4 py-2.5 flex justify-between">
                                      <span>Fat</span>
                                      <span className="font-bold text-gray-900">{product.nutritionalValue.fat}</span>
                                    </div>
                                    {product.nutritionalValue.fiber && (
                                      <div className="px-4 py-2.5 flex justify-between">
                                        <span>Dietary Fiber</span>
                                        <span className="font-bold text-gray-900">{product.nutritionalValue.fiber}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Footer CTA */}
                      <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                        <span className="font-black text-xs uppercase tracking-widest text-gray-400">Handcrafted Popsicle</span>
                        <Link 
                          href={`/products/${product.slug}`}
                          className="group inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#141A0B] hover:text-[#7E8D5F] transition-colors"
                        >
                          <span>Explore Flavor</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-gray-50 rounded-[32px] border border-gray-100"
              >
                <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-black text-lg uppercase tracking-tight text-gray-900 mb-1">No Flavors Found</h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">
                  Try adjusting your search terms or filters to find standard treats matching your preference.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 4. THE CLEAN LABEL VALUES SYSTEM */}
      <section className="py-16 sm:py-24 bg-[#141A0B] text-white">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <FadeUp>
              <span className="text-[#C4EB54] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] block">Our Manifesto</span>
              <h2 className="font-display uppercase tracking-tighter leading-none text-4xl sm:text-5xl lg:text-6xl mt-2 text-white">
                What We Keep Out
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-white/60 text-sm sm:text-base font-medium">
                We believe that premium flavor comes from premium soil, orchards, and dairies—never from laboratory additives.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'No Artificial Colorants',
                desc: 'The vibrant pink of Guava and bright golden of Mango are 100% natural, derived purely from organic fruit pulp.',
                icon: Shield
              },
              {
                title: 'No Hydrogenated Fats',
                desc: 'We never add palm oils or cheap lipids. Our creaminess is authentic: organic cream, local dairy, or clean fruit pectin.',
                icon: TrendingDown
              },
              {
                title: 'No Synthetic Esters',
                desc: 'Our flavor profiles are pure: organic vanilla extract, authentic Sicilian pistachios, and fresh fruits—no chemical essences.',
                icon: Heart
              },
              {
                title: 'Zero Chemical Emulsifiers',
                desc: 'We rely on fresh natural binders like vegetable-derived citrus pectin to maintain solid sub-zero molecular structures.',
                icon: Layers
              }
            ].map((value, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[28px] space-y-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#C4EB54]/10 text-[#C4EB54] flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-sm uppercase tracking-tight text-white">{value.title}</h3>
                  <p className="text-white/50 font-medium text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DISCLAIMER */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto flex items-start gap-4">
            <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-900">Medical & Allergen Notice</h4>
              <p className="text-gray-400 font-medium text-[11px] sm:text-xs leading-relaxed">
                Mashbere premium facilities handle dairy, milk, tree nuts, and coconut. Although we apply strict clean-down procedures and absolute isolation steps between small-batch production schedules, minor trace molecules can occur. Customers with critical or life-threatening food allergies are advised to exercise cautious judgment.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
