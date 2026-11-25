import { Head } from '@/components/mo/SubPages'
import { PRIVACY, PRIVACY_UPDATED } from '@/lib/mo/privacy'
import { legalApps, LEGAL_BASE } from '@/lib/legal/apps'

export default function PrivacyPage({ lang = 'tr' }) {
  const c = PRIVACY[lang]
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={c.title} lead={c.lead} variant="paper" />
      <section className="mo-sec"><div className="mo-wrap">
        <article className="mo-prose">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p && s.p.map((t, i) => <p key={i}>{t}</p>)}
              {s.ul && <ul>{s.ul.map((t, i) => <li key={i}>{t}</li>)}</ul>}
              {s.apps && (
                <ul className="mo-prose-apps">
                  {Object.values(legalApps).map((a) => (
                    <li key={a.slug}><a href={`${LEGAL_BASE}/${a.slug}`}>{a.name} <span aria-hidden="true">→</span></a></li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="mo-prose-date">{c.updated}: {PRIVACY_UPDATED[lang]}</p>
        </article>
      </div></section>
    </div>
  )
}
