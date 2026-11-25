import PrivacyPage from '@/components/mo/PrivacyPage'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('privacy', 'tr')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="privacy" lang="tr" />
      <PrivacyPage lang="tr" />
    </>
  )
}
