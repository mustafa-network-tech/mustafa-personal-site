# SEO landing page uygulama raporu — 16 Eylül 2026

İstenen 13 sayfa ve footer’daki Web Tasarım bağlantısı için 1 ana sayfa eklendi. Değişiklikler yerel projede hazırlandı; production’a yayın yapılmadı. MK Farm, kullanıcının son talimatıyla Türkçe ve İngilizce tüm merkezi proje gösterimlerinde aktif olarak güncellendi.

## Mevcut sistemin analizi

- Next.js 14.2.35 / App Router; proje JavaScript kullanıyor. Türkçe içerik `/tr`, İngilizce ana sayfa `/en`, diğer İngilizce sayfalar kök altında. Middleware `x-path-locale` ile sunucu dilini belirliyor.
- Root layout ortak Header, Footer, LanguageProvider, WhatsApp ve Person / WebSite / Organization şemalarını içeriyor. Header dosyası değiştirilmedi; HTML ve ölçüler önceki build ile karşılaştırıldı.
- Proje listesi ve detayları `lib/projects/projectsData.js` kaynağına bağlı. Yeni kartların adı, açıklaması, durumu, özellikleri, görseli ve canlı URL’si bu kaynaktan geliyor. Landing içeriklerinde yalnızca ilgili slug’lar ve probleme yönelik anlatım tutuluyor.
- Kök dizindeki 28 eski şehir sayfası, mevcut proje slug’ları, canonical’lar ve redirect’ler korundu. Yeni içerikler `app/tr/[slug]/page.js` ile ayrıldı; bilinmeyen slug 404 dönüyor.
- Mevcut `studio-shell`, `studio-display`, butonlar, koyu/açık yüzeyler ve responsive kırılımlar kullanıldı. Yeni sayfalara client component, animasyon kütüphanesi veya bağımlılık eklenmedi. SSS yerel HTML `details/summary`, proje kapakları boyut alanı ayrılmış ve lazy yüklenen Next Image ile sunuluyor.

## Route, primary keyword, title ve canonical listesi

Aşağıdaki bağlantıların metni route’u, hedefi tam self-canonical URL’yi gösterir. Bunlar yayın sonrası kullanılacak adreslerdir.

