import ExperiencePage from '@/components/mo/ExperiencePage'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('experience', 'tr')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="experience" lang="tr" />
      <ExperiencePage lang="tr" />
    </>
  )
}
