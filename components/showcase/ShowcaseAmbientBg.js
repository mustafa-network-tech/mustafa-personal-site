'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const PARTICLE_BASE_OPACITY = 0.15
const PARTICLE_HOVER_OPACITY = 0.38
const HOVER_RADIUS = 100
const PARTICLES = [
  { left: 15, top: 25, size: 4, delay: 0 },
  { left: 75, top: 30, size: 5, delay: -5 },
  { left: 50, top: 70, size: 3, delay: -10 },
  { left: 25, top: 60, size: 4, delay: -15 },
  { left: 85, top: 55, size: 4, delay: -20 },
  { left: 40, top: 15, size: 3, delay: -8 },
  { left: 60, top: 80, size: 5, delay: -12 },
]

export default function ShowcaseAmbientBg({ children }) {
  const wrapperRef = useRef(null)
  const rafRef = useRef(null)
  const [particleOpacities, setParticleOpacities] = useState(() => PARTICLES.map(() => PARTICLE_BASE_OPACITY))

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const next = PARTICLES.map((p) => {
        const px = (rect.width * p.left) / 100
        const py = (rect.height * p.top) / 100
        const d = Math.hypot(mx - px, my - py)
        if (d >= HOVER_RADIUS) return PARTICLE_BASE_OPACITY
        const factor = 1 - d / HOVER_RADIUS
        return PARTICLE_BASE_OPACITY + factor * (PARTICLE_HOVER_OPACITY - PARTICLE_BASE_OPACITY)
      })
      setParticleOpacities(next)
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setParticleOpacities(PARTICLES.map(() => PARTICLE_BASE_OPACITY))
  }, [])

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="showcase-hero-bg relative w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="showcase-hero-gradient" aria-hidden />
      <div className="showcase-hero-orb" aria-hidden />
      <div className="showcase-hero-orb" aria-hidden />
      <div className="showcase-hero-orb" aria-hidden />
      <div className="showcase-hero-particles" aria-hidden>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="showcase-hero-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: particleOpacities[i],
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
