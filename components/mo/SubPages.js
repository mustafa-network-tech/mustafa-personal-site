'use client'
import Image from 'next/image'
import { MoLink, Reveal, SplitWords, ImageReveal, Parallax, ScrollWords } from '@/components/mo/motion'
import { pageHref, MK_DIGITAL, EMAIL, LINKEDIN, INSTAGRAM } from '@/lib/mo/site'
import { PROJECTS } from '@/lib/mo/projects'
import { PHOTOS } from '@/lib/mo/photos'
import { BOOK } from '@/content/book'

function Head({ kicker, title, lead }) {
  return (
    <section className="mo-head"><div className="mo-wrap">
      <span className="mo-kicker mo-rise" style={{ '--d': '0ms' }}>{kicker}</span>
      <SplitWords hero as="h1" text={title} className="mo-h1" />
      {lead && <p className="mo-lead mo-rise" style={{ '--d': '500ms' }}>{lead}</p>}
    </div></section>
  )
}

const pick = (k) => PHOTOS.find((p) => p.src.includes(k))

/* ---------------- Hakkımda ---------------- */
const ABOUT = {
  tr: {
    kicker: 'Hakkımda', title: 'Hakkımda', lead: 'Yazılım ve dijital sistemler üzerine çalışıyorum. Bunun yanında fotoğraf çekiyorum.',
    story: 'Çanakkale ve Bolu merkezli çalışıyorum. Teknik altyapı, saha deneyimi ve yazılım bir araya geldiğinde işlerin nasıl daha sade yürüyebildiğiyle ilgileniyorum.',
    photoKicker: 'Fotoğraf', photoText: 'Fotoğraf ise bana yavaşlamayı ve bakmayı hatırlatan ikinci alanım.', photoLead: 'Sakladığım anlar — bir his, bir mekân, bir an.', photoCta: 'Fotoğraf, Gezi ve Doğa',
    softKicker: 'Yazılım ve dijital sistemler', softBody: 'MK Digital Systems ile birlikte çalışıyorum; MK OPS ve diğer dijital sistemlerin geliştirilmesine katkı veriyorum. Ürünlerin ayrıntıları, kapsamı ve iletişim bilgileri resmî sitelerinde yer alıyor.', softLink: 'MK Digital Systems’ı ziyaret et', projCta: 'Projelerim',
    princKicker: 'Çalışma ilkeleri', princ: ['Önce problem anlaşılır, sonra çözülür.', 'Teknik detaylar büyük resimden asla ayrılmaz.', 'Dokümantasyon bir projenin uzun vadeli hafızasıdır.', 'Test güvenin tek gerçek kaynağıdır.'],
    quote: 'Büyük iş doğru sorularla başlar. Doğru soruları da teknik derinlik ve gerçek dünya deneyimi şekillendirir.',
  },
  en: {
    kicker: 'About', title: 'About', lead: 'I work on software and digital systems. I also take photographs.',
    story: 'I work from Çanakkale and Bolu. I am interested in how work can run more simply when technical infrastructure, field experience and software come together.',
    photoKicker: 'Photography', photoText: 'Photography is my second field; it reminds me to slow down and look.', photoLead: 'Moments I keep — a feeling, a place, an instant.', photoCta: 'Photography, Travel & Nature',
    softKicker: 'Software and digital systems', softBody: 'I work with MK Digital Systems and contribute to the development of MK OPS and other digital systems. Product details, scope and business contact information are on their official sites.', softLink: 'Visit MK Digital Systems', projCta: 'Projects',
    princKicker: 'Working principles', princ: ['A problem is understood first, then solved.', 'Technical details are never separated from the bigger picture.', 'Documentation is the long-term memory of a project.', 'Testing is the only real source of trust.'],
    quote: 'Great work starts with the right questions. And the right questions are shaped by technical depth and real-world experience.',
  },
}

