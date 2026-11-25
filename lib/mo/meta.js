// Yeni kişisel site sayfalarının SEO üst verisi (canonical, hreflang, OG).
import { GLOBAL_META, PAGE_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { PAGES } from './site'

const META = {
  home: PAGE_META.home,
  contact: PAGE_META.contact,
  about: {
    tr: { title: 'Hakkımda | Mustafa Öner', description: 'Mustafa Öner kimdir? Emekle şekillenen yaşam yolculuğu; fiber optik altyapı, yazılım, doğa fotoğrafçılığı, gezi ve edebiyat üzerine kişisel bir tanışma.' },
    en: { title: 'About | Mustafa Öner', description: "Who is Mustafa Öner? A life journey shaped by hard work: a personal introduction around fiber optic infrastructure, software, nature photography, travel and literature." },
  },
  experience: {
    tr: { title: 'Mesleki Deneyim | Mustafa Öner', description: 'Fiber optik altyapı, ek ve sonlandırma, ölçüm ve test, telekomünikasyon ve saha çalışmalarındaki mesleki deneyim.' },
    en: { title: 'Professional Experience | Mustafa Öner', description: 'Professional experience in fiber optic infrastructure, splicing and termination, measurement and testing, telecommunications and field work.' },
  },
  photo: {
    tr: { title: 'Fotoğraf, Gezi ve Doğa | Mustafa Öner', description: "Mustafa Öner'in kadrajından doğa, manzara, şehir ve gezi fotoğrafları. Sakladığı anlar: bir his, bir mekân, bir an." },
    en: { title: 'Photography, Travel & Nature | Mustafa Öner', description: "Nature, landscape, city and travel photographs through Mustafa Öner's lens. Moments he keeps: a feeling, a place, an instant." },
  },
  projects: {
    tr: { title: 'Projelerim | Mustafa Öner', description: "Mustafa Öner'in çalıştığı ve geliştirdiği dijital projeler ve markalar: MK Digital Systems, MK OPS, Mavi Kadraj ve diğerleri." },
    en: { title: 'Projects | Mustafa Öner', description: 'Digital projects and brands Mustafa Öner works on and develops: MK Digital Systems, MK OPS, Mavi Kadraj and more.' },
  },
  book: {
    tr: { title: 'Yoldaşın Mücadelesi | Mustafa Öner', description: "Mustafa Öner'in kitabı Yoldaşın Mücadelesi: kitap hakkında bilgi ve yazarın önsözü." },
    en: { title: 'Yoldaşın Mücadelesi | Mustafa Öner', description: "Yoldaşın Mücadelesi, a book by Mustafa Öner: about the book and the author's foreword (in Turkish)." },
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
