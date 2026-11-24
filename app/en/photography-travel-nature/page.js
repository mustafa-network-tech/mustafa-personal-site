import PhotoPage from '@/components/mo/PhotoPage'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('photo', 'en')

export default function Page() {
  return <PhotoPage lang="en" />
}
