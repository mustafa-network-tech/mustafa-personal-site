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
  'osmaniye-web-tasarim': 'https://images.unsplash.com/photo-1500382017468-90403fed3eff?w=1920&q=80',
  'osmaniye-kurumsal-web-sitesi': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80',
  'kilis-web-tasarim': 'https://images.unsplash.com/photo-1548013146-724f896c9f27?w=1920&q=80',
  'kilis-kurumsal-web-sitesi': 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1920&q=80',
  'yalova-web-tasarim': 'https://images.unsplash.com/photo-1437719417032-8595fd06e1cf?w=1920&q=80',
  'yalova-kurumsal-web-sitesi': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
  'karabuk-web-tasarim': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80',
  'karabuk-kurumsal-web-sitesi': 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80',
  'bilecik-web-tasarim': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
  'bilecik-kurumsal-web-sitesi': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  'kirklareli-web-tasarim': 'https://images.unsplash.com/photo-1500595046743-eed99c4fdd4b?w=1920&q=80',
  'kirklareli-kurumsal-web-sitesi': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80',
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
  'osmaniye-web-tasarim': [
    'Osmaniye tarım ve ticaret vitrini',
    'KOBİ odaklı mobil web tasarım',
    'Yerel arama dostu sayfa yapısı',
  ],
  'osmaniye-kurumsal-web-sitesi': [
    'Osmaniye kurumsal güven sitesi',
    'Çok sayfalı hizmet anlatımı',
    'Yönetilebilir kurumsal yapı',
  ],
  'kilis-web-tasarim': [
    'Kilis yerel işletme web sitesi',
    'Sınır ticaretine uygun vitrin',
    'Hızlı yüklenen modern arayüz',
  ],
  'yalova-web-tasarim': [
    'Yalova turizm ve hizmet vitrini',
    'Rezervasyon odaklı CTA yapısı',
    'Mobil öncelikli deneyim',
  ],
  'karabuk-web-tasarim': [
    'Karabük sanayi web arayüzü',
    'Üretim kapasitesi vitrini',
    'B2B güven veren tasarım',
  ],
  'bilecik-web-tasarim': [
    'Bilecik KOBİ dijital vitrini',
    'Lojistik ve sanayi uyumlu site',
    'SEO odaklı sayfa iskeleti',
  ],
  'kirklareli-web-tasarim': [
    'Kırklareli tarım ve turizm sitesi',
    'Trakya işletmeleri için web tasarım',
    'WhatsApp ile hızlı talep',
  ],
}

export function getHeroBackground(slug) {
  return HERO_BACKGROUND_BY_SLUG[slug] || HERO_IMAGES[slug.length % HERO_IMAGES.length]
}

export function getHeroTypewriterLines(slug) {
  return HERO_TYPEWRITER_BY_SLUG[slug] || null
}
