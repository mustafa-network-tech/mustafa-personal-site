// app/layout.js
import { headers } from 'next/headers'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CookieConsent from '@/components/CookieConsent'
import OzelGunEkrani from '@/components/OzelGunEkrani'
import { Fraunces, Manrope, Poppins, Ms_Madi, Hurricane, Square_Peg, Caveat } from 'next/font/google'
import './globals.css'
import './mo.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LayoutShell from '@/components/LayoutShell'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, GLOBAL_META, OG_IMAGES } from '@/seo/metadata'
import { getPersonSchema, getWebsiteSchema } from '@/seo/schema'

const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--f-serif', display: 'swap', axes: ['opsz'] })
const poppins = Poppins({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--f-disp', display: 'swap' })
const signature = Ms_Madi({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--f-sign', display: 'block' })
const hand2 = Hurricane({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--f-hand2', display: 'block' })
const hand3 = Square_Peg({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--f-hand3', display: 'block' })
const caveat = Caveat({ subsets: ['latin', 'latin-ext'], variable: '--f-hand4', display: 'swap' })
const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--f-sans', display: 'swap' })

// Boyamadan önce çalışır: JS sınıfı + açılış kararı (yalnızca oturumdaki ilk girişte; yenileme ve sayfa içi geçişlerde tekrarlanmaz) (reduced-motion ve yasal sayfalarda açılış yok).
const BOOT = `try{var d=document.documentElement,p=location.pathname.replace(/[/]$/,'')||'/';d.classList.add('mo-js');var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;var n=navigator;if((n.deviceMemory&&n.deviceMemory<=4)||(n.hardwareConcurrency&&n.hardwareConcurrency<=4))d.classList.add('mo-low');var nt=((performance.getEntriesByType&&performance.getEntriesByType('navigation')[0])||{}).type;var seen=0;try{seen=sessionStorage.getItem('mo-seen');sessionStorage.setItem('mo-seen','1')}catch(e){}if(!rm&&!seen&&(p==='/tr'||p==='/en')&&nt!=='back_forward'){d.dataset.intro='play';setTimeout(function(){if(d.dataset.intro==='play'){d.dataset.intro='done';d.dataset.hero='go'}},17500)}}catch(e){}`

const LOCALE_HEADER = 'x-path-locale'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: GLOBAL_META.tr.title },
  description: GLOBAL_META.tr.description,
  keywords: GLOBAL_META.tr.keywords,
  applicationName: 'Mustafa Öner',
  authors: [{ name: 'Mustafa Öner', url: SITE_URL }],
  creator: 'Mustafa Öner',
  // Tek, sabit ve çakışmasız ikon tanımı (kaynak: mustafa.jpg -> scripts/generate-site-icons.py)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Mustafa Öner',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    title: GLOBAL_META.tr.title,
    description: GLOBAL_META.tr.description,
    images: [{ url: OG_IMAGES.tr, width: 1200, height: 630, alt: 'Mustafa Öner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: GLOBAL_META.tr.title,
    description: GLOBAL_META.tr.description,
    images: [OG_IMAGES.tr],
  },
}

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const locale = headersList.get(LOCALE_HEADER) || 'tr'
  const personSchema = getPersonSchema(locale)
  const websiteSchema = getWebsiteSchema(locale)
  return (
    <html lang={locale} suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable} ${poppins.variable} ${signature.variable} ${hand2.variable} ${hand3.variable} ${caveat.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: BOOT }} /></head>
      <body className="bg-main text-primary">
        <a href="#icerik" className="mo-skip">{locale === 'en' ? 'Skip to content' : 'İçeriğe geç'}</a>
        <JsonLd data={[personSchema, websiteSchema]} />
        <LanguageProvider initialLocale={locale}>
          <LayoutShell>{children}</LayoutShell>
        </LanguageProvider>
        <OzelGunEkrani />
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
