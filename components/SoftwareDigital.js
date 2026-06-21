// components/SoftwareDigital.js
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, MessageCircle, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import DemoProjectCard from '@/components/DemoProjectCard'
import ClientFeedback from '@/components/ClientFeedback'

// software_projects arka plan görselleri (i18n sırasıyla)
const softwareProjectImages = [
  '/images/projects/mk-ops.jpeg',
  '/images/projects/mk-digital-systems.jpeg',
]

// software_projects açıklama override (kullanıcı isteğiyle güncellendi)
const softwareProjectDescriptions = {
  tr: [
    'Telekom, fiber optik ve saha operasyonları için geliştirilmiş SaaS tabanlı operasyon yönetim platformu.',
    'Web siteleri, e-ticaret platformları ve özel yazılım çözümleri geliştiren dijital üretim markası.',
  ],
  en: [
    'SaaS-based operations management platform for telecom, fiber optic and field operations.',
    'Digital production brand developing websites, e-commerce platforms and custom software solutions.',
  ],
}

// software_projects slugları (Projeyi İncele linki için)
const softwareProjectSlugs = ['mk-ops', 'mk-digital-systems']

// demo_projects arka plan görselleri (i18n demo_projects dizisiyle aynı sıra)
const demoProjectImages = [
  '/images/projects/musty-music.jpeg',
  '/images/projects/mavi-iletisim.jpeg',
  '/images/projects/hukuk.jpeg',
  '/images/projects/mavi-danismanlik.jpeg',
  '/images/projects/guzellik-saloni.jpeg',
  '/images/projects/mavi-sarkiler.jpeg',
  '/images/projects/aria.jpeg',
  '/images/projects/mavi-kadraj.jpeg',
  '/images/projects/kadraj-rotam.jpeg',
  '/images/projects/gonupusulasi.jpeg',
  '/images/projects/siirdunyasi.jpeg',
  '/images/projects/mavi-kadrajla-ogreniyorum.jpeg',
]

// demo_projects slugları (Projeyi İncele linki için)
const demoProjectSlugs = [
  'musty-music',
  'mavi-iletisim',
  'hukuk-burosu',
  'mavi-danismanlik',
  'guzellik-salonu',
  'mavi-sarkilar',
  'aria',
  'mavi-kadraj',
  'kadraj-rotam',
  'gonul-pusulasi',
  'siir-dunyasi',
  'mavi-kadrajla-ogreniyorum',
]

