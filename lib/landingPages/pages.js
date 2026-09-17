import { CONSTRUCTION_CITY_PAGES } from './cityPages'
import { LANDING_ROUTES, landingHref } from './routes'

// Editorial copy only. Project names, features, status, media and live URLs
// are always resolved from lib/projects/projectsData.js at render time.
const SERVICE_PAGES = [
  {
    slug: 'web-tasarim', keyword: 'web tasarım',
    title: 'Web Tasarım | İşletmenize Uygun Web Deneyimleri',
    description: 'Otel, fotoğraf portföyü, kafe ve kurumsal işletmeler için web tasarım. Gerçek portföy örneklerini inceleyin, sitenizin içerik ve iletişim akışını planlayın.',
    h1: 'İşletmenizi anlatan, ziyaretçiye yol gösteren web tasarım',
    intro: 'İyi bir web sitesi, ziyaretçinin aradığı bilgiyi kolayca bulmasını sağlar. Oda seçmek, fotoğraf çalışması incelemek, menüye bakmak veya hizmet talep etmek farklı deneyimlerdir. Tasarımı bu ihtiyaçtan başlayarak kuruyoruz.',
    needTitle: 'Önce ziyaretçinin kararını anlamak',
    need: 'Bir işletme sitesindeki bütün bilgileri ilk ekrana yığmak yerine, ziyaretçinin hangi soruyla geldiğini belirleriz. Hizmet, çalışma örneği ve iletişim adımlarını bu soruya cevap verecek biçimde düzenleriz.',
    solutionTitle: 'Sektörünüze göre içerik ve arayüz',
    sections: [
      ['Konaklama ve yeme içme', 'Oda, menü, galeri, konum ve iletişim bilgileri ziyaretçinin kararına hizmet eder. Rezervasyon talebiyle gerçek zamanlı müsaitlik entegrasyonunu ayrı kapsamlar olarak ele alırız.'],
      ['Portföy ve kişisel marka', 'Görsellerin sırası, albüm yapısı ve çalışma hakkında verilen kısa bilgiler bir bütün oluşturur. Sosyal medya bağlantıları, ziyaretçiyi portföyden koparmadan erişilebilir tutulur.'],
      ['Kurumsal ve hizmet işletmeleri', 'Hizmetleri anlaşılır sayfalarda sunar, talep oluşturma adımlarını sadeleştiririz. Teknik SEO, mobil kullanım ve içerik güncelleme ihtiyacı tasarım sürecinin parçasıdır.'],
    ],
    projects: ['mavi-kadraj-otel', 'mavi-kafe', 'mavi-kadraj', 'mavi-iletisim'],
    detailProjects: ['mavi-iletisim', 'mavi-danismanlik', 'mavi-gayrimenkul'],
    projectTitle: 'Farklı ihtiyaçlar için portföy örnekleri',
    process: ['Hedef kitlenizi ve ziyaretçinin gerçekleştirmesini istediğiniz işlemi belirleriz.', 'İçerik haritasını, görsel malzemeleri ve ekran düzenini birlikte netleştiririz.', 'Mobil görünüm, bağlantılar ve yayın kapsamını kontrol ederek ilerleriz.'],
    faqs: [
      ['Sadece tanıtım sitesiyle başlayabilir miyiz?', 'Evet. İlk kapsam hizmetlerinizi ve iletişim bilgilerinizi sunan bir site olabilir. Yönetim paneli veya başka bir yazılım ihtiyacı varsa ayrıca planlanır.'],
      ['Web tasarım hizmeti hangi şehirlere yönelik?', 'Bolu ve Osmaniye için sektör odaklı sayfaları inceleyebilirsiniz. Başka bir şehirdeki işletme için de proje görüşmesi uzaktan yapılabilir.'],
      ['Bir demoyu işletmemizin sitesi olarak kullanabilir miyiz?', 'Demolar yaklaşımı görmek içindir. İçerik, marka, teknik ihtiyaçlar ve kullanım kapsamı kendi projenize göre ayrıca hazırlanır.'],
    ],
    related: ['bolu-web-tasarim', 'osmaniye-web-tasarim', 'ozel-yazilim-gelistirme'],
    cta: 'Web Sitenizi Birlikte Planlayalım', projectsFirst: false,
  },
  {
    slug: 'bolu-web-tasarim', parent: 'web-tasarim', city: 'Bolu', keyword: 'Bolu web tasarım',
    title: 'Bolu Web Tasarım | Sektörünüze Uygun Site Örnekleri',
    description: 'Bolu için otel, pansiyon, fotoğraf, gayrimenkul ve kurumsal web tasarım. Portföydeki gerçek çalışmalardan işletmenize uygun site yaklaşımını keşfedin.',
    h1: 'Bolu’da işletmenize uygun web sitesini birlikte kuralım',
    intro: 'Bir otelin odalarını inceleyen misafirle bir fotoğrafçının çalışmalarına bakan ziyaretçi aynı bilgiye ihtiyaç duymaz. Bolu web tasarım çalışmalarında başlangıç noktamız, işletmenizin sunduğu hizmeti doğru içerik ve anlaşılır bir iletişim yolu ile buluşturmaktır.',
    needTitle: 'Her sektör için aynı vitrin yeterli değil',
    need: 'Otel ve pansiyonda oda bilgisi; fotoğraf portföyünde görsel seçimi; gayrimenkulde ilan ayrıntısı öne çıkar. Cafe, restaurant ve kurumsal hizmetlerde ise menü veya hizmet bilgisine hızlı erişim gerekir. Sitenizin önceliğini birlikte seçeriz.',
    solutionTitle: 'Bolu’daki projeniz için üç başlangıç noktası',
    sections: [
      ['Konaklamayı anlaşılır sunun', 'Oda seçenekleri, galeri ve konum bilgisini rezervasyon talebine bağlayan bir akış planlarız. Mavi Kadraj Otel demosu, bu yaklaşımın incelenebilir örneğidir.'],
      ['Görsel çalışmalarınıza alan açın', 'Fotoğraf ve portföy sitelerinde albüm düzeni, görsel yükleme ve kişisel anlatım birlikte düşünülür. Mavi Kadraj bu ihtiyacı gösteren mevcut kişisel projedir.'],
      ['Hizmetten iletişime giden yolu kısaltın', 'Gayrimenkul, cafe ve kurumsal site demoları farklı içerik düzenlerini görmenizi sağlar. Gerçek işletme bilgileriniz ve iletişim kanallarınız proje kapsamına göre yerleştirilir.', { before: 'Yönetim paneli, katalog ve B2B bilgi sunumu için ', href: '/bolu-kurumsal-web-sitesi', label: 'Bolu kurumsal web sitesi', after: ' kapsamını inceleyebilirsiniz.' }],
    ],
    projects: ['mavi-kadraj-otel', 'mavi-resepsiyon', 'mavi-kadraj', 'mavi-gayrimenkul', 'mavi-kafe', 'mavi-iletisim'],
    projectTitle: 'Sektörünüze yakın bir örnekle başlayın',
    process: ['İşletmenizi, mevcut sitenizi ve ihtiyaç duyulan sayfaları inceleriz.', 'Örnek projeler üzerinden görsel yönü ve iletişim akışını netleştiririz.', 'Tasarım, geliştirme ve yayın kontrollerini belirlenen kapsamla yürütürüz.'],
    faqs: [
      ['Bolu’da web sitesi yaptırmak için hangi içerikler gerekli?', 'Hizmet veya ürün bilgileriniz, kullanma hakkına sahip olduğunuz görseller ve güncel iletişim bilgileriniz iyi bir başlangıçtır. Eksik içerikleri sayfa planıyla birlikte belirleriz.'],
      ['Gösterilen projeler Bolu’daki müşteri işleri mi?', 'Kartlarda projenin güncel durumu yer alır. Demo olarak belirtilen çalışmalar portföy örneğidir; Bolu’da gerçek bir işletmeye kurulmuş site olarak sunulmaz.'],
      ['Kurumsal site ile otel sitesinin kapsamı nasıl ayrılır?', 'Kurumsal site hizmet ve talep akışına, otel sitesi oda ve konaklama kararına odaklanır. Rezervasyon, yönetim paneli ve entegrasyon ihtiyaçları ayrıca belirlenir.'],
    ],
    related: ['bolu-otel-pansiyon-web-sitesi', 'bolu-fotografci-web-sitesi', 'web-tasarim', 'bolu-santiye-yonetim-sistemi'],
    cta: 'Projenizi Görüşelim', projectsFirst: false,
  },
  {
    slug: 'bolu-otel-pansiyon-web-sitesi', parent: 'bolu-web-tasarim', city: 'Bolu', keyword: 'Bolu otel web sitesi',
    title: 'Bolu Otel ve Pansiyon Web Sitesi | Oda ve Rezervasyon',
    description: 'Bolu otel ve pansiyonları için oda tanıtımı, galeri ve rezervasyon odaklı web tasarım. Mavi Kadraj Otel ve Mavi Resepsiyon demolarını inceleyin.',
    h1: 'Bolu otel ve pansiyonları için konaklama kararını kolaylaştırın',
    intro: 'Misafiriniz önce odanın kendisine uygun olup olmadığını, sonra konumu ve nasıl iletişime geçeceğini öğrenmek ister. Konaklama web sitesini bu sırayla düşünür; oda tanıtımından rezervasyon talebine kadar tutarlı bir deneyim planlarız.',
    needTitle: 'Fotoğrafı güzel, bilgisi eksik bir oda sayfası yetmez',
    need: 'Oda özellikleri, misafir kapasitesi ve iletişim adımlarının birbiriyle tutarlı olması gerekir. Müsaitlik bilgisinin kim tarafından yönetileceği de tasarımdan önce konuşulmalıdır; bir formun görünmesi otomatik rezervasyon onayı anlamına gelmez.',
    solutionTitle: 'Tanıtım sitesi ile işletme operasyonunu birlikte düşünün',
    sections: [
      ['Oda, galeri ve konum', 'Mavi Kadraj Otel demosunda oda kataloğu, oda detayları, galeri ve konum/iletişim alanları bulunur. Mobil arayüz, misafirin bu bilgileri telefonda incelemesi için örnek sunar.'],
      ['Rezervasyon arayüzü ve müsaitlik', 'Otel demosu tarih ve misafir seçimli rezervasyon akışını gösterir. Canlı müsaitlik, ödeme, kanal yöneticisi veya otomatik onay entegrasyonu ayrı geliştirme ve doğrulama gerektirir.'],
      ['Resepsiyon ve içerik yönetimi', 'Mavi Resepsiyon; oda durumu, rezervasyon, giriş/çıkış ve tahsilat süreçlerini gösteren ayrı bir portföy demosudur. Web sitesinin bu panelle entegrasyonu ve yönetilebilir içerik ihtiyacı proje kapsamına göre planlanır.'],
      ['Aramada anlaşılır oda sayfaları', 'Başlıklar, açıklamalar, görsel metinleri ve bağlantılar gerçek oda bilgileriyle hazırlanır. Teknik SEO çalışması bir sıralama veya rezervasyon sayısı garantisi olarak sunulmaz.'],
    ],
    projects: ['mavi-kadraj-otel', 'mavi-resepsiyon'], detailProjects: ['mavi-kadraj-otel', 'mavi-resepsiyon'],
    projectTitle: 'Konaklama için iki farklı proje örneği',
    process: ['Oda türlerini, görselleri ve mevcut rezervasyon alma yöntemini inceleriz.', 'Tanıtım, talep formu ve operasyon panelinin sınırlarını belirleriz.', 'Mobil oda inceleme ve iletişim akışını test ederek yayın kapsamını tamamlarız.'],
    faqs: [
      ['Otel demosunda gerçek zamanlı müsaitlik var mı?', 'Proje verisi tarih ve misafir seçimli rezervasyon arayüzünü doğrular. Canlı stok, kanal yöneticisi veya ödeme entegrasyonu doğrulanmış kapsamda değildir.'],
      ['Küçük bir pansiyon için de bu yapı uygun mu?', 'Oda tanıtımı, konum ve doğrudan iletişim temel bir başlangıç olabilir. Resepsiyon yazılımına ihtiyaç olup olmadığını işletmenizin günlük akışına göre değerlendiririz.'],
      ['Odaları kendimiz güncelleyebilir miyiz?', 'Yönetilebilir oda ve içerik alanları talebinize göre kapsamlandırılır. Tanıtım demosunun otomatik olarak bir içerik yönetim paneli içerdiği varsayılmaz.'],
    ],
    related: ['bolu-web-tasarim', 'ozel-yazilim-gelistirme'], cta: 'Konaklama Sitenizi Görüşelim', projectsFirst: true,
  },
  {
    slug: 'bolu-fotografci-web-sitesi', parent: 'bolu-web-tasarim', city: 'Bolu', keyword: 'Bolu fotoğrafçı web sitesi',
    title: 'Bolu Fotoğrafçı Web Sitesi | Portföy ve Galeri Tasarımı',
    description: 'Bolu fotoğrafçıları için portföy, galeri ve kişisel marka odaklı web sitesi. Mavi Kadraj örneğiyle görsel sunum, mobil deneyim ve içerik yapısını inceleyin.',
    h1: 'Fotoğraflarınıza ait bir alan: Bolu fotoğrafçı web sitesi',
    intro: 'Sosyal medya akışında bir fotoğraf kısa süre görünür; kendi portföyünüzde ise bir serinin, bir gezinin veya çalışma biçiminizin parçası olur. Fotoğrafçı web tasarımını görselleriniz arasındaki bağı ve kişisel markanızı anlatacak bir alan olarak ele alıyoruz.',
    needTitle: 'Ziyaretçiyi bir görselden çalışma bütününe taşımak',
    need: 'Çok sayıda fotoğrafı tek sayfaya eklemek yerine seçki, albüm ve kısa hikâye yapısı kurmak gerekir. Ziyaretçi tarzınızı anlayabilmeli, ilgili seriyi kolayca bulabilmeli ve çalışma talebi için size ulaşabilmelidir.',
    solutionTitle: 'Görsel kalite ile kullanım kolaylığını birlikte koruyun',
    sections: [
      ['Portföyü kürate edin', 'Mavi Kadraj’daki fotoğraf galerileri ve albümler, çalışmaları konu ve anlatı etrafında sunmaya örnek oluşturur. Sitenin yapısını sizin çekim alanlarınıza göre planlarız.'],
      ['Mobilde görsele yer açın', 'Görsel boyutları, yükleme sırası ve galeri kullanımı telefon ekranına göre ele alınır. Hızlı görsel yükleme hedefi, orijinal dosyaları gereksiz yere her ekrana taşımadan çalışmayı sunmaktır.'],
      ['İçerik, kişisel marka ve iletişim', 'Kısa bir hakkımda metni, çekim hikâyeleri ve sosyal medya bağlantıları portföyü tamamlar. Anlamlı başlıklar ve görsel açıklamaları SEO ile erişilebilirliği birlikte destekler.'],
    ],
    projects: ['mavi-kadraj', 'kadraj-rotam'], detailProjects: ['mavi-kadraj', 'kadraj-rotam'],
    projectTitle: 'Fotoğraf ve görsel anlatım çalışmaları',
    process: ['Temsil gücü yüksek bir fotoğraf seçkisi ve albüm başlıkları oluştururuz.', 'Galeri, hikâye ve iletişim sayfalarının sırasını birlikte belirleriz.', 'Görsel boyutlarını ve küçük ekranda gezinmeyi kontrol ederek ilerleriz.'],
    faqs: [
      ['Instagram hesabım varken portföy sitesi ne sağlar?', 'Seçkilerinizi kendi içerik düzeninizle sunabileceğiniz bir alan sağlar. Sosyal medya hesabınız siteye bağlanabilir; iki kanal farklı kullanım ihtiyaçlarını karşılar.'],
      ['Mavi Kadraj’da içerik yönetimi kullanılıyor mu?', 'Evet. Mevcut proje WordPress tabanlı içerik yönetimi, fotoğraf galerileri ve blog içerikleriyle tanımlanmıştır. Sizin projenizin altyapısı ihtiyaçlarına göre belirlenir.'],
      ['Bütün fotoğrafları orijinal boyutta mı yüklemeliyim?', 'Web için uygun ölçü ve sıkıştırma seçilir. Portföydeki sunum kalitesiyle yükleme boyutu birlikte değerlendirilir; orijinal dosyaların doğrudan kullanılması şart değildir.'],
    ],
    related: ['bolu-web-tasarim', 'web-tasarim'], cta: 'Fotoğraf Portföyünüzü Planlayalım', projectsFirst: true,
  },
  {
    slug: 'osmaniye-web-tasarim', parent: 'web-tasarim', city: 'Osmaniye', keyword: 'Osmaniye web tasarım',
    title: 'Osmaniye Web Tasarım | İşletmeden İletişime Net Bir Yol',
    description: 'Osmaniye’de cafe, gayrimenkul ve hizmet işletmeleri için web tasarım. Menü, ilan ve kurumsal site demolarıyla ihtiyacınıza uygun yapıyı belirleyin.',
    h1: 'Osmaniye işletmeleri için hizmeti açık, iletişimi kolay web siteleri',
    intro: 'Sitenize gelen kişi sunduğunuz hizmeti anlamak, bir ürüne bakmak veya size ulaşmak ister. Osmaniye web tasarım projelerini, işletmenizin günlük hayatta aldığı soruları dijital ortamda açıkça cevaplayacak şekilde planlıyoruz.',
    needTitle: 'İşletmeniz hakkında en sık hangi soru soruluyor?',
    need: 'Bir cafe için menü ve açılış saati, emlak ofisi için ilan ayrıntısı, hizmet işletmesi için çalışma kapsamı belirleyicidir. Bu bilgileri ziyaretçinin karşısına doğru sırayla çıkarmak, kurumsal görünüm kadar önemlidir.',
    solutionTitle: 'İçerik türüne göre doğru başlangıç',
    sections: [
      ['Cafe ve restaurant', 'Menü kategorileri, mekân görselleri ve konum bilgisi ziyaret öncesi karar vermeyi kolaylaştırır. Mavi Kafe demosu bu içeriklerin birlikte nasıl sunulabileceğini gösterir.'],
      ['Gayrimenkul', 'İlan detayları, filtreleme ve randevu akışı farklı bir bilgi mimarisi ister. Mavi Gayrimenkul örneği üzerinden portföy sunumu ve iletişim adımları konuşulabilir.'],
      ['Kurumsal ve hizmet işletmeleri', 'Mavi İletişim ve Mavi Danışmanlık demoları, hizmetlerin sınıflandırılması ve talep oluşturma için örnekler sunar. Marka metinleri ve gerçek işletme bilgileri size özel hazırlanır.', { before: 'Katalog, referans ve içerik yönetimi ihtiyaçlarınız için ', href: '/osmaniye-kurumsal-web-sitesi', label: 'Osmaniye kurumsal web sitesi', after: ' sayfasındaki kapsamı değerlendirebilirsiniz.' }],
    ],
    projects: ['mavi-kafe', 'mavi-gayrimenkul', 'mavi-iletisim', 'mavi-danismanlik'],
    projectTitle: 'Menüden hizmet sayfasına: incelenebilir demolar',
    process: ['Müşterilerinizin en sık sorduğu soruları ve mevcut içerikleri toplarız.', 'Sayfa haritasını sektörünüze ve güncelleme ihtiyacınıza göre çıkarırız.', 'Mobil menü, formlar ve iletişim bağlantılarını kontrol ederek siteyi hazırlarız.'],
    faqs: [
      ['Osmaniye’deki işletmem için görüşme uzaktan yapılabilir mi?', 'Evet. İçerik, tasarım ve proje kapsamı çevrim içi görüşmelerle ele alınabilir. Düziçi / Osmaniye şubemizin adresine ve iletişim bilgilerine bu sayfanın konum bölümünden ulaşabilirsiniz.'],
      ['Kurumsal web sitesinde hangi sayfalar olmalı?', 'Hizmetlerin niteliğine göre ana sayfa, hizmet sayfaları, işletme bilgisi ve iletişim temel alınabilir. Galeri, katalog veya randevu ihtiyacı ayrıca değerlendirilir.'],
      ['Mevcut alan adımızı koruyabilir miyiz?', 'Alan adı ve mevcut site yapısı incelenerek geçiş planı hazırlanabilir. Yayındaki adresleri ve erişimi koruma ihtiyacı proje başlangıcında ele alınır.'],
    ],
    related: ['osmaniye-cafe-kurumsal-web-sitesi', 'web-tasarim', 'osmaniye-santiye-yonetim-sistemi'],
    cta: 'İşletmenizin Web İhtiyacını Görüşelim', projectsFirst: false,
  },
  {
    slug: 'osmaniye-cafe-kurumsal-web-sitesi', parent: 'osmaniye-web-tasarim', city: 'Osmaniye', keyword: 'Osmaniye cafe web sitesi',
    title: 'Osmaniye Kafe ve Restoran Web Sitesi | Menü ve Rezervasyon',
    description: 'Osmaniye kafe ve restoranları için menü, galeri, konum ve rezervasyon talebi odaklı web sitesi. Mavi Kafe demosuyla işletmenize uygun yapıyı inceleyin.',
    h1: 'Osmaniye kafe ve restoranları için menüden ziyaret planına',
    intro: 'Misafiriniz gelmeden önce menünüzü görmek, mekânı tanımak ve size nasıl ulaşacağını öğrenmek ister. Kafe ve restoran web sitesini yemek sunumunu, galeri ve konum bilgisini telefonda kolay incelenen bir düzende buluşturmak için planlıyoruz.',
    needTitle: 'Misafirinizin ziyaret öncesi sorularını yanıtlayın',
    need: 'Menüde hangi ürünler var, mekân nasıl görünüyor, hangi saatlerde açıksınız ve nasıl iletişim kuruluyor? Güncel işletme bilgileriyle hazırlanan sayfa, misafirin bu soruları yanıtlayıp ziyaretini planlamasına yardımcı olmalıdır.',
    solutionTitle: 'Menü, mekân ve iletişim aynı akışta',
    sections: [
      ['Dijital menü ve yemek sunumu', 'Mavi Kafe & Restaurant demosundaki menü kategorileri ve öne çıkan ürünler, yemek ve içeceklerinizi düzenli sunmak için örnektir. Ürün adları, açıklamaları ve kullanma hakkına sahip olduğunuz fotoğraflar işletmenizden alınır.'],
      ['Mobil galeri ve konum', 'Mekân görsellerini, açılış saatlerini, konum ve iletişim bilgilerini ziyaret öncesi incelemeye uygun sıralarız. Menüye erişim ve iletişim bağlantıları telefon ekranında kontrol edilir.'],
      ['Rezervasyon talebi ve iletişim', 'Formla iletilen rezervasyon talebinin işletmeye nasıl ulaşacağını ve kimin yanıtlayacağını birlikte belirleriz. Talep göndermek canlı masa ayırma veya otomatik onay anlamına gelmez; ödeme ya da POS entegrasyonu bu tanıtım kapsamının parçası olarak sunulmaz.'],
      ['Şirket tanıtımı için farklı bir kapsam', 'Üretim veya ticaret firmanızın katalog ve referanslarını sunmak istiyorsanız ihtiyaç menü odaklı bir kafe sitesinden farklıdır.', { before: 'Bu durumda ', href: '/osmaniye-kurumsal-web-sitesi', label: 'kurumsal web sitesi çözümlerini', after: ' inceleyebilirsiniz.' }],
    ],
    projects: ['mavi-kafe'], detailProjects: ['mavi-kafe'],
    projectTitle: 'Menü ve mekân sunumu için Mavi Kafe demosu',
    process: ['Menü kategorilerini, ürün bilgilerini, mekân görsellerini ve güncel iletişim kanallarını toplarız.', 'Telefonda menü inceleme, konuma ulaşma ve rezervasyon talebi adımlarını planlarız.', 'Talebin işletmeye iletilmesini, bağlantıları ve içerik güncelleme kapsamını yayın öncesi kontrol ederiz.'],
    faqs: [
      ['Menü içeriği için hangi bilgiler gerekir?', 'Ürün adları, kategori düzeni, açıklamalar ve güncel işletme bilgileriyle başlayabiliriz. Fotoğrafların kullanım hakkı size ait olmalıdır. Menü güncellemelerinin nasıl yapılacağı ayrıca kapsamlandırılır.'],
      ['Rezervasyon formu masayı otomatik ayırır mı?', 'Bir formun bulunması otomatik masa tahsisi veya onay anlamına gelmez. Talebin işletmeye nasıl ulaşacağı ve onaylanacağı ayrıca planlanır.'],
      ['Web sitesine ödeme veya POS sistemi dahil mi?', 'Bu sayfa menü, mekân tanıtımı ve iletişim ihtiyacını ele alır. Ödeme, POS veya adisyon entegrasyonu dahil olarak vaat edilmez; böyle bir ihtiyaç ayrı teknik kapsam gerektirir.'],
    ],
    related: ['osmaniye-web-tasarim', 'ozel-yazilim-gelistirme'], cta: 'Kafenizin Web Sitesini Planlayalım', projectsFirst: true,
  },
  {
    slug: 'ozel-yazilim-gelistirme', keyword: 'özel yazılım geliştirme',
    title: 'Özel Yazılım Geliştirme | İşletmenizin Sürecine Göre',
    description: 'İşletmeye özel yazılım, web tabanlı yönetim panelleri ve operasyon çözümleri. Şantiye, çiftlik, üretim ve konaklama projeleri üzerinden ihtiyacınızı değerlendirin.',
    h1: 'İşletmenizin çalışma biçimine göre özel yazılım geliştirme',
    intro: 'Kayıtlar dosyalara, mesajlara ve farklı ekranlara dağıldığında işin durumunu görmek başlı başına bir işe dönüşür. Özel yazılım geliştirme sürecinde önce bu dağınıklığın nerede oluştuğunu belirler, gerekli kayıtları ve işlemleri ortak bir çalışma alanında birleştirecek yapıyı planlarız.',
    needTitle: 'Yeni bir panelden önce net bir iş akışı',
    need: 'Hangi bilgiyi kim giriyor, kim kontrol ediyor ve hangi karar için kullanıyor? İşletmeye özel yazılım çözümü bu sorularla başlar. Her modülü ilk günden istemek yerine, günlük işte en çok tekrar eden ihtiyacı somutlaştırırız.',
    solutionTitle: 'Yönetim panelini işin gerçek adımlarına göre kurun',
    sections: [
      ['Kayıt ve takip', 'Şantiye, çiftlik ve üretim projeleri farklı veri türleriyle çalışır. İhtiyaç analizinde temel kayıtları, bu kayıtlar arasındaki ilişkileri ve güncelleme sorumluluklarını çıkarırız.'],
      ['Kullanıcı ve kullanım ortamı', 'Sahadan telefonla kayıt girmekle ofisten rapor incelemek aynı ekran ihtiyacını doğurmaz. Kullanıcı rolleri, cihazlar ve erişim beklentileri proje kapsamında değerlendirilir.'],
      ['Uyarlama ve entegrasyon', 'Hazır proje örnekleri konuşmayı somutlaştırır; her özelliğin yeni projeye doğrudan taşınacağı varsayılmaz. Veri aktarımı, dış servis bağlantıları ve ek raporlar ayrıca kapsamlandırılır.'],
    ],
    projects: ['santiye-yonetim-sistemi', 'mk-farm', 'mk-traceops', 'mk-ops', 'mavi-resepsiyon', 'mavi-adisyon'],
    detailProjects: ['santiye-yonetim-sistemi', 'mk-farm', 'mk-traceops', 'mk-ops', 'mavi-resepsiyon', 'mavi-adisyon'],
    projectTitle: 'İş problemi → incelenebilir yazılım çözümü',
    process: ['Mevcut iş akışını ve soruna örnek olan kayıtları inceleriz.', 'İlk sürümün modüllerini, kullanıcılarını ve kabul ölçütlerini belirleriz.', 'Geliştirme adımlarını gözden geçirip gerçek kullanım senaryolarıyla test ederiz.', 'Yayın, kullanım ve sonraki geliştirmelerin kapsamını birlikte planlarız.'],
    faqs: [
      ['İşletmeye özel yazılım ne zaman anlamlıdır?', 'Mevcut araçlar kayıtları tekrar ettiriyor, bilgi farklı yerlerde kalıyor veya iş akışınız standart ekranlara sığmıyorsa değerlendirmeye değer. Önce mevcut araçlarla çözülebilen alanları da inceleriz.'],
      ['Bütün örnekler canlı müşteri kurulumu mu?', 'Hayır. Şantiye projesi ve MK Farm aktif kullanımda, MK TraceOps geliştirme aşamasında, resepsiyon ve adisyon çalışmaları ise demo olarak kayıtlıdır. Her kart merkezi proje verisindeki güncel durumu gösterir.'],
      ['Özel yazılımın süresi ve bedeli nasıl belirlenir?', 'Modüller, kullanıcılar, veri aktarımı, entegrasyonlar ve test kapsamı netleşmeden sabit süre veya fiyat belirtilmez. Görüşme sonrasında somut kapsam üzerinden değerlendirme yapılır.'],
      ['Web tabanlı çözüm için ayrı cihaz gerekir mi?', 'Kullanılacak telefon ve bilgisayarlarla birlikte bağlantı koşulları incelenir. Özel donanım veya çevrimdışı çalışma ihtiyacı varsa ayrıca teknik kapsam oluşturulur.'],
    ],
    related: ['santiye-yonetim-sistemi', 'ciftlik-yonetim-sistemi', 'web-tasarim'],
    cta: 'İş Sürecinizi Birlikte İnceleyelim', projectsFirst: true,
  },
  {
    slug: 'ciftlik-yonetim-sistemi', parent: 'ozel-yazilim-gelistirme', keyword: 'çiftlik yönetim sistemi',
    title: 'Çiftlik Yönetim Sistemi | MK Farm ve QR Hayvan Takibi',
    description: 'MK Farm ile besi ve süt hayvanlarının kilo, sağlık, ilaç, süt ve tohumlama kayıtlarını inceleyin. QR dijital künye ile ilgili hayvan kaydına hızlı erişim.',
    h1: 'Çiftlik yönetim sistemi: her hayvanın kaydı bir arada',
    intro: 'Bir hayvanın son tartımını, uygulanan tedaviyi veya süt kaydını farklı defterlerde aramak günlük takibi zorlaştırır. MK Farm, besi ve süt hayvanlarının kayıtlarını ortak bir sistemde toplayan, aktif kullanımdaki çiftlik yönetim projesidir.',
    needTitle: 'Büyükbaş hayvan takibinde kayıt sürekliliği',
    need: 'Bugünkü kilo veya süt miktarı, geçmiş kayıtlarla birlikte anlam kazanır. Hayvan kayıt programını tek bir liste olarak değil; bakım, gelişim ve günlük işletme kayıtlarının aynı hayvana bağlandığı bir çalışma alanı olarak düşünmek gerekir.',
    solutionTitle: 'Besi ve süt çiftliğinin farklı kayıt ihtiyaçları',
    sections: [
      ['Besi hayvanı takip programı', 'Hayvan kayıtları ve kilo/tartım geçmişi, gelişimi aynı hayvan üzerinden izlemeyi sağlar. Hastalık, ilaç ve tedavi kayıtları da günlük bakım takibini tamamlar.'],
      ['Süt çiftliği yönetim sistemi', 'Süt kayıtları ve tohumlama geçmişi, süt hayvanlarının takibinde ele alınan alanlardır. Hangi kayıtların ne sıklıkta girileceği işletmenizin düzenine göre planlanır.'],
      ['QR dijital künye ile doğru kayda erişin', 'Hayvana özel QR künyeyi okutun; ilgili hayvanın kayıtlarına hızlıca ulaşın. QR, bütün geçmişi fiziksel olarak içinde saklamaz; sistemdeki hayvan kaydına erişim sağlar. Görülebilen bilgiler uygulamanın erişim düzenine bağlıdır.'],
      ['Sahada ve bilgisayarda kullanım', 'MK Farm mobil ve masaüstü kullanım, personel erişimi, kullanıcı onayı ve çiftlik sahibinin uzaktan takibini destekler. İnternet bağlantısı ve kullanıcı düzeni uygulama değerlendirmesinde birlikte ele alınır.'],
    ],
    projects: ['mk-farm'], detailProjects: ['mk-farm'], heroProject: 'mk-farm',
    projectTitle: 'Ana proje: MK Farm',
    process: ['Besi veya süt hayvanlarınız için tuttuğunuz kayıt türlerini belirleriz.', 'Tartım, sağlık, süt ve QR ile erişim senaryosunu birlikte inceleriz.', 'Personel kullanımı ve çiftlik sahibinin takip ihtiyacına göre kapsamı netleştiririz.'],
    faqs: [
      ['QR künye tüm hayvan verilerini içinde mi saklıyor?', 'Hayır. QR, ilgili hayvanın sistemdeki kaydına erişim sağlar. Güncel bilgiler uygulamadan görüntülenir; QR fiziksel bir veri arşivi değildir.'],
      ['MK Farm yalnızca besi işletmelerine mi yönelik?', 'Proje hem besi hem süt hayvanlarını ele alır. Kilo, sağlık ve ilaç kayıtlarının yanında süt kayıtları ve tohumlama geçmişi de takip kapsamındadır.'],
      ['Çiftlik sahibi kayıtları uzaktan görebilir mi?', 'Uzaktan takip, personel kullanımı ve kullanıcı onay sistemi mevcut proje tanımında yer alır. Erişim biçimi ve kullanım kapsamı uygulama incelemesinde netleştirilir.'],
      ['MK Farm aktif olarak kullanılabiliyor mu?', 'Evet. MK Farm aktif kullanımdadır ve canlı uygulama bağlantısından incelenebilir. Çiftliğiniz için kullanıcı düzeni ve gerekli uyarlamalar görüşmede değerlendirilir.'],
    ],
    related: ['ozel-yazilim-gelistirme', 'santiye-yonetim-sistemi'], cta: 'Çiftliğiniz İçin Görüşelim', projectsFirst: false,
  },
  {
    slug: 'santiye-yonetim-sistemi', parent: 'ozel-yazilim-gelistirme', keyword: 'şantiye yönetim sistemi',
    title: 'Şantiye Yönetim Sistemi | Proje, Puantaj ve İmalat',
    description: 'Proje, personel, puantaj, imalat, araç, stok ve zimmet için web tabanlı şantiye yönetim sistemi. Gerçek projeyi ve bölgesel kullanım senaryolarını inceleyin.',
    h1: 'Şantiye yönetim sistemi ile saha kayıtlarını bir araya getirin',
    intro: 'Günlük plan, personel listesi, imalat bilgisi ve malzeme kaydı birbirinden kopuk olduğunda projenin güncel durumunu görmek zorlaşır. Şantiye Yönetim Sistemi, bu operasyonları mobil ve masaüstünden takip edilebilen ortak bir çalışma alanında ele alan mevcut özel yazılım projesidir.',
    needTitle: 'Proje takibi saha kaydından başlar',
    need: 'Yönetici için gerekli raporun temeli, sahada düzenli tutulan bilgidir. Şantiye takip programını değerlendirirken yalnızca ekranlara değil; veriyi kimin girdiğine, nasıl kontrol edildiğine ve hangi proje kararını desteklediğine de bakarız.',
    solutionTitle: 'İş planından kaynak takibine uzanan modüller',
    sections: [
      ['Proje, ekip ve puantaj', 'Proje yönetimi, günlük iş planı, personel yönetimi ve puantaj takibi mevcut sistemin parçalarıdır. Ekip ve çalışma kayıtları operasyonun bütünlüğü içinde incelenebilir.'],
      ['İmalat ve saha ilerlemesi', 'İmalat takibi, gerçekleşen işin kayıt altına alınmasını destekler. Kullanılacak iş kalemleri ve rapor beklentileri işletmenizin ihtiyaçlarına göre değerlendirilir.'],
      ['Araç, stok ve zimmet', 'Araç yönetimi, malzeme / stok ve zimmet alanları kaynakların takibini destekler. Donanım entegrasyonu veya otomatik takip gibi ek talepler ayrıca kapsamlandırılır.'],
      ['Raporlama ve erişim', 'Kullanıcı yönetimi ve raporlama ile saha kayıtları ortak bir ortamda incelenebilir. Mobil ve masaüstü uyum, ofis ve saha kullanımını birlikte ele alır.'],
    ],
    projects: ['santiye-yonetim-sistemi'], detailProjects: ['santiye-yonetim-sistemi'],
    projectTitle: 'Aktif kullanım olarak kayıtlı proje',
    process: ['Bir şantiyenizdeki günlük kayıt ve rapor akışını çıkarırız.', 'Mevcut modüllerle ihtiyaçlarınızı karşılaştırır, uyarlamaları belirleriz.', 'Örnek kullanım üzerinden kayıt sorumluluklarını ve teslim kapsamını netleştiririz.'],
    faqs: [
      ['Şantiye takip yazılımı hangi süreçleri kapsıyor?', 'Mevcut proje; proje ve günlük iş planı, personel, puantaj, imalat, araç, malzeme/stok, zimmet, kullanıcı yönetimi ve raporlamayı kapsar.'],
      ['Telefon ve bilgisayardan kullanılabilir mi?', 'Evet. Proje mobil ve masaüstü uyumlu web tabanlı kullanım olarak tanımlanmıştır. Bağlantı koşulları ve erişim gereksinimleri kurulum kapsamıyla birlikte ele alınır.'],
      ['İşletmemizin özel raporları eklenebilir mi?', 'İstenen raporun alanları ve hesapları incelenerek özel geliştirme ihtiyacı belirlenebilir. Her özel çıktı mevcut modüllerde hazırmış gibi sunulmaz.'],
      ['Şehir sayfaları farklı yazılımlar mı sunuyor?', 'Hayır. Aynı gerçek projeyi farklı kullanım ihtiyaçları üzerinden açıklar. Fiziksel şubelerimiz Bolu ve Düziçi / Osmaniye’dedir; diğer şehir sayfaları hizmet bölgelerini anlatır. Proje örnekleri yerel müşteri kurulumu iddiası taşımaz.'],
    ],
    related: ['ozel-yazilim-gelistirme', 'ciftlik-yonetim-sistemi'],
    regions: CONSTRUCTION_CITY_PAGES.map((page) => page.slug),
    cta: 'Şantiyenizin İhtiyacını Görüşelim', projectsFirst: false,
  },
]

