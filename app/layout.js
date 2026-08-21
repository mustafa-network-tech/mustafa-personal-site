// app/layout.js
import { headers } from 'next/headers'
import { Inter, Plus_Jakarta_Sans, Dancing_Script, JetBrains_Mono, Caveat } from 'next/font/google'
import Script from 'next/script'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LayoutShell from '@/components/LayoutShell'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, GLOBAL_META } from '@/seo/metadata'
import { getPersonSchema, getWebsiteSchema, getOrganizationSchema } from '@/seo/schema'

const inter = Inter({ subsets: ['latin'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-handwritten' })
const caveat = Caveat({ subsets: ['latin', 'latin-ext'], weight: ['500', '600'], variable: '--font-card-script' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const LOCALE_HEADER = 'x-path-locale'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: GLOBAL_META.tr.title },
  description: GLOBAL_META.tr.description,
  keywords: GLOBAL_META.tr.keywords,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
}

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const locale = headersList.get(LOCALE_HEADER) || 'tr'
  const personSchema = getPersonSchema(locale)
  const websiteSchema = getWebsiteSchema(locale)
  const orgSchema = getOrganizationSchema()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} ${plusJakarta.variable} ${dancingScript.variable} ${caveat.variable} ${jetbrainsMono.variable} bg-main text-primary`}>
        <JsonLd data={[personSchema, websiteSchema, orgSchema]} />
        <LanguageProvider initialLocale={locale}>
          <LayoutShell>{children}</LayoutShell>
        </LanguageProvider>
        <WhatsAppButton />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-574KJBEVJL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-574KJBEVJL');
          `}
        </Script>
      </body>
    </html>
  )
}
