// app/contact/page.js – English contact
import Link from 'next/link'
import { PAGE_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const meta = PAGE_META.contact.en
const og = buildOpenGraph({ locale: 'en', path: '/contact', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ title: meta.title, description: meta.description, image: OG_IMAGES.en })

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/contact', languages: { en: '/contact', tr: '/tr/contact', 'x-default': '/contact' } },
  openGraph: og,
  twitter,
}

export default function ContactEn() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Contact</h1>
      <p className="text-[#E2E8F0] mb-8">{meta.description}</p>
      <p>
        <Link href="/" className="text-[#94A3B8] hover:text-[#F8FAFC]">
          ← Back to home
        </Link>
      </p>
    </div>
  )
}
