import PrivacyPage from '@/components/mo/PrivacyPage'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('privacy', 'en')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="privacy" lang="en" />
      <PrivacyPage lang="en" />
    </>
  )
}
