'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LEGAL_BASE } from '@/lib/legal/apps'
import { OZEL_GUNLER, aktifOzelGun, zorunluBitis, gordumAnahtari } from '@/lib/ozel-gunler'
import './ozel-gun-ekrani.css'

const CLOSE_ANIMATION_MS = 500

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function readSeen(key) {
  try { return window.localStorage.getItem(key) === 'seen' } catch { return false }
}
function writeSeen(key) {
  try { window.localStorage.setItem(key, 'seen') } catch { /* localStorage kapalı olabilir */ }
}

/**
 * İki mod:
 *  - 'ilk'     : aralıkta siteye ilk girişte N sn, "Geç" ile kapatılabilir.
 *  - 'zorunlu' : belirlenen saatte süre boyunca, hangi sayfada olursa olsun, kapatılamaz.
 * Test: ?ozelgun=10-kasim (ilk giriş) veya ?ozelgun=10-kasim&zorunlu=1 (zorunlu; önizlemede Escape ile çıkılabilir).
 */
export default function OzelGunEkrani() {
  const pathname = usePathname()
  const [gun, setGun] = useState(null)
  const [mode, setMode] = useState(null) // null | 'ilk' | 'zorunlu'
  const [closing, setClosing] = useState(false)
  const [remaining, setRemaining] = useState(0)

  const wantIlkRef = useRef(false)
  const previewRef = useRef(null) // { mode, endAt }
  const endAtRef = useRef(0)
  const closeTimerRef = useRef(0)
  const skipRef = useRef(null)
  const dialogRef = useRef(null)
  const modeRef = useRef(null)
  modeRef.current = mode

  const dismissIlk = useCallback(() => {
    wantIlkRef.current = false
    const finish = () => { setMode(null); setClosing(false) }
    if (prefersReducedMotion()) return finish()
    setClosing(true)
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(finish, CLOSE_ANIMATION_MS)
  }, [])

  // Durumu her saniyenin dörtte birinde saatten hesaplar; sekme arka plandan dönse de doğru kalır.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const forcedGun = OZEL_GUNLER.find((x) => x.id === params.get('ozelgun'))
    const now = Date.now()

    if (forcedGun) {
      const g = forcedGun
      const zorunluOnizleme = params.get('zorunlu') === '1' && g.zorunlu
      const sn = zorunluOnizleme ? g.zorunlu.sureSn : g.ilkGirisSn
      previewRef.current = { mode: zorunluOnizleme ? 'zorunlu' : 'ilk', endAt: now + sn * 1000 }
      setGun(g)
    } else {
      const g = aktifOzelGun(now)
      if (g) {
        setGun(g)
        const key = gordumAnahtari(g, now)
        if (!readSeen(key)) {
          writeSeen(key)
          wantIlkRef.current = !zorunluBitis(g, now)
        }
      }
    }

    const evaluate = () => {
      const t = Date.now()
      const preview = previewRef.current
      if (preview) {
        if (t >= preview.endAt) { previewRef.current = null; setMode(null); return }
        if (modeRef.current !== preview.mode) { endAtRef.current = preview.endAt; setMode(preview.mode) }
        return
      }
      const g = aktifOzelGun(t)
      setGun(g || null)
      if (!g) { wantIlkRef.current = false; setMode(null); return }
      const zEnd = zorunluBitis(g, t)
      if (zEnd) {
        wantIlkRef.current = false
        if (modeRef.current !== 'zorunlu') { endAtRef.current = zEnd; setClosing(false); setMode('zorunlu') }
      } else if (modeRef.current === 'zorunlu') {
        setMode(null)
      } else if (wantIlkRef.current && modeRef.current !== 'ilk') {
        endAtRef.current = t + g.ilkGirisSn * 1000
        setMode('ilk')
      }
    }
    evaluate()
    const id = window.setInterval(evaluate, 250)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  // Ekran açıkken: kaydırma kilidi, odak, klavye, geri sayım ve ilk-giriş modunda otomatik kapanma.
  useEffect(() => {
    if (!mode) return undefined
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const previousFocus = document.activeElement
    root.style.overflow = 'hidden'
    ;(mode === 'ilk' ? skipRef.current : dialogRef.current)?.focus({ preventScroll: true })

    const updateRemaining = () => setRemaining(Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000)))
    updateRemaining()
    const tick = window.setInterval(updateRemaining, 250)
    const autoClose = mode === 'ilk'
      ? window.setTimeout(dismissIlk, Math.max(0, endAtRef.current - Date.now()))
      : 0

    const onKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        ;(mode === 'ilk' ? skipRef.current : dialogRef.current)?.focus({ preventScroll: true })
      } else if (event.key === 'Escape') {
        event.preventDefault()
        // Zorunlu mod yalnızca test önizlemesinde Escape ile kapanır.
        if (mode === 'ilk') dismissIlk()
        else if (previewRef.current) { previewRef.current = null; setMode(null) }
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
  }, [mode, dismissIlk])

  // Play Store yasal sayfalarında gösterilmez (WhatsApp düğmesi ve 29 Ekim ekranıyla aynı kural).
  if (pathname?.startsWith(LEGAL_BASE)) return null
  if (!gun) return null

  if (!mode) {
    if (!gun.yenidenAc) return null
    return (
      <button
        className="ozel-gun-bayrak"
        type="button"
        aria-label={`${gun.ad} kutlamasını yeniden aç`}
        onClick={() => { endAtRef.current = Date.now() + gun.ilkGirisSn * 1000; setClosing(false); setMode('ilk') }}
      >
        <span className="ozel-gun-bayrak__pole" aria-hidden="true" />
        <span className="ozel-gun-bayrak__cloth" aria-hidden="true">
          <span className="ozel-gun-bayrak__moon">☾</span>
          <span className="ozel-gun-bayrak__star">★</span>
        </span>
      </button>
    )
  }

  const zorunlu = mode === 'zorunlu'
  const toplamSn = zorunlu ? gun.zorunlu.sureSn : gun.ilkGirisSn
  const gecenSn = Math.max(0, toplamSn - (endAtRef.current - Date.now()) / 1000)

  return (
    <section className={`ozel-gun${closing ? ' is-closing' : ''}`} style={gun.zemin ? { background: gun.zemin } : undefined}>
      <div
        ref={dialogRef}
        className="ozel-gun__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={gun.ad}
        tabIndex={-1}
      >
        <picture className="ozel-gun__picture">
          <source media="(max-width: 720px), (orientation: portrait)" srcSet={gun.gorsel.mobil} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gun.gorsel.masaustu} alt={gun.gorsel.alt} />
        </picture>

        {!zorunlu && (
          <div className="ozel-gun__controls">
            <div className="ozel-gun__timer" aria-label="Otomatik kapanma süresi">
              <span>{remaining}</span>
              <span className="ozel-gun__sr-only">saniye</span>
            </div>
            <button ref={skipRef} className="ozel-gun__skip" type="button" onClick={dismissIlk}>
              Geç
            </button>
          </div>
        )}

        <div className="ozel-gun__progress" aria-hidden="true">
          <span style={{ animationDuration: `${toplamSn}s`, animationDelay: `-${gecenSn}s` }} />
        </div>
      </div>
    </section>
  )
}
