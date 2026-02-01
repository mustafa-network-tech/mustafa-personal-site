// components/WorkingPrinciples.js
'use client'

import { motion } from 'framer-motion'
import { Check, X, Target, Filter, Zap, Users } from 'lucide-react'

const principles = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'How I Work',
    items: [
      { text: 'A problem is understood first, then solved.', positive: true },
      { text: 'Technical details are never separated from the bigger picture.', positive: true },
      { text: 'Documentation is the long-term memory of a project.', positive: true },
      { text: 'Testing is the only real source of trust.', positive: true }
    ]
  },
  {
    icon: <Filter className="w-6 h-6" />,
    title: 'What I Focus On',
    items: [
      { text: 'Infrastructure projects that require real technical depth', positive: true },
      { text: 'System architecture and scalability challenges', positive: true },
      { text: 'The intersection of physical networks and digital systems', positive: true },
      { text: 'Equipment selection and performance optimization', positive: true }
    ]
  },
  {
    icon: <X className="w-6 h-6" />,
    title: 'What I Avoid',
    items: [
      { text: 'Superficial or copy-paste solutions', positive: false },
      { text: 'Approaches that ignore technical details', positive: false },
      { text: 'Temporary fixes instead of sustainable solutions', positive: false },
      { text: 'Projects where documentation is treated as optional', positive: false }
    ]
  }
]

export default function WorkingPrinciples() {
  return (
    <section id="principles" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-16 text-center">
              <div className="inline-block px-4 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-6">
                Working Principles
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Filter
              </h2>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Quality is defined not only by what you choose to build,
                but also by what you deliberately choose not to build.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
                >
                  <div className="flex items-center mb-8">
                    <div
                      className={`p-3 rounded-lg ${
                        principle.title.includes('Avoid')
                          ? 'bg-red-900/30 text-red-400'
                          : 'bg-blue-900/30 text-blue-400'
                      } mr-4`}
                    >
                      {principle.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {principle.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {principle.items.map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                            item.positive
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-red-900/30 text-red-400'
                          }`}
                        >
                          {item.positive ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </div>
                        <p className="text-gray-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Values */}
            <div className="bg-gradient-to-r from-blue-900/20 to-gray-800/20 rounded-2xl p-8 md:p-12 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-12 text-center">
                Core Values
              </h3>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Technical Depth
                  </h4>
                  <p className="text-sm text-gray-400">
                    Working at the core of systems, not just on the surface
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Collaboration
                  </h4>
                  <p className="text-sm text-gray-400">
                    Strong results come from multidisciplinary teamwork
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Outcome-Driven
                  </h4>
                  <p className="text-sm text-gray-400">
                    Clear objectives lead to measurable results
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Selectivity
                  </h4>
                  <p className="text-sm text-gray-400">
                    Sustainable quality comes from choosing the right work
                  </p>
                </div>
              </div>
            </div>

            {/* Final Statement */}
            <div className="mt-16 text-center">
              <p className="text-xl text-gray-300 italic max-w-2xl mx-auto">
                “Great work starts with the right questions.
                And the right questions are shaped by technical depth and real-world experience.”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}