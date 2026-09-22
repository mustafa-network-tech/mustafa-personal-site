import { notFound } from 'next/navigation'
import Link from 'next/link'
import LegalShell from '@/components/legal/LegalShell'
import { getLegalApp, legalApps, legalHref } from '@/lib/legal/apps'

export function generateStaticParams() { return Object.keys(legalApps).map((appSlug) => ({ appSlug })) }

export function generateMetadata({ params }) {
  const app = getLegalApp(params.appSlug)
  if (!app) return {}
  const canonical = `https://mustafaoner.net${legalHref(app.slug)}`
  const title = `${app.name} | KVKK, Gizlilik ve Yasal Bilgiler`
  const description = `${app.name} gizlilik politikası, kullanım şartları, hesap silme, çocuk güvenliği ve destek sayfaları.`
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: 'website' } }
}

export default function LegalHub({ params }) {
  const app = getLegalApp(params.appSlug)
  if (!app) notFound()
  return <LegalShell app={app}>
    <header className="legal-hero">
      <p className="legal-kicker">Uygulama yasal merkezi</p>
      <h1>{app.name}</h1>
      <p>Gizlilik, veri işleme, hesap silme, güvenli kullanım ve destek bilgilerine doğrudan erişin.</p>
      <dl><div><dt>Geliştirici ve yayıncı</dt><dd>{app.publisher}</dd></div><div><dt>Android paket kimliği</dt><dd><code>{app.packageId}</code></dd></div><div><dt>Son güncelleme</dt><dd>{app.updatedAt}</dd></div><div><dt>Destek</dt><dd><a href={`mailto:${app.email}`}>{app.email}</a></dd></div></dl>
    </header>
    <section className="legal-card-grid" aria-label="Yasal belgeler">
      {app.documents.map((doc) => <Link className="legal-card" key={doc.slug} href={legalHref(app.slug, doc.slug)}><span>{doc.title}</span><p>{doc.summary}</p><small>Belgeyi aç →</small></Link>)}
    </section>
  </LegalShell>
}

