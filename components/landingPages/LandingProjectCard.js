import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug } from '@/lib/projects/projectsData'
import { PROJECT_PROBLEMS } from '@/lib/landingPages/pages'

export default function LandingProjectCard({ slug }) {
  const project = getProjectBySlug(slug)
  if (!project) throw new Error(`Unknown landing project: ${slug}`)
  const data = project.tr
  const demo = /demo/i.test(project.status.tr)
  return (
    <article className="min-w-0 border-t border-black/20 py-8">
      {project.image && (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-black/5">
          <Image src={project.image} alt={`${data.title} web sitesi görünümü`} fill sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 680px" className="object-cover" />
        </div>
      )}
      <p className="studio-kicker text-[#555]">{project.status.tr}</p>
      <h3 className="studio-display mt-3 text-2xl md:text-3xl">{data.title}</h3>
      <dl className="mt-5 space-y-4 text-sm leading-7">
        <div><dt className="font-bold">İhtiyaç</dt><dd className="text-[#555]">{PROJECT_PROBLEMS[slug]}</dd></div>
        <div><dt className="font-bold">{demo ? 'Demo yaklaşımı' : 'Çözüm'}</dt><dd className="text-[#555]">{data.shortDesc}</dd></div>
      </dl>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${data.title} özellikleri`}>
        {data.features.slice(0, 4).map((feature) => <li key={feature} className="border border-black/15 px-3 py-2 text-xs leading-5">{feature}</li>)}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/tr/projects/${project.slug}`} className="studio-button border border-black/40" aria-label={`${data.title} projesini incele`}>Projeyi İncele <span aria-hidden="true">↗</span></Link>
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="studio-button border border-black/40" aria-label={`${data.title}: ${demo ? 'canlı demoyu' : 'canlı uygulamayı'} incele (yeni sekme)`}>{demo ? 'Canlı Demo' : 'Canlı İncele'} <span aria-hidden="true">↗</span></a>}
      </div>
    </article>
  )
}
