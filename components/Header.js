// components/Header.js
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
  { name: 'Identity', href: '#identity' },
  { name: 'Telecom Infrastructure', href: '#telekom' },
  { name: 'Technical Narrative', href: '#technical-narrative' },
  { name: 'Software', href: '#software' },
  { name: 'Photography', href: '#photography' },
  { name: 'Working Principles', href: '#principles' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2">
  <Image
    src="/mustafa.jpg"
    alt="Mustafa profile photo"
    width={50}
    height={50}
    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
  />
</div>
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-900">Mustafa Oner</h1>
              <p className="text-sm text-gray-600">Telecom Field Technician
Fiber & Copper Infrastructure | FTTH Operations</p>
            </div>
          </Link>

          {/* Desktop Navigation - hash linkleri için <a> kullanılıyor (sayfa içi kaydırma) */}
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
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-gray-700 transition-transform ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-700 mt-1 ${isOpen ? 'hidden' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-700 mt-1 transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-3 py-4">
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
      </div>
    </header>
  )
}
