'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, ShoppingBag, Code, LayoutDashboard, Smartphone, Briefcase } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const icons = [Globe, ShoppingBag, Code, LayoutDashboard, Smartphone, Briefcase]

export default function ServicesPageContent() {
  const { t, language } = useLanguage()
  const isTr = language === 'tr'
  const contactHref = isTr ? '/tr/contact' : '/contact'
  const vitrinHref = isTr ? '/tr/vitrin' : '/vitrin'
  const areas = (t.telekom_areas || []).map((area, i) => ({
    ...area,
    Icon: icons[i] || Globe,
  }))
  const steps = t.process_steps || []

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <article>
        <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
          {isTr ? 'Hizmetler' : 'Services'}
        </h1>
        <p className="text-[#E2E8F0] mb-10 leading-relaxed text-lg">
          {t.services_page_lead}
        </p>

        <section aria-labelledby="services-areas-heading" className="mb-16">
          <h2 id="services-areas-heading" className="text-xl font-semibold text-[#F8FAFC] mb-6">
            {t.telekom_badge}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {areas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-2xl p-6 border border-[rgba(248,250,252,0.12)] bg-[rgba(15,23,42,0.5)]"
              >
                <area.Icon className="w-8 h-8 text-[#4F7CFF] mb-3" aria-hidden />
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{area.title}</h3>
                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-3">{area.description}</p>
                {area.keywords?.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {area.keywords.map((kw) => (
                      <li key={kw}>
                        <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-[#94A3B8]">{kw}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            ))}
          </div>
        </section>

        <section aria-labelledby="services-process-heading" className="mb-16">
          <h2 id="services-process-heading" className="text-xl font-semibold text-[#F8FAFC] mb-2">
            {t.process_title}
          </h2>
          <p className="text-[#94A3B8] mb-6">{t.process_subtitle}</p>
          <ol className="space-y-4 list-decimal list-inside text-[#E2E8F0]">
            {steps.map((step) => (
              <li key={step.title} className="pl-1">
                <span className="font-medium text-[#F8FAFC]">{step.title}</span>
                <span className="text-[#94A3B8]"> — {step.description}</span>
              </li>
            ))}
          </ol>
        </section>

        <nav className="flex flex-wrap gap-4 text-sm border-t border-[rgba(248,250,252,0.12)] pt-10" aria-label="Next steps">
          <Link href={contactHref} className="text-[#4F7CFF] hover:underline font-medium">
            {isTr ? 'İletişim sayfası' : 'Contact page'}
          </Link>
          <span className="text-[#475569]" aria-hidden>
            ·
          </span>
          <Link href={vitrinHref} className="text-[#4F7CFF] hover:underline font-medium">
            {t.menu_vitrin}
          </Link>
          <span className="text-[#475569]" aria-hidden>
            ·
          </span>
          <Link href={isTr ? '/tr' : '/'} className="text-[#94A3B8] hover:text-[#F8FAFC]">
            {isTr ? 'Ana sayfa' : 'Home'}
          </Link>
        </nav>
      </article>
    </div>
  )
}
