// app/page.js – English home
import HomeContent from '@/components/HomeContent'
import { SITE_URL, PAGE_META } from '@/lib/seo'

export const metadata = {
  title: PAGE_META.home.en.title,
  description: PAGE_META.home.en.description,
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      tr: '/tr',
      'x-default': '/',
    },
  },
  openGraph: {
    title: PAGE_META.home.en.title,
    description: PAGE_META.home.en.description,
    url: SITE_URL,
  },
}

export default function HomeEn() {
  return <HomeContent />
}