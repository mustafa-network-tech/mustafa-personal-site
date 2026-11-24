import PhotoPage from '@/components/mo/PhotoPage'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('photo', 'tr')

export default function Page() {
  return <PhotoPage lang="tr" />
}
