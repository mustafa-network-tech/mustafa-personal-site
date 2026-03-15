// app/tr/projects/page.js – Turkish projects list
import Link from 'next/link'
import { PAGE_META, PROJECT_SLUGS, PROJECT_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import ProjectCard from '@/components/ProjectCard'
import tr from '@/i18n/tr.json'

const meta = PAGE_META.projects.tr
const og = buildOpenGraph({ locale: 'tr', path: '/tr/projects', title: meta.title, description: meta.description, image: OG_IMAGES.tr })
const twitter = buildTwitterCard({ title: meta.title, description: meta.description, image: OG_IMAGES.tr })

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/tr/projects', languages: { tr: '/tr/projects', en: '/projects', 'x-default': '/projects' } },
  openGraph: og,
  twitter,
}

export default function ProjectsTr() {
  const t = tr
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Projeler</h1>
      <p className="text-[#E2E8F0] mb-8">
        Web uygulamaları, arayüz sistemleri ve yazılım projeleri.
      </p>
      <ul className="space-y-3">
        {PROJECT_SLUGS.map((slug) => {
          const meta = PROJECT_META[slug]
          const title = meta?.tr?.title?.split('|')[0]?.trim() || slug
          return (
            <li key={slug}>
              <Link
                href={`/tr/projects/${slug}`}
                className="text-[#4F7CFF] hover:underline"
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Demo Projeler – sayfadaki diğer başlıklarla uyumlu */}
      <section className="mt-16 pt-12 border-t border-[rgba(248,250,252,0.12)]">
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">{t.demo_section_title}</h2>
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: '#F0EEEA',
            border: '1px solid rgba(30,41,59,0.08)',
            boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t.demo_projects || []).map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags || []}
                ctaLabel={t.view_demo}
                ctaHref={project.url || '#'}
                type="Demo"
                badge={t.demo_card_badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışırım – SoftwareDigital ile aynı kart */}
      <section className="mt-16">
        <div
          className="page-card-hover rounded-2xl p-8 border transition-all duration-[0.35s] ease-out hover:bg-[#F5F4F2] active:scale-[0.995] active:shadow-inner"
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
      </section>

      <p className="mt-12">
        <Link href="/tr" className="text-[#94A3B8] hover:text-[#F8FAFC]">
          ← Ana sayfaya dön
        </Link>
      </p>
    </div>
  )
}