export const LANDING_PAGES = [...SERVICE_PAGES, ...CONSTRUCTION_CITY_PAGES]
export const getLandingPage = (slug) => LANDING_PAGES.find((page) => page.slug === slug)
export function getLandingBreadcrumbs(page) {
  const ancestors = []
  let parent = getLandingPage(page.parent)
  while (parent) {
    ancestors.unshift({ name: LANDING_ROUTES[parent.slug], url: landingHref(parent.slug) })
    parent = getLandingPage(parent.parent)
  }
  return [{ name: 'Ana Sayfa', url: '/tr' }, ...ancestors, { name: LANDING_ROUTES[page.slug], url: landingHref(page.slug) }]
}

export function getLandingsForProject(slug) {
  return LANDING_PAGES.filter((page) => page.detailProjects?.includes(slug))
}

// Only the problem framing lives here; the solution is the existing project's
// own short description, not an independently maintained copy.
export const PROJECT_PROBLEMS = {
  'santiye-yonetim-sistemi': 'Saha, ekip, imalat ve personel bilgilerinin farklı kayıtlardan takip edilmesi.',
  'mk-farm': 'Hayvanların gelişim, sağlık ve günlük bakım geçmişinin dağınık tutulması.',
  'mk-traceops': 'Parça, üretim, stok ve sevkiyat arasındaki bağlantının takip edilememesi.',
  'mk-ops': 'Saha ekipleri, iş emirleri ve operasyon raporlarının ayrı kanallarda kalması.',
  'mavi-resepsiyon': 'Oda, rezervasyon, tahsilat ve kasa bilgilerinin farklı listelerde tutulması.',
  'mavi-adisyon': 'Garson, mutfak ve kasa arasındaki sipariş ve ödeme akışının dağılması.',
  'mavi-kadraj-otel': 'Misafirin oda, konum ve rezervasyon bilgisine farklı yerlerden ulaşması.',
  'mavi-kadraj': 'Fotoğraf serilerinin ve görsel hikâyelerin ortak bir portföyde sunulamaması.',
  'kadraj-rotam': 'Fotoğraf ile o fotoğrafın ait olduğu rota ve hikâyenin birbirinden kopması.',
  'mavi-kafe': 'Menü, mekân ve ziyaret bilgilerinin bir arada bulunamaması.',
  'mavi-gayrimenkul': 'İlan incelemesi ile randevu ve iletişim adımlarının kopuk olması.',
  'mavi-iletisim': 'Teknik hizmetlerin ve iletişim yollarının ziyaretçi için belirsiz kalması.',
  'mavi-danismanlik': 'Hizmet kapsamının ve görüşme talebi adımının yeterince açık sunulamaması.',
}
