// app/tr/services/page.js – Turkish services
import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema, getServicesPageSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import ServicesPageContent from '@/components/ServicesPageContent'

const meta = PAGE_META.services.tr
const og = buildOpenGraph({ locale: 'tr', path: '/tr/services', title: meta.title, description: meta.description, image: OG_IMAGES.tr })
const twitter = buildTwitterCard({ locale: 'tr', title: meta.title, description: meta.description, image: OG_IMAGES.tr })

const breadcrumbJson = getBreadcrumbListSchema([
  { name: 'Ana sayfa', url: '/tr' },
  { name: 'Hizmetler', url: '/tr/services' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.tr.keywords,
  alternates: { canonical: '/tr/services', languages: { tr: '/tr/services', en: '/services', 'x-default': '/services' } },
  openGraph: og,
  twitter,
}

export default function ServicesTr() {
  return (
    <>
      <JsonLd data={[breadcrumbJson, getServicesPageSchema('tr')]} />
      <ServicesPageContent />
    </>
  )
}
