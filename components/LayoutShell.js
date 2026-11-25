'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Intro from '@/components/mo/Intro'
import { TransitionProvider } from '@/components/mo/motion'
import { LEGAL_BASE } from '@/lib/legal/apps'

// Play Store yasal sayfaları site menüsü/footer olmadan gösterilir.
const BARE_PATHS = [LEGAL_BASE]

export default function LayoutShell({ children }) {
  const pathname = usePathname()
  const isBare = BARE_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if (isBare) return <main className="flex-grow">{children}</main>

  return (
    <TransitionProvider>
      <Intro />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="icerik" className="flex-grow">{children}</main>
        <Footer />
      </div>
    </TransitionProvider>
  )
}
