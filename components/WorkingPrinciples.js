// components/WorkingPrinciples.js
'use client'

import { motion } from 'framer-motion'
import { Check, X, Target, Filter, Zap, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WorkingPrinciples() {
  const { t } = useLanguage()
  const principles = [
    { title: t.how_i_work, items: (t.principles_how_i_work_items || []).map((text) => ({ text, positive: true })), icon: <Target className="w-6 h-6" /> },
    { title: t.focus_on, items: (t.principles_focus_items || []).map((text) => ({ text, positive: true })), icon: <Filter className="w-6 h-6" /> },
    { title: t.avoid, items: (t.principles_avoid_items || []).map((text) => ({ text, positive: false })), icon: <X className="w-6 h-6" /> }
  ]
  return (
    <section id="principles" className="pt-4 pb-20 light-section" style={{ background: '#F2EFEA' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-2">
              <span
                className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-1"
                style={{ color: '#FFFFFF', background: '#2B313D', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {t.principles_badge}
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight text-[#1E293B] mb-1 leading-tight"
                style={{ letterSpacing: '-0.02em', fontWeight: 700 }}
              >
                {t.principles_title}
              </h2>
              <p className="text-lg max-w-[760px] mx-auto leading-[1.7] text-[#475569]">
                {t.principles_intro_before != null ? (
                  <>
                    {t.principles_intro_before}
                    <span className="hero-handwritten" style={{ color: '#2563EB' }}>{t.principles_intro_accent}</span>
                    {t.principles_intro_after}
                  </>
                ) : (
                  t.principles_intro
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="telekom-glass-card rounded-[18px] p-8"
                >
                  <div className="flex items-center mb-8">
                    <div
                      className={`p-3 rounded-lg mr-4 ${index === 2 ? 'bg-red-500/15 text-red-500' : ''}`}
                      style={index !== 2 ? { background: 'rgba(59,130,246,0.12)', color: '#3B82F6' } : undefined}
                    >
                      {principle.icon}
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#0F172A' }}>
                      {principle.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {principle.items.map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                            item.positive
                              ? 'bg-emerald-500/20 text-emerald-600'
                              : 'bg-red-500/15 text-red-500'
                          }`}
                        >
                          {item.positive ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </div>
                        <p className="text-[#475569]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Values */}
            <div className="telekom-glass-card rounded-[18px] p-8 md:p-12">
              <h3 className="text-2xl font-semibold mb-12 text-center" style={{ color: '#1E293B' }}>
                {t.core_values}
              </h3>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(37,99,235,0.12)', color: '#2563EB' }}>
                    <Zap className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>
                    {t.value_technical_depth}
                  </h4>
                  <p className="text-sm text-[#475569]">{t.value_technical_depth_desc}</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(37,99,235,0.12)', color: '#2563EB' }}>
                    <Users className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>
                    {t.value_collaboration}
                  </h4>
                  <p className="text-sm text-[#475569]">{t.value_collaboration_desc}</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(37,99,235,0.12)', color: '#2563EB' }}>
                    <Target className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>
                    {t.value_outcome}
                  </h4>
                  <p className="text-sm text-[#475569]">{t.value_outcome_desc}</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(37,99,235,0.12)', color: '#2563EB' }}>
                    <Filter className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>
                    {t.value_selectivity}
                  </h4>
                  <p className="text-sm text-[#475569]">{t.value_selectivity_desc}</p>
                </div>
              </div>
            </div>

            {/* Final Statement */}
            <div className="mt-16 text-center">
              <p className="text-xl italic max-w-2xl mx-auto" style={{ color: '#475569' }}>
                “{t.principles_final_quote}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}