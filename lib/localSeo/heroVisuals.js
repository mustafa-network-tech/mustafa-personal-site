/** Şehir sayfası hero arka planları ve daktilo satırları */

const HERO_IMAGES = [
  '/images/hero-slide-2.jpeg',
  '/images/hero-slide-3.jpeg',
  '/images/hero-slide-4.jpeg',
  '/images/hero2-bg.jpeg',
]

/** Slug → arka plan (hepsi benzersiz görsel) */
export const HERO_BACKGROUND_BY_SLUG = {
  'bolu-web-tasarim': '/images/hero-slide-3.jpeg',
  'bolu-kurumsal-web-sitesi': '/images/hero-slide-2.jpeg',
  'izmit-web-tasarim': '/images/hero-slide-4.jpeg',
  'izmit-fabrika-web-sitesi': '/images/hero2-bg.jpeg',
  'adapazari-e-ticaret-web-sitesi': '/images/hero-slide-2.jpeg',
  'adapazari-web-tasarim': '/images/hero-slide-3.jpeg',
  'duzce-seo-uyumlu-web-sitesi': '/images/hero-slide-4.jpeg',
  'duzce-kurumsal-web-tasarim': '/images/hero2-bg.jpeg',
  'zonguldak-web-tasarim': '/images/hero-slide-3.jpeg',
  'zonguldak-kucuk-isletme-web-sitesi': '/images/hero-slide-2.jpeg',
  'canakkale-otel-web-sitesi': '/images/hero-slide-4.jpeg',
  'canakkale-web-tasarim': '/images/hero2-bg.jpeg',
  'balikesir-web-tasarim': '/images/hero-slide-2.jpeg',
  'balikesir-dijital-ajans': '/images/hero-slide-3.jpeg',
  'bartin-web-tasarim': '/images/hero-slide-4.jpeg',
  'bartin-mobil-uyumlu-web-sitesi': '/images/hero2-bg.jpeg',
}

/** Slug → daktilo ile dönen kısa satırlar (yalnızca bazı sayfalar) */
export const HERO_TYPEWRITER_BY_SLUG = {
  'bolu-web-tasarim': [
    'Bolu için mobil uyumlu web tasarım',
    'Yerel SEO odaklı kurumsal vitrin',
    'Hızlı yüklenen modern arayüz',
  ],
  'bolu-kurumsal-web-sitesi': [
    'Kurumsal güven ve net hizmet sayfaları',
    'Yönetilebilir kurumsal web yapısı',
    'Bolu markası için profesyonel dil',
  ],
  'izmit-web-tasarim': [
    'İzmit B2B web arayüz çözümleri',
    'Sanayi uyumlu sade tasarım',
    'Mobil öncelikli dijital vitrin',
  ],
  'izmit-fabrika-web-sitesi': [
    'Fabrika kapasite ve üretim vitrini',
    'İhracat odaklı kurumsal site',
    'Teknik güven veren sayfa yapısı',
  ],
  'adapazari-e-ticaret-web-sitesi': [
    'Adapazarı e-ticaret mağaza yapısı',
    'Mobil alışveriş deneyimi',
    'Dönüşüm odaklı ürün kataloğu',
  ],
  'duzce-seo-uyumlu-web-sitesi': [
    'Düzce yerel arama görünürlüğü',
    'SEO uyumlu sayfa iskeleti',
    'Hız ve indeks dostu kod',
  ],
  'canakkale-otel-web-sitesi': [
    'Otel ve turizm web tasarımı',
    'Rezervasyon odaklı CTA yapısı',
    'Görsel hikâye ile konaklama vitrini',
  ],
  'balikesir-dijital-ajans': [
    'Balıkesir dijital marka üretimi',
    'Web + yazılım tek ekip',
    'Ölçeklenebilir dijital sistemler',
  ],
  'zonguldak-web-tasarim': [
    'Zonguldak yerel işletme web sitesi',
    'Telefon trafiğine uygun arayüz',
    'WhatsApp ile hızlı talep hattı',
  ],
  'bartin-mobil-uyumlu-web-sitesi': [
    'Bartın mobil öncelikli site',
    'Dokunmatik dostu menü ve form',
    'Kıyı turizmine uygun vitrin',
  ],
}

export function getHeroBackground(slug) {
  return HERO_BACKGROUND_BY_SLUG[slug] || HERO_IMAGES[slug.length % HERO_IMAGES.length]
}

export function getHeroTypewriterLines(slug) {
  return HERO_TYPEWRITER_BY_SLUG[slug] || null
}
