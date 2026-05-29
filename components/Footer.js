'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Linkedin, Instagram } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import FooterLocalSeoCities from '@/components/localSeo/FooterLocalSeoCities'

const LINKEDIN_URL = 'https://www.linkedin.com/in/mustafa-oner-82/'
const WHATSAPP_URL = 'https://wa.me/905456597551'
const INSTAGRAM_URL = 'https://www.instagram.com/mavi_kadraj14/'
const TELEGRAM_URL = 'https://t.me/MK_Digital_Systems'

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isTr = pathname.startsWith('/tr')
  const home = isTr ? '/tr' : '/'
  const services = isTr ? '/tr/services' : '/services'
  const projects = isTr ? '/tr/projects' : '/projects'
  const vitrin = isTr ? '/tr/vitrin' : '/vitrin'
  const contactPage = isTr ? '/tr/contact' : '/contact'

  return (
    <footer id="contact" className="bg-secondary border-t border-divider text-sub">
      <div className="container mx-auto px-6 py-16 max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-10"
        >
          <div>
            <h2 className="text-primary text-lg font-semibold mb-4">
              {t.footer_name}
            </h2>
            <p className="text-sm leading-relaxed text-sub whitespace-pre-line">
              {t.footer_desc}
            </p>
          </div>

          <div>
            <h3 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              {t.footer_focus}
            </h3>
            <ul className="space-y-2 text-sm text-sub">
              {t.footer_focus_items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <nav className="mt-6 pt-6 border-t border-divider/80" aria-label={t.footer_explore || 'Explore'}>
              <h3 className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">
                {t.footer_explore || 'Explore'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={services} className="text-sub hover:text-primary transition-colors">
                    {t.menu_infrastructure}
                  </Link>
                </li>
                <li>
                  <Link href={projects} className="text-sub hover:text-primary transition-colors">
                    {t.menu_web}
                  </Link>
                </li>
                <li>
                  <Link href={vitrin} className="text-sub hover:text-primary transition-colors">
                    {t.menu_vitrin}
                  </Link>
                </li>
                <li>
                  <Link href={contactPage} className="text-sub hover:text-primary transition-colors">
                    {t.menu_communication}
                  </Link>
                </li>
                <li>
                  <Link href={`${home}#photography`} className="text-sub hover:text-primary transition-colors">
                    {t.menu_photography}
                  </Link>
                </li>
              </ul>
            </nav>
            <FooterLocalSeoCities
              citiesTitle={t.footer_local_seo_cities}
              servicesTitle={t.footer_local_seo_services}
            />
          </div>

          <div>
            <h3 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              {t.footer_contact}
            </h3>

            <div className="space-y-3 text-sm">

              <a
                href="mailto:mustafa82oner@gmail.com"
                className="flex items-center gap-3 text-sub transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                mustafa82oner@gmail.com
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub transition-colors hover:text-primary"
              >
                <Linkedin className="h-4 w-4 shrink-0" aria-hidden />
                LinkedIn
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub transition-colors hover:text-primary"
              >
                <WhatsAppIcon />
                +905456597551
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub transition-colors hover:text-primary"
              >
                <Instagram className="h-4 w-4 shrink-0" aria-hidden />
                @mavi_kadraj14
              </a>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub transition-colors hover:text-primary"
              >
                <TelegramIcon />
                t.me/MK_Digital_Systems
              </a>
            </div>
          </div>
        </motion.div>
        <p className="mt-4 text-sm text-muted text-center">
          {t.footer_portfolio_note}
        </p>
        <div className="border-t border-divider mt-12 pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} {t.footer_name} — {t.footer_copyright}
        </div>
      </div>
    </footer>
  )
}
