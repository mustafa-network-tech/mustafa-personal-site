// Ana sayfa "Hayatımın Farklı Yönleri" bölümündeki hover önizleme görselleri.
// Geçici düzen: görseli değiştirmek için ilgili satırın `src` değerini yeni dosyayla güncellemeniz yeterli
// (dosyaları public/images/explore/ içine koyun, örn. '/images/explore/hakkimda.jpg').
// `candidates`: Unsplash'te seçtiğim (Unsplash Lisansı, ücretsiz) aday fotoğrafların sayfa bağlantıları — kaynak kaydı.
import { BOOK } from '@/content/book'

export const EXPLORE_IMAGES = {
  about: {
    src: '/images/signature.jpeg', portrait: true, pos: '50% 25%',
    candidates: ['https://unsplash.com/photos/sunlight-streams-through-a-misty-forest-path-R9tPheZuGnA'],
  },
  experience: {
    src: '/photos/from-yesterday-to-today/fiber/015.jpeg', portrait: true, pos: '50% 50%',
    candidates: ['https://unsplash.com/s/photos/fiber-optic'], // ücretsiz uygun fotoğraf henüz seçilmedi
  },
  photo: {
    src: null, // null ise sitedeki mevcut fotoğraf kullanılır
    candidates: ['https://unsplash.com/photos/lake-reflecting-golden-light-between-mountains-9QHmQTsSpIo'],
  },
  projects: {
    src: '/showcase/mk-logo.png', fit: 'contain', bg: '#1d202a',
    candidates: ['https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-desk-nBXwqxjDa5c'],
  },
  book: {
    src: BOOK.cover, portrait: true, pos: "50% 0%",
    candidates: ['https://unsplash.com/photos/open-book-with-pages-illuminated-by-light-3k1ARF3NWwo'],
  },
}
