'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Truck, 
  ThermometerSnowflake, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  ArrowRight,
  MessageCircle,
  AlertTriangle,
  FileText,
  Info
} from 'lucide-react';

// ─── Data & Types ────────────────────────────────────────────────────────────

interface EmirateInfo {
  id: string;
  name: string;
  arabicName: string;
  days: string;
  cutoff: string;
  fee: number;
  minFree: number;
  notes: string;
  daysList: number[]; // 0 = Sunday, 1 = Monday, etc.
}

const EMIRATES_DATA: EmirateInfo[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    arabicName: 'دبي',
    days: 'Daily Delivery',
    cutoff: '2:00 PM for Same-Day Delivery',
    fee: 20,
    minFree: 150,
    notes: 'Same-day delivery is available for all orders placed before 2:00 PM. Express 2-hour shipping is available for select zones at checkout.',
    daysList: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    arabicName: 'أبوظبي',
    days: 'Every Monday, Wednesday & Saturday',
    cutoff: '5:00 PM (Day Before Delivery)',
    fee: 25,
    minFree: 180,
    notes: 'Standard cold-chain routes cover all major city locations, including Yas Island, Saadiyat, and Khalifa City.',
    daysList: [1, 3, 6]
  },
  {
    id: 'sharjah',
    name: 'Sharjah',
    arabicName: 'الشارقة',
    days: 'Daily Delivery',
    cutoff: '12:00 PM for Same-Day Delivery',
    fee: 20,
    minFree: 150,
    notes: 'Same-day delivery covers central Sharjah, Al Majaz, and University City. Outer districts are scheduled for next-day delivery.',
    daysList: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'ajman',
    name: 'Ajman',
    arabicName: 'عجمان',
    days: 'Every Monday, Wednesday & Saturday',
    cutoff: '5:00 PM (Day Before Delivery)',
    fee: 25,
    minFree: 150,
    notes: 'Freshly packed orders delivered directly to your doorstep via refrigerated logistics.',
    daysList: [1, 3, 6]
  },
  {
    id: 'ras-al-khaimah',
    name: 'Ras Al Khaimah',
    arabicName: 'رأس الخيمة',
    days: 'Every Tuesday, Thursday & Sunday',
    cutoff: '5:00 PM (Day Before Delivery)',
    fee: 30,
    minFree: 200,
    notes: 'We deliver to all residential communities and resort hotels in RAK including Al Hamra and Marjan Island.',
    daysList: [0, 2, 4]
  },
  {
    id: 'fujairah',
    name: 'Fujairah',
    arabicName: 'الفجيرة',
    days: 'Every Tuesday & Saturday',
    cutoff: '5:00 PM (Day Before Delivery)',
    fee: 30,
    minFree: 200,
    notes: 'Secure temperature-controlled transport through the mountainous routes to keep your treats rock-solid.',
    daysList: [2, 6]
  },
  {
    id: 'umm-al-quwain',
    name: 'Umm Al Quwain',
    arabicName: 'أم القيوين',
    days: 'Every Monday & Thursday',
    cutoff: '5:00 PM (Day Before Delivery)',
    fee: 25,
    minFree: 150,
    notes: 'Reliable cold-chain transport for both home orders and coastal F&B businesses.',
    daysList: [1, 4]
  }
];

const PACKING_STEPS = [
  {
    title: 'Sub-Zero Insulation',
    desc: 'Products are packed inside thick, heavy-duty Expanded Polystyrene (EPS) thermal boxes that act as a solid heat shield.',
    icon: ThermometerSnowflake
  },
  {
    title: 'Dry Ice Solidification',
    desc: 'Each box is loaded with solid dry ice pellets at -78.5°C, creating a dense vapor layer that keeps treats frozen solid for up to 24 hours.',
    icon: ShieldAlert
  },
  {
    title: 'Refrigerated Fleet',
    desc: 'Our delivery vans are fully customized with active refrigeration systems, keeping a cool environment before the boxes even reach you.',
    icon: Truck
  }
];

