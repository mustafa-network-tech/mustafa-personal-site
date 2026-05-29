/**
 * Şehir bazlı SEO landing sayfaları — tek kaynak.
 * Her sayfa benzersiz meta, hero, hizmet sırası ve anlatım içerir.
 */

import { ORIGINAL_CITY_PAGES } from './cityPages/originalCityPages'
import { NEW_CITY_PAGES } from './cityPages/newCityPages'

/** @typedef {import('./pages').LocalSeoPage} LocalSeoPage */

export const LOCAL_SEO_PAGES = [...ORIGINAL_CITY_PAGES, ...NEW_CITY_PAGES]

const slugSet = new Set(LOCAL_SEO_PAGES.map((p) => p.slug))

export function isLocalSeoSlug(slug) {
  return slugSet.has(slug)
}

export function getLocalSeoPage(slug) {
  return LOCAL_SEO_PAGES.find((p) => p.slug === slug) ?? null
}

export function getAllLocalSeoSlugs() {
  return LOCAL_SEO_PAGES.map((p) => p.slug)
}

/** Footer pill için şehir → sayfa slug listesi */
export const FOOTER_SEO_CITIES = [
  { key: 'bolu', label: 'Bolu' },
  { key: 'adapazari', label: 'Adapazarı' },
  { key: 'zonguldak', label: 'Zonguldak' },
  { key: 'izmit', label: 'İzmit' },
  { key: 'duzce', label: 'Düzce' },
  { key: 'canakkale', label: 'Çanakkale' },
  { key: 'balikesir', label: 'Balıkesir' },
  { key: 'bartin', label: 'Bartın' },
  { key: 'osmaniye', label: 'Osmaniye' },
  { key: 'kilis', label: 'Kilis' },
  { key: 'yalova', label: 'Yalova' },
  { key: 'karabuk', label: 'Karabük' },
  { key: 'bilecik', label: 'Bilecik' },
  { key: 'kirklareli', label: 'Kırklareli' },
]

/** Footer ve şehir içi linkler için kısa etiketler */
export const PAGE_LINK_LABELS = {
  'bolu-web-tasarim': 'Web Tasarım',
  'bolu-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
  'izmit-web-tasarim': 'Web Tasarım',
  'izmit-fabrika-web-sitesi': 'Fabrika & Sanayi',
  'adapazari-e-ticaret-web-sitesi': 'E-Ticaret / Mağaza',
  'adapazari-web-tasarim': 'Web Tasarım',
  'duzce-seo-uyumlu-web-sitesi': 'SEO Uyumlu Site',
  'duzce-kurumsal-web-tasarim': 'Kurumsal Web Tasarım',
  'zonguldak-web-tasarim': 'Web Tasarım',
  'zonguldak-kucuk-isletme-web-sitesi': 'Küçük İşletme',
  'canakkale-otel-web-sitesi': 'Otel & Turizm',
  'canakkale-web-tasarim': 'Web Tasarım',
  'balikesir-web-tasarim': 'Web Tasarım',
  'balikesir-dijital-ajans': 'Dijital Ajans',
  'bartin-web-tasarim': 'Web Tasarım',
  'bartin-mobil-uyumlu-web-sitesi': 'Mobil Uyumlu Site',
  'osmaniye-web-tasarim': 'Web Tasarım',
  'osmaniye-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
  'kilis-web-tasarim': 'Web Tasarım',
  'kilis-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
  'yalova-web-tasarim': 'Web Tasarım',
  'yalova-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
  'karabuk-web-tasarim': 'Web Tasarım',
  'karabuk-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
  'bilecik-web-tasarim': 'Web Tasarım',
  'bilecik-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
  'kirklareli-web-tasarim': 'Web Tasarım',
  'kirklareli-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
}

export function getPageLinkLabel(slug) {
  return PAGE_LINK_LABELS[slug] || getLocalSeoPage(slug)?.hero?.title || slug
}

export function getSlugsForCityKey(cityKey) {
  return LOCAL_SEO_PAGES.filter((p) => p.cityKey === cityKey).map((p) => p.slug)
}

/** Aynı şehirdeki tüm landing sayfaları */
export function getPagesForCityKey(cityKey) {
  return LOCAL_SEO_PAGES.filter((p) => p.cityKey === cityKey).map((p) => ({
    slug: p.slug,
    label: getPageLinkLabel(p.slug),
    isStore: p.slug.includes('e-ticaret') || p.slug.includes('magaza'),
  }))
}

/** Mevcut sayfa hariç, aynı şehirdeki diğer sayfalar */
export function getSiblingPages(currentSlug) {
  const page = getLocalSeoPage(currentSlug)
  if (!page) return []
  return getPagesForCityKey(page.cityKey).filter((p) => p.slug !== currentSlug)
}

/** Mevcut şehir hariç diğer şehirlerin birincil landing linkleri */
export function getOtherCityLinks(excludeCityKey) {
  return FOOTER_SEO_CITIES.filter((c) => c.key !== excludeCityKey)
    .map((c) => {
      const preferred = `${c.key}-web-tasarim`
      const slug = isLocalSeoSlug(preferred)
        ? preferred
        : LOCAL_SEO_PAGES.find((p) => p.cityKey === c.key)?.slug
      return slug ? { key: c.key, label: c.label, slug } : null
    })
    .filter(Boolean)
}

export function pickRandomSlugForCity(cityKey) {
  const slugs = getSlugsForCityKey(cityKey)
  if (!slugs.length) return '/'
  return `/${slugs[0]}`
}
