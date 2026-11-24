import { AboutPage } from '@/components/mo/SubPages'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('about', 'tr')

export default function Page() {
  return <AboutPage lang="tr" />
}
