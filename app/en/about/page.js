import { AboutPage } from '@/components/mo/SubPages'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/mo/meta'
import { getProfilePageSchema } from '@/seo/schema'

export const metadata = pageMetadata('about', 'en')

export default function Page() {
  return (
    <>
      <JsonLd data={getProfilePageSchema({ locale: 'en', path: metadata.alternates.canonical, name: metadata.title, description: metadata.description })} />
      <AboutPage lang="en" />
    </>
  )
}
