// components/TopNotice.js – envelope top-right, shake, then note slides down; X next to envelope
'use client'

import { useEffect, useState } from 'react'
import { X, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const STORAGE_KEY = 'mustafa-notice-dismissed'
const ENVELOPE_SHAKE_MS = 2000
const NOTE_VISIBLE_MS = 10000

export default function TopNotice() {
  const [phase, setPhase] = useState('idle') // 'idle' | 'envelope' | 'card' | 'hidden'
  const { t } = useLanguage()

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)
    if (dismissed) {
      setPhase('hidden')
      return
    }
    setPhase('envelope')
  }, [])

  useEffect(() => {
    if (phase !== 'envelope') return
    const timer = setTimeout(() => setPhase('card'), ENVELOPE_SHAKE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'card') return
    const timer = setTimeout(() => setPhase('hidden'), NOTE_VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  const closeAll = () => {
    setPhase('hidden')
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
  }

  if (phase === 'hidden' || phase === 'idle') return null

  const content = (t.notice_content || '').split('\n\n').filter(Boolean)
  const showCard = phase === 'card'

  return (
    <>
      {/* Fixed top-right, below menu: envelope + X. Envelope shakes here; note slides down below. */}
      <div
        className="fixed top-24 md:top-28 right-4 md:right-6 z-[9999] flex flex-col items-end"
        role="dialog"
        aria-label={t.notice_title}
      >
        {/* Row: envelope (shaking when phase envelope) + close X */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-xl bg-[#2B313D]/95 border border-[#3A4150] shadow-lg ${phase === 'envelope' ? 'envelope-shake' : ''}`}
          >
            <Mail className="w-6 h-6 text-[#E2E8F0]" strokeWidth={1.8} />
          </div>
          <button
            type="button"
            onClick={closeAll}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note card: slides down from envelope, envelope stays fixed above */}
        {showCard && (
          <div className="mt-3 w-[calc(100vw-2rem)] max-w-[320px] animate-note-slide-down">
            <div className="rounded-2xl bg-[#1E293B]/95 backdrop-blur-sm border border-[#334155]/80 shadow-xl shadow-black/20 px-4 py-3.5">
              <h2 className="text-xs font-semibold text-[#94A3B8] tracking-wide mb-2">
                {t.notice_title}
              </h2>
              <div className="text-[13px] leading-relaxed text-[#E2E8F0] space-y-2">
                {content.map((p, i) => (
                  <p key={i} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-[#94A3B8] italic">
                {t.notice_signature || '— Mustafa Öner'}
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .envelope-shake {
          animation: envelope-shake 1.8s ease-in-out;
        }
        @keyframes envelope-shake {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-8deg); }
          30% { transform: rotate(6deg); }
          45% { transform: rotate(-4deg); }
          60% { transform: rotate(3deg); }
          75% { transform: rotate(-2deg); }
        }
      `}</style>
    </>
  )
}
