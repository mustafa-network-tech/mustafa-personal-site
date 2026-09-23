'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { LEGAL_BASE } from '@/lib/legal/apps'

const GA_ID = 'G-574KJBEVJL'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  // Play Store yasal sayfalarında analytics yüklenmez ve çerez bırakılmaz.
  if (pathname?.startsWith(LEGAL_BASE)) return null

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
