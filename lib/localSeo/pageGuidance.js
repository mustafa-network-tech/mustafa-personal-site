// Explicit selections: examples illustrate a use case, never a local client claim.
export const LOCAL_PAGE_GUIDANCE = {
  'izmit-web-tasarim': { projects: ['mavi-iletisim', 'mavi-danismanlik'], note: 'Teknik servis ve danışmanlık demoları hizmetten iletişime geçişi gösterir; İzmit müşteri işi olarak sunulmaz.' },
  'izmit-fabrika-web-sitesi': { projects: [], note: 'Portföyde bu kapsama birebir karşılık gelen bir fabrika tanıtım sitesi bulunmuyor. Görüşmede kendi ürün ve teknik belgeleriniz üzerinden sayfa kapsamı belirlenir.' },
  'adapazari-web-tasarim': { projects: ['mavi-danismanlik', 'guzellik-salonu'], note: 'Hizmet sunumu ve iletişim için iki mevcut demo. Adapazarı’nda yapılmış müşteri projeleri değildir.' },
  'adapazari-e-ticaret-web-sitesi': { projects: [], note: 'Mevcut portföyde uçtan uca e-ticaret mağazası örneği bulunmuyor. Ürün, ödeme ve teslimat gereksinimleri ayrı değerlendirilir; ilgisiz bir demo mağaza örneği olarak gösterilmez.' },
  'duzce-seo-uyumlu-web-sitesi': { projects: ['mavi-iletisim'], note: 'Mavi İletişim hizmet sayfası düzenini incelemek içindir. Bir SEO başarı hikâyesi veya sıralama sonucu olarak sunulmaz.' },
  'duzce-kurumsal-web-tasarim': { projects: ['mavi-iletisim', 'mavi-danismanlik'], note: 'Kurumsal hizmetlerin sınıflandırılması için mevcut demolar incelenebilir. Panel ve yetki ihtiyaçları ayrıca kapsamlandırılır.' },
  'zonguldak-web-tasarim': { projects: ['mavi-iletisim'], note: 'Teknik hizmetlerin anlatımı için Mavi İletişim demosu incelenebilir. Maden veya enerji tesisi referansı değildir.' },
  'zonguldak-kucuk-isletme-web-sitesi': { projects: ['mavi-kafe', 'guzellik-salonu'], note: 'Menü, hizmet ve iletişim düzeni için küçük işletme demoları. Zonguldak’ta müşteri kurulumu oldukları iddia edilmez.' },
  'canakkale-web-tasarim': { projects: ['mavi-kafe', 'mavi-gayrimenkul'], note: 'Menü ve ilan sunumunu gösteren portföy demoları farklı işletme ihtiyaçlarını karşılaştırmaya yardımcı olur.' },
  'canakkale-otel-web-sitesi': { projects: ['mavi-kadraj-otel'], note: 'Bolu kurgusuyla hazırlanmış Mavi Kadraj Otel demosu oda ve galeri düzenini gösterir. Çanakkale’de bir müşteri oteli veya canlı rezervasyon altyapısı olarak sunulmaz.' },
  'balikesir-web-tasarim': { projects: ['mavi-kafe', 'mavi-gayrimenkul'], note: 'Restoran ve gayrimenkul demoları içerik önceliklerini karşılaştırmak içindir; Balıkesir müşteri referansı değildir.' },
  'balikesir-dijital-ajans': { projects: ['mavi-iletisim', 'mavi-danismanlik'], note: 'Mevcut kurumsal demolar web üretimi kapsamını gösterir. Reklam performansı veya sosyal medya yönetimi sonucu olarak sunulmaz.', serviceHref: '/tr/ozel-yazilim-gelistirme', serviceLabel: 'özel yazılım geliştirme kapsamını' },
  'bartin-web-tasarim': { projects: ['mavi-kafe', 'mavi-kadraj-otel'], note: 'Menü ve konaklama sunumu için mevcut demolar. Otel demosunun Bolu kurgusu Bartın müşteri referansı anlamına gelmez.' },
  'bartin-mobil-uyumlu-web-sitesi': { projects: ['mavi-kafe'], note: 'Mavi Kafe demosu telefonda menü ve iletişim akışını incelemek içindir; bir mobil performans ölçümü veya başarı garantisi değildir.' },
  'kilis-web-tasarim': { projects: ['mavi-iletisim', 'mavi-kafe'], note: 'Hizmet listesi ve menü sunumu için demo örnekler. Kilis’te yapılmış müşteri işleri olarak sunulmaz.' },
  'kilis-kurumsal-web-sitesi': { projects: ['mavi-iletisim'], note: 'Ürün ve hizmet gruplarının kurumsal sunumu için Mavi İletişim demosu. Ticaret entegrasyonu veya yerel müşteri referansı değildir.' },
  'yalova-web-tasarim': { projects: ['mavi-gayrimenkul', 'mavi-kadraj-otel'], note: 'İlan ve oda sunumunu karşılaştırmak için iki demo. Otel örneği Bolu kurgusundadır; Yalova müşteri projesi değildir.' },
  'yalova-kurumsal-web-sitesi': { projects: ['mavi-danismanlik'], note: 'Hizmet ve şirket anlatımı için danışmanlık demosu incelenebilir. Çok tesisli işletme kurulumu olarak gösterilmez.' },
  'karabuk-web-tasarim': { projects: ['mavi-kafe', 'mavi-danismanlik'], note: 'Menü ve yerel hizmet sunumu için demo örnekler; sanayi üretim yazılımı olarak sunulmaz.' },
  'karabuk-kurumsal-web-sitesi': { projects: [], note: 'Portföyde metal üreticisi için hazırlanmış kurumsal katalog sitesi bulunmuyor. Örnekler yerine işletmenizin yayımlanabilir ürün belgeleri üzerinden kapsam çıkarılır.' },
  'bilecik-web-tasarim': { projects: ['mavi-iletisim'], note: 'Teknik hizmet ve iletişim yapısı için mevcut demo incelenebilir; Bilecik müşteri kurulumu değildir.' },
  'bilecik-kurumsal-web-sitesi': { projects: [], note: 'Sanayi kataloğu ve lojistik doküman sunumuna birebir uyan bir portföy sitesi bulunmuyor. Kendi malzemelerinizle yapılacak içerik planı görüşmede değerlendirilir.' },
  'kirklareli-web-tasarim': { projects: ['mavi-kafe', 'mavi-kadraj-otel'], note: 'Menü, mekân ve oda tanıtımı için mevcut demolar. Bolu kurgusundaki otel örneği Kırklareli referansı olarak kullanılmaz.' },
  'kirklareli-kurumsal-web-sitesi': { projects: ['mavi-iletisim'], note: 'Kategori ve hizmet bilgisini sunma yaklaşımı için demo incelenebilir. Tarımsal takip veya ticari sipariş yazılımı örneği değildir.' },
}

