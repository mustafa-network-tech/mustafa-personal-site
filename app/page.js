// app/page.js – English home
import HomeContent from '@/components/HomeContent'
import { SITE_URL, PAGE_META, HOME_OG } from '@/lib/seo'

const og = HOME_OG.en

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
    type: 'website',
    locale: og.locale,
    url: SITE_URL,
    siteName: og.siteName,
    title: og.title,
    description: og.description,
    images: [{ url: og.image, width: 1200, height: 630, alt: og.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: og.title,
    description: og.description,
    images: [og.image],
  },
}

export default function HomeEn() {
  return <HomeContent />
}