// components/SoftwareDigital.js
'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Smartphone,
  FileCode2,
  ExternalLink,
  Github
} from 'lucide-react'

/* ----------------------------
   DATA
-----------------------------*/

const projects = [
  {
    type: 'Website',
    icon: <Globe className="w-7 h-7" />,
    title: 'Kadraj Rotam',
    description:
      'A visual route and photography focused web platform designed to present places through atmosphere and story.',
    tags: ['Next.js', 'UI Design', 'Frontend'],
    links: {
      live: 'https://www.kadrajrotam.com.tr',
      github: '#'
    }
  },

  {
    type: 'Website',
    icon: <Globe className="w-7 h-7" />,
    title: 'Mavi Kadraj',
    description:
      'A personal photography and visual storytelling website built as a digital portfolio.',
    tags: ['Next.js', 'Design', 'Frontend'],
    links: {
      live: 'https://www.mavikadraj.com.tr',
      github: '#'
    }
  },

  {
    type: 'Website',
    icon: <Globe className="w-7 h-7" />,
    title: 'Gönül Pusulası',
    description:
      'A concept platform focused on emotions, short texts and reflective visual narratives.',
    tags: ['HTML', 'CSS', 'Frontend'],
    links: {
      live: 'https://www.gonulpusulasi.com',
      github: '#'
    }
  },

  {
    type: 'Play Store App',
    icon: <Smartphone className="w-7 h-7" />,
    title: 'Mavi Kadrajla Öğreniyorum',
    description:
      'An educational and visual-based mobile app concept built around learning through images and short content.',
    tags: ['Android', 'Mobile App'],
    links: {
      live: 'https://play.google.com/store/apps/details?id=com.mavikadaj.learn',
      
    }
  },

  {
    type: 'Open Source',
    icon: <FileCode2 className="w-7 h-7" />,
    title: 'Job Tracking – HTML Tool',
    description:
      'A simple browser-based job tracking and note system built with pure HTML and CSS.',
    tags: ['HTML', 'CSS'],
    links: {
      live: 'https://mustafa-network-tech.github.io/pro-track/',
      github: 'https://mustafa-network-tech.github.io/pro-track/'
    }
  }
]

/* ----------------------------
   Small link button
-----------------------------*/

function LinkButton({ href, icon, label }) {
  if (!href || href === '#') return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
    >
      {icon}
      {label}
    </a>
  )
}

/* ----------------------------
   MAIN COMPONENT
-----------------------------*/

export default function SoftwareDigital() {
  return (
    <section id="software" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-14">
              <div className="inline-block px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                Software & Digital
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple Builds, Real Output
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl">
                This section presents my personal digital work: three live websites,
                one lightweight open-source tool and an upcoming Play Store application.
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {projects.map((p, index) => (
                <motion.div
                  key={`${p.title}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-600">
                      {p.icon}
                    </div>

                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {p.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <LinkButton
                      href={p.links?.live}
                      label={p.type === 'Play Store App' ? 'Play Store' : 'Live'}
                      icon={<ExternalLink className="w-4 h-4" />}
                    />

                    <LinkButton
                      href={p.links?.github}
                      label="GitHub"
                      icon={<Github className="w-4 h-4" />}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Minimal statement */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Approach
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    Clarity
                  </div>
                  <p className="text-sm text-gray-600">
                    Clean structure, readable interfaces and simple navigation.
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    Discipline
                  </div>
                  <p className="text-sm text-gray-600">
                    Small and finished work is more valuable than large unfinished ideas.
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    Consistency
                  </div>
                  <p className="text-sm text-gray-600">
                    Same design language and technical mindset across all projects.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}