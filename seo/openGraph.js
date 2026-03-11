/**
 * Open Graph and Twitter card helpers. Use with Next.js metadata.
 * og:type = website. twitter:card = summary_large_image.
 */

import { SITE_URL, OG_IMAGES, GLOBAL_META, PAGE_META } from './metadata'

/**
 * Build Open Graph metadata for a page (no duplicates).
 * @param {object} opts - { locale, path, title?, description?, image? }
 */
export function buildOpenGraph(opts) {
  const { locale = 'en', path = '', title, description, image } = opts
  const url = path ? `${SITE_URL}${path}` : SITE_URL
  const img = image || OG_IMAGES[locale] || OG_IMAGES.en
  const siteName = locale === 'tr' ? 'Mustafa Öner' : 'Mustafa Oner'
  const ogLocale = locale === 'tr' ? 'tr_TR' : 'en_US'
  return {
    type: 'website',
    locale: ogLocale,
    url,
    siteName,
    title: title || GLOBAL_META[locale]?.title,
    description: description || GLOBAL_META[locale]?.description,
    images: [{ url: img, width: 1200, height: 630, alt: title || siteName }],
  }
}

/**
 * Build Twitter card metadata (summary_large_image).
 */
export function buildTwitterCard(opts) {
  const { title, description, image } = opts
  const meta = GLOBAL_META.en
  return {
    card: 'summary_large_image',
    title: title || meta.title,
    description: description || meta.description,
    images: [image || OG_IMAGES.en],
  }
}

/**
 * Full social meta for a page (OG + Twitter). Use in export const metadata.
 */
export function pageSocialMeta(pageKey, locale, path, overrides = {}) {
  const page = PAGE_META[pageKey]?.[locale] || GLOBAL_META[locale]
  const title = overrides.title ?? page?.title
  const description = overrides.description ?? page?.description
  const image = overrides.image ?? OG_IMAGES[locale]
  return {
    openGraph: buildOpenGraph({ locale, path, title, description, image }),
    twitter: buildTwitterCard({ title, description, image }),
  }
}
