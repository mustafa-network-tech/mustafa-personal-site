'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import en from '@/i18n/en.json'
import tr from '@/i18n/tr.json'
import { mergeMessages } from '@/lib/i18n/mergeMessages'
import { resolveLocale } from '@/lib/i18n/resolveLocale'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'mustafa-site-lang'

const MESSAGES = {
  en: mergeMessages(en, tr),
  tr: mergeMessages(tr, en),
}

export function LanguageProvider({ children, initialLocale = 'tr' }) {
  const pathname = usePathname()
  const routeLocale = resolveLocale(pathname, initialLocale)
  const [language, setLanguageState] = useState(routeLocale)

  useEffect(() => {
    setLanguageState(resolveLocale(pathname, initialLocale))
  }, [pathname, initialLocale])

  const setLanguage = (lang) => {
    if (lang !== 'en' && lang !== 'tr') return
    setLanguageState(lang)
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, lang)
  }

  const translations = useMemo(
    () => MESSAGES[language === 'tr' ? 'tr' : 'en'] ?? MESSAGES.en,
    [language]
  )

  const value = {
    language,
    setLanguage,
    t: translations,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
