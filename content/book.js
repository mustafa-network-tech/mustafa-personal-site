// Yoldaşın Mücadelesi — kitap bilgileri.
// Projede kitaba dair kapak, tanıtım metni, alıntı veya yayın bilgisi BULUNMADIĞI için alanlar boştur ve uydurulmamıştır.
// Alanlar doldurulduğunda sayfa ilgili bölümü kendiliğinden gösterir (boş alan = bölüm gizli / "yakında" notu).
export const BOOK = {
  title: 'Yoldaşın Mücadelesi',
  cover: null, // örn. '/images/book/kapak.jpg' — { src, w, h }
  coverSize: null, // { w: 1200, h: 1800 }
  blurb: { tr: null, en: null }, // tanıtım metni (paragraf dizisi)
  authorNote: { tr: null, en: null }, // yazar hakkında kısa bilgi
  quotes: [], // [{ tr: '...', en: '...' }]
  publication: { tr: null, en: null }, // yayımlanma / erişim bilgisi
  accessUrl: null, // varsa dış bağlantı
}
