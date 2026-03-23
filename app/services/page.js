// app/services/page.js – English services
import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema, getServicesPageSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import ServicesPageContent from '@/components/ServicesPageContent'

const meta = PAGE_META.services.en
const og = buildOpenGraph({ locale: 'en', path: '/services', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ locale: 'en', title: meta.title, description: meta.description, image: OG_IMAGES.en })

const breadcrumbJson = getBreadcrumbListSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.en.keywords,
  alternates: { canonical: '/services', languages: { en: '/services', tr: '/tr/services', 'x-default': '/services' } },
  openGraph: og,
  twitter,
}

export default function ServicesEn() {
  return (
    <>
      <JsonLd data={[breadcrumbJson, getServicesPageSchema('en')]} />
      <ServicesPageContent />
    </>
  )
}
