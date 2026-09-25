'use client'
import Link from 'next/link'
import {
  ArrowRight, BedDouble, BookHeart, Building2, Code2, Coffee, ConciergeBell, Factory,
  Globe, GraduationCap, HardHat, Home, LayoutGrid, PawPrint, Smartphone, UtensilsCrossed, Wheat,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeShowcaseGroups, getStatusKind, HOME_SHOWCASE_MOBILE_LIMIT } from '@/lib/projects/homeShowcase'
import { getProjectStatus } from '@/components/projects/projectVisuals'

const GROUPS = getHomeShowcaseGroups()

// Yalnızca dekoratif UI ikonları; proje verisine dokunmaz.
const GROUP_ICONS = { websites: Globe, software: Code2, applications: Smartphone }
const PROJECT_ICONS = {
  namehub: Building2,
  'mavi-kadraj-otel': BedDouble,
  'mavi-gayrimenkul': Home,
  'mavi-kafe': Coffee,
  'mk-pati': PawPrint,
  'mk-traceops': Factory,
  'santiye-yonetim-sistemi': HardHat,
  'mk-farm': Wheat,
  'mavi-resepsiyon': ConciergeBell,
  'mavi-kadrajla-ogreniyorum': GraduationCap,
  'aura-daily': BookHeart,
  'mavi-adisyon': UtensilsCrossed,
}

// Sade durum rozetleri: nötr zemin + küçük, düşük doygunlukta nokta.
const STATUS_STYLES = {
  live: { badge: 'bg-black/[.06] text-black/75', dot: 'bg-[#3d7a55]' },
  testing: { badge: 'bg-black/[.06] text-black/75', dot: 'bg-[#a8792b]' },
  development: { badge: 'bg-black/[.06] text-black/75', dot: 'bg-[#4f6fae]' },
  soon: { badge: 'border border-dashed border-black/25 text-black/70', dot: 'bg-black/35' },
  demo: { badge: 'bg-black/[.06] text-black/70', dot: null },
}

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151515]'

export default function SelectedProjects() {
  const { language, t } = useLanguage()
  const copy = t.home_selected
  const prefix = language === 'tr' ? '/tr' : ''
  const projectsHref = `${prefix}/projects`

  return (
    <section id="work" aria-labelledby="selected-projects-title" className="studio-section bg-[#f1efe9] text-[#151515]">
      <div className="studio-shell">
        <header className="max-w-3xl">
          <p className="studio-kicker text-black/50">{copy.kicker}</p>
          <h2 id="selected-projects-title" className="studio-display mt-5 break-words text-[clamp(2rem,8vw,4.5rem)] leading-[.95] tracking-[-.05em]">
            {copy.title_line1}<br />{copy.title_line2}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">{copy.lead}</p>
        </header>

        <div className="mt-14 space-y-14 md:mt-20 md:space-y-16">
          {GROUPS.map((group) => {
            const GroupIcon = GROUP_ICONS[group.id] || LayoutGrid
            const groupCopy = copy.groups[group.id]
            const headingId = `selected-${group.id}-title`
            return (
              <section key={group.id} aria-labelledby={headingId} className="border-t border-black/10 pt-8">
                <div className="flex items-center justify-between gap-4 md:gap-6">
                  <div className="flex min-w-0 items-start gap-4">
                    <GroupIcon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-7 w-7 shrink-0 md:h-8 md:w-8" />
                    <div className="min-w-0">
                      <h3 id={headingId} className="text-xl font-semibold tracking-tight md:text-2xl">{groupCopy.title}</h3>
                      <p className="mt-1 text-sm text-black/55">{groupCopy.desc}</p>
                    </div>
                  </div>
                  <Link
                    href={projectsHref}
                    aria-label={copy.view_all_aria.replace('{category}', groupCopy.title)}
                    className={`group/all inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold ${focusRing}`}
                  >
                    {copy.view_all}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/all:translate-x-0.5 motion-reduce:transition-none" />
                  </Link>
                </div>

                <ul role="list" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
                  {group.items.map((item, index) => (
                    <li key={item.slug} className={index >= HOME_SHOWCASE_MOBILE_LIMIT ? 'hidden sm:flex' : 'flex'}>
                      <ProjectCard item={item} locale={language} href={item.hasDetail ? `${prefix}/projects/${item.slug}` : null} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        <div className="mt-16 flex justify-center md:mt-20">
          <Link
            href={projectsHref}
            className={`group/cta studio-button min-h-[52px] rounded-full bg-[#151515] px-8 text-sm text-white transition-colors duration-200 hover:bg-black ${focusRing}`}
          >
            {copy.all_projects}
            <ArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover/cta:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ item, locale, href }) {
  const content = item[locale] || item.tr
  const Icon = PROJECT_ICONS[item.slug] || LayoutGrid
  const status = getProjectStatus(item, locale)
  const description = content.subtitle || content.shortDesc
  const base = `flex w-full items-start gap-4 rounded-md border p-5`

  const body = <>
    <Icon aria-hidden="true" strokeWidth={1.5} className={`mt-0.5 h-7 w-7 shrink-0 ${href ? 'text-[#151515]' : 'text-black/55'}`} />
    <div className="min-w-0 flex-1">
      <h4 className="break-words text-[15px] font-semibold leading-snug tracking-tight">{content.title}</h4>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-black/60">{description}</p>
      {status && <StatusBadge label={status} kind={getStatusKind(item)} />}
    </div>
  </>

  // Detay sayfası olmayan ürünler bilinçli olarak link değildir.
  if (!href) return <div className={`${base} border-black/10 bg-white/30`}>{body}</div>

  return (
    <Link
      href={href}
      className={`group ${base} border-black/10 bg-white/55 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-black/30 hover:bg-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
    >
      {body}
      <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-black/50 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#151515] motion-reduce:transition-none" />
    </Link>
  )
}

function StatusBadge({ label, kind }) {
  const style = STATUS_STYLES[kind] || STATUS_STYLES.demo
  return (
    <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ${style.badge}`}>
      {style.dot && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />}
      {label}
    </span>
  )
}
