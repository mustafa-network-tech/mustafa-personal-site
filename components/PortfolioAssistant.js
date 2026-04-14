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
  /** idle | analyzing | streaming */
  const [phase, setPhase] = useState('idle')
  const [streamingText, setStreamingText] = useState('')
  /** Portal yalnızca mount sonrası — SSR ile ilk client render aynı kalsın (hydration). */
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
  }, [messages, phase, streamingText, scrollToBottom])

  useEffect(() => {
    if (!portalReady) return undefined
    if (open) {
      const t0 = setTimeout(() => inputRef.current?.focus(), 320)
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
      const full = getAssistantReply(userText, language)
      const words = full.split(/\s+/).filter(Boolean)
      let i = 0

      const step = () => {
        if (i >= words.length) {
          setMessages((prev) => [
            ...prev,
            { id: `a-${Date.now()}`, role: 'assistant', text: words.join(' ') },
          ])
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
          className="fixed inset-0 z-[200] flex items-end justify-end p-4 sm:p-6 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
            aria-label={t.assistant_close}
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={panelId}
            className="relative flex max-h-[min(92vh,720px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.25)] ring-1 ring-white/70 backdrop-blur-md [@media(prefers-color-scheme:dark)]:border-slate-600/60 [@media(prefers-color-scheme:dark)]:bg-slate-900/95 [@media(prefers-color-scheme:dark)]:text-slate-100 [@media(prefers-color-scheme:dark)]:ring-white/10"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 [@media(prefers-color-scheme:dark)]:border-slate-600/50">
              <div>
                <h2 id={panelId} className="text-base font-semibold tracking-tight">
                  {t.assistant_title}
                </h2>
                <p className="text-xs text-slate-500 [@media(prefers-color-scheme:dark)]:text-slate-400">
                  {t.assistant_subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200/80 hover:text-slate-800 [@media(prefers-color-scheme:dark)]:hover:bg-slate-700/80 [@media(prefers-color-scheme:dark)]:hover:text-slate-100"
                aria-label={t.assistant_close}
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
              style={{ maxHeight: 'min(52vh, 420px)' }}
            >
              {messages.length === 0 && phase === 'idle' && (
                <p className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 text-sm leading-relaxed text-slate-600 [@media(prefers-color-scheme:dark)]:border-slate-600/50 [@media(prefers-color-scheme:dark)]:bg-slate-800/50 [@media(prefers-color-scheme:dark)]:text-slate-300">
                  {t.assistant_intro_hint}
                </p>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-[#2563EB] text-white'
                        : 'border border-slate-200/90 bg-white/90 text-slate-800 [@media(prefers-color-scheme:dark)]:border-slate-600/60 [@media(prefers-color-scheme:dark)]:bg-slate-800/70 [@media(prefers-color-scheme:dark)]:text-slate-100'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {phase === 'analyzing' && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl border border-slate-200/90 bg-white/90 px-3.5 py-2.5 text-sm text-slate-700 [@media(prefers-color-scheme:dark)]:border-slate-600/60 [@media(prefers-color-scheme:dark)]:bg-slate-800/70 [@media(prefers-color-scheme:dark)]:text-slate-200">
                    <span>{t.assistant_analyzing}</span>
                    <TypingDots />
                  </div>
                </div>
              )}

              {phase === 'streaming' && streamingText && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl border border-slate-200/90 bg-white/90 px-3.5 py-2.5 text-sm leading-relaxed text-slate-800 [@media(prefers-color-scheme:dark)]:border-slate-600/60 [@media(prefers-color-scheme:dark)]:bg-slate-800/70 [@media(prefers-color-scheme:dark)]:text-slate-100">
                    {streamingText}
                    <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-slate-500 align-middle" aria-hidden />
                  </div>
                </div>
              )}
            </div>

            <p className="shrink-0 border-t border-slate-200/70 px-4 py-2 text-[10px] leading-snug text-slate-500 [@media(prefers-color-scheme:dark)]:border-slate-600/40 [@media(prefers-color-scheme:dark)]:text-slate-400">
              {t.assistant_disclaimer}
            </p>

            <div className="flex shrink-0 gap-2 border-t border-slate-200/80 p-3 [@media(prefers-color-scheme:dark)]:border-slate-600/50">
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
                className="min-w-0 flex-1 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25 disabled:opacity-60 [@media(prefers-color-scheme:dark)]:border-slate-600/60 [@media(prefers-color-scheme:dark)]:bg-slate-900/60 [@media(prefers-color-scheme:dark)]:text-slate-100 [@media(prefers-color-scheme:dark)]:placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={send}
                disabled={busy || !input.trim()}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2563EB] px-3.5 py-2.5 text-white shadow-md transition hover:bg-[#1d4ed8] disabled:pointer-events-none disabled:opacity-45"
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
        className="fixed bottom-5 right-5 z-[190] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#2563EB] text-white shadow-[0_8px_32px_rgba(37,99,235,0.45)] ring-2 ring-white/30 transition hover:scale-[1.05] hover:bg-[#1d4ed8] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/40 md:bottom-8 md:right-8 md:h-[3.75rem] md:w-[3.75rem]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={t.assistant_fab_label}
      >
        <AssistantConsultantAvatar className="h-[2.65rem] w-[2.65rem] md:h-[3rem] md:w-[3rem]" />
      </button>

      {portalReady && createPortal(modal, document.body)}
    </>
  )
}
