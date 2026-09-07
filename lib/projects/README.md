# Portföy verisi

`projectsData.js` tüm portföy listelerini, detay rotalarını ve sitemap proje URL'lerini besler. Kategoriler `categories.js` içindedir; ayrı bir panel kategorisi yoktur.

## Görsel ekleme

İlgili proje kaydına `imageUrls: ['https://cdn.example.com/ekran-1.webp', 'https://cdn.example.com/ekran-2.webp']` ekleyin. Şantiye Yönetim Sistemi, MK Farm ve MK TraceOps için altışar görsel eklenmiştir. Mevcut projelere aynı alanı `slug` satırının altına ekleyebilirsiniz.

Saha Görsel Arşivi paylaşım sayfaları (`/p/…`) yerine doğrudan resim döndüren `/p/…/dosya` adreslerini kullanın. `galleryStyle: 'led'` ince mavi-beyaz ışıklı kenarlığı etkinleştirir. Altı görsel mobil/tablette 3 satır × 2 sütun, 1024 px ve üzeri masaüstünde 2 satır × 3 sütun gösterilir.

Dizi boşsa galeri gösterilmez. Eski projelerin mevcut `image` kapakları korunur; galeri dolduğunda detayda galerinin yerini kaplamaz. Görseller Next Image ile `unoptimized` olarak doğrudan tarayıcıdan yüklenir; yeni HTTPS domainleri için config değişikliği gerekmez. Küçük, sıkıştırılmış WebP/AVIF dosyaları kullanın; sunucu tarafı boyutlandırma uygulanmaz. Thumbnail görseller lazy load edilir.

## Yeni proje ekleme

`EXISTING_PROJECTS` dizisine bir kayıt ekleyin (özel yazılımlar için `SOFTWARE_PROJECTS` de kullanılabilir):

```js
{
  slug: 'benzersiz-proje',
  categoryId: 'custom-software', // websites | platforms | applications
  order: 5,
  featured: false,
  status: { tr: 'Geliştiriliyor', en: 'In Development' },
  technologies: ['Doğrulanmış teknoloji'],
  imageUrls: [],
  projectUrl: '', // Varsa canlı HTTPS adresi
  tr: {
    title: 'Proje Adı',
    subtitle: 'İsteğe bağlı alt başlık',
    shortDesc: 'Kısa açıklama',
    overview: 'Detaylı açıklama',
    features: ['Temel özellik'],
  },
  en: {
    title: 'Project Name',
    shortDesc: 'Short description',
    overview: 'Detailed description',
    features: ['Key feature'],
  },
}
```

`id` belirtilmezse slug kullanılır. `category` merkezi kategori etiketlerinden üretilir. `name`, `shortDescription`, `longDescription` yerelleştirilmiş `tr/en` nesnelerinde oluşturulur; mevcut bileşenler için `title`, `shortDesc`, `overview`, `tags`, `liveUrl` uyumluluğu korunur. `metaTitle` ve `metaDesc` isteğe bağlıdır; verilmezse ad ve kısa açıklamadan üretilir. Yeni rotalar ve sitemap bir sonraki build'de otomatik oluşur.

Yeni üç projenin framework/veritabanı bilgisi doğrulanmadığından teknoloji listesi yalnızca `Web` olarak bırakılmıştır; doğrulandığında aynı `technologies` alanını güncelleyin.

## Kontrol

`npm.cmd run lint` ve `npm.cmd run build` kullanılabilir. Geliştirme sunucusu ile aynı `.next` çıktısını paylaşmamak için PowerShell'de `$env:NEXT_BUILD_DIR='.next-verify'; npm.cmd run build` çalıştırın. Bu değişken verilmezse mevcut `.next` davranışı korunur. Proje JavaScript kullanır; ayrı bir TypeScript kontrol komutu yoktur.
