import { BookPage } from '@/components/mo/SubPages'
import PageJsonLd from '@/components/mo/PageJsonLd'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('book', 'en')

export default function Page() {
  return (
    <>
      <PageJsonLd pageKey="book" lang="en" />
      <BookPage lang="en" />
    </>
  )
}
