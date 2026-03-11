/**
 * Central SEO metadata – global and per-page. Used by layout and page routes.
 * No duplicate meta: each page imports from here and exports once.
 */

export const SITE_URL = 'https://mustafaoner.net'

/** Global default meta (fallback) */
export const GLOBAL_META = {
  en: {
    title: 'Mustafa Oner | Web Developer & Digital Systems',
    description:
      'Portfolio of Mustafa Oner. Web development, corporate websites, ecommerce platforms and custom software solutions.',
    keywords: [
      'web development',
      'web design',
      'ecommerce website',
      'corporate website',
      'frontend developer',
      'nextjs developer',
      'react developer',
      'ui design',
      'software developer',
      'portfolio website',
    ],
  },
  tr: {
    title: 'Mustafa Öner | Web Geliştirici ve Dijital Sistemler',
    description:
      "Mustafa Öner'in portföy sitesi. Web geliştirme, e-ticaret platformları, kurumsal web siteleri ve özel yazılım projeleri.",
    keywords: [
      'web geliştirme',
      'web tasarım',
      'e-ticaret sitesi',
      'kurumsal web sitesi',
      'frontend developer',
      'nextjs developer',
      'react developer',
      'ui tasarım',
      'özel yazılım geliştirme',
      'web developer portfolio',
    ],
  },
}

/** OG images */
export const OG_IMAGES = {
  en: `${SITE_URL}/images/og/og-home-en.jpeg`,
  tr: `${SITE_URL}/images/og/og-home.jpeg`,
}

/** Per-page meta: home, projects, services, contact (each with en/tr) */
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
  projects: {
    en: {
      title: 'Projects | Web Development Portfolio',
      description:
        'Explore software projects including web applications, frontend systems, UI design and digital platforms.',
    },
    tr: {
      title: 'Projeler | Yazılım ve Web Geliştirme',
      description:
        'Web uygulamaları, arayüz sistemleri ve yazılım projelerinin yer aldığı proje koleksiyonu.',
    },
  },
  services: {
    en: {
      title: 'Services | Web Development & Digital Solutions',
      description:
        'Web development, corporate websites, e-commerce platforms and custom software solutions.',
    },
    tr: {
      title: 'Hizmetler | Web Geliştirme ve Dijital Çözümler',
      description:
        'Web geliştirme, kurumsal web siteleri, e-ticaret platformları ve özel yazılım çözümleri.',
    },
  },
  contact: {
    en: {
      title: 'Contact | Mustafa Oner',
      description: 'Get in touch for web development and digital project inquiries.',
    },
    tr: {
      title: 'İletişim | Mustafa Öner',
      description: 'Web geliştirme ve dijital proje talepleri için iletişime geçin.',
    },
  },
}

/** Project detail meta by slug */
export const PROJECT_META = {
  'mavi-iletisim': {
    en: {
      title: 'Mavi Iletisim Demo Website | Web Development Project',
      description:
        'Demo corporate website showcasing product systems, UI structure, category architecture and frontend interaction design.',
    },
    tr: {
      title: 'Mavi İletişim Demo Web Sitesi | Web Geliştirme Projesi',
      description:
        'Ürün sistemi, kategori yapısı ve kullanıcı etkileşimlerini gösteren kurumsal web sitesi demo projesi.',
    },
  },
  'kadraj-rotam': {
    en: {
      title: 'Kadraj Rotam | Photography Route Discovery Platform',
      description:
        'A photography-focused digital platform designed for route discovery, visual storytelling and performance-focused frontend architecture.',
    },
    tr: {
      title: 'Kadraj Rotam | Fotoğraf Rota Keşif Platformu',
      description:
        'Fotoğraf hikâyeleri ve rota keşfi için geliştirilmiş görsel odaklı dijital platform.',
    },
  },
}

export const PROJECT_SLUGS = Object.keys(PROJECT_META)

export function getProjectMeta(slug) {
  return PROJECT_META[slug] ?? null
}
