# Yerel SEO canonical düzenlemesi

Tarih: 16 Eylül 2026. Commit, push ve deploy yapılmadı.

## 1–4. Envanter ve arama niyeti kararı

App Router dosyaları, iki dinamik SEO veri kümesi, proje rotaları, middleware, Next.js config, sitemap, dil yardımcıları ve bağlantı üreticileri incelendi. Önceki sitemap 96 URL içeriyordu: 28 eski yerel SEO sayfası, 14 yeni Türkçe landing sayfası ve 54 ana/proje sayfası. `/`, eski showcase yönlendirmeleri, robots ve sitemap ayrıca incelendi. Bu analiz kaynak içeriklerine dayanır; Search Console sorgu/tıklama verilerine erişilmedi. Gerçek sıralama kaybı tespit edildiği iddia edilmez.

| Eski URL | Yeni aday / karşılaştırma | Karar ve gerekçe |
|---|---|---|
| `/bolu-web-tasarim` | `/tr/bolu-web-tasarim` | 301. Eski H1 “Bolu Web Tasarım”, title “Bolu Web Tasarım \| Turizm, Perakende ve Hizmet İçin Dijital Vitrin”. Yeni title “Bolu Web Tasarım \| Sektörünüze Uygun Site Örnekleri”, H1 “Bolu’da işletmenize uygun web sitesini birlikte kuralım”. İki description ve içerik de şehirde işletme web sitesi yaptırma, mobil deneyim ve iletişim talebine odaklanıyor. Aynı temel ticari niyet; yeni sayfa güncel portföy ve şube bilgileriyle ana hedef. |
| `/osmaniye-web-tasarim` | `/tr/osmaniye-web-tasarim` | 301. Eski H1 “Osmaniye Web Tasarım”, title “Osmaniye Web Tasarım \| Tarım ve Ticaret İçin Dijital Vitrin”. Yeni title “Osmaniye Web Tasarım \| İşletmeden İletişime Net Bir Yol”, H1 “Osmaniye işletmeleri için hizmeti açık, iletişimi kolay web siteleri”. Sektör örnekleri değişse de description, hizmet ve CTA aynı şehirde web tasarım satın alma niyetini hedefliyor. |
| `/bolu-kurumsal-web-sitesi` | `/tr/bolu-web-tasarim` | Ayrı kalır. H1 “Bolu Kurumsal Web Sitesi”, title “Bolu Kurumsal Web Sitesi \| KOBİ ve Ticaret İçin Güven”. Description çok sayfalı yapı, yönetim paneli ve referans alanlarına; içerik üretici, tedarikçi, kalite, katalog, yetkilendirme ve kurumsal bakıma odaklı. Genel sektör vitrininin açıkça eski kopyası değil. |
| `/osmaniye-kurumsal-web-sitesi` | `/tr/osmaniye-web-tasarim`, `/tr/osmaniye-cafe-kurumsal-web-sitesi` | Ayrı kalır. H1 “Osmaniye Kurumsal Web Sitesi”, title “Osmaniye Kurumsal Web Sitesi \| KOBİ ve Ticaret İçin Güven”. Description ve içerik tarım/ticaret firmalarının çok sayfalı şirket yapısı, katalog, referans, kalite ve yönetim paneli ihtiyacını ele alıyor. Yeni cafe sayfasında kurumsal hizmet anlatımıyla kısmi örtüşme var, ancak ana akış menü, mekân, talep ve tanıtım/operasyon ayrımı; birebir yerine geçen sayfa olduğuna dair yeterli kanıt yok. Search Console ile izlenmeli. |

Korunan kurumsal sayfalar self-canonical ve indekslenebilir kalır. Bunlara karşılık olmayan `/tr/...` sayfaları oluşturulmadı. Diğer şehirlerin mevcut sayfaları, farklı coğrafya/hizmet niyeti nedeniyle taşınmadı. Genel web tasarım, özel yazılım ve çiftlik yönetimi sayfaları da bu şehir sayfalarının yerine geçmez.

Yeni Bolu ana adresleri:
- `/tr/bolu-web-tasarim`
- `/tr/bolu-otel-pansiyon-web-sitesi` — oda/konaklama ve rezervasyon talebi
- `/tr/bolu-fotografci-web-sitesi` — fotoğraf portföyü/galeri
- `/tr/bolu-santiye-yonetim-sistemi` — şantiye operasyon yazılımı

