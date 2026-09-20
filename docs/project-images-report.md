# Proje görselleri kontrolü — 20 Eylül 2026

## Güncelleme: görsel erişimi düzeltildi

Kullanıcının şifreyi kaldırma talimatıyla görsel servisinin `/images/[...path]` ve `/p/[token]/dosya` rotalarındaki kategori oturumu kontrolü kaldırıldı. Görsel servisi Cloudflare'a yayınlandı: sürüm `2764627d-49bd-4f1f-8cac-4de4fa895226`. Servisin mevcut 10 testi, TypeScript kontrolü ve OpenNext derlemesi başarılı. Yayından sonra 12 yeni görselin tamamı anonim GET ile `200 image/jpeg` döndürdü. Eski MK Farm kapak bağlantısı ise `404` döndürüyor; portföyde hazırlanan yeni URL değişikliğinin yayınlanması gerekiyor. Aşağıdaki 401 bulguları düzeltme öncesine aittir. Portföy sitesindeki dört görsellik MK Farm değişikliği hâlen yereldedir.

## MK Farm değişikliği

`lib/projects/projectsData.js` içindeki altı eski `/p/.../dosya` adresi, verilen dört `/images/mk-farm/` adresiyle değiştirildi. Sıra: `farm4.jpeg`, `farm3.jpeg`, `farm2.jpeg`, `farm1.jpeg`. Ana sayfa ilk elemanı kapak olarak kullandığından kapak `farm4.jpeg`; detay galerisi dört görseldir. Ortak veri Türkçe ve İngilizce sayfaları besler.

## Canlı site bulguları

Doğrudan HTTP GET ile `/tr`, `/en`, `/tr/projects/santiye-yonetim-sistemi` ve `/tr/projects/mk-traceops` HTML çıktılarındaki gerçek `img src` alanları kontrol edildi. Şantiye ve TraceOps yeni `/images/SANTIYE-YONETIM/` ve `/images/traceops/` adreslerini kullanıyor. Her iki detay sayfasında da dört yeni görsel var. Bu sayfalarda eski URL sunulduğu gözlenmedi.

Canlı `/tr/projects/mk-farm` hâlen altı eski adresi kullanıyor; bu görevdeki yerel değişiklik henüz yayınlanmadı.

## Kırık görsellerin doğrulanan nedeni

Şantiye'nin dört, TraceOps'un dört ve yeni MK Farm'ın dört adresine yapılan anonim GET isteklerinin tamamı `401 Unauthorized`, `Content-Type: text/plain;charset=UTF-8` döndürdü. MK Farm kapağına `Referer: https://mustafaoner.net/` ile yapılan tekrar da aynı sonucu verdi; yanıt gövdesi **Şifre gerekli**, önbellek başlığı `private, no-store`.

Ana sayfa HTTP kontrolünde `Server: Vercel`, `X-Vercel-Cache: MISS`, `Age: 0` ve `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate` görüldü. Yeni Şantiye/TraceOps adresleri canlı HTML'de bulunduğundan mevcut kırılmayı eski deploy veya Next Image önbelleği açıklamıyor. İlgili bileşenler `unoptimized` kullanarak görselleri doğrudan kaynaktan yüklüyor.

## Gerekli sonraki işlem

Görsel servisi, portföyde yayımlanması amaçlanan dosyalar için oturum/şifre gerektirmeyen paylaşım URL'leri sağlamalı. Yönetim panelinin erişim koruması korunabilir; yayınlanacak görsellerin anonim GET yanıtı `200` ve uygun `image/*` içerik türü olmalıdır. Ardından MK Farm değişikliğinin yayınlanması gerekir. Yalnızca siteyi yeniden deploy etmek mevcut `401` sorununu çözmez.

Bu çalışma görsel servisinin kodunu veya erişim ayarlarını değiştirmedi; commit, push ve deploy yapılmadı.

## Doğrulama

`npm.cmd run lint` hatasız geçti; `.next-verify` dizininde üretim derlemesi tamamlandı (102 sayfa). Ortak kaynak veride dört görselin verilen sırada bulunduğu ve ana sayfanın ilk görseli kullandığı kontrol edildi. Derleme, güncel olmayan Browserslist verisi ve webpack önbelleği hakkında engelleyici olmayan uyarılar verdi. Görseller anonim erişimde 401 döndürdüğünden başarılı görsel yüklemesi doğrulanamadı.
