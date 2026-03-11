'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import en from '@/i18n/en.json'
import tr from '@/i18n/tr.json'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'mustafa-site-lang'

export function LanguageProvider({ children, initialLocale }) {
  const [language, setLanguageState] = useState(() => (initialLocale === 'tr' ? 'tr' : 'en'))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (stored === 'tr' || stored === 'en') setLanguageState(stored)
  }, [])

  useEffect(() => {
    if (initialLocale === 'tr' || initialLocale === 'en') setLanguageState(initialLocale)
  }, [initialLocale])

  const setLanguage = (lang) => {
    if (lang !== 'en' && lang !== 'tr') return
    setLanguageState(lang)
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, lang)
  }

  const translations = language === 'tr' ? tr : en

  const value = {
    language,
    setLanguage,
    t: translations,
    mounted,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
