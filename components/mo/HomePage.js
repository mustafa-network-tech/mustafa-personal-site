'use client'
import Image from 'next/image'
import { MoLink, Reveal, SplitWords, SplitLetters, ScrollWords, ImageReveal, Parallax } from '@/components/mo/motion'
import { pageHref } from '@/lib/mo/site'
import { HOME_PHOTOS, PHOTOS } from '@/lib/mo/photos'
import { BOOK } from '@/content/book'
import { EXPLORE_IMAGES } from '@/lib/mo/explore'

// Yalnızca projede mevcut metinler.
const T = {
  tr: {
    badgesLabel: 'Öne çıkanlar',
    badges: [['fiber', 'Fiber Optik Sistemleri', 'experience'], ['photo', 'Doğa Fotoğrafçılığı', 'photo'], ['code', 'Web & Yazılım', 'about']],
    statement: 'Hayat, tek bir hikâyeden ibaret değil. Teknolojinin hızında üretiyor, doğanın sessizliğinde kendimi dinliyorum. Her yolculukta öğreniyor, her karede hayatın başka bir yüzünü keşfediyorum.',
    explore: 'Hayatımın Farklı Yönleri',
    rows: [
      ['about', 'Hakkımda', 'Hayatım, düşüncelerim ve kendi yolculuğum.', 'about'],
      ['experience', 'Mesleki Deneyim', 'Fiber optik altyapı ve telekomünikasyon dünyasındaki deneyimlerim.', 'experience'],
      ['photo', 'Fotoğraf, Gezi ve Doğa', 'Objektifime yansıyan anlar, yollar ve keşifler.', 'photo'],
      ['projects', 'Projelerim', 'Merakla başlayan, emekle şekillenen dijital çalışmalarım.', 'projects'],
      ['book', 'Yoldaşın Mücadelesi', 'Hayata, insana ve mücadeleye dair bir kitap.', 'book'],
    ],
    photoTitle: 'Mustafa’nın Kadrajından', photoLead: 'Sakladığım anlar — bir his, bir mekân, bir an.', photoCta: 'Tüm fotoğraflar',
    quote: 'Büyük iş doğru sorularla başlar. Doğru soruları da teknik derinlik ve gerçek dünya deneyimi şekillendirir.',
    bookKicker: 'Kitap', bookCta: 'Kitabı keşfet', contact: 'İletişim', contactCta: 'Bir mesaj gönder',
  },
  en: {
    badgesLabel: 'Highlights',
    badges: [['fiber', 'Fiber Optic Systems', 'experience'], ['photo', 'Nature Photography', 'photo'], ['code', 'Web & Software', 'about']],
    statement: 'Life is not just a single story. I create at the speed of technology and listen to myself in the silence of nature. I learn on every journey, and in every frame I discover another face of life.',
    explore: 'Different Sides of My Life',
    rows: [
      ['about', 'About', 'My life, my thoughts and my own journey.', 'about'],
      ['experience', 'Professional Experience', 'My experience in the world of fiber optic infrastructure and telecommunications.', 'experience'],
      ['photo', 'Photography, Travel & Nature', 'Moments, roads and discoveries reflected in my lens.', 'photo'],
      ['projects', 'My Projects', 'Digital work that begins with curiosity and is shaped by effort.', 'projects'],
      ['book', 'Yoldaşın Mücadelesi', 'A book about life, people and struggle.', 'book'],
    ],
    photoTitle: 'Through Mustafa’s Lens', photoLead: 'Moments I keep — a feeling, a place, an instant.', photoCta: 'All photographs',
    quote: 'Great work starts with the right questions. And the right questions are shaped by technical depth and real-world experience.',
    bookKicker: 'Book', bookCta: 'Discover the book', contact: 'Contact', contactCta: 'Send a message',
  },
}

// Minimal çizgisel ikonlar (currentColor)
function BadgeIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false }
  if (name === 'fiber') return <svg {...common}><path d="M3 7c5 0 6 5 11 5M3 12h11M3 17c5 0 6-5 11-5" /><circle cx="18" cy="12" r="3" /></svg>
  if (name === 'photo') return <svg {...common}><rect x="3" y="7" width="18" height="12" rx="3" /><circle cx="12" cy="13" r="3.2" /><path d="M9 7l1.2-2h3.6L15 7" /></svg>
  return <svg {...common}><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" /></svg>
}

