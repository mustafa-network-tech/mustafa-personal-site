'use client'
// "Benim Dünyam": yoldas.mustafaoner.net için tanıtım bölümü.
// Yalnızca tanıtım ve bağlantı içerir; anılar/günlükler burada tutulmaz, iframe kullanılmaz.
import { useEffect } from 'react'
import Image from 'next/image'
import { useInView } from '@/components/mo/motion'
import { YOLDAS, YOLDAS_HOST, WORLD_ANCHOR } from '@/lib/mo/site'

const T = {
  tr: {
    title: 'Benim Dünyam',
    slogan: 'Biraz emek, biraz doğa, biraz yol, biraz türkü... Hepsi hayata dair.',
    text: [
      'İşin ve teknolojinin ötesinde başka bir dünyam var. Yolculuklarım, objektifime yansıyan güzellikler, türküler, anılar ve hayata dair küçük hikâyeler...',
      'Benim Dünyam, yaşamın içinde biriktirdiğim ve paylaşmak istediğim anların buluştuğu kişisel bir yaşam albümü.',
    ],
    cta: 'Benim Dünyama Yolculuk',
    newTab: '(yeni sekmede açılır)',
    alt: 'Kapadokya’da gün doğumunda peri bacalarının üzerinde süzülen sıcak hava balonları',
  },
  en: {
    title: 'My World',
    slogan: 'A little effort, a little nature, a little road, a little folk song... All of it about life.',
    text: [
      'Beyond work and technology, I have another world. My journeys, the beauty reflected in my lens, folk songs, memories and small stories about life...',
      'My World is a personal album of life, where the moments I have gathered along the way and want to share come together.',
    ],
    cta: 'Journey to My World',
    newTab: '(opens in a new tab)',
    alt: 'Hot air balloons drifting over the fairy chimneys of Cappadocia at sunrise',
  },
}

/** Çizgisel güvercin simgesi (currentColor). */
export function DoveIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path pathLength="1" d="M58 18 L53.4 16.6 C51.8 13.4 47.2 12.8 44.8 15.8 C42.6 18.6 41.8 21.8 38.2 24 C32 27.6 22.6 27.4 14.2 28.4 L4.5 26.4 L9.6 31.4 L5.2 36.4 C15.6 38.8 27.6 41.6 37.6 38.4 C46.8 35.4 51.6 27.6 52.2 20.4 Z" />
      <path pathLength="1" d="M41 23.4 C37.4 15.4 31 7.6 20.6 2.8 C20.4 6.4 21.2 9.4 22.6 12 C20.4 12 18.6 11.6 16.6 10.8 C18.4 16.8 22.4 22 28.6 26.6" />
      <path pathLength="1" d="M33.4 20.6 C31 16.8 28.4 13.6 25.4 11" />
      <circle cx="50.6" cy="16.8" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function BenimDunyam({ lang = 'tr' }) {
  const c = T[lang === 'en' ? 'en' : 'tr']
  const [ref, seen] = useInView({ rootMargin: '0px 0px -20% 0px', threshold: 0.01 })
  const titleId = `${WORLD_ANCHOR}-baslik`

  // Doğrudan /tr#benim-dunyam bağlantısıyla gelindiğinde: fontlar/görseller yerleşince
  // yukarıdaki içerik boyut değiştirebilir; kullanıcı kendisi kaydırmadıysa bölümü bir kez hizala.
  useEffect(() => {
    if (window.location.hash !== `#${WORLD_ANCHOR}`) return
    let cancelled = false
    const stop = () => { cancelled = true }
    const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    inputs.forEach((n) => window.addEventListener(n, stop, { passive: true }))
    const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }))
    // Tarayıcının (yumuşak) çapa kaydırması sürerken müdahale edilmez: konum ~250 ms sabit kalınca düzeltilir.
    let raf = 0
    const settle = (lastY = -1, still = 0, frames = 0) => {
      if (cancelled) return
      const y = window.scrollY
      const s = y === lastY ? still + 1 : 0
      if (s < 15 && frames < 300) { raf = requestAnimationFrame(() => settle(y, s, frames + 1)); return }
      const el = document.getElementById(WORLD_ANCHOR)
      const top = el ? el.getBoundingClientRect().top : 0
      if (Math.abs(top) > 4) window.scrollTo({ top: y + top, behavior: 'instant' })
    }
    Promise.all([loaded, document.fonts?.ready]).then(() => settle())
    return () => { cancelled = true; cancelAnimationFrame(raf); inputs.forEach((n) => window.removeEventListener(n, stop)) }
  }, [])

  return (
    <section id={WORLD_ANCHOR} ref={ref} className={`mo-world ${seen ? 'is-in' : ''}`} aria-labelledby={titleId}>
      <div className="mo-world-frame">
        <div className="mo-world-media">
          <Image src="/benim-dunyam.jpg" alt={c.alt} fill sizes="100vw" quality={78} loading="lazy" className="mo-world-img" />
        </div>
        <div className="mo-world-shade" aria-hidden="true" />
        <div className="mo-world-body">
          <h2 id={titleId} className="mo-world-title">
            <span className="mo-world-step mo-world-write" style={{ '--s': 0 }}>{c.title}</span>
            <DoveIcon className="mo-world-dove" />
          </h2>
          <p className="mo-world-slogan mo-world-step" style={{ '--s': 1 }}>{c.slogan}</p>
          <div className="mo-world-text mo-world-step" style={{ '--s': 2 }}>
            {c.text.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mo-world-act mo-world-step" style={{ '--s': 3 }}>
            <a className="mo-world-cta" href={YOLDAS} target="_blank" rel="noopener noreferrer">
              <DoveIcon className="mo-world-cta-dove" />
              <span>{c.cta}</span>
              <span className="mo-world-cta-a" aria-hidden="true">↗</span>
              <span className="mo-sr">{c.newTab}</span>
            </a>
            <span className="mo-world-host" aria-hidden="true">{YOLDAS_HOST}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
