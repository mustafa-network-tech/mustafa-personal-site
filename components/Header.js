// components/Header.js
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { key: 'menu_identity', href: '#identity' },
    { key: 'menu_infrastructure', href: '#telekom' },
    { key: 'menu_narrative', href: '#software-approach' },
    { key: 'menu_web', href: '#software' },
    { key: 'menu_photography', href: '#photography' },
    { key: 'menu_principles', href: '#principles' },
    { key: 'menu_communication', href: '#contact-form' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#2B313D] backdrop-blur-md border-b border-[#3A4150]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Photo + Name/Headline */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#4F7CFF]/50 ring-offset-2 ring-offset-[#2B313D] flex-shrink-0">
              <Image
                src="/mustafa.jpg"
                alt="Mustafa profile photo"
                width={64}
                height={64}
                className="w-16 h-16 object-cover"
                priority
              />
            </div>

            {/* Text block (mobile + desktop) */}
            <div className="flex flex-col leading-tight min-w-0">
              <h1 className="text-lg md:text-xl font-semibold text-[#F5F7FA] truncate">
                {t.name}
              </h1>
              <p className="text-[12px] md:text-sm text-[#C7CEDA] leading-snug whitespace-normal">
                {t.title}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation + Language Switcher */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-[#D8DEE8] hover:text-[#4F7CFF] transition-colors text-sm font-medium"
                >
                  {t[item.key]}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setLanguage('tr')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'tr' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8] hover:text-[#4F7CFF]'}`}
                aria-label="Türkçe"
                title="Türkçe"
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'en' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8] hover:text-[#4F7CFF]'}`}
                aria-label="English"
                title="English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 shrink-0"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block h-0.5 w-6 bg-[#F5F7FA] transition-transform duration-200 ${isOpen ? 'rotate-45 translate-y-1' : ''
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#F5F7FA] mt-1 transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#F5F7FA] mt-1 transition-transform duration-200 ${isOpen ? '-rotate-45 -translate-y-1' : ''
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 py-3">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-[#D8DEE8] hover:text-[#4F7CFF] py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t[item.key]}
                  </a>
                ))}
                <div className="flex items-center gap-2 pt-3 mt-2 border-t border-[#3A4150]">
                  <button
                    type="button"
                    onClick={() => { setLanguage('tr'); setIsOpen(false); }}
                    className={`px-2 py-1 rounded text-sm font-medium ${language === 'tr' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8]'}`}
                    aria-label="Türkçe"
                  >
                    TR
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLanguage('en'); setIsOpen(false); }}
                    className={`px-2 py-1 rounded text-sm font-medium ${language === 'en' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8]'}`}
                    aria-label="English"
                  >
                    EN
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}