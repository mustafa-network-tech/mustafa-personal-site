// components/ScrollingSloganStrip.js – premium scrolling slogan strip below hero
'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function ScrollingSloganStrip() {
  const { t } = useLanguage()
  const sloganText = t.hero_slogan_strip || 'Mustafa Oner • MK Digital Systems • Web Development • SaaS Systems • Software Process'
  const repeated = `${sloganText} • ${sloganText} • ${sloganText} • `

  return (
    <div
      className="slogan-strip"
      style={{
        height: 36,
        width: '100%',
        background: 'rgba(255,255,255,0.06)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(6px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-hidden
    >
      <div className="slogan-strip-inner">
        <span className="slogan-strip-text">{repeated}</span>
        <span className="slogan-strip-text" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  )
}
