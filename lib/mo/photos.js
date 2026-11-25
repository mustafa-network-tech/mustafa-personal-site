// Fotoğraf kayıt defteri. Nihai seçim ve kategori ataması kullanıcıya aittir; buradaki yerleşim geçicidir.
// Yeni fotoğraf eklemek için listeye bir satır eklemek yeterlidir (w/h gerçek piksel ölçüsü olmalı).
import { PHOTO_GALLERY } from '@/lib/photoGalleryData'

export const PHOTO_CATEGORIES = [
  { id: 'doga', tr: 'Doğa', en: 'Nature' },
  { id: 'manzara', tr: 'Manzara', en: 'Landscape' },
  { id: 'sehirler', tr: 'Şehirler', en: 'Cities' },
  { id: 'geziler', tr: 'Geziler', en: 'Travel' },
  { id: 'makro', tr: 'Makro', en: 'Macro' },
  { id: 'koleksiyonlar', tr: 'Koleksiyonlar', en: 'Collections' },
]

const L = (src, w, h, category) => ({
  src, w, h, category, remote: false,
  alt: { tr: 'Mustafa Öner fotoğrafı', en: 'Photograph by Mustafa Öner' },
})

const LOCAL = [
  L('/photos/nature/nature1.jpg', 5028, 2874, 'doga'),
  L('/photos/nature/nature2.jpg', 6000, 3551, 'doga'),
  L('/photos/nature/nature3.jpg', 5279, 3897, 'doga'),
  L('/photos/nature/nature4.jpg', 1064, 1280, 'doga'),
  L('/photos/nature/nature5.jpg', 2976, 3720, 'doga'),
  L('/photos/nature/nature6.jpg', 4000, 1800, 'manzara'),
  L('/photos/nature/nature7.jpg', 6000, 4000, 'manzara'),
  L('/photos/nature/nature8.jpg', 6000, 4000, 'manzara'),
  L('/photos/nature/nature9.jpg', 6000, 4000, 'doga'),
  L('/photos/nature/nature10.jpg', 1634, 977, 'manzara'),
  L('/photos/on-the-road/on-the-road1.jpg', 6000, 4000, 'geziler'),
  L('/photos/on-the-road/on-the-road2.jpg', 5571, 3368, 'geziler'),
  L('/photos/on-the-road/on-the-road3.jpg', 6020, 4015, 'geziler'),
  L('/photos/quiet-moments/quiet-moments1.jpg', 4553, 4000, 'koleksiyonlar'),
  L('/photos/quiet-moments/quiet-moments2.JPG', 6000, 4000, 'koleksiyonlar'),
  L('/photos/quiet-moments/quiet-moments3.jpg', 1350, 2400, 'koleksiyonlar'),
  L('/photos/quiet-moments/quiet-moments4.JPG', 6000, 4000, 'koleksiyonlar'),
  L('/photos/quiet-moments/quiet-moments5.JPG', 6000, 4000, 'koleksiyonlar'),
  L('/photos/lines-patterns/lines1.jpg', 6000, 4000, 'koleksiyonlar'),
  L('/photos/lines-patterns/lines2.jpg', 6000, 4000, 'koleksiyonlar'),
  L('/photos/lines-patterns/lines3.jpg', 6000, 4000, 'koleksiyonlar'),
  L('/photos/lines-patterns/lines4.jpg', 3030, 2908, 'koleksiyonlar'),
]

// photoGalleryData.js'deki başlıklı fotoğraflar (uzak arşiv). Ölçüler gerçek dosyalardan alındı.
const REMOTE_META = {
  'coastal-silhouette': [1600, 1067, 'manzara'],
  'island-sunset': [1600, 1067, 'doga'],
  'landscape-5054': [1067, 1600, 'manzara'],
  sunlight: [1600, 1067, 'manzara'],
  'golden-hour': [1600, 1067, 'geziler'],
  'nature-5392': [1600, 1067, 'doga'],
  'seagulls-sunset': [1600, 957, 'sehirler'],
}
const REMOTE = PHOTO_GALLERY.filter((p) => REMOTE_META[p.id]).map((p) => {
  const [w, h, category] = REMOTE_META[p.id]
  return { src: p.src, w, h, category, remote: true, caption: p.caption, alt: p.alt }
})

// Başlıklı fotoğraflar ile yerel arşiv serpiştirilir.
export const PHOTOS = (() => {
  const out = []
  const a = [...REMOTE]
  const b = [...LOCAL]
  while (a.length || b.length) {
    if (a.length) out.push(a.shift())
    if (b.length) out.push(b.shift())
    if (b.length) out.push(b.shift())
  }
  return out.map((p, i) => ({ ...p, id: i }))
})()

export const HOME_PHOTOS = ['nature2', 'nature9', 'on-the-road1'].map((k) => PHOTOS.find((p) => p.src.includes(k)))

// "Mustafa'nın Kadrajından" sayfasında gösterilen seçki (10 fotoğraf); tamamı Instagram ve Mavi Kadraj sitesindedir.
const PAGE_KEYS = ['coastal-silhouette', 'nature2', 'island-sunset', 'on-the-road1', 'seagulls-sunset', 'nature7', 'golden-hour', 'quiet-moments2', 'sunlight', 'lines1']
const keyOf = (p) => (p.remote ? PHOTO_GALLERY.find((g) => g.src === p.src)?.id : p.src)
export const PAGE_PHOTOS = PAGE_KEYS.map((k) => PHOTOS.find((p) => (p.remote ? keyOf(p) === k : p.src.includes('/' + k + '.')))).filter(Boolean)
