import Link from 'next/link'
import { getProjectBySlug } from '@/lib/projects/projectsData'
import { getLandingBreadcrumbs } from '@/lib/landingPages/pages'
import { LANDING_ROUTES, landingHref } from '@/lib/landingPages/routes'
import LandingProjectCard from './LandingProjectCard'
import styles from './LandingPages.module.css'

function ProjectExamples({ page }) {
  return (
    <section id="proje-ornekleri" className="bg-[#f1efe9] py-16 text-[#151515] md:py-24" aria-labelledby="projects-heading">
      <div className="studio-shell">
        <p className="studio-kicker text-[#555]">Portföyden</p>
        <h2 id="projects-heading" className="studio-display mt-4 max-w-4xl text-3xl leading-tight md:text-5xl">{page.projectTitle}</h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#555]">Her çalışmanın durumu kartında belirtilmiştir. Demo projeler tasarım ve kullanım yaklaşımını gösterir.</p>
        <div className={`mt-10 grid gap-x-10 ${page.projects.length > 1 ? 'md:grid-cols-2' : 'max-w-4xl'}`}>
          {page.projects.map((slug) => <LandingProjectCard key={slug} slug={slug} />)}
        </div>
        <Link href="/tr/projects" className="studio-button mt-4 border border-black/40">Tüm Projeleri İncele <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

function Solution({ page }) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="solution-heading">
      <div className="studio-shell">
        <p className="studio-kicker text-white/60">Çözüm yaklaşımı</p>
        <h2 id="solution-heading" className="studio-display mt-4 max-w-4xl text-3xl leading-tight md:text-5xl">{page.solutionTitle}</h2>
        <div className="mt-10 border-t border-white/20">
          {page.sections.map(([heading, text], index) => (
            <div key={heading} className="grid gap-4 border-b border-white/20 py-8 md:grid-cols-12 md:gap-8">
              <span aria-hidden="true" className="text-xs text-white/60 md:col-span-1">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="studio-display text-2xl md:col-span-4">{heading}</h3>
              <p className="text-base leading-8 text-white/70 md:col-span-7">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LandingPageContent({ page }) {
  const breadcrumbs = getLandingBreadcrumbs(page)
  const heroProject = page.heroProject ? getProjectBySlug(page.heroProject) : null
  return (
    <article className={`studio-site text-white ${styles.page}`}>
      <header className="border-b border-white/20 pb-16 pt-7 md:pb-24">
        <div className="studio-shell">
          <nav aria-label="İçerik yolu" className="mb-12 md:mb-20">
            <ol className="flex flex-wrap gap-x-3 gap-y-2 text-xs leading-6 text-white/65">
              {breadcrumbs.map((item, index) => <li key={item.url} className="inline-flex min-w-0 gap-3">{index > 0 && <span aria-hidden="true">/</span>}{index === breadcrumbs.length - 1 ? <span aria-current="page">{item.name}</span> : <Link className="hover:text-white" href={item.url}>{item.name}</Link>}</li>)}
            </ol>
          </nav>
          <p className="studio-kicker text-[#8aabff]">{LANDING_ROUTES[page.slug]} · Digital Studio</p>
          <h1 className="studio-display mt-6 max-w-6xl text-[clamp(2.3rem,5.8vw,5.8rem)] leading-[1.08] tracking-[-.045em]">{page.h1}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">{page.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/tr/contact" className="studio-button studio-button-accent">{page.cta} <span aria-hidden="true">↗</span></Link>
            {heroProject ? (
              heroProject.liveUrl
                ? <a href={heroProject.liveUrl} target="_blank" rel="noopener noreferrer" className="studio-button studio-button-light">MK Farm’ı Canlı İncele <span aria-hidden="true">↗</span><span className="sr-only"> (yeni sekme)</span></a>
                : <Link href={`/tr/projects/${heroProject.slug}`} className="studio-button studio-button-light">MK Farm’ı İncele</Link>
            ) : <a href="#proje-ornekleri" className="studio-button studio-button-light">Projeleri İncele <span aria-hidden="true">↓</span></a>}
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24" aria-labelledby="need-heading">
        <div className="studio-shell grid gap-8 md:grid-cols-2 md:gap-16">
          <h2 id="need-heading" className="studio-display text-3xl leading-tight md:text-4xl">{page.needTitle}</h2>
          <div><p className="text-lg leading-8 text-white/70">{page.need}</p>{page.note && <p className="mt-6 border-l border-[#8aabff] pl-5 text-sm leading-7 text-white/60">{page.note}</p>}</div>
        </div>
      </section>

      {page.projectsFirst ? <><ProjectExamples page={page} /><Solution page={page} /></> : <><Solution page={page} /><ProjectExamples page={page} /></>}

      <section className="py-16 md:py-24" aria-labelledby="process-heading">
        <div className="studio-shell">
          <p className="studio-kicker text-white/60">Birlikte çalışma</p>
          <h2 id="process-heading" className="studio-display mt-4 text-3xl md:text-5xl">İhtiyaçtan uygulamaya</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {page.process.map((text, index) => <li key={text} className="border-t border-white/20 pt-6"><span className="text-sm text-[#8aabff]">{String(index + 1).padStart(2, '0')}</span><p className="mt-4 max-w-xl text-base leading-8 text-white/75">{text}</p></li>)}
          </ol>
        </div>
      </section>

      {page.regions && <section className="border-y border-white/20 py-14" aria-labelledby="regions-heading"><div className="studio-shell"><h2 id="regions-heading" className="studio-display text-3xl">Bölgesel Çözümler</h2><p className="mt-4 max-w-2xl leading-7 text-white/70">Günlük plan, puantaj, imalat, kaynak takibi ve saha–ofis akışı için farklı kullanım senaryolarını inceleyin.</p><nav className="mt-6 flex flex-wrap gap-3" aria-label="Bölgesel şantiye çözümleri">{page.regions.map((slug) => <Link key={slug} href={landingHref(slug)} className="studio-button border border-white/30">{LANDING_ROUTES[slug]} <span aria-hidden="true">↗</span></Link>)}</nav></div></section>}

      <section className="bg-[#f1efe9] py-16 text-[#151515] md:py-24" aria-labelledby="faq-heading">
        <div className="studio-shell grid gap-10 md:grid-cols-12">
          <h2 id="faq-heading" className="studio-display text-3xl md:col-span-4 md:text-5xl">Sık sorulan sorular</h2>
          <div className="md:col-span-8">{page.faqs.map(([question, answer]) => <details key={question} className="border-t border-black/20 py-5"><summary className="cursor-pointer py-2 text-lg font-semibold leading-7">{question}</summary><p className="mt-4 max-w-3xl text-base leading-8 text-[#555]">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="contact-heading">
        <div className="studio-shell">
          <h2 id="contact-heading" className="studio-display max-w-4xl text-3xl leading-tight md:text-5xl">{page.cta}</h2>
          <p className="mt-5 max-w-2xl leading-8 text-white/70">İşletmenizi, mevcut çalışma biçiminizi ve çözmek istediğiniz ihtiyacı paylaşın. İlk görüşmeyi somut bir örnek üzerinden başlatalım.</p>
          <Link href="/tr/contact" className="studio-button studio-button-accent mt-7">İletişime Geçin <span aria-hidden="true">↗</span></Link>
          <nav aria-label="İlgili hizmetler" className="mt-16 border-t border-white/20 pt-8"><p className="studio-kicker mb-4 text-white/60">İlgili hizmetleri keşfedin</p><div className="flex flex-wrap gap-3">{page.related.map((slug) => <Link key={slug} href={landingHref(slug)} className="studio-button border border-white/30">{LANDING_ROUTES[slug]} <span aria-hidden="true">↗</span></Link>)}</div></nav>
        </div>
      </section>
    </article>
  )
}
