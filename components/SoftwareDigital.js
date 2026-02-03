// components/SoftwareDigital.js
'use client'

import { motion } from 'framer-motion'
import { Globe, Smartphone, FileCode2, ExternalLink, Github } from 'lucide-react'

/* ----------------------------
   DATA
-----------------------------*/

const projects = [
  {
    type: 'Website',
    icon: <Globe className="w-7 h-7" />,
    title: 'Kadraj Rotam',
    description:
      'A route + photography platform built to present places through atmosphere, story, and clean UI structure.',
    outcome: 'Live product website (international-ready structure).',
    focus: ['UI/UX layout', 'Component structure', 'Performance-minded frontend'],
    tags: ['Next.js', 'UI Design', 'Frontend'],
    links: {
      live: 'https://www.kadrajrotam.com.tr',
      
    }
  },

  {
    type: 'Website',
    icon: <Globe className="w-7 h-7" />,
    title: 'Mavi Kadraj',
    description:
      'A digital portfolio for photography and visual storytelling—designed for clarity, speed, and long-term content growth.',
    outcome: 'Live portfolio site (brand + showcase).',
    focus: ['Design consistency', 'Content sections', 'Mobile-first layout'],
    tags: ['Next.js', 'Design', 'Frontend'],
    links: {
      live: 'https://www.mavikadraj.com.tr',
      
    }
  },

  {
    type: 'Website',
    icon: <Globe className="w-7 h-7" />,
    title: 'Gönül Pusulası',
    description:
      'A concept site for short texts and reflective narratives—built with lightweight frontend fundamentals.',
    outcome: 'Live concept website (fast + simple).',
    focus: ['Clean HTML/CSS', 'Typography', 'Simple navigation'],
    tags: ['HTML', 'CSS', 'Frontend'],
    links: {
      live: 'https://www.gonulpusulasi.com',
      
    }
  },

  {
    type: 'Play Store App',
    icon: <Smartphone className="w-7 h-7" />,
    title: 'Mavi Kadrajla Öğreniyorum',
    description:
      'Published on Google Play. A visual learning app for children, designed around image-based learning and simple interactions.',
    outcome: 'Shipped product on Play Store.',
    focus: ['Mobile UX basics', 'Practical delivery', 'User-friendly flow'],
    tags: ['Android', 'Mobile App'],
    links: {
      live: 'https://play.google.com/store/apps/details?id=com.mavikadaj.learn'
    }
  },

  {
    type: 'Open Source',
    icon: <FileCode2 className="w-7 h-7" />,
    title: 'Job Tracking – HTML Tool',
    description:
      'A browser-based job tracking + notes tool built with pure HTML/CSS—simple, fast, and usable.',
    outcome: 'Live tool (GitHub Pages).',
    focus: ['Practical utility', 'Zero-dependency', 'Fast load'],
    tags: ['HTML', 'CSS'],
    links: {
      live: 'https://mustafa-network-tech.github.io/pro-track/',
      github: 'https://github.com/mustafa-network-tech/pro-track'
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
                Real Builds, Real Delivery
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl">
                I build and ship digital products after work hours—live websites, a practical tool,
                and a published mobile app. This is my second skillset: focused, consistent, and outcome-driven.
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
                    <div className="text-blue-600">{p.icon}</div>

                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {p.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {p.description}
                  </p>

                  {/* Outcome */}
                  {p.outcome && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-900 mb-1">Outcome</div>
                      <p className="text-sm text-gray-600">{p.outcome}</p>
                    </div>
                  )}

                  {/* Focus */}
                  {p.focus?.length ? (
                    <div className="mb-5">
                      <div className="text-xs font-semibold text-gray-900 mb-2">Focus</div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        {p.focus.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

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
                How I Work
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    Delivery Mindset
                  </div>
                  <p className="text-sm text-gray-600">
                    I finish what I start. Small, shipped products beat big unfinished ideas.
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    User-First UI
                  </div>
                  <p className="text-sm text-gray-600">
                    Clear navigation, readable layout, and mobile-first structure are non-negotiable.
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    Maintainable Builds
                  </div>
                  <p className="text-sm text-gray-600">
                    Clean components, consistent styling, and simple architecture that can scale later.
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