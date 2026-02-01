// components/TelekomInfrastructure.js
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Wifi, Cpu, Zap, Shield, BarChart, Video } from 'lucide-react'

const expertiseAreas = [
  {
    icon: <Wifi className="w-8 h-8" />,
    title: 'Fiber Optical Networks',
    description:
      'FTTH / FTTB / FTTC architectures, splice planning and access network design.',
    keywords: ['GPON', 'XGS-PON', 'OLT', 'ONT', 'Splitter']
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'Central Office Technologies',
    description:
      'Main distribution frames, patch panel management, cross-connect systems and redundancy planning.',
    keywords: ['MDF', 'IDF', 'Patch Panel', 'VDF', 'Cable Management']
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Power & Energy Systems',
    description:
      'DC power systems, UPS solutions, battery banks and grounding management.',
    keywords: ['-48V DC', 'UPS', 'Rectifier', 'AGM Battery', 'Grounding']
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Passive Infrastructure',
    description:
      'Cabinet placement strategies, ventilation design, cable routing and fire safety solutions.',
    keywords: ['Rack', 'Cabinet', 'Cable Tray', 'Duct', 'Firestop']
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: 'Capacity Planning',
    description:
      'Traffic analysis, growth forecasting, scaling strategies and investment optimization.',
    keywords: ['Traffic Engineering', 'Capacity Planning', 'Scaling', 'ROI']
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: 'Field Operations',
    description:
      'Site surveys, standards-compliant implementation and structured testing procedures.',
    keywords: ['Site Survey', 'As-built', 'Test & Acceptance', 'Handover']
  }
]

export default function TelekomInfrastructure() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="telekom" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-16">
              <div className="inline-block px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                Technical Expertise
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Telecom Infrastructure Engineering
              </h2>

              <p className="text-lg text-gray-600">
                Designing fiber and copper networks is not only about pulling
                cables — it is about shaping the digital backbone of a city.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-6 border ${
                    activeIndex === index
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 shadow-sm'
                  } transition-all duration-300 hover:shadow-md cursor-pointer`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="text-blue-600 mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {area.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {area.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Telecom infrastructure expertise means making the right decision
                for every single link.
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-700">
                      In fiber projects, loss budget calculations define the
                      long-term reliability of the network.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-700">
                      Central office deployment is not just equipment
                      installation — it is system architecture design.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-700">
                      Copper line optimization is the discipline of extracting
                      maximum performance from existing infrastructure.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-700">
                      Optical distribution and termination points are critical
                      nodes of the access network.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-700">
                      Testing and acceptance processes guarantee long-term
                      operational stability.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-700">
                      Documentation is the operational roadmap for future
                      maintenance and expansion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}