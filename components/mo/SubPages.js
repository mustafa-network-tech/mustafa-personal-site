'use client'
import { useState } from 'react'
import Image from 'next/image'
import { MoLink, Reveal, SplitWords, ImageReveal, Parallax, ScrollWords } from '@/components/mo/motion'
import { pageHref, MK_DIGITAL, EMAIL, LINKEDIN, INSTAGRAM } from '@/lib/mo/site'
import { PROJECTS } from '@/lib/mo/projects'
import { PHOTOS, HOME_PHOTOS } from '@/lib/mo/photos'
import { ABOUT_MORE, ABOUT_IMAGES } from '@/lib/mo/about'
import { BOOK } from '@/content/book'

export function Head({ kicker, title, lead, bg, bgPos, fog, variant }) {
  return (
    <section className={bg ? `mo-head mo-head-bg${variant ? ' mo-head-' + variant : ''}` : `mo-head${variant ? ' mo-head-' + variant : ''}`}>
      {bg && <><Image src={bg} alt="" fill priority sizes="100vw" className="mo-head-img" style={bgPos ? { objectPosition: bgPos } : undefined} /><span className="mo-head-shade" aria-hidden="true" />{fog && <span className="mo-head-fog" aria-hidden="true" />}</>}
      <div className="mo-wrap mo-head-in">
      {bg ? (
        <>
          <h1 className="mo-h1 mo-hand mo-rise" style={{ '--d': '0ms' }}>{title}</h1>
          {lead && <p className="mo-lead mo-hand-lead mo-rise" style={{ '--d': '450ms' }}>{lead}</p>}
        </>
      ) : (
        <>
          <span className="mo-kicker mo-rise" style={{ '--d': '0ms' }}>{kicker}</span>
          <SplitWords hero as="h1" text={title} className="mo-h1" />
          {lead && <p className="mo-lead mo-rise" style={{ '--d': '500ms' }}>{lead}</p>}
        </>
      )}
    </div></section>
  )
}

const pick = (k) => PHOTOS.find((p) => p.src.includes(k))

/* ---------------- Hakkımda ---------------- */
const ABOUT = {
  tr: {
    kicker: 'Hakkımda', title: 'Hakkımda', lead: 'Yazılım ve dijital sistemler üzerine çalışıyorum. Bunun yanında fotoğraf çekiyorum.',
    story: "Hayatı tek bir alana sığdırmayı hiçbir zaman istemedim. Bir yanım teknolojide, bir yanım doğada, bir yanım ise kelimelerin dünyasında. Öğrenerek, üreterek ve keşfederek kendi yolumu çiziyorum.",
    photoKicker: 'Fotoğraf', photoText: 'Fotoğraf ise bana yavaşlamayı ve bakmayı hatırlatan ikinci alanım.', photoLead: 'Sakladığım anlar — bir his, bir mekân, bir an.', photoCta: 'Mustafa’nın Kadrajından',
    softKicker: 'Yazılım ve dijital sistemler', softBody: "Osmaniye'den Bolu'ya, Bolu'dan Çanakkale'ye uzanan yaşam yolculuğumda farklı şehirler, insanlar ve deneyimler biriktirdim. Mesleki hayatımda fiber optik ve telekomünikasyon altyapılarıyla ilgilenirken, dijital dünyada yazılım projeleri geliştiriyorum.", softBody2: "Fotoğrafçılık, doğa, seyahat, edebiyat ve türküler ise hayatımın vazgeçilmez parçaları. Benim için üretmek yalnızca bir meslek değil, hayata karşı bir duruş biçimi.", softLink: 'MK Digital Systems’ı ziyaret et', projCta: 'Projelerim',
    princKicker: 'Çalışma ilkeleri', princ: ['Önce problem anlaşılır, sonra çözülür.', 'Teknik detaylar büyük resimden asla ayrılmaz.', 'Dokümantasyon bir projenin uzun vadeli hafızasıdır.', 'Test güvenin tek gerçek kaynağıdır.'],
    quote: 'Büyük iş doğru sorularla başlar. Doğru soruları da teknik derinlik ve gerçek dünya deneyimi şekillendirir.',
  },
  en: {
    kicker: 'About', title: 'About', lead: 'I work on software and digital systems. I also take photographs.',
    story: "I never wanted to fit life into a single field. One side of me is in technology, one in nature, and one in the world of words. By learning, creating and exploring, I draw my own path.",
    photoKicker: 'Photography', photoText: 'Photography is my second field; it reminds me to slow down and look.', photoLead: 'Moments I keep — a feeling, a place, an instant.', photoCta: 'Through Mustafa’s Lens',
    softKicker: 'Software and digital systems', softBody: "On my life’s journey from Osmaniye to Bolu and from Bolu to Çanakkale, I have gathered different cities, people and experiences. In my professional life I work with fiber optic and telecommunications infrastructure, and in the digital world I develop software projects.", softBody2: "Photography, nature, travel, literature and folk songs are indispensable parts of my life. For me, creating is not just a profession; it is a way of standing toward life.", softLink: 'Visit MK Digital Systems', projCta: 'Projects',
    princKicker: 'Working principles', princ: ['A problem is understood first, then solved.', 'Technical details are never separated from the bigger picture.', 'Documentation is the long-term memory of a project.', 'Testing is the only real source of trust.'],
    quote: 'Great work starts with the right questions. And the right questions are shaped by technical depth and real-world experience.',
  },
}

export function AboutPage({ lang = 'tr' }) {
  const c = ABOUT[lang]
  const x = ABOUT_MORE[lang]
  const ph1 = pick('nature4'), ph2 = pick('nature7')
  const heroPhoto = HOME_PHOTOS[1] || ph1
  const emek = ABOUT_IMAGES.emek, saz = ABOUT_IMAGES.enstruman, kitap = ABOUT_IMAGES.kitaplar
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={c.title} lead={c.lead} bg={heroPhoto.src} bgPos="50% 60%" fog />

      {/* Ben kimim */}
      <section className="mo-sec"><div className="mo-wrap mo-two">
        <ImageReveal className="mo-tall"><Parallax className="h-full" amount={6}><div className="mo-fill"><Image src={ph1.src} alt={ph1.alt[lang]} fill sizes="(min-width:900px) 40vw, 100vw" /></div></Parallax></ImageReveal>
        <div className="grid content-center gap-10">
          <ScrollWords className="mo-big-p" text={c.story} />
          <Reveal delay={150}><p className="mo-body">{c.softBody}</p></Reveal>
          <Reveal delay={300}><p className="mo-body">{c.softBody2}</p></Reveal>
        </div>
      </div></section>

      {/* Objektifimden hayat */}
      <section className="mo-sec mo-dark"><div className="mo-wrap mo-two">
        <div className="mo-sticky">
          <Reveal><span className="mo-kicker mb-6">{x.lens.kicker}</span></Reveal>
          <SplitWords text={x.lens.title} className="mo-h2 mo-h2-m" />
        </div>
        <div className="grid gap-8">
          <ImageReveal className="mo-wide mo-round"><Parallax className="h-full" amount={6}><div className="mo-fill"><Image src={ph2.src} alt={ph2.alt[lang]} fill sizes="(min-width:900px) 55vw, 100vw" loading="lazy" /></div></Parallax></ImageReveal>
          <Reveal><p className="mo-body">{x.lens.body}</p></Reveal>
          <Reveal><MoLink href={pageHref('photo', lang)} className="mo-link">{x.lens.cta} <span aria-hidden="true">→</span></MoLink></Reveal>
        </div>
      </div></section>

      {/* Emek ve teknoloji */}
      <section className="mo-sec"><div className="mo-wrap">
        <ImageReveal className="mo-band mo-round"><Parallax className="h-full" amount={7}><div className="mo-fill"><Image src={emek.src} alt={emek.alt[lang]} fill sizes="100vw" loading="lazy" style={{ objectPosition: emek.pos }} /></div></Parallax></ImageReveal>
        <div className="mo-two mt-12 md:mt-20">
          <SplitWords text={x.work.title} className="mo-h2 mo-h2-m" />
          <div className="grid gap-6">
            <Reveal><p className="mo-body">{x.work.body}</p></Reveal>
            <Reveal><p className="mo-body">{x.work.body2}</p></Reveal>
            <Reveal className="flex flex-wrap gap-x-8 gap-y-4">
              <MoLink href={pageHref('experience', lang)} className="mo-link">{x.work.ctaExp} <span aria-hidden="true">→</span></MoLink>
              <MoLink href={pageHref('projects', lang)} className="mo-link">{x.work.ctaProj} <span aria-hidden="true">→</span></MoLink>
            </Reveal>
          </div>
        </div>
      </div></section>

      {/* Kelimelerin dünyası */}
      <section className="mo-sec mo-dark mo-warm"><div className="mo-wrap">
        <ImageReveal className="mo-band mo-round"><Parallax className="h-full" amount={7}><div className="mo-fill"><Image src={kitap.src} alt={kitap.alt[lang]} fill sizes="100vw" loading="lazy" style={{ objectPosition: kitap.pos }} /></div></Parallax></ImageReveal>
        <div className="mo-two mo-two-rev mt-12 md:mt-20">
          <ImageReveal className="mo-tall mo-round"><Parallax className="h-full" amount={6}><div className="mo-fill"><Image src={saz.src} alt={saz.alt[lang]} fill sizes="(min-width:900px) 40vw, 100vw" loading="lazy" style={{ objectPosition: saz.pos }} /></div></Parallax></ImageReveal>
          <div className="grid content-center gap-8">
            <SplitWords text={x.words.title} className="mo-h2 mo-h2-m" />
            <Reveal><p className="mo-body">{x.words.body}</p></Reveal>
            <Reveal><p className="mo-hand-line">{x.words.hand}</p></Reveal>
            <Reveal><MoLink href={pageHref('book', lang)} className="mo-link">{x.words.cta} <span aria-hidden="true">→</span></MoLink></Reveal>
          </div>
        </div>
      </div></section>

      {/* Hayata bakışım */}
      <section className="mo-view"><div className="mo-wrap">
        <ScrollWords className="mo-view-t" text={x.view.text} />
        <Reveal className="mo-sigblock">
          <span className="mo-sigtext" aria-label={x.view.sign}>{x.view.sign}</span>
          <i className="mo-sigline" aria-hidden="true" />
        </Reveal>
      </div></section>
    </div>
  )
}

