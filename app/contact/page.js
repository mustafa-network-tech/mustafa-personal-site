import JsonLd from '@/components/JsonLd'
import { ContactPage } from '@/components/mo/SubPages'
import { pageMetadata } from '@/lib/mo/meta'
import { getBreadcrumbListSchema, getContactPageSchema } from '@/seo/schema'

export const metadata = pageMetadata('contact', 'en')

const breadcrumbJson = getBreadcrumbListSchema([{ name: 'Home', url: '/en' }, { name: 'Contact', url: '/contact' }])

export default function Page() {
  return (
    <>
      <JsonLd data={[breadcrumbJson, getContactPageSchema('en')]} />
      <ContactPage lang="en" />
    </>
  )
}
