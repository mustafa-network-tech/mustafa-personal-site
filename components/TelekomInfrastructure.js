// components/TelekomInfrastructure.js
'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Globe, ShoppingBag, Code, LayoutDashboard, Smartphone, Briefcase } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSectionIds } from '@/lib/sectionIds'

const icons = [Globe, ShoppingBag, Code, LayoutDashboard, Smartphone, Briefcase]

// Single phrase per language for subtle handwritten accent in subtitle (hero-style)
const INTRO_HANDWRITTEN_PHRASE_TR = 'çevrimiçi profesyonel görünmesine'
const INTRO_HANDWRITTEN_PHRASE_EN = 'look professional online'

function highlightIntroWithHandwritten(text, language) {
  const phrase = language === 'tr' ? INTRO_HANDWRITTEN_PHRASE_TR : INTRO_HANDWRITTEN_PHRASE_EN
  if (!text || !phrase) return text
  const idx = text.indexOf(phrase)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="hero-handwritten">{phrase}</span>
      {text.slice(idx + phrase.length)}
    </>
  )
}

export default function TelekomInfrastructure() {
  const { t, language } = useLanguage()
  const expertiseAreas = (t.telekom_areas || []).map((area, i) => ({
    ...area,
    IconComponent: icons[i] || Globe,
  }))

  const titleBefore = t.telekom_title_before ?? ''
  const titleAccent = t.telekom_title_accent ?? ''
  const hasSplitTitle = titleBefore !== '' && titleAccent !== ''

  return (
    <section
      id={s.services}
      className="light-section relative pt-4 pb-20 overflow-hidden"
      style={{ background: '#F2EFEA' }}
    >
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-1"
                style={{
                  color: '#FFFFFF',
                  background: '#2B313D',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {t.telekom_badge}
              </span>

              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight text-[#1E293B] mb-1 leading-tight"
                style={{ letterSpacing: '-0.02em', fontWeight: 700 }}
              >
                {hasSplitTitle ? (
                  <>
                    {titleBefore}
                    <span style={{ color: '#2563EB', fontFamily: 'var(--font-handwritten), cursive', fontStyle: 'italic' }}>{titleAccent}</span>
                  </>
                ) : (
                  t.telekom_title
                )}
              </h2>

              <p className="text-xl max-w-[760px] mx-auto leading-[1.7] text-[#475569]">
                {highlightIntroWithHandwritten(t.telekom_intro, language)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="telekom-glass-card rounded-[18px] transition-all duration-[0.35s] ease-out"
                  style={{ padding: 30 }}
                >
                  <div className="card-icon-container mb-4 shrink-0">
                    <area.IconComponent className="w-6 h-6 shrink-0" />
                  </div>

                  <h3
                    className="telekom-card-title text-[18px] font-semibold mb-3 leading-tight text-[#1E293B]"
                  >
                    {area.title}
                  </h3>

                  <p
                    className="text-sm mb-4 text-[#475569]"
                    style={{ lineHeight: 1.6 }}
                  >
                    {area.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(area.keywords || []).map((keyword, idx) => (
                      <span key={idx} className="card-tag inline-block">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
