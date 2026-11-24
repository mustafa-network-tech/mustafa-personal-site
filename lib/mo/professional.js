// Mesleki Deneyim sayfasının içeriği ve görselleri.
// Görseller: hero geçici Unsplash stok fotoğrafı; diğerleri için projede mevcut saha fotoğrafları
// (public/photos/from-yesterday-to-today/) geçici olarak yerleştirildi. Değiştirmek için ilgili `src` değerini güncellemeniz yeterli
// (yeni dosyaları public/images/professional/ içine koyabilirsiniz). Doğrulanmamış sertifika, firma, yıl veya proje sayısı eklenmemiştir.

const P = '/photos/from-yesterday-to-today'

// Geçici stok görsel (Unsplash Lisansı, ücretsiz). Gerçek saha fotoğrafı değildir; Mustafa Öner'in çalışması olarak tanıtılmaz.
// Kaynak: https://unsplash.com/photos/fiber-optic-cables-in-network-switch-eVWWr6nmDf8 — fotoğraf: Kirill Sh
// Önceki hero (kendi fotoğrafınız): `${P}/fiber/015.jpeg`
export const HERO_IMAGE = { src: '/images/professional/hero-fiber.jpg', pos: '50% 55%', source: 'https://unsplash.com/photos/fiber-optic-cables-in-network-switch-eVWWr6nmDf8', credit: 'Kirill Sh / Unsplash' }

export const SECTION_IMAGES = {
  infra: { src: `${P}/fiber/008.jpeg`, w: 1200, h: 1600, pos: '50% 60%' },
  splice: { src: `${P}/fiber/013.jpeg`, w: 1500, h: 2000, pos: '50% 50%' },
  test: { src: `${P}/fiber/016.jpeg`, w: 1500, h: 2000, pos: '50% 55%' },
  field: { src: `${P}/copper/004.JPG`, w: 6000, h: 4000, pos: '45% 50%' },
}

// Sahadan Kareler: farklı boyutlarda (size: wide | tall | normal). Açıklamalar yalnızca fotoğrafta görüneni tarif eder.
export const GALLERY = [
  { src: `${P}/fiber/008.jpeg`, w: 1200, h: 1600, size: 'tall', alt: { tr: 'Direk üzerinde fiber ek kutusu ve dağıtım kutusu', en: 'Fiber splice closure and distribution box on a pole' } },
  { src: `${P}/copper/004.JPG`, w: 6000, h: 4000, size: 'wide', alt: { tr: 'Açık saha dolabı ve kablo bağlantıları', en: 'Open street cabinet and cable connections' } },
  { src: `${P}/fiber/016.jpeg`, w: 1500, h: 2000, size: 'normal', alt: { tr: 'Optik güç ölçüm cihazı', en: 'Optical power meter' } },
  { src: `${P}/fiber/010.jpeg`, w: 1200, h: 1600, size: 'normal', alt: { tr: 'Dağıtım dolabında ODF sistemleri ve fiber kordonlar', en: 'ODF units and fiber patch cords in a distribution cabinet' } },
  { src: `${P}/fiber/013.jpeg`, w: 1500, h: 2000, size: 'tall', alt: { tr: 'Füzyon kaynak cihazı ve fiber dağıtım paneli', en: 'Fusion splicer and fiber distribution panel' } },
  { src: `${P}/fiber/014.jpeg`, w: 1500, h: 2000, size: 'normal', alt: { tr: 'Renk kodlu fiber damarlar', en: 'Color-coded fiber strands' } },
  { src: `${P}/fiber/009.jpeg`, w: 1536, h: 2048, size: 'normal', alt: { tr: 'Bina içi fiber dağıtım kutusu', en: 'Indoor fiber distribution box' } },
  { src: `${P}/fiber/011.JPG`, w: 4000, h: 6000, size: 'tall', alt: { tr: 'Dağıtım dolabında bağlantı işlemi', en: 'Connection work in a distribution cabinet' } },
]

