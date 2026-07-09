'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

// ─── Animation helper ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Contact Info Cards ───────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Call / WhatsApp',
    value: '+971 50 299 4974',
    href: 'tel:+971502994974',
    whatsapp: 'https://wa.me/971502994974?text=Hello%20Mashbere%2C%20I%20have%20a%20wholesale%20inquiry.',
    cta: 'Call Now',
    color: '#C4EB54',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@Jameesfood.com',
    href: 'mailto:info@Jameesfood.com',
    cta: 'Send Email',
    color: '#C4EB54',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'Jamees Food & Beverage Trading LLC\nDubai, UAE',
    href: 'https://maps.google.com/?q=Dubai,UAE',
    cta: 'View on Map',
    color: '#C4EB54',
  },
];

const SOCIAL_LINKS = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/mashbere.ae?igsh=cTZtdmh5YXQ1dWc2',
    handle: '@mashbere.ae',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1JTDeNX7H1/',
    handle: 'Mashbere',
  },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactClient() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'wholesale',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Build a WhatsApp message as the actual send method
    const text = encodeURIComponent(
      `*New Mashbere Enquiry*\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || 'N/A'}\n` +
      `Subject: ${form.subject}\n\n` +
      `Message:\n${form.message}`
    );

    // Simulate a brief delay for UX, then open WhatsApp
    await new Promise((r) => setTimeout(r, 800));
    window.open(`https://wa.me/971502994974?text=${text}`, '_blank');
    setStatus('sent');
  };

  return (
    <div className="bg-white text-[#141A0B] overflow-x-hidden">

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col justify-end overflow-hidden bg-[#141A0B] min-h-[70vh] sm:min-h-[85vh] pb-16 sm:pb-32">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C4EB54]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C4EB54]/5 rounded-full blur-[80px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#C4EB54 1px, transparent 1px), linear-gradient(90deg, #C4EB54 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 max-w-6xl">
          <FadeUp>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 sm:w-10 bg-[#C4EB54]" />
              <span className="text-[#C4EB54] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em]">
                Get in Touch
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display uppercase tracking-tighter leading-[0.82] text-white text-[13vw] xs:text-[11vw] sm:text-7xl md:text-8xl lg:text-9xl">
              Let&apos;s<br />
              <span className="text-[#C4EB54]">Connect.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.22} className="mt-5 max-w-md">
            <p className="text-white/60 text-sm sm:text-base font-medium leading-relaxed">
              Whether it&apos;s a wholesale order, a business partnership, or a simple question — we&apos;re here and happy to help.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══ 2. CONTACT CARDS ════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F7F5]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {CONTACT_INFO.map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group block bg-white border border-gray-100 hover:border-[#C4EB54]/40 hover:bg-[#141A0B] rounded-[28px] p-7 sm:p-8 h-full transition-all duration-500 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F7F7F5] group-hover:bg-[#C4EB54]/10 border border-gray-100 group-hover:border-[#C4EB54]/20 flex items-center justify-center mb-5 transition-all duration-500">
                    <item.icon className="w-5 h-5 text-[#708238] group-hover:text-[#C4EB54] transition-colors duration-500" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#C4EB54]/60 mb-2 transition-colors duration-500">
                    {item.label}
                  </p>
                  <p className="text-sm sm:text-base font-black text-[#141A0B] group-hover:text-white transition-colors duration-500 whitespace-pre-line leading-snug">
                    {item.value}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-[10px] font-black uppercase tracking-widest text-[#708238] group-hover:text-[#C4EB54] transition-colors duration-500">
                    {item.cta} →
                  </span>
                </a>
              </FadeUp>
            ))}
          </div>

          {/* WhatsApp CTA banner */}
          <FadeUp delay={0.3} className="mt-5">
            <a
              href="https://wa.me/971502994974?text=Hello%20Mashbere%2C%20I%20have%20a%20wholesale%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 bg-[#25D366] rounded-[28px] px-8 py-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-base sm:text-lg">Chat with us on WhatsApp</p>
                  <p className="text-white/70 text-xs sm:text-sm font-medium">Fastest response — usually within minutes</p>
                </div>
              </div>
              <span className="flex-shrink-0 bg-white text-[#25D366] font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full group-hover:scale-105 transition-transform">
                Open WhatsApp →
              </span>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ══ 3. CONTACT FORM + SOCIAL ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Form — takes 3/5 columns on desktop */}
            <div className="lg:col-span-3">
              <FadeUp>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-3">
                  Send a Message
                </span>
                <h2 className="font-display uppercase tracking-tighter leading-none text-[#141A0B] text-3xl sm:text-5xl mb-8">
                  We&apos;d Love to<br />
                  <span className="text-[#708238]">Hear From You.</span>
                </h2>
              </FadeUp>

              {status === 'sent' ? (
                <FadeUp>
                  <div className="bg-[#C4EB54]/10 border border-[#C4EB54]/30 rounded-[28px] p-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#C4EB54]/20 border border-[#C4EB54]/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-[#708238]" />
                    </div>
                    <h3 className="font-display uppercase tracking-tighter text-2xl text-[#141A0B]">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      Your message has been forwarded to our WhatsApp. We&apos;ll get back to you very soon.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', subject: 'wholesale', message: '' }); }}
                      className="mt-4 bg-[#141A0B] text-white font-black uppercase tracking-widest text-xs px-8 py-3.5 rounded-full hover:scale-105 transition-transform"
                    >
                      Send Another
                    </button>
                  </div>
                </FadeUp>
              ) : (
                <FadeUp delay={0.1}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full bg-[#F7F7F5] border border-gray-200 focus:border-[#C4EB54] focus:bg-white rounded-2xl px-5 py-3.5 text-sm font-medium text-[#141A0B] placeholder:text-gray-400 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className="w-full bg-[#F7F7F5] border border-gray-200 focus:border-[#C4EB54] focus:bg-white rounded-2xl px-5 py-3.5 text-sm font-medium text-[#141A0B] placeholder:text-gray-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-phone" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                          Phone / WhatsApp
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+971 50 000 0000"
                          className="w-full bg-[#F7F7F5] border border-gray-200 focus:border-[#C4EB54] focus:bg-white rounded-2xl px-5 py-3.5 text-sm font-medium text-[#141A0B] placeholder:text-gray-400 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-subject" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                          Subject *
                        </label>
                        <select
                          id="contact-subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full bg-[#F7F7F5] border border-gray-200 focus:border-[#C4EB54] focus:bg-white rounded-2xl px-5 py-3.5 text-sm font-medium text-[#141A0B] outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="wholesale">Wholesale Inquiry</option>
                          <option value="kiosk">Kiosk Partnership</option>
                          <option value="equipment">Equipment / Business</option>
                          <option value="product">Product Question</option>
                          <option value="delivery">Delivery & Shipping</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Message */}
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                        Your Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your needs — quantity, delivery location, business type…"
                        className="w-full bg-[#F7F7F5] border border-gray-200 focus:border-[#C4EB54] focus:bg-white rounded-2xl px-5 py-4 text-sm font-medium text-[#141A0B] placeholder:text-gray-400 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#141A0B] hover:bg-[#1E2710] text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send via WhatsApp
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-gray-400 font-medium">
                      * Your message will be sent to our WhatsApp for the fastest response.
                    </p>
                  </form>
                </FadeUp>
              )}
            </div>

            {/* Sidebar — 2/5 columns on desktop */}
            <div className="lg:col-span-2 space-y-6">

              {/* Business Hours */}
              <FadeUp delay={0.12}>
                <div className="bg-[#141A0B] rounded-[28px] p-7 sm:p-8">
                  <h3 className="font-display uppercase tracking-tighter text-white text-2xl mb-6">
                    Business<br />
                    <span className="text-[#C4EB54]">Hours.</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                      { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((row) => (
                      <div key={row.day} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <span className="text-xs font-medium text-white/50">{row.day}</span>
                        <span className={`text-xs font-black uppercase tracking-wider ${row.hours === 'Closed' ? 'text-white/20' : 'text-[#C4EB54]'}`}>
                          {row.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-medium text-white/30 leading-relaxed">
                      For urgent inquiries, WhatsApp is available 24/7 and typically receives the fastest responses.
                    </p>
                  </div>
                </div>
              </FadeUp>

              {/* Company Details */}
              <FadeUp delay={0.2}>
                <div className="bg-[#F7F7F5] border border-gray-100 rounded-[28px] p-7 sm:p-8">
                  <h3 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400 mb-5">
                    Company Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Manufactured By</p>
                      <p className="text-sm font-black text-[#141A0B]">Jamees Food & Beverages Manufacturing LLC</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Marketed By</p>
                      <p className="text-sm font-black text-[#141A0B]">Jamees Food & Beverage Trading LLC</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Headquarters</p>
                      <p className="text-sm font-medium text-[#141A0B]">Dubai, UAE</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Manufacturing</p>
                      <p className="text-sm font-medium text-[#141A0B]">Industrial Area, Ajman, UAE</p>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Social Links */}
              <FadeUp delay={0.28}>
                <div className="bg-[#F7F7F5] border border-gray-100 rounded-[28px] p-7 sm:p-8">
                  <h3 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400 mb-5">
                    Follow Us
                  </h3>
                  <div className="flex flex-col gap-3">
                    {SOCIAL_LINKS.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-[#141A0B] border border-transparent hover:border-white/5 transition-all duration-300"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-[#C4EB54]/10 group-hover:border-[#C4EB54]/20 transition-all">
                          <s.icon className="w-4 h-4 text-[#708238] group-hover:text-[#C4EB54] transition-colors" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#141A0B] group-hover:text-white transition-colors">{s.label}</p>
                          <p className="text-[10px] text-gray-400 group-hover:text-white/40 transition-colors font-medium">{s.handle}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. MAP EMBED ════════════════════════════════════════════════════ */}
      <section className="pb-12 sm:pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
          <FadeUp>
            <div className="overflow-hidden rounded-[32px] sm:rounded-[40px] border border-gray-100 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.6509315748!2d54.89784!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1cbe99e!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mashbere Dubai Location"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 5. CTA ══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#141A0B]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 text-center">
          <FadeUp>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-[#C4EB54]/60 block mb-4">
              Ready to Partner?
            </span>
            <h2 className="font-display uppercase tracking-tighter leading-[0.85] text-white text-4xl sm:text-6xl lg:text-7xl mb-8">
              Let&apos;s Build<br />
              <span className="text-[#C4EB54]">Something Delicious.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/971502994974?text=Hello%20Mashbere%2C%20I%20want%20to%20start%20a%20wholesale%20partnership."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#C4EB54] text-[#141A0B] px-8 sm:px-10 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <Link
                href="/products"
                className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-8 sm:px-10 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center"
              >
                Browse Products
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
