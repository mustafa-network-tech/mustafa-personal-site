// app/contact/page.js – English contact
import Link from 'next/link'
import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema, getContactPageSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'

const meta = PAGE_META.contact.en
const og = buildOpenGraph({ locale: 'en', path: '/contact', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ locale: 'en', title: meta.title, description: meta.description, image: OG_IMAGES.en })

const breadcrumbJson = getBreadcrumbListSchema([
  { name: 'Home', url: '/en' },
  { name: 'Contact', url: '/contact' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.en.keywords,
  alternates: { canonical: '/contact', languages: { en: '/contact', tr: '/tr/contact', 'x-default': '/tr/contact' } },
  openGraph: og,
  twitter,
}

export default function ContactEn() {
  return (
    <>
      <JsonLd data={[breadcrumbJson, getContactPageSchema('en')]} />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <article>
          <h1 className="text-3xl font-bold text-[#F8FAFC] mb-4">Contact</h1>
          <p className="text-[#E2E8F0] mb-4 leading-relaxed">{meta.description}</p>
          <p className="text-[#94A3B8] mb-10 leading-relaxed">
            For an introduction, a collaboration or a short message, reach me by email or on LinkedIn.
          </p>
          <a
            href="mailto:iletisim@mk-digitalsystems.com"
            className="inline-flex items-center gap-2 text-[#4F7CFF] font-semibold hover:underline mb-10"
          >
            iletisim@mk-digitalsystems.com
          </a>
          <a href="https://www.linkedin.com/in/mustafa-oner-/" target="_blank" rel="noopener noreferrer" className="block text-[#4F7CFF] font-semibold hover:underline mb-10">LinkedIn</a>
          <nav className="flex flex-wrap gap-4 text-sm border-t border-[rgba(248,250,252,0.12)] pt-10" aria-label="Related pages">
            <Link href="/en" className="text-[#94A3B8] hover:text-[#F8FAFC]">
              ← Home
            </Link>
          </nav>
        </article>
      </div>
    </>
  )
}
