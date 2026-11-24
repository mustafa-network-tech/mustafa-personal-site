import { BookPage } from '@/components/mo/SubPages'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('book', 'en')

export default function Page() {
  return <BookPage lang="en" />
}
