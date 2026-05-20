/**
 * Şehir bazlı SEO landing sayfaları — tek kaynak.
 * Her sayfa benzersiz meta, hero, hizmet sırası ve anlatım içerir.
 */

/** @typedef {import('./pages').LocalSeoPage} LocalSeoPage */

export const LOCAL_SEO_PAGES = [
  {
    slug: 'bolu-web-tasarim',
    cityKey: 'bolu',
    cityName: 'Bolu',
    defaultCity: 'Bolu',
    meta: {
      title: 'Bolu Web Tasarım | MK Digital Systems — Mustafa Öner',
      description:
        'Bolu işletmeleri için hızlı, mobil uyumlu ve SEO dostu web tasarım. Kurumsal kimlik, net CTA ve WhatsApp ile proje talebi.',
      ogTitle: 'Bolu Web Tasarım Hizmetleri',
      ogDescription: 'Bolu’da web tasarım ve dijital vitrin çözümleri. Demo projelerle kanıtlanmış yapı, hızlı teslimat odağı.',
    },
    hero: {
      eyebrow: 'Bolu · Web Tasarım',
      title: 'Bolu Web Tasarım Hizmetleri',
      description:
        'Yerel işletmeler için sade, hızlı ve güven veren arayüzler tasarlıyoruz. Bolu’daki markanızı dijitalde net konumlandırmak için yapılandırılmış bir web süreci sunuyoruz.',
      ctaLabel: 'Bolu Projenizi Planlayın',
    },
    introTitle: 'Bolu’da dijital vitrininizi güçlendirin',
    introText:
      'Turizm, perakende ve hizmet sektörlerinde Bolu’da güven oluşturan siteler; okunabilir tipografi ve mobil öncelikli düzenle hazırlanır. Amaç ziyaretçiyi yormadan iletişime geçirmektir.',
    servicesTitle: 'Bolu için öne çıkan hizmetler',
    servicesSubtitle: 'İhtiyacınıza göre modüler ilerleyen, ölçülebilir web paketleri.',
    services: [
      { title: 'Web Tasarım', description: 'Bolu markanıza uygun grid, renk ve bileşen sistemi.' },
      { title: 'Mobil Uyumlu Web Sitesi', description: 'Telefon trafiğine göre optimize edilmiş dokunmatik deneyim.' },
      { title: 'Landing Page Tasarımı', description: 'Kampanya ve teklif odaklı tek sayfa dönüşüm yapıları.' },
      { title: 'SEO Uyumlu Tasarım', description: 'Başlık hiyerarşisi ve meta alanlarıyla arama dostu iskelet.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Tek tıkla talep; form verisi düzenli mesaj formatında.' },
      { title: 'Hız Optimizasyonu', description: 'Hafif asset ve temiz kod ile daha hızlı açılış.' },
    ],
    blocks: [
      { heading: 'Yerel görünürlük', text: 'Bolu aramalarında hedef kelimelerle uyumlu sayfa iskeleti; içerik kopyası değil, gerçek hizmet anlatımı.' },
      { heading: 'Teslimat disiplini', text: 'Kapsam, sayfa listesi ve revizyon sınırları baştan netleştirilir; sürpriz maliyet yaşanmaz.' },
    ],
    ctaClosing: 'Bolu web tasarım projeniz için bugün brief gönderin.',
  },
  {
    slug: 'bolu-kurumsal-web-sitesi',
    cityKey: 'bolu',
    cityName: 'Bolu',
    defaultCity: 'Bolu',
    meta: {
      title: 'Bolu Kurumsal Web Sitesi | Profesyonel Dijital Çözüm',
      description:
        'Bolu kurumsal web sitesi: hizmet sayfaları, güven unsurları, yönetilebilir yapı ve MK Digital Systems kalitesiyle profesyonel teslimat.',
      ogTitle: 'Bolu Kurumsal Web Sitesi Çözümleri',
      ogDescription: 'Kurumsal kimlik, referans alanları ve iletişim odaklı Bolu web sitesi geliştirme.',
    },
    hero: {
      eyebrow: 'Bolu · Kurumsal',
      title: 'Bolu Kurumsal Web Sitesi Hizmetleri',
      description:
        'Şirketinizin hizmetlerini düzenli anlatan, yatırımcı ve müşteri güvenini destekleyen kurumsal siteler. Bolu’daki operasyonunuza uygun bilgi mimarisi kuruyoruz.',
      ctaLabel: 'Kurumsal Site Teklifi Alın',
    },
    introTitle: 'Kurumsal güven için yapılandırılmış site',
    introText:
      'Hakkımızda, hizmetler, süreç ve iletişim katmanları net ayrılır. Bolu’daki firmalar için uzun vadeli güncellenebilir bir Next.js tabanı tercih edilebilir.',
    servicesTitle: 'Kurumsal paket bileşenleri',
    servicesSubtitle: 'Marka tutarlılığı ve yönetim kolaylığı öncelikli modüller.',
    services: [
      { title: 'Kurumsal Web Sitesi', description: 'Çok sayfalı, ölçeklenebilir kurumsal yapı.' },
      { title: 'Dijital Marka Çözümleri', description: 'Logo, tipografi ve UI bileşenleriyle bütünleşik görünüm.' },
      { title: 'Yönetim Panelli Sistemler', description: 'İçerik ve duyuru güncellemeleri için admin altyapısı.' },
      { title: 'Next.js Web Çözümleri', description: 'Performans ve SEO için modern React tabanlı mimari.' },
      { title: 'Google Index Desteği', description: 'Sitemap, meta ve teknik kontrol listesiyle yayına hazırlık.' },
      { title: 'Kurumsal Web Tasarım', description: 'Bolu sektörünüze uygun profesyonel arayüz dili.' },
    ],
    blocks: [
      { heading: 'Bilgi mimarisi', text: 'Ziyaretçi yolculuğu: ana mesaj → hizmet detayı → kanıt → iletişim. Gereksiz menü kalabalığından kaçınılır.' },
      { heading: 'Uzun vadeli bakım', text: 'Temiz bileşen yapısı sayesinde yeni hizmet veya şube sayfası eklemek kolaylaşır.' },
    ],
    ctaClosing: 'Bolu kurumsal web sitenizi birlikte kurgulayalım.',
  },
  {
    slug: 'izmit-web-tasarim',
    cityKey: 'izmit',
    cityName: 'İzmit',
    defaultCity: 'Kocaeli',
    meta: {
      title: 'İzmit Web Tasarım | Kocaeli Dijital Üretim',
      description:
        'İzmit ve Kocaeli için endüstri uyumlu web tasarım: hızlı yükleme, net hizmet sayfaları ve mobil öncelikli arayüz.',
      ogTitle: 'İzmit Web Tasarım',
      ogDescription: 'İzmit işletmeleri için premium ve sade web tasarım çözümleri.',
    },
    hero: {
      eyebrow: 'İzmit · Tasarım',
      title: 'İzmit Web Tasarım ve Arayüz Üretimi',
      description:
        'Kocaeli’nin dinamik iş ortamında markanızı taşıyacak modern arayüzler. İzmit’te üretim ve hizmet firmaları için okunabilir, dönüşüm odaklı sayfalar.',
      ctaLabel: 'İzmit İçin Teklif İsteyin',
    },
    introTitle: 'Sanayi bölgesine uygun dijital yüz',
    introText:
      'Teknik terimler sadeleştirilir; ürün ve kapasite bilgisi hızlı taranır. İzmit’te B2B ve B2C modellerine göre farklı hero ve CTA kurguları uygulanır.',
    servicesTitle: 'İzmit odaklı hizmet seti',
    servicesSubtitle: 'Fabrika ve hizmet sitelerinde ortak teknik standart.',
    services: [
      { title: 'Web Tasarım', description: 'Endüstriyel ve kurumsal tonlarda arayüz üretimi.' },
      { title: 'Next.js Web Çözümleri', description: 'Ölçeklenebilir sayfa ve bileşen mimarisi.' },
      { title: 'Mobil Uyumlu Web Sitesi', description: 'Saha ekipleri ve müşteriler için telefon deneyimi.' },
      { title: 'Hız Optimizasyonu', description: 'LCP ve etkileşim metriklerine duyarlı yapı.' },
      { title: 'Landing Page Tasarımı', description: 'Tek ürün veya kampanya için odaklı sayfa.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Satış ve destek hattına hızlı yönlendirme.' },
    ],
    blocks: [
      { heading: 'B2B netliği', text: 'Teknik PDF ve katalog yerine webde taranabilir hizmet blokları; karar vericiye hızlı bilgi.' },
      { heading: 'Ölçeklenebilirlik', text: 'Yeni ürün hattı veya tesis sayfası eklendiğinde tasarım sistemi bozulmaz.' },
    ],
    ctaClosing: 'İzmit web tasarım brief’inizi WhatsApp üzerinden iletebilirsiniz.',
  },
  {
    slug: 'izmit-fabrika-web-sitesi',
    cityKey: 'izmit',
    cityName: 'İzmit',
    defaultCity: 'Kocaeli',
    meta: {
      title: 'İzmit Fabrika ve Sanayi Web Sitesi | MK Digital Systems',
      description:
        'İzmit fabrika ve sanayi firmaları için kapasite, üretim ve iletişim odaklı kurumsal web sitesi. Teknik güven ve hızlı teklif akışı.',
      ogTitle: 'İzmit Fabrika Web Sitesi Çözümleri',
      ogDescription: 'Sanayi ve üretim tesisleri için yapılandırılmış dijital vitrin.',
    },
    hero: {
      eyebrow: 'İzmit · Sanayi',
      title: 'İzmit Fabrika ve Sanayi Web Sitesi Çözümleri',
      description:
        'Üretim hatları, sertifikalar ve tedarik süreçlerinizi düzenli sunan sanayi siteleri. İzmit’te ulusal ve ihracat odaklı firmalar için güven veren dijital yapı.',
      ctaLabel: 'Sanayi Sitesi Planlaması',
    },
    introTitle: 'Üretim gücünü dijitalde anlatın',
    introText:
      'Makine parkı, kalite standartları ve lojistik bilgileri modüler bloklarla sunulur. Ziyaretçi teknik detaya boğulmadan iletişime yönlendirilir.',
    servicesTitle: 'Fabrika web paketi',
    servicesSubtitle: 'Sanayi diline uygun içerik ve teknik altyapı.',
    services: [
      { title: 'Kurumsal Web Sitesi', description: 'Çok dilli ve çok ürünlü sanayi yapılarına hazır iskelet.' },
      { title: 'Admin Panelli Sistem', description: 'Duyuru, katalog ve referans güncellemeleri için panel.' },
      { title: 'SEO Uyumlu Site', description: 'Sektör kelimeleriyle uyumlu başlık ve açıklama alanları.' },
      { title: 'Dijital Marka Çözümleri', description: 'Kurumsal renk ve tipografi ile tutarlı arayüz.' },
      { title: 'Google Index Desteği', description: 'Yayın sonrası indeks ve teknik SEO kontrolü.' },
      { title: 'Özel Yazılım', description: 'Teklif formu, bayi veya stok entegrasyonu ihtiyaçları.' },
    ],
    blocks: [
      { heading: 'Teknik güven', text: 'ISO, kapasite ve referans alanları görsel hiyerarşiyle öne çıkar; PDF kirliliği azaltılır.' },
      { heading: 'İhracat vitrini', text: 'İngilizce sayfa katmanı ve net iletişim kanalları ile yurtdışı ziyaretçi yolculuğu.' },
    ],
    ctaClosing: 'İzmit sanayi web projeniz için detaylı brief bekliyoruz.',
  },
  {
    slug: 'adapazari-e-ticaret-web-sitesi',
    cityKey: 'adapazari',
    cityName: 'Adapazarı',
    defaultCity: 'Sakarya',
    meta: {
      title: 'Adapazarı E-Ticaret Web Sitesi | Online Satış Altyapısı',
      description:
        'Adapazarı ve Sakarya için e-ticaret web sitesi: ürün kataloğu, ödeme akışı planı, mobil alışveriş ve SEO uyumlu mağaza yapısı.',
      ogTitle: 'Adapazarı E-Ticaret Sitesi',
      ogDescription: 'Yerel perakende ve markalar için ölçeklenebilir e-ticaret çözümleri.',
    },
    hero: {
      eyebrow: 'Adapazarı · E-Ticaret',
      title: 'Adapazarı E-Ticaret Web Sitesi Geliştirme',
      description:
        'Sakarya ve Adapazarı’nda satışa odaklı mağaza deneyimleri. Kategori yapısı, güven unsurları ve hızlı ödeme yolculuğu birlikte kurgulanır.',
      ctaLabel: 'Mağaza Projesini Başlatın',
    },
    introTitle: 'Online satış için sağlam temel',
    introText:
      'Ürün fotoğrafı, stok bilgisi ve kargo politikası net sunulur. Adapazarı’ndaki KOBİ’ler için aşamalı büyüyen e-ticaret mimarisi önerilir.',
    servicesTitle: 'E-ticaret modülleri',
    servicesSubtitle: 'Dönüşüm ve operasyonu birlikte düşünen paket.',
    services: [
      { title: 'E-Ticaret Web Sitesi', description: 'Katalog, sepet ve ödeme entegrasyonu planlaması.' },
      { title: 'Mobil Uyumlu Site', description: 'Mobil alışveriş ve dokunmatik ürün gezintisi.' },
      { title: 'SEO Uyumlu Site', description: 'Kategori ve ürün sayfaları için arama dostu yapı.' },
      { title: 'Hız Optimizasyonu', description: 'Görsel sıkıştırma ve lazy load ile hızlı mağaza.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Sipariş öncesi soru ve destek hattı.' },
      { title: 'Landing Page', description: 'Kampanya ve sezonluk koleksiyon sayfaları.' },
    ],
    blocks: [
      { heading: 'Dönüşüm akışı', text: 'Ürün → sepet → ödeme adımlarında sürtünme azaltılır; güven rozetleri görünür konumda.' },
      { heading: 'Yerel lojistik', text: 'Adapazarı ve çevre ilçelere teslimat bilgisi sayfa üstünde net ifade edilir.' },
    ],
    ctaClosing: 'Adapazarı e-ticaret projenizi form ile iletin.',
  },
  {
    slug: 'adapazari-web-tasarim',
    cityKey: 'adapazari',
    cityName: 'Adapazarı',
    defaultCity: 'Sakarya',
    meta: {
      title: 'Adapazarı Web Tasarım | Sakarya Dijital Ajans Hizmeti',
      description:
        'Adapazarı web tasarım: yerel işletmeler için modern arayüz, hızlı sayfa yapısı ve MK Digital Systems ile profesyonel üretim.',
      ogTitle: 'Adapazarı Web Tasarım',
      ogDescription: 'Sakarya bölgesinde sade ve premium web tasarım hizmetleri.',
    },
    hero: {
      eyebrow: 'Adapazarı · Tasarım',
      title: 'Adapazarı Web Tasarım Hizmetleri',
      description:
        'Sakarya’nın ticaret hacmiyle uyumlu, ferah ve güven veren web arayüzleri. Adapazarı’nda hizmet ve perakende markaları için özgün görsel dil.',
      ctaLabel: 'Tasarım Brief Gönderin',
    },
    introTitle: 'Yerel marka, güçlü arayüz',
    introText:
      'Renk, tipografi ve boşluk kullanımı markanızı yansıtır; şablon hissi verilmez. Her Adapazarı projesinde farklı hero ve hizmet anlatımı uygulanır.',
    servicesTitle: 'Tasarım odaklı paket',
    servicesSubtitle: 'Görsel kalite ve teknik performans bir arada.',
    services: [
      { title: 'Web Tasarım', description: 'Özgün layout ve bileşen seti.' },
      { title: 'Dijital Marka Sitesi', description: 'Marka hikâyesi ve hizmet anlatımı.' },
      { title: 'Landing Page Tasarımı', description: 'Tek kampanya için yüksek odaklı sayfa.' },
      { title: 'Mobil Uyumlu Web Sitesi', description: 'Responsive grid ve dokunmatik menü.' },
      { title: 'Next.js Web Çözümleri', description: 'Modern stack ile sürdürülebilir kod.' },
      { title: 'Google Index Desteği', description: 'Yayın ve indeks kontrol listesi.' },
    ],
    blocks: [
      { heading: 'Özgün dil', text: 'Rakip sitelerin kopyası değil; sektörünüze özel metin ve blok sıralaması.' },
      { heading: 'Hızlı iterasyon', text: 'Taslak onayı sonrası sayfa sayfa ilerleyen şeffaf süreç.' },
    ],
    ctaClosing: 'Adapazarı web tasarım talebinizi hemen oluşturun.',
  },
  {
    slug: 'duzce-seo-uyumlu-web-sitesi',
    cityKey: 'duzce',
    cityName: 'Düzce',
    defaultCity: 'Düzce',
    meta: {
      title: 'Düzce SEO Uyumlu Web Sitesi | Arama Görünürlüğü',
      description:
        'Düzce için SEO uyumlu web sitesi: teknik meta, hız, mobil uyum ve içerik iskeletiyle Google’da görünürlük hedefleyen yapı.',
      ogTitle: 'Düzce SEO Uyumlu Web Sitesi',
      ogDescription: 'Arama motoru dostu, hızlı ve yapılandırılmış Düzce web çözümleri.',
    },
    hero: {
      eyebrow: 'Düzce · SEO',
      title: 'Düzce SEO Uyumlu Web Sitesi Hizmetleri',
      description:
        'Arama niyetine uygun sayfa yapısı, temiz URL ve performans odaklı kod. Düzce’de hizmet arayan kullanıcıya doğru sayfada, doğru mesajla ulaşın.',
      ctaLabel: 'SEO Odaklı Site Talebi',
    },
    introTitle: 'Görünürlük için teknik temel',
    introText:
      'Başlık etiketleri, meta açıklamalar ve iç bağlantılar planlı kurulur. İçerik spam değil; gerçek hizmet sorularına cevap veren bloklar yazılır.',
    servicesTitle: 'SEO paket bileşenleri',
    servicesSubtitle: 'İndeks ve kullanıcı deneyimi birlikte ele alınır.',
    services: [
      { title: 'SEO Uyumlu Tasarım', description: 'Semantik HTML ve okunabilir başlık hiyerarşisi.' },
      { title: 'Google Index Desteği', description: 'Sitemap, robots ve Search Console yönlendirmesi.' },
      { title: 'Hız Optimizasyonu', description: 'Core Web Vitals dostu asset yönetimi.' },
      { title: 'Kurumsal Web Sitesi', description: 'Hizmet sayfalarıyla genişleyen SEO iskeleti.' },
      { title: 'Mobil Uyumlu Site', description: 'Mobil öncelikli indeks için responsive yapı.' },
      { title: 'Web Tasarım', description: 'Düzce markanıza uygun görsel sistem.' },
    ],
    blocks: [
      { heading: 'Yerel arama', text: 'Düzce + hizmet kombinasyonlarında özgün sayfa; duplicate içerik riski düşük tutulur.' },
      { heading: 'Ölçüm', text: 'Yayın sonrası temel trafik ve form dönüşümü takip önerileri paylaşılır.' },
    ],
    ctaClosing: 'Düzce SEO uyumlu siteniz için proje detayı gönderin.',
  },
  {
    slug: 'duzce-kurumsal-web-tasarim',
    cityKey: 'duzce',
    cityName: 'Düzce',
    defaultCity: 'Düzce',
    meta: {
      title: 'Düzce Kurumsal Web Tasarım | Profesyonel Kimlik',
      description:
        'Düzce kurumsal web tasarım: güven veren layout, yönetilebilir içerik ve modern kurumsal dil. MK Digital Systems üretimi.',
      ogTitle: 'Düzce Kurumsal Web Tasarım',
      ogDescription: 'Düzce firmaları için premium kurumsal arayüz ve web üretimi.',
    },
    hero: {
      eyebrow: 'Düzce · Kurumsal Tasarım',
      title: 'Düzce Kurumsal Web Tasarım',
      description:
        'Kurumsal iletişim, referans ve ekip sayfalarını dengeli sunan tasarımlar. Düzce’de KOBİ ve holding ölçeğine uygun esnek şablon değil, özel arayüz.',
      ctaLabel: 'Kurumsal Tasarım Teklifi',
    },
    introTitle: 'Kurumsal çizgide dijital prestij',
    introText:
      'Gri ve lacivert tonlar, net grid ve güçlü tipografi ile profesyonel algı oluşturulur. Düzce pazarında farklılaşan bir dijital yüz hedeflenir.',
    servicesTitle: 'Kurumsal tasarım kapsamı',
    servicesSubtitle: 'Marka ve UX birlikte ilerler.',
    services: [
      { title: 'Kurumsal Web Sitesi', description: 'Çok sayfalı kurumsal bilgi yapısı.' },
      { title: 'Dijital Marka Çözümleri', description: 'UI kit ve marka rehberi uyumu.' },
      { title: 'Yönetim Panelli Sistemler', description: 'İçerik ekipleri için sade yönetim.' },
      { title: 'Landing Page', description: 'Fuar ve kampanya dönemleri için ek sayfalar.' },
      { title: 'Next.js Web Çözümleri', description: 'Uzun ömürlü teknik platform.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Kurumsal satış hattına yönlendirme.' },
    ],
    blocks: [
      { heading: 'Güven unsurları', text: 'Referans, sertifika ve ekip alanları stratejik konumlandırılır.' },
      { heading: 'Sürdürülebilirlik', text: 'Yıllar sonra bile güncellenebilir bileşen mimarisi.' },
    ],
    ctaClosing: 'Düzce kurumsal web tasarım projenizi planlayalım.',
  },
  {
    slug: 'zonguldak-web-tasarim',
    cityKey: 'zonguldak',
    cityName: 'Zonguldak',
    defaultCity: 'Zonguldak',
    meta: {
      title: 'Zonguldak Web Tasarım | Karadeniz Dijital Çözüm',
      description:
        'Zonguldak web tasarım hizmeti: maden, enerji ve yerel ticarete uygun sade arayüzler. Hızlı iletişim ve mobil uyum.',
      ogTitle: 'Zonguldak Web Tasarım',
      ogDescription: 'Zonguldak işletmeleri için modern ve güvenilir web tasarım.',
    },
    hero: {
      eyebrow: 'Zonguldak · Web',
      title: 'Zonguldak Web Tasarım Hizmetleri',
      description:
        'Karadeniz’in iş dinamiklerine uygun, net ve dayanıklı web arayüzleri. Zonguldak’ta hizmet sunan işletmeler için hızlı yayına alınabilir yapılar.',
      ctaLabel: 'Zonguldak Proje Formu',
    },
    introTitle: 'Bölgesel güç, dijital netlik',
    introText:
      'Ağır sanayi ve hizmet sektörlerinde mesaj sade tutulur; teknik jargon ziyaretçiyi uzaklaştırmaz. Yerel güven için iletişim kanalları öne çıkar.',
    servicesTitle: 'Zonguldak hizmet paketi',
    servicesSubtitle: 'Pratik ve sonuç odaklı modüller.',
    services: [
      { title: 'Web Tasarım', description: 'Bölgeye uygun renk ve tipografi.' },
      { title: 'Mobil Uyumlu Web Sitesi', description: 'Her cihazda tutarlı deneyim.' },
      { title: 'Kurumsal Web Sitesi', description: 'Hizmet ve tesis bilgisi sunumu.' },
      { title: 'Hız Optimizasyonu', description: 'Düşük bant genişliğinde bile akıcı yükleme hedefi.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Hızlı teklif ve randevu talebi.' },
      { title: 'SEO Uyumlu Tasarım', description: 'Yerel arama için yapılandırılmış sayfalar.' },
    ],
    blocks: [
      { heading: 'Saha gerçekliği', text: 'Zonguldak’ta telefon üzerinden gelen trafiğe göre buton ve form yerleşimi optimize edilir.' },
      { heading: 'Şeffaf süreç', text: 'Fiyat ve kapsam konuşması baştan net; sürpriz modül ekleri minimize edilir.' },
    ],
    ctaClosing: 'Zonguldak web tasarım ihtiyacınızı paylaşın.',
  },
  {
    slug: 'zonguldak-kucuk-isletme-web-sitesi',
    cityKey: 'zonguldak',
    cityName: 'Zonguldak',
    defaultCity: 'Zonguldak',
    meta: {
      title: 'Zonguldak Küçük İşletme Web Sitesi | Uygun ve Profesyonel',
      description:
        'Zonguldak küçük işletmeler için uygun bütçeli, profesyonel web sitesi: menü, hizmet, konum ve WhatsApp iletişim odaklı.',
      ogTitle: 'Zonguldak KOBİ Web Sitesi',
      ogDescription: 'Esnaflar ve küçük işletmeler için hızlı kurulan dijital vitrin.',
    },
    hero: {
      eyebrow: 'Zonguldak · KOBİ',
      title: 'Zonguldak Küçük İşletme Web Sitesi',
      description:
        'Esnaf, kafe, atölye ve yerel hizmet sağlayıcıları için anlaşılır tek sayfa veya çok sayfalı siteler. Zonguldak’ta Google’da bulunabilir olun.',
      ctaLabel: 'Küçük İşletme Paketi',
    },
    introTitle: 'Büyük bütçe şart değil',
    introText:
      'Temel sayfa seti: ana sayfa, hizmetler, galeri ve iletişim. Gereksiz özellik eklenmez; işletmenizin gerçek ihtiyacı konuşulur.',
    servicesTitle: 'KOBİ paket içeriği',
    servicesSubtitle: 'Hızlı kurulum, net fiyatlandırma mantığı.',
    services: [
      { title: 'Mobil Uyumlu Site', description: 'Müşteriler telefondan kolayca ulaşır.' },
      { title: 'Landing Page', description: 'Tek hizmet odaklı hızlı vitrin.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Sipariş ve bilgi için doğrudan hat.' },
      { title: 'Google Index Desteği', description: 'Harita ve arama için temel SEO.' },
      { title: 'Web Tasarım', description: 'Sade ve okunaklı yerel işletme arayüzü.' },
      { title: 'Hız Optimizasyonu', description: 'Hafif sayfa, düşük hosting yükü.' },
    ],
    blocks: [
      { heading: 'Yerel müşteri', text: 'Adres, çalışma saati ve hizmet listesi ilk ekranda; kaybolan ziyaretçi azalır.' },
      { heading: 'Büyüme yolu', text: 'İleride e-ticaret veya blog katmanı eklenebilir altyapı.' },
    ],
    ctaClosing: 'Zonguldak küçük işletme siteniz için formu doldurun.',
  },
  {
    slug: 'canakkale-otel-web-sitesi',
    cityKey: 'canakkale',
    cityName: 'Çanakkale',
    defaultCity: 'Çanakkale',
    meta: {
      title: 'Çanakkale Otel ve Turizm Web Sitesi | Rezervasyon Odaklı',
      description:
        'Çanakkale otel, pansiyon ve turizm işletmeleri için görsel odaklı web sitesi: oda tipleri, konum, WhatsApp rezervasyon ve SEO.',
      ogTitle: 'Çanakkale Otel Web Tasarımı',
      ogDescription: 'Turizm sektörü için premium ve davetkar dijital vitrin.',
    },
    hero: {
      eyebrow: 'Çanakkale · Turizm',
      title: 'Çanakkale Otel ve Turizm Web Tasarımı',
      description:
        'Konaklama işletmeleri için fotoğraf odaklı, rezervasyon çağrısı güçlü siteler. Çanakkale’nin sezonluk trafiğine uygun hızlı ve mobil deneyim.',
      ctaLabel: 'Otel Sitesi Teklifi',
    },
    introTitle: 'Misafiri etkileyen dijital karşılama',
    introText:
      'Oda tipleri, olanaklar ve çevre rehberi modüler sunulur. Booking motoru entegrasyonu planlanabilir; minimumda WhatsApp ve telefon CTA önceliklidir.',
    servicesTitle: 'Turizm web modülleri',
    servicesSubtitle: 'Görsel hikâye ve dönüşüm bir arada.',
    services: [
      { title: 'Kurumsal Web Sitesi', description: 'Otel ve tesis sayfa yapısı.' },
      { title: 'Web Tasarım', description: 'Atmosferi yansıtan görsel dil.' },
      { title: 'Mobil Uyumlu Site', description: 'Yolda arayan gezgin için hızlı yükleme.' },
      { title: 'SEO Uyumlu Site', description: '“Çanakkale otel” aramalarına uygun içerik iskeleti.' },
      { title: 'Landing Page', description: 'Sezon kampanyaları için özel sayfalar.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Anlık rezervasyon ve bilgi talebi.' },
    ],
    blocks: [
      { heading: 'Görsel güven', text: 'Gerçek mekân fotoğrafları ve net fiyat/ipucu alanları; hayal kırıklığını azaltır.' },
      { heading: 'Sezon yönetimi', text: 'Yaz/kış banner ve paket alanları kolayca güncellenebilir.' },
    ],
    ctaClosing: 'Çanakkale otel web projenizi başlatalım.',
  },
  {
    slug: 'canakkale-web-tasarim',
    cityKey: 'canakkale',
    cityName: 'Çanakkale',
    defaultCity: 'Çanakkale',
    meta: {
      title: 'Çanakkale Web Tasarım | Turizm ve Yerel İşletme',
      description:
        'Çanakkale web tasarım: turizm, gastronomi ve yerel ticaret için özgün arayüz. Hızlı, mobil ve SEO dostu üretim.',
      ogTitle: 'Çanakkale Web Tasarım Hizmetleri',
      ogDescription: 'Ege ve boğaz hattında dijitalde öne çıkan web tasarım.',
    },
    hero: {
      eyebrow: 'Çanakkale · Tasarım',
      title: 'Çanakkale Web Tasarım',
      description:
        'Turistik ve yerel işletmeler için davetkar ama profesyonel arayüzler. Çanakkale markanızı yansıtan özgün tipografi ve renk paleti.',
      ctaLabel: 'Tasarım Görüşmesi',
    },
    introTitle: 'Hikâyenizi dijitalde anlatın',
    introText:
      'Restoran, butik otel veya kültür turu işletmeleri için farklı layout ritimleri kullanılır. Şablon otel sitesi kopyası üretilmez.',
    servicesTitle: 'Çanakkale tasarım seti',
    servicesSubtitle: 'Turizm ve hizmet sektörlerine esnek uyum.',
    services: [
      { title: 'Web Tasarım', description: 'Özgün hero ve galeri düzenleri.' },
      { title: 'Dijital Marka Sitesi', description: 'Marka hikâyesi ve görsel kimlik.' },
      { title: 'Landing Page Tasarımı', description: 'Etkinlik ve festival dönemleri.' },
      { title: 'Next.js Web Çözümleri', description: 'Yoğun trafik dönemlerine dayanıklı yapı.' },
      { title: 'Hız Optimizasyonu', description: 'Görsel ağırlıklı sitelerde performans.' },
      { title: 'Google Index Desteği', description: 'Yerel ve turistik anahtar kelimeler.' },
    ],
    blocks: [
      { heading: 'Çok dilli hazırlık', text: 'İsteğe bağlı İngilizce katman; yabancı ziyaretçi yolculuğu.' },
      { heading: 'Sosyal kanıt', text: 'Yorum ve ödül alanları güveni artırır; abartılı slider kullanılmaz.' },
    ],
    ctaClosing: 'Çanakkale web tasarım brief’inizi iletin.',
  },
  {
    slug: 'balikesir-web-tasarim',
    cityKey: 'balikesir',
    cityName: 'Balıkesir',
    defaultCity: 'Balıkesir',
    meta: {
      title: 'Balıkesir Web Tasarım | Ege ve Marmara Dijital',
      description:
        'Balıkesir web tasarım: tarım, turizm ve sanayi işletmeleri için modern arayüz. MK Digital Systems ile ölçeklenebilir web.',
      ogTitle: 'Balıkesir Web Tasarım',
      ogDescription: 'Balıkesir’de premium ve sade web tasarım çözümleri.',
    },
    hero: {
      eyebrow: 'Balıkesir · Web',
      title: 'Balıkesir Web Tasarım Hizmetleri',
      description:
        'Edremit’ten bandırmaya uzanan ticaret hacminde güven veren siteler. Balıkesir’de üretim ve hizmet markaları için net dijital iletişim.',
      ctaLabel: 'Balıkesir Web Teklifi',
    },
    introTitle: 'İki kıyının ortasında güçlü vitrin',
    introText:
      'Bölgesel SEO ve marka anlatımı birlikte düşünülür. Tarım ihracatı veya turizm odaklı işletmelerde farklı görsel dil uygulanır.',
    servicesTitle: 'Balıkesir web paketi',
    servicesSubtitle: 'Sektörünüze göre özelleşen modüller.',
    services: [
      { title: 'Web Tasarım', description: 'Balıkesir pazarına uygun arayüz üretimi.' },
      { title: 'Kurumsal Web Sitesi', description: 'Çok ürünlü ve çok şubeli yapılar.' },
      { title: 'Mobil Uyumlu Site', description: 'Sahil ve kırsal trafik için responsive yapı.' },
      { title: 'SEO Uyumlu Tasarım', description: 'İl ve ilçe bazlı arama hedefleri.' },
      { title: 'E-Ticaret Web Sitesi', description: 'Yöresel ürün ve marka mağazaları.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Toplu sipariş ve bilgi hatları.' },
    ],
    blocks: [
      { heading: 'Sektör esnekliği', text: 'Zeytin, turizm veya sanayi — her biri için ayrı içerik akışı tasarlanır.' },
      { heading: 'Performans', text: 'Görsel ağırlık kontrol altında; sayfa hızı korunur.' },
    ],
    ctaClosing: 'Balıkesir web tasarım projenizi tanımlayın.',
  },
  {
    slug: 'balikesir-dijital-ajans',
    cityKey: 'balikesir',
    cityName: 'Balıkesir',
    defaultCity: 'Balıkesir',
    meta: {
      title: 'Balıkesir Dijital Ajans Hizmeti | Web ve Marka',
      description:
        'Balıkesir dijital ajans yaklaşımı: web tasarım, marka sitesi, SEO ve yönetim paneli tek çatıda. Mustafa Öner / MK Digital Systems.',
      ogTitle: 'Balıkesir Dijital Ajans',
      ogDescription: 'Web, yazılım ve dijital marka üretimi Balıkesir işletmeleri için.',
    },
    hero: {
      eyebrow: 'Balıkesir · Dijital',
      title: 'Balıkesir Dijital Ajans ve Web Üretimi',
      description:
        'Ajans disiplininde strateji, tasarım ve geliştirme tek elde. Balıkesir’de büyüyen markalar için uçtan uca dijital ürün ortağı.',
      ctaLabel: 'Ajans Paketi Konuşalım',
    },
    introTitle: 'Tek ekip, net sorumluluk',
    introText:
      'Tasarım ve kod aynı vizyonda ilerler; iletişim kopukluğu yaşanmaz. Demo ve vitrin projelerimiz teknik yetkinliğin kanıtı olarak sunulur.',
    servicesTitle: 'Dijital ajans kapsamı',
    servicesSubtitle: 'Marka, web ve sistem üçlüsü.',
    services: [
      { title: 'Dijital Marka Çözümleri', description: 'Logo rehberi ile uyumlu web arayüzü.' },
      { title: 'Kurumsal Web Sitesi', description: 'Ajans kalitesinde kurumsal platform.' },
      { title: 'Next.js Web Çözümleri', description: 'Modern geliştirme standartları.' },
      { title: 'Admin Panelli Sistem', description: 'İçerik ve kampanya yönetimi.' },
      { title: 'SEO Uyumlu Site', description: 'Balıkesir aramalarında görünürlük planı.' },
      { title: 'Özel Yazılım', description: 'CRM, teklif veya portal ihtiyaçları.' },
    ],
    blocks: [
      { heading: 'Kanıt odaklı', text: 'Müşteri gizliliği gereği canlı referans yerine demo ve kişisel portföy projeleri gösterilir.' },
      { heading: 'Uzun soluklu', text: 'Yayın sonrası bakım ve küçük iterasyonlar için sürdürülebilir anlaşma modeli.' },
    ],
    ctaClosing: 'Balıkesir dijital ajans ihtiyacınızı formda paylaşın.',
  },
  {
    slug: 'bartin-web-tasarim',
    cityKey: 'bartin',
    cityName: 'Bartın',
    defaultCity: 'Bartın',
    meta: {
      title: 'Bartın Web Tasarım | Karadeniz Kıyı Dijital',
      description:
        'Bartın web tasarım: yerel hizmet, turizm ve perakende için sade premium arayüz. Hızlı teslim ve WhatsApp talep hattı.',
      ogTitle: 'Bartın Web Tasarım',
      ogDescription: 'Bartın işletmeleri için modern web tasarım hizmetleri.',
    },
    hero: {
      eyebrow: 'Bartın · Tasarım',
      title: 'Bartın Web Tasarım',
      description:
        'Karadeniz kıyısındaki işletmeler için ferah, güvenilir web arayüzleri. Bartın’da küçük ve orta ölçekli markalar için özel tasarım.',
      ctaLabel: 'Bartın Tasarım Talebi',
    },
    introTitle: 'Kıyı şehri, net dijital mesaj',
    introText:
      'Turizm ve yerel ticaret için mevsimsel kampanya alanları planlanır. Gereksiz animasyon yerine hız ve okunabilirlik önceliklidir.',
    servicesTitle: 'Bartın web hizmetleri',
    servicesSubtitle: 'Yerel ölçek, profesyonel çıktı.',
    services: [
      { title: 'Web Tasarım', description: 'Bartın’a özel layout ve renk dengesi.' },
      { title: 'Landing Page', description: 'Etkinlik ve sezon duyuruları.' },
      { title: 'Mobil Uyumlu Web Sitesi', description: 'Kıyı ziyaretçisi için telefon deneyimi.' },
      { title: 'Kurumsal Web Sitesi', description: 'Hizmet ve iletişim odaklı yapı.' },
      { title: 'Hız Optimizasyonu', description: 'Hafif sayfa mimarisi.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Hızlı iletişim kanalı.' },
    ],
    blocks: [
      { heading: 'Yerel SEO', text: 'Bartın + hizmet sayfaları özgün metinle; şehir spamı yapılmaz.' },
      { heading: 'Premium sade', text: 'Glass ve boşluk kullanımı site genel tasarımıyla uyumlu.' },
    ],
    ctaClosing: 'Bartın web tasarım projenizi başlatın.',
  },
  {
    slug: 'bartin-mobil-uyumlu-web-sitesi',
    cityKey: 'bartin',
    cityName: 'Bartın',
    defaultCity: 'Bartın',
    meta: {
      title: 'Bartın Mobil Uyumlu Web Sitesi | Responsive Çözüm',
      description:
        'Bartın mobil uyumlu web sitesi: telefon ve tablette kusursuz gezinme, hızlı form ve WhatsApp. Google mobil öncelikli indeks uyumu.',
      ogTitle: 'Bartın Mobil Uyumlu Web',
      ogDescription: 'Responsive tasarım ve performans odaklı Bartın web sitesi.',
    },
    hero: {
      eyebrow: 'Bartın · Mobil',
      title: 'Bartın Mobil Uyumlu Web Sitesi',
      description:
        'Ziyaretçilerin büyük bölümü telefondan geliyor; Bartın’da işletmeniz için thumb-friendly menü, büyük CTA ve hızlı form sunuyoruz.',
      ctaLabel: 'Mobil Site Paketi',
    },
    introTitle: 'Mobil önce, masaüstü güçlü',
    introText:
      'Breakpoint’lerde içerik önceliği yeniden sıralanır; küçük ekranda kaybolan metin kalmaz. Core Web Vitals hedefleri gözetilir.',
    servicesTitle: 'Mobil odaklı modüller',
    servicesSubtitle: 'Dokunmatik deneyim ve hız ön planda.',
    services: [
      { title: 'Mobil Uyumlu Web Sitesi', description: 'Responsive grid ve esnek görseller.' },
      { title: 'Hız Optimizasyonu', description: 'Mobil ağda hızlı ilk boyama.' },
      { title: 'Web Tasarım', description: 'Mobil menü ve CTA yerleşimi.' },
      { title: 'SEO Uyumlu Site', description: 'Mobil indeks dostu yapı.' },
      { title: 'WhatsApp Entegrasyonu', description: 'Tek dokunuşla mesaj.' },
      { title: 'Landing Page', description: 'Kampanya için tek sayfa mobil vitrin.' },
    ],
    blocks: [
      { heading: 'Dokunmatik UX', text: 'Buton boyutu, form alanı ve tıklanabilir alanlar parmak dostu.' },
      { heading: 'Test disiplini', text: 'Yayın öncesi gerçek cihaz genişliğinde kontrol önerilir.' },
    ],
    ctaClosing: 'Bartın mobil uyumlu siteniz için talep oluşturun.',
  },
]

