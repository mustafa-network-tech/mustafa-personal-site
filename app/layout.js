// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TopNotice from '@/components/TopNotice'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mustafa Oner | Telecom Field Technician & Infrastructure Specialist',

  description:
    'Telecom field technician with 20+ years of hands-on experience in fiber and copper infrastructure. FTTH / FTTB operations, central office frames, splicing, testing and real field delivery.',

  keywords: [
    'telecom field technician',
    'fiber infrastructure',
    'copper network',
    'FTTH',
    'FTTB',
    'telecom installation',
    'fiber splicing',
    'central office MDF IDF',
    'access network',
    'telecom portfolio'
  ],

  openGraph: {
    title: 'Mustafa Oner | Telecom Field Technician & Infrastructure Specialist',
    description:
      'Professional portfolio of a telecom field technician focused on fiber and copper access networks, real field operations and technical delivery.',
    type: 'website'
  },

  twitter: {
    card: 'summary',
    title: 'Mustafa Oner | Telecom Field Technician',
    description:
      'Telecom infrastructure portfolio – fiber, copper and field operations.'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} bg-white text-gray-900`}>
        <div className="min-h-screen flex flex-col pt-14">
          <TopNotice />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
