'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { customerTestimonials } from '@/lib/testimonialsData'

function initials(name) {
  return name.replace(/\./g, '').split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toLocaleUpperCase('tr-TR')
}

function TestimonialCard({ item, language, onRead }) {
  const review = item.review[language] || item.review.tr
  const service = item.service[language] || item.service.tr
  const isLong = review.length > 190
  return (
    <article className="testimonial-card flex h-[280px] flex-col rounded-2xl border border-black/10 bg-white p-6 md:p-7">
      <div className="flex items-center gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#151515] text-xs font-semibold tracking-[.08em] text-white" aria-hidden="true">{initials(item.name)}</div>
        <div className="min-w-0"><h3 className="font-semibold text-[#151515]">{item.name}</h3><p className="mt-1 text-xs leading-snug text-black/50">{service}</p></div>
      </div>
      {item.rating != null && <p className="mt-6 text-sm tracking-[.14em]" aria-label={`${item.rating} / 5`}>{'★'.repeat(item.rating)}</p>}
      <p className={`mt-6 text-sm leading-6 text-black/70 ${isLong ? 'line-clamp-4' : ''}`}>“{review}”</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div className="text-[10px] font-semibold uppercase tracking-[.14em] text-black/35">
          {item.source === 'Armut' && (language === 'tr' ? 'Armut müşteri yorumu' : 'Customer review on Armut')}
          {!item.source && item.location && (item.location[language] || item.location.tr)}
        </div>
        {isLong && <button type="button" onClick={onRead} className="shrink-0 border-b border-black/35 pb-1 text-xs font-semibold text-[#151515] transition hover:border-black">{language === 'tr' ? 'Devamını oku' : 'Read more'}</button>}
      </div>
    </article>
  )
}

function TestimonialDialog({ item, language, onClose, returnFocusRef }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const returnFocusElement = returnFocusRef.current
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      returnFocusElement?.focus()
    }
  }, [onClose, returnFocusRef])
  const review = item.review[language] || item.review.tr
  const service = item.service[language] || item.service.tr
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="testimonial-dialog-title" className="relative max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#f1efe9] p-7 text-[#151515] shadow-2xl md:p-10">
        <button ref={closeRef} type="button" onClick={onClose} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-black/15 transition hover:bg-black hover:text-white" aria-label={language === 'tr' ? 'Yorumu kapat' : 'Close review'}><X className="h-4 w-4" /></button>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#151515] text-xs font-semibold tracking-[.08em] text-white" aria-hidden="true">{initials(item.name)}</div>
        <h2 id="testimonial-dialog-title" className="studio-display mt-7 pr-14 text-4xl">{item.name}</h2>
        <p className="mt-2 text-sm text-black/50">{service}</p>
        <p className="mt-8 text-lg leading-8 text-black/75">“{review}”</p>
        {(item.source || item.location) && <p className="mt-8 border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-[.14em] text-black/40">{item.source === 'Armut' ? (language === 'tr' ? 'Armut müşteri yorumu' : 'Customer review on Armut') : (item.location?.[language] || item.location?.tr)}</p>}
      </div>
    </div>
  )
}

export default function ClientFeedback() {
  const { language } = useLanguage()
  const trackRef = useRef(null)
  const triggerRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const move = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.testimonial-card')
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || track.clientWidth) + 16), behavior: 'smooth' })
  }
  const openReview = (item, event) => { triggerRef.current = event.currentTarget; setSelected(item) }
  return (
    <section id="client-feedback" className="overflow-hidden bg-[#f1efe9] py-20 text-[#151515] md:py-28" aria-labelledby="client-feedback-heading">
      <div className="studio-shell">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="studio-kicker text-black/45">{language === 'tr' ? 'GERÇEK İŞ BİRLİKLERİ' : 'REAL COLLABORATIONS'}</p>
            <h2 id="client-feedback-heading" className="studio-display mt-5 text-5xl tracking-[-.055em] md:text-7xl">{language === 'tr' ? 'Müşteri Deneyimleri' : 'Client Experiences'}</h2>
            <p className="mt-5 max-w-xl text-lg text-black/55">{language === 'tr' ? 'Birlikte çalıştığımız müşterilerin gerçek deneyimleri.' : 'Real experiences from clients we have worked with.'}</p>
          </div>
          <div className="flex gap-2 md:col-span-4 md:justify-end">
            <button type="button" onClick={() => move(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-black/20 transition hover:bg-[#151515] hover:text-white" aria-label={language === 'tr' ? 'Önceki yorumlar' : 'Previous reviews'}><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => move(1)} className="grid h-12 w-12 place-items-center rounded-full border border-black/20 transition hover:bg-[#151515] hover:text-white" aria-label={language === 'tr' ? 'Sonraki yorumlar' : 'Next reviews'}><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div ref={trackRef} className="testimonial-viewport mt-12 overflow-x-auto pb-4 md:mt-16">
          <div className="testimonial-track flex w-max gap-4">
            {[...customerTestimonials, ...customerTestimonials].map((item, index) => <div key={`${item.id}-${index}`} className="testimonial-slide shrink-0 snap-start"><TestimonialCard item={item} language={language} onRead={(event) => openReview(item, event)} /></div>)}
          </div>
        </div>
      </div>
      {selected && <TestimonialDialog item={selected} language={language} onClose={() => setSelected(null)} returnFocusRef={triggerRef} />}
    </section>
  )
}