export function AboutPage({ lang = 'tr' }) {
  const c = ABOUT[lang]
  const ph1 = pick('nature4'), ph2 = pick('nature7')
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={c.title} lead={c.lead} />
      <section className="mo-sec"><div className="mo-wrap mo-two">
        <ImageReveal className="mo-tall"><Parallax className="h-full" amount={6}><div className="mo-fill"><Image src={ph1.src} alt={ph1.alt[lang]} fill sizes="(min-width:900px) 40vw, 100vw" /></div></Parallax></ImageReveal>
        <div className="grid content-center gap-10">
          <ScrollWords className="mo-big-p" text={c.story} />
          <Reveal><p className="mo-body">{c.softBody}</p></Reveal>
          <Reveal><a className="mo-link" href={MK_DIGITAL + '/' + lang} target="_blank" rel="noopener noreferrer">{c.softLink} <span aria-hidden="true">↗</span></a></Reveal>
        </div>
      </div></section>

      <section className="mo-sec mo-dark"><div className="mo-wrap mo-two">
        <div className="mo-sticky"><span className="mo-kicker mb-6">{c.photoKicker}</span><SplitWords text={c.photoText} className="mo-h2" /></div>
        <div className="grid gap-8">
          <ImageReveal className="mo-wide"><Parallax className="h-full" amount={6}><div className="mo-fill"><Image src={ph2.src} alt={ph2.alt[lang]} fill sizes="(min-width:900px) 55vw, 100vw" loading="lazy" /></div></Parallax></ImageReveal>
          <Reveal><p className="mo-body">{c.photoLead}</p></Reveal>
          <Reveal><MoLink href={pageHref('photo', lang)} className="mo-link">{c.photoCta} <span aria-hidden="true">→</span></MoLink></Reveal>
        </div>
      </div></section>

      <section className="mo-sec"><div className="mo-wrap mo-two">
        <div className="mo-sticky"><span className="mo-kicker mb-6">{c.princKicker}</span></div>
        <div className="grid gap-12">
          <ul className="mo-prin" style={{ borderColor: 'rgba(16,21,15,.2)' }}>
            {c.princ.map((x, i) => <Reveal as="li" key={i} delay={i * 60} style={{ borderColor: 'rgba(16,21,15,.2)' }}>{x}</Reveal>)}
          </ul>
          <ScrollWords className="mo-quote" text={`“${c.quote}”`} />
        </div>
      </div></section>
    </div>
  )
}

/* ---------------- Projelerim ---------------- */
const PROJ = {
  tr: { kicker: 'Projelerim', title: 'Projelerim', lead: 'Birlikte çalıştığım ve geliştirdiğim sistemlerden kısa bir seçki. Ayrıntılar resmî sayfalarında.', visit: 'Resmî sayfa', note: 'Ürünlerin ayrıntıları, kapsamı ve iletişim bilgileri resmî sitelerinde yer alıyor.', mk: 'MK Digital Systems’ı ziyaret et', purpose: 'Amaç' },
  en: { kicker: 'Projects', title: 'Projects', lead: 'A short selection of the systems I work on. Details are on their official pages.', visit: 'Official page', note: 'Product details, scope and business contact information are on their official sites.', mk: 'Visit MK Digital Systems', purpose: 'Purpose' },
}

export function ProjectsPage({ lang = 'tr' }) {
  const c = PROJ[lang]
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={c.title} lead={c.lead} />
      <section className="mo-sec"><div className="mo-wrap">
        {PROJECTS.map((p) => (
          <article key={p.id} className="mo-proj">
            <div className="mo-proj-txt">
              <SplitWords as="h2" text={p.name} className="mo-proj-t" />
              <Reveal><p className="text-lg font-semibold">{p.desc[lang]}</p></Reveal>
              <Reveal><p className="mo-body" style={{ opacity: .72 }}>{p.purpose[lang]}</p></Reveal>
              <Reveal><a className="mo-link" href={p.href[lang]} target="_blank" rel="noopener noreferrer">{c.visit} — {p.name} <span aria-hidden="true">↗</span></a></Reveal>
            </div>
            <ImageReveal className="mo-proj-img">
              <div className="mo-fill">
                {p.remote
                  ? <img src={p.image} alt={`${p.name}`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Image src={p.image} alt={p.name} fill sizes="(min-width:900px) 45vw, 100vw" loading="lazy" />}
              </div>
            </ImageReveal>
          </article>
        ))}
        <div className="mt-16 border-t pt-10" style={{ borderColor: 'rgba(16,21,15,.2)' }}>
          <Reveal><p className="mo-body mb-6">{c.note}</p><a className="mo-link" href={MK_DIGITAL + '/' + lang} target="_blank" rel="noopener noreferrer">{c.mk} <span aria-hidden="true">↗</span></a></Reveal>
        </div>
      </div></section>
    </div>
  )
}

