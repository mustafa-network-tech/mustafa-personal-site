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
  ChevronRight,
  Instagram,
  ExternalLink
} from 'lucide-react'
import Image from 'next/image'

const photoCategories = [
  {
    title: 'Quiet Moments',
    description: 'Small silences, honest light, simple scenes that stay with you.',
    icon: <Grid className="w-6 h-6" />,
    images: [
      '/photos/quiet-moments/quiet-moments1.jpg',
      '/photos/quiet-moments/quiet-moments2.JPG',
      '/photos/quiet-moments/quiet-moments3.jpg',
      '/photos/quiet-moments/quiet-moments4.JPG',
      '/photos/quiet-moments/quiet-moments5.JPG'
    ]
  },
  {
    title: 'On the Road',
    description: 'Movement, weather, roadside stories — the world as it happens.',
    icon: <Aperture className="w-6 h-6" />,
    images: [
      '/photos/on-the-road/on-the-road1.jpg',
      '/photos/on-the-road/on-the-road2.jpg',
      '/photos/on-the-road/on-the-road3.jpg'
    ]
  },
  {
    title: 'Lines & Patterns',
    description: 'Shapes, symmetry, textures — beauty found in structure.',
    icon: <Eye className="w-6 h-6" />,
    images: [
      '/photos/lines-patterns/lines1.jpg',
      '/photos/lines-patterns/lines2.jpg',
      '/photos/lines-patterns/lines3.jpg',
      '/photos/lines-patterns/lines4.jpg'
    ]
  },
  {
    title: 'Nature',
    description: 'Landscapes, sunsets, sky and quiet light — places where I slow down and breathe.',
    icon: <Camera className="w-6 h-6" />,
    images: [
      '/photos/nature/nature1.jpg',
      '/photos/nature/nature2.jpg',
      '/photos/nature/nature3.jpg',
      '/photos/nature/nature4.jpg',
      '/photos/nature/nature5.jpg',
      '/photos/nature/nature6.jpg',
      '/photos/nature/nature7.jpg',
      '/photos/nature/nature8.jpg',
      '/photos/nature/nature9.jpg',
      '/photos/nature/nature10.jpg'
    ]
  }
]

// Instagram embeds (stable iframe method)
const instagramEmbeds = [
  { type: 'p', code: 'DTihp7RjE8u' },
  { type: 'p', code: 'DTLuSwUjh5U' },
  { type: 'reel', code: 'DSVd8i0jvoL' }
]

const instagramProfile = 'https://www.instagram.com/mavi_kadraj14/'

export default function Photography() {
  const [activeCategory, setActiveCategory] = useState(0)

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const active = photoCategories[activeCategory]
  const count = active.images.length

  const getLabel = () => {
    const map = {
      'Quiet Moments': 'Moment',
      'On the Road': 'Frame',
      'Lines & Patterns': 'Pattern',
      Nature: 'Scene'
    }
    return map[active.title] || 'Photo'
  }

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

  return (
    <section id="photography" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
              Photography
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frames That Feel Like Home
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl">
              This is not a workflow section. No “process” here. Just the moments I keep — the ones that
              carry a feeling, a place, a time.
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap gap-4 mb-6">
            {photoCategories.map((category, index) => {
              const isActive = activeCategory === index
              const c = category.images.length

              return (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(index)}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-3">{category.icon}</span>
                  <span className="font-medium">{category.title}</span>
                  <span
                    className={`ml-3 px-2 py-1 rounded-full text-xs ${
                      isActive ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    {c}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="text-gray-600 mb-10 max-w-3xl">{active.description}</p>

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
                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group text-left"
                  aria-label={`Open ${active.title} ${getLabel()} ${index + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${active.title} — ${getLabel()} ${index + 1}`}
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
            <div className="mb-16 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
              <Camera className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">No photos here yet.</p>
              <p className="text-gray-500 text-sm mt-1">
                Add images under <span className="font-mono">public/photos/</span> and list them in this
                category.
              </p>
            </div>
          )}

          {/* Philosophy */}
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <div className="max-w-3xl mx-auto text-center">
              <Camera className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                “Some photos don’t explain anything. They just remind you who you are.”
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Calm</div>
                  <p className="text-gray-600">A quiet frame can say more than a loud story.</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Light</div>
                  <p className="text-gray-600">The right light turns an ordinary scene into a memory.</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Belonging</div>
                  <p className="text-gray-600">Places change — but some corners feel like home forever.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Highlights */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium mb-4">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">A few recent highlights</h3>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  A small selection of visual stories — emotion, atmosphere, and human presence.
                </p>
              </div>

              <a
                href={instagramProfile}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white px-5 py-3 hover:bg-black transition"
              >
                Follow @mavi_kadraj14
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {instagramEmbeds.map((item) => {
                const src =
                  item.type === 'reel'
                    ? `https://www.instagram.com/reel/${item.code}/embed`
                    : `https://www.instagram.com/p/${item.code}/embed`

                return (
                  <div
                    key={item.code}
                    className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="aspect-[9/11] bg-gray-50">
                      <iframe
                        src={src}
                        className="w-full h-full"
                        frameBorder="0"
                        scrolling="no"
                        allow="encrypted-media; picture-in-picture; clipboard-write"
                        title={`instagram-${item.code}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isOpen && currentSrc && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeLightbox()
            }}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6">
              <div className="text-white/90 text-sm md:text-base">
                <span className="font-semibold">{active.title}</span>
                <span className="mx-2 text-white/40">•</span>
                <span className="text-white/80">
                  {getLabel()} {activeIndex + 1} / {count}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/15 transition"
              >
                <X className="w-5 h-5" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Image container */}
            <div className="absolute inset-0 flex items-center justify-center px-4 py-20 md:px-10">
              <div className="relative w-full max-w-5xl h-[70vh] md:h-[78vh] rounded-2xl overflow-hidden bg-black/30 border border-white/10">
                <Image
                  src={currentSrc}
                  alt={`${active.title} — ${getLabel()} ${activeIndex + 1}`}
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
                  onClick={prev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/15 transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/15 transition"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs md:text-sm px-6">
              ESC to close · ← / → to navigate · Click outside to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}