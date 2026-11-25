import PhotoPage from '@/components/mo/PhotoPage'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('photo', 'tr')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="photo" lang="tr" />
      <PhotoPage lang="tr" />
    </>
  )
}
