// Yeni kişisel site sayfalarının SEO üst verisi (canonical, hreflang, OG).
import { GLOBAL_META, PAGE_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { PAGES } from './site'

const META = {
  home: PAGE_META.home,
  contact: PAGE_META.contact,
  about: {
    tr: { title: 'Hakkımda | Mustafa Öner', description: 'Çanakkale ve Bolu merkezli çalışan Mustafa Öner: yazılım, dijital sistemler, fotoğraf ve çalışma ilkeleri.' },
    en: { title: 'About | Mustafa Oner', description: 'Mustafa Oner works from Çanakkale and Bolu: software, digital systems, photography and working principles.' },
  },
  experience: {
    tr: { title: 'Mesleki Deneyim | Mustafa Öner', description: 'Fiber optik altyapı, ek ve sonlandırma, ölçüm ve test, telekomünikasyon ve saha çalışmalarındaki mesleki deneyim. Kişisel mesleki portföy.' },
    en: { title: 'Professional Experience | Mustafa Oner', description: 'Professional experience in fiber optic infrastructure, splicing and termination, measurement and testing, telecommunications and field work. A personal professional portfolio.' },
  },
  photo: {
    tr: { title: 'Fotoğraf, Gezi ve Doğa | Mustafa Öner', description: 'Mustafa’nın kadrajından doğa, manzara, şehir ve gezi fotoğrafları. Sakladığım anlar — bir his, bir mekân, bir an.' },
    en: { title: 'Photography, Travel & Nature | Mustafa Oner', description: 'Nature, landscape, city and travel photographs through Mustafa’s lens. Moments I keep — a feeling, a place, an instant.' },
  },
  projects: {
    tr: { title: 'Projelerim | Mustafa Öner', description: 'Mustafa Öner’in çalıştığı ve geliştirdiği dijital projeler: MK Digital Systems, Mavi Kadraj ve MK OPS.' },
    en: { title: 'Projects | Mustafa Oner', description: 'Digital projects Mustafa Oner works on: MK Digital Systems, Mavi Kadraj and MK OPS.' },
  },
  book: {
    tr: { title: 'Yoldaşın Mücadelesi | Mustafa Öner', description: 'Mustafa Öner’in Yoldaşın Mücadelesi kitabının tanıtım sayfası.' },
    en: { title: 'Yoldaşın Mücadelesi | Mustafa Oner', description: 'Introduction page for Mustafa Oner’s book Yoldaşın Mücadelesi.' },
  },
}

export function pageMetadata(key, lang) {
  const m = META[key][lang]
  const path = PAGES[key][lang]
  return {
    title: m.title,
    description: m.description,
    keywords: GLOBAL_META[lang].keywords,
    alternates: { canonical: path, languages: { tr: PAGES[key].tr, en: PAGES[key].en, 'x-default': PAGES[key].tr } },
    openGraph: buildOpenGraph({ locale: lang, path, title: m.title, description: m.description, image: OG_IMAGES[lang] }),
    twitter: buildTwitterCard({ locale: lang, title: m.title, description: m.description, image: OG_IMAGES[lang] }),
  }
}
