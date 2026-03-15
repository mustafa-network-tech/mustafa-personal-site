'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_NUMBER = '905456597551'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function CtaCustomProject() {
  const { t } = useLanguage()

  return (
    <section
      className="border-t border-[rgba(255,255,255,0.08)]"
      style={{ background: 'var(--bg-main)' }}
    >
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-3">
            {t.cta_custom_project_title}
          </h2>
          <p className="text-sm md:text-base text-[#E2E8F0] mb-6 leading-relaxed">
            {t.cta_custom_project_desc}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[12px] text-sm font-semibold bg-[#25D366] text-white border border-[#25D366] hover:bg-[#20BD5A] hover:border-[#20BD5A] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(37,211,102,0.35)]"
          >
            {t.cta_custom_project_btn}
          </a>
        </div>
      </div>
    </section>
  )
}
