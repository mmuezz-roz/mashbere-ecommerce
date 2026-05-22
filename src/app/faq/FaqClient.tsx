'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  ChevronDown, 
  HelpCircle, 
  MessageCircle,
  Truck,
  Leaf,
  Calendar,
  CreditCard,
  Plus,
  Minus
} from 'lucide-react';

// ─── Data & Types ────────────────────────────────────────────────────────────

interface FaqItem {
  id: string;
  category: 'delivery' | 'products' | 'catering' | 'payment';
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  // 1. Delivery
  {
    id: 'd1',
    category: 'delivery',
    question: 'How do you prevent the ice cream and popsicles from melting during delivery?',
    answer: 'We utilize a specialized "Zero-Melt Protocol." All orders are packed inside thick, heavy-duty Expanded Polystyrene (EPS) thermal boxes loaded with industrial-grade solid dry ice pellets at -78.5°C. This creates a dense, freezing carbon dioxide gas layer that seals in the sub-zero temperature, keeping your treats rock-solid for up to 24 hours. Additionally, our delivery fleet consists of temperature-controlled refrigerated vans.'
  },
  {
    id: 'd2',
    category: 'delivery',
    question: 'Do you deliver to all Emirates in the UAE?',
    answer: 'Yes! We deliver across all seven Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Dubai and Sharjah receive daily deliveries. Other Emirates are serviced on scheduled weekly routes (e.g., Abu Dhabi is Mon/Wed/Sat). You can view the exact schedule for your area on our Cold-Chain Delivery page.'
  },
  {
    id: 'd3',
    category: 'delivery',
    question: 'What is your minimum order size for free shipping?',
    answer: 'The minimum spend threshold for free shipping varies slightly by location. For Dubai and Sharjah, delivery is free for orders above 150 AED (otherwise a 20 AED fee applies). For Abu Dhabi and Ajman, free delivery starts at 180 AED. For Ras Al Khaimah, Fujairah, and Umm Al Quwain, free delivery is available for orders above 200 AED.'
  },
  {
    id: 'd4',
    category: 'delivery',
    question: 'Can I schedule a specific time for my delivery?',
    answer: 'Yes, during checkout you can select a preferred date and delivery window (e.g., Morning 9 AM - 1 PM or Evening 3 PM - 7 PM). For urgent requests, high-profile events, or same-day express delivery, you can contact our logistics team directly via WhatsApp to coordinate.'
  },

  // 2. Products
  {
    id: 'p1',
    category: 'products',
    question: 'Are your popsicles and ice cream vegan and gluten-free?',
    answer: 'Many of our flavors are 100% vegan and gluten-free! All of our fruit-based popsicles (like Alphonso Mango, Wild Strawberry, and Pink Guava Chilli) are made with 100% natural fruit pulp, water, and organic cane sugar, making them dairy-free, vegan, and gluten-free. Creamy flavors like Pistachio, Chocolate, and Chikku contain fresh dairy milk and cream but remain fully gluten-free. You can review all details on our Dietary & Allergen Guide.'
  },
  {
    id: 'p2',
    category: 'products',
    question: 'Do you use artificial colors, preservatives, or chemical emulsifiers?',
    answer: 'Absolutely not. Mashbere stands for a "Clean Label Guarantee." We believe in pure artisanal quality. The colors of our popsicles come 100% from the real fruit pulp we extract. We use zero synthetic colorants, zero hydrogenated fats, zero synthetic esters, and zero chemical binders. Our ingredients list is simple, transparent, and wholesome.'
  },
  {
    id: 'p3',
    category: 'products',
    question: 'How long can I store the popsicles in my home freezer?',
    answer: 'When stored in a standard home freezer at -18°C or colder, our popsicles and ice cream maintain their premium freshness, texture, and flavor profile for up to 6 months. Keep them securely inside their original packaging to protect them from freezer burn.'
  },
  {
    id: 'p4',
    category: 'products',
    question: 'What is a "SipUp" and how does it work?',
    answer: 'Our SipUp products are premium, pre-packed hygienic ice cups (ice glasses) loaded with pristine, double-filtered ice. They are engineered for cafes, juice bars, beach clubs, and convenience stores to offer cold drinks instantly with absolute hygiene compliance. Just peel the top protective seal, pour in your beverage, and serve!'
  },

  // 3. Catering & Customizations
  {
    id: 'c1',
    category: 'catering',
    question: 'Do you offer catering services for private parties, birthdays, or weddings?',
    answer: 'Yes! We provide premium catering solutions across the UAE. We can deploy our beautiful signature mobile kiosk carts, complete with professional attendants, dry ice effects, and customized menus. It is a highly popular, visually stunning dessert feature for weddings, corporate events, birthday parties, and school celebrations.'
  },
  {
    id: 'c2',
    category: 'catering',
    question: 'Can we customize the popsicle flavors, shapes, or branding for corporate events?',
    answer: 'Yes, we specialize in high-end brand activations and corporate customization! We can formulate custom colors matching your brand palette using natural superfoods, embed custom embossings, print custom branded sticks (laser-engraved logos), and design fully branded outer sleeves. Please coordinate with our B2B team via the inquiry form on our Commercial page or directly on WhatsApp.'
  },
  {
    id: 'c3',
    category: 'catering',
    question: 'What is the minimum quantity and lead time required for custom B2B catering?',
    answer: 'For custom branding (sticks/sleeves) and bespoke colors, the minimum order is typically 200 bars with a lead time of 7-10 business days. For standard catering packages using our regular premium catalog, bookings can be finalized up to 48 hours in advance, subject to kiosk availability.'
  },

