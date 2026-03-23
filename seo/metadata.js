/**
 * Central SEO metadata – global and per-page. Used by layout and page routes.
 * Bilingual: en / tr. Canonical + alternates set per route.
 */

export const SITE_URL = 'https://mustafaoner.net'

/** Global default meta (fallback) */
export const GLOBAL_META = {
  en: {
    title: 'Mustafa Oner | Web Developer, Web Design & Digital Systems',
    description:
      'Web development and web design for corporate websites, e-commerce, custom software, management panels, mobile apps and digital product builds. Portfolio and services by Mustafa Oner.',
    keywords: [
      'web development',
      'web design',
      'corporate website',
      'custom software',
      'digital systems',
      'management panel',
      'e-commerce',
      'landing page',
      'mobile app',
      'digital product development',
      'software solutions',
      'Next.js developer',
      'React developer',
      'portfolio',
    ],
  },
  tr: {
    title: 'Mustafa Öner | Web Geliştirme, Web Tasarım ve Dijital Sistemler',
    description:
      'Kurumsal web sitesi, e-ticaret, özel yazılım, yönetim paneli, mobil uygulama ve dijital ürün geliştirme. Mustafa Öner portföy ve hizmetleri.',
    keywords: [
      'web geliştirme',
      'web tasarım',
      'kurumsal web sitesi',
      'özel yazılım',
      'dijital sistemler',
      'yönetim paneli',
      'e-ticaret',
      'landing page',
      'mobil uygulama',
      'dijital ürün geliştirme',
      'yazılım çözümleri',
      'Next.js developer',
      'portföy',
    ],
  },
}

/** OG images */
export const OG_IMAGES = {
  en: `${SITE_URL}/images/og/og-home-en.jpeg`,
  tr: `${SITE_URL}/images/og/og-home.jpeg`,
}

/** Per-page meta: home, projects, services, contact, vitrin (each with en/tr) */
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
      title: 'Projects | Web Development & Software Portfolio',
      description:
        'Curated web development and software projects: corporate sites, demos, platforms and case-style write-ups. Explore work spanning UI systems, dashboards and digital products.',
    },
    tr: {
      title: 'Projeler | Web Geliştirme ve Yazılım Portföyü',
      description:
        'Seçilmiş web geliştirme ve yazılım projeleri: kurumsal siteler, demolar ve dijital platformlar. Arayüz sistemleri, paneller ve ürün örnekleri.',
    },
  },
  services: {
    en: {
      title: 'Services | Web Design, Custom Software & Digital Solutions',
      description:
        'Web design, web development, e-commerce, management panels, mobile apps, landing pages and custom software for businesses that need clear, maintainable digital systems.',
    },
    tr: {
      title: 'Hizmetler | Web Tasarım, Özel Yazılım ve Dijital Çözümler',
      description:
        'Web tasarımı, web geliştirme, e-ticaret, yönetim panelleri, mobil uygulama, landing page ve özel yazılım — sürdürülebilir dijital sistemler için.',
    },
  },
  contact: {
    en: {
      title: 'Contact | Web & Software Project Inquiries',
      description:
        'Contact Mustafa Oner for web development, custom software, corporate websites and digital project inquiries. Short response window — send a brief and preferred timeline.',
    },
    tr: {
      title: 'İletişim | Web ve Yazılım Proje Talepleri',
      description:
        'Web geliştirme, özel yazılım, kurumsal web sitesi ve dijital proje talepleri için iletişime geçin. Kısa bir özet ve tercih ettiğiniz zaman çerçevesi ile yazabilirsiniz.',
    },
  },
  vitrin: {
    en: {
      title: 'Showcase | Digital Platforms, Websites & Apps',
      description:
        'Broad project showcase: SaaS-style platforms, corporate websites, personal brand sites and mobile apps — web development, UI systems and digital product samples in one place.',
    },
    tr: {
      title: 'Vitrin | Dijital Platformlar, Web Siteleri ve Uygulamalar',
      description:
        'Geniş proje vitrini: SaaS tarzı platformlar, kurumsal web siteleri, kişisel marka projeleri ve mobil uygulamalar — web geliştirme ve dijital ürün örnekleri tek sayfada.',
    },
  },
}

