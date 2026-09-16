import Link from 'next/link'
import { getLandingsForProject } from '@/lib/landingPages/pages'
import { LANDING_ROUTES, landingHref } from '@/lib/landingPages/routes'

export default function RelatedLandingLinks({ projectSlug }) {
  const pages = getLandingsForProject(projectSlug)
  if (!pages.length) return null
  return <section className="bg-[#f1efe9] py-12 text-[#151515]" aria-labelledby="related-solutions-heading"><div className="studio-shell"><h2 id="related-solutions-heading" className="studio-display text-2xl">Bu projeyle ilgili çözümler</h2><nav aria-label="Proje ile ilgili hizmetler" className="mt-5 flex flex-wrap gap-3">{pages.map((page) => <Link key={page.slug} href={landingHref(page.slug)} className="studio-button border border-black/30">{LANDING_ROUTES[page.slug]} <span aria-hidden="true">↗</span></Link>)}</nav></div></section>
}
