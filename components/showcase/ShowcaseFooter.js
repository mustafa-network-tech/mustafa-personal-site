'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_URL = 'https://wa.me/905456597551'
const LINKEDIN_URL = 'https://www.linkedin.com/in/mustafa-oner-/'
const EMAIL_URL = 'mailto:mustafa82oner@gmail.com'

function IconButton({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') || href.startsWith('mailto') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[#94A3B8] transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
    >
      {children}
    </a>
  )
}

export default function ShowcaseFooter() {
  const { t } = useLanguage()

  return (
    <footer className="w-full border-t border-white/10 bg-[#1e293b] text-[#94A3B8] px-6 py-8 md:px-8 md:py-10">
      <div className="flex flex-col gap-8 w-full" style={{ width: '100%' }}>
        {/* Tek satır: Sol = Mustafa Öner | Orta = Kapanış mesajı + alt metin | Sağ = İletişim */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 md:items-center w-full"
          style={{ width: '100%' }}
        >
          <div className="text-left order-2 md:order-1">
            <p className="font-semibold text-[#F8FAFC] text-base">
              {t.showcase_footer_identity_name} / {t.showcase_footer_identity_brand}
            </p>
          </div>
          <div className="text-center order-1 md:order-2 px-2">
            <h2 className="text-lg md:text-xl font-semibold text-[#F8FAFC]">
              {t.showcase_footer_closing_title}
            </h2>
            <p className="mt-1 text-xs md:text-sm max-w-md mx-auto" style={{ opacity: 0.85 }}>
              {t.showcase_footer_closing_subtext}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 order-3 md:justify-end">
            <span className="font-semibold text-[#F8FAFC] text-sm md:text-base">
              {t.showcase_footer_contact_title}
            </span>
            <div className="flex gap-2">
              <IconButton href={WHATSAPP_URL} label="WhatsApp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </IconButton>
              <IconButton href={LINKEDIN_URL} label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </IconButton>
              <IconButton href={EMAIL_URL} label="E-posta">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>

        {/* ALT SATIR: Sol = © | Sağ = Digital Project Showcase */}
        <div
          className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full text-xs"
          style={{ opacity: 0.85, width: '100%' }}
        >
          <span className="text-[#94A3B8] text-left">
            {t.showcase_footer_copyright_left}
          </span>
          {t.showcase_footer_copyright_right && (
            <span className="text-[#94A3B8] text-right">
              {t.showcase_footer_copyright_right}
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}
