import { ProjectsPage } from '@/components/mo/SubPages'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('projects', 'tr')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="projects" lang="tr" />
      <ProjectsPage lang="tr" />
    </>
  )
}
