# Google Maps şube entegrasyonu

İki gerçek şube, kullanıcının verdiği kayıtlarla merkezi `lib/branches.js` dosyasına tanımlandı. `mapsUrl` alanları birebir korundu:

- Bolu: https://share.google/NN1pgMOMagNid1Uhl
- Osmaniye: https://share.google/MRmkCVOsy2F1GeFXD

Kullanıcının sonradan verdiği iki “Harita yerleştir” URL’si aynen kullanıldı. İframe’ler gerçek Google haritalarını yükledi; kayıtların ilk paylaşım linklerindeki işletme kimlikleriyle eşleştiği doğrulandı. Bolu kaydının kimliği `/g/11z2w_8t6q`, Osmaniye kaydının kimliği `/g/11nw1gvgwq`.

Bolu adresi harita kaydından doğrulandı: Köroğlu, Sezgin Sk. No:9/1, 14650 Bolu Merkez/Bolu. Osmaniye adresi kullanıcı metni ve harita kaydında aynı: Merkez, Elif Hatunlar Cd., 80710 Düziçi/Osmaniye. İki kaydın telefonu 0545 659 75 51; web sitesi `https://mustafaoner.net`.

Yol tarifi adresleri [Google’ın belgelenmiş Maps URL yöntemiyle](https://developers.google.com/maps/documentation/urls/get-started) gerçek işletme Place ID’lerinden üretildi: Bolu `ChIJGY9ZkYk_nUAREyJv0XrdeII`, Osmaniye `ChIJO3pH_jHxLhURCxrzzyoz0HM`. Bu kimlikler verilen iframe’lerin Google çıktısından alındı; koordinat, adres veya başka işletme kaydı tahmin edilmedi. Google Haritalar’da Aç düğmesi orijinal paylaşım bağlantısını kullanır.

## Ortak bileşen ve dosyalar

- `components/BranchLocation.js`: Server component; şube adı, adres, telefon, WhatsApp, web sitesi, Google Maps, yol tarifi, mevcut projeler ve iletişim bağlantıları. İframe `loading="lazy"`, erişilebilir başlık, mobilde 320 px ve desktop’ta 380 px yükseklikle gösterilir. Harita çalışmasa bile bağlantılar bağımsızdır. Masaüstünde bilgiler solda, harita sağda; mobilde bilgiler üstte, harita alttadır.
- `lib/branches.js`: Sadece Bolu ve Osmaniye kayıtları, şehir eşleştirmesi ve LocalBusiness yardımcısı. Üçüncü şube yalnızca açıkça bu kaynağa eklenirse görüntülenir.
- `components/localSeo/LocalSeoPageContent.js`: Eski kök şehir sayfalarına ortak bileşen eklendi.
- `components/landingPages/LandingPageContent.js`: Yeni `/tr` sayfalarına aynı bileşen eklendi.
- `lib/landingPages/pages.js`, `cityPages.js`: Bolu/Osmaniye’de fiziksel şube bulunmadığını düşündürebilecek eski açıklamalar yeni bilgiyle tutarlı hale getirildi. Diğer şehirlerde fiziksel şube iddiası eklenmedi.
- `scripts/verify-branch-locations.mjs`: Sayfa/şube eşleşmesi, metadata, canonical, sitemap, schema, header/footer, JS boyutu ve responsive kontrolleri.

## Bolu’ya bağlanan 6 sayfa

1. `/bolu-web-tasarim`
2. `/bolu-kurumsal-web-sitesi`
3. `/tr/bolu-web-tasarim`
4. `/tr/bolu-otel-pansiyon-web-sitesi`
5. `/tr/bolu-fotografci-web-sitesi`
6. `/tr/bolu-santiye-yonetim-sistemi`

## Osmaniye’ye bağlanan 5 sayfa

1. `/osmaniye-web-tasarim`
2. `/osmaniye-kurumsal-web-sitesi`
3. `/tr/osmaniye-web-tasarim`
4. `/tr/osmaniye-cafe-kurumsal-web-sitesi`
5. `/tr/osmaniye-santiye-yonetim-sistemi`

## Structured data

Her ilgili sayfada yalnızca o şubeye ait bir LocalBusiness nesnesi üretilir. İçerik: gerçek işletme adı, sabit şube `@id`, canonical şube sayfası, PostalAddress, telefon, verilen Maps URL’si ile `hasMap`/`sameAs`, mevcut Organization’a `parentOrganization` bağı.

Review, rating, kuruluş tarihi, çalışma saatleri veya koordinat eklenmedi. Global Organization/Person/WebSite ve mevcut Service/FAQ/Breadcrumb şemaları tekrar oluşturulmadı. Diğer şehirlerde LocalBusiness üretilmez. Osmaniye SSS metnindeki değişiklik aynı kaynaktan FAQPage’e yansır.

## Doğrulama

Son `npm.cmd run build` başarılı; 102 sayfa üretildi. `npm.cmd run lint` ve son build’in lint/type validation aşaması başarılı. Proje JavaScript; bağımsız TypeScript projesi yok. Build ayrı `.next-seo-branches` klasöründe çalıştırıldı.

Değişiklik öncesi production çıktısıyla 42 landing ve 7 kontrol sayfası olmak üzere 49 URL karşılaştırıldı: metadata, canonical, header ve footer aynı. Sitemap URL listesi ve robots çıktısı aynı. Kontrol sayfaları ana sayfa, proje listeleri ve TR/EN proje detaylarını kapsıyor.

11 ilgili sayfa × 360 / 390 / 430 / 1440 px tarayıcı testleri başarılı; taşma yok. Bolu’da yalnızca Bolu, Osmaniye’de yalnızca Osmaniye adresi/şeması/bağlantıları var. Kalan 31 landing sayfasında şube bölümü veya LocalBusiness yok. Yerel runtime hatası ve eksik zorunlu şube alanı yok.

Gerçek Google iframe’leri uygulamada ayrıca yüklendi ve mobil/desktop görüntüleri alındı. İki orijinal paylaşım URL’si doğru işletme kayıtlarına yönleniyor; iki gerçek Place ID’li yol tarifi URL’si HTTP 200 dönüyor. Google istekleri bilerek engellendiğinde de bağımsız harita/yol tarifi bağlantıları görünür ve kullanılabilir kaldı.

Test sonuçları ve ekran görüntüleri `.next-verify/branch-check/` altında; `results.json` doğrulanan 11 route’u listeler. Yeni client script girişi eklenmedi; build First Load JS değerleri kök yerel sayfalarda 117 kB, yeni `/tr` landing sayfalarında 101 kB olarak korundu. Haritalar sabit boyutlu, lazy iframe’lerdir; Google’ın harita kodu uygulama paketine alınmaz.

Header, footer, proje verisi, route adresleri, metadata yardımcıları, canonical, robots ve sitemap kaynakları değiştirilmedi. Ek client component veya Maps JavaScript SDK eklenmedi.

Değişiklikler yerel çalışma ağacındadır; commit/push veya production yayını yapılmadı.
