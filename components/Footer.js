'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
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
            <h3 className="text-primary text-lg font-semibold mb-4">
              {t.footer_name}
            </h3>
            <p className="text-sm leading-relaxed text-sub whitespace-pre-line">
              {t.footer_desc}
            </p>
          </div>

          <div>
            <h4 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              {t.footer_focus}
            </h4>
            <ul className="space-y-2 text-sm text-sub">
              {t.footer_focus_items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              {t.footer_contact}
            </h4>

            <div className="space-y-3 text-sm">

              <a
                href="mailto:mustafa82oner@gmail.com"
                className="flex items-center gap-3 text-sub hover:text-primary"
              >
                <Mail className="w-4 h-4" />
                mustafa82oner@gmail.com
              </a>

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/mustafa-oner-82/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub hover:text-primary"
              >
              </a>
              <a
                href="https://www.linkedin.com/in/mustafa-oner-/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub hover:text-primary"
              >
                <Github className="w-4 h-4" />
                https://www.linkedin.com/in/mustafa-oner-/
              </a>
              {/* GITHUB */}
              <a
                href="https://github.com/mustafa-network-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sub hover:text-primary"
              >
                <Github className="w-4 h-4" />
                https://github.com/mustafa-network-tech
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