/* ---------------- Projelerim ---------------- */
const PROJ = {
  tr: { kicker: 'Projelerim', title: 'Projelerim', lead: 'Birlikte çalıştığım ve geliştirdiğim sistemlerden kısa bir seçki. Ayrıntılar resmî sayfalarında.', visit: 'Web sitesini ziyaret et', note: 'Ürünlerin ayrıntıları, kapsamı ve iletişim bilgileri resmî sitelerinde yer alıyor.', mk: 'MK Digital Systems’ı ziyaret et', purpose: 'Amaç' },
  en: { kicker: 'Projects', title: 'Projects', lead: 'A short selection of the systems I work on. Details are on their official pages.', visit: 'Visit website', note: 'Product details, scope and business contact information are on their official sites.', mk: 'Visit MK Digital Systems', purpose: 'Purpose' },
}

export function ProjectsPage({ lang = 'tr' }) {
  const c = PROJ[lang]
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={c.title} lead={c.lead} bg="/images/hero-slide-2.jpeg" />
      <section className="mo-sec"><div className="mo-wrap">
        {PROJECTS.map((p) => (
          <article key={p.id} className="mo-proj">
            <ImageReveal className="mo-proj-img" style={p.bg ? { background: p.bg } : undefined}>
              <div className={p.fit === 'contain' ? 'mo-fill mo-fit-contain' : 'mo-fill'}>
                {p.remote
                  ? <img src={p.image} alt={`${p.name}`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Image src={p.image} alt={p.name} fill sizes="(min-width:900px) 50vw, 100vw" loading="lazy" />}
              </div>
            </ImageReveal>
            <div className="mo-proj-txt">
              <Reveal><span className="mo-kicker">{p.category[lang]}</span></Reveal>
              <SplitWords as="h2" text={p.name} className="mo-proj-t" />
              <Reveal><p className="mo-body">{p.purpose[lang]}</p></Reveal>
              {p.features && (
                <Reveal><ul className="mo-proj-feat">{p.features[lang].map((f) => <li key={f}>{f}</li>)}</ul></Reveal>
              )}
              <Reveal><a className="mo-link" href={p.href[lang]} target="_blank" rel="noopener noreferrer">{c.visit} <span aria-hidden="true">↗</span></a></Reveal>
            </div>
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
  tr: { kicker: 'Kitap', lead: 'Hayatın bütün zorluklarına rağmen kendi yolunu çizmenin, emeğin, umudun ve yeniden başlamanın hikâyesi.', soon: 'Kitap hakkındaki ayrıntılar yakında burada paylaşılacak.', author: 'Yazar hakkında', quotes: 'Kitaptan alıntılar', pub: 'Yayın ve erişim', access: 'Kitaba ulaş' },
  en: { kicker: 'Book', lead: 'The story of drawing your own path, of labour, hope and starting over, in spite of all of life’s hardships.', soon: 'Details about the book will be shared here soon.', author: 'About the author', quotes: 'Excerpts', pub: 'Publication and access', access: 'Get the book' },
}

export function BookPage({ lang = 'tr' }) {
  const c = BK[lang]
  const [open, setOpen] = useState(false)
  const fw = BOOK.foreword[lang] || BOOK.foreword.tr
  const author = BOOK.authorNote[lang] || BOOK.authorNote.tr
  const pub = BOOK.publication[lang] || BOOK.publication.tr
  const hasAny = fw || author || pub || BOOK.quotes.length
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={BOOK.title} lead={c.lead} bg="/images/yoldasin-mucadelesi-hero.jpg" bgPos="38% 55%" fog />
      <section className="mo-sec"><div className="mo-wrap mo-two">
        <Reveal>
          <Image src={BOOK.cover} alt={BOOK.title} width={BOOK.coverSize.w} height={BOOK.coverSize.h} sizes="(min-width:900px) 40vw, 90vw" style={{ width: '100%', height: 'auto', maxWidth: '26rem' }} priority />
        </Reveal>
        <div className="grid content-start gap-12">
          {fw && (
            <div>
              <Reveal><span className="mo-kicker mb-6">{fw.heading}</span></Reveal>
              <div className="grid gap-5">
                {fw.intro.map((t, i) => <Reveal key={i}><p className="mo-big-p">{t}</p></Reveal>)}
              </div>
              <div id="mo-foreword-rest" className="mo-more" data-open={open ? 'true' : 'false'}>
                <div className="mo-more-in">
                  <div className="grid gap-5 pt-8">
                    {fw.rest.map((t, i) => <p key={i} className={t === 'Devam et.' ? 'mo-big-p' : 'mo-body'}>{t}</p>)}
                    <p className="mo-sign-off">{fw.signature}</p>
                  </div>
                </div>
              </div>
              <button type="button" className="mo-link mt-8" aria-expanded={open} aria-controls="mo-foreword-rest" onClick={() => setOpen((v) => !v)}>
                {open ? fw.less : fw.more} <span aria-hidden="true">{open ? '↑' : '↓'}</span>
              </button>
            </div>
          )}
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
  tr: { kicker: 'İletişim', title: 'İletişim', lead: 'Posta güvercini de olur ama e-posta biraz daha hızlı.', mail: 'E-posta', elsewhere: 'Diğer' },
  en: { kicker: 'Contact', title: 'Contact', lead: 'A carrier pigeon would do, but email is a little faster.', mail: 'Email', elsewhere: 'Elsewhere' },
}

export function ContactPage({ lang = 'tr' }) {
  const c = CT[lang]
  return (
    <div className="mo">
      <Head kicker={c.kicker} title={c.title} lead={c.lead} bg="/images/contact-hero.jpg" bgPos="50% 55%" fog variant="contact" />
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