  // 4. Payments & B2B Wholesale
  {
    id: 'm1',
    category: 'payment',
    question: 'What payment methods do you accept online?',
    answer: 'We accept all major international credit and debit cards (Visa, Mastercard, American Express), Apple Pay, and secure online transfers. All transactions are fully encrypted through our premium, secure payment gateway.'
  },
  {
    id: 'm2',
    category: 'payment',
    question: 'Do you offer Cash on Delivery (COD) or Card on Delivery?',
    answer: 'To ensure a smooth, contactless, and optimized cold-chain route delivery, we prioritize online pre-payment. However, select residential zones can select Card on Delivery (using mobile POS terminal) during checkout. Cash on Delivery is restricted to retail B2B accounts with established credit terms.'
  },
  {
    id: 'm3',
    category: 'payment',
    question: 'How do I open a wholesale commercial account for my cafe or F&B group?',
    answer: 'If you are an F&B business owner, cafe manager, or hotel group in the UAE, you can register a commercial account. We offer special B2B wholesale pricing, regular scheduled delivery routes, and custom commercial freezer equipment solutions. Fill out the form on our "For Business" page, and our corporate F&B relations manager will reach out within 24 hours.'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Questions', icon: HelpCircle },
  { id: 'delivery', name: 'Orders & Delivery', icon: Truck },
  { id: 'products', name: 'Ingredients & Quality', icon: Leaf },
  { id: 'catering', name: 'Catering & Events', icon: Calendar },
  { id: 'payment', name: 'Payments & Business', icon: CreditCard }
];

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

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    if (openAccordionId === id) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(id);
    }
  };

  // Filter FAQs based on category AND search input query
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategory === 'all') {
        return matchesSearch;
      } else {
        return matchesSearch && item.category === activeCategory;
      }
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#FDFCFD] text-[#141A0B] overflow-x-hidden min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 bg-[#141A0B] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C4EB54_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C4EB54]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-responsive relative z-10">
          <div className="max-w-4xl space-y-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 bg-[#C4EB54]/10 border border-[#C4EB54]/20 px-4 py-2 rounded-full text-[#C4EB54] font-black text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Mashbere Customer Support</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl">
                How Can We<br />
                <span className="text-[#C4EB54]">Help You?</span>
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2} className="max-w-xl">
              <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed">
                Got questions about dry ice safety, deliveries in your Emirate, catering parameters, or wholesale pricing? Find quick answers here or chat with us.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC CONTROLS (SEARCH & CATEGORIES) */}
      <section className="py-10 bg-[#F7F7F5] border-y border-gray-100 sticky top-16 sm:top-20 z-40 backdrop-blur-md bg-opacity-95">
        <div className="container-responsive space-y-6">
          
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            {/* Category selection Tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenAccordionId(null);
                    }}
                    className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#141A0B] text-white shadow-md'
                        : 'bg-white border border-gray-100 text-gray-500 hover:text-[#141A0B] hover:border-gray-200'
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Search Box */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Type your question here..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenAccordionId(null);
                }}
                className="w-full bg-white border border-gray-100 rounded-full py-3.5 pl-11 pr-6 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. FAQ ACCORDION LIST */}
      <section className="py-16 sm:py-24">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            
            <AnimatePresence mode="wait">
              {filteredFaqs.length > 0 ? (
                <motion.div 
                  layout
                  className="space-y-4"
                >
                  {filteredFaqs.map((item, i) => {
                    const isOpen = openAccordionId === item.id;
                    return (
                      <motion.div
                        layout
                        key={item.id}
                        className="bg-white border border-gray-100 rounded-[24px] overflow-hidden hover:border-gray-200/80 transition-all duration-300 shadow-md shadow-gray-50/50"
                      >
                        {/* Header trigger */}
                        <button
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-6 hover:bg-gray-50/30 transition-all group"
                        >
                          <h3 className="font-black text-sm sm:text-base text-gray-900 uppercase tracking-tight leading-snug group-hover:text-primary transition-colors">
                            {item.question}
                          </h3>
                          <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#C4EB54]/10 group-hover:text-primary flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#C4EB54]/10 text-primary' : ''}`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {/* Dropdown Answer Content */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 sm:px-8 pb-6 text-gray-500 font-medium text-xs sm:text-sm leading-relaxed border-t border-gray-50 pt-4">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

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
                  <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-black text-lg uppercase tracking-tight text-gray-900 mb-1">No Match Found</h3>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto">
                    Try searching for different keywords or select another category to view related support issues.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* 4. CHAT WITH LOGISTICS CTA */}
      <section className="pb-20 sm:pb-28">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <FadeUp>
              <div className="bg-[#141A0B] text-white p-8 sm:p-12 rounded-[40px] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
                
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C4EB54]/5 rounded-full blur-[80px] -z-10" />

                <div className="space-y-3 max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-[#C4EB54]/15 px-3 py-1 rounded-full text-[#C4EB54] font-black text-[9px] uppercase tracking-widest">
                    <span>Instant Support</span>
                  </div>
                  <h2 className="font-display uppercase text-2xl sm:text-3xl text-white">
                    Still have questions?
                  </h2>
                  <p className="text-white/60 font-medium text-xs sm:text-sm leading-relaxed">
                    Our gourmet customer relations and logistics dispatch team are ready to answer your inquiries live on WhatsApp.
                  </p>
                </div>

                <a
                  href="https://wa.me/971502994974?text=Hello%20Mashbere!%20I%20have%20an%20inquiry%20about%20ordering%20premium%20frozen%20treats."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto bg-[#C4EB54] text-[#141A0B] px-8 py-4.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 shrink-0"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Chat on WhatsApp
                </a>

              </div>
            </FadeUp>
          </div>
        </div>
      </section>

    </div>
  );
}
