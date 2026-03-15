// app/showcase/page.js – Showcase (EN)
import ShowcasePageContent from '@/components/showcase/ShowcasePageContent'
import { SITE_URL, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const title = 'Showcase | ' + (GLOBAL_META.en?.title || 'Mustafa Oner')
const description = 'Digital platforms, corporate websites and applications by Mustafa Oner.'

export const metadata = {
  title,
  description,
  alternates: {
    canonical: '/showcase',
    languages: { en: '/showcase', tr: '/tr/showcase', 'x-default': '/showcase' },
  },
  openGraph: buildOpenGraph({ locale: 'en', path: '/showcase', title, description }),
  twitter: buildTwitterCard({ title, description }),
}

export default function ShowcaseEn() {
  return <ShowcasePageContent />
}
