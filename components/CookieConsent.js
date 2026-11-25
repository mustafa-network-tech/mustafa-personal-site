'use client'
// Çerez onayı: Google Analytics yalnızca "Kabul et" seçilirse yüklenir (bkz. GoogleAnalytics.js).
// Tercih tarayıcı depolamasında tutulur; footer'daki "Çerez tercihleri" bağlantısı bandı yeniden açar.
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { isEnglishPath } from '@/lib/i18n/routes'
import { LEGAL_BASE } from '@/lib/legal/apps'
import { PAGES } from '@/lib/mo/site'
import { CONSENT_EVENT, OPEN_EVENT, readConsent, writeConsent } from '@/lib/consent'

const COPY = {
  tr: { text: 'Siteyi nasıl kullandığınızı anlamak için Google Analytics kullanıyorum. Çerezler yalnızca siz kabul ederseniz kullanılır.', accept: 'Kabul et', decline: 'Reddet', more: 'Gizlilik' },
  en: { text: 'I use Google Analytics to understand how the site is used. Cookies are only used if you accept.', accept: 'Accept', decline: 'Decline', more: 'Privacy' },
}

export default function CookieConsent() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false) // açılış animasyonu bitti mi

  useEffect(() => {
    const root = document.documentElement
    const check = () => { const i = root.dataset.intro; setReady(!i || i === 'done') }
    check()
    const mo = new MutationObserver(check)
    mo.observe(root, { attributes: true, attributeFilter: ['data-intro'] })
    return () => mo.disconnect()
  }, [])

  useEffect(() => {
    if (readConsent() === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  if (pathname?.startsWith(LEGAL_BASE)) return null // Play Store yasal sayfalarında analytics ve bant yok
  if (!open || !ready) return null

  const en = isEnglishPath(pathname)
  const c = COPY[en ? 'en' : 'tr']
  const choose = (value) => {
    writeConsent(value)
    setOpen(false)
    window.dispatchEvent(new Event(CONSENT_EVENT))
  }

  return (
    <div className="mo-consent" role="dialog" aria-live="polite" aria-label={en ? 'Cookie preferences' : 'Çerez tercihleri'}>
      <p>{c.text} <Link href={en ? PAGES.privacy.en : PAGES.privacy.tr}>{c.more}</Link></p>
      <div className="mo-consent-btns">
        <button type="button" className="mo-consent-no" onClick={() => choose('denied')}>{c.decline}</button>
        <button type="button" className="mo-consent-yes" onClick={() => choose('granted')}>{c.accept}</button>
      </div>
    </div>
  )
}
