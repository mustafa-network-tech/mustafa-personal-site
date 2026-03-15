// app/layout.js
import { headers } from 'next/headers'
import { Inter, Plus_Jakarta_Sans, Dancing_Script, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LayoutShell from '@/components/LayoutShell'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, GLOBAL_META } from '@/seo/metadata'
import { getPersonSchema, getWebsiteSchema } from '@/seo/schema'

const inter = Inter({ subsets: ['latin'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-handwritten' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const LOCALE_HEADER = 'x-path-locale'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: GLOBAL_META.en.title },
  description: GLOBAL_META.en.description,
  keywords: GLOBAL_META.en.keywords,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
  },
  twitter: { card: 'summary_large_image' },
}

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const locale = headersList.get(LOCALE_HEADER) || 'en'
  const personSchema = getPersonSchema(locale)
  const websiteSchema = getWebsiteSchema()
  return (
    <html lang={locale}>
      <body className={`${inter.className} ${plusJakarta.variable} ${dancingScript.variable} ${jetbrainsMono.variable} bg-main text-primary`}>
        <JsonLd data={[personSchema, websiteSchema]} />
        <LanguageProvider initialLocale={locale}>
          <LayoutShell>{children}</LayoutShell>
        </LanguageProvider>
      </body>
    </html>
  )
}
