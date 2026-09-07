'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Direct browser loading avoids remote domain configuration for future URLs.
export default function ProjectGallery({ imageUrls = [], name, locale = 'tr', galleryStyle }) {
  const [active, setActive] = useState(null)
  const dialog = useRef(null)
  const trigger = useRef(null)
  const touch = useRef(null)
  const tr = locale === 'tr'
  const count = imageUrls.length
  const open = active !== null && count > 0
  useEffect(() => {
    if (!open) return
    const element = dialog.current
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = overflow; trigger.current?.focus() }
  }, [open])
  if (!count) return null
  const move = (step) => setActive((index) => (index + step + count) % count)
  const close = () => setActive(null)
  return <section className="mb-12" aria-label={tr ? 'Ekran görüntüleri' : 'Screenshots'}>
    <h2 className="mb-5 text-lg font-semibold">{tr ? 'Ekran Görüntüleri' : 'Screenshots'}</h2>
    <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
      {imageUrls.map((url, index) => <button type="button" key={`${url}-${index}`} onClick={(event) => { trigger.current = event.currentTarget; setActive(index) }} className={`relative aspect-[4/3] min-w-0 overflow-hidden rounded-lg border border-black/15 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${galleryStyle === 'led' ? 'project-gallery-led' : ''}`} aria-label={`${name} — ${tr ? 'Görseli aç' : 'Open screenshot'} ${index + 1}`}>
        <Image src={url} alt={`${name} — ${tr ? 'Ekran görüntüsü' : 'Screenshot'} ${index + 1}`} fill unoptimized loading="lazy" sizes="(max-width: 1023px) 50vw, 33vw" className="object-contain p-2" />
      </button>)}
    </div>
    <dialog ref={dialog} aria-label={`${name} — ${tr ? 'Görsel galerisi' : 'Image gallery'}`} onCancel={(event) => { event.preventDefault(); close() }} onClick={(event) => { if (event.target === event.currentTarget) close() }} onKeyDown={(event) => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) } if (event.key === 'ArrowRight') { event.preventDefault(); move(1) } }} className="project-lightbox fixed inset-0 m-auto h-[100dvh] max-h-none w-screen max-w-none bg-black/95 p-4 text-white md:p-8">
      {open && <div className="mx-auto flex h-full max-w-6xl flex-col gap-4">
        <div className="flex items-center justify-between gap-4"><p className="min-w-0 text-sm">{name} · {active + 1} / {count}</p><button autoFocus type="button" onClick={close} aria-label={tr ? 'Kapat' : 'Close'} className="rounded p-3 focus-visible:outline"><X /></button></div>
        <div className="relative min-h-0 flex-1" style={{ touchAction: 'pan-y pinch-zoom' }} onTouchStart={(event) => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY } }} onTouchEnd={(event) => { if (!touch.current) return; const point = event.changedTouches[0]; const dx = point.clientX - touch.current.x; const dy = point.clientY - touch.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); touch.current = null }}>
          <Image src={imageUrls[active]} alt={`${name} — ${tr ? 'Ekran görüntüsü' : 'Screenshot'} ${active + 1}`} fill unoptimized sizes="100vw" className="object-contain" />
        </div>
        <div className="flex items-center justify-center gap-6 pb-4"><button type="button" disabled={count < 2} onClick={() => move(-1)} aria-label={tr ? 'Önceki görsel' : 'Previous image'} className="rounded border border-white/30 p-3 disabled:opacity-30"><ChevronLeft /></button><span aria-live="polite">{active + 1} / {count}</span><button type="button" disabled={count < 2} onClick={() => move(1)} aria-label={tr ? 'Sonraki görsel' : 'Next image'} className="rounded border border-white/30 p-3 disabled:opacity-30"><ChevronRight /></button></div>
      </div>}
    </dialog>
  </section>
}
