'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const VITRIN_PATHS = ['/vitrin', '/tr/vitrin']

export default function LayoutShell({ children }) {
  const pathname = usePathname()
  const isVitrin = VITRIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

  const shell = isVitrin ? (
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
