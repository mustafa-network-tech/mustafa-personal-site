'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LEGAL_BASE } from '@/lib/legal/apps'

// Vitrin ve Play Store yasal sayfaları site menüsü/footer olmadan gösterilir.
const BARE_PATHS = ['/vitrin', '/tr/vitrin', LEGAL_BASE]

export default function LayoutShell({ children }) {
  const pathname = usePathname()
  const isBare = BARE_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

  const shell = isBare ? (
    <main className="flex-grow">{children}</main>
  ) : (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )

  return shell
}
