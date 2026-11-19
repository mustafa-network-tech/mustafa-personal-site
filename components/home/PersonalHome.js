'use client'
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import PhotographyMarquee from '@/components/PhotographyMarquee'
import InstagramSection from '@/components/InstagramSection'

const MK_DIGITAL = 'https://www.mk-digitalsystems.com'
const EMAIL = 'iletisim@mk-digitalsystems.com'
const LINKEDIN = 'https://www.linkedin.com/in/mustafa-oner-/'

const COPY = {
  tr: {
    eyebrow: 'KİŞİSEL SİTE',
    place: 'ÇANAKKALE — BOLU · TR',
    intro: 'Yazılım ve dijital sistemler üzerine çalışıyorum. Bunun yanında fotoğraf çekiyorum.',
    aboutTitle: 'Hakkımda',
    aboutBody: 'Çanakkale ve Bolu merkezli çalışıyorum. Teknik altyapı, saha deneyimi ve yazılım bir araya geldiğinde işlerin nasıl daha sade yürüyebildiğiyle ilgileniyorum. Fotoğraf ise bana yavaşlamayı ve bakmayı hatırlatan ikinci alanım.',
    softTitle: 'Yazılım ve dijital sistemler',
    softBody: 'MK Digital Systems ile birlikte çalışıyorum; MK OPS ve diğer dijital sistemlerin geliştirilmesine katkı veriyorum. Ürünlerin ayrıntıları, kapsamı ve iletişim bilgileri resmî sitelerinde yer alıyor.',
    softLink: 'MK Digital Systems’ı ziyaret et',
    prodTitle: 'Ürettiklerim',
    prodLead: 'Birlikte çalıştığım ve geliştirdiğim sistemlerden kısa bir seçki. Ayrıntılar resmî sayfalarında.',
    visit: 'Resmî sayfa',
    photoTitle: 'Mustafa’nın Kadrajından',
    photoLead: 'Sakladığım anlar — bir his, bir mekân, bir an.',
    princTitle: 'Çalışma ilkeleri',
    princItems: ['Önce problem anlaşılır, sonra çözülür.', 'Teknik detaylar büyük resimden asla ayrılmaz.', 'Dokümantasyon bir projenin uzun vadeli hafızasıdır.', 'Test güvenin tek gerçek kaynağıdır.'],
    princQuote: 'Büyük iş doğru sorularla başlar. Doğru soruları da teknik derinlik ve gerçek dünya deneyimi şekillendirir.',
    contactTitle: 'İletişim',
    contactBody: 'Tanışmak, iş birliği ya da kısa bir mesaj için e-posta veya LinkedIn üzerinden ulaşabilirsiniz.',
    products: [
      ['MK Digital Systems', 'Şirket ve dijital sistemler', MK_DIGITAL + '/tr'],
      ['MK OPS', 'Şantiye ve saha operasyon yönetimi', 'https://www.mk-ops.tr'],
      ['MK Farm', 'Tarım ve hayvancılık işletme yönetimi', MK_DIGITAL + '/tr/mk-farm'],
      ['MK Adisyon', 'Mobil işletme ve adisyon uygulaması', MK_DIGITAL + '/tr/mk-adisyon'],
      ['Bebeğimin İlk Yılı', 'Dijital hatıra uygulaması', MK_DIGITAL + '/tr/bebegimin-ilk-yili'],
    ],
  },
  en: {
    eyebrow: 'PERSONAL SITE',
    place: 'ÇANAKKALE — BOLU · TR',
    intro: 'I work on software and digital systems. I also take photographs.',
    aboutTitle: 'About',
    aboutBody: 'I work from Çanakkale and Bolu. I am interested in how work can run more simply when technical infrastructure, field experience and software come together. Photography is my second field; it reminds me to slow down and look.',
    softTitle: 'Software and digital systems',
    softBody: 'I work with MK Digital Systems and contribute to the development of MK OPS and other digital systems. Product details, scope and business contact information are on their official sites.',
    softLink: 'Visit MK Digital Systems',
    prodTitle: 'What I make',
    prodLead: 'A short selection of the systems I work on. Details are on their official pages.',
    visit: 'Official page',
    photoTitle: 'Through Mustafa’s Lens',
    photoLead: 'Moments I keep — a feeling, a place, an instant.',
    princTitle: 'Working principles',
    princItems: ['A problem is understood first, then solved.', 'Technical details are never separated from the bigger picture.', 'Documentation is the long-term memory of a project.', 'Testing is the only real source of trust.'],
    princQuote: 'Great work starts with the right questions. And the right questions are shaped by technical depth and real-world experience.',
    contactTitle: 'Contact',
    contactBody: 'For an introduction, a collaboration or a short message, reach me by email or on LinkedIn.',
    products: [
      ['MK Digital Systems', 'Company and digital systems', MK_DIGITAL + '/en'],
      ['MK OPS', 'Construction and field operations management (Turkish site)', 'https://www.mk-ops.tr'],
      ['MK Farm', 'Farm and livestock business management', MK_DIGITAL + '/en/work/mk-farm'],
      ['MK Adisyon', 'Mobile business and order management app', MK_DIGITAL + '/en/work/mk-adisyon'],
      ['Bebeğimin İlk Yılı', 'Digital keepsake app (Turkish page)', MK_DIGITAL + '/tr/bebegimin-ilk-yili'],
    ],
  },
}

