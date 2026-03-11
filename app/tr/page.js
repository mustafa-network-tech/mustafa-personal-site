// app/tr/page.js – Turkish home
import HomeContent from '@/components/HomeContent'
import { SITE_URL, GLOBAL_META, PAGE_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const meta = PAGE_META.home.tr
const og = buildOpenGraph({ locale: 'tr', path: '/tr', title: meta.title, description: meta.description, image: OG_IMAGES.tr })
const twitter = buildTwitterCard({ title: meta.title, description: meta.description, image: OG_IMAGES.tr })

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.tr.keywords,
  alternates: {
    canonical: '/tr',
    languages: { tr: '/tr', en: '/', 'x-default': '/' },
  },
  openGraph: og,
  twitter,
}

export default function HomeTr() {
  return <HomeContent />
}
