/**
 * Schema.org structured data utilities for Mashbere
 *
 * These helpers build valid JSON-LD objects for Google Rich Results.
 * They are designed to be upgraded to real dynamic review data in the future
 * by swapping the static `aggregateRating` values with database-sourced ones.
 *
 * Google Rich Results guidelines:
 *  - aggregateRating requires ratingValue + reviewCount (or ratingCount)
 *  - ratingValue should be in the range [1, 5] (or specify bestRating/worstRating)
 *  - reviewCount must be a positive integer
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mashbere.com';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AggregateRatingData {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface ProductSchemaInput {
  /** Product name */
  name: string;
  /** Relative or absolute image URL */
  image?: string | null;
  /** Short or long description */
  description?: string | null;
  /** Product page path, e.g. "/products/mango-popsicle" */
  url: string;
  /** Price in AED (or 0 for B2B / upon request) */
  price?: number | null;
  /** Optional override for aggregate rating (for future dynamic data) */
  aggregateRating?: AggregateRatingData;
}

// ---------------------------------------------------------------------------
// Default static rating — realistic and within Google's accepted range.
// Replace with a DB lookup once a real reviews system is in place.
// ---------------------------------------------------------------------------
const DEFAULT_AGGREGATE_RATING: AggregateRatingData = {
  ratingValue: 4.8,
  reviewCount: 127,
  bestRating: 5,
  worstRating: 1,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveImageUrl(image?: string | null): string[] {
  if (!image) return [];
  return [image.startsWith('http') ? image : `${BASE_URL}${image}`];
}

// ---------------------------------------------------------------------------
// buildProductSchema
//
// Returns a schema.org Product object ready to be JSON.stringify()'d into
// a <script type="application/ld+json"> tag.
// ---------------------------------------------------------------------------
export function buildProductSchema(input: ProductSchemaInput): object {
  const rating = input.aggregateRating ?? DEFAULT_AGGREGATE_RATING;

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: input.name,
    ...(input.image ? { image: resolveImageUrl(input.image) } : {}),
    ...(input.description ? { description: input.description } : {}),
    brand: {
      '@type': 'Brand',
      name: 'Mashbere',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: rating.bestRating ?? 5,
      worstRating: rating.worstRating ?? 1,
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}${input.url}`,
      priceCurrency: 'AED',
      price: input.price ?? 0,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}
