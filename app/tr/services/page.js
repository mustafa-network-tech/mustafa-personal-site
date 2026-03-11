// app/tr/services/page.js – Turkish services
import Link from 'next/link'
import { PAGE_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const meta = PAGE_META.services.tr
const og = buildOpenGraph({ locale: 'tr', path: '/tr/services', title: meta.title, description: meta.description, image: OG_IMAGES.tr })
const twitter = buildTwitterCard({ title: meta.title, description: meta.description, image: OG_IMAGES.tr })

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/tr/services', languages: { tr: '/tr/services', en: '/services', 'x-default': '/services' } },
  openGraph: og,
  twitter,
}

export default function ServicesTr() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Hizmetler</h1>
      <p className="text-[#E2E8F0] mb-8">{meta.description}</p>
      <p>
        <Link href="/tr" className="text-[#94A3B8] hover:text-[#F8FAFC]">
          ← Ana sayfaya dön
        </Link>
      </p>
    </div>
  )
}
