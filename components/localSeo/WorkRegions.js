import Link from 'next/link'
import { WORK_REGIONS } from '@/lib/localSeo/pageGuidance'

export default function WorkRegions() {
  return (
    <section id="calisma-bolgeleri" aria-labelledby="work-regions-heading" className="mb-16">
      <h2 id="work-regions-heading" className="text-xl font-semibold text-[#F8FAFC] mb-4">Çalışma Bölgeleri</h2>
      <p className="text-[#94A3B8] leading-relaxed mb-6">İşletmenizin bulunduğu bölgedeki web sitesi ihtiyaçlarını inceleyin. Kapsamı çevrim içi görüşmeler ve paylaşacağınız içeriklerle planlayabiliriz. Bu liste hizmet bölgelerini gösterir; fiziksel şube listesi değildir.</p>
      <div className="space-y-6">
        {WORK_REGIONS.map(group => <div key={group.title} className="border-t border-[rgba(248,250,252,0.12)] pt-5">
          <h3 className="text-base font-semibold text-[#F8FAFC]">{group.title}</h3>
          <p className="text-sm text-[#94A3B8] mt-2 mb-4">{group.description}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">{group.cities.map(([name, href]) => <li key={href}><Link href={href} className="text-sm text-[#4F7CFF] underline underline-offset-4">{name}</Link></li>)}</ul>
        </div>)}
      </div>
    </section>
  )
}
