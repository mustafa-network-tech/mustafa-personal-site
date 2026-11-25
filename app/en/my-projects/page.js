import { ProjectsPage } from '@/components/mo/SubPages'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('projects', 'en')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="projects" lang="en" />
      <ProjectsPage lang="en" />
    </>
  )
}
