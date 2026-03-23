// app/vitrin/page.js – Portfolio showcase (EN)
import ShowcasePageContent from '@/components/showcase/ShowcasePageContent'
import { PAGE_META, GLOBAL_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const meta = PAGE_META.vitrin.en
const og = buildOpenGraph({ locale: 'en', path: '/vitrin', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ locale: 'en', title: meta.title, description: meta.description, image: OG_IMAGES.en })

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.en.keywords,
  alternates: {
    canonical: '/vitrin',
    languages: { en: '/vitrin', tr: '/tr/vitrin', 'x-default': '/vitrin' },
  },
  openGraph: og,
  twitter,
}

export default function VitrinEn() {
  return <ShowcasePageContent />
}