export const EXP = {
  tr: {
    heroTitle: 'Mesleki Deneyim',
    heroLead: 'Sahada kazanılan deneyim, emekle şekillenen bilgi ve teknolojiyle birbirine bağlanan dünyalar.',
    intro: 'Teknolojinin görünmeyen yüzünde, iletişimin temelini oluşturan altyapılar üzerinde çalışıyorum. Fiber optik sistemlerden saha uygulamalarına uzanan mesleki yolculuğumda, teknik bilgiyle saha deneyimini bir araya getiriyorum.',
    sections: [
      { id: 'infra', title: 'Fiber Optik Altyapı', lead: 'Fiber optik iletişim altyapılarının kurulumu, geliştirilmesi ve saha uygulamalarına yönelik mesleki deneyim.',
        items: ['Fiber optik altyapı kurulumu', 'Yer altı ve havai fiber optik hatlar', 'Fiber optik kablo çekimi', 'Bina içi fiber altyapı sistemleri', 'FTTH, FTTB ve FTTX uygulamaları', 'Fiber optik dağıtım sistemleri'],
        alt: 'Direk üzerinde fiber ek kutusu ve dağıtım kutusu' },
      { id: 'splice', title: 'Fiber Optik Ek ve Sonlandırma', lead: 'Fiber optik bağlantıların oluşturulması, sonlandırılması ve bağlantı kalitesinin sağlanmasına yönelik teknik çalışmalar.',
        items: ['Füzyon kaynak işlemleri', 'Fiber optik ek kutuları', 'ODF ve patch panel sistemleri', 'Fiber optik sonlandırma', 'Saha dolapları ve dağıtım kutuları', 'Fiber bağlantı düzenleme işlemleri'],
        alt: 'Füzyon kaynak cihazı ve fiber dağıtım paneli' },
      { id: 'test', title: 'Ölçüm, Test ve Arıza Tespiti', lead: 'Fiber optik altyapıların kontrol edilmesi, bağlantı kalitesinin ölçülmesi ve arızaların giderilmesine yönelik çalışmalar.',
        items: ['OTDR ölçümleri', 'Optik güç ölçümleri', 'Sinyal kaybı tespiti', 'Fiber optik arıza tespiti', 'Hat kontrolü ve test işlemleri', 'Bakım ve onarım çalışmaları'],
        alt: 'Optik güç ölçüm cihazı' },
      { id: 'field', title: 'Telekomünikasyon ve Saha Çalışmaları', lead: 'Telekomünikasyon altyapılarının sahada uygulanması ve teknik süreçlerin yürütülmesine yönelik deneyim.',
        items: ['Telekomünikasyon altyapı uygulamaları', 'Saha organizasyonu', 'Teknik altyapı çalışmaları', 'Altyapı güzergâhlarının uygulanması', 'Mevcut sistemlerin iyileştirilmesi', 'Saha bakım ve onarım faaliyetleri'],
        alt: 'Açık saha dolabı ve kablo bağlantıları' },
    ],
    bridgeTitle: 'Saha Deneyiminden Dijital Dünyaya',
    bridge: 'Sahada karşılaştığım ihtiyaçlar, dijital dünyaya bakışımı da şekillendiriyor. Teknik süreçlerin daha düzenli, anlaşılır ve yönetilebilir hale gelmesi üzerine düşünüyor, saha deneyimimi yazılım çalışmalarına taşıyorum.',
    bridgeCta: 'Projelerim',
    galleryTitle: 'Sahadan Kareler',
    galleryNote: 'Bu bölümdeki fotoğraflar geçicidir; daha sonra yenileriyle değiştirilecektir.',
  },
  en: {
    heroTitle: 'Professional Experience',
    heroLead: 'Experience earned in the field, knowledge shaped by effort, and worlds connected by technology.',
    intro: 'I work on the infrastructure that forms the foundation of communication, on the unseen side of technology. In my professional journey, from fiber optic systems to field work, I bring technical knowledge and field experience together.',
    sections: [
      { id: 'infra', title: 'Fiber Optic Infrastructure', lead: 'Professional experience in building and developing fiber optic communication infrastructure and in field applications.',
        items: ['Fiber optic infrastructure installation', 'Underground and aerial fiber optic lines', 'Fiber optic cable pulling', 'Indoor fiber infrastructure systems', 'FTTH, FTTB and FTTX applications', 'Fiber optic distribution systems'],
        alt: 'Fiber splice closure and distribution box on a pole' },
      { id: 'splice', title: 'Fiber Optic Splicing and Termination', lead: 'Technical work on creating and terminating fiber optic connections and ensuring connection quality.',
        items: ['Fusion splicing', 'Fiber optic splice closures', 'ODF and patch panel systems', 'Fiber optic termination', 'Street cabinets and distribution boxes', 'Fiber connection management'],
        alt: 'Fusion splicer and fiber distribution panel' },
      { id: 'test', title: 'Measurement, Testing and Fault Finding', lead: 'Work on inspecting fiber optic infrastructure, measuring connection quality and resolving faults.',
        items: ['OTDR measurements', 'Optical power measurements', 'Signal loss detection', 'Fiber optic fault finding', 'Line inspection and testing', 'Maintenance and repair work'],
        alt: 'Optical power meter' },
      { id: 'field', title: 'Telecommunications and Field Work', lead: 'Experience in applying telecommunications infrastructure in the field and carrying out technical processes.',
        items: ['Telecommunications infrastructure works', 'Field organization', 'Technical infrastructure work', 'Implementing infrastructure routes', 'Improving existing systems', 'Field maintenance and repair activities'],
        alt: 'Open street cabinet and cable connections' },
    ],
    bridgeTitle: 'From Field Experience to the Digital World',
    bridge: 'The needs I encounter in the field also shape the way I look at the digital world. I think about making technical processes more orderly, understandable and manageable, and I carry my field experience into my software work.',
    bridgeCta: 'My Projects',
    galleryTitle: 'Frames from the Field',
    galleryNote: 'The photographs in this section are temporary and will be replaced later.',
  },
}
