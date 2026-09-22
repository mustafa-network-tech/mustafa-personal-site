import Link from 'next/link'
import { legalHref } from '@/lib/legal/apps'

export default function LegalShell({ app, current, children }) {
  return <main className="legal-page">
    <div className="legal-wrap">
      <Link className="legal-brand" href={legalHref(app.slug)}>{app.name} · Yasal Bilgiler</Link>
      <nav className="legal-nav" aria-label={`${app.name} yasal sayfaları`}>
        {app.documents.map((doc) => <Link key={doc.slug} aria-current={current === doc.slug ? 'page' : undefined} href={legalHref(app.slug, doc.slug)}>{doc.title}</Link>)}
      </nav>
      {children}
      <footer className="legal-contact">
        <strong>Destek ve başvurular</strong>
        <a href={`mailto:${app.email}`}>{app.email}</a>
      </footer>
    </div>
  </main>
}

