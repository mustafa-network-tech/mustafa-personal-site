import { SITE_URL } from './metadata'
import { buildOpenGraph, buildTwitterCard } from './openGraph'
import { getBreadcrumbListSchema } from './schema'
import { getLandingBreadcrumbs } from '@/lib/landingPages/pages'
import { LANDING_ROUTES, landingHref } from '@/lib/landingPages/routes'

export function getLandingMetadata(page) {
  const path = landingHref(page.slug)
  return {
    title: page.title,
    description: page.description,
    // These pages have no English translation. Do not invent an EN alternate.
    alternates: { canonical: path, languages: { tr: path, 'x-default': path } },
    openGraph: buildOpenGraph({ locale: 'tr', path, title: page.title, description: page.description }),
    twitter: buildTwitterCard({ locale: 'tr', title: page.title, description: page.description }),
    robots: { index: true, follow: true },
  }
}

export function getLandingSchemas(page) {
  const url = `${SITE_URL}${landingHref(page.slug)}`
  return [
    getBreadcrumbListSchema(getLandingBreadcrumbs(page)),
    {
      '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`,
      name: LANDING_ROUTES[page.slug], description: page.description, url,
      provider: { '@id': `${SITE_URL}/#organization` },
      ...(page.city ? { areaServed: { '@type': 'City', name: page.city } } : {}),
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: 'tr-TR',
      mainEntity: page.faqs.map(([question, answer]) => ({
        '@type': 'Question', name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ]
}
