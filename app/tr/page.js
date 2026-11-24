import HomePage from '@/components/mo/HomePage'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('home', 'tr')

export default function Page() {
  return <HomePage lang="tr" />
}
