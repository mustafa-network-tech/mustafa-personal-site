'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { LEGAL_BASE } from '@/lib/legal/apps'
import { CONSENT_EVENT, readConsent } from '@/lib/consent'

const GA_ID = 'G-574KJBEVJL'

// Reddedilirse veya geri alınırsa Google Analytics'in bıraktığı çerezleri siler.
function clearGaCookies() {
  const host = window.location.hostname
  const domains = [host, '.' + host.replace(/^www\./, '')]
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n === '_ga' || n.startsWith('_ga_') || n === '_gid').forEach((n) => {
    domains.forEach((d) => { document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}` })
    document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  })
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    const sync = () => {
      const ok = readConsent() === 'granted'
      setGranted(ok)
      window[`ga-disable-${GA_ID}`] = !ok
      if (!ok) clearGaCookies()
    }
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    return () => window.removeEventListener(CONSENT_EVENT, sync)
  }, [])

  // Play Store yasal sayfalarında analytics yüklenmez ve çerez bırakılmaz; onay verilmeden de yüklenmez.
  if (pathname?.startsWith(LEGAL_BASE) || !granted) return null

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
    </Script>
  </>
}
