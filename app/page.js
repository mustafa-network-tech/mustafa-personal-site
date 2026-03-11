// app/page.js – English home
import HomeContent from '@/components/HomeContent'
import { SITE_URL, GLOBAL_META, PAGE_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const meta = PAGE_META.home.en
const og = buildOpenGraph({ locale: 'en', path: '', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ title: meta.title, description: meta.description, image: OG_IMAGES.en })

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.en.keywords,
  alternates: {
    canonical: '/',
    languages: { en: '/', tr: '/tr', 'x-default': '/' },
  },
  openGraph: og,
  twitter,
}

export default function HomeEn() {
  return <HomeContent />
}