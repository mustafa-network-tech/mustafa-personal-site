'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ClipboardList, Palette, Code, TestTube, Rocket } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSectionIds } from '@/lib/sectionIds'

const STEP_ICONS = [ClipboardList, Palette, Code, TestTube, Rocket]

const QUOTE_HIGHLIGHTS_TR = ['yönetilebilir', 'güven veren', 'İyi yazılım'].sort((a, b) => b.length - a.length)
const QUOTE_HIGHLIGHTS_EN = ['manageable', 'trustworthy', 'Good software'].sort((a, b) => b.length - a.length)

function highlightQuotePhrases(text, language) {
  const phrases = language === 'tr' ? QUOTE_HIGHLIGHTS_TR : QUOTE_HIGHLIGHTS_EN
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
      <span key={i} style={{ color: '#60A5FA', fontWeight: 500 }}>{part.value}</span>
    ) : (
      part.value
    )
  )
}

export default function ProcessTimeline() {
  const pathname = usePathname()
  const isTr = pathname.startsWith('/tr')
  const s = getSectionIds(isTr ? 'tr' : 'en')
  const { t, language } = useLanguage()
  const steps = t.process_steps || []

  return (
    <section
      id={s.process}
      className="light-section relative pt-4 pb-20 md:pt-6 md:pb-24 overflow-hidden"
      style={{ background: '#F2EFEA' }}
    >
      <div className="container relative mx-auto px-4 max-w-5xl">
        {/* Process steps – extra margin below to increase gap above slogan */}
        <div className="mb-12">
        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="flex items-start justify-between relative">
            {/* Connecting line */}
            <div
              className="absolute top-[30px] left-0 right-0 h-0.5 -z-[0]"
              style={{ background: 'rgba(15,23,42,0.08)', left: '10%', right: '10%' }}
            />
            {steps.slice(0, 5).map((step, i) => {
              const Icon = STEP_ICONS[i] || Code
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="page-card-hover process-step flex flex-col items-center text-center flex-1 max-w-[180px] group rounded-2xl p-4"
                >
                  <div
                    className="process-step-circle w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ease-out group-hover:-translate-y-1"
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #3B82F6',
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-all duration-300 ease-out"
                      style={{ color: '#3B82F6' }}
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {steps.slice(0, 5).map((step, i) => {
            const Icon = STEP_ICONS[i] || Code
            const isLast = i === steps.length - 1 || i === 4
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="process-step-circle w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-300 ease-out"
                    style={{
background: '#FAFAF9',
                    border: '2px solid #2563EB',
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#2563EB' }} aria-hidden />
                  </div>
                  {!isLast && (
                    <div
                      className="w-0.5 flex-1 min-h-[32px] mt-1"
                      style={{ background: 'rgba(15,23,42,0.08)' }}
                    />
                  )}
                </div>
                <div className="pb-10 pt-0.5">
                  <h3 className="text-base font-semibold text-[#0F172A] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
        </div>

        {/* Slogan / manifesto – "Good software is not only a working build..." */}
        <div
          className="text-center relative overflow-hidden"
          style={{
            background: '#334155',
            borderRadius: '20px',
            padding: '48px 60px',
          }}
        >
          <p
            className="relative z-10 max-w-[900px] mx-auto italic"
            style={{
              color: '#F8FAFC',
              fontSize: '22px',
              lineHeight: 1.7,
              letterSpacing: '0.3px',
              fontWeight: 500,
            }}
          >
            {highlightQuotePhrases(t.narrative_quote, language)}
          </p>
        </div>
      </div>
    </section>
  )
}
