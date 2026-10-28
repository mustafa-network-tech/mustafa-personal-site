'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LEGAL_BASE } from '@/lib/legal/apps'
import './republic-welcome.css'

// Türkiye saati (UTC+3, DST yok). Bitiş hariçtir: 30 Ekim 00:00'da ekran ve bayrak kalkar.
const START_MS = Date.parse('2026-10-28T00:00:00+03:00')
const END_MS = Date.parse('2026-10-30T00:00:00+03:00')
const STORAGE_PREFIX = 'republic-welcome:2026-10-29:'
const DISPLAY_SECONDS = 10
const CLOSE_ANIMATION_MS = 500

const IMG_SQUARE = '/images/republic-day/29-ekim-kare.png'
const IMG_PORTRAIT = '/images/republic-day/29-ekim-dikey.png'

function isCampaignActive() {
  const now = Date.now()
  return now >= START_MS && now < END_MS
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function readSeen(key) {
  try { return window.localStorage.getItem(key) === 'seen' } catch { return false }
}

function writeSeen(key) {
  try { window.localStorage.setItem(key, 'seen') } catch { /* localStorage kapalı olabilir */ }
}

export default function RepublicWelcome() {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(false)
  const [forced, setForced] = useState(false) // ?preview=1 / ?test=1
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [remaining, setRemaining] = useState(DISPLAY_SECONDS)

  const initRef = useRef(false)
  const forcedRef = useRef(false)
  const closeTimerRef = useRef(0)
  const skipRef = useRef(null)

  const close = useCallback(() => {
    if (prefersReducedMotion()) {
      setOpen(false)
      return
    }
    setClosing(true)
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, CLOSE_ANIMATION_MS)
  }, [])

  // Bir kez: URL parametreleri, ilk ziyaret kararı ve gece yarısı kontrolü.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const preview = params.get('preview') === '1'
    const test = params.get('test') === '1'
    const isForced = preview || test
    const storageKey = STORAGE_PREFIX + window.location.hostname

    // StrictMode'da efekt iki kez çalışır; açılış kararı ve storage yazımı yalnızca bir kez verilir.
    if (!initRef.current) {
      initRef.current = true
      forcedRef.current = isForced
      setForced(isForced)
      const activeNow = isCampaignActive()
      setActive(activeNow)
      if (isForced || (activeNow && !readSeen(storageKey))) {
        if (!isForced) writeSeen(storageKey)
        setOpen(true)
      }
      setReady(true)
    }

    const check = window.setInterval(() => {
      const activeNow = isCampaignActive()
      setActive(activeNow)
      if (!activeNow && !forcedRef.current) setOpen(false)
    }, 1000)

    return () => {
      window.clearInterval(check)
      window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  // Diyalog açıkken: kaydırma kilidi, odak, Escape/Tab, geri sayım ve otomatik kapanma.
  useEffect(() => {
    if (!open) return undefined
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const previousFocus = document.activeElement
    root.style.overflow = 'hidden'
    skipRef.current?.focus({ preventScroll: true })

    setRemaining(DISPLAY_SECONDS)
    const tick = window.setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000)
    const autoClose = window.setTimeout(close, DISPLAY_SECONDS * 1000)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      } else if (event.key === 'Tab') {
        event.preventDefault()
        skipRef.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(autoClose)
      document.removeEventListener('keydown', onKeyDown)
      root.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) {
        previousFocus.focus({ preventScroll: true })
      }
    }
  }, [open, close])

  // Play Store yasal sayfalarında gösterilmez (WhatsApp düğmesiyle aynı kural).
  if (pathname?.startsWith(LEGAL_BASE)) return null
  if (!ready || !(active || forced)) return null

  return (
    <>
      {open && (
        <section className={`republic-welcome${closing ? ' is-closing' : ''}`}>
          <div className="republic-welcome__backdrop" aria-hidden="true" />
          <div
            className="republic-welcome__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="29 Ekim Cumhuriyet Bayramı kutlaması"
          >
            <picture className="republic-welcome__picture">
              <source media="(max-width: 720px), (orientation: portrait)" srcSet={IMG_PORTRAIT} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_SQUARE}
                alt="Türkiye Büyük Millet Meclisi kürsüsünde Mustafa Kemal Atatürk; Türk bayraklarıyla 29 Ekim Cumhuriyet Bayramı kutlama afişi."
              />
            </picture>

            <div className="republic-welcome__controls">
              <div className="republic-welcome__timer" aria-label="Otomatik kapanma süresi">
                <span>{remaining}</span>
                <span className="republic-sr-only">saniye</span>
              </div>
              <button ref={skipRef} className="republic-welcome__skip" type="button" onClick={close}>
                Geç
              </button>
            </div>

            <div className="republic-welcome__progress" aria-hidden="true"><span /></div>
          </div>
        </section>
      )}

      {!open && (
        <button
          className="republic-flag"
          type="button"
          aria-label="29 Ekim kutlamasını yeniden aç"
          onClick={() => { setClosing(false); setOpen(true) }}
        >
          <span className="republic-flag__pole" aria-hidden="true" />
          <span className="republic-flag__cloth" aria-hidden="true">
            <span className="republic-flag__moon">☾</span>
            <span className="republic-flag__star">★</span>
          </span>
        </button>
      )}
    </>
  )
}