/* ---------------- Yoldaşın Mücadelesi ---------------- */
const BK = {
  tr: { kicker: 'Kitap', soon: 'Kitap hakkındaki ayrıntılar yakında burada paylaşılacak.', author: 'Yazar hakkında', quotes: 'Kitaptan alıntılar', pub: 'Yayın ve erişim', access: 'Kitaba ulaş' },
  en: { kicker: 'Book', soon: 'Details about the book will be shared here soon.', author: 'About the author', quotes: 'Excerpts', pub: 'Publication and access', access: 'Get the book' },
}

export function BookPage({ lang = 'tr' }) {
  const c = BK[lang]
  const blurb = BOOK.blurb[lang] || BOOK.blurb.tr
  const paras = blurb ? (Array.isArray(blurb) ? blurb : [blurb]) : []
  const author = BOOK.authorNote[lang] || BOOK.authorNote.tr
  const pub = BOOK.publication[lang] || BOOK.publication.tr
  const hasAny = paras.length || author || pub || BOOK.quotes.length
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={BOOK.title} />
      <section className="mo-sec"><div className="mo-wrap mo-two">
        <Reveal>
          {BOOK.cover
            ? <Image src={BOOK.cover} alt={BOOK.title} width={BOOK.coverSize?.w || 1200} height={BOOK.coverSize?.h || 1800} sizes="(min-width:900px) 40vw, 90vw" style={{ width: '100%', height: 'auto', maxWidth: '26rem' }} priority />
            : <div className="mo-cover" aria-hidden="true"><span className="mo-kicker">Mustafa Öner</span><b>Yoldaşın<span>Mücadelesi</span></b></div>}
        </Reveal>
        <div className="grid content-start gap-12">
          {paras.map((t, i) => <Reveal key={i}><p className="mo-big-p">{t}</p></Reveal>)}
          {author && <Reveal><span className="mo-kicker mb-4">{c.author}</span><p className="mo-body">{author}</p></Reveal>}
          {BOOK.quotes.length > 0 && <div><span className="mo-kicker mb-6">{c.quotes}</span>{BOOK.quotes.map((q, i) => <Reveal key={i}><blockquote className="mo-quote mb-8">“{q[lang] || q.tr}”</blockquote></Reveal>)}</div>}
          {pub && <Reveal><span className="mo-kicker mb-4">{c.pub}</span><p className="mo-body">{pub}</p></Reveal>}
          {BOOK.accessUrl && <Reveal><a className="mo-link" href={BOOK.accessUrl} target="_blank" rel="noopener noreferrer">{c.access} <span aria-hidden="true">↗</span></a></Reveal>}
          {!hasAny && <Reveal><p className="mo-note">{c.soon}</p></Reveal>}
        </div>
      </div></section>
    </div>
  )
}

/* ---------------- İletişim ---------------- */
const CT = {
  tr: { kicker: 'İletişim', title: 'İletişim', lead: 'Tanışmak, iş birliği ya da kısa bir mesaj için e-posta veya LinkedIn üzerinden ulaşabilirsiniz.', mail: 'E-posta', elsewhere: 'Diğer' },
  en: { kicker: 'Contact', title: 'Contact', lead: 'For an introduction, a collaboration or a short message, reach me by email or on LinkedIn.', mail: 'Email', elsewhere: 'Elsewhere' },
}

export function ContactPage({ lang = 'tr' }) {
  const c = CT[lang]
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={c.title} lead={c.lead} />
      <section className="mo-sec"><div className="mo-wrap grid gap-14">
        <Reveal><span className="mo-kicker mb-5">{c.mail}</span><a className="mo-contact-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a></Reveal>
        <Reveal><span className="mo-kicker mb-5">{c.elsewhere}</span>
          <ul className="grid gap-3">
            <li><a className="mo-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></li>
            <li><a className="mo-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram — @mavi_kadraj14 <span aria-hidden="true">↗</span></a></li>
          </ul>
        </Reveal>
      </div></section>
    </div>
  )
}
