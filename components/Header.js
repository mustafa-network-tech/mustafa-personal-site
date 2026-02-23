// components/Header.js
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Identity', href: '#identity' },
    { name: 'Telecom Infrastructure', href: '#telekom' },
    { name: 'Technical Narrative', href: '#technical-narrative' },
    { name: 'Web & Software', href: '#software' },     // sadece isim güncellendi
    { name: 'Photography', href: '#photography' },
    { name: 'Working Principles', href: '#principles' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Photo + Name/Headline */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 flex-shrink-0">
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
              {/* Name - mobile bigger */}
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                Mustafa Oner
              </h1>

              {/* Headline */}
              <p className="text-[12px] md:text-sm text-gray-600 leading-snug whitespace-normal">
                Field Operations Supervisor • Fiber & Copper Infrastructure • FTTH Operations
              </p>

              {/* Secondary line (software visible, but not stealing the role) */}
              <p className="text-[11px] md:text-xs text-gray-500 leading-snug whitespace-normal">
                Web Solutions & Frontend • Next.js • React • UI
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 shrink-0"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-transform duration-200 ${isOpen ? 'rotate-45 translate-y-1' : ''
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-700 mt-1 transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-700 mt-1 transition-transform duration-200 ${isOpen ? '-rotate-45 -translate-y-1' : ''
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
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}