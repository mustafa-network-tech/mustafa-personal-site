// app/tr/page.js – Turkish home
import HomeContent from '@/components/HomeContent'
import { SITE_URL, PAGE_META, HOME_OG } from '@/lib/seo'

const og = HOME_OG.tr

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
    type: 'website',
    locale: og.locale,
    url: `${SITE_URL}/tr`,
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

export default function HomeTr() {
  return <HomeContent />
}
