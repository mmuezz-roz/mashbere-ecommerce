import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';
import { Clock, Tag, ArrowLeft, ArrowRight, MessageCircle, ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found | Mashbere' };

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://mashbere.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle,
    description: post.seoDescription,
    image: `https://mashbere.com${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://mashbere.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mashbere',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mashbere.com/photos/mashbere_logo_no_bg.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mashbere.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mashbere.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mashbere.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://mashbere.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-white text-[#141A0B] overflow-x-hidden">

        {/* ══ HERO ══ */}
        <section className="relative flex flex-col justify-end overflow-hidden bg-[#141A0B] min-h-[70vh] sm:min-h-[80vh] pt-36 sm:pt-40 pb-12 sm:pb-20">
          {/* Blurred cover behind text */}
          <div className="absolute inset-0 z-0">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141A0B] via-[#141A0B]/70 to-transparent" />
          </div>

          {/* Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C4EB54]/8 rounded-full blur-[120px] z-0" />

          <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Link href="/" className="hover:text-[#C4EB54] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-[#C4EB54] transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#C4EB54] truncate max-w-[160px] sm:max-w-xs">{post.tags[0]}</span>
            </nav>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-[#C4EB54]/15 border border-[#C4EB54]/30 text-[#C4EB54] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display uppercase tracking-tighter leading-[0.88] text-white text-3xl sm:text-4xl lg:text-7xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 mt-5 text-[10px] font-black uppercase tracking-widest text-white/40">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTimeMin} min read
              </span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </section>

        {/* ══ ARTICLE BODY ══ */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-16">

            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#708238] transition-colors mb-10 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Excerpt */}
            <p className="text-lg sm:text-xl font-medium text-gray-500 leading-relaxed border-l-4 border-[#C4EB54] pl-6 mb-10">
              {post.excerpt}
            </p>

            {/* Article HTML */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* WhatsApp CTA */}
            <div className="mt-14 bg-[#141A0B] rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-[#C4EB54]/10 rounded-full blur-[60px]" />
              <div className="relative z-10 text-center sm:text-left">
                <p className="text-[#C4EB54] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                  Ready to get started?
                </p>
                <p className="text-white font-black text-base sm:text-xl">
                  Talk to our wholesale team on WhatsApp — we respond in minutes.
                </p>
              </div>
              <a
                href="https://wa.me/971502994974?text=Hello%20Mashbere%2C%20I%20read%20your%20blog%20and%20have%20a%20wholesale%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex-shrink-0 flex items-center gap-3 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ══ RELATED ARTICLES ══ */}
        {related.length > 0 && (
          <section className="py-12 sm:py-16 bg-[#F7F7F5]">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">
                Related Articles
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-white border border-gray-100 hover:border-[#C4EB54]/30 rounded-[24px] overflow-hidden hover:shadow-xl transition-all duration-400 flex flex-col"
                  >
                    <div className="relative h-56 sm:h-40 overflow-hidden bg-[#141A0B] flex-shrink-0">
                      <Image
                        src={p.coverImage}
                        alt={p.coverImageAlt}
                        fill
                        className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#C4EB54] text-[#141A0B] text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                          {p.tags[0]}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readingTimeMin} min</span>
                        <span>{formatDate(p.publishedAt)}</span>
                      </div>
                      <h3 className="font-display uppercase tracking-tighter leading-[0.9] text-[#141A0B] text-xl group-hover:text-[#708238] transition-colors flex-1">
                        {p.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-[#708238] text-[10px] font-black uppercase tracking-widest">Read</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#708238] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
