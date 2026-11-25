'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { REEL_PHOTOS, REEL_TIMING } from '@/lib/mo/reel'

const N = REEL_PHOTOS.length
const { unroll: U, hold: H } = REEL_TIMING
const P = U + H
const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t) // sinüs: ani hızlanma/yavaşlama yok
const mod = (a) => ((a % N) + N) % N

// Rulo: sağdan sarılı girer, sağdan sola açılır; ardından sola kayarak çıkarken sıradaki açılmaya başlar.
export default function PhotoReel({ lang = 'tr' }) {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const sheets = useRef([])
  const [still, setStill] = useState(0) // reduced-motion: gösterilen kare
  const [reduced, setReduced] = useState(false)
  const st = useRef({ t: 0, last: 0, inView: false, hover: false, touch: false, raf: 0, narrow: false })

  function paint(i, p, tx, exiting) {
    const el = sheets.current[i]
    if (!el) return
    const rwMax = st.current.narrow ? 7 : 8.5
    const rw = rwMax * (0.35 + 0.65 * p) // rulo sağdan ince başlar, ilerledikçe kalınlaşır
    const lead = (1 - p) * (100 - rw) // açılan kenarın konumu (%); rulo başlangıçta tamamen görünür
    const fade = p > 0.9 ? Math.max(0, (1 - p) / 0.1) : 1 // tam açılınca rulo yumuşakça kaybolur
    const cut = p >= 1 ? 0 : lead + rw * 0.5 * fade
    const curl = p >= 1 ? 0 : Math.min(1, (1 - p) * 3.2 + 0.25)
    el.style.visibility = 'visible'
    el.style.transform = `translate3d(${tx}%,0,0) rotateY(${exiting ? tx * -0.05 : (1 - p) * -5}deg)`
    el.style.setProperty('--cut', `${cut}%`)
    el.style.setProperty('--roll-l', `${lead}%`)
    el.style.setProperty('--roll-w', `${rw}%`)
    el.style.setProperty('--roll-o', fade.toFixed(3))
    el.style.setProperty('--roll-n', rw.toFixed(3))
    el.style.setProperty('--sig-o', fade.toFixed(3))
    el.style.setProperty('--curl', curl)
    // Işıltı: rulonun merkezi sahne ortasına yaklaşırken (yaklaşık %60 -> %40) imzanın üzerinden geçer.
    const g = Math.min(1, Math.max(0, (60 - (lead + rw / 2)) / 20))
    el.style.setProperty('--glint', g.toFixed(3))
    const glow = Math.pow(Math.sin(Math.PI * g), 0.7) * fade
    el.style.setProperty('--glint-o', glow.toFixed(3))
    // Çerçeve imzası: rulo harflerin hizasından geçerken j'den M'ye doğru sırayla hafif mavimsi parlar.
    if (!exiting) lightLetters(p >= 1 ? null : lead + rw / 2)
    el.style.zIndex = exiting ? 1 : 2
  }

  const chars = useRef([]) // { el, pos } pos: harf merkezi, sahne genişliğinin yüzdesi
  function measure() {
    const stage = stageRef.current
    if (!stage) return
    const r = stage.getBoundingClientRect()
    chars.current.forEach((c) => {
      if (!c.el) return
      const b = c.el.getBoundingClientRect()
      c.pos = ((b.left + b.width / 2 - r.left) / r.width) * 100
    })
  }
  function lightLetters(c) {
    chars.current.forEach((ch) => {
      if (!ch.el) return
      let lit = 0
      if (c != null && ch.pos != null) {
        const d = c - ch.pos // d >= 0: rulo harfi geçti ya da üzerinde
        lit = d >= 0 ? Math.max(0, 1 - d / 3) : Math.max(0, 1 + d / 10)
        lit = lit * lit * (3 - 2 * lit) // yumuşak geçiş
      }
      ch.el.style.setProperty('--lit', lit.toFixed(3))
    })
  }

  function render() {
    const s = st.current
    const k = Math.floor(s.t / P)
    const phase = s.t - k * P
    const cur = mod(k)
    const u = Math.min(1, phase / U)
    const p = ease(u)
    const want = new Map()
    want.set(cur, [p, 0, false])
    // Çıkan fotoğraf, açılan kenarla birlikte aynı hızla sola kayar (kesintisiz şerit).
    if (k > 0 && phase < U) want.set(mod(k - 1), [1, -p * 100, true])
    for (let i = 0; i < N; i++) {
      const w = want.get(i)
      if (w) paint(i, w[0], w[1], w[2])
      else if (sheets.current[i]) sheets.current[i].style.visibility = 'hidden'
    }
  }

  useEffect(() => {
    const s = st.current
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const nar = window.matchMedia('(max-width: 640px)')
    const upd = () => {
      s.narrow = nar.matches
      setReduced(mq.matches)
      if (!mq.matches) render()
    }
    upd()
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    mq.addEventListener('change', upd)
    nar.addEventListener('change', upd)
    const io = new IntersectionObserver(([e]) => { s.inView = e.isIntersecting }, { threshold: 0.3 })
    io.observe(rootRef.current)
    const tick = (now) => {
      s.raf = requestAnimationFrame(tick)
      const dt = Math.min(64, now - (s.last || now))
      s.last = now
      if (mq.matches || !s.inView || s.hover || s.touch || document.hidden) return
      s.t += dt
      render()
    }
    s.raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(s.raf)
      io.disconnect()
      mq.removeEventListener('change', upd)
      nar.removeEventListener('change', upd)
      window.removeEventListener('resize', measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dokunmatik: yatay kaydırma ile sonraki/önceki kareye geç. Klavye: yön tuşları.
  const swipe = useRef(null)
  function go(dir) {
    const s = st.current
    if (reduced) { setStill((v) => mod(v + dir)); return }
    s.t = Math.max(0, Math.floor(s.t / P) + dir) * P
    render()
  }
  const onTouchStart = (e) => { st.current.touch = true; swipe.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e) => {
    const a = swipe.current
    st.current.touch = false
    swipe.current = null
    if (!a) return
    const dx = e.changedTouches[0].clientX - a.x
    const dy = e.changedTouches[0].clientY - a.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1)
    else if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <div
      ref={rootRef}
      className="reel"
      role="group"
      aria-roledescription="gallery"
      aria-label={lang === 'en' ? 'Photographs by Mustafa' : 'Mustafa’nın fotoğrafları'}
      tabIndex={0}
      data-reduced={reduced ? 'true' : undefined}
      onMouseEnter={() => { st.current.hover = true }}
      onMouseLeave={() => { st.current.hover = false }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => { st.current.touch = false }}
      onKeyDown={onKey}
    >
      <div className="reel-frame">
        <div className="reel-wood" aria-hidden="true">
          <span className="w-t" /><span className="w-b" /><span className="w-l" /><span className="w-r" />
          <span className="w-edge w-edge-t" /><span className="w-edge w-edge-b" /><span className="w-edge w-edge-l" /><span className="w-edge w-edge-r" />
          <span className="w-lip" />
          <span className="w-corner c-tl" /><span className="w-corner c-tr" /><span className="w-corner c-bl" /><span className="w-corner c-br" />
          <span className="w-sig">
            <span className="sig-text">{[...'Mavi Kadraj'].map((ch, i) => <span key={i} className="ch" ref={(el) => { chars.current[i] = { ...(chars.current[i] || {}), el } }}>{ch}</span>)}</span>
          </span>
        </div>
      <div className="reel-stage" ref={stageRef}>
        {REEL_PHOTOS.map((ph, i) => (
          <div
            key={ph.src}
            ref={(el) => { sheets.current[i] = el }}
            className="reel-sheet"
            style={reduced ? { visibility: i === still ? 'visible' : 'hidden' } : i === 0 ? undefined : { visibility: 'hidden' }}
          >
            <div className="reel-photo">
              <Image src={ph.src} alt={ph.alt[lang]} fill sizes="(min-width:1200px) 1100px, 96vw" loading="eager" style={{ objectFit: 'cover', objectPosition: ph.pos }} draggable={false} />
              <span className="reel-curl" aria-hidden="true" />
            </div>
            <span className="reel-roll" aria-hidden="true"><span className="reel-sig">Mavi Kadraj</span><span className="reel-sig reel-glint" aria-hidden="true">Mavi Kadraj</span></span>
          </div>
        ))}
      </div>
      </div>
      <div className="reel-floor" aria-hidden="true" />
    </div>
  )
}
