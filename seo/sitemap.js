/**
 * Sitemap URL list for app/sitemap.js. Türkçe ana dil; EN + TR sayfalar.
 */

import { SITE_URL, PROJECT_SLUGS } from './metadata'
import { getAllLocalSeoSlugs } from '@/lib/localSeo/pages'

const LOCAL_SEO_PATHS = getAllLocalSeoSlugs().map((slug) => `/${slug}`)

/** İngilizce kök sayfalar (/tr öneki ile Türkçe karşılığı da üretilir) */
const EN_BASE_PATHS = [
  '/projects',
  '/services',
  '/contact',
  '/vitrin',
  ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`),
]

/** All sitemap URLs with lastModified */
export function getSitemapUrls() {
  const now = new Date().toISOString()
  const urls = []

  urls.push({ url: `${SITE_URL}/tr`, lastModified: now })
  urls.push({ url: `${SITE_URL}/en`, lastModified: now })

  for (const path of EN_BASE_PATHS) {
    urls.push({ url: `${SITE_URL}${path}`, lastModified: now })
    urls.push({ url: `${SITE_URL}/tr${path}`, lastModified: now })
  }

  for (const path of LOCAL_SEO_PATHS) {
    urls.push({ url: `${SITE_URL}${path}`, lastModified: now })
  }

  return urls
}
