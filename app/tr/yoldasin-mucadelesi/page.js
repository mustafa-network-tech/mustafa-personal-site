import { BookPage } from '@/components/mo/SubPages'
import { pageMetadata } from '@/lib/mo/meta'

export const metadata = pageMetadata('book', 'tr')

export default function Page() {
  return <BookPage lang="tr" />
}
