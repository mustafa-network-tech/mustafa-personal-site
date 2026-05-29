'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getHeroBackground, getHeroTypewriterLines } from '@/lib/localSeo/heroVisuals'

const TYPING_SPEED = 65
const DELETE_SPEED = 42
const PAUSE_MS = 2200

/**
 * @param {{ slug: string, hero: { eyebrow: string, title: string, description: string, ctaLabel: string } }} props
 */
export default function LocalSeoHero({ slug, hero }) {
  const bgImage = getHeroBackground(slug)
  const typewriterLines = getHeroTypewriterLines(slug)
  const useTypewriter = Boolean(typewriterLines?.length)

  const [lineIndex, setLineIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!useTypewriter || reducedMotion) return
    const lines = typewriterLines
    const currentLine = lines[lineIndex] ?? ''
    const speed = isDeleting ? DELETE_SPEED : TYPING_SPEED

    if (!isDeleting && displayText === currentLine) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_MS)
      return () => clearTimeout(pause)
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setLineIndex((i) => (i + 1) % lines.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? currentLine.slice(0, prev.length - 1) : currentLine.slice(0, prev.length + 1)
      )
    }, speed)
    return () => clearTimeout(timeout)
  }, [useTypewriter, typewriterLines, lineIndex, displayText, isDeleting, reducedMotion])

  const staticTypewriterLine = reducedMotion && typewriterLines?.length ? typewriterLines[0] : null

  return (
    <section className="local-seo-hero relative border-b border-[rgba(248,250,252,0.08)] overflow-hidden min-h-[52vh] md:min-h-[62vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
        role="img"
        aria-label=""
      />
      <div
        className="absolute inset-0 local-seo-hero-overlay pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2228] via-[rgba(30,34,40,0.55)] to-[rgba(30,34,40,0.35)] pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl relative z-10">
        <p className="hero-eyebrow mb-4">{hero.eyebrow}</p>
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#F8FAFC] tracking-tight leading-tight mb-5 drop-shadow-sm">
          {hero.title}
        </h1>

        {useTypewriter && (
          <div className="min-h-[2.75rem] md:min-h-[3.25rem] mb-4" aria-live="polite">
            <p className="text-lg md:text-xl font-medium text-[#E2E8F0] font-mono tracking-tight">
              <span className="local-seo-typewriter-text">{staticTypewriterLine ?? displayText}</span>
              {!reducedMotion && (
                <span className="showcase-typewriter-cursor text-[#94A3B8] ml-0.5" aria-hidden>
                  |
                </span>
              )}
            </p>
          </div>
        )}

        <p className="text-base md:text-lg text-[#CBD5E1] leading-relaxed max-w-2xl mb-8 drop-shadow-sm">
          {hero.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#proje-talep-formu"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#4F7CFF] hover:bg-[#3d6ae8] transition-colors shadow-lg shadow-[rgba(79,124,255,0.25)]"
          >
            {hero.ctaLabel || 'Ücretsiz Görüşme'}
          </Link>
          <a
            href="https://wa.me/905456597551?text=Merhaba%2C%20web%20sitesi%20projem%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-[#F8FAFC] border border-[rgba(248,250,252,0.25)] bg-[rgba(43,49,61,0.55)] hover:bg-[rgba(43,49,61,0.85)] transition-colors"
          >
            WhatsApp ile İletişim
          </a>
        </div>
      </div>
    </section>
  )
}
