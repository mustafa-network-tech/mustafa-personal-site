'use client'
import { useLanguage } from '@/contexts/LanguageContext'
import { NAV, LINKEDIN, INSTAGRAM, MAVI_KADRAJ, MK_DIGITAL, pageHref } from '@/lib/mo/site'
import { MoLink, useInView } from '@/components/mo/motion'
import { OPEN_EVENT } from '@/lib/consent'

const COPY = {
  tr: { nav: 'Alt menü', explore: 'Keşfet', links: 'Bağlantılar', slogan: 'Hayat, tek bir hikâyeden ibaret değil.', motto: 'Emekle, merakla, tutkuyla.', top: 'Yukarı dön', contact: 'İletişim', privacy: 'Gizlilik', cookies: 'Çerez tercihleri' },
  en: { nav: 'Footer', explore: 'Explore', links: 'Links', slogan: 'Life is more than a single story.', motto: 'With effort, curiosity and passion.', top: 'Back to top', contact: 'Contact', privacy: 'Privacy', cookies: 'Cookie preferences' },
}
const EXPLORE_KEYS = ['about', 'experience', 'photo', 'projects', 'book']

export default function Footer() {
  const { language } = useLanguage()
  const [ref, seen] = useInView({ rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
  const tr = language === 'tr'
  const c = COPY[tr ? 'tr' : 'en']
  const toTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <footer ref={ref} className={`mo-footer ${seen ? 'is-in' : ''}`}>
      <div className="mo-wrap">
        <div className="mo-footer-top">
          <div className="mo-footer-id">
            <MoLink href={pageHref('home', language)} className="mo-footer-sig" aria-label="Mustafa Öner">Mustafa Öner</MoLink>
            <svg className="mo-footer-line" viewBox="0 0 260 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M2 9 C40 3, 78 12, 118 7 S196 2, 258 8" pathLength="1" />
            </svg>
            <p className="mo-footer-slogan">{c.slogan}</p>
            <p className="mo-footer-places">Bolu · Osmaniye · Çanakkale</p>
          </div>
          <nav aria-label={c.nav} className="mo-footer-col">
            <h2>{c.explore}</h2>
            <ul>
              {EXPLORE_KEYS.map((k) => {
                const n = NAV.find((x) => x.key === k)
                return <li key={k}><MoLink href={pageHref(k, language)}>{n[tr ? 'tr' : 'en']}</MoLink></li>
              })}
            </ul>
          </nav>
          <div className="mo-footer-col">
            <h2>{c.links}</h2>
            <ul>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a></li>
              <li><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></li>
              <li><a href={MAVI_KADRAJ} target="_blank" rel="noopener noreferrer">Mavi Kadraj <span aria-hidden="true">↗</span></a></li>
              <li><a href={MK_DIGITAL} target="_blank" rel="noopener noreferrer">MK Digital Systems <span aria-hidden="true">↗</span></a></li>
              <li><MoLink href={pageHref('contact', language)}>{c.contact} <span aria-hidden="true">↗</span></MoLink></li>
            </ul>
          </div>
        </div>

        <div className="mo-footer-bottom">
          <span className="mo-footer-legal">© Mustafa Öner <span aria-hidden="true">·</span> <MoLink href={pageHref('privacy', language)}>{c.privacy}</MoLink> <span aria-hidden="true">·</span> <button type="button" className="mo-footer-cookie" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>{c.cookies}</button></span>
          <span className="mo-footer-motto">{c.motto}</span>
          <a href="#icerik" onClick={toTop}>{c.top} <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  )
}
