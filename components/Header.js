'use client'
// Mustafa Öner — tipografik başlık + tam ekran menü. (Eski Bootstrap/SaaS navigasyonu yerine.)
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { toEnglishPath, toTurkishPath } from '@/lib/i18n/routes'
import { NAV, SOCIALS, EMAIL, pageHref, pageKeyFor, counterpartPath } from '@/lib/mo/site'
import { MoLink, useMoNav } from '@/components/mo/motion'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { go } = useMoNav()
  const { language, setLanguage } = useLanguage()
  const tr = language === 'tr'
  const current = pageKeyFor(pathname)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)
  const lastY = useRef(0)

  useEffect(() => { setOpen(false) }, [pathname])

  // Kaydırma: üstte şeffaf, aşağı inerken gizlenir, yukarı çıkarken koyu zeminle geri gelir.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 40)
        if (y > lastY.current + 6 && y > 320) setHidden(true)
        else if (y < lastY.current - 6 || y < 320) setHidden(false)
        lastY.current = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  // Menü açıkken: kaydırmayı kilitle, Esc ile kapat, odağı yönet.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => firstLinkRef.current?.focus(), 350)
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus() } }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); clearTimeout(t) }
  }, [open])

  const change = useCallback((lang) => {
    if (lang === language) return
    setLanguage(lang)
    setOpen(false)
    const mapped = counterpartPath(pathname, lang)
    const target = mapped || (lang === 'tr' ? toTurkishPath(pathname) : toEnglishPath(pathname))
    if (mapped) go(target); else router.push(target)
  }, [language, pathname, router, setLanguage, go])

  const label = (item) => item[tr ? 'tr' : 'en']
  const currentItem = NAV.find((n) => n.key === current)

  return (
    <>
      <header className={`mo-header ${scrolled ? 'is-solid' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-menu' : ''}`}>
        <MoLink href={pageHref('home', language)} className="mo-brand" aria-label={tr ? 'Mustafa Öner — Ana Sayfa' : 'Mustafa Öner — Home'}>
          Mustafa <span>Öner</span>
        </MoLink>
        <div className="mo-header-r">
          <div className="mo-lang" role="group" aria-label={tr ? 'Dil' : 'Language'}>
            <button type="button" aria-pressed={tr} onClick={() => change('tr')}>TR</button>
            <button type="button" aria-pressed={!tr} onClick={() => change('en')}>EN</button>
          </div>
          <button ref={toggleRef} type="button" className="mo-burger" aria-expanded={open} aria-controls="mo-menu" onClick={() => setOpen((v) => !v)}>
            <span className="mo-burger-t">{open ? (tr ? 'Kapat' : 'Close') : (tr ? 'Menü' : 'Menu')}</span>
            <span className="mo-burger-i" aria-hidden="true"><b /><b /></span>
          </button>
        </div>
      </header>

      <div id="mo-menu" className={`mo-menu ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label={tr ? 'Ana menü' : 'Main menu'} aria-hidden={!open} inert={!open ? '' : undefined}>
        <div className="mo-menu-in">
          <nav aria-label={tr ? 'Ana menü' : 'Main'}>
            <ol className="mo-menu-list">
              {NAV.map((item, i) => (
                <li key={item.key} style={{ '--i': i }}>
                  <MoLink ref={i === 0 ? firstLinkRef : undefined} href={pageHref(item.key, language)} aria-current={current === item.key ? 'page' : undefined} className="mo-menu-link" onClick={() => setOpen(false)}>
                    <span className="mo-menu-t">{label(item)}</span>
                    <i aria-hidden="true" />
                  </MoLink>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mo-menu-side">
            <p className="mo-menu-cap">Bolu · Osmaniye · Çanakkale</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <ul>
              {SOCIALS.map(([n, h]) => <li key={n}><a href={h} target="_blank" rel="noopener noreferrer">{n} ↗</a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
