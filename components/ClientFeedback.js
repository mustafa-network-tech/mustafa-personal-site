'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

function avatarInitials(displayName) {
  if (!displayName || typeof displayName !== 'string') return '?'
  const cleaned = displayName.replace(/\./g, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const a = parts[0][0]
    const b = parts[parts.length - 1][0]
    return (a + b).toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase() || '?'
}

const avatarGradients = [
  'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
  'linear-gradient(135deg, #64748B 0%, #334155 100%)',
  'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)',
  'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
  'linear-gradient(135deg, #475569 0%, #1E293B 100%)',
]

function TestimonialCard({ item, index }) {
  const initials = avatarInitials(item.name)
  const bg = avatarGradients[index % avatarGradients.length]

  return (
    <article
      className="group relative w-[min(18rem,calc(100vw-2.5rem))] max-w-[320px] shrink-0 sm:w-[300px] md:w-[320px] rounded-xl border border-slate-200/90 bg-white/75 backdrop-blur-sm px-6 py-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] snap-center"
      style={{ boxShadow: '0 4px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.85)' }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-tight text-white ring-2 ring-white/80"
          style={{ background: bg }}
          aria-hidden
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-[15px] font-semibold text-[#0F172A]">{item.name || ''}</p>
          <p className="mt-0.5 text-xs font-medium leading-snug text-[#64748B]">{item.role || ''}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#475569] line-clamp-3">{item.quote || ''}</p>
    </article>
  )
}

export default function ClientFeedback() {
  const { t } = useLanguage()
  const items = (t.client_feedback_items || []).filter(
    (item) => item && typeof item === 'object' && item.name && item.quote
  )

  const loopItems = useMemo(() => (items.length ? [...items, ...items] : []), [items])

  if (!items.length) return null

  return (
    <section
      id="client-feedback"
      className="relative overflow-hidden border-t border-slate-200/60 py-16 md:py-20"
      style={{
        background: 'linear-gradient(180deg, #FAFBFC 0%, #F1F5F9 55%, #EEF2F6 100%)',
      }}
      aria-labelledby="client-feedback-heading"
    >
      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <span
              className="mb-3 inline-block rounded-full border border-slate-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#475569] shadow-sm"
              style={{ letterSpacing: '0.12em' }}
            >
              {t.client_feedback_badge || ''}
            </span>
            <h2
              id="client-feedback-heading"
              className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              {t.client_feedback_title || ''}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#64748B] md:text-lg">{t.client_feedback_subtitle || ''}</p>
          </div>
        </motion.div>

        {/* Desktop: infinite marquee */}
        <div className="client-feedback-marquee-track relative -mx-4 hidden overflow-hidden px-4 md:block">
          <div
            className="client-feedback-marquee-inner flex gap-6"
            style={{ width: 'max-content' }}
          >
            {loopItems.map((item, i) => (
              <TestimonialCard key={`marquee-${i}-${item.name}`} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile: horizontal swipe */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 pt-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] md:hidden snap-x snap-mandatory px-1"
          style={{ scrollbarColor: '#CBD5E1 transparent' }}
        >
          {items.map((item, i) => (
            <TestimonialCard key={`mobile-${i}-${item.name}`} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
