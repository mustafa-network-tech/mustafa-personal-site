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
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.en.keywords,
  alternates: { canonical: '/contact', languages: { en: '/contact', tr: '/tr/contact', 'x-default': '/contact' } },
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
            For web development, custom software or a corporate website, email a short brief and the timeline you have in mind.
          </p>
          <a
            href="mailto:mustafa82oner@gmail.com"
            className="inline-flex items-center gap-2 text-[#4F7CFF] font-semibold hover:underline mb-10"
          >
            mustafa82oner@gmail.com
          </a>
          <nav className="flex flex-wrap gap-4 text-sm border-t border-[rgba(248,250,252,0.12)] pt-10" aria-label="Related pages">
            <Link href="/services" className="text-[#4F7CFF] hover:underline">
              Services
            </Link>
            <span className="text-[#475569]">·</span>
            <Link href="/projects" className="text-[#4F7CFF] hover:underline">
              Projects
            </Link>
            <span className="text-[#475569]">·</span>
            <Link href="/vitrin" className="text-[#4F7CFF] hover:underline">
              Showcase
            </Link>
            <span className="text-[#475569]">·</span>
            <Link href="/" className="text-[#94A3B8] hover:text-[#F8FAFC]">
              ← Home
            </Link>
          </nav>
        </article>
      </div>
    </>
  )
}
