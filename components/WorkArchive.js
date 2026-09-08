'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECT_CATEGORIES } from '@/lib/projects/categories'
import { getProjectStatus } from '@/components/projects/projectVisuals'

export default function WorkArchive({ projects, locale = 'tr' }) {
  const tr = locale === 'tr'
  const [category, setCategory] = useState('all')
  const visible = projects.filter((p) => category === 'all' || p.categoryId === category)
  return <div className="studio-site min-h-screen text-[#151515]" style={{backgroundColor:'#f1efe9'}}>
    <header className="pb-12 pt-10 md:pt-16"><div className="studio-shell">
      <p className="studio-kicker">{tr ? 'PROJELER' : 'PROJECTS'}</p>
      <h1 className="studio-display mt-8 whitespace-pre-line text-[clamp(4rem,10vw,10rem)] leading-[.82] tracking-[-.07em]">{tr ? 'TÜM\nPROJELER' : 'ALL\nPROJECTS'}</h1>
      <p className="mt-8 max-w-xl text-xl text-black/55">{tr ? 'İşletmelere özel yazılımlar, SaaS ürünleri, dijital platformlar ve modern web deneyimleri.' : 'Custom software for businesses, SaaS products, digital platforms and modern web experiences.'}</p>
    </div></header>
    <main className="studio-shell pb-28">
      <div role="group" aria-label={tr ? 'Proje kategorileri' : 'Project categories'} className="flex max-w-full gap-2 overflow-x-auto pb-4">
        {[{id:'all',tr:'Tümü',en:'All'},...PROJECT_CATEGORIES].map(item => <button key={item.id} type="button" aria-pressed={category===item.id} aria-controls="project-results" onClick={()=>setCategory(item.id)} className={`shrink-0 rounded-full border px-4 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${category===item.id?'border-[#151515] bg-[#151515] text-white':'border-black/20 hover:bg-white'}`}>{item[locale]||item.tr}</button>)}
      </div>
      <p role="status" className="mb-4 text-sm text-black/55">{visible.length} {tr?'proje':'projects'}</p>
      <div id="project-results" className="border-t border-black/15"><div key={category} className="portfolio-filter-enter">
        {visible.map(project=>{const content=project[locale]||project.tr;return <article key={project.slug} className={`grid gap-5 border-b border-black/15 py-8 md:grid-cols-12 md:items-center md:py-10 ${project.featured?'bg-white/20':''}`}>
          <div className="min-w-0 md:col-span-5"><p className="mb-3 text-xs font-medium text-black/55">{project.category[locale]}</p><h2 className="break-words text-xl font-semibold tracking-tight">{content.title}</h2>{content.subtitle&&<p className="mt-1 text-sm text-black/60">{content.subtitle}</p>}<span className="mt-3 inline-block rounded-full border border-black/15 px-3 py-1 text-xs">{getProjectStatus(project,locale)}</span></div>
          <div className="min-w-0 md:col-span-7"><p className="leading-relaxed text-black/60">{content.shortDesc}</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link className="inline-flex items-center gap-2 underline underline-offset-4" href={`${tr?'/tr':''}/projects/${project.slug}`}>{tr?'Projeyi İncele':'View Project'}<ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link>{project.liveUrl&&<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-black/60">{project.liveCta?.[locale]||project.liveCta?.tr||(tr?'Canlı Proje':'Live Project')}<ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>}</div></div>
        </article>})}
      </div></div>
    </main>
  </div>
}
