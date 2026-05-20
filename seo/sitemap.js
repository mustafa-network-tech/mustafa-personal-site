/**
 * Sitemap URL list for app/sitemap.js. Includes home, projects, services, contact (EN + TR).
 */

import { SITE_URL, PROJECT_SLUGS } from './metadata'
import { getAllLocalSeoSlugs } from '@/lib/localSeo/pages'

const LOCAL_SEO_PATHS = getAllLocalSeoSlugs().map((slug) => `/${slug}`)
const LOCAL_SEO_PATH_SET = new Set(LOCAL_SEO_PATHS)

/** Paths to include in sitemap (without locale prefix for EN; with /tr for TR) */
export const SITEMAP_PATHS = [
  '',
  '/projects',
  '/services',
  '/contact',
  '/vitrin',
  ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`),
  ...LOCAL_SEO_PATHS,
]

/** All sitemap URLs with lastModified */
export function getSitemapUrls() {
  const now = new Date().toISOString()
  const urls = []
  for (const path of SITEMAP_PATHS) {
    urls.push({ url: `${SITE_URL}${path || '/'}`, lastModified: now })
    if (!LOCAL_SEO_PATH_SET.has(path)) {
      urls.push({ url: `${SITE_URL}/tr${path || ''}`, lastModified: now })
    }
  }
  return urls
}
