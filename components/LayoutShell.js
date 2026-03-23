'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TopNotice from '@/components/TopNotice'

const VITRIN_PATHS = ['/vitrin', '/tr/vitrin']

export default function LayoutShell({ children }) {
  const pathname = usePathname()
  const isVitrin = VITRIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if (isVitrin) {
    return <main className="flex-grow">{children}</main>
  }

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <TopNotice />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
