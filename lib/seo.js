/**
 * SEO config – base URL, global defaults, project metadata for generateMetadata
 */

export const SITE_URL = 'https://mustafaoner.net'

export const DEFAULT_META = {
  en: {
    title: 'Mustafa Oner | Web Developer • Frontend • Next.js',
    description:
      'Portfolio of Mustafa Oner showcasing web development, frontend engineering, UI design, corporate websites, e-commerce systems and modern Next.js applications.',
  },
  tr: {
    title: "Mustafa Öner | Web Geliştirici • Frontend • Next.js",
    description:
      "Mustafa Öner'in web geliştirme, frontend mühendisliği ve UI tasarımı projelerini içeren portföy sitesi. Kurumsal web siteleri, e-ticaret sistemleri ve Next.js uygulamaları.",
  },
}

/** Open Graph & Twitter card metadata for homepage (social sharing) */
export const HOME_OG = {
  en: {
    title: 'Mustafa Oner | Web Developer & Digital Systems',
    description:
      'Portfolio featuring web development, corporate websites, e-commerce platforms and custom software projects.',
    image: `${SITE_URL}/images/og/og-home-en.jpeg`,
    siteName: 'Mustafa Oner',
    locale: 'en_US',
  },
  tr: {
    title: 'Mustafa Öner | Web Geliştirici ve Dijital Sistemler',
    description:
      'Web geliştirme, e-ticaret, kurumsal web siteleri ve özel yazılım projelerini içeren portföy sitesi.',
    image: `${SITE_URL}/images/og/og-home.jpeg`,
    siteName: 'Mustafa Öner',
    locale: 'tr_TR',
  },
}

/** Page-level metadata (home, projects list) */
export const PAGE_META = {
  home: {
    en: {
      title: 'Mustafa Oner | Developer Portfolio',
      description:
        'Developer portfolio featuring web development, UI systems, frontend projects and digital platforms.',
    },
    tr: {
      title: 'Mustafa Öner | Yazılımcı Portföyü',
      description:
        'Web geliştirme projeleri, arayüz sistemleri ve yazılım çalışmalarını içeren portföy sitesi.',
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
}

/** Project detail SEO: slug -> { title_en, description_en, title_tr, description_tr } */
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

/** All project slugs for 404 and alternates */
export const PROJECT_SLUGS = Object.keys(PROJECT_META)

export function getProjectMeta(slug) {
  return PROJECT_META[slug] ?? null
}
