# Bolu ve Osmaniye SEO iyileştirmeleri

17 Eylül 2026. Değişiklikler yerelde hazırlandı. Commit, push ve yayın yapılmadı.

## 1. Değiştirilen dosyalar

13 uygulama dosyası, bir doğrulama betiği ve bu rapor. Dosya bazında açıklamalar aşağıdadır.

## 2. Her dosyada yapılan değişiklik

| Dosya | Değişiklik |
| --- | --- |
| `lib/landingPages/pages.js` | Bolu ve Osmaniye hub paragraflarına kurumsal sayfa bağlantıları eklendi. Osmaniye kafe sayfasının metadata, H1, açıklama, çözüm, süreç ve FAQ metinleri kafe/restoran odağına getirildi. Örnek proje listesi Mavi Kafe ile sınırlandı. |
| `lib/landingPages/routes.js` | Kafe sayfasının görünen adı “Osmaniye Kafe ve Restoran Web Sitesi” oldu. Slug aynı kaldı. |
| `components/landingPages/LandingPageContent.js` | Mevcut çözüm paragraflarına isteğe bağlı gerçek `<a href>` üreten Next Link desteği eklendi. |
| `lib/localSeo/cityPages/originalCityPages.js` | Yalnız Bolu kurumsal sayfasının metadata ve içerikleri üretici/tedarikçi, katalog, panel ve B2B bilgi sunumuna göre düzenlendi. |
| `lib/localSeo/cityPages/newCityPages.js` | Yalnız Osmaniye kurumsal sayfasının metadata ve içerikleri üretim/ticaret, katalog güncelliği, referans ve içerik yetkilerine göre düzenlendi. |
| `app/[slug]/page.js` | Eski Türkçe yerel sayfaların BreadcrumbList ana sayfa hedefi `/tr` oldu. |
| `app/projects/[slug]/page.js` | İngilizce proje BreadcrumbList ana sayfa hedefi `/en` oldu. |
| `app/services/page.js` | İngilizce hizmet BreadcrumbList ana sayfa hedefi `/en` oldu. |
| `app/contact/page.js` | İngilizce iletişim BreadcrumbList ana sayfa hedefi `/en` oldu. |
| `lib/localSeo/projectPool.js` | Mevcut 12 proje için doğrulanmış Türkçe detay adresleri açıkça eşlendi. |
| `components/localSeo/LocalSeoProjectCard.js` | Proje detay bağlantıları Türkçe hedefe gider. Detay sayfası olmayan MK Digital Systems için `/tr/projects` ve “Projeleri İncele” kullanılır. |
| `components/localSeo/LocalSeoSampleProjects.js` | Genel proje arşivi bağlantısı `/tr/projects` olarak düzeltildi. |
| `seo/openGraph.js` | İki mevcut ortak görsel için boyut bildirimi gerçek dosya ölçüsü olan 1536×1024 olarak düzeltildi. Özel görsel verilirse ölçüsü tahmin edilmez. |
| `scripts/verify-seo-intent.mjs` | Önceki ve yeni üretim derlemelerini 94 URL üzerinde karşılaştıran metadata, breadcrumb, FAQ, işletme verisi ve bağlantı kontrolleri eklendi. |
| `docs/seo-intent-improvements-report.md` | Bu teslim raporu. |

## 3. Değiştirilen title ve description listesi

**`/bolu-kurumsal-web-sitesi`**

- Title: Bolu Kurumsal Web Sitesi | Yönetim Paneli ve B2B Yapı
- Description: Bolu’daki üretici ve tedarikçiler için yönetim panelli kurumsal web sitesi. Hizmet, katalog ve referans sayfalarını işletmenizin yapısına göre planlayın.

**`/osmaniye-kurumsal-web-sitesi`**

- Title: Osmaniye Kurumsal Web Sitesi | Katalog ve Yönetim Paneli
- Description: Osmaniye’de üretim ve ticaret firmaları için kurumsal web sitesi. Katalog, referans ve yönetim paneli ihtiyaçlarınıza uygun sayfa yapısını birlikte belirleyelim.

**`/tr/osmaniye-cafe-kurumsal-web-sitesi`**

- Title: Osmaniye Kafe ve Restoran Web Sitesi | Menü ve Rezervasyon
- Description: Osmaniye kafe ve restoranları için menü, galeri, konum ve rezervasyon talebi odaklı web sitesi. Mavi Kafe demosuyla işletmenize uygun yapıyı inceleyin.

