import { notFound } from 'next/navigation'
import LocalSeoPageContent from '@/components/localSeo/LocalSeoPageContent'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema } from '@/seo/schema'
import { getAllLocalSeoSlugs, getLocalSeoPage, isLocalSeoSlug } from '@/lib/localSeo/pages'

export function generateStaticParams() {
  return getAllLocalSeoSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const slug = params?.slug
  if (!isLocalSeoSlug(slug)) return {}
  const page = getLocalSeoPage(slug)
  if (!page) return {}
  const path = `/${slug}`
  const { title, description, ogTitle, ogDescription } = page.meta
  const og = buildOpenGraph({
    locale: 'tr',
    path,
    title: ogTitle || title,
    description: ogDescription || description,
  })
  const twitter = buildTwitterCard({
    locale: 'tr',
    title: ogTitle || title,
    description: ogDescription || description,
  })
  return {
    title,
    description,
    keywords: [...(GLOBAL_META.tr.keywords || []), page.cityName, 'web tasarım', 'MK Digital Systems'],
    alternates: { canonical: path },
    openGraph: og,
    twitter,
    robots: { index: true, follow: true },
  }
}

export default function LocalSeoLandingPage({ params }) {
  const slug = params?.slug
  if (!isLocalSeoSlug(slug)) notFound()
  const page = getLocalSeoPage(slug)
  if (!page) notFound()

  const path = `/${slug}`
  const breadcrumbJson = getBreadcrumbListSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: page.hero.title, url: path },
  ])

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.meta.title,
    description: page.meta.description,
    url: `${SITE_URL}${path}`,
    inLanguage: 'tr-TR',
    about: {
      '@type': 'Service',
      name: page.hero.title,
      areaServed: page.cityName,
      provider: {
        '@type': 'Organization',
        name: 'MK Digital Systems',
      },
    },
  }

  const jsonLd = [webPageSchema, breadcrumbJson]

  if (page.faqs?.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <LocalSeoPageContent page={page} />
    </>
  )
}
