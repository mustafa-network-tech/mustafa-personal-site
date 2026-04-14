'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import AssistantConsultantAvatar from '@/components/AssistantConsultantAvatar'
import { getAssistantReply } from '@/lib/portfolioAssistantBrain'

function TypingDots() {
  return (
    <span className="inline-flex gap-1 ml-1.5 align-middle" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="assistant-typing-dot inline-block h-1.5 w-1.5 rounded-full bg-slate-400"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  )
}

function analyzeDelayMs() {
  return 5000 + Math.floor(Math.random() * 3000)
}

function nextWordDelayMs() {
  return 130 + Math.floor(Math.random() * 90)
}

export default function PortfolioAssistant() {
  const { t, language } = useLanguage()
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [phase, setPhase] = useState('idle')
  const [streamingText, setStreamingText] = useState('')
  const [portalReady, setPortalReady] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => {
    setPortalReady(true)
  }, [])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, phase, streamingText, scrollToBottom, open])

  useEffect(() => {
    if (!portalReady) return undefined
    if (open) {
      const t0 = setTimeout(() => inputRef.current?.focus(), 400)
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(t0)
        document.body.style.overflow = prev
      }
    }
    return undefined
  }, [open, portalReady])

  useEffect(() => {
    if (!open) clearTimers()
  }, [open, clearTimers])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const runReply = useCallback(
    (userText) => {
      const fullRaw = getAssistantReply(userText, language)
      const forStream = fullRaw.replace(/\s*\n+\s*/g, ' ').trim()
      const words = forStream.split(/\s+/).filter(Boolean)
      let i = 0

      const step = () => {
        if (i >= words.length) {
          setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: fullRaw }])
          setStreamingText('')
          setPhase('idle')
          return
        }
        const chunk = words.slice(0, i + 1).join(' ')
        setStreamingText(chunk)
        i += 1
        const id = setTimeout(step, nextWordDelayMs())
        timersRef.current.push(id)
      }

      setPhase('streaming')
      setStreamingText('')
      step()
    },
    [language]
  )

  const send = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return
    if (phase !== 'idle') return

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: trimmed }])
    setInput('')
    setPhase('analyzing')

    const delay = analyzeDelayMs()
    const tid = setTimeout(() => {
      runReply(trimmed)
    }, delay)
    timersRef.current.push(tid)
  }, [input, phase, runReply])

  const busy = phase !== 'idle'

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="assistant-backdrop"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[3px]"
            aria-label={t.assistant_close}
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={panelId}
            className="relative z-10 flex max-h-[min(90vh,680px)] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/90 text-slate-900 shadow-[0_25px_80px_-12px_rgba(15,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.8)_inset] ring-1 ring-slate-200/60 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-slate-200/70 bg-gradient-to-b from-white/95 to-slate-50/40 px-4 py-3.5">
              <div
                className="shrink-0 rounded-full bg-white p-0.5 shadow-[0_2px_12px_rgba(37,99,235,0.15)] ring-2 ring-sky-100/90"
                aria-hidden
              >
                <AssistantConsultantAvatar variant="header" className="h-11 w-11 rounded-full" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id={panelId} className="text-[15px] font-semibold leading-snug tracking-tight text-slate-900">
                  {t.assistant_modal_title}
                </h2>
                <p className="mt-0.5 text-[11px] font-medium leading-snug text-slate-500 sm:text-xs">
                  {t.assistant_modal_subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-slate-200/90 hover:text-slate-800"
                aria-label={t.assistant_close}
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
              style={{ maxHeight: 'min(48vh, 400px)' }}
            >
              {messages.length === 0 && phase === 'idle' && (
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/95 to-white px-3.5 py-3 shadow-sm">
                  <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-800">
                    {t.assistant_welcome}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-500">{t.assistant_welcome_timing}</p>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-[#2563EB] text-white'
                        : 'border border-slate-200/90 bg-white/95 text-slate-800'
                    }`}
                  >
                    <span className={m.role === 'assistant' ? 'whitespace-pre-line' : ''}>{m.text}</span>
                  </div>
                </div>
              ))}

              {phase === 'analyzing' && (
                <div className="flex justify-start">
                  <div className="max-w-[92%] rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 text-sm text-slate-700">
                    <span>{t.assistant_analyzing}</span>
                    <TypingDots />
                  </div>
                </div>
              )}

              {phase === 'streaming' && streamingText && (
                <div className="flex justify-start">
                  <div className="max-w-[92%] rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 text-sm leading-relaxed text-slate-800">
                    {streamingText}
                    <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-slate-500 align-middle" aria-hidden />
                  </div>
                </div>
              )}
            </div>

            <p className="shrink-0 border-t border-slate-200/70 bg-slate-50/40 px-4 py-2.5 text-[11px] leading-relaxed text-slate-500">
              {t.assistant_footer_note}
            </p>

            <div className="flex shrink-0 gap-2 border-t border-slate-200/80 bg-white/80 p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder={t.assistant_placeholder}
                disabled={busy}
                className="min-w-0 flex-1 rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 disabled:opacity-55"
              />
              <button
                type="button"
                onClick={send}
                disabled={busy || !input.trim()}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2563EB] px-3.5 py-2.5 text-white shadow-md transition hover:bg-[#1d4ed8] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45"
                aria-label={t.assistant_send}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[190] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#2563EB] text-white shadow-[0_10px_40px_rgba(37,99,235,0.45)] ring-2 ring-white/40 transition hover:scale-[1.04] hover:bg-[#1d4ed8] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/35 md:bottom-8 md:right-8 md:h-[3.75rem] md:w-[3.75rem]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={t.assistant_fab_label}
      >
        <AssistantConsultantAvatar variant="fab" className="h-[2.65rem] w-[2.65rem] md:h-[3rem] md:w-[3rem]" />
      </button>

      {portalReady && createPortal(modal, document.body)}
    </>
  )
}
