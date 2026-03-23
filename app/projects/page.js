// app/projects/page.js – English projects list
import Link from 'next/link'
import { PAGE_META, PROJECT_SLUGS, PROJECT_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import ProjectCard from '@/components/ProjectCard'
import en from '@/i18n/en.json'

const meta = PAGE_META.projects.en
const og = buildOpenGraph({ locale: 'en', path: '/projects', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ locale: 'en', title: meta.title, description: meta.description, image: OG_IMAGES.en })

const breadcrumbJson = getBreadcrumbListSchema([
  { name: 'Home', url: '/' },
  { name: 'Projects', url: '/projects' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.en.keywords,
  alternates: { canonical: '/projects', languages: { en: '/projects', tr: '/tr/projects', 'x-default': '/projects' } },
  openGraph: og,
  twitter,
}

export default function ProjectsEn() {
  const t = en
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <JsonLd data={breadcrumbJson} />
      <article>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Projects</h1>
        <p className="text-[#E2E8F0] mb-6 leading-relaxed">{t.projects_page_lead}</p>
        <p className="text-[#94A3B8] text-sm mb-10">{meta.description}</p>

        <section aria-labelledby="case-studies-heading">
          <h2 id="case-studies-heading" className="text-xl font-semibold text-[#F8FAFC] mb-4">
            Case-style write-ups
          </h2>
          <ul className="space-y-3 list-none">
            {PROJECT_SLUGS.map((slug) => {
              const pm = PROJECT_META[slug]
              const title = pm?.en?.title?.split('|')[0]?.trim() || slug
              return (
                <li key={slug}>
                  <Link href={`/projects/${slug}`} className="text-[#4F7CFF] hover:underline font-medium">
                    {title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="mt-16 pt-12 border-t border-[rgba(248,250,252,0.12)]" aria-labelledby="demo-projects-heading">
          <h2 id="demo-projects-heading" className="text-2xl font-bold text-[#F8FAFC] mb-6">
            {t.demo_section_title}
          </h2>
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

        <section className="mt-16" aria-labelledby="how-i-work-heading">
          <h2 id="how-i-work-heading" className="sr-only">
            {t.how_i_work}
          </h2>
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

        <nav className="mt-12 flex flex-wrap gap-4 text-sm" aria-label="Related pages">
          <Link href="/services" className="text-[#4F7CFF] hover:underline">
            Services
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/vitrin" className="text-[#4F7CFF] hover:underline">
            {t.menu_vitrin}
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/contact" className="text-[#4F7CFF] hover:underline">
            Contact
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/" className="text-[#94A3B8] hover:text-[#F8FAFC]">
            ← Home
          </Link>
        </nav>
      </article>
    </div>
  )
}
