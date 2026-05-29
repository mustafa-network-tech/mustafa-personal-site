// components/SoftwareDigital.js
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LayoutDashboard, Globe, ExternalLink, MessageCircle, Github, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import DemoProjectCard from '@/components/DemoProjectCard'
import ClientFeedback from '@/components/ClientFeedback'

const projectLinks = [
  'https://www.mk-ops.tr',
  'https://mk-digital-systems.vercel.app/en',
]

const projectGithubLinks = [null, null]

const projectIcons = [LayoutDashboard, Globe]

function getCtaLabel(ctaKey, t) {
  switch (ctaKey) {
    case 'request': return t.cta_request
    case 'live': return t.live
    case 'playstore': return t.play_store
    case 'demo': return t.cta_demo
    default: return t.live
  }
}

function CtaButton({ project, index, t, darkCard }) {
  const ctaKey = project.ctaKey || 'live'
  const label = project.ctaLabel != null ? project.ctaLabel : getCtaLabel(ctaKey, t)
  const href = ctaKey === 'request' ? '#contact' : (projectLinks[index] || null)
  const showGithub = !project.ctaLabel && ctaKey === 'demo' && projectGithubLinks[index]

  const baseClass = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 [&_svg]:text-current'
  const primaryClass = darkCard
    ? 'border border-white/30 text-white hover:bg-white/15 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
    : 'bg-[#2563EB] border border-[#2563EB] text-white hover:bg-[#1d4ed8] hover:border-[#1d4ed8] hover:shadow-[0_0_24px_rgba(37,99,235,0.35)]'
  const secondaryClass = darkCard
    ? 'border border-white/25 text-white hover:bg-white/10 hover:border-white/40'
    : 'bg-[#2563EB] border border-[#2563EB] text-white hover:bg-[#1d4ed8] hover:border-[#1d4ed8] hover:shadow-[0_0_16px_rgba(37,99,235,0.3)]'

  if (ctaKey === 'request') {
    return (
      <a
        href="#contact"
        className={`group/btn relative ${baseClass} ${primaryClass}`}
      >
        <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        {label}
      </a>
    )
  }

  if (!href) return null

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`group/btn relative ${baseClass} ${primaryClass}`}
      >
        <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        {label}
      </a>
      {showGithub && (
        <a href={projectGithubLinks[index]} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-300 ${secondaryClass}`}>
          <Github className="w-4 h-4" />
          {t.github}
        </a>
      )}
    </div>
  )
}

export default function SoftwareDigital() {
  const { t, language } = useLanguage()
  const projects = (t.software_projects || []).map((p, index) => {
    const Icon = projectIcons[index] || Globe
    return {
      ...p,
      focus: Array.isArray(p.focus) ? p.focus : [],
      tags: Array.isArray(p.tags) ? p.tags : [],
      IconComponent: Icon,
    }
  })

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

            <div className="projects-grid grid grid-cols-2 md:grid-cols-3 gap-[30px] mb-16">
              {projects.map((p, index) => (
                <motion.div
                  key={`${p.title}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="telekom-glass-card group relative rounded-[18px] transition-all duration-[0.35s] ease-out"
                  style={{ padding: 30 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="card-icon-container shrink-0">
                      <p.IconComponent className="w-6 h-6" />
                    </div>
                    <span className="card-tag inline-block">
                      {p.type}
                    </span>
                  </div>

                  <h3
                    className="telekom-card-title text-[18px] font-semibold mb-3 leading-tight text-[#1E293B]"
                  >
                    {p.title}
                  </h3>

                  <p
                    className="text-sm mb-4 text-[#475569]"
                    style={{ lineHeight: 1.6 }}
                  >
                    {p.description}
                  </p>

                  {p.focus?.length ? (
                    <div className="mb-4 space-y-2">
                      <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">{t.focus || ''}</div>
                      <ul className="space-y-1.5">
                        {(p.focus || []).map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-[#475569]">
                            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#2563EB]" />
                            <span className="leading-snug">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {(p.tags || []).map((tag) => (
                      <span key={tag} className="card-tag inline-block">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                    <CtaButton project={p} index={index} t={t} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Demo Sites – subheading + 6 cards */}
            {(t.demo_section_title && (t.demo_projects || []).length > 0) && (
              <div className="mb-16">
                <h3
                  className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E293B] mb-6"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {t.demo_section_title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                  {(t.demo_projects || []).map((project, index) => (
                    <motion.div
                      key={`demo-${project?.title ?? 'demo'}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="h-full"
                    >
                      <DemoProjectCard
                        title={project?.title || ''}
                        description={project?.description || ''}
                        tags={Array.isArray(project?.tags) ? project.tags : []}
                        url={project?.url}
                        badge={t.demo_card_badge || ''}
                        ctaLabel={t.view_demo || 'View Demo'}
                        typeLabel="Demo"
                      />
                    </motion.div>
                  ))}
                </div>

                <ClientFeedback />

                {/* CTA: Custom project – under demo cards */}
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

            <div
              className="page-card-hover rounded-2xl p-8 border transition-all duration-[0.35s] ease-out hover:bg-[#F5F4F2] active:scale-[0.995] active:shadow-inner cursor-pointer"
              style={{
                background: '#F0EEEA',
                border: '1px solid rgba(30,41,59,0.08)',
                boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
              }}
            >
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-6">{t.how_i_work}</h3>
              {/* Three titles in one horizontal row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
                <div className="text-base font-semibold text-[#2563EB]">{t.delivery_mindset}</div>
                <div className="text-base font-semibold text-[#2563EB]">{t.user_first_ui}</div>
                <div className="text-base font-semibold text-[#2563EB]">{t.maintainable_builds}</div>
              </div>
              {/* Descriptions in a row below */}
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
