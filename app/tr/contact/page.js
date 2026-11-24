import JsonLd from '@/components/JsonLd'
import { ContactPage } from '@/components/mo/SubPages'
import { pageMetadata } from '@/lib/mo/meta'
import { getBreadcrumbListSchema, getContactPageSchema } from '@/seo/schema'

export const metadata = pageMetadata('contact', 'tr')

const breadcrumbJson = getBreadcrumbListSchema([{ name: 'Ana sayfa', url: '/tr' }, { name: 'İletişim', url: '/tr/contact' }])

export default function Page() {
  return (
    <>
      <JsonLd data={[breadcrumbJson, getContactPageSchema('tr')]} />
      <ContactPage lang="tr" />
    </>
  )
}
