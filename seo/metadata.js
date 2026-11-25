/**
 * Central SEO metadata – global and per-page. Used by layout and page routes.
 * Bilingual: en / tr. Canonical + alternates set per route.
 */

export const SITE_URL = 'https://mustafaoner.net'

/** Global default meta (fallback) */
export const GLOBAL_META = {
  en: {
    title: 'Mustafa Öner | Personal Website',
    description:
      "Explore Mustafa Öner's personal world through technology, nature, photography, professional experience, creative projects and literature.",
    keywords: ['Mustafa Öner', 'personal website', 'technology', 'nature', 'photography', 'travel', 'literature', 'Yoldaşın Mücadelesi'],
  },
  tr: {
    title: 'Mustafa Öner | Kişisel Web Sitesi',
    description:
      "Teknoloji, doğa, fotoğrafçılık ve hayatın içinden hikâyeler. Mustafa Öner'in kişisel dünyası, mesleki deneyimleri, projeleri ve Yoldaşın Mücadelesi.",
    keywords: ['Mustafa Öner', 'kişisel web sitesi', 'teknoloji', 'doğa', 'fotoğrafçılık', 'gezi', 'edebiyat', 'Yoldaşın Mücadelesi'],
  },
}

/** OG images */
export const OG_IMAGES = {
  en: `${SITE_URL}/images/og/og-home.jpg`,
  tr: `${SITE_URL}/images/og/og-home.jpg`,
}

/** Per-page meta: home, contact (each with en/tr) */
export const PAGE_META = {
  home: {
    en: {
      title: GLOBAL_META.en.title,
      description: GLOBAL_META.en.description,
    },
    tr: {
      title: GLOBAL_META.tr.title,
      description: GLOBAL_META.tr.description,
    },
  },
  contact: {
    en: {
      title: 'Contact | Mustafa Öner',
      description:
        'Get in touch with Mustafa Öner. Send your thoughts, suggestions and anything you would like to share.',
    },
    tr: {
      title: 'İletişim | Mustafa Öner',
      description:
        'Mustafa Öner ile iletişime geçin. Düşüncelerinizi, önerilerinizi ve paylaşmak istediklerinizi iletin.',
    },
  },
}