Bu üç sayfanın OG başlık ve açıklamaları da yeni metinlerle tutarlıdır. Diğer 91 sayfanın title, description ve OG başlık/açıklamaları önceki derlemeyle aynıdır. İstenen iki hub, iki şantiye, Bolu otel ve fotoğrafçı metadata'sı korundu. Yeni meta keywords eklenmedi.

## 4. Eklenen ve düzeltilen iç bağlantılar

| Kaynak | Görünen bağlantı metni | Hedef |
| --- | --- | --- |
| `/tr/bolu-web-tasarim` | Bolu kurumsal web sitesi | `/bolu-kurumsal-web-sitesi` |
| `/tr/osmaniye-web-tasarim` | Osmaniye kurumsal web sitesi | `/osmaniye-kurumsal-web-sitesi` |
| `/tr/osmaniye-cafe-kurumsal-web-sitesi` | kurumsal web sitesi çözümlerini | `/osmaniye-kurumsal-web-sitesi` |

Üçü de görünür çözüm paragrafında gerçek HTML bağlantısıdır. İki kurumsal sayfa hub üzerinden erişilebilir hale geldi. Hub sayfalarındaki diğer sektör bağlantıları ve genel şantiye sayfasıyla iki şehir şantiye sayfasının karşılıklı bağlantıları doğrulandı. Footer'a şehir listesi eklenmedi.

Türkçe proje eşlemeleri: `mk-ops`, `musty-music`, `mavi-iletisim`, `hukuk-burosu`, `mavi-danismanlik`, `guzellik-salonu`, `mavi-sarkilar`, `aria`, `mavi-kadraj`, `kadraj-rotam`, `gonul-pusulasi`, `siir-dunyasi`. Tam adresler `/tr/projects/` ile başlar. Her hedef mevcut sitemap'te ve HTTP 200 durumundadır.

Kafe sayfasında yalnız Mavi Kafe örneği kaldığı için Mavi İletişim, Mavi Danışmanlık ve Mavi Adisyon detaylarındaki otomatik ilgili sayfa listeleri de bu ilişkiyi artık üretmez.

## 5. Arama niyeti ve içerik ayrımları

- **Bolu hub:** Genel web tasarım ve sektör örnekleri.
- **Bolu kurumsal:** Üretici/tedarikçi ürün bilgisi, teknik katalog, satın alma öncesi bilgi, panelden güncelleme ve gerçek referansların sunumu.
- **Osmaniye hub:** Genel işletme web tasarımı ve iletişim.
- **Osmaniye kurumsal:** Üretim/ticaret bilgilerinin güncelliği, katalog alanları, içeriği hazırlayan ve kontrol eden kişilerin yetkileri, referans ve B2B iletişimi.
- **Osmaniye kafe/restoran:** Menü, yemek sunumu, galeri, mobil kullanım, konum ve rezervasyon talebi; Mavi Kafe demosu.

İki kurumsal sayfanın girişleri, hizmet açıklamaları, içerik blokları, avantajları ve altışar FAQ sorusu/yanıtı ayrı yazıldı. Yönetim paneli ve yetkiler proje ihtiyacına göre planlanan kapsam olarak anlatıldı. Hayali müşteri, ofis, istatistik veya başarı hikâyesi eklenmedi. Kafe sayfası rezervasyon talebinin otomatik masa tahsisi/onayı olmadığını açıklar; ödeme ve POS dahilmiş gibi sunulmaz.

## 6. Breadcrumb düzeltmeleri

Dört şablondaki `/` ana sayfa hedefi düzeltildi: 26 Türkçe yerel sayfa `/tr`; 22 İngilizce proje, hizmet ve iletişim sayfaları `/en` kullanır. Önceden doğru olan breadcrumb'lar korundu. Toplam 90 BreadcrumbList üzerinde dil hedefi doğrulandı. Route mimarisi değişmedi.

## 7. Structured data

40 FAQPage içindeki bütün soru ve yanıtların sayfa HTML içeriğiyle eşleştiği doğrulandı. Üç düzenlenen sayfanın FAQ verisi mevcut ortak içerik kaynağından üretilir. Kafe Service adı/açıklaması ve breadcrumb etiketi yeni odağı yansıtır. Tüm JSON-LD blokları geçerli JSON olarak ayrıştırıldı.

LocalBusiness bulunan dokuz sayfadaki işletme verileri önceki derlemeyle birebir aynıdır; yalnız mevcut Bolu ve Osmaniye şubeleri kullanılır. Yeni Review, AggregateRating, puan veya fiyat verisi eklenmedi. Person, Organization ve WebSite yapıları değiştirilmedi.

## 8. Redirect, canonical ve sitemap

