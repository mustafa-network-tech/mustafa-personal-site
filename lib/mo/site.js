// Kişisel site: rota, navigasyon ve bağlantılar. Yeni içerik uydurulmaz; metinler projedeki mevcut içeriklerden gelir.

export const MK_DIGITAL = 'https://www.mk-digitalsystems.com'
export const EMAIL = 'mustafa82oner@gmail.com'
export const LINKEDIN = 'https://www.linkedin.com/in/mustafa-oner-/'
export const INSTAGRAM = 'https://www.instagram.com/mavi_kadraj14/'

/** Sayfa anahtarı -> TR / EN adres */
export const PAGES = {
  home: { tr: '/tr', en: '/en' },
  about: { tr: '/tr/hakkimda', en: '/en/about' },
  experience: { tr: '/tr/mesleki-deneyim', en: '/en/professional-experience' },
  photo: { tr: '/tr/fotograf-gezi-doga', en: '/en/photography-travel-nature' },
  projects: { tr: '/tr/projelerim', en: '/en/my-projects' },
  book: { tr: '/tr/yoldasin-mucadelesi', en: '/en/yoldasin-mucadelesi' },
  contact: { tr: '/tr/contact', en: '/contact' },
  privacy: { tr: '/tr/gizlilik', en: '/en/privacy' },
}

export const NAV = [
  { key: 'home', tr: 'Ana Sayfa', en: 'Home' },
  { key: 'about', tr: 'Hakkımda', en: 'About' },
  { key: 'experience', tr: 'Mesleki Deneyim', en: 'Professional Experience' },
  { key: 'photo', tr: 'Mustafa’nın Kadrajından', en: 'Through Mustafa’s Lens' },
  { key: 'projects', tr: 'Projelerim', en: 'Projects' },
  { key: 'book', tr: 'Yoldaşın Mücadelesi', en: 'Yoldaşın Mücadelesi' },
  { key: 'contact', tr: 'İletişim', en: 'Contact' },
]

export function pageHref(key, lang) {
  return PAGES[key][lang === 'en' ? 'en' : 'tr']
}

/** Pathname -> sayfa anahtarı (yoksa null: eski sayfalar) */
export function pageKeyFor(pathname) {
  const p = (pathname || '').replace(/\/$/, '') || '/'
  return Object.keys(PAGES).find((k) => PAGES[k].tr === p || PAGES[k].en === p) || null
}

/** Dil değiştirici için yeni sayfaların karşılığı (yoksa null) */
export function counterpartPath(pathname, toLang) {
  const key = pageKeyFor(pathname)
  return key ? PAGES[key][toLang] : null
}

export const SOCIALS = [
  ['LinkedIn', LINKEDIN],
  ['Instagram', INSTAGRAM],
  ['MK Digital Systems', MK_DIGITAL],
]

export const MAVI_KADRAJ = 'https://mavikadraj.com.tr'
export const INSTAGRAM_HANDLE = '@mavi_kadraj14'
