// app/tr/vitrin/page.js – Vitrin (TR)
import ShowcasePageContent from '@/components/showcase/ShowcasePageContent'
import { PAGE_META, GLOBAL_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const meta = PAGE_META.vitrin.tr
const og = buildOpenGraph({ locale: 'tr', path: '/tr/vitrin', title: meta.title, description: meta.description, image: OG_IMAGES.tr })
const twitter = buildTwitterCard({ locale: 'tr', title: meta.title, description: meta.description, image: OG_IMAGES.tr })

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.tr.keywords,
  alternates: {
    canonical: '/tr/vitrin',
    languages: { tr: '/tr/vitrin', en: '/vitrin', 'x-default': '/vitrin' },
  },
  openGraph: og,
  twitter,
}

export default function VitrinTr() {
  return <ShowcasePageContent />
}
