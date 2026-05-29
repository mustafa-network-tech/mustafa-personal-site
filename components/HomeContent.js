// components/HomeContent.js – shared home page content for / and /tr
import Identity from '@/components/Identity'
import ScrollingSloganStrip from '@/components/ScrollingSloganStrip'
import TelekomInfrastructure from '@/components/TelekomInfrastructure'
import ProcessTimeline from '@/components/ProcessTimeline'
import TechnicalNarrative from '@/components/TechnicalNarrative'
import SoftwareDigital from '@/components/SoftwareDigital'
import Photography from '@/components/Photography'
import WorkingPrinciples from '@/components/WorkingPrinciples'
import Contact from '@/components/Contact'

export default function HomeContent() {
  return (
    <>
      <div className="hero-and-divider-wrap" style={{ background: 'linear-gradient(180deg, #F4F7FB 0%, #E9EEF5 100%)' }}>
        <Identity />
        <div className="md:hidden" style={{ background: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)' }}>
          <ScrollingSloganStrip />
        </div>
        <div className="hero-next-divider-wrapper">
          <div className="hero-next-divider" aria-hidden />
        </div>
      </div>
      <TelekomInfrastructure />
      <TechnicalNarrative />
      <ProcessTimeline />
      <SoftwareDigital />
      <Photography />
      <WorkingPrinciples />
      <Contact />
    </>
  )
}
