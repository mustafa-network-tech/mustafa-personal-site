// Yeni kişisel site sayfalarının SEO üst verisi (canonical, hreflang, OG).
import { GLOBAL_META, PAGE_META, SITE_URL } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { PAGES } from './site'

const META = {
  home: PAGE_META.home,
  contact: PAGE_META.contact,
  about: {
    tr: { title: 'Hakkımda | Mustafa Öner', description: "Mustafa Öner'in yaşam yolculuğu, teknolojiye olan ilgisi, doğa tutkusu, fotoğrafçılık ve edebiyatla şekillenen kişisel dünyası." },
    en: { title: 'About | Mustafa Öner', description: "Mustafa Öner's life journey and personal world, shaped by his interest in technology, his passion for nature, photography and literature." },
  },
  experience: {
    tr: { title: 'Mesleki Deneyim | Mustafa Öner', description: 'Fiber optik altyapı, telekomünikasyon, saha çalışmaları, web teknolojileri ve yazılım alanındaki mesleki deneyimlerim.' },
    en: { title: 'Professional Experience | Mustafa Öner', description: 'My professional experience in fiber optic infrastructure, telecommunications, field work, web technologies and software.' },
  },
  photo: {
    tr: { title: "Mustafa'nın Kadrajından | Fotoğraf, Gezi ve Doğa", description: "Doğadan, şehirlerden ve yolculuklardan objektifime yansıyan kareler. Mustafa Öner'in kişisel fotoğraf koleksiyonu." },
    en: { title: "Through Mustafa's Lens | Photography, Travel & Nature", description: "Frames from nature, cities and journeys, as seen through my lens. Mustafa Öner's personal photography collection." },
  },
  projects: {
    tr: { title: 'Projelerim | Mustafa Öner', description: 'Geliştirdiğim yazılım projeleri, dijital sistemler, web platformları ve yaratıcı çalışmalar.' },
    en: { title: 'Projects | Mustafa Öner', description: 'Software projects, digital systems, web platforms and creative work I have developed.' },
  },
  privacy: {
    tr: { title: 'Gizlilik | Mustafa Öner', description: 'mustafaoner.net sitesinde hangi bilgilerin işlendiği, çerezler, Google Analytics ve kişisel verilerinize ilişkin haklarınız.' },
    en: { title: 'Privacy | Mustafa Öner', description: 'What information is processed on mustafaoner.net, cookies, Google Analytics and your rights regarding your personal data.' },
  },
  book: {
    tr: { title: 'Yoldaşın Mücadelesi | Mustafa Öner', description: "Mustafa Öner'in Yoldaşın Mücadelesi adlı kitabının tanıtımı ve edebiyat dünyasına açılan kişisel bir pencere." },
    en: { title: 'Yoldaşın Mücadelesi | Mustafa Öner', description: "An introduction to Mustafa Öner's book Yoldaşın Mücadelesi, and a personal window into the world of literature." },
  },
}

// Sayfaya özgü paylaşım görseli (1200x630, mutlak HTTPS adres)
const OG_FILE = { home: 'og-home', about: 'og-about', experience: 'og-experience', photo: 'og-photo', projects: 'og-projects', book: 'og-book', contact: 'og-contact', privacy: 'og-home' }
export const ogImage = (key) => `${SITE_URL}/images/og/${OG_FILE[key] || 'og-home'}.jpg`

export function pageMetadata(key, lang) {
  const m = META[key][lang]
  const path = PAGES[key][lang]
  return {
    title: m.title,
    description: m.description,
    keywords: GLOBAL_META[lang].keywords,
    alternates: { canonical: path, languages: { tr: PAGES[key].tr, en: PAGES[key].en, 'x-default': PAGES[key].tr } },
    openGraph: buildOpenGraph({ locale: lang, path, title: m.title, description: m.description, image: ogImage(key) }),
    twitter: buildTwitterCard({ locale: lang, title: m.title, description: m.description, image: ogImage(key) }),
  }
}
