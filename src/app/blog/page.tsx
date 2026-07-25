import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';
import { Clock, Tag, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Insights | Wholesale Ice Cream, UAE Food Business Tips | Mashbere',
  description:
    'Expert guides on wholesale ice cream in the UAE, ice cream kiosk business tips, product spotlights, and frozen dessert industry insights from Mashbere — the UAE\'s leading artisanal frozen treat brand.',
  keywords: [
    'wholesale ice cream UAE blog',
    'ice cream kiosk UAE guide',
    'frozen desserts UAE',
    'pookees UAE',
    'UAE food business tips',
    'Mashbere blog',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog & Insights | Mashbere UAE Frozen Desserts',
    description:
      'Expert guides and insights on wholesale ice cream, kiosk business, and frozen desserts in the UAE from Mashbere.',
    url: 'https://mashbere.com/blog',
    type: 'website',
  },
};

const blogListSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Mashbere Blog — UAE Frozen Desserts & Wholesale Insights',
  url: 'https://mashbere.com/blog',
  description:
    'Expert articles on wholesale ice cream, frozen food business, and artisanal dessert trends in the UAE.',
  publisher: {
    '@type': 'Organization',
    name: 'Mashbere',
    logo: {
      '@type': 'ImageObject',
      url: 'https://mashbere.com/photos/mashbere_logo_no_bg.webp',
    },
  },
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `https://mashbere.com/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    description: post.excerpt,
  })),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <div className="bg-white text-[#141A0B] overflow-x-hidden">
        {/* ══ HERO ══ */}
        <section className="relative flex flex-col justify-end overflow-hidden bg-[#141A0B] min-h-[65vh] sm:min-h-[75vh] pt-36 sm:pt-40 pb-14 sm:pb-24">
          {/* Glow orbs */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C4EB54]/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C4EB54]/5 rounded-full blur-[80px]" />
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(#C4EB54 1px, transparent 1px), linear-gradient(90deg, #C4EB54 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 max-w-6xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 sm:w-10 bg-[#C4EB54]" />
              <span className="text-[#C4EB54] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em]">
                Insights & Articles
              </span>
            </div>

            <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-white text-6xl xs:text-7xl sm:text-7xl md:text-8xl lg:text-9xl mt-2">
              The<br />
              <span className="text-[#C4EB54]">Blog.</span>
            </h1>

            <p className="mt-5 text-white/60 text-sm sm:text-base font-medium leading-relaxed max-w-md">
              Expert guides on wholesale ice cream, kiosk business, and frozen dessert trends across the UAE — from the Mashbere team.
            </p>
          </div>
        </section>

        {/* ══ FEATURED POST ══ */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F7F5]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">
              Featured Article
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden border border-gray-100 hover:border-[#C4EB54]/30 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 lg:h-auto min-h-[240px] sm:min-h-[320px] overflow-hidden bg-[#141A0B]">
                <Image
                  src={featured.coverImage}
                  alt={featured.coverImageAlt}
                  fill
                  className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Tag badge */}
                <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
                  {featured.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#C4EB54] text-[#141A0B] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featured.readingTimeMin} min read
                    </span>
                    <span>{formatDate(featured.publishedAt)}</span>
                  </div>
                  <h2 className="font-display uppercase tracking-tighter leading-[0.9] text-[#141A0B] text-3xl sm:text-4xl lg:text-5xl group-hover:text-[#708238] transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <span className="text-[#708238] text-xs font-black uppercase tracking-widest">
                    Read Article
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#141A0B] group-hover:bg-[#C4EB54] flex items-center justify-center transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-[#141A0B] transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ══ ARTICLE GRID ══ */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">
              All Articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-gray-100 hover:border-[#C4EB54]/30 rounded-[24px] sm:rounded-[28px] overflow-hidden hover:shadow-xl transition-all duration-400"
                >
                  {/* Card image */}
                  <div className="relative h-56 sm:h-48 overflow-hidden bg-[#141A0B] flex-shrink-0">
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      fill
                      className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-600"
                    />
                    {/* Tag */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#C4EB54] text-[#141A0B] text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {post.tags[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readingTimeMin} min
                      </span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <h2 className="font-display uppercase tracking-tighter leading-[0.9] text-[#141A0B] text-2xl group-hover:text-[#708238] transition-colors duration-300 flex-1">
                      {post.title}
                    </h2>

                    <p className="text-gray-500 text-sm font-medium leading-relaxed mt-3 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 flex items-center gap-2">
                      <span className="text-[#708238] text-[10px] font-black uppercase tracking-widest">
                        Read More
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#708238] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section className="py-12 sm:py-16 bg-[#F7F7F5]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
            <div className="bg-[#141A0B] rounded-[28px] sm:rounded-[36px] px-8 sm:px-14 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#C4EB54]/8 rounded-full blur-[80px]" />
              <div className="relative z-10 space-y-3 text-center lg:text-left">
                <p className="text-[#C4EB54] text-[10px] font-black uppercase tracking-[0.4em]">
                  Ready to Partner?
                </p>
                <h2 className="font-display uppercase tracking-tighter leading-[0.9] text-white text-4xl sm:text-5xl">
                  Let&apos;s Grow<br />
                  <span className="text-[#C4EB54]">Together.</span>
                </h2>
                <p className="text-white/60 text-sm font-medium max-w-md">
                  Whether you are looking for a wholesale ice cream supplier, a kiosk partner, or simply want to stock our products — we are ready to talk.
                </p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 bg-[#C4EB54] text-[#141A0B] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/equipment"
                  className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/20 transition-all"
                >
                  Business Programme
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
