'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSectionIds } from '@/lib/sectionIds'

const inputBase =
  'w-full rounded-[10px] px-3 py-3 border bg-white/80 text-[#000000] transition-colors outline-none focus:border-[#2563EB] placeholder:text-[#94A3B8] placeholder:opacity-80'
const inputBorder = '1px solid rgba(0,0,0,0.08)'
const MESSAGE_MAX = 400
const CONTACT_EMAIL = 'mustafa82oner@gmail.com'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

export default function Contact() {
  const pathname = usePathname()
  const isTr = pathname.startsWith('/tr')
  const s = getSectionIds(isTr ? 'tr' : 'en')
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (FORMSPREE_ID) {
      setStatus('sending')
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            message,
            _replyto: email,
          }),
        })
        if (res.ok) {
          setStatus('success')
          setName('')
          setEmail('')
          setMessage('')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    } else {
      const subject = encodeURIComponent(`Contact from ${name}`)
      const body = encodeURIComponent(
        `${name}\n${email}\n\n---\n\n${message}`
      )
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    }
  }

  return (
    <section id={s.contact} className="py-16 md:py-20" style={{ background: '#F5F3EF' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-[640px] mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B] mb-3"
              style={{ letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              {t.contact_title}
            </h2>
            <p className="text-lg leading-[1.7] text-[#475569] whitespace-pre-line">
              {t.contact_subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#334155] mb-1.5">
                  {t.contact_name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact_placeholder_name}
                  className={inputBase}
                  style={{ border: inputBorder }}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#334155] mb-1.5">
                  {t.contact_email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.contact_placeholder_email}
                  className={inputBase}
                  style={{ border: inputBorder }}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-[#334155] mb-1.5">
                {t.contact_message}
              </label>
              {t.contact_message_hint && (
                <p className="text-sm text-[#64748B] mb-1.5">
                  {t.contact_message_hint}
                </p>
              )}
              <div className="relative">
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX))}
                  placeholder={t.contact_placeholder_message}
                  maxLength={MESSAGE_MAX}
                  rows={5}
                  className={`${inputBase} resize-y min-h-[120px] pb-8`}
                  style={{ border: inputBorder }}
                  required
                />
                <span
                  className="absolute bottom-2 right-3 text-xs tabular-nums text-[#64748B]"
                  aria-live="polite"
                >
                  {message.length} / {MESSAGE_MAX - message.length}
                </span>
              </div>
            </div>

            {status === 'success' && (
              <p className="text-center text-sm text-[#059669]" role="alert">
                {t.contact_success}
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm text-[#DC2626]" role="alert">
                {t.contact_error}
              </p>
            )}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-6 py-3 rounded-[10px] text-white font-medium transition-transform hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#F5F3EF] disabled:opacity-70 disabled:pointer-events-none"
                style={{ background: '#2563EB' }}
              >
                {status === 'sending' ? t.contact_sending : t.contact_send}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
