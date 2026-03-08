// components/TopNotice.js
'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TopNotice() {
  const [visible, setVisible] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4500) // 4.5 seconds
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-3 left-3 md:left-auto md:top-24 md:right-6 z-[9999] flex justify-end">
      <div className="relative w-full max-w-[250px] md:w-[240px] rounded-2xl bg-card shadow-card border border-divider px-4 py-3 md:px-5 md:py-4">

        {/* baloncuk oku (desktop only) */}
        <div className="hidden md:block absolute -bottom-2 right-10 w-4 h-4 bg-card border-r border-b border-divider rotate-45" />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] md:text-xs font-semibold text-accent mb-1 tracking-wide">
              {t.notice_title}
            </div>

            {/* Mobil: küçük + kısa görünsün. Desktop: mevcut boy */}
            <div className="text-sm md:text-[15px] leading-snug text-primary font-medium md:notice-blink whitespace-pre-line">
              <span className="md:hidden block line-clamp-3">{t.notice_short}</span>
              <span className="hidden md:block">{t.notice_full}</span>
            </div>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="p-1 rounded-md hover:bg-secondary shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>

        {/* süre barı */}
        <div className="mt-3 h-[3px] w-full rounded-full bg-divider overflow-hidden">
          <div className="h-full bg-accent notice-bar" />
        </div>

        <style jsx>{`
          .notice-bar {
            width: 100%;
            animation: bar 4.5s linear forwards;
          }

          @keyframes bar {
            from { transform: translateX(-100%); }
            to { transform: translateX(0%); }
          }

          /* blink sadece desktop'ta kullanılıyor (md:notice-blink) */
          .notice-blink {
            animation: blinkText 1.2s ease-in-out infinite;
          }

          @keyframes blinkText {
            0% { opacity: 1; }
            50% { opacity: 0.35; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}