// app/tr/showcase/page.js – Showcase (TR)
import ShowcasePageContent from '@/components/showcase/ShowcasePageContent'
import { SITE_URL, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const title = 'Showcase | ' + (GLOBAL_META.tr?.title || 'Mustafa Öner')
const description = 'Mustafa Öner – Dijital platformlar, kurumsal web siteleri ve uygulamalar.'

export const metadata = {
  title,
  description,
  alternates: {
    canonical: '/tr/showcase',
    languages: { en: '/showcase', tr: '/tr/showcase', 'x-default': '/showcase' },
  },
  openGraph: buildOpenGraph({ locale: 'tr', path: '/tr/showcase', title, description }),
  twitter: buildTwitterCard({ title, description }),
}

export default function ShowcaseTr() {
  return <ShowcasePageContent />
}
