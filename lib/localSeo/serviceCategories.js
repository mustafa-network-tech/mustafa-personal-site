import { LOCAL_SEO_PAGES, isLocalSeoSlug } from './pages'

/** Her landing sayfasının hizmet rozeti (footer gruplama) */
export const SLUG_SERVICE_CATEGORY = {
  'bolu-web-tasarim': 'web-tasarim',
  'bolu-kurumsal-web-sitesi': 'kurumsal-web-sitesi',
  'izmit-web-tasarim': 'web-tasarim',
  'izmit-fabrika-web-sitesi': 'fabrika-sanayi',
  'adapazari-e-ticaret-web-sitesi': 'e-ticaret',
  'adapazari-web-tasarim': 'web-tasarim',
  'duzce-seo-uyumlu-web-sitesi': 'seo-uyumlu',
  'duzce-kurumsal-web-tasarim': 'kurumsal-web-tasarim',
  'zonguldak-web-tasarim': 'web-tasarim',
  'zonguldak-kucuk-isletme-web-sitesi': 'kucuk-isletme',
  'canakkale-otel-web-sitesi': 'otel-turizm',
  'canakkale-web-tasarim': 'web-tasarim',
  'balikesir-web-tasarim': 'web-tasarim',
  'balikesir-dijital-ajans': 'dijital-ajans',
  'bartin-web-tasarim': 'web-tasarim',
  'bartin-mobil-uyumlu-web-sitesi': 'mobil-uyumlu',
}

/** Footer’da gösterim sırası ve etiketler */
export const SERVICE_BADGES = [
  { key: 'web-tasarim', label: 'Web Tasarım' },
  { key: 'kurumsal-web-sitesi', label: 'Kurumsal Web Sitesi' },
  { key: 'kurumsal-web-tasarim', label: 'Kurumsal Web Tasarım' },
  { key: 'dijital-ajans', label: 'Dijital Ajans' },
  { key: 'otel-turizm', label: 'Otel & Turizm' },
  { key: 'seo-uyumlu', label: 'SEO Uyumlu Site' },
  { key: 'e-ticaret', label: 'E-Ticaret' },
  { key: 'magaza', label: 'Mağaza' },
  { key: 'kucuk-isletme', label: 'Küçük İşletme' },
  { key: 'fabrika-sanayi', label: 'Fabrika & Sanayi' },
  { key: 'mobil-uyumlu', label: 'Mobil Uyumlu Site' },
]

/** E-ticaret sayfaları mağaza rozeti altında da listelenir */
const MAGAZA_ALSO_SLUGS = new Set(['adapazari-e-ticaret-web-sitesi'])

export function getServiceCategoryForSlug(slug) {
  return SLUG_SERVICE_CATEGORY[slug] ?? null
}

export function getPagesGroupedByService() {
  const groups = Object.fromEntries(SERVICE_BADGES.map((b) => [b.key, []]))

  for (const page of LOCAL_SEO_PAGES) {
    const category = SLUG_SERVICE_CATEGORY[page.slug]
    if (category && groups[category]) {
      groups[category].push({
        slug: page.slug,
        cityName: page.cityName,
      })
    }
    if (MAGAZA_ALSO_SLUGS.has(page.slug) && groups.magaza) {
      const already = groups.magaza.some((p) => p.slug === page.slug)
      if (!already) {
        groups.magaza.push({ slug: page.slug, cityName: page.cityName })
      }
    }
  }

  return SERVICE_BADGES.filter((badge) => (groups[badge.key]?.length ?? 0) > 0).map((badge) => ({
    ...badge,
    pages: groups[badge.key],
  }))
}

/** Şehir pill tıklanınca: varsa web-tasarim, yoksa ilk sayfa */
export function getPrimarySlugForCity(cityKey) {
  const preferred = `${cityKey}-web-tasarim`
  if (isLocalSeoSlug(preferred)) return preferred
  const first = LOCAL_SEO_PAGES.find((p) => p.cityKey === cityKey)
  return first?.slug ?? null
}
