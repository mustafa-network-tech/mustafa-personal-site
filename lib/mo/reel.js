// Ana sayfa "Mustafa'nın Kadrajından" fotoğraf rulosu: tek merkezi veri.
// Fotoğrafı değiştirmek için ilgili satırın `src` değerini güncellemek yeterlidir (dosyayı public/ altına koyun).
// w/h gerçek piksel ölçüsü olmalıdır. Rulo 3:2 oranında gösterir; yatay (3:2) fotoğraflar kırpılmadan görünür.
// Sıra rulonun sırasıdır; beş kare bittiğinde başa döner.
export const REEL_PHOTOS = [
  { src: '/photos/nature/nature9.jpg', w: 6000, h: 4000, pos: '50% 50%', alt: { tr: 'Doğadan bir kare', en: 'A frame from nature' } },
  { src: '/photos/on-the-road/on-the-road1.jpg', w: 6000, h: 4000, pos: '50% 50%', alt: { tr: 'Yolculuktan bir kare', en: 'A frame from the road' } },
  { src: '/photos/nature/nature7.jpg', w: 6000, h: 4000, pos: '50% 50%', alt: { tr: 'Manzaradan bir kare', en: 'A landscape frame' } },
  { src: '/photos/on-the-road/on-the-road3.jpg', w: 6020, h: 4015, pos: '50% 50%', alt: { tr: 'Yoldan bir ayrıntı', en: 'A detail from the road' } },
  { src: '/photos/nature/nature8.jpg', w: 6000, h: 4000, pos: '50% 50%', alt: { tr: 'Doğanın sessizliğinden bir kare', en: 'A frame from the quiet of nature' } },
]

// Zamanlama (ms): açılma/geçiş süresi ve fotoğrafın ekranda kalma süresi.
export const REEL_TIMING = { unroll: 4000, hold: 4000 }
