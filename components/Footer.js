'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Linkedin, Github } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const LINKEDIN_URL = 'https://www.linkedin.com/in/mustafa-oner-82/'

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
          </div>

          <div>
            <h3 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              {t.footer_contact}
            </h3>

            <div className="space-y-3 text-sm">

              <a
                href="mailto:mustafa82oner@gmail.com"
                className="flex items-center gap-3 text-sub hover:text-primary"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden />
                mustafa82oner@gmail.com
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub hover:text-primary"
              >
                <Linkedin className="w-4 h-4 shrink-0" aria-hidden />
                LinkedIn
              </a>

              <a
                href="https://github.com/mustafa-network-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub hover:text-primary"
              >
                <Github className="w-4 h-4 shrink-0" aria-hidden />
                GitHub
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
