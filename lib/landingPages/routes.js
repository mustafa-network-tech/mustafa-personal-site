// Lightweight route registry: safe to share with navigation without shipping page copy.
export const LANDING_ROUTES = {
  'web-tasarim': 'Web Tasarım',
  'bolu-web-tasarim': 'Bolu Web Tasarım',
  'bolu-otel-pansiyon-web-sitesi': 'Bolu Otel ve Pansiyon Web Sitesi',
  'bolu-fotografci-web-sitesi': 'Bolu Fotoğrafçı Web Sitesi',
  'osmaniye-web-tasarim': 'Osmaniye Web Tasarım',
  'osmaniye-cafe-kurumsal-web-sitesi': 'Osmaniye Kafe ve Restoran Web Sitesi',
  'ozel-yazilim-gelistirme': 'Özel Yazılım Geliştirme',
  'ciftlik-yonetim-sistemi': 'Çiftlik Yönetim Sistemi',
  'santiye-yonetim-sistemi': 'Şantiye Yönetim Sistemi',
  'bolu-santiye-yonetim-sistemi': 'Bolu Şantiye Yönetim Sistemi',
  'osmaniye-santiye-yonetim-sistemi': 'Osmaniye Şantiye Yönetim Sistemi',
  'hatay-santiye-yonetim-sistemi': 'Hatay Şantiye Yönetim Sistemi',
  'bartin-santiye-yonetim-sistemi': 'Bartın Şantiye Yönetim Sistemi',
  'duzce-santiye-yonetim-sistemi': 'Düzce Şantiye Yönetim Sistemi',
}

export const LANDING_SLUGS = Object.keys(LANDING_ROUTES)
export const HUB_SLUGS = ['ozel-yazilim-gelistirme', 'web-tasarim', 'ciftlik-yonetim-sistemi', 'santiye-yonetim-sistemi']
export const landingHref = (slug) => `/tr/${slug}`
export const isLandingSlug = (slug) => Object.hasOwn(LANDING_ROUTES, slug)
