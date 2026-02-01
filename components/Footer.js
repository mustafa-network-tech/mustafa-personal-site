'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16 max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-10"
        >
          {/* Identity */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Mustafa Oner
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Telecom Field Technician specialized in fiber and copper
              infrastructure, FTTH operations and on-site network deployment.
            </p>
          </div>

          {/* Focus */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Focus Areas
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Fiber & Copper Access Networks</li>
              <li>FTTH / FTTB Deployments</li>
              <li>Splicing, testing and acceptance</li>
              <li>Infrastructure documentation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Contact
            </h4>

            <div className="space-y-3 text-sm">
              <a
                href="mustafa82oner@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition"
              >
                <Mail className="w-4 h-4" />
                mustafa82oner@gmail.com
              </a>

              <a
                href="#"
                target="_blank"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition"
              >
                <Linkedin className="w-4 h-4" />
               https://www.linkedin.com/in/
mustafa-oner-82

              </a>

              <a
                href="#"
                target="_blank"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition"
              >
                <Github className="w-4 h-4" />
               https://github.com/mustafa-network-tech
              </a>
            </div>
          </div>
        </motion.div>
        <p className="mt-4 text-sm text-gray-500 text-center">
  This website serves as a professional portfolio for my telecom field experience and technical work.
</p>

        {/* Bottom line */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mustafa Oner — Technical Portfolio
        </div>
      </div>
    </footer>
  )
}