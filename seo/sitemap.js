/**
 * Sitemap URL list for app/sitemap.js.
 * Kişisel site yapısı: ana sayfa + alt sayfalar (TR ve EN), her biri hreflang karşılığıyla.
 * Eski ticari sayfalar kaldırıldı (301 / 410); sitemap yalnızca kişisel sayfaları listeler.
 */

import { SITE_URL } from './metadata'
import { PAGES } from '@/lib/mo/site'

const PAGE_KEYS = ['home', 'about', 'experience', 'photo', 'projects', 'book', 'contact', 'privacy']

/** All sitemap URLs with lastModified and TR/EN alternates */
export function getSitemapUrls() {
  const lastModified = new Date().toISOString()
  const urls = []

  for (const key of PAGE_KEYS) {
    const { tr, en } = PAGES[key]
    const alternates = { languages: { tr: `${SITE_URL}${tr}`, en: `${SITE_URL}${en}`, 'x-default': `${SITE_URL}${tr}` } }
    for (const path of [tr, en]) {
      urls.push({
        url: `${SITE_URL}${path}`,
        lastModified,
        changeFrequency: key === 'home' ? 'weekly' : 'monthly',
        priority: key === 'home' ? 1 : 0.7,
        alternates,
      })
    }
  }

  return urls
}
