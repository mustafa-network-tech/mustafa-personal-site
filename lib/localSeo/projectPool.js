/**
 * Yalnızca demo, vitrin ve kişisel portföy projeleri — müşteri işi yok.
 */

export const LOCAL_SEO_PROJECT_POOL = [
  { id: 'mk-digital', title: 'MK Digital Systems', description: 'Kurumsal web, e-ticaret ve özel yazılım vitrini.', tag: 'Platform', tone: 'from-[#1e3a5f] to-[#0f172a]' },
  { id: 'mk-ops', title: 'MK Ops', description: 'Operasyon ve saha süreçleri için yönetim paneli yapısı.', tag: 'Sistem', tone: 'from-[#1e293b] to-[#334155]' },
  { id: 'musty-music', title: 'Musty Music', description: 'Sanatçı portföyü ve müzik odaklı arayüz demo.', tag: 'Demo', tone: 'from-[#312e81] to-[#1e1b4b]' },
  { id: 'mavi-iletisim', title: 'Mavi İletişim', description: 'Telekom ve teknik servis kurumsal site demosu.', tag: 'Demo', tone: 'from-[#0c4a6e] to-[#082f49]' },
  { id: 'hukuk', title: 'Hukuk Bürosu', description: 'Güven odaklı kurumsal hukuk sitesi demosu.', tag: 'Demo', tone: 'from-[#3f3f46] to-[#18181b]' },
  { id: 'danismanlik', title: 'Danışmanlık', description: 'Hizmet ve uzmanlık anlatımı için kurumsal demo.', tag: 'Demo', tone: 'from-[#134e4a] to-[#042f2e]' },
  { id: 'guzellik', title: 'Güzellik Salonu', description: 'Randevu ve hizmet odaklı kurumsal web demosu.', tag: 'Demo', tone: 'from-[#831843] to-[#500724]' },
  { id: 'mavi-sarkilar', title: 'Mavi Şarkılar', description: 'Müzik platformu arayüz ve içerik yapısı demosu.', tag: 'Demo', tone: 'from-[#4c1d95] to-[#2e1065]' },
  { id: 'aria', title: 'ARIA', description: 'Sosyal platform arayüz ve kullanıcı akışı demosu.', tag: 'Demo', tone: 'from-[#1d4ed8] to-[#1e3a8a]' },
  { id: 'mavi-kadraj', title: 'Mavi Kadraj', description: 'Fotoğraf ve görsel hikâye portföy platformu.', tag: 'Kişisel', tone: 'from-[#365314] to-[#14532d]' },
  { id: 'kadraj-rotam', title: 'Kadraj Rotam', description: 'Rota keşfi ve görsel anlatım odaklı dijital proje.', tag: 'Kişisel', tone: 'from-[#713f12] to-[#422006]' },
  { id: 'gonul-pusulasi', title: 'Gönül Pusulası', description: 'Şiir ve duygusal anlatım için sade metin platformu.', tag: 'Kişisel', tone: 'from-[#7c2d12] to-[#431407]' },
  { id: 'siir-dunyasi', title: 'Şiir Dünyası', description: 'Edebi içerik paylaşımı için içerik platformu.', tag: 'Kişisel', tone: 'from-[#581c87] to-[#3b0764]' },
]

/** Sayfa slug'ına göre kararlı 2 proje seçimi */
export function pickProjectsForSlug(slug, count = 2) {
  const seed = slug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const sorted = [...LOCAL_SEO_PROJECT_POOL].sort((a, b) => {
    const ha = (seed * (a.id.charCodeAt(0) + a.id.length)) % 997
    const hb = (seed * (b.id.charCodeAt(0) + b.id.length)) % 997
    return ha - hb
  })
  return sorted.slice(0, count)
}