Yeni Osmaniye ana adresleri:
- `/tr/osmaniye-web-tasarim`
- `/tr/osmaniye-cafe-kurumsal-web-sitesi` — menü/mekân ve hizmet tanıtımı
- `/tr/osmaniye-santiye-yonetim-sistemi` — şantiye operasyon yazılımı

## 5. Kalıcı yönlendirmeler

`next.config.mjs` içinde `statusCode: 301` kullanılır. `permanent: true` Next.js'te 308 ürettiği için açık HTTP 301 seçildi. İncelenmiş eşleştirmeler `lib/localSeo/canonicalRoutes.mjs` içinde tek kaynaktır.

| Kaynak | HTTP | Nihai hedef |
|---|---|---|
| `/bolu-web-tasarim` | 301 | `https://mustafaoner.net/tr/bolu-web-tasarim` |
| `/osmaniye-web-tasarim` | 301 | `https://mustafaoner.net/tr/osmaniye-web-tasarim` |

Mutlak hedef, eski www adresinden de canonical non-www adresine doğrudan geçiş sağlar. Eski içerik veri kayıtları silinmedi; Next.js yönlendirmeyi sayfa çözümlemesinden önce uygular.

## 6. İç bağlantılar

Footer şehir ve hizmet bağlantıları (`FooterLocalSeoCities`), şehir içi hizmet geçişleri (`LocalSeoCityNav`), diğer şehir bağlantıları (`LocalSeoOtherCities`) ve `pickRandomSlugForCity` artık ortak `localSeoHref` yardımcısını kullanıyor. Label ve tasarım korunuyor. Yeni landing, proje ve BranchLocation bağlantıları zaten `/tr/` hedefindeydi. Eski slugların içerik/veri tanımlarında bulunması, eski adrese bağlantı verildiği anlamına gelmez.

## 7. Sitemap

Sadece iki yönlendirilen URL çıkarıldı. Yeni canonical adresler birer kez mevcut; ayrı tutulan kurumsal sayfalar korundu. Sitemap 96 → 94 URL. Robots kuralları değiştirilmedi; yönlendirme kaynaklarını robots ile engelleyen kural eklenmedi.

## 8–9. Canonical, hreflang ve structured data

Yeni landing metadata'sı self-canonical, `tr` ve `x-default` alternatiflerini zaten doğru veriyor; hayali İngilizce alternatif eklenmedi. BranchLocation LocalBusiness URL'leri zaten `/tr/bolu-web-tasarim` ve `/tr/osmaniye-web-tasarim`. Service, FAQPage ve BreadcrumbList yeni URL'leri kullanıyor. Taşınmayan kurumsal sayfanın WebPage/Breadcrumb URL'si kendi adresinde kalır; içerdiği şube kaydının URL'si şubenin ana `/tr/` sayfasına işaret eder. Bu farklı varlıkların URL'leri çelişki değildir.

## 10–11. Doğrulama

Tekrarlanabilir test: `scripts/verify-local-seo-canonicals.mjs`. Önceki testlerin veri modülü okuyucuları `.mjs` uzantısını destekleyecek şekilde düzeltildi; önceki görevlerin tarihsel baseline karşılaştırmaları bu göç için kullanılmamalıdır.

- Production build: başarılı, 102 sayfa üretimi; build içi lint/type kontrolleri başarılı. Önceden bulunan Browserslist eskilik ve webpack cache snapshot uyarıları devam ediyor; derleme hatası yok.
- İki eski URL: GET ve HEAD için 301; hedefler yerel production sürümünde doğrudan 200. Sorgu parametresi korunuyor. `www` Host başlığıyla da mutlak non-www hedef doğrulandı. Kaynak/hedef arasında loop veya ara uygulama yönlendirmesi yok.
- 94 sitemap sayfası: tamamı 200; her birinde tek, kendisini gösteren canonical; yönlendirilen iki adres sitemap'te yok.
- 94 sayfanın metadata, header, main ve footer HTML'i önceki production build ile karşılaştırıldı. İzin verilen iki href değişimi dışında fark yok. İçerik ve görsel tasarım korunuyor.
- 95 benzersiz site içi bağlantı yolu: kırık bağlantı yok; eski iki adrese bağlantı kalmadı. Önceden var olan `/` → `/tr` 307 yönlendirmesi korunuyor; bu iki SEO sayfasının yönlendirmesiyle ilgili değil.
- Structured data JSON blokları ayrıştırıldı; eski iki URL'ye referans yok. Yedi yeni Bolu/Osmaniye sayfasında `tr`/`x-default` doğru hedefte, hayali EN alternatifi yok.
- Yeni SEO sayfalarında yinelenen title/description yok. Site genelinde önceden mevcut iki TR/EN title eşleşmesi var: `/projects/mk-farm` ↔ `/tr/projects/mk-farm` ve `/projects/mk-traceops` ↔ `/tr/projects/mk-traceops`. Bunlar ürün adı başlıkları; dil canonical'ları ayrı ve bu görevde metadata değişmedi. Aynı description tekrarı yok.
- Kalan 9 Bolu/Osmaniye sayfası × 360, 390, 430, 1440 px = 36 tarayıcı kontrolü: birer H1, yatay taşma yok, çalışma zamanı JS hatası yok. Harici harita/analitik istekleri bu regresyon testinde engellendi; Google harita içeriği yeniden doğrulanmış sayılmaz.
- `git diff --check`: başarılı. Kaynak içerik dosyaları, CSS, haritalar ve şube bilgileri değiştirilmedi.