// One primary destination per city; specialist pages remain in their city navigation.
export const WORK_REGIONS = [
  { title: 'Marmara', description: 'Yerel hizmet, ürün sunumu ve şirket sitesi ihtiyaçları.', cities: [
    ['İzmit', '/izmit-web-tasarim'], ['Adapazarı', '/adapazari-web-tasarim'], ['Yalova', '/yalova-web-tasarim'],
    ['Bilecik', '/bilecik-web-tasarim'], ['Kırklareli', '/kirklareli-web-tasarim'],
    ['Balıkesir', '/balikesir-web-tasarim'], ['Çanakkale', '/canakkale-web-tasarim'],
  ] },
  { title: 'Batı Karadeniz', description: 'İşletme tanıtımı, konaklama ve teknik içerik planlama.', cities: [
    ['Düzce', '/duzce-seo-uyumlu-web-sitesi'], ['Zonguldak', '/zonguldak-web-tasarim'],
    ['Bartın', '/bartin-web-tasarim'], ['Karabük', '/karabuk-web-tasarim'], ['Bolu', '/tr/bolu-web-tasarim'],
  ] },
  { title: 'Akdeniz ve Güneydoğu', description: 'Ticaret ve hizmet işletmeleri için web sitesi kapsamı.', cities: [
    ['Osmaniye', '/tr/osmaniye-web-tasarim'], ['Kilis', '/kilis-web-tasarim'],
  ] },
]
