'use client'
import { useState } from 'react'
import Image from 'next/image'
import { MoLink, Reveal, SplitWords, ImageReveal, Parallax, ScrollWords } from '@/components/mo/motion'
import { Head } from '@/components/mo/SubPages'
import { Lightbox } from '@/components/mo/PhotoPage'
import { pageHref } from '@/lib/mo/site'
import { EXP, HERO_IMAGE, SECTION_IMAGES, GALLERY } from '@/lib/mo/professional'

export default function ExperiencePage({ lang = 'tr' }) {
  const c = EXP[lang]
  const [open, setOpen] = useState(-1)
  const list = GALLERY.map((g) => ({ src: g.src, w: g.w, h: g.h, alt: g.alt, caption: g.alt }))

  return (
    <div className="mo">
      <Head title={c.heroTitle} lead={c.heroLead} bg={HERO_IMAGE.src} bgPos={HERO_IMAGE.pos} fog />

      <section className="mo-sec"><div className="mo-wrap">
        <ScrollWords className="mo-statement" text={c.intro} />
      </div></section>

      <section className="mo-exp-list"><div className="mo-wrap">
        {c.sections.map((s) => {
          const img = SECTION_IMAGES[s.id]
          return (
            <article key={s.id} className="mo-proj mo-exp">
              <ImageReveal className="mo-proj-img">
                <Parallax className="h-full" amount={6}>
                  <div className="mo-fill">
                    <Image src={img.src} alt={s.alt} fill sizes="(min-width:900px) 50vw, 100vw" loading="lazy" style={{ objectPosition: img.pos }} />
                  </div>
                </Parallax>
              </ImageReveal>
              <div className="mo-proj-txt">
                <SplitWords as="h2" text={s.title} className="mo-proj-t" />
                <Reveal><p className="mo-body">{s.lead}</p></Reveal>
                <Reveal><ul className="mo-proj-feat">{s.items.map((it) => <li key={it}>{it}</li>)}</ul></Reveal>
              </div>
            </article>
          )
        })}
      </div></section>

      <section className="mo-sec mo-dark"><div className="mo-wrap mo-two">
        <div className="mo-sticky"><SplitWords text={c.bridgeTitle} className="mo-h2" /></div>
        <div className="grid content-center gap-10">
          <ScrollWords className="mo-big-p" text={c.bridge} />
          <Reveal><MoLink href={pageHref('projects', lang)} className="mo-link">{c.bridgeCta} <span aria-hidden="true">→</span></MoLink></Reveal>
        </div>
      </div></section>

      <section className="mo-sec"><div className="mo-wrap">
        <div className="mb-10 grid gap-4 md:mb-14">
          <SplitWords text={c.galleryTitle} className="mo-h2" />
          <Reveal><p className="mo-body" style={{ opacity: .6 }}>{c.galleryNote}</p></Reveal>
        </div>
        <div className="mo-egal">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 90} className={`mo-egal-i ${g.size}`}>
              <button type="button" className="mo-egal-b" onClick={() => setOpen(i)} aria-label={g.alt[lang]}>
                <Image src={g.src} alt={g.alt[lang]} width={g.w} height={g.h} sizes="(min-width:900px) 33vw, 100vw" loading="lazy" />
              </button>
            </Reveal>
          ))}
        </div>
      </div></section>

      {open >= 0 && <Lightbox list={list} index={open} lang={lang} onClose={() => setOpen(-1)} onIndex={setOpen} />}
    </div>
  )
}