| Route / canonical | Primary keyword | Title |
| --- | --- | --- |
| [/tr/web-tasarim](https://mustafaoner.net/tr/web-tasarim) | web tasarım | Web Tasarım \| İşletmenize Uygun Web Deneyimleri |
| [/tr/bolu-web-tasarim](https://mustafaoner.net/tr/bolu-web-tasarim) | Bolu web tasarım | Bolu Web Tasarım \| Sektörünüze Uygun Site Örnekleri |
| [/tr/bolu-otel-pansiyon-web-sitesi](https://mustafaoner.net/tr/bolu-otel-pansiyon-web-sitesi) | Bolu otel web sitesi | Bolu Otel ve Pansiyon Web Sitesi \| Oda ve Rezervasyon |
| [/tr/bolu-fotografci-web-sitesi](https://mustafaoner.net/tr/bolu-fotografci-web-sitesi) | Bolu fotoğrafçı web sitesi | Bolu Fotoğrafçı Web Sitesi \| Portföy ve Galeri Tasarımı |
| [/tr/osmaniye-web-tasarim](https://mustafaoner.net/tr/osmaniye-web-tasarim) | Osmaniye web tasarım | Osmaniye Web Tasarım \| İşletmeden İletişime Net Bir Yol |
| [/tr/osmaniye-cafe-kurumsal-web-sitesi](https://mustafaoner.net/tr/osmaniye-cafe-kurumsal-web-sitesi) | Osmaniye cafe web sitesi | Osmaniye Cafe ve Kurumsal Web Sitesi \| Menü ve Hizmetler |
| [/tr/ozel-yazilim-gelistirme](https://mustafaoner.net/tr/ozel-yazilim-gelistirme) | özel yazılım geliştirme | Özel Yazılım Geliştirme \| İşletmenizin Sürecine Göre |
| [/tr/ciftlik-yonetim-sistemi](https://mustafaoner.net/tr/ciftlik-yonetim-sistemi) | çiftlik yönetim sistemi | Çiftlik Yönetim Sistemi \| MK Farm ve QR Hayvan Takibi |
| [/tr/santiye-yonetim-sistemi](https://mustafaoner.net/tr/santiye-yonetim-sistemi) | şantiye yönetim sistemi | Şantiye Yönetim Sistemi \| Proje, Puantaj ve İmalat |
| [/tr/bolu-santiye-yonetim-sistemi](https://mustafaoner.net/tr/bolu-santiye-yonetim-sistemi) | Bolu şantiye yönetim sistemi | Bolu Şantiye Yönetim Sistemi \| Günlük Saha Planı |
| [/tr/osmaniye-santiye-yonetim-sistemi](https://mustafaoner.net/tr/osmaniye-santiye-yonetim-sistemi) | Osmaniye şantiye yönetim sistemi | Osmaniye Şantiye Takip Programı \| Ekip ve Puantaj |
| [/tr/hatay-santiye-yonetim-sistemi](https://mustafaoner.net/tr/hatay-santiye-yonetim-sistemi) | Hatay şantiye yönetim sistemi | Hatay Şantiye Yönetim Yazılımı \| İmalat ve Proje Takibi |
| [/tr/bartin-santiye-yonetim-sistemi](https://mustafaoner.net/tr/bartin-santiye-yonetim-sistemi) | Bartın şantiye yönetim sistemi | Bartın Şantiye Yönetim Sistemi \| Malzeme ve Zimmet |
| [/tr/duzce-santiye-yonetim-sistemi](https://mustafaoner.net/tr/duzce-santiye-yonetim-sistemi) | Düzce şantiye yönetim sistemi | Düzce Şantiye Takip Yazılımı \| Saha ve Ofis Raporları |

İkincil niyetler ilgili sayfalara işlendi: pansiyon; fotoğraf portföyü; Osmaniye restoran/kurumsal site; işletmeye özel yazılım; büyükbaş, besi, süt ve hayvan kaydı; şantiye takip programı/yazılımı. Beş şantiye şehri sırasıyla günlük plan, personel/puantaj, imalat, malzeme/zimmet ve saha–ofis akışını işler. Giriş, kullanım senaryoları, title, description, H1, SSS ve CTA metinleri farklıdır.

## Bağlantı ve schema mimarisi

- Türkçe footer → Özel Yazılım Geliştirme / Web Tasarım / Çiftlik Yönetim Sistemi / Şantiye Yönetim Sistemi.
- Web Tasarım → Bolu / Osmaniye → ilgili otel-pansiyon, fotoğrafçı ve cafe-kurumsal sayfaları → mevcut proje detayları ve merkezi canlı adresler.
- Özel Yazılım → Şantiye / Çiftlik → mevcut yazılım proje detayları. Şantiye hub’ındaki “Bölgesel Çözümler” → 5 şehir sayfası; her şehir → ana şantiye ve özel yazılım sayfaları.
- İlgili Türkçe proje detaylarına ortak `RelatedLandingLinks` bileşeniyle hizmet bağlantıları eklendi. Footer’dan erişim grafiğinde 14 sayfanın tamamı bulunuyor; orphan sayfa yok.
- Görünür breadcrumb ve aynı sırada BreadcrumbList; sayfa başına Service ve görünür SSS ile aynı içerikte FAQPage. Service, mevcut Organization’a `@id` üzerinden bağlanıyor. Global Person / Organization / WebSite yeniden oluşturulmuyor.
- Her sayfanın title, description, OpenGraph, Twitter ve self-canonical verileri mevcut SEO yardımcılarıyla üretiliyor. İngilizce karşılığı bulunmayan yeni sayfalara sahte EN hreflang eklenmedi; mevcut sayfalardaki dil eşleştirmeleri korundu. EN düğmesi yeni sayfalarda mevcut `/services` sayfasına gider. Client geçişinde HTML dili de güncellenir.
- Sitemap’e 14 canonical eklendi; eski kayıtlar korundu. `robots.txt` değişmedi ve `/` erişimine izin veriyor.
- FAQPage anlamsal işaretleme olarak eklendi; Google’da FAQ zengin sonucu vaadi yok. Google, FAQ rich result gösterimini Mayıs 2026’da kaldırdı. [Google Search Central güncellemesi](https://developers.google.com/search/updates#may-2026)

## Dosyalar ve ortak bileşenler

| Dosya | Değişiklik |
| --- | --- |
| `app/tr/[slug]/page.js` | Yeni 14 route, static params, metadata ve 404 davranışı |
| `lib/landingPages/routes.js` | Hafif route/etiket ve footer hub listesi |
| `lib/landingPages/pages.js` | 9 hizmet sayfası, breadcrumb ve proje eşleştirmeleri |
| `lib/landingPages/cityPages.js` | 5 özgün şantiye şehir içeriği |
| `components/landingPages/LandingPageContent.js` | Server component sayfa düzeni; hero, çözüm, süreç, SSS ve CTA |
| `components/landingPages/LandingProjectCard.js` | Merkezi proje verisiyle problem → çözüm → detay/canlı bağlantı kartı |
| `components/landingPages/RelatedLandingLinks.js` | Proje detaylarından ilgili hizmetlere bağlantı |
| `components/landingPages/LandingPages.module.css` | Sayfaya özel taşma ve klavye odak stilleri |
| `seo/landingPages.js` | Yeni sayfaların metadata ve schema yardımcıları |
| `seo/schema.js` | Mevcut Organization’a sabit `@id` |
| `seo/sitemap.js` | Yeni canonical kayıtları |
| `components/Footer.js` | Yalnızca 4 ana çözüme bağlantı |
| `app/tr/projects/[slug]/page.js` | Mevcut detayın altına ilgili çözüm bağlantıları |
| `lib/i18n/routes.js` | Türkçe yeni sayfalarda güvenli EN hedefi |
| `contexts/LanguageContext.js` | Client navigasyonunda `html lang` eşitlemesi |
| `lib/projects/projectsData.js` | MK Farm aktif durumu, canlı URL, doğrulanan QR/tohumlama özellikleri; TR/EN |
| `scripts/verify-landing-pages.mjs` | Production HTTP ve tarayıcı regresyon kontrolleri |
| `.gitignore` | Geçici bağımsız build klasörlerini hariç tutma |
| `docs/seo-landing-pages-report.md` | Bu teknik rapor |

MK Farm canlı adresi: [MK FarmOps](https://graceful-melba-ff5818.netlify.app/). HTTP 200 ve “MK FarmOps · Çiftlik yönetimi” başlığı doğrulandı. QR yalnızca ilgili hayvan kaydına erişim olarak anlatılır; veriyi kendi içinde tuttuğu iddia edilmez.

## Build ve test sonucu

- `npm.cmd run build`: başarılı; 102 sayfa üretildi, önceki build 88 sayfaydı. İzole çıktı: `.next-seo-check`; mevcut `.next` çıktısı kullanılmadı.
- `npm.cmd run lint`: uyarı ve hata yok. Son build’in lint/type validation aşaması da başarılı. Repo JavaScript; ayrı TypeScript projesi veya `tsc` komutu yok.
- `node scripts/validate-i18n.js`: TR ve EN eksik anahtar yok.
- Playwright/Chromium production testi: 14 yeni sayfa × 360 / 390 / 430 / 768 / 1440 px; taşma yok. Temsilî mobil, tablet ve desktop ekran görüntüleri ayrıca görsel olarak incelendi.
- 71 farklı site içi hedef ve mevcut 44 TR/EN proje detay URL’si HTTP 200; bilinmeyen landing/proje adresleri 404.
- Tek H1; benzersiz title/description; görünür breadcrumb; canonical; OG/Twitter; robots; hreflang; schema ayrıştırması ve SSS/schema eşitliği başarılı.
- Yeni title ve description değerleri eski şehir sayfalarıyla da çakışmıyor. Şehir adları çıkarıldıktan sonra bile 5 şehirde title, description, H1, giriş, CTA ve SSS soruları birbirinden farklı.
- Footer 4 hub bağlantısı, native SSS açılması, mobil menüden EN geçişi ve MK Farm’ın TR/EN aktif durumu/canlı bağlantısı başarılı.
- Header HTML’i ve genişlik/yükseklik değerleri 5 viewport’ta baseline ile birebir aynı. Tarayıcı çalışma zamanı hatası: 0. Başarısız yerel kaynak yanıtı: 0.

## Performans kontrolünün kapsamı

Yeni landing route’un build boyutu 235 B; First Load JS yaklaşık 101 kB. Mevcut `/tr/projects` First Load JS yaklaşık 98,3 kB olarak korundu. Yeni bir client sayfa bileşeni eklenmedi.

Production HTML’inin çağırdığı yerel script dosyaları gzip ile karşılaştırıldı (Lighthouse skoru değildir):

| Sayfa | Önce | Sonra | Fark |
| --- | ---: | ---: | ---: |
| `/tr` | 219.441 B | 220.366 B | +925 B |
| `/tr/projects` | 158.352 B | 158.828 B | +476 B |
| `/tr/projects/santiye-yonetim-sistemi` | 163.490 B | 164.158 B | +668 B |
| `/bolu-web-tasarim` | 163.570 B | 164.046 B | +476 B |

Lighthouse / Core Web Vitals ölçümü yapılmadı. [web-perf SKILL.md](C:/Users/mavik/.codex/skills/web-perf/SKILL.md) şu koşulu koyar: “If unavailable, STOP—the chrome-devtools MCP server isn't configured.” Bu oturumda gerekli Chrome DevTools MCP araçları bulunmadığı için o ölçüm akışı çalıştırılmadı. Paket büyüklüğü ve responsive kontrolleri gerçek kullanıcı LCP/INP/CLS ölçümünün yerine geçmez.

Build’de mevcut Browserslist verisinin eski olması ve webpack cache snapshot uyarıları görüldü; aynı uyarılar değişiklik öncesi build’de de vardı. Başarılı production sunucusu ayrıca mevcut isteğe bağlı `sharp` paketi hakkında öneri verdi. Bağımlılık değişikliği yapılmadı.

## Kontrolü tekrar çalıştırma

`scripts/verify-landing-pages.mjs`, ayrı bir Playwright kurulumunu `PLAYWRIGHT_MODULE` ve gerekirse yerel Chromium’u `CHROMIUM_EXECUTABLE` ile kullanabilir; uygulamaya test bağımlılığı eklenmedi. Önce değişiklik öncesi production sunucusunda `SEO_BASE_URL=http://127.0.0.1:3101` ile `--baseline`, ardından yeni production sunucusunda `SEO_BASE_URL=http://127.0.0.1:3102` ile normal test çalıştırılır.

Yerel sonuçlar ve ekran görüntüleri `.next-verify/seo-check/` altındadır; `results.json` ve `baseline.json` Git’e dahil edilmez. Yeni sayfa mimarisi için [Next.js 14 metadata belgeleri](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata) ve [Google structured data yönergeleri](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) esas alındı.
