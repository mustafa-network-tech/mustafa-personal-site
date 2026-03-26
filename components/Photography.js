'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import {
  Camera,
  Aperture,
  Eye,
  Grid,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import InstagramSection from '@/components/InstagramSection'

const categoryIcons = [Grid, Aperture, Eye, Camera]
// Clear, distinct background colors per gallery – nature photography (inactive bg, active bg, text on inactive)
const categoryChipColors = [
  { inactive: '#C8E6C9', active: '#2E7D32', text: '#1B5E20' },   // Nature – clear green
  { inactive: '#B3E5FC', active: '#0277BD', text: '#01579B' },   // Quiet Moments – clear sky blue
  { inactive: '#FFE0B2', active: '#E65100', text: '#BF360C' },   // On the Road – clear warm amber
  { inactive: '#E1BEE7', active: '#6A1B9A', text: '#4A148C' },   // Lines & Patterns – clear soft violet
]
const categoryImages = [
  ['/photos/nature/nature1.jpg', '/photos/nature/nature2.jpg', '/photos/nature/nature3.jpg', '/photos/nature/nature4.jpg', '/photos/nature/nature5.jpg', '/photos/nature/nature6.jpg', '/photos/nature/nature7.jpg', '/photos/nature/nature8.jpg', '/photos/nature/nature9.jpg', '/photos/nature/nature10.jpg'],
  ['/photos/quiet-moments/quiet-moments1.jpg', '/photos/quiet-moments/quiet-moments2.JPG', '/photos/quiet-moments/quiet-moments3.jpg', '/photos/quiet-moments/quiet-moments4.JPG', '/photos/quiet-moments/quiet-moments5.JPG'],
  ['/photos/on-the-road/on-the-road1.jpg', '/photos/on-the-road/on-the-road2.jpg', '/photos/on-the-road/on-the-road3.jpg'],
  ['/photos/lines-patterns/lines1.jpg', '/photos/lines-patterns/lines2.jpg', '/photos/lines-patterns/lines3.jpg', '/photos/lines-patterns/lines4.jpg']
]

