import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import LandingPageContent from '@/components/landingPages/LandingPageContent'
import { getLandingPage } from '@/lib/landingPages/pages'
import { LANDING_SLUGS } from '@/lib/landingPages/routes'
import { getLandingMetadata, getLandingSchemas } from '@/seo/landingPages'

export const dynamicParams = false
export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const page = getLandingPage(params.slug)
  if (!page) notFound()
  return getLandingMetadata(page)
}

export default function ServiceLandingPage({ params }) {
  const page = getLandingPage(params.slug)
  if (!page) notFound()
  return <><JsonLd data={getLandingSchemas(page)} /><LandingPageContent page={page} /></>
}
