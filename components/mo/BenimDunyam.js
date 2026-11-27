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

/** Güvercin emojisi (🕊️). Görseldir; ekran okuyucudan gizlenir. */
const DOVE = '🕊️'

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
            <span className="mo-world-dove" aria-hidden="true">{DOVE}</span>
          </h2>
          <p className="mo-world-slogan mo-world-step" style={{ '--s': 1 }}>{c.slogan}</p>
          <div className="mo-world-text mo-world-step" style={{ '--s': 2 }}>
            {c.text.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mo-world-act mo-world-step" style={{ '--s': 3 }}>
            <a className="mo-world-cta" href={YOLDAS} target="_blank" rel="noopener noreferrer">
              <span className="mo-world-cta-dove" aria-hidden="true">{DOVE}</span>
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
