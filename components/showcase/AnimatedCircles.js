'use client'

import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROJECTS } from './showcaseProjects'

const ACTIVE_COUNT = 10
const RESERVE_COUNT = PROJECTS.length - ACTIVE_COUNT

const SPEED = 0.12
const R_SMALL = 48
const R_MEDIUM = 58
const R_LARGE = 66
const R_LARGEST = 70
const RADII_BY_INDEX = [R_SMALL, R_SMALL, R_SMALL, R_MEDIUM, R_MEDIUM, R_MEDIUM, R_LARGE, R_LARGE, R_LARGE, R_LARGEST]
const PADDING = 48
const SEPARATION_GAP = 6
const COLLISION_ITERATIONS = 5

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function circleDistance(a, b) {
  const ax = a.x + a.r
  const ay = a.y + a.r
  const bx = b.x + b.r
  const by = b.y + b.r
  return Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2)
}

function getBounds(rect) {
  return {
    left: PADDING,
    top: PADDING,
    right: Math.max(0, rect.width - PADDING),
    bottom: Math.max(0, rect.height - PADDING),
  }
}

function applyBoundaryCollision(circle, bounds) {
  const { left, top, right, bottom } = bounds
  const r = circle.r
  if (circle.x <= left) {
    circle.x = left
    circle.vx = Math.abs(circle.vx)
  }
  if (circle.x + r * 2 >= right) {
    circle.x = right - r * 2
    circle.vx = -Math.abs(circle.vx)
  }
  if (circle.y <= top) {
    circle.y = top
    circle.vy = Math.abs(circle.vy)
  }
  if (circle.y + r * 2 >= bottom) {
    circle.y = bottom - r * 2
    circle.vy = -Math.abs(circle.vy)
  }
}

function resolveCollision(a, b) {
  const ax = a.x + a.r
  const ay = a.y + a.r
  const bx = b.x + b.r
  const by = b.y + b.r
  const dx = bx - ax
  const dy = by - ay
  const dist = Math.sqrt(dx * dx + dy * dy)
  const minDist = a.r + b.r + SEPARATION_GAP
  if (dist >= minDist || dist < 0.001) return false
  const nx = dx / dist
  const ny = dy / dist
  const overlap = minDist - dist

  a.x -= overlap * nx * (b.r / (a.r + b.r))
  a.y -= overlap * ny * (b.r / (a.r + b.r))
  b.x += overlap * nx * (a.r / (a.r + b.r))
  b.y += overlap * ny * (a.r / (a.r + b.r))

  const vax = a.vx * nx + a.vy * ny
  const vbx = b.vx * nx + b.vy * ny
  a.vx += (vbx - vax) * nx
  a.vy += (vbx - vax) * ny
  b.vx += (vax - vbx) * nx
  b.vy += (vax - vbx) * ny
  return true
}

function createCircle(id, label, titleKey, url, x, y, vx, vy, r) {
  return { id, label, titleKey, url, x, y, vx, vy, r }
}

