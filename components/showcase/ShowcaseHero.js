'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const TYPING_SPEED = 70
const DELETE_SPEED = 45
const PAUSE_AFTER_TITLE_MS = 2500

export default function ShowcaseHero() {
  const { t, language } = useLanguage()
  const items = t.showcase_hero_items || []
  const [itemIndex, setItemIndex] = useState(0)
  const [displayTitle, setDisplayTitle] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setDisplayTitle('')
    setItemIndex(0)
    setIsDeleting(false)
  }, [language])

  useEffect(() => {
    if (!items.length) return
    const current = items[itemIndex]
    const title = current?.title ?? ''
    const speed = isDeleting ? DELETE_SPEED : TYPING_SPEED

    if (!isDeleting && displayTitle === title) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TITLE_MS)
      return () => clearTimeout(pause)
    }
    if (isDeleting && displayTitle === '') {
      setIsDeleting(false)
      setItemIndex((i) => (i + 1) % items.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setDisplayTitle((prev) =>
          isDeleting ? title.slice(0, prev.length - 1) : title.slice(0, prev.length + 1)
        )
      },
      speed
    )
    return () => clearTimeout(timeout)
  }, [items, itemIndex, displayTitle, isDeleting])

  const currentItem = items[itemIndex]
  const titleComplete = currentItem && displayTitle === (currentItem.title ?? '')

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-[#F8FAFC] mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
          {t.showcase_hero_title}
        </h1>

        <div className="min-h-[3.5rem] flex flex-col items-center justify-center mb-4" aria-live="polite">
          <h2 className="text-xl md:text-2xl font-semibold leading-tight text-center mb-2 break-words max-w-full" style={{ letterSpacing: '-0.02em' }}>
            <span
              className="text-[#F8FAFC]"
              style={{
                background: titleComplete ? 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 50%, #94A3B8 100%)' : undefined,
                WebkitBackgroundClip: titleComplete ? 'text' : undefined,
                WebkitTextFillColor: titleComplete ? 'transparent' : undefined,
                textShadow: titleComplete ? '0 0 30px rgba(148,163,184,0.1)' : undefined,
              }}
            >
              {displayTitle}
            </span>
            <span className="showcase-typewriter-cursor text-[#94A3B8]" aria-hidden>|</span>
          </h2>
          {currentItem?.description && (
            <p className="text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              {currentItem.description}
            </p>
          )}
        </div>

        <a
          href="https://wa.me/905456597551"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#1a9e4a] hover:bg-[#178b42] transition-colors"
        >
          {t.showcase_hero_cta_whatsapp}
        </a>
      </div>
    </section>
  )
}