/** Project detail meta by slug */
export const PROJECT_META = {
  'mavi-iletisim': {
    en: {
      title: 'Mavi İletişim Demo | Corporate Website & Web Development',
      description:
        'Demo corporate website for telecom and technical services: structured product areas, clear navigation and interaction-focused frontend patterns.',
    },
    tr: {
      title: 'Mavi İletişim Demo | Kurumsal Web Sitesi ve Web Geliştirme',
      description:
        'Telekom ve teknik servis odaklı kurumsal site demosu: ürün alanları, net gezinme ve etkileşim odaklı arayüz yapısı.',
    },
  },
  'kadraj-rotam': {
    en: {
      title: 'Kadraj Rotam | Photography & Route Discovery Platform',
      description:
        'A photography-led digital platform for route discovery and visual storytelling, built with a performance-aware frontend and clear content hierarchy.',
    },
    tr: {
      title: 'Kadraj Rotam | Fotoğraf ve Rota Keşif Platformu',
      description:
        'Fotoğraf odaklı rota keşfi ve görsel anlatım için dijital platform; performans bilinci yüksek arayüz ve sade içerik hiyerarşisi.',
    },
  },
}

/** Extra on-page copy for project detail (no fabricated metrics) */
export const PROJECT_DETAIL_SECTIONS = {
  'mavi-iletisim': {
    en: {
      intro:
        'This page highlights a demo corporate website aimed at telecom and technical service businesses. The focus is on clear information architecture, scannable service areas and predictable UI patterns visitors can navigate quickly.',
      blocks: [
        {
          heading: 'Service relevance',
          text: 'The layout is suited to companies that need to present service tiers, product families and contact paths without clutter. Emphasis is placed on structured sections rather than one long scrolling text block.',
        },
        {
          heading: 'Frontend & UX intent',
          text: 'Interaction design prioritizes readable typography, consistent spacing and components that can scale if the catalog grows. The demo is a reference for how a production site could organize similar content.',
        },
      ],
    },
    tr: {
      intro:
        'Bu sayfa, telekom ve teknik servis işletmeleri için hazırlanmış kurumsal site demosunu özetler. Odak; net bilgi mimarisi, taranabilir hizmet alanları ve ziyaretçinin hızlıca gezinebileceği tutarlı arayüz kalıplarıdır.',
      blocks: [
        {
          heading: 'Hizmet uyumu',
          text: 'Kurgu; hizmet seviyeleri, ürün grupları ve iletişim yollarını kalabalık etmeden sunması gereken işletmeler için uygundur. Uzun tek metin yerine yapılandırılmış bölümler ön plandadır.',
        },
        {
          heading: 'Arayüz ve kullanım',
          text: 'Etkileşim tarafında okunabilir tipografi, tutarlı boşluklar ve katalog büyüdükçe genişleyebilecek bileşen düzeni hedeflenir. Demo, benzer içeriği düzenlemek için bir referans niteliğindedir.',
        },
      ],
    },
  },
  'kadraj-rotam': {
    en: {
      intro:
        'Kadraj Rotam is presented as a photography-oriented platform where routes and visual stories come together. The implementation stresses fast loading, legible maps of content and a calm visual hierarchy suitable for creative work.',
      blocks: [
        {
          heading: 'Product intent',
          text: 'The project is positioned for discovery and storytelling: helping users browse routes and imagery in a coherent flow. It is a practical example of a niche digital product with a strong visual identity.',
        },
        {
          heading: 'Technical approach',
          text: 'Frontend structure is kept maintainable so new regions, points of interest or media types can be added without rewriting the whole interface. Performance considerations are part of the design, not an afterthought.',
        },
      ],
    },
    tr: {
      intro:
        'Kadraj Rotam; rotaların ve görsel hikâyelerin bir araya geldiği, fotoğraf odaklı bir platform olarak sunulur. Hızlı yükleme, okunaklı içerik düzeni ve yaratıcı işe uygun sakin bir hiyerarşi hedeflenir.',
      blocks: [
        {
          heading: 'Ürün odağı',
          text: 'Proje; keşif ve anlatım için konumlandırılmıştır — kullanıcıların rota ve görselleri tutarlı bir akışta gezmesini destekler. Güçlü görsel kimyaya sahip niş bir dijital ürün örneğidir.',
        },
        {
          heading: 'Teknik yaklaşım',
          text: 'Arayüz yapısı sürdürülebilir tutulur; yeni bölgeler, ilgi noktaları veya medya türleri tüm yüzeyi baştan yazmadan eklenebilir. Performans, sonradan eklenen bir detay değil tasarımın parçasıdır.',
        },
      ],
    },
  },
}

export const PROJECT_SLUGS = Object.keys(PROJECT_META)

export function getProjectMeta(slug) {
  return PROJECT_META[slug] ?? null
}

export function getProjectDetailSections(slug) {
  return PROJECT_DETAIL_SECTIONS[slug] ?? null
}
