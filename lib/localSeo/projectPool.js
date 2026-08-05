/**
 * Demo, vitrin ve kişisel portföy — müşteri projesi yok.
 * Ana sayfa demo_projects ile uyumlu url / etiketler.
 */

export const LOCAL_SEO_PROJECT_POOL = [
  {
    id: 'mk-digital',
    title: 'MK Digital Systems',
    description: 'Web siteleri, e-ticaret ve özel yazılım geliştiren dijital üretim markası.',
    tags: ['Next.js', 'Web Development', 'UI Systems'],
    url: 'https://mk-digital-systems.vercel.app/en',
    typeLabel: 'Platform',
  },
  {
    id: 'mk-ops',
    title: 'MK OPS',
    description: 'Saha operasyonları için SaaS tabanlı operasyon yönetim sistemi.',
    tags: ['Next.js', 'Dashboard', 'SaaS'],
    url: 'https://www.mk-ops.tr',
    typeLabel: 'Sistem',
  },
  {
    id: 'musty-music',
    title: 'Musty Music – Müzik Sitesi',
    description: 'Sanatçı portföyü ve müzik odaklı arayüz demo.',
    tags: ['Next.js', 'UI', 'Demo'],
    url: 'https://mk-music3.vercel.app/?lang=tr',
    typeLabel: 'Demo',
  },
  {
    id: 'mavi-iletisim',
    title: 'Mavi İletişim – Telekom ve Teknik Servis',
    description: 'Telekom ve teknik servis kurumsal demo.',
    tags: ['Next.js', 'Kurumsal', 'Demo'],
    url: 'https://mavi-iletisim-demo.vercel.app/',
    typeLabel: 'Demo',
  },
  {
    id: 'hukuk',
    title: 'Hukuk Bürosu – Kurumsal Web Sitesi',
    description: 'Hukuk büroları için kurumsal web sitesi demo.',
    tags: ['Next.js', 'Kurumsal', 'Demo'],
    url: 'https://hukuk-demo.vercel.app/',
    typeLabel: 'Demo',
  },
  {
    id: 'danismanlik',
    title: 'Danışmanlık – Kurumsal Web Sitesi',
    description: 'Danışmanlık hizmetleri için kurumsal web sitesi demo.',
    tags: ['Next.js', 'Kurumsal', 'Demo'],
    url: 'https://danismanlik-demo.vercel.app/',
    typeLabel: 'Demo',
  },
  {
    id: 'guzellik',
    title: 'Güzellik Salonu – Kurumsal Web Sitesi',
    description: 'Güzellik ve bakım için kurumsal web sitesi demo.',
    tags: ['Next.js', 'Kurumsal', 'Demo'],
    url: 'https://guzellik-salonu-demo-web.vercel.app/',
    typeLabel: 'Demo',
  },
  {
    id: 'mavi-sarkilar',
    title: 'Mavi Şarkılar – Müzik Platformu',
    description: 'Müzik platformu arayüz ve yapı demo.',
    tags: ['Next.js', 'UI', 'Demo'],
    url: 'https://spotify-demo-hazel.vercel.app/',
    typeLabel: 'Demo',
  },
  {
    id: 'aria',
    title: 'ARIA – Sosyal Medya Platformu',
    description: 'Sosyal medya platformu arayüz ve kullanıcı akışı demo.',
    tags: ['Next.js', 'UI', 'Demo'],
    url: 'https://aria-demo-omega.vercel.app/',
    typeLabel: 'Demo',
  },
  {
    id: 'mavi-kadraj',
    title: 'Mavi Kadraj – Fotoğraf Platformu',
    description: 'Fotoğraf, doğa ve görsel anlatım üzerine dijital portföy.',
    tags: ['WordPress', 'Design', 'Frontend'],
    url: 'https://www.mavikadraj.com.tr',
    typeLabel: 'Kişisel',
  },
  {
    id: 'kadraj-rotam',
    title: 'Kadraj Rotam – Rota Keşif Platformu',
    description: 'Fotoğraf odaklı rota keşfi ve görsel hikâyeler.',
    tags: ['Next.js', 'UI Design', 'Frontend'],
    url: 'https://kadrajrotam.com.tr',
    typeLabel: 'Kişisel',
  },
  {
    id: 'gonul-pusulasi',
    title: 'Gönül Pusulası – Metin Platformu',
    description: 'Şiir, duygu ve anlatı üzerine sade dijital metin platformu.',
    tags: ['HTML', 'CSS', 'Frontend'],
    url: 'https://gonulpusulasi-kcnsyyxe2-mustafa-oners-projects.vercel.app/',
    typeLabel: 'Kişisel',
  },
  {
    id: 'siir-dunyasi',
    title: 'Şiir Dünyası – İçerik Platformu',
    description: 'Şiir ve edebi içeriklerin dijital ortamda paylaşımı.',
    tags: ['HTML', 'CSS', 'Frontend'],
    url: 'https://siir-dunyasi1-4qwecgf5w-mustafa-oners-projects.vercel.app/',
    typeLabel: 'Kişisel',
  },
]

export function pickProjectsForSlug(slug, count = 2) {
  const seed = slug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const sorted = [...LOCAL_SEO_PROJECT_POOL].sort((a, b) => {
    const ha = (seed * (a.id.charCodeAt(0) + a.id.length)) % 997
    const hb = (seed * (b.id.charCodeAt(0) + b.id.length)) % 997
    return ha - hb
  })
  return sorted.slice(0, count)
}