export default function Photography() {
  const { t, language } = useLanguage()
  const photoCategories = (t.photo_categories || []).map((cat, i) => {
    const Icon = categoryIcons[i] || Grid
    return {
      ...cat,
      icon: <Icon className="w-6 h-6" />,
      images: categoryImages[i] || []
    }
  })

  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const active = photoCategories[activeCategory] || { title: '', description: '', label: 'Photo', images: [] }
  const count = active.images.length

  const getLabel = () => active.label || 'Photo'

  const openLightbox = (index) => {
    setActiveIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => setIsOpen(false)

  const prev = () => {
    if (!count) return
    setActiveIndex((i) => (i - 1 + count) % count)
  }

  const next = () => {
    if (!count) return
    setActiveIndex((i) => (i + 1) % count)
  }

  // Close lightbox when category changes
  useEffect(() => {
    setIsOpen(false)
    setActiveIndex(0)
  }, [activeCategory])

  // Lock body scroll while lightbox open
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, count])

  const currentSrc = useMemo(() => {
    if (!count) return null
    return active.images[activeIndex]
  }, [active.images, activeIndex, count])

  const headingBefore = t.photo_heading_before ?? ''
  const headingAccent = t.photo_heading_accent ?? ''
  const hasSplitHeading = headingBefore !== '' && headingAccent !== ''
  const introLines = (t.photo_intro || '').split('\n\n').filter(Boolean)

  return (
    <section id="photography" className="pt-4 pb-20 px-4 light-section relative overflow-hidden" style={{ background: '#F2EFEA' }}>
      <div className="container mx-auto max-w-6xl relative">
        {/* Subtle blurred photo preview on category chip hover */}
        {hoveredCategoryIndex != null && categoryImages[hoveredCategoryIndex]?.[0] && (
          <div
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-[400ms] ease-out"
            style={{
              opacity: 0.08,
              backgroundImage: `url(${categoryImages[hoveredCategoryIndex][0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px)',
              transform: 'scale(1.05)',
            }}
            aria-hidden
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Editorial header */}
          <div className="text-center mb-8">
            <div
              className="inline-block mb-4 px-4 py-2 rounded-full text-[12px] font-semibold tracking-[0.2em] uppercase"
              style={{
                color: '#E2E8F0',
                letterSpacing: '2px',
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {t.photo_badge}
            </div>

            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {hasSplitHeading ? (
                <>
                  <span style={{ color: '#1E293B' }}>{headingBefore} </span>
                  <span style={{ color: '#2563EB', fontStyle: 'italic', fontWeight: 500 }}>{headingAccent}</span>
                </>
              ) : (
                <span style={{ color: '#1E293B' }}>{t.photo_heading}</span>
              )}
            </h2>

            <div className="max-w-[620px] mx-auto text-base" style={{ color: '#475569', lineHeight: 1.8 }}>
              {introLines.map((paragraph, i) => (
                <p key={i} className="mb-2 last:mb-0">
                  {paragraph.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* Gallery chips – 4 clear nature-photography background colors */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 relative">
            {photoCategories.map((category, index) => {
              const isActive = activeCategory === index
              const colors = categoryChipColors[index] || categoryChipColors[0]

              return (
                <button
                  key={category.title}
                  type="button"
                  onClick={() => setActiveCategory(index)}
                  onMouseEnter={() => setHoveredCategoryIndex(index)}
                  onMouseLeave={() => setHoveredCategoryIndex(null)}
                  className="inline-flex items-center gap-2 px-[14px] py-2 rounded-full border transition-all duration-[0.25s] ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                  style={{
                    background: isActive ? colors.active : colors.inactive,
                    color: isActive ? '#FFFFFF' : colors.text,
                    border: isActive ? `1px solid ${colors.active}` : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: isActive ? '0 8px 18px rgba(0,0,0,0.15)' : 'none',
                  }}
                  onFocus={() => setHoveredCategoryIndex(index)}
                  onBlur={() => setHoveredCategoryIndex(null)}
                >
                  <span className="opacity-90 [&>svg]:w-[18px] [&>svg]:h-[18px]">{category.icon}</span>
                  <span>{category.title}</span>
                </button>
              )
            })}
          </div>

          <p className="mb-10 max-w-3xl text-center mx-auto relative" style={{ color: '#475569' }}>{active.description}</p>

          {/* Photo Grid */}
          {count > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {active.images.map((src, index) => (
                <motion.button
                  type="button"
                  key={src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  onClick={() => openLightbox(index)}
                  className="page-card-hover relative aspect-square overflow-hidden rounded-xl group text-left transition-all duration-300"
                  style={{
                    background: '#FAFAF9',
                    border: '1px solid rgba(30,41,59,0.08)',
                    boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
                  }}
                  aria-label={
                    language === 'tr'
                      ? `Büyüt: ${active.title}, ${getLabel()} ${index + 1} — Mustafa Öner`
                      : `Open lightbox: ${active.title}, ${getLabel()} ${index + 1} — Mustafa Oner`
                  }
                >
                  <Image
                    src={src}
                    alt={
                      language === 'tr'
                        ? `${active.title} — ${getLabel()} ${index + 1}, Mustafa Öner fotoğraf portföyü`
                        : `${active.title} — ${getLabel()} ${index + 1}, Mustafa Oner photography portfolio`
                    }
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority={activeCategory === 0 && index < 2}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <p className="text-sm font-medium">{active.title}</p>
                      <p className="text-xs opacity-90">
                        {getLabel()} #{index + 1}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="mb-16 rounded-xl border border-dashed border-divider p-10 text-center" style={{ background: '#FAFAF9', borderColor: 'rgba(30,41,59,0.12)' }}>
              <Camera className="w-10 h-10 mx-auto mb-4" style={{ color: '#64748B' }} />
              <p className="font-medium" style={{ color: '#0F172A' }}>{t.photo_no_photos}</p>
              <p className="text-sm mt-1" style={{ color: '#475569' }}>
                {t.photo_add_hint}
              </p>
            </div>
          )}

          {/* Instagram preview — complements photography; supports social/creative discovery */}
          <InstagramSection />

          {/* Philosophy – background close to section, same palette */}
          <div className="page-card-hover rounded-2xl p-8 md:p-12 shadow-card transition-all duration-300" style={{ background: '#EDE9E3', border: '1px solid rgba(30,41,59,0.08)' }}>
            <div className="max-w-3xl mx-auto text-center">
              <Camera className="w-12 h-12 mx-auto mb-6" style={{ color: '#2563EB' }} />
              <h3 className="text-2xl font-semibold mb-6" style={{ color: '#1E293B' }}>
                {t.photo_quote}
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="hero-handwritten text-3xl font-medium mb-2" style={{ color: '#2563EB' }}>{t.photo_calm}</div>
                  <p className="text-[#475569]">{t.photo_calm_desc}</p>
                </div>
                <div>
                  <div className="hero-handwritten text-3xl font-medium mb-2" style={{ color: '#2563EB' }}>{t.photo_light}</div>
                  <p className="text-[#475569]">{t.photo_light_desc}</p>
                </div>
                <div>
                  <div className="hero-handwritten text-3xl font-medium mb-2" style={{ color: '#2563EB' }}>{t.photo_belonging}</div>
                  <p className="text-[#475569]">{t.photo_belonging_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* LIGHTBOX (BULLETPROOF) */}
      <AnimatePresence>
        {isOpen && currentSrc && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop: sadece burası dış tık ile kapatır */}
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={closeLightbox}
              className="absolute inset-0 cursor-default"
            />

            {/* Content: bunun içindeki hiçbir tık backdrop'a gitmez */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 pointer-events-auto">
                <div className="text-white/90 text-sm md:text-base">
                  <span className="font-semibold">{active.title}</span>
                  <span className="mx-2 text-white/40">•</span>
                  <span className="text-white/80">
                    {getLabel()} {activeIndex + 1} / {count}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeLightbox()
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/15 transition pointer-events-auto"
                >
                  <X className="w-5 h-5" />
                  <span className="hidden sm:inline">{t.close}</span>
                </button>
              </div>

              {/* Image container */}
              <div className="w-full px-4 py-20 md:px-10 pointer-events-none">
                <div className="relative mx-auto w-full max-w-5xl h-[70vh] md:h-[78vh] rounded-2xl overflow-hidden bg-black/30 border border-white/10 pointer-events-auto">
                  <Image
                    src={currentSrc}
                    alt={
                      language === 'tr'
                        ? `${active.title} — ${getLabel()} ${activeIndex + 1}, Mustafa Öner fotoğraf portföyü`
                        : `${active.title} — ${getLabel()} ${activeIndex + 1}, Mustafa Oner photography portfolio`
                    }
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Nav buttons */}
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      prev()
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/15 transition z-50 pointer-events-auto"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      next()
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/15 transition z-50 pointer-events-auto"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}