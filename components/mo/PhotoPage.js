'use client'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SplitWords, Reveal } from '@/components/mo/motion'
import { PHOTOS, PHOTO_CATEGORIES } from '@/lib/mo/photos'
import { INSTAGRAM } from '@/lib/mo/site'

const T = {
  tr: { kicker: 'Fotoğraf, Gezi ve Doğa', title: 'Mustafa’nın Kadrajından', lead: 'Sakladığım anlar — bir his, bir mekân, bir an.', all: 'Tümü', close: 'Kapat', prev: 'Önceki fotoğraf', next: 'Sonraki fotoğraf', site: 'Fotoğrafçılık web sitemiz — mavikadraj.com.tr', insta: 'Instagram’da takip et', view: 'Büyük görüntüle', of: '/' },
  en: { kicker: 'Photography, Travel & Nature', title: 'Through Mustafa’s Lens', lead: 'Moments I keep — a feeling, a place, an instant.', all: 'All', close: 'Close', prev: 'Previous photo', next: 'Next photo', site: 'Our photography website — mavikadraj.com.tr', insta: 'Follow on Instagram', view: 'View large', of: '/' },
}

function Photo({ p, lang, onOpen, index }) {
  const cap = p.caption?.[lang]
  const inner = p.remote
    ? <img src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} loading="lazy" decoding="async" />
    : <Image src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} sizes="(min-width:1100px) 33vw, (min-width:560px) 50vw, 100vw" loading={index < 3 ? 'eager' : 'lazy'} />
  return (
    <button type="button" className="mo-ph" onClick={(e) => onOpen(p, e.currentTarget)} aria-label={`${cap || p.alt[lang]} — ${T[lang].view}`}>
      {inner}
      {cap && <span>{cap}</span>}
    </button>
  )
}

export function Lightbox({ list, index, lang, onClose, onIndex }) {
  const t = T[lang]
  const p = list[index]
  const closeRef = useRef(null)
  const start = useRef(null)
  const go = useCallback((d) => onIndex((index + d + list.length) % list.length), [index, list.length, onIndex])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.body.style.overflow = prevOverflow }
  }, [])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, onClose])
  // Komşuları önceden yükle
  useEffect(() => {
    ;[1, -1].forEach((d) => { const n = list[(index + d + list.length) % list.length]; const im = new window.Image(); im.src = n.remote ? n.src : `/_next/image?url=${encodeURIComponent(n.src)}&w=1920&q=80` })
  }, [index, list])

  const src = p.remote ? p.src : `/_next/image?url=${encodeURIComponent(p.src)}&w=1920&q=80`
  const onPointerDown = (e) => { start.current = { x: e.clientX, y: e.clientY } }
  const onPointerUp = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x, dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  }

  return (
    <div className="mo-lb" role="dialog" aria-modal="true" aria-label={p.caption?.[lang] || p.alt[lang]}>
      <div className="mo-lb-bar"><span>{index + 1} {t.of} {list.length}</span><button ref={closeRef} type="button" onClick={onClose} aria-label={t.close}>✕</button></div>
      <div className="mo-lb-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" className="mo-lb-nav mo-lb-prev" onClick={() => go(-1)} aria-label={t.prev}>←</button>
        <img key={src} src={src} alt={p.alt[lang]} width={p.w} height={p.h} draggable="false" style={{ animation: 'mo-fade .5s var(--ease-out) both' }} />
        <button type="button" className="mo-lb-nav mo-lb-next" onClick={() => go(1)} aria-label={t.next}>→</button>
      </div>
      <p className="mo-lb-cap">{p.caption?.[lang] || ''}</p>
    </div>
  )
}

export default function PhotoPage({ lang = 'tr' }) {
  const t = T[lang]
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState(null) // list index
  const trigger = useRef(null)
  const cats = useMemo(() => PHOTO_CATEGORIES.filter((c) => PHOTOS.some((p) => p.category === c.id)), [])
  const list = useMemo(() => (cat === 'all' ? PHOTOS : PHOTOS.filter((p) => p.category === cat)), [cat])

  const onOpen = (p, el) => { trigger.current = el; setOpen(list.indexOf(p)) }
  const onClose = useCallback(() => { setOpen(null); trigger.current?.focus?.() }, [])

  return (
    <div className="mo">
      <section className="mo-head"><div className="mo-wrap">
        <span className="mo-kicker mo-rise">{t.kicker}</span>
        <SplitWords hero as="h1" text={t.title} className="mo-h1" />
        <p className="mo-lead mo-rise" style={{ '--d': '500ms' }}>{t.lead}</p>
      </div></section>
      <section className="mo-sec" style={{ paddingTop: 'clamp(2.5rem,6vw,5rem)' }}><div className="mo-wrap">
        <div className="mo-chips" role="group" aria-label={lang === 'tr' ? 'Kategoriler' : 'Categories'}>
          {[{ id: 'all', tr: t.all, en: t.all }, ...cats].map((c) => (
            <button key={c.id} type="button" className="mo-chip" aria-pressed={cat === c.id} onClick={() => { setCat(c.id) }}>{c[lang]}</button>
          ))}
        </div>
        <div className="mo-masonry" key={cat}>
          {list.map((p, i) => <Photo key={p.id} p={p} lang={lang} index={i} onOpen={onOpen} />)}
        </div>
        <Reveal className="mt-14"><a className="mo-link" href="https://www.mavikadraj.com.tr" target="_blank" rel="noopener noreferrer">{t.site} <span aria-hidden="true">↗</span></a></Reveal>
        <Reveal className="mt-8"><a className="mo-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">{t.insta} — @mavi_kadraj14 <span aria-hidden="true">↗</span></a></Reveal>
      </div></section>
      {open !== null && list[open] && <Lightbox list={list} index={open} lang={lang} onClose={onClose} onIndex={setOpen} />}
    </div>
  )
}
