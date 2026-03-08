// app/page.js

import Identity from "../components/Identity";
import ScrollingSloganStrip from "../components/ScrollingSloganStrip";
import TelekomInfrastructure from "../components/TelekomInfrastructure";
import ProcessTimeline from "../components/ProcessTimeline";
import TechnicalNarrative from "../components/TechnicalNarrative";
import SoftwareDigital from "../components/SoftwareDigital";
import Photography from "../components/Photography";
import WorkingPrinciples from "../components/WorkingPrinciples";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      {/* Light background so area outside hero oval and below curve is white, not black */}
      <div className="hero-and-divider-wrap" style={{ background: 'linear-gradient(180deg, #F4F7FB 0%, #E9EEF5 100%)' }}>
        <Identity />
        {/* Mobile only: scrolling slogan under the hero; desktop stays old layout (text + circle card only) */}
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
  );
}