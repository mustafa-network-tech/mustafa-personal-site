// components/Header.js
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const isTr = pathname.startsWith('/tr')
  const homeHref = isTr ? '/tr' : '/'
  const vitrinHref = isTr ? '/tr/vitrin' : '/vitrin'

  const switchTo = (lang) => {
    setLanguage(lang)
    if (lang === 'tr') {
      const path = isTr ? pathname : '/tr' + (pathname === '/' ? '' : pathname)
      router.push(path)
    } else {
      const path = pathname.replace(/^\/tr/, '') || '/'
      router.push(path)
    }
    setIsOpen(false)
  }

  const navItems = [
    { key: 'menu_identity', href: `${homeHref}#identity` },
    { key: 'menu_infrastructure', href: `${homeHref}#telekom` },
    { key: 'menu_narrative', href: `${homeHref}#software-approach` },
    { key: 'menu_web', href: `${homeHref}#software` },
    { key: 'menu_vitrin', href: vitrinHref, isPage: true },
    { key: 'menu_photography', href: `${homeHref}#photography` },
    { key: 'menu_principles', href: `${homeHref}#principles` },
    { key: 'menu_communication', href: `${homeHref}#contact-form` },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#2B313D] backdrop-blur-md border-b border-[#3A4150]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Photo + Name/Headline — site name is not the page H1 (hero holds H1 on home) */}
          <Link href={homeHref} className="flex items-center gap-3 min-w-0">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#4F7CFF]/50 ring-offset-2 ring-offset-[#2B313D] flex-shrink-0">
              <Image
                src="/mustafa.jpg"
                alt={`${t.name} — ${t.title}`}
                width={64}
                height={64}
                className="w-16 h-16 object-cover"
                priority
              />
            </div>

            <div className="flex flex-col leading-tight min-w-0">
              <p className="text-lg md:text-xl font-semibold text-[#F5F7FA] truncate">
                {t.name}
              </p>
              <p className="text-[12px] md:text-sm text-[#C7CEDA] leading-snug whitespace-normal">
                {t.title}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation + Language Switcher */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <nav className="flex flex-wrap justify-end gap-x-4 xl:gap-x-6 gap-y-1" aria-label="Primary">
              {navItems.map((item) =>
                item.isPage ? (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-[#D8DEE8] hover:text-[#4F7CFF] transition-colors text-sm font-medium"
                  >
                    {t[item.key]}
                  </Link>
                ) : (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-[#D8DEE8] hover:text-[#4F7CFF] transition-colors text-sm font-medium"
                  >
                    {t[item.key]}
                  </a>
                )
              )}
            </nav>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => switchTo('tr')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'tr' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8] hover:text-[#4F7CFF]'}`}
                aria-label="Site language: Turkish"
                title="Türkçe"
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => switchTo('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'en' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8] hover:text-[#4F7CFF]'}`}
                aria-label="Site language: English"
                title="English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 shrink-0"
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
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 py-3">
                {navItems.map((item) =>
                  item.isPage ? (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="text-[#D8DEE8] hover:text-[#4F7CFF] py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t[item.key]}
                    </Link>
                  ) : (
                    <a
                      key={item.key}
                      href={item.href}
                      className="text-[#D8DEE8] hover:text-[#4F7CFF] py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t[item.key]}
                    </a>
                  )
                )}
                <div className="flex items-center gap-2 pt-3 mt-2 border-t border-[#3A4150]">
                  <button
                    type="button"
                    onClick={() => switchTo('tr')}
                    className={`px-2 py-1 rounded text-sm font-medium ${language === 'tr' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8]'}`}
                    aria-label="Site language: Turkish"
                  >
                    TR
                  </button>
                  <button
                    type="button"
                    onClick={() => switchTo('en')}
                    className={`px-2 py-1 rounded text-sm font-medium ${language === 'en' ? 'bg-[#4F7CFF]/20 text-[#4F7CFF] ring-1 ring-[#4F7CFF]' : 'text-[#D8DEE8]'}`}
                    aria-label="Site language: English"
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
