'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const INTRO_HIGHLIGHTS_TR = ['kullanıcı deneyimi', 'güven veren', 'doğru yapı'].sort((a, b) => b.length - a.length)
const INTRO_HIGHLIGHTS_EN = ['user experience', 'trustworthy', 'solid structure'].sort((a, b) => b.length - a.length)

function highlightPhrases(text, language) {
  const phrases = language === 'tr' ? INTRO_HIGHLIGHTS_TR : INTRO_HIGHLIGHTS_EN
  if (!text || !phrases.length) return text
  const matches = []
  for (const phrase of phrases) {
    let pos = 0
    while (true) {
      const idx = text.indexOf(phrase, pos)
      if (idx === -1) break
      matches.push({ phrase, index: idx })
      pos = idx + phrase.length
    }
  }
  matches.sort((a, b) => a.index - b.index)
  const parts = []
  let last = 0
  for (const { phrase, index } of matches) {
    if (index > last) parts.push({ type: 'text', value: text.slice(last, index) })
    parts.push({ type: 'highlight', value: phrase })
    last = index + phrase.length
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })
  if (parts.length === 0) return text
  return parts.map((part, i) =>
    part.type === 'highlight' ? (
      <span key={i} style={{ color: '#0EA5E9', fontWeight: 600 }}>{part.value}</span>
    ) : (
      part.value
    )
  )
}

export default function TechnicalNarrative() {
  const { t, language } = useLanguage()

  const titleBefore = t.narrative_heading_before ?? ''
  const titleAccent = t.narrative_heading_accent ?? ''
  const titleAfter = t.narrative_heading_after ?? ''
  const hasSplitTitle = titleBefore !== '' || titleAccent !== '' || titleAfter !== ''

  return (
    <section
      id="software-approach"
      className="light-section relative pt-4 pb-24 md:pt-6 md:pb-32 overflow-hidden"
      style={{ background: '#F2EFEA' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(59,130,246,0.04), transparent 55%)',
        }}
      />

      <div className="container relative mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-2">
            <span
              className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-1"
              style={{
                color: '#FFFFFF',
                background: '#2B313D',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {t.narrative_badge}
            </span>

            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-[#1E293B] mb-1 leading-tight"
              style={{ letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              {hasSplitTitle ? (
                <>
                  {titleBefore}
                  <span className="hero-handwritten">{titleAccent}</span>
                  {titleAfter}
                </>
              ) : (
                t.narrative_heading
              )}
            </h2>

            <p className="text-lg max-w-[760px] mx-auto leading-[1.7] text-[#475569]">
              {highlightPhrases(t.narrative_intro, language)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
