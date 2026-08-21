import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react'
import PortfolioCard from '@/components/projects/PortfolioCard'
import { getProjectTypeIcon, getProjectStatus } from '@/components/projects/projectVisuals'
import { getProjectDetailSections } from '@/seo/metadata'

function CaseSection({ title, children }) {
  return (
    <section>
      <h2 className="text-[17px] font-semibold text-[#0F172A] mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

/**
 * Case study / proje detay layout bileşeni.
 * project: projectsData.js'ten gelen tam proje objesi
 * locale: 'tr' | 'en'
 * related: ilgili projeler dizisi (max 3)
 */
export default function ProjectDetailContent({ project, locale = 'tr', related = [] }) {
  const data = project[locale] || project.tr
  const category = project.category[locale] || project.category.tr
  const backHref = locale === 'tr' ? '/tr/projects' : '/projects'
  const backLabel = locale === 'tr' ? 'Projelere Dön' : 'Back to Projects'
  const liveLabel = locale === 'tr' ? 'Canlı Projeyi Gör' : 'View Live Project'
  const requestLabel = locale === 'tr' ? 'Teklif Al' : 'Request Proposal'
  const relatedLabel = locale === 'tr' ? 'İlgili Projeler' : 'Related Projects'
  const isPlayStore = project.liveUrl?.includes('play.google.com')
  const status = getProjectStatus(project, locale)
  const Icon = getProjectTypeIcon(project)
  const extra = getProjectDetailSections(project.slug)?.[locale]

  const sections = []
  if (data.overview) {
    sections.push({
      key: 'about',
      title: locale === 'tr' ? 'Proje Hakkında' : 'About the Project',
      body: (
        <div className="space-y-5">
          <p className="text-[15px] text-[#475569] leading-relaxed">{data.overview}</p>
          {extra?.intro && (
            <p className="text-[15px] text-[#475569] leading-relaxed">{extra.intro}</p>
          )}
          {extra?.blocks?.length > 0 && (
            <div className="space-y-4">
              {extra.blocks.map((block) => (
                <div key={block.heading}>
                  <h3 className="text-[13px] font-semibold text-[#0F172A] mb-1.5">{block.heading}</h3>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    })
  }
  if (data.features?.length > 0) {
    sections.push({
      key: 'features',
      title: locale === 'tr' ? 'Öne Çıkan Özellikler' : 'Key Features',
      body: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.features.map((feature, i) => (
            <div
              key={i}
              className="rounded-[12px] border border-[#E2E8F0] bg-white px-4 py-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#C7D2FE] hover:bg-[#FAFBFF]"
            >
              <p className="text-[14px] text-[#334155] leading-snug">{feature}</p>
            </div>
          ))}
        </div>
      ),
    })
  }
  if (project.tags?.length > 0) {
    sections.push({
      key: 'tech',
      title: locale === 'tr' ? 'Teknoloji' : 'Technology',
      body: (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[12px] font-medium tracking-tight px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] text-[#475569] transition-all duration-200 hover:border-[#818CF8] hover:text-[#3730A3] hover:bg-[#EEF2FF]"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    })
  }
  if (status) {
    sections.push({
      key: 'status',
      title: locale === 'tr' ? 'Proje Durumu' : 'Project Status',
      body: (
        <p className="text-[15px] text-[#475569]">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-white text-[13px] font-medium text-[#0F172A] transition-all duration-200 hover:border-[#818CF8] hover:bg-[#EEF2FF]">
            {status}
          </span>
        </p>
      ),
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="project-case-header border-b border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>

          <div className="flex items-start gap-3 mb-4">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#94A3B8]"
              aria-hidden="true"
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="inline-block text-[11px] font-semibold tracking-wide uppercase text-[#4F46E5] px-2.5 py-1 rounded-md bg-[#EEF2FF] border border-[#E0E7FF] transition-colors duration-200 hover:border-[#818CF8] hover:bg-[#E0E7FF]">
              {category}
            </span>
          </div>

          <h1 className="text-[28px] md:text-[36px] font-semibold text-[#0F172A] leading-tight tracking-tight break-words mb-4">
            {data.title}
          </h1>

          {data.shortDesc && (
            <p className="text-[16px] md:text-[17px] text-[#475569] leading-relaxed max-w-2xl mb-7">
              {data.shortDesc}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold bg-[#2563EB] text-white border border-[#2563EB] transition-colors duration-200 hover:bg-[#1d4ed8]"
              >
                {isPlayStore ? 'Play Store' : liveLabel}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            <a
              href="https://wa.me/905456597551?text=Merhaba%20Mustafa%20Bey%2C%20web%20sitesi%20ve%20yaz%C4%B1l%C4%B1m%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold bg-white text-[#0F172A] border border-[#E2E8F0] transition-colors duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
            >
              <MessageCircle className="w-4 h-4 text-[#64748B]" />
              {requestLabel}
            </a>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 pt-6 border-t border-[#E2E8F0]">
            <div>
              <dt className="text-[11px] font-semibold tracking-widest uppercase text-[#94A3B8] mb-1.5">
                {locale === 'tr' ? 'Proje Türü' : 'Project Type'}
              </dt>
              <dd className="text-[14px] font-medium text-[#0F172A] break-words">{category}</dd>
            </div>
            {project.tags?.length > 0 && (
              <div>
                <dt className="text-[11px] font-semibold tracking-widest uppercase text-[#94A3B8] mb-1.5">
                  {locale === 'tr' ? 'Teknoloji' : 'Technology'}
                </dt>
                <dd className="text-[14px] font-medium text-[#0F172A] break-words">
                  {project.tags.join(' / ')}
                </dd>
              </div>
            )}
            {status && (
              <div>
                <dt className="text-[11px] font-semibold tracking-widest uppercase text-[#94A3B8] mb-1.5">
                  {locale === 'tr' ? 'Durum' : 'Status'}
                </dt>
                <dd className="text-[14px] font-medium text-[#0F172A]">{status}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-3xl space-y-12">
          {sections.map((section) => (
            <CaseSection key={section.key} title={section.title}>
              {section.body}
            </CaseSection>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E2E8F0]">
            <h2 className="text-[17px] font-semibold text-[#0F172A] mb-6">{relatedLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <PortfolioCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
