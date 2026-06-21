'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, MessageCircle, CheckCircle } from 'lucide-react'
import PortfolioCard from '@/components/projects/PortfolioCard'

/**
 * Premium case study / proje detay layout bileşeni.
 * project: projectsData.js'ten gelen tam proje objesi
 * locale: 'tr' | 'en'
 * related: ilgili projeler dizisi (max 3)
 */
export default function ProjectDetailContent({ project, locale = 'tr', related = [] }) {
  const data = project[locale] || project.tr
  const category = project.category[locale] || project.category.tr
  const backHref = locale === 'tr' ? '/tr/projects' : '/projects'
  const backLabel = locale === 'tr' ? '← Tüm Projeler' : '← All Projects'
  const liveLabel = locale === 'tr' ? 'Canlı Siteyi Gör' : 'Visit Live Site'
  const requestLabel = locale === 'tr' ? 'Teklif Al' : 'Request Proposal'
  const featuresLabel = locale === 'tr' ? 'Temel Özellikler' : 'Key Features'
  const techLabel = locale === 'tr' ? 'Teknoloji Stack' : 'Technology Stack'
  const relatedLabel = locale === 'tr' ? 'İlgili Projeler' : 'Related Projects'
  const isPlayStore = project.liveUrl?.includes('play.google.com')

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Hero görseli ── */}
      <div className="relative w-full overflow-hidden bg-[#E2E8F0]" style={{ height: 420 }}>
        {project.image && (
          <Image
            src={project.image}
            alt={data.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Geri butonu — görsel üzerinde */}
        <div className="absolute top-6 left-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium hover:bg-white/30 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
        </div>

        {/* Başlık + kategori — görsel alt kısmı */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-3">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
              {data.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Ana içerik ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Sol sütun — ana içerik */}
          <div className="lg:col-span-2 space-y-10">

            {/* Proje özeti */}
            <section>
              <p className="text-lg text-[#334155] leading-relaxed">
                {data.shortDesc}
              </p>
            </section>

            {/* Proje hakkında */}
            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                {locale === 'tr' ? 'Proje Hakkında' : 'About the Project'}
              </h2>
              <p className="text-[#475569] leading-relaxed">
                {data.overview}
              </p>
            </section>

            {/* Temel özellikler */}
            {data.features?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">{featuresLabel}</h2>
                <ul className="space-y-3">
                  {data.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#2563EB]" />
                      <span className="text-[#475569]">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Teknoloji stack */}
            {project.tags?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">{techLabel}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-[13px] font-semibold px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#334155] shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sağ sütun — CTA sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] p-6 space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] mb-4">
                {locale === 'tr' ? 'Bu Proje Hakkında' : 'About This Project'}
              </h3>

              {/* Kategori */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">{locale === 'tr' ? 'Kategori' : 'Category'}</span>
                <span className="font-semibold text-[#0F172A]">{category}</span>
              </div>

              {/* Teknoloji */}
              <div className="flex items-start justify-between text-sm pt-2 border-t border-[#F1F5F9]">
                <span className="text-[#64748B] shrink-0 mr-2">{locale === 'tr' ? 'Stack' : 'Stack'}</span>
                <span className="font-medium text-[#334155] text-right">{project.tags.slice(0, 3).join(', ')}</span>
              </div>

              {/* CTA Butonları */}
              <div className="pt-4 space-y-3 border-t border-[#F1F5F9]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[12px] text-sm font-semibold bg-[#2563EB] text-white border border-[#2563EB] transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {isPlayStore
                      ? (locale === 'tr' ? 'Play Store' : 'Play Store')
                      : liveLabel
                    }
                  </a>
                )}

                <a
                  href="https://wa.me/905456597551?text=Merhaba%20Mustafa%20Bey%2C%20web%20sitesi%20ve%20yaz%C4%B1l%C4%B1m%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[12px] text-sm font-semibold bg-[#25D366] text-white border border-[#25D366] transition-all duration-300 hover:bg-[#1ebe5d] hover:shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  {requestLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── İlgili Projeler ── */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-8">{relatedLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
