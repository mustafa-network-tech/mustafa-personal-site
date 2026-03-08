'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const CODE_TR = `const proje = {
  tasarım: "modern",
  çözüm: "özel"
}

// Mustafa Öner`

const CODE_EN = `const project = {
  design: "modern",
  solution: "custom"
}

// Mustafa Oner`

// Çok yavaş, sakin, sürekli akış
const CHAR_DELAY_MS = 95
const NEWLINE_PAUSE_MS = 580
const PAUSE_BEFORE_RESTART_MS = 3500

export default function HeroCodeCard() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })
  const [displayedCode, setDisplayedCode] = useState('')
  const timeoutRef = useRef(null)
  const loopRef = useRef(null)

  const codeText = language === 'tr' ? CODE_TR : CODE_EN

  const runTypewriter = useCallback(() => {
    setDisplayedCode('')
    let index = 0

    function typeNext() {
      if (index >= codeText.length) {
        loopRef.current = window.setTimeout(() => {
          runTypewriter()
        }, PAUSE_BEFORE_RESTART_MS)
        return
      }
      const char = codeText[index]
      setDisplayedCode((prev) => prev + char)
      index += 1
      const delay = char === '\n' ? NEWLINE_PAUSE_MS : CHAR_DELAY_MS
      timeoutRef.current = window.setTimeout(typeNext, delay)
    }

    typeNext()
  }, [codeText])

  useEffect(() => {
    if (!inView) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (loopRef.current) clearTimeout(loopRef.current)
    runTypewriter()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (loopRef.current) clearTimeout(loopRef.current)
    }
  }, [inView, language, runTypewriter])

  return (
    <motion.div
      ref={ref}
      className="flex justify-center md:justify-start items-center w-full md:w-auto flex-shrink-0 max-md:mt-4 max-md:mb-5 max-md:-ml-6 md:col-start-2 md:row-start-1 md:row-span-2 md:self-center md:-ml-2"
      style={{ position: 'static' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex flex-col items-center justify-center p-5 max-md:px-3 max-md:py-2.5 md:p-8 max-md:w-[150px] max-md:h-[115px] max-md:shrink-0 md:w-[340px] md:h-[340px] transition-transform duration-[350ms] ease-out hover:-translate-y-1 hover:scale-[1.01] overflow-hidden"
        style={{
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <pre
          className="w-full overflow-hidden text-left md:text-center whitespace-pre-wrap break-all m-0 max-md:text-[11px] max-md:leading-[1.5] md:text-sm md:leading-[1.6] md:flex md:items-center md:justify-center md:min-h-[200px]"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            color: '#CFE8FF',
          }}
        >
          <code>{displayedCode}</code>
        </pre>
      </div>
    </motion.div>
  )
}
