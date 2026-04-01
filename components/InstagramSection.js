'use client'

import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/mavi_kadraj14/'

/** Mavi Kadraj Instagram profiline yönlendiren tek CTA. */
export default function InstagramSection() {
  const { t } = useLanguage()

  return (
    <section className="mt-12 mb-16 max-w-4xl mx-auto text-center">
      <a
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 transition-opacity"
      >
        <Instagram className="w-4 h-4" aria-hidden />
        {t.follow_instagram}
      </a>
      <p className="mt-3 text-xs text-[#64748B]">
        <Link href={INSTAGRAM_PROFILE} className="underline hover:text-[#475569]">
          @mavi_kadraj14
        </Link>
      </p>
    </section>
  )
}