Test artefaktları (git dışında): `.next-verify/canonical-check/results.json`, `live-domains.json`, `route-inventory.json` ve ekran görüntüleri.

Tekrar çalıştırma: önceki build'i 3101, yeni `.next-seo-canonical` build'ini 3102 portunda başlatın. `SEO_BASELINE_URL=http://127.0.0.1:3101`, mevcut Playwright modülünü gösteren `PLAYWRIGHT_MODULE` ve tarayıcı yolunu gösteren `CHROMIUM_EXECUTABLE` ortam değişkenleriyle `node scripts/verify-local-seo-canonicals.mjs` çalıştırın. Baseline değişkeni verilmezse önceki build karşılaştırması atlanır.

Canlı domain denetimi (deploy öncesi): Her iki eski URL, HTTPS non-www ve HTTPS www üzerinden 200 dönüyor. HTTP non-www → HTTPS non-www ve HTTP www → HTTPS www mevcut 308 kurallarıyla çalışıyor. Bu çalışma henüz yayımlanmadığından canlı eski URL'lerde 301 beklenmez.

HTTP'den başlayan istekte mevcut barındırma HTTPS yükseltmesi ile yeni uygulama 301'i iki adım olacaktır. Uygulamada ara URL yoktur. HTTP isteklerini de tek adıma indirmek için hosting/CDN katmanında bu iki eski yolu doğrudan nihai HTTPS `/tr/` adresine bağlamak gerekir. Repoda hosting domain ayarı yok; bu görevde hesap ayarı değiştirilmedi. Next.js'in mevcut sondaki slash temizleme kuralı da slash eklenmiş alternatif URL'lerde ek 308 oluşturabilir; verilen slash'sız kaynaklar esas alınmıştır. Global slash davranışı diğer route'ları etkilememek için değiştirilmedi.

## 12. Yayın sonrası Search Console

1. Deploy sonrası iki eski HTTPS adresinde 301, iki yeni adreste 200 ve self-canonical kontrolünü tekrar çalıştırın.
2. Güncel `https://mustafaoner.net/sitemap.xml` sitemap'ini gönderin/yeniden okutun.
3. URL Denetleme'de yeni sayfaları inceleyin; gerekirse dizine eklenmesini isteyin. Google'ın seçtiği canonical adresi izleyin.
4. Eski URL'lerin “yönlendirmeli sayfa” olarak raporlanması beklenir. URL kaldırma aracını bu geçiş için kullanmayın; aynı domain içinde yol değişikliği için adres değişikliği bildirimi gerekmez.
5. Bolu/Osmaniye web tasarım ve kurumsal sorgularını sayfa bazında takip edin. Kurumsal sayfalar aynı sorgularda rekabet ediyorsa trafik, dönüşüm ve backlink verisiyle tekrar değerlendirin.
6. Kalıcı yönlendirmeleri en az bir yıl, mümkünse süresiz koruyun. Hosting üzerinden HTTP ve www davranışlarını ayrıca doğrulayın.

Kaynaklar: [Next.js redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects), [Google kalıcı yönlendirmeler](https://developers.google.com/search/docs/crawling-indexing/301-redirects), [Google URL değişikliğiyle taşıma](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## Teknik durum

Push için güvenli. Bu değerlendirme test edilen uygulama değişiklikleri içindir; canlı deploy doğrulaması ve hosting katmanındaki HTTP yükseltmesinin tek adımda birleştirilmesi ayrı yayın işlemleridir. Commit/push/deploy yapılmadı.
