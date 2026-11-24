import { AboutPage } from '@/components/mo/SubPages'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('about', 'en')

export default function Page() {
  return <AboutPage lang="en" />
}
