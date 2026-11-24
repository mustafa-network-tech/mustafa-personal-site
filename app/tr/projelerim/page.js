import { ProjectsPage } from '@/components/mo/SubPages'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('projects', 'tr')

export default function Page() {
  return <ProjectsPage lang="tr" />
}
