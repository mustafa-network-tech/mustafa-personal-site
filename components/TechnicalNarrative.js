'use client'

import { motion } from 'framer-motion'
import { Cable, Server, Home, CheckCircle } from 'lucide-react'

const narratives = [
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Central Office & Distribution Frames (MDF / IDF)',
    description: 'Preparation and organization of main distribution frames inside central offices, ensuring reliable signal routing.',
    points: [
      'Patch panel installation and frame layout',
      'Power and grounding verification',
      'Labeling and port documentation',
      'Cross-connect and routing checks',
      'Acceptance and readiness testing'
    ]
  },
  {
    icon: <Cable className="w-6 h-6" />,
    title: 'Fiber Distribution Point (FDP / OFSD)',
    description: 'End-to-end fiber splicing and distribution inside outdoor and building fiber cabinets.',
    points: [
      'Fusion splicing and tray organization',
      'Splitter installation and verification',
      'Optical power measurement',
      'Fiber path labeling and records',
      'As-built documentation'
    ]
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: 'Subscriber Connection & Activation',
    description: 'Last-mile delivery and service activation from distribution point to customer premises.',
    points: [
      'Drop cable installation',
      'ONT installation and configuration',
      'Service activation and provisioning',
      'Speed and stability testing',
      'Customer handover and verification'
    ]
  }
]

export default function TechnicalNarrative() {
  return (
    <section id="technical-narrative" className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
              Technical Narrative
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              From central office <span className="text-blue-600">to subscriber</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A practical, field-driven view of how telecom infrastructure is
              designed, built and delivered in real environments.
            </p>
          </div>

          {/* Narrative cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {narratives.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex flex-col mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  {item.description}
                </p>

                <ul className="space-y-4">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Quote Section */}
          <div className="mt-24 py-12 px-6 rounded-3xl bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <p className="relative z-10 text-xl md:text-2xl text-center font-light italic max-w-4xl mx-auto leading-relaxed">
              “Reliable networks are not built by tools alone.
              They are built by <span className="text-blue-400 font-semibold">disciplined field processes</span>,
              accurate documentation and consistent quality control.”
            </p>
          </div>

          {/* Gallery Section */}
          <div className="mt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">From yesterday to today</h3>
                <p className="text-gray-600">Modernization journey of network infrastructure.</p>
              </div>
            </div>

            {/* Copper */}
            <div className="mb-16">
              <h4 className="flex items-center text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">
                <span className="w-8 h-[2px] bg-blue-600 mr-3"></span>
                Copper Period
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {[
                  '/photos/from-yesterday-to-today/copper/001.jpg',
                  '/photos/from-yesterday-to-today/copper/002.jpg',
                  '/photos/from-yesterday-to-today/copper/003.jpeg',
                  '/photos/from-yesterday-to-today/copper/004.JPG',
                  '/photos/from-yesterday-to-today/copper/005.JPG',
                  '/photos/from-yesterday-to-today/copper/006.JPG',
                
                ].map((src, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-200">
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fiber */}
            <div>
              <h4 className="flex items-center text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">
                <span className="w-8 h-[2px] bg-blue-600 mr-3"></span>
                Fiber Period
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {[
                  
                  '/photos/from-yesterday-to-today/fiber/008.jpeg',
                  '/photos/from-yesterday-to-today/fiber/009.jpeg',
                  '/photos/from-yesterday-to-today/fiber/010.jpeg',
                  '/photos/from-yesterday-to-today/fiber/011.JPG',
                  '/photos/from-yesterday-to-today/fiber/012.jpeg',
                  '/photos/from-yesterday-to-today/fiber/013.jpeg',
                  '/photos/from-yesterday-to-today/fiber/014.jpeg',
                  '/photos/from-yesterday-to-today/fiber/015.jpeg',
                  '/photos/from-yesterday-to-today/fiber/016.jpeg'
                ].map((src, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-200 ring-offset-2 hover:ring-2 ring-blue-500 transition-all">
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
