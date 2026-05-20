import Link from 'next/link'
import ProjectRequestForm from '@/components/ProjectRequestForm'
import LocalSeoSampleProjects from '@/components/localSeo/LocalSeoSampleProjects'

/**
 * @param {{ page: import('@/lib/localSeo/pages').typeof LOCAL_SEO_PAGES[0] }} props
 */
export default function LocalSeoPageContent({ page }) {
  return (
    <article>
      <section className="relative border-b border-[rgba(248,250,252,0.08)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(79,124,255,0.18), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="container mx-auto px-4 py-14 md:py-20 max-w-4xl relative">
          <p className="hero-eyebrow mb-4">{page.hero.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#F8FAFC] tracking-tight leading-tight mb-5">
            {page.hero.title}
          </h1>
          <p className="text-lg text-[#CBD5E1] leading-relaxed max-w-2xl mb-8">{page.hero.description}</p>
          <Link
            href="#proje-talep-formu"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#4F7CFF] hover:bg-[#3d6ae8] transition-colors"
          >
            {page.hero.ctaLabel}
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-14 max-w-3xl">
        <h2 className="text-xl font-semibold text-[#F8FAFC] mb-4">{page.introTitle}</h2>
        <p className="text-[#94A3B8] leading-relaxed">{page.introText}</p>
      </section>

      <section className="bg-[rgba(15,23,42,0.35)] border-y border-[rgba(248,250,252,0.06)] py-14 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <header className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-[#F8FAFC] mb-2">{page.servicesTitle}</h2>
            <p className="text-[#94A3B8] text-sm md:text-base">{page.servicesSubtitle}</p>
          </header>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.services.map((service) => (
              <li
                key={service.title}
                className="rounded-xl p-5 border border-[rgba(248,250,252,0.1)] bg-[rgba(43,49,61,0.5)]"
              >
                <h3 className="text-base font-semibold text-[#F8FAFC] mb-2">{service.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {page.blocks.map((block) => (
        <section key={block.heading} className="container mx-auto px-4 py-10 max-w-3xl">
          <h2 className="text-lg font-semibold text-[#F8FAFC] mb-3">{block.heading}</h2>
          <p className="text-[#94A3B8] leading-relaxed">{block.text}</p>
        </section>
      ))}

      <LocalSeoSampleProjects slug={page.slug} sectionTitle={`${page.cityName} için örnek projeler`} />

      <section className="container mx-auto px-4 py-10 max-w-3xl text-center">
        <p className="text-[#CBD5E1] mb-4">{page.ctaClosing}</p>
        <Link
          href="#proje-talep-formu"
          className="text-[#4F7CFF] font-medium hover:underline"
        >
          Talep formuna geç →
        </Link>
      </section>

      <ProjectRequestForm
        formId="proje-talep-formu"
        defaultCity={page.defaultCity}
        titleKey="project_request_title"
        subtitleKey="project_request_subtitle"
      />
    </article>
  )
}
