// components/Identity.js
'use client'

import { motion } from 'framer-motion'

export default function Identity() {
  return (
    <section id="identity" className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Building reliable networks
              <br />
              starts with
              <span className="text-blue-700"> understanding the field.</span>
            </h1>

            {/* Secondary line – software visible but telecom stays primary */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6">
              Telecom field expertise combined with practical web & software development.
            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mb-12"></div>
          </div>

          {/* 핵심 요약 – recruiter first view */}
          <div className="mb-12">
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
              <li>20+ years of hands-on experience in telecom field operations</li>
              <li>Fiber and copper access networks (FTTH / FTTB)</li>
              <li>Main distribution frames, outdoor cabinets and building distribution</li>
              <li>Splicing, termination, testing and labeling workflows</li>
              <li>As-built documentation and on-site quality control</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Telecommunications infrastructure is the backbone of modern cities.
                Fiber and copper networks carry everyday life.
                Understanding how these systems behave in real field conditions
                is more valuable than simply deploying them.
              </p>

              <p className="text-lg text-gray-700">
                Every project is a complex problem.
                In the field, reliable solutions come from experience,
                structured troubleshooting and disciplined technical execution.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Technical Depth
                </h3>
                <p className="text-gray-600">
                  End-to-end knowledge from central offices and distribution frames
                  to subscriber connections, testing and service activation.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  System Thinking
                </h3>
                <p className="text-gray-600">
                  Seeing the whole network, not only individual components.
                  Understanding infrastructure as a living operational ecosystem.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}