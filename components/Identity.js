// components/Identity.js – Business-focused hero: web, e-commerce, custom software
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, ShoppingBag, Code, LayoutDashboard, Smartphone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import HeroCodeCard from '@/components/HeroCodeCard'
import ScrollingSloganStrip from '@/components/ScrollingSloganStrip'

const HERO_SERVICE_ICONS = [Globe, ShoppingBag, Code, LayoutDashboard, Smartphone]

// 4 different hero slides from Unsplash (workspace / coding theme, same style)
const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
]
const getSlideSrc = (index) => HERO_SLIDES[index]
const SLIDE_DURATION_MS = 5500
const SLIDE_TRANSITION_MS = 700

// Teklif Al butonu – WhatsApp’ta hazır gelen mesaj
const WHATSAPP_NUMBER = '905456597551'
const WHATSAPP_DEFAULT_MESSAGE = `Merhaba Mustafa Bey,
web sitesi / yazılım projesi hakkında bilgi almak istiyorum.
Uygun olduğunuzda görüşebilir miyiz?`

export default function Identity() {
  const { t } = useLanguage()
  const services = t.hero_services || []
  const [currentSlide, setCurrentSlide] = useState(0)

  // Preload hero images so they switch without delay
  useEffect(() => {
    HERO_SLIDES.forEach((src, i) => {
      const img = new Image()
      img.src = getSlideSrc(i)
    })
  }, [])

  // Auto-advance to next slide every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="identity"
      className="hero-section relative min-h-0 md:min-h-[85vh] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
      }}
    >
      {/* Background slideshow – one slide at a time, key forces change so photo updates */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          key={currentSlide}
          className="hero-bg-slide absolute inset-0 bg-cover bg-center"
style={{
              backgroundImage: `url(${getSlideSrc(currentSlide)})`,
            filter: 'brightness(1.22) contrast(1.05) blur(2px)',
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(rgba(10,15,30,0.28), rgba(10,15,30,0.28))',
        }}
        aria-hidden
      />
      {/* Left ambient glow – soft and atmospheric */}
      <div
        className="absolute pointer-events-none w-[min(90vw,520px)] h-[min(90vw,520px)] -left-[20%] top-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.15), transparent 60%)',
          filter: 'blur(48px)',
        }}
        aria-hidden
      />
      {/* Right ambient glow – soft and atmospheric */}
      <div
        className="absolute pointer-events-none w-[min(90vw,520px)] h-[min(90vw,520px)] -right-[20%] top-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 60%)',
          filter: 'blur(48px)',
        }}
        aria-hidden
      />

      {/* Desktop: scrolling text flows FROM the right OF the card (strip on card’s right) */}
      <div
        className="absolute right-0 hidden md:block pointer-events-none overflow-hidden"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: 36,
          zIndex: 5,
          width: 'calc(50% - 1.25rem - 340px - 5px)',
        }}
        aria-hidden
      >
        <ScrollingSloganStrip />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6 py-8 max-md:py-10 md:py-32 lg:py-36">
        {/* Mobile: Eyebrow → Headline → Description → Card → Buttons → Services. Desktop: 2-col grid, card right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-0 md:gap-6 lg:gap-8 md:items-center">
          {/* Block 1: Eyebrow, Headline, Description – row 1 on both */}
          <motion.div
            className="max-w-3xl w-full flex flex-col max-md:items-center max-md:text-center md:col-start-1 md:row-start-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Sabit: küçük üst başlık */}
            <p className="hero-eyebrow mb-3 max-md:mb-4 md:mb-5">{t.hero_eyebrow}</p>
            {/* Sabit: ana büyük başlık */}
            <h1
              className="hero-headline max-md:text-[30px] max-md:leading-[1.15] md:text-[clamp(2rem,5vw,60px)] md:leading-[1.15] max-md:mb-4 md:mb-8"
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#F8FAFC',
                textShadow: '0 2px 12px rgba(0,0,0,0.35)',
                marginBottom: 0,
              }}
            >
              {t.hero_headline_before}
              <span className="hero-handwritten">{t.hero_headline_handwritten}</span>
              {t.hero_headline_after}
            </h1>
            {/* Değişen: slide'a göre kısa başlık ve açıklama */}
            {(t.hero_slides && t.hero_slides[currentSlide]) && (
              <div key={currentSlide} className="max-md:mb-5 md:mb-10" style={{ marginTop: 20 }}>
                <p
                  className="text-lg font-semibold text-[#F8FAFC] max-md:text-base mb-2"
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    letterSpacing: '-0.01em',
                    textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {t.hero_slides[currentSlide].subtitle}
                </p>
                <p
                  className="max-md:text-[17px] max-md:leading-[1.55] max-md:max-w-full"
                  style={{
                    fontFamily: 'var(--font-sans), Inter, sans-serif',
                    fontSize: 18,
                    lineHeight: 1.6,
                    color: '#E2E8F0',
                    maxWidth: 600,
                  }}
                >
                  {t.hero_slides[currentSlide].description}
                </p>
              </div>
            )}
          </motion.div>
          {/* Block 2: Circular code card – on mobile between description and buttons; on desktop right column */}
          <HeroCodeCard />
          {/* Block 3: Buttons, Service list – row 2 on mobile, row 2 left on desktop */}
          <div className="flex flex-col max-md:items-center max-md:text-center md:col-start-1 md:row-start-2">
            <div className="flex flex-wrap max-md:justify-center max-md:gap-3 md:gap-4 max-md:mb-4 md:mb-0">
              <a
                href="#software"
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 py-3.5 px-5 max-md:px-[22px] max-md:text-base md:px-6 min-h-[48px] max-md:min-w-[140px]"
                style={{
                  background: '#2563EB',
                  color: '#FFFFFF',
                  borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#1D4ED8'
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,99,235,0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#2563EB'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.35)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {t.hero_cta_primary}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 py-3.5 px-5 max-md:px-[22px] max-md:text-base md:px-6 min-h-[48px] max-md:min-w-[140px]"
                style={{
                  background: '#2563EB',
                  color: '#FFFFFF',
                  borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#1D4ED8'
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,99,235,0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#2563EB'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.35)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {t.hero_cta_secondary}
              </a>
            </div>
            {services.length > 0 && (
              <div
                className="flex flex-wrap items-center max-md:justify-center max-md:gap-x-3 max-md:gap-y-2 max-md:text-sm max-md:mt-4 md:mt-7 md:gap-x-4 md:gap-y-1"
                style={{ fontSize: 14, color: '#94A3B8' }}
              >
                {services.map((label, i) => {
                  const Icon = HERO_SERVICE_ICONS[i] || Code
                  return (
                    <span
                      key={i}
                      className={`hero-service-tag hero-service-tag-${i + 1} inline-flex items-center gap-x-1.5`}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden />
                      <span>{label}</span>
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bullet navigation – bottom center, slight transition, no wobble */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
        role="tablist"
        aria-label="Hero background slides"
      >
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            className="rounded-full border border-white/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
            style={{
              width: index === currentSlide ? 10 : 8,
              height: index === currentSlide ? 10 : 8,
              minWidth: 8,
              minHeight: 8,
              background: index === currentSlide ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