export default function HomePage({ lang = 'tr' }) {
  const c = T[lang]
  const [p1, p2, p3] = HOME_PHOTOS
  const aboutPhoto = PHOTOS.find((p) => p.src.includes('nature4')) || p2
  const IMG = {}
  for (const k of Object.keys(EXPLORE_IMAGES)) IMG[k] = EXPLORE_IMAGES[k].src
  IMG.about = IMG.about || (aboutPhoto && aboutPhoto.src)
  IMG.photo = IMG.photo || (p1 && p1.src)
  return (
    <div className="mo">
      <section className="mo-hero" aria-label="Mustafa Öner">
        <div className="mo-hero-frame">
          <Image src="/images/hero.JPG" alt={lang === 'tr' ? 'Mustafa Öner, Gölcük kıyısında ağaç gövdesi üzerinde oturuyor' : 'Mustafa Öner sitting on a tree trunk by a forest lake'} fill priority sizes="100vw" quality={85} className="mo-hero-img" />
          <div className="mo-hero-fog" aria-hidden="true"><i /><i /><i /></div>
          <div className="mo-hero-body">
            <h1 className="mo-hero-sig" aria-label="Mustafa Öner">
              <span className="mo-sig-wrap mo-hero-sig-in">
              <span className="mo-sig" aria-hidden="true">Mustafa Öner</span>
              <svg className="mo-sig-line" viewBox="0 0 600 44" aria-hidden="true" focusable="false">
                <path pathLength="1" strokeWidth="3.4" d="M10 27 C 70 17, 150 33, 245 23 S 430 12, 590 24" />
                <path pathLength="1" strokeWidth="1.8" d="M40 31 C 130 25, 250 36, 360 28 S 500 22, 566 28" />
              </svg>
              </span>
            </h1>
          </div>
          <nav className="mo-badges" aria-label={c.badgesLabel}>
            {c.badges.map(([icon, label, page], i) => (
              <MoLink key={icon} href={pageHref(page, lang)} className="mo-badge" style={{ '--i': i }}>
                <BadgeIcon name={icon} />
                <span>{label}</span>
              </MoLink>
            ))}
          </nav>
        </div>
      </section>

      <section className="mo-sec"><div className="mo-wrap">
        <ScrollWords className="mo-statement" text={c.statement} />
      </div></section>

      <section className="mo-xplore"><div className="mo-wrap">
        <Reveal><h2 className="mo-xplore-h">{c.explore}</h2></Reveal>
        <nav className="mo-xlist" aria-label={c.explore}>
          {c.rows.map(([key, title, desc, img], i) => {
            const inner = (
              <>
                <span className="mo-xt">{title}</span>
                <span className="mo-xthumb" aria-hidden="true" style={EXPLORE_IMAGES[img]?.bg ? { background: EXPLORE_IMAGES[img].bg } : undefined} data-fit={EXPLORE_IMAGES[img]?.fit} data-portrait={EXPLORE_IMAGES[img]?.portrait ? "true" : undefined}>
                  {IMG[img] && <Image src={IMG[img]} alt="" fill sizes="16rem" loading="lazy" style={EXPLORE_IMAGES[img]?.pos ? { objectPosition: EXPLORE_IMAGES[img].pos } : undefined} />}
                </span>
                <span className="mo-xd">{desc}</span>
                <span className="mo-xa" aria-hidden="true">↗</span>
              </>
            )
            return (
              <Reveal key={key} delay={i * 80}>
                <MoLink href={pageHref(key, lang)} className="mo-xrow">{inner}</MoLink>
              </Reveal>
            )
          })}
        </nav>
      </div></section>

      <section className="mo-sec mo-dark"><div className="mo-wrap">
        <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-2 md:items-end">
          <SplitWords text={c.photoTitle} className="mo-h2" />
          <Reveal><p className="mo-body">{c.photoLead}</p></Reveal>
        </div>
        <div className="mo-strip">
          {[p1, p2, p3].map((p, i) => p && (
            <ImageReveal key={p.src} delay={i * 120} className={['a', 'b', 'c'][i]}>
              <Parallax className="h-full" amount={6}>
                <div className="mo-fill"><Image src={p.src} alt={p.alt[lang]} fill sizes="(min-width:900px) 40vw, 100vw" loading="lazy" /></div>
              </Parallax>
            </ImageReveal>
          ))}
        </div>
        <Reveal className="mt-12"><MoLink href={pageHref('photo', lang)} className="mo-link">{c.photoCta} <span aria-hidden="true">→</span></MoLink></Reveal>
      </div></section>

      <section className="mo-sec"><div className="mo-wrap">
        <ScrollWords className="mo-quote" text={`“${c.quote}”`} />
      </div></section>

      <section className="mo-sec mo-book-teaser"><div className="mo-wrap mo-book-grid">
        <Reveal><span className="mo-kicker">{c.bookKicker}</span></Reveal>
        <MoLink href={pageHref('book', lang)} className="mo-book-link" aria-label={BOOK.title}>
          <ImageReveal className="mo-book-cover">
            <Image src={BOOK.cover} alt={BOOK.title} width={BOOK.coverSize.w} height={BOOK.coverSize.h} sizes="(min-width:900px) 70vh, 92vw" style={{ width: 'auto', height: '100%' }} loading="lazy" />
          </ImageReveal>
        </MoLink>
        <Reveal><MoLink href={pageHref('book', lang)} className="mo-link mo-link-s">{c.bookCta} <span aria-hidden="true">→</span></MoLink></Reveal>
      </div></section>

      <section className="mo-sec"><div className="mo-wrap">
        <Reveal><span className="mo-kicker mb-8">{c.contact}</span></Reveal>
        <MoLink href={pageHref('contact', lang)} className="mo-h2 mo-contact-mail" style={{ display: 'inline-block' }}>{c.contactCta} →</MoLink>
      </div></section>
    </div>
  )
}
