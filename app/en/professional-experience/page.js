import ExperiencePage from '@/components/mo/ExperiencePage'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('experience', 'en')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="experience" lang="en" />
      <ExperiencePage lang="en" />
    </>
  )
}
