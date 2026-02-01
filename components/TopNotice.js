// components/TopNotice.js
'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function TopNotice() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000) // 10 saniye
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed top-24 right-6 z-[9999]">
      <div className="relative w-[340px] max-w-[90vw] rounded-2xl bg-white shadow-xl border border-blue-100 px-5 py-4">

        {/* baloncuk oku */}
        <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r border-b border-blue-100 rotate-45"></div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-blue-700 mb-1 tracking-wide">
              Mustafa’s note
            </div>

            <div className="notice-blink text-[15px] leading-snug text-gray-900 font-medium">
             This is not a traditional CV.

This profile shows how I work on real telecom sites — and also how I live, observe and move through the world around me.

Because field work is not only about tools and procedures.
It is about attitude, discipline, communication and responsibility.

This page is built to help you understand not only what I do,
but how I work — and who I am while doing it.
            </div>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* süre barı */}
        <div className="mt-3 h-[3px] w-full rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-blue-600 notice-bar" />
        </div>

        <style jsx>{`
          .notice-bar {
            width: 100%;
            animation: bar 10s linear forwards;
          }

          @keyframes bar {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0%);
            }
          }

          .notice-blink {
            animation: blinkText 1.2s ease-in-out infinite;
          }

          @keyframes blinkText {
            0% { opacity: 1; }
            50% { opacity: 0.35; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}