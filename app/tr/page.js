// app/tr/page.js – Turkish home
import HomeContent from '@/components/HomeContent'
import { SITE_URL, PAGE_META } from '@/lib/seo'

export const metadata = {
  title: PAGE_META.home.tr.title,
  description: PAGE_META.home.tr.description,
  alternates: {
    canonical: '/tr',
    languages: {
      tr: '/tr',
      en: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: PAGE_META.home.tr.title,
    description: PAGE_META.home.tr.description,
    url: `${SITE_URL}/tr`,
  },
}

export default function HomeTr() {
  return <HomeContent />
}
