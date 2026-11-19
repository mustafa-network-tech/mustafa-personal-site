# SEO Güncelleme Raporu — MustafaÖner.net (2026-11-19)

## Amaç
Üç siteli marka ayrımında MustafaÖner.net'in sade bir kişisel siteye dönüşmesinin **altyapı hazırlığı**: yapılandırılmış veride ana varlığın `Person` olması ve alan adı standardizasyonu. Bu aşamada içerik/proje sayfası yönlendirmesi, silme veya kişisel site dönüşümü yoktur.

## Dal ve commitler
- Dal: `seo/kisisel-site-hazirlik` (`main` üstünde; taban `ff23183`)
- `b2b6343` — Person ana varlık, www→apex ve / → /tr yönlendirmeleri (son uygulama commiti)

## Değiştirilen dosyalar
`seo/schema.js`, `seo/landingPages.js`, `lib/branches.js`, `app/layout.js`, `middleware.js`, `next.config.mjs`. Yeni sayfa eklenmedi, sayfa silinmedi.

## SEO ve yapılandırılmış veri
- Ana varlık `Person` (`@id` site adresi + `#person`). MK Digital Systems yalnızca `worksFor` ilişkisi olarak yer alır; site geneli `Organization` düğümü kaldırıldı. `WebSite` yayıncısı Person; ad ve açıklama kişisel.
- İniş sayfalarının ve şube verisinin `provider`/`parentOrganization` bağlantıları MK Digital'in kendi `@id`'sine çevrildi (boşta referans kalmasın).
- Canonical, hreflang ve sitemap değişmedi.

## Yönlendirmeler (yalnızca alan adı standardizasyonu)
İçerik/proje sayfası yönlendirmesi yapılmadı. Yalnızca alan adı standardizasyonu için `www → apex` ve `/ → /tr` yönlendirmeleri eklendi:
- `www.mustafaoner.net/` → `mustafaoner.net/tr` (308, tek sıçrama); `/` → `/tr` (308).
- `www` hostunda diğer yollar apex'e 308, sorgu dizesi korunur.
- Mevcut `/bolu-web-tasarim`, `/osmaniye-web-tasarim` (301) ve `/showcase` (308) kuralları www'de de tek sıçrama olacak şekilde mutlak hedefe alındı; hedefleri değişmedi.
- **Yasal yollar bu kuralların dışında bırakıldı**: www hostunda aynen 200 döner.

## Build ve test
- `npm run build` başarılı (128 statik sayfa).
- `next start` ile Host başlığı kullanılarak yönlendirmeler doğrulandı (tablo yukarıdaki davranışlarla uyumlu); JSON-LD çıktısı doğrulandı.
- Bu projede otomatik test paketi yok.

## Mobil kontrol
Görünür arayüz değiştirilmediği için ek mobil kontrol gerekmedi.

## Yasal sayfalar
**Değiştirilmedi.** `app/kvkk-veri-isleme-gizlilik-politikalari/**`, `content/legal/**`, `lib/legal/**` için `main`'e göre diff 0 satır; `trailingSlash` ayarı yok/değişmedi. 20 yasal URL (4 uygulama dizini + 16 belge) production sunucuda 200; eğik çizgili sürüm eskisi gibi çizgisize 308 verir.

## Yapılmayanlar
Eski URL (proje/şehir/hizmet) yönlendirmesi, sayfa veya içerik silme, ana sayfa içeriğini kaldırma, "Ürettiklerim" dönüşümü ve production deployment yapılmadı.

## Bekleyen işler
1. Kişisel ana sayfa ve "Ürettiklerim" kartları (hedefler canlıda doğrulandıktan sonra, ayrı onayla).
2. Proje/hizmet/şehir sayfalarının MK Digital ve MK OPS'e yönlendirilmesi (ayrı onay; İngilizce kaynaklar Türkçe hedefe gitmeyecek).
3. Beş şehirli şantiye sayfası korunuyor; Search Console verisi incelenmeden yönlendirilmeyecek.
4. Balıkesir, Karabük, Kırklareli ve Bolu/Osmaniye sektör içerikleri MK Digital'de hazırlanana kadar ilgili sayfalar yönlendirilemez.

## Canlıya alma öncesi kontrol listesi
- [ ] Vercel alan adı ayarlarında `www`→apex yönlendirmesi bu kurallarla çift sıçrama yapmıyor.
- [ ] Canlıda: `www/` → `mustafaoner.net/tr` tek 308; yasal URL'ler öncesi/sonrası aynı kod.
- [ ] Play Console'da kayıtlı yasal URL biçimi (eğik çizgili/çizgisiz) kullanıcı tarafından teyit edildi.
- [ ] `main`'e merge ve production deployment için ayrı onay alındı.
