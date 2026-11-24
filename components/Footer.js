'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { isTurkishPath } from '@/lib/i18n/routes'
import { HUB_SLUGS, LANDING_ROUTES, landingHref } from '@/lib/landingPages/routes'
import { NAV, SOCIALS, EMAIL, MK_DIGITAL, pageHref, pageKeyFor } from '@/lib/mo/site'
import { MoLink, SplitLetters } from '@/components/mo/motion'

export default function Footer() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const tr = language === 'tr'
  const key = pageKeyFor(pathname)
  const showSolutions = isTurkishPath(pathname) && !key // eski iniş sayfalarındaki iç bağlantılar korunur

  return (
    <footer className="mo-footer">
      <div className="mo-wrap">
        <div className="mo-footer-top">
          <MoLink href={pageHref('contact', language)} className="mo-footer-cta">
            <span className="mo-kicker">{tr ? 'Bir mesaj için' : 'For a message'}</span>
            <span className="mo-footer-big" aria-label="Mustafa Öner"><SplitLetters text="Mustafa Öner" /></span>
          </MoLink>
          <nav aria-label={tr ? 'Alt menü' : 'Footer'} className="mo-footer-nav">
            {NAV.filter((n) => n.key !== 'home').map((n) => (
              <MoLink key={n.key} href={pageHref(n.key, language)}>{n[tr ? 'tr' : 'en']}</MoLink>
            ))}
          </nav>
          <ul className="mo-footer-soc">
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            {SOCIALS.filter(([n]) => n !== 'MK Digital Systems').map(([n, h]) => <li key={n}><a href={h} target="_blank" rel="noopener noreferrer">{n} ↗</a></li>)}
          </ul>
        </div>

        {showSolutions && (
          <nav aria-label="Çözümler" className="mo-footer-sol">
            <h2 className="mo-kicker">Çözümler</h2>
            <div>{HUB_SLUGS.map((slug) => <Link key={slug} href={landingHref(slug)}>{LANDING_ROUTES[slug]}</Link>)}</div>
          </nav>
        )}

        <div className="mo-footer-bottom">
          <span>© {new Date().getFullYear()} Mustafa Öner</span>
          <span>Bolu · Osmaniye · Çanakkale</span>
          <a href={MK_DIGITAL} target="_blank" rel="noopener noreferrer">{tr ? 'Çalıştığım yer: MK Digital Systems ↗' : 'Works with: MK Digital Systems ↗'}</a>
        </div>
      </div>
    </footer>
  )
}
