import fs from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'
import LegalShell from '@/components/legal/LegalShell'
import MarkdownDocument from '@/components/legal/MarkdownDocument'
import { getLegalApp, getLegalDocument, legalApps, legalHref } from '@/lib/legal/apps'

export function generateStaticParams() {
  return Object.values(legalApps).flatMap((app) => app.documents.map((doc) => ({ appSlug: app.slug, documentSlug: doc.slug })))
}

export function generateMetadata({ params }) {
  const app = getLegalApp(params.appSlug); const doc = getLegalDocument(app, params.documentSlug)
  if (!app || !doc) return {}
  const canonical = `https://mustafaoner.net${legalHref(app.slug, doc.slug)}`
  const title = `${doc.title} | ${app.name}`
  return { title, description: doc.summary, alternates: { canonical }, openGraph: { title, description: doc.summary, url: canonical, type: 'article' } }
}

export default async function LegalDocumentPage({ params }) {
  const app = getLegalApp(params.appSlug); const doc = getLegalDocument(app, params.documentSlug)
  if (!app || !doc) notFound()
  const source = await fs.readFile(path.join(process.cwd(), 'content', 'legal', app.slug, `${doc.slug}.md`), 'utf8')
  return <LegalShell app={app} current={doc.slug}><MarkdownDocument source={source} /></LegalShell>
}