- Sitemap URL listesi önceki sürümle aynı: 94 benzersiz adres.
- 94/94 URL HTTP 200 ve tek, kendisini gösteren canonical üretir; hiçbirinde noindex yoktur.
- Eski `/bolu-web-tasarim` → 301 → `/tr/bolu-web-tasarim` çalışır.
- Eski `/osmaniye-web-tasarim` → 301 → `/tr/osmaniye-web-tasarim` çalışır.
- İki yönlendirme sorgu parametresiyle de doğrulandı; hedefler HTTP 200. Eski adresler sitemap'te bulunmaz.
- `robots.txt` önceki derlemeyle aynıdır. Türkçe bölgesel sayfalarda canonical ve dil alternatifleri korundu.
- Site içi bağlantılardaki 95 farklı yol kontrol edildi; kırık hedef yoktur. `/` için mevcut 307 → `/tr` davranışı sürer.

## 9. Build ve test sonucu

Son üretim derlemesi başarılı: `NEXT_BUILD_DIR=.next-seo-intent npm run build`. Derleme, lint ve tip kontrolleri geçti; 102 statik sayfa üretildi. Bu sayı sitemap URL sayısından farklıdır; sitemap 94 canonical adres içerir.

`scripts/verify-seo-intent.mjs` başarılı: 94 sayfa, 91 korunmuş metadata, tam istenen metinlere sahip üç metadata değişikliği, 90 doğru breadcrumb, 40 uyumlu FAQPage ve üç bağlamsal bağlantı. Sonradan eklenen karakter bozulması kontrolü de çalıştırıldı.

`scripts/verify-local-seo-canonicals.mjs` başarılı: 94 canonical URL, 95 iç hedef, iki 301, dokuz yerel sayfa × 360/390/430/1440 piksel = 36 tarayıcı kontrolü. Her sayfada tek H1, yatay taşma yok, JavaScript çalışma zamanı hatası yok. Ekran görüntüleri alındı; düzenlenen sayfaların mobil ve masaüstü görünümleri örneklenerek incelendi.

İki şehir veri dosyasındaki diğer sayfa nesneleri Git HEAD ile karşılaştırıldı ve değişmediği doğrulandı. `git diff --check` başarılı. Metin yazımı sırasında saptanan Türkçe karakter kaybı düzeltildi ve üretim derlemesi yeniden alındı.

Mevcut Browserslist güncellik, webpack önbelleği ve isteğe bağlı sharp uyarıları derlemeyi engellemedi. Bu çalışma için bağımlılık yükseltmesi yapılmadı. Tarayıcı testlerinde harici istekler engellendi; Google Maps ve harici demo servislerinin canlı davranışı bu yerel testlerin kapsamında değildir.

Test çıktıları `.next-verify/intent-check/results.json` ve `.next-verify/canonical-check/results.json` altında, ekran görüntüleri aynı klasörlerdedir. `.next-verify` Git tarafından izlenmez.

Tekrarlama için önceki üretim derlemesini 3101, yeni derlemeyi 3102 portunda başlatın. `PLAYWRIGHT_MODULE` mevcut Playwright modülünün tam dosya yolunu, `CHROMIUM_EXECUTABLE` kurulu Chromium dosyasını göstermelidir. Ardından `node scripts/verify-seo-intent.mjs` ve `node scripts/verify-local-seo-canonicals.mjs` çalıştırılır. Karşılaştırma betiğinin temel URL'leri `SEO_BASE_URL` ve `SEO_BASELINE_URL` ile değiştirilebilir.

## 10. Bilerek dokunulmayan konular

Yeni şehir/sayfa, slug, toplu redirect veya noindex değişikliği yapılmadı. Eski 26 yerel URL taşınmadı ve kaldırılmadı. Bu grubun yalnız açıkça istenen iki kurumsal sayfasının metinleri değişti; ortak breadcrumb/proje bağlantısı düzeltmeleri grup genelinde geçerlidir.

Tasarım sistemi, renk, font ve CSS/layout dosyaları değiştirilmedi; mevcut bileşenler kullanıldı. Kafe örneklerinin daraltılması mevcut tek kart görünümünü kullanır. Canonical, sitemap, redirect konfigürasyonu, ana sayfa ve diğer proje metadata'sı korunur. Yeni OG görseli üretilmedi; mevcut görsel URL'leri aynı kaldı.

Önceki denetimde saptanan MK Farm ve MK TraceOps TR/EN ortak title grupları ile diğer şehirlerin kapsamlı içerik/bağlantı çalışması bu görevin dışında bırakıldı. Commit ve push yapılmadı.
