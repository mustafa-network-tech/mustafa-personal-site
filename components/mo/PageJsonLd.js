// Kişisel site alt sayfaları için sunucu tarafı JSON-LD: BreadcrumbList + sayfaya uygun tür (Book, ImageGallery).
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/seo/metadata'
import { getBreadcrumbListSchema } from '@/seo/schema'
import { NAV, PAGES } from '@/lib/mo/site'
import { pageMetadata } from '@/lib/mo/meta'
import { PAGE_PHOTOS } from '@/lib/mo/photos'
import { BOOK } from '@/content/book'

const abs = (u) => (u.startsWith('http') ? u : `${SITE_URL}${encodeURI(u)}`)
const PERSON_REF = { '@id': `${SITE_URL}/#person` }

export default function PageJsonLd({ pageKey, lang }) {
  const tr = lang === 'tr'
  const path = PAGES[pageKey][lang]
  const m = pageMetadata(pageKey, lang)
  const label = pageKey === 'privacy' ? (tr ? 'Gizlilik' : 'Privacy') : NAV.find((n) => n.key === pageKey)[tr ? 'tr' : 'en']
  const data = [getBreadcrumbListSchema([{ name: tr ? 'Ana sayfa' : 'Home', url: PAGES.home[lang] }, { name: label, url: path }])]

  if (pageKey === 'book') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': `${SITE_URL}${path}#book`,
      name: BOOK.title,
      author: PERSON_REF,
      inLanguage: 'tr',
      image: abs(BOOK.cover),
      url: `${SITE_URL}${path}`,
      description: m.description,
    })
  }
  if (pageKey === 'photo') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      '@id': `${SITE_URL}${path}#gallery`,
      name: m.title,
      description: m.description,
      url: `${SITE_URL}${path}`,
      inLanguage: tr ? 'tr-TR' : 'en',
      author: PERSON_REF,
      image: PAGE_PHOTOS.map((p) => ({ '@type': 'ImageObject', contentUrl: abs(p.src), creator: PERSON_REF })),
    })
  }
  return <JsonLd data={data} />
}
