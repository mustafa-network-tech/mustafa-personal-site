import { ArrowUpRight } from 'lucide-react'

export default function WorkArchive({ projects, locale = 'tr' }) {
  const tr = locale === 'tr'
  return <div className="studio-site min-h-screen text-[#151515]" style={{backgroundColor:'#f1efe9'}}>
    <header className="pb-12 pt-10 md:pt-16"><div className="studio-shell">
      <p className="studio-kicker">{tr ? 'PROJELER' : 'PROJECTS'}</p>
      <h1 className="studio-display mt-8 whitespace-pre-line text-[clamp(4rem,10vw,10rem)] leading-[.82] tracking-[-.07em]">{tr ? 'TÜM\nPROJELER' : 'ALL\nPROJECTS'}</h1>
      <p className="mt-8 max-w-xl text-xl text-black/55">{tr ? 'Web siteleri, dijital ürünler, mobil uygulamalar ve operasyon sistemleri.' : 'Websites, digital products, mobile applications and operation systems.'}</p>
    </div></header>
    <main className="studio-shell pb-28"><div className="border-t border-black/15">
      {projects.map((project) => { const content=project[locale]||project.tr; return <article key={project.slug} className="grid gap-5 border-b border-black/15 py-8 md:grid-cols-12 md:items-center md:py-10">
        <div className="md:col-span-5">{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="group inline-flex max-w-full items-center gap-3 rounded-full border border-black/20 bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#151515] hover:bg-[#151515] hover:text-white"><span className="truncate">{content.title}</span><ArrowUpRight className="h-4 w-4 shrink-0"/></a> : <span className="inline-flex max-w-full items-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-black/40">{content.title}</span>}</div>
        <div className="md:col-span-7"><p className="leading-relaxed text-black/60">{content.shortDesc}</p>{!project.liveUrl&&<p className="mt-2 text-xs font-semibold uppercase tracking-[.12em] text-black/35">{tr?'Canlı bağlantı yakında':'Live link coming soon'}</p>}</div>
      </article>})}
    </div></main>
  </div>
}
