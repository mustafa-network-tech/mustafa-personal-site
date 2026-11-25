'use client'
// Ortak hareket ilkeleri: IntersectionObserver + CSS (hafif), kaydırmaya bağlı olanlar için framer-motion.
import { useEffect, useRef, useState, createContext, useContext, useCallback, forwardRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/* ---------- görünürlük ---------- */
export function useInView(options = { rootMargin: '0px 0px -12% 0px', threshold: 0.01 }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen])
  return [ref, seen]
}

/** Aşağıdan yumuşak giriş */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useInView()
  return <Tag ref={ref} style={{ '--d': `${delay}ms` }} className={`mo-reveal ${seen ? 'is-in' : ''} ${className}`} {...rest}>{children}</Tag>
}

/** Kelime kelime maskeli giriş (başlıklar). */
export function SplitWords({ text, as: Tag = 'h2', className = '', delay = 0, id, hero = false }) {
  const [ref, seen] = useInView()
  const words = String(text).split(' ')
  return (
    <Tag ref={ref} id={id} aria-label={text} className={`mo-split ${hero ? 'mo-hero-in' : seen ? 'is-in' : ''} ${className}`}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="mo-w"><span className="mo-w-i" style={{ '--i': i, '--d': `${delay}ms` }}>{w}</span></span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

/** Harf harf maskeli giriş. `hero`: sayfa açılışına bağlı (CSS gecikmesi intro ile eşleşir). */
export function SplitLetters({ text, hero = false, className = '', base = 0 }) {
  const [ref, seen] = useInView()
  return (
    <span ref={ref} aria-label={text} className={`mo-split mo-letters ${hero ? 'mo-hero-in' : seen ? 'is-in' : ''} ${className}`}>
      {Array.from(text).map((c, i) => (
        <span key={i} aria-hidden="true" className="mo-l"><span className="mo-l-i" style={{ '--i': i, '--d': `${base}ms` }}>{c === ' ' ? ' ' : c}</span></span>
      ))}
    </span>
  )
}

/** Görsel maske açılışı + hafif ölçek */
export function ImageReveal({ className = '', children, delay = 0, style }) {
  const [ref, seen] = useInView()
  return <div ref={ref} style={style} className={`mo-imgreveal ${seen ? 'is-in' : ''} ${className}`}><div className="mo-imgreveal-c" style={{ '--d': `${delay}ms` }}><div className="mo-imgreveal-i">{children}</div></div></div>
}

/* ---------- kaydırmaya bağlı ---------- */
function Word({ w, progress, range }) {
  const o = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity: o }} className="inline-block">{w}&nbsp;</motion.span>
}

/** Kaydırdıkça kelimelerin belirdiği büyük metin */
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  if (reduce) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => <Word key={i} w={w} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]} />)}
      </span>
    </p>
  )
}

/** Kontrollü parallax: çocuk görsel kabın içinde hafifçe kayar. */
export function Parallax({ children, amount = 7, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={reduce ? undefined : { y, scale: 1 + amount / 50 }} className="h-full w-full will-change-transform">{children}</motion.div>
    </div>
  )
}

/* ---------- sayfa geçişi ---------- */
// Ara perde/bekleme yok: bağlantılar doğrudan ilgili sayfaya gider; hero'ların kendi animasyonları çalışır.
const TransitionCtx = createContext({ go: () => {} })
export const useMoNav = () => useContext(TransitionCtx)

export function TransitionProvider({ children }) {
  const router = useRouter()
  const go = useCallback((href) => { router.push(href) }, [router])
  return <TransitionCtx.Provider value={{ go }}>{children}</TransitionCtx.Provider>
}

/** İç bağlantı: geçiş perdesiyle gider. Dış / modifiye tıklamalar normal çalışır. */
export const MoLink = forwardRef(function MoLink({ href, children, onClick, ...rest }, ref) {
  const { go } = useMoNav()
  const pathname = usePathname()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (href === pathname) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    e.preventDefault()
    go(href)
  }
  return <Link ref={ref} href={href} onClick={handle} {...rest}>{children}</Link>
})
