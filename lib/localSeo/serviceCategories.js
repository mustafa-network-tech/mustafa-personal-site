import { LOCAL_SEO_PAGES, isLocalSeoSlug } from './pages'

/** Her landing sayfasının hizmet kategorisi (sayfa içi nav vb.) */
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
  'osmaniye-web-tasarim': 'web-tasarim',
  'osmaniye-kurumsal-web-sitesi': 'kurumsal-web-sitesi',
  'kilis-web-tasarim': 'web-tasarim',
  'kilis-kurumsal-web-sitesi': 'kurumsal-web-sitesi',
  'yalova-web-tasarim': 'web-tasarim',
  'yalova-kurumsal-web-sitesi': 'kurumsal-web-sitesi',
  'karabuk-web-tasarim': 'web-tasarim',
  'karabuk-kurumsal-web-sitesi': 'kurumsal-web-sitesi',
  'bilecik-web-tasarim': 'web-tasarim',
  'bilecik-kurumsal-web-sitesi': 'kurumsal-web-sitesi',
  'kirklareli-web-tasarim': 'web-tasarim',
  'kirklareli-kurumsal-web-sitesi': 'kurumsal-web-sitesi',
}

/** Footer hizmet pill’leri — her paket tek sayfaya gider (yanında il adı yok) */
export const SERVICE_FOOTER_LINKS = [
  { key: 'web-tasarim', label: 'Web Tasarım', slug: 'bolu-web-tasarim' },
  { key: 'kurumsal-web-sitesi', label: 'Kurumsal Web Sitesi', slug: 'bolu-kurumsal-web-sitesi' },
  { key: 'kurumsal-web-tasarim', label: 'Kurumsal Web Tasarım', slug: 'duzce-kurumsal-web-tasarim' },
  { key: 'dijital-ajans', label: 'Dijital Ajans', slug: 'balikesir-dijital-ajans' },
  { key: 'otel-turizm', label: 'Otel & Turizm', slug: 'canakkale-otel-web-sitesi' },
  { key: 'seo-uyumlu', label: 'SEO Uyumlu Site', slug: 'duzce-seo-uyumlu-web-sitesi' },
  { key: 'e-ticaret', label: 'E-Ticaret', slug: 'adapazari-e-ticaret-web-sitesi' },
  { key: 'magaza', label: 'Mağaza', slug: 'adapazari-e-ticaret-web-sitesi' },
  { key: 'kucuk-isletme', label: 'Küçük İşletme', slug: 'zonguldak-kucuk-isletme-web-sitesi' },
  { key: 'fabrika-sanayi', label: 'Fabrika & Sanayi', slug: 'izmit-fabrika-web-sitesi' },
  { key: 'mobil-uyumlu', label: 'Mobil Uyumlu Site', slug: 'bartin-mobil-uyumlu-web-sitesi' },
]

export function getServiceCategoryForSlug(slug) {
  return SLUG_SERVICE_CATEGORY[slug] ?? null
}

/** Footer’da gösterilecek hizmet linkleri (sadece pill, şehir yok) */
export function getServiceFooterLinks() {
  return SERVICE_FOOTER_LINKS.filter((item) => item.slug && isLocalSeoSlug(item.slug))
}

/** Şehir pill → o şehrin web-tasarim sayfası (yoksa o şehirdeki ilk landing) */
export function getPrimarySlugForCity(cityKey) {
  const preferred = `${cityKey}-web-tasarim`
  if (isLocalSeoSlug(preferred)) return preferred
  const first = LOCAL_SEO_PAGES.find((p) => p.cityKey === cityKey)
  return first?.slug ?? null
}