export default function SoftwareDigital() {
  const { t, language } = useLanguage()
  const projects = (t.software_projects || []).map((p) => ({
    ...p,
    focus: Array.isArray(p.focus) ? p.focus : [],
    tags: Array.isArray(p.tags) ? p.tags : [],
  }))

  const descOverrides = softwareProjectDescriptions[language] || softwareProjectDescriptions.tr

  return (
    <section
      id="software"
      className="light-section relative pt-4 pb-20 overflow-hidden"
      style={{ background: '#F2EFEA' }}
    >
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* ── Bölüm başlığı ── */}
            <div className="mb-10 text-center md:mb-12">
              {t.software_trust_badge && (
                <span
                  className="inline-block rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-transform duration-300 ease-out hover:scale-[1.03]"
                  style={{
                    color: '#FFFFFF',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
                    border: '1px solid rgba(147,197,253,0.4)',
                    boxShadow:
                      '0 4px 22px rgba(37,99,235,0.3), 0 0 36px rgba(59,130,246,0.14), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  {t.software_trust_badge}
                </span>
              )}
              <h2
                className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#1E293B] md:mt-6 md:text-[2.75rem]"
                style={{ letterSpacing: '-0.025em' }}
              >
                {t.software_title}
              </h2>
              <p className="mx-auto mt-4 max-w-[720px] text-base leading-[1.75] text-[#475569] md:text-lg">
                {t.software_intro}
              </p>
              {t.software_vitrin_link && (
                <p className="text-center mt-4">
                  <Link
                    href={language === 'tr' ? '/tr/vitrin' : '/vitrin'}
                    className="text-sm font-medium text-[#2563EB] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 rounded"
                  >
                    {t.software_vitrin_link}
                  </Link>
                </p>
              )}
            </div>

            {/* ── Software Projects kartları ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {projects.map((p, index) => {
                const bgImage = softwareProjectImages[index]
                const description = descOverrides[index] || p.description
                const slug = softwareProjectSlugs[index]
                const detailHref = language === 'tr' ? `/tr/projects/${slug}` : `/projects/${slug}`

                return (
                  <motion.div
                    key={`${p.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group flex flex-col rounded-[20px] overflow-hidden border border-[#E2E8F0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.13)]"
                  >
                    {/* Üst: Proje görseli */}
                    <div className="relative w-full shrink-0 overflow-hidden bg-[#F1F5F9]" style={{ height: 220 }}>
                      {bgImage && (
                        <Image
                          src={bgImage}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                    </div>

                    {/* Alt: İçerik (saf beyaz, görsel yok) */}
                    <div className="flex flex-col flex-grow p-6">
                      {/* Tip etiketi */}
                      <div className="mb-3">
                        <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]">
                          {p.type}
                        </span>
                      </div>

                      {/* Başlık */}
                      <h3 className="text-[20px] font-bold text-[#0F172A] mb-2 leading-tight">
                        {p.title}
                      </h3>

                      {/* Açıklama */}
                      <p className="text-[14px] text-[#64748B] leading-relaxed mb-4 line-clamp-3">
                        {description}
                      </p>

                      {/* Odak noktaları */}
                      {p.focus.length > 0 && (
                        <div className="mb-4">
                          <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">
                            {t.focus || ''}
                          </div>
                          <ul className="space-y-1.5">
                            {p.focus.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-[13px] text-[#475569]">
                                <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2563EB]" />
                                <span className="leading-snug">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Teknoloji etiketleri */}
                      {p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Buton: Projeyi İncele */}
                      <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
                        <Link
                          href={detailHref}
                          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] transition-all duration-200 hover:gap-2.5"
                        >
                          {language === 'tr' ? 'Projeyi İncele' : 'View Project'}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* ── Demo Sites ── */}
            {(t.demo_section_title && (t.demo_projects || []).length > 0) && (
              <div className="mb-16">
                <h3
                  className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E293B] mb-6"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {t.demo_section_title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(t.demo_projects || []).map((project, index) => (
                    <motion.div
                      key={`demo-${project?.title ?? 'demo'}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      className="h-full"
                    >
                      <DemoProjectCard
                        title={project?.title || ''}
                        description={project?.description || ''}
                        tags={Array.isArray(project?.tags) ? project.tags : []}
                        url={project?.url}
                        typeLabel="Demo"
                        image={demoProjectImages[index] || null}
                        slug={demoProjectSlugs[index] || null}
                        locale={language}
                      />
                    </motion.div>
                  ))}
                </div>

                <ClientFeedback />

                {/* CTA: Özel proje */}
                {t.cta_custom_project_title && (
                  <div className="mt-12 mb-16 text-center max-w-2xl mx-auto">
                    <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-3">
                      {t.cta_custom_project_title}
                    </h3>
                    <p className="text-sm md:text-base text-[#475569] mb-6 leading-relaxed">
                      {t.cta_custom_project_desc}
                    </p>
                    <a
                      href="https://wa.me/905456597551"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[12px] text-sm font-semibold bg-[#25D366] text-white border border-[#25D366] hover:bg-[#20BD5A] hover:border-[#20BD5A] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(37,211,102,0.35)]"
                    >
                      {t.cta_custom_project_btn}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* ── Nasıl Çalışırım ── */}
            <div
              className="page-card-hover rounded-2xl p-8 border transition-all duration-[0.35s] ease-out hover:bg-[#F5F4F2] active:scale-[0.995] active:shadow-inner cursor-pointer"
              style={{
                background: '#F0EEEA',
                border: '1px solid rgba(30,41,59,0.08)',
                boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
              }}
            >
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-6">{t.how_i_work}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
                <div className="text-base font-semibold text-[#2563EB]">{t.delivery_mindset}</div>
                <div className="text-base font-semibold text-[#2563EB]">{t.user_first_ui}</div>
                <div className="text-base font-semibold text-[#2563EB]">{t.maintainable_builds}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <p className="text-sm text-[#475569] leading-relaxed">{t.delivery_mindset_desc}</p>
                <p className="text-sm text-[#475569] leading-relaxed">{t.user_first_ui_desc}</p>
                <p className="text-sm text-[#475569] leading-relaxed">{t.maintainable_builds_desc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
