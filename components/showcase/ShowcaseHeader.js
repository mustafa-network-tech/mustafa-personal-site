'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

const PROFILE_IMAGES = [
  { src: '/showcase/mk-logo.png', alt: 'MK Digital Systems' },
  { src: '/showcase/mustafa.jpg', alt: 'Mustafa Öner' },
]
const ROTATE_INTERVAL_MS = 4500

export default function ShowcaseHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const isTr = pathname.startsWith('/tr')
  const homeHref = isTr ? '/tr' : '/'
  const [profileIndex, setProfileIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProfileIndex((i) => (i + 1) % PROFILE_IMAGES.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const switchLang = () => {
    const next = language === 'tr' ? 'en' : 'tr'
    setLanguage(next)
    router.push(next === 'tr' ? '/tr/vitrin' : '/vitrin')
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur border-b border-[rgba(255,255,255,0.08)]">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link href={homeHref} className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-[#64748b]/50 ring-offset-2 ring-offset-[#0f172a] flex-shrink-0">
            {PROFILE_IMAGES.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={56}
                height={56}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: profileIndex === i ? 1 : 0 }}
                priority={i === 0}
              />
            ))}
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-base md:text-lg font-semibold text-[#F8FAFC] truncate">
              {t.showcase_site_title || 'Mustafa Öner'}
            </span>
            <span className="text-[11px] md:text-xs text-[#94A3B8] truncate">
              MK Digital Systems
            </span>
          </div>
        </Link>
        <div className="flex-1 flex justify-center">
          <span className="text-base md:text-lg font-semibold text-[#F8FAFC]">
            {t.showcase_header_subtitle || 'Digital System Developer'}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => language !== 'en' && switchLang()}
            className={`text-sm transition-colors ${language === 'en' ? 'text-[#F8FAFC] font-medium' : 'text-[#94A3B8] hover:text-[#F8FAFC]'}`}
          >
            EN
          </button>
          <span className="text-[#64748b]">|</span>
          <button
            type="button"
            onClick={() => language !== 'tr' && switchLang()}
            className={`text-sm transition-colors ${language === 'tr' ? 'text-[#F8FAFC] font-medium' : 'text-[#94A3B8] hover:text-[#F8FAFC]'}`}
          >
            TR
          </button>
        </div>
      </div>
    </header>
  )
}
