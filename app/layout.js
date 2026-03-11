// app/layout.js
import { headers } from 'next/headers'
import { Inter, Plus_Jakarta_Sans, Dancing_Script, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TopNotice from '@/components/TopNotice'
import { SITE_URL, DEFAULT_META } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-handwritten' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const LOCALE_HEADER = 'x-path-locale'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META.en.title,
  },
  description: DEFAULT_META.en.description,
  keywords: [
    'Mustafa Oner',
    'web developer',
    'frontend',
    'Next.js',
    'React',
    'UI design',
    'corporate websites',
    'e-commerce',
    'portfolio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const locale = headersList.get(LOCALE_HEADER) || 'en'
  return (
    <html lang={locale}>
      <body className={`${inter.className} ${plusJakarta.variable} ${dancingScript.variable} ${jetbrainsMono.variable} bg-main text-primary`}>
        <LanguageProvider initialLocale={locale}>
          <div className="min-h-screen flex flex-col pt-14">
            <TopNotice />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
