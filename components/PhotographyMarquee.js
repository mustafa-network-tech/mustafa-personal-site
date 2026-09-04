'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { PHOTO_GALLERY } from '@/lib/photoGalleryData'

function PhotoModal({ photo, language, onClose, returnFocusRef }) {
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
  const alt = photo.alt[language] || photo.alt.tr
  return (
    <div className="fixed inset-0 z-[110] grid place-items-center bg-black/90 p-3 backdrop-blur-md md:p-8" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={alt} className="relative h-[85svh] w-full max-w-6xl overflow-hidden bg-[#0d0d0d]">
        <Image src={photo.src} alt={alt} fill sizes="100vw" className="object-contain" priority unoptimized />
        <button ref={closeRef} type="button" onClick={onClose} aria-label={language === 'tr' ? 'Fotoğrafı kapat' : 'Close photo'} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/65 text-white backdrop-blur transition hover:bg-white hover:text-black"><X className="h-5 w-5" /></button>
      </div>
    </div>
  )
}

export default function PhotographyMarquee() {
  const { language } = useLanguage()
  const [selected, setSelected] = useState(null)
  const triggerRef = useRef(null)
  const open = (photo, event) => { triggerRef.current = event.currentTarget; setSelected(photo) }
  return (
    <>
      <div className="photo-marquee-viewport -mx-4 overflow-hidden md:-mx-8">
        <div className="photo-marquee-track flex w-max gap-3 px-4 md:px-8">
          {[...PHOTO_GALLERY, ...PHOTO_GALLERY].map((photo, index) => (
            <button key={`${photo.id}-${index}`} type="button" onClick={(event) => open(photo, event)} className="photo-marquee-item group relative h-[48svh] w-[82vw] shrink-0 overflow-hidden bg-white/5 text-left md:h-[62vh] md:w-[42vw] lg:w-[32vw]" aria-label={`${photo.alt[language] || photo.alt.tr} — ${language === 'tr' ? 'büyük görüntüle' : 'view larger'}`}>
              <Image src={photo.src} alt={photo.alt[language] || photo.alt.tr} fill sizes="(max-width:768px) 82vw, 42vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" unoptimized />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-16 text-xs tracking-[.12em] text-white/80 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{language === 'tr' ? 'BÜYÜK GÖRÜNTÜLE' : 'VIEW LARGE'}</span>
            </button>
          ))}
        </div>
      </div>
      {selected && <PhotoModal photo={selected} language={language} onClose={() => setSelected(null)} returnFocusRef={triggerRef} />}
    </>
  )
}
