// app/page.js – kök URL middleware ile /tr'ye yönlendirilir
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/tr')
}
