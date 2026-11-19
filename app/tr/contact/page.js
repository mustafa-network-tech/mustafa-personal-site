// app/tr/contact/page.js – Turkish contact
import Link from 'next/link'
import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema, getContactPageSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'

const meta = PAGE_META.contact.tr
const og = buildOpenGraph({ locale: 'tr', path: '/tr/contact', title: meta.title, description: meta.description, image: OG_IMAGES.tr })
const twitter = buildTwitterCard({ locale: 'tr', title: meta.title, description: meta.description, image: OG_IMAGES.tr })

const breadcrumbJson = getBreadcrumbListSchema([
  { name: 'Ana sayfa', url: '/tr' },
  { name: 'İletişim', url: '/tr/contact' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.tr.keywords,
  alternates: { canonical: '/tr/contact', languages: { tr: '/tr/contact', en: '/contact', 'x-default': '/tr/contact' } },
  openGraph: og,
  twitter,
}

export default function ContactTr() {
  return (
    <>
      <JsonLd data={[breadcrumbJson, getContactPageSchema('tr')]} />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <article>
          <h1 className="text-3xl font-bold text-[#F8FAFC] mb-4">İletişim</h1>
          <p className="text-[#E2E8F0] mb-4 leading-relaxed">{meta.description}</p>
          <p className="text-[#94A3B8] mb-10 leading-relaxed">
            Tanışmak, iş birliği ya da kısa bir mesaj için e-posta veya LinkedIn üzerinden bana ulaşabilirsiniz.
          </p>
          <a
            href="mailto:iletisim@mk-digitalsystems.com"
            className="inline-flex items-center gap-2 text-[#4F7CFF] font-semibold hover:underline mb-10"
          >
            iletisim@mk-digitalsystems.com
          </a>
          <a href="https://www.linkedin.com/in/mustafa-oner-/" target="_blank" rel="noopener noreferrer" className="block text-[#4F7CFF] font-semibold hover:underline mb-10">LinkedIn</a>
          <nav className="flex flex-wrap gap-4 text-sm border-t border-[rgba(248,250,252,0.12)] pt-10" aria-label="İlgili sayfalar">
            <Link href="/tr" className="text-[#94A3B8] hover:text-[#F8FAFC]">
              ← Ana sayfa
            </Link>
          </nav>
        </article>
      </div>
    </>
  )
}
