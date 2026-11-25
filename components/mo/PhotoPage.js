'use client'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Reveal } from '@/components/mo/motion'
import { Head } from '@/components/mo/SubPages'
import { PAGE_PHOTOS as PHOTOS, PHOTO_CATEGORIES } from '@/lib/mo/photos'
import { INSTAGRAM, MAVI_KADRAJ, INSTAGRAM_HANDLE } from '@/lib/mo/site'

const T = {
  tr: { kicker: 'Mustafa’nın Kadrajından', title: 'Mustafa’nın Kadrajından', lead: 'Her yolculuk bir hikâye, her fotoğraf hayattan sakladığım bir an.', all: 'Tümü', close: 'Kapat', prev: 'Önceki fotoğraf', next: 'Sonraki fotoğraf', more: 'Bütün fotoğraflarım için', site: 'Mavi Kadraj web sitesi', insta: 'Instagram’da takip et', view: 'Büyük görüntüle', of: '/' },
  en: { kicker: 'Through Mustafa’s Lens', title: 'Through Mustafa’s Lens', lead: 'Every journey is a story, every photograph a moment I have kept from life.', all: 'All', close: 'Close', prev: 'Previous photo', next: 'Next photo', more: 'For all my photographs', site: 'Mavi Kadraj website', insta: 'Follow on Instagram', view: 'View large', of: '/' },
}

function Photo({ p, lang, onOpen, index }) {
  const cap = p.caption?.[lang]
  const inner = p.remote
    ? <img src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} loading="lazy" decoding="async" />
    : <Image src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} sizes="(min-width:1100px) 33vw, (min-width:560px) 50vw, 100vw" loading={index < 3 ? 'eager' : 'lazy'} />
  return (
    <button type="button" className="mo-ph" style={{ '--i': index % 12 }} onClick={(e) => onOpen(p, e.currentTarget)} aria-label={`${cap || p.alt[lang]} — ${T[lang].view}`}>
      {inner}
      {cap && <span>{cap}</span>}
    </button>
  )
}

export function Lightbox({ list, index, lang, onClose, onIndex, exhibit = false }) {
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
    <div className={exhibit ? 'mo-lb mo-lb-ex' : 'mo-lb'} role="dialog" aria-modal="true" aria-label={p.caption?.[lang] || p.alt[lang]}>
      <div className="mo-lb-bar"><span>{index + 1} {t.of} {list.length}</span><button ref={closeRef} type="button" onClick={onClose} aria-label={t.close}>✕</button></div>
      {exhibit && <div className="mo-lb-back" aria-hidden="true" style={{ backgroundImage: `url(${src})` }} />}
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
  const [leaving, setLeaving] = useState(false)
  const [open, setOpen] = useState(null) // list index
  const trigger = useRef(null)
  const cats = useMemo(() => PHOTO_CATEGORIES.filter((c) => PHOTOS.some((p) => p.category === c.id)), [])
  const list = useMemo(() => (cat === 'all' ? PHOTOS : PHOTOS.filter((p) => p.category === cat)), [cat])

  const onOpen = (p, el) => { trigger.current = el; setOpen(list.indexOf(p)) }
  const onClose = useCallback(() => { setOpen(null); trigger.current?.focus?.() }, [])

  return (
    <div className="mo">
      <Head kicker={t.kicker} title={t.title} lead={t.lead} bg="/photos/nature/nature6.jpg" bgPos="50% 55%" fog />
      <section className="mo-sec" style={{ paddingTop: 'clamp(2.5rem,6vw,5rem)' }}><div className="mo-wrap">
        <div className="mo-chips" role="group" aria-label={lang === 'tr' ? 'Kategoriler' : 'Categories'}>
          {[{ id: 'all', tr: t.all, en: t.all }, ...cats].map((c) => (
            <button key={c.id} type="button" className="mo-chip" aria-pressed={cat === c.id} onClick={() => { if (c.id === cat || leaving) return; setLeaving(true); setTimeout(() => { setCat(c.id); setLeaving(false) }, 320) }}>{c[lang]}</button>
          ))}
        </div>
        <div className={`mo-masonry${leaving ? ' is-leaving' : ''}`} key={cat}>
          {list.map((p, i) => <Photo key={p.id} p={p} lang={lang} index={i} onOpen={onOpen} />)}
        </div>
        <Reveal className="mo-allph">
          <p className="mo-allph-t">{t.more}</p>
          <div className="mo-allph-l">
            <a className="mo-chip" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">{t.insta} · {INSTAGRAM_HANDLE} <span aria-hidden="true">↗</span></a>
            <a className="mo-chip" href={MAVI_KADRAJ} target="_blank" rel="noopener noreferrer">{t.site} <span aria-hidden="true">↗</span></a>
          </div>
        </Reveal>
      </div></section>
      {open !== null && list[open] && <Lightbox exhibit list={list} index={open} lang={lang} onClose={onClose} onIndex={setOpen} />}
    </div>
  )
}