const SAFETY_RULES = [
  {
    title: 'Never Touch Directly',
    desc: 'Dry ice is extremely cold (-78.5°C) and can cause instant frostbite. Always use thick protective gloves, kitchen tongs, or a heavy towel to handle it.',
    urgency: 'critical'
  },
  {
    title: 'Ventilate and Let Sublimate',
    desc: 'Dry ice turns directly from solid into Carbon Dioxide (CO2) gas. Never leave it in an airtight container or closed room. Leave the box open in a well-ventilated area outdoors or by a window to let it naturally evaporate.',
    urgency: 'high'
  },
  {
    title: 'Dispose Responsibly',
    desc: 'Do not throw dry ice into public trash bins, sinks, toilets, or sewers. It can crack pipes or create high pressure. Let it sublimate away completely into gas.',
    urgency: 'medium'
  },
  {
    title: 'Keep Away from Children & Pets',
    desc: 'The ice looks like normal ice but is extremely hazardous. Ensure the thermal boxes are placed completely out of reach while sublimation takes place.',
    urgency: 'critical'
  }
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

export default function DeliveryClient() {
  const [selectedEmirateId, setSelectedEmirateId] = useState<string>('dubai');
  const [nextDeliveryDate, setNextDeliveryDate] = useState<string>('');

  const selectedEmirate = EMIRATES_DATA.find(e => e.id === selectedEmirateId) || EMIRATES_DATA[0];

  // Calculate the next estimated delivery date based on current day and cutoff
  useEffect(() => {
    const calculateNextDelivery = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, etc.
      const currentHour = now.getHours();
      
      const daysList = selectedEmirate.daysList;
      let daysToAdd = 1;
      let found = false;

      // Special check: if today is a delivery day but it is past cutoff time
      // Cutoff check (using simple hour limits)
      let cutoffHour = 17; // 5 PM
      if (selectedEmirate.id === 'dubai') {
        cutoffHour = 14; // 2 PM
      } else if (selectedEmirate.id === 'sharjah') {
        cutoffHour = 12; // 12 PM
      }

      for (let i = 0; i < 14; i++) {
        const testDate = new Date();
        testDate.setDate(now.getDate() + i);
        const testDay = testDate.getDay();

        if (daysList.includes(testDay)) {
          if (i === 0) {
            // It's today! Is it before cutoff?
            if (currentHour < cutoffHour) {
              setNextDeliveryDate('Today (Same-day Delivery available)');
              found = true;
              break;
            }
          } else {
            // It's a future day!
            const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
            setNextDeliveryDate(testDate.toLocaleDateString('en-US', options));
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setNextDeliveryDate('Within 2-3 Business Days');
      }
    };

    calculateNextDelivery();
  }, [selectedEmirateId, selectedEmirate]);

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
                <Truck className="w-4 h-4" />
                <span>Zero-Melt Cold Chain Logistics</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl">
                Always Frozen.<br />
                <span className="text-[#C4EB54]">Guaranteed.</span>
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2} className="max-w-2xl">
              <p className="text-white/60 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                Enjoy premium popsicles, handcrafted ice cream, and hygienic ice cups delivered in rock-solid condition. We package every order with extreme cold-chain optimization to withstand the UAE heat.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. THE COLD CHAIN TECHNOLOGY SECTION */}
      <section className="py-16 sm:py-24">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Explanatory text */}
            <div className="lg:col-span-5 space-y-6">
              <FadeUp>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Our Protocol</span>
                <h2 className="font-display uppercase tracking-tighter leading-none text-3xl sm:text-4xl lg:text-5xl mt-2">
                  The Zero-Melt<br />
                  <span className="text-primary">System.</span>
                </h2>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed">
                  Shipping gourmet popsicles in a climate that regularly reaches 40°C requires more than just a standard cardboard box. Our engineering guarantees that your treats remain as frozen at your doorstep as they were in our production kitchen.
                </p>
              </FadeUp>
              
              <FadeUp delay={0.15}>
                <div className="p-5 bg-white border border-gray-100 shadow-xl shadow-gray-100/40 rounded-[24px] flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C4EB54]/10 text-primary flex items-center justify-center flex-shrink-0">
                    <ThermometerSnowflake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-tight text-gray-900 mb-1">Our Ice Stays Cold</h4>
                    <p className="text-gray-400 text-xs font-medium leading-normal">
                      We utilize highly condensed carbon dioxide dry ice blocks that remain at a steady -78.5°C, ensuring a continuous sub-zero atmosphere.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Collage & Step cards */}
            <div className="lg:col-span-7 space-y-4">
              {PACKING_STEPS.map((step, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="group bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 hover:shadow-2xl hover:border-gray-200/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-[#141A0B] text-[#C4EB54] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C4EB54] group-hover:text-[#141A0B] transition-colors duration-300">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-primary/30 tracking-widest">0{i+1}</span>
                        <h3 className="font-black text-base uppercase tracking-tight text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE EMIRATES DELIVERY CALCULATOR */}
      <section className="py-16 sm:py-24 bg-[#F7F7F5] border-y border-gray-100">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <FadeUp>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block">Where we deliver</span>
              <h2 className="font-display uppercase tracking-tighter leading-none text-4xl sm:text-5xl lg:text-6xl mt-2">
                UAE Shipping <span className="text-primary">Calculator</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-gray-500 text-sm sm:text-base font-medium">
                Select your location to view schedules, prices, cut-off times, and estimated delivery dates.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <FadeUp className="h-full">
                <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-4 h-full">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Select Your Emirate</h3>
                  <div className="flex flex-col gap-2.5">
                    {EMIRATES_DATA.map((emirate) => (
                      <button
                        key={emirate.id}
                        onClick={() => setSelectedEmirateId(emirate.id)}
                        className={`w-full text-left px-6 py-4 rounded-[20px] font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-between border ${
                          selectedEmirateId === emirate.id 
                            ? 'bg-[#141A0B] text-white border-transparent shadow-lg shadow-gray-900/10' 
                            : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100/50'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <MapPin className={`w-4 h-4 ${selectedEmirateId === emirate.id ? 'text-[#C4EB54]' : 'text-gray-400'}`} />
                          {emirate.name}
                        </span>
                        <span className={`text-xs ${selectedEmirateId === emirate.id ? 'text-white/40' : 'text-gray-400'} font-sans`}>
                          {emirate.arabicName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right: Selected Info display */}
            <div className="lg:col-span-7">
              <FadeUp className="h-full">
                <div className="bg-white border border-gray-100 rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-gray-200/50 flex flex-col justify-between h-full relative overflow-hidden">
                  
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4EB54]/10 rounded-full blur-3xl -z-10" />

                  <div className="space-y-8">
                    {/* Header */}
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-display uppercase tracking-tight text-3xl sm:text-4xl text-gray-900">
                          {selectedEmirate.name}
                        </h3>
                        <div className="bg-[#C4EB54]/10 text-primary px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider">
                          Active Route
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mt-1 font-sans">
                        خدمات التوصيل في {selectedEmirate.arabicName}
                      </p>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Schedule */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary flex-shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Delivery Schedule</h4>
                          <p className="font-black text-sm text-gray-900 mt-1">{selectedEmirate.days}</p>
                        </div>
                      </div>

                      {/* Cutoff */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary flex-shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Daily Cut-off Time</h4>
                          <p className="font-bold text-sm text-gray-900 mt-1">{selectedEmirate.cutoff}</p>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary flex-shrink-0">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Shipping Rate</h4>
                          <p className="font-black text-sm text-gray-900 mt-1">
                            {selectedEmirate.fee} AED <span className="text-gray-400 font-bold text-xs">/ order</span>
                          </p>
                        </div>
                      </div>

                      {/* Free shipping */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary flex-shrink-0">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Free Delivery Limit</h4>
                          <p className="font-black text-sm text-[#7E8D5F] mt-1">
                            Orders above {selectedEmirate.minFree} AED
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Cutoff / Note card */}
                    <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2.5">
                        <Info className="w-4 h-4 text-primary" />
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-900">Emirate Logistics Note</h4>
                      </div>
                      <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
                        {selectedEmirate.notes}
                      </p>
                    </div>

                  </div>

                  {/* Estimation footer */}
                  <div className="border-t border-gray-100 pt-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#7E8D5F] block">Next Delivery Window</span>
                      <p className="font-black text-base sm:text-lg text-[#141A0B] mt-0.5">{nextDeliveryDate}</p>
                    </div>
                    <Link
                      href="/products"
                      className="group bg-[#141A0B] hover:bg-[#C4EB54] hover:text-[#141A0B] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-xl shadow-gray-100"
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DRY ICE SAFETY GUIDE (CRITICAL CUSTOMER TRUST INTERFACE) */}
      <section className="py-16 sm:py-24">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <FadeUp>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full text-amber-600 font-black text-xs uppercase tracking-widest">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Important Safety Directive</span>
                </div>
                <h2 className="font-display uppercase tracking-tighter leading-none text-3xl sm:text-4xl lg:text-5xl mt-2">
                  Dry Ice Safety Guide
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
                  Our products are packed with highly concentrated solid carbon dioxide (dry ice) at -78.5°C. To ensure a safe unpacking experience, please follow these guidelines carefully.
                </p>
              </FadeUp>
            </div>

            {/* Safety Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAFETY_RULES.map((rule, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className={`p-6 sm:p-8 rounded-[28px] border h-full space-y-3 relative overflow-hidden ${
                    rule.urgency === 'critical' 
                      ? 'bg-red-50/30 border-red-100 hover:border-red-200' 
                      : rule.urgency === 'high' 
                      ? 'bg-amber-50/20 border-amber-100 hover:border-amber-200' 
                      : 'bg-blue-50/10 border-blue-100 hover:border-blue-200'
                  }`}>
                    {/* Badge */}
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        rule.urgency === 'critical' 
                          ? 'bg-red-100 text-red-700' 
                          : rule.urgency === 'high' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {rule.urgency}
                      </span>
                      <span className="text-xs font-black text-gray-300">0{i+1}</span>
                    </div>

                    <h3 className="font-black text-base uppercase tracking-tight text-gray-900">{rule.title}</h3>
                    <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">{rule.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Note card at bottom of safety */}
            <FadeUp delay={0.2}>
              <div className="bg-[#141A0B] text-white p-8 sm:p-10 rounded-[32px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl text-center md:text-left">
                  <h4 className="font-display uppercase text-[#C4EB54] text-xl sm:text-2xl">
                    Need support or custom delivery?
                  </h4>
                  <p className="text-white/60 font-medium text-xs sm:text-sm leading-relaxed">
                    Have special storage requirements, a wedding, corporate catering, or need an urgent delivery? Speak directly to our logistics team on WhatsApp.
                  </p>
                </div>
                <a
                  href="https://wa.me/971502994974?text=Hello%20Mashbere!%20I%20have%20a%20question%20about%20my%20delivery%20schedule."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-[#C4EB54] text-[#141A0B] px-8 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 shrink-0"
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