const slugSet = new Set(LOCAL_SEO_PAGES.map((p) => p.slug))

export function isLocalSeoSlug(slug) {
  return slugSet.has(slug)
}

export function getLocalSeoPage(slug) {
  return LOCAL_SEO_PAGES.find((p) => p.slug === slug) ?? null
}

export function getAllLocalSeoSlugs() {
  return LOCAL_SEO_PAGES.map((p) => p.slug)
}

/** Footer pill için şehir → sayfa slug listesi */
export const FOOTER_SEO_CITIES = [
  { key: 'bolu', label: 'Bolu' },
  { key: 'adapazari', label: 'Adapazarı' },
  { key: 'zonguldak', label: 'Zonguldak' },
  { key: 'izmit', label: 'İzmit' },
  { key: 'duzce', label: 'Düzce' },
  { key: 'canakkale', label: 'Çanakkale' },
  { key: 'balikesir', label: 'Balıkesir' },
  { key: 'bartin', label: 'Bartın' },
]

/** Footer ve şehir içi linkler için kısa etiketler */
export const PAGE_LINK_LABELS = {
  'bolu-web-tasarim': 'Web Tasarım',
  'bolu-kurumsal-web-sitesi': 'Kurumsal Web Sitesi',
  'izmit-web-tasarim': 'Web Tasarım',
  'izmit-fabrika-web-sitesi': 'Fabrika & Sanayi',
  'adapazari-e-ticaret-web-sitesi': 'E-Ticaret / Mağaza',
  'adapazari-web-tasarim': 'Web Tasarım',
  'duzce-seo-uyumlu-web-sitesi': 'SEO Uyumlu Site',
  'duzce-kurumsal-web-tasarim': 'Kurumsal Web Tasarım',
  'zonguldak-web-tasarim': 'Web Tasarım',
  'zonguldak-kucuk-isletme-web-sitesi': 'Küçük İşletme',
  'canakkale-otel-web-sitesi': 'Otel & Turizm',
  'canakkale-web-tasarim': 'Web Tasarım',
  'balikesir-web-tasarim': 'Web Tasarım',
  'balikesir-dijital-ajans': 'Dijital Ajans',
  'bartin-web-tasarim': 'Web Tasarım',
  'bartin-mobil-uyumlu-web-sitesi': 'Mobil Uyumlu Site',
}

export function getPageLinkLabel(slug) {
  return PAGE_LINK_LABELS[slug] || getLocalSeoPage(slug)?.hero?.title || slug
}

export function getSlugsForCityKey(cityKey) {
  return LOCAL_SEO_PAGES.filter((p) => p.cityKey === cityKey).map((p) => p.slug)
}

/** Aynı şehirdeki tüm landing sayfaları */
export function getPagesForCityKey(cityKey) {
  return LOCAL_SEO_PAGES.filter((p) => p.cityKey === cityKey).map((p) => ({
    slug: p.slug,
    label: getPageLinkLabel(p.slug),
    isStore: p.slug.includes('e-ticaret') || p.slug.includes('magaza'),
  }))
}

/** Mevcut sayfa hariç, aynı şehirdeki diğer sayfalar */
export function getSiblingPages(currentSlug) {
  const page = getLocalSeoPage(currentSlug)
  if (!page) return []
  return getPagesForCityKey(page.cityKey).filter((p) => p.slug !== currentSlug)
}

export function pickRandomSlugForCity(cityKey) {
  const slugs = getSlugsForCityKey(cityKey)
  if (!slugs.length) return '/'
  return `/${slugs[0]}`
}
