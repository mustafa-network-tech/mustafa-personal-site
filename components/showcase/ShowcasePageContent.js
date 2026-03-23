'use client'

import ShowcaseAmbientBg from '@/components/showcase/ShowcaseAmbientBg'
import ShowcaseHero from '@/components/showcase/ShowcaseHero'
import ShowcaseCards from '@/components/showcase/ShowcaseCards'
import ShowcaseCta from '@/components/showcase/ShowcaseCta'
import AnimatedCircles from '@/components/showcase/AnimatedCircles'
import ShowcaseFooter from '@/components/showcase/ShowcaseFooter'

export default function ShowcasePageContent() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <ShowcaseAmbientBg>
        <ShowcaseHero />
        <ShowcaseCards />
        <ShowcaseCta />
        <AnimatedCircles />
      </ShowcaseAmbientBg>
      <ShowcaseFooter />
    </div>
  )
}