function useCircles(sectionRef) {
  const [tick, setTick] = useState(0)
  const circlesRef = useRef([])
  const reserveRef = useRef([])
  const nextIdRef = useRef(PROJECTS.length)
  const initializedRef = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const active = circlesRef.current
    const reserve = reserveRef.current

    if (!initializedRef.current) {
      const shuffled = shuffle(PROJECTS)
      const activeProjects = shuffled.slice(0, ACTIVE_COUNT)
      reserveRef.current = shuffled.slice(ACTIVE_COUNT)
      activeProjects.forEach((p, i) => {
        active.push(createCircle(
          i,
          p.label,
          p.titleKey,
          p.url,
          0,
          0,
          (i % 3) - 1,
          (i % 2) === 0 ? 0.5 : -0.5,
          RADII_BY_INDEX[i]
        ))
      })
      initializedRef.current = true
    }

    const setInitialPositions = () => {
      const rect = el.getBoundingClientRect()
      const w = Math.max(1, rect.width - PADDING * 2)
      const h = Math.max(1, rect.height - PADDING * 2)
      const cols = 5
      const rows = Math.ceil(active.length / cols)
      const cellW = w / cols
      const cellH = h / rows
      active.forEach((c, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const cx = PADDING + (col + 0.5) * cellW - c.r
        const cy = PADDING + (row + 0.5) * cellH - c.r
        c.x = Math.max(PADDING, Math.min(PADDING + w - c.r * 2, cx))
        c.y = Math.max(PADDING, Math.min(PADDING + h - c.r * 2, cy))
      })
      setTick((t) => t + 1)
    }

    setInitialPositions()
    const ro = new ResizeObserver(setInitialPositions)
    ro.observe(el)

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      return () => ro.disconnect()
    }

    let raf = 0
    const animate = () => {
      const rect = el.getBoundingClientRect()
      const bounds = getBounds(rect)
      const circles = circlesRef.current
      const res = reserveRef.current

      circles.forEach((c) => {
        c.x += c.vx * SPEED
        c.y += c.vy * SPEED
        applyBoundaryCollision(c, bounds)
      })

      let didSwap = false
      for (let i = 0; i < circles.length && !didSwap; i++) {
        for (let j = i + 1; j < circles.length && !didSwap; j++) {
          const minDist = circles[i].r + circles[j].r + SEPARATION_GAP
          if (circleDistance(circles[i], circles[j]) < minDist && res.length >= 2) {
            const a = circles[i]
            const b = circles[j]
            const outProjects = [
              { label: a.label, titleKey: a.titleKey, url: a.url },
              { label: b.label, titleKey: b.titleKey, url: b.url },
            ]
            const in1 = res.pop()
            const in2 = res.pop()
            res.push(...outProjects)
            const cxA = a.x + a.r
            const cyA = a.y + a.r
            const cxB = b.x + b.r
            const cyB = b.y + b.r
            const dx = cxB - cxA
            const dy = cyB - cyA
            const d = Math.sqrt(dx * dx + dy * dy) || 1
            const nx = dx / d
            const ny = dy / d
            const sepSpeed = 2
            const newA = createCircle(nextIdRef.current++, in1.label, in1.titleKey, in1.url, a.x, a.y, -nx * sepSpeed, -ny * sepSpeed, a.r)
            const newB = createCircle(nextIdRef.current++, in2.label, in2.titleKey, in2.url, b.x, b.y, nx * sepSpeed, ny * sepSpeed, b.r)
            circles.splice(j, 1)
            circles.splice(i, 1)
            circles.push(newA, newB)
            setTick((t) => t + 1)
            didSwap = true
          }
        }
      }
      if (!didSwap) {
        for (let iter = 0; iter < COLLISION_ITERATIONS; iter++) {
          for (let i = 0; i < circles.length; i++) {
            for (let j = i + 1; j < circles.length; j++) {
              resolveCollision(circles[i], circles[j])
            }
          }
        }
      }

      setTick((t) => t + 1)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [sectionRef])

  return circlesRef.current
}

export default function AnimatedCircles() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const circles = useCircles(sectionRef)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden min-h-[480px] md:min-h-[600px]"
    >
      {circles.map((c) => (
        <Link
          key={c.id}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute flex items-center justify-center rounded-full backdrop-blur-sm font-medium select-none bg-cover bg-center overflow-hidden text-[#94A3B8] transition-opacity hover:opacity-90 focus:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#94A3B8] focus:ring-offset-2 focus:ring-offset-transparent"
          style={{
            width: c.r * 2,
            height: c.r * 2,
            left: c.x,
            top: c.y,
            fontSize: Math.max(9, Math.min(13, c.r / 5)) + 'px',
            backgroundImage:
              'linear-gradient(rgba(30,41,59,0.88), rgba(30,41,59,0.92)), url(/showcase/mk-logo.png)',
          }}
        >
          <span className="relative z-10 px-2 text-center leading-tight">{t[c.titleKey] || c.label}</span>
        </Link>
      ))}
    </section>
  )
}