function Heading({ title, lead, dark }) {
  return <div className="mb-12 md:mb-16"><h2 className="studio-display text-4xl tracking-[-.05em] md:text-6xl">{title}</h2>{lead && <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${dark ? 'text-white/55' : 'text-black/55'}`}>{lead}</p>}</div>
}

export default function PersonalHome() {
  const { language } = useLanguage()
  const c = COPY[language] || COPY.tr
  return <div className="studio-site">
    <section id="intro" className="studio-hero"><div className="studio-grid-bg" /><div className="studio-shell relative z-10 flex min-h-[calc(100svh-72px)] flex-col justify-between py-10 md:py-16">
      <div className="flex justify-between text-[10px] tracking-[.22em] text-white/60 md:text-xs"><span>{c.eyebrow}</span><span>{c.place}</span></div>
      <h1 className="studio-display text-[clamp(3.2rem,11vw,10rem)] leading-[.85] tracking-[-.07em] text-white">MUSTAFA<br /><span className="text-stroke">ÖNER</span></h1>
      <p className="max-w-2xl border-t border-white/25 pt-7 text-lg leading-relaxed text-white/80 md:text-xl">{c.intro}</p>
    </div></section>

    <section id="about" className="studio-section bg-[#f1efe9] text-[#151515]"><div className="studio-shell grid gap-10 md:grid-cols-12"><div className="md:col-span-5"><Heading title={c.aboutTitle} /></div><div className="md:col-span-7"><p className="max-w-2xl text-lg leading-relaxed text-black/70 md:text-xl">{c.aboutBody}</p>
      <h3 className="studio-display mt-14 text-2xl tracking-[-.03em] md:text-3xl">{c.softTitle}</h3><p className="mt-4 max-w-2xl text-lg leading-relaxed text-black/70">{c.softBody}</p>
      <a className="studio-text-link mt-8" href={MK_DIGITAL + (language === 'tr' ? '/tr' : '/en')} target="_blank" rel="noopener noreferrer">{c.softLink}<ArrowUpRight /></a></div></div></section>

    <section id="products" className="studio-section bg-[#151515] text-white"><div className="studio-shell"><Heading dark title={c.prodTitle} lead={c.prodLead} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.products.map(([name, desc, href]) => <li key={name} className="border border-white/15"><a href={href} target="_blank" rel="noopener noreferrer" className="flex h-full min-h-[11rem] flex-col justify-between gap-8 p-6 transition hover:bg-white/5 md:p-8"><div><h3 className="studio-display text-2xl tracking-[-.03em]">{name}</h3><p className="mt-3 text-white/60">{desc}</p></div><span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[.1em] text-[#5b8cff]">{c.visit}<ArrowUpRight className="h-4 w-4" /></span></a></li>)}</ul></div></section>

    <section id="photography" className="studio-section bg-[#151515] text-white"><div className="studio-shell"><Heading dark title={c.photoTitle} lead={c.photoLead} /><PhotographyMarquee /><InstagramSection /></div></section>

    <section id="principles" className="studio-section bg-[#f1efe9] text-[#151515]"><div className="studio-shell"><Heading title={c.princTitle} />
      <ol className="grid gap-px border border-black/15 bg-black/15 md:grid-cols-2">{c.princItems.map((x, i) => <li key={x} className="bg-[#f1efe9] p-6 text-lg md:p-8"><span className="mb-3 block text-xs font-bold tracking-[.18em] text-black/40">{String(i + 1).padStart(2, '0')}</span>{x}</li>)}</ol>
      <p className="mt-10 max-w-3xl text-xl leading-relaxed text-black/60">“{c.princQuote}”</p></div></section>

    <section id="contact" className="studio-section bg-[#5b8cff] text-[#0b1730]"><div className="studio-shell"><h2 className="studio-display text-[clamp(3rem,8vw,7rem)] leading-[.9] tracking-[-.06em]">{c.contactTitle}</h2><p className="mt-6 max-w-2xl text-lg leading-relaxed">{c.contactBody}</p>
      <div className="mt-10 flex flex-wrap gap-3"><a className="studio-button bg-[#0b1730] text-white" href={`mailto:${EMAIL}`}><Mail />{EMAIL}</a><a className="studio-button border border-[#0b1730]/30" href={LINKEDIN} target="_blank" rel="noopener noreferrer"><Linkedin />LinkedIn</a></div></div></section>
  </div>
}
