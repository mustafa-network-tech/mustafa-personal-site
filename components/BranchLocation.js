import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { getBranchForCity, getBranchSchema } from '@/lib/branches'

// Server-rendered contact details stay usable even if Google is unavailable.
// No Maps JavaScript SDK, client state or runtime geocoding is required.
export default function BranchLocation({ city }) {
  const branch = getBranchForCity(city)
  if (!branch) return null
  const headingId = `branch-${branch.key}-heading`
  const buttonClass = 'studio-button border border-[#151515]/30 text-[#151515] hover:border-[#4F7CFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F7CFF]'
  return (
    <section id={`branch-${branch.key}`} data-branch={branch.key} aria-labelledby={headingId} className="border-y border-black/10 bg-[#f1efe9] py-14 text-[#151515] md:py-20">
      <JsonLd data={getBranchSchema(branch)} />
      <div className="studio-shell grid min-w-0 items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <p className="studio-kicker text-[#365fc2]">Konum ve iletişim</p>
          <h2 id={headingId} className="studio-display mt-4 text-3xl leading-tight md:text-4xl">{branch.heading}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#555]">{branch.description}</p>
          <address className="mt-6 space-y-3 not-italic text-sm leading-7">
            {branch.address ? <p><span className="font-semibold">Adres</span><br />{branch.address.streetAddress}<br />{branch.address.postalCode} {branch.address.addressLocality} / {branch.address.addressRegion}<br />Türkiye</p> : <p>{branch.city}, Türkiye</p>}
            {branch.phone && <p><span className="font-semibold">Telefon: </span><a href={`tel:${branch.phone}`} className="inline-block py-2 underline decoration-black/30 underline-offset-4">{branch.phoneLabel}</a></p>}
            {branch.website && <p><span className="font-semibold">Web: </span><a href={branch.website} className="inline-block py-2 underline decoration-black/30 underline-offset-4">{branch.website.replace(/^https?:\/\//, '')}</a></p>}
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className={buttonClass} href={branch.mapsUrl} target="_blank" rel="noopener noreferrer">Google Haritalar’da Aç <span aria-hidden="true">↗</span><span className="sr-only"> (yeni sekme)</span></a>
            {branch.directionsUrl && <a className={buttonClass} href={branch.directionsUrl} target="_blank" rel="noopener noreferrer">Yol Tarifi Al <span aria-hidden="true">↗</span><span className="sr-only"> (yeni sekme)</span></a>}
            {branch.whatsapp && <a className={buttonClass} href={branch.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (yeni sekme)</span></a>}
          </div>
          <nav aria-label={`${branch.city} şubesi ile ilgili bağlantılar`} className="mt-5 flex flex-wrap gap-3">
            <Link href="/tr/contact" className="studio-button bg-[#4F7CFF] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F7CFF]">Şubeyle İletişime Geçin</Link>
            <Link href="/tr/projects" className={buttonClass}>Projeleri İncele</Link>
          </nav>
        </div>
        <div className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-black/15 bg-white shadow-sm">
            {branch.embedUrl ? <iframe src={branch.embedUrl} title={`${branch.heading} Google Haritalar konumu`} width="600" height="320" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="block h-[320px] w-full border-0 lg:h-[380px]" /> : <div className="flex h-[320px] flex-col items-center justify-center gap-4 px-6 text-center lg:h-[380px]"><p className="font-semibold">{branch.heading}</p><a className={buttonClass} href={branch.mapsUrl} target="_blank" rel="noopener noreferrer">Konumu Google Haritalar’da Gör <span aria-hidden="true">↗</span></a></div>}
          </div>
          <p className="mt-3 text-xs leading-6 text-[#555]">Harita açılmıyorsa Google Haritalar bağlantısını kullanabilirsiniz.</p>
        </div>
      </div>
    </section>
  )
}
