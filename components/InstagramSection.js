'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/mavi_kadraj14/'

/**
 * Lightweight Instagram preview block — three placeholder cards + profile link.
 * Supports creative/social discovery without embedding heavy widgets.
 */
export default function InstagramSection() {
  const { t } = useLanguage()

  return (
    <section
      className="mt-12 mb-16 max-w-4xl mx-auto"
      aria-labelledby="instagram-section-title"
    >
      <div className="text-center mb-8">
        <h3 id="instagram-section-title" className="text-2xl font-semibold text-[#1E293B] mb-2">
          {t.instagram_heading}
        </h3>
        <p className="text-[#475569] max-w-xl mx-auto leading-relaxed">{t.instagram_intro}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="instagram-card-hover relative aspect-square rounded-xl overflow-hidden border border-[rgba(30,41,59,0.1)] bg-gradient-to-br from-[#E8EEF5] to-[#F2EFEA] shadow-sm"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none" aria-hidden>
              <Instagram className="w-16 h-16 text-[#1E293B]" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/45 to-transparent">
              <p className="text-white text-xs font-medium">{t.instagram}</p>
              <p className="text-white/85 text-[11px]">
                {t.photo_badge} · {i + 1}/3
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
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
      </div>
    </section>
  )
}
