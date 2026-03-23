/**
 * Sitemap URL list for app/sitemap.js. Includes home, projects, services, contact (EN + TR).
 */

import { SITE_URL, PROJECT_SLUGS } from './metadata'

/** Paths to include in sitemap (without locale prefix for EN; with /tr for TR) */
export const SITEMAP_PATHS = [
  '',
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
  for (const path of SITEMAP_PATHS) {
    urls.push({ url: `${SITE_URL}${path || '/'}`, lastModified: now })
    urls.push({ url: `${SITE_URL}/tr${path || ''}`, lastModified: now })
  }
  return urls
}
