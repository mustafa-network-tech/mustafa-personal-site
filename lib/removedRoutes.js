// Kaldırılan eski ticari sayfaların adresleri: bu adresler 410 (Gone) döner; böylece arama motorları dizinden düşürür.
// middleware.js kullanır. (Karşılığı olan /projects adresleri next.config.mjs içinde 301 ile yönlendirilir.)
export const REMOVED_ROOT_SLUGS = [
  "adapazari-e-ticaret-web-sitesi",
  "adapazari-web-tasarim",
  "balikesir-dijital-ajans",
  "balikesir-web-tasarim",
  "bartin-mobil-uyumlu-web-sitesi",
  "bartin-web-tasarim",
  "bilecik-kurumsal-web-sitesi",
  "bilecik-web-tasarim",
  "bolu-kurumsal-web-sitesi",
  "bolu-web-tasarim",
  "canakkale-otel-web-sitesi",
  "canakkale-web-tasarim",
  "duzce-kurumsal-web-tasarim",
  "duzce-seo-uyumlu-web-sitesi",
  "izmit-fabrika-web-sitesi",
  "izmit-web-tasarim",
  "karabuk-kurumsal-web-sitesi",
  "karabuk-web-tasarim",
  "kilis-kurumsal-web-sitesi",
  "kilis-web-tasarim",
  "kirklareli-kurumsal-web-sitesi",
  "kirklareli-web-tasarim",
  "osmaniye-kurumsal-web-sitesi",
  "osmaniye-web-tasarim",
  "yalova-kurumsal-web-sitesi",
  "yalova-web-tasarim",
  "zonguldak-kucuk-isletme-web-sitesi",
  "zonguldak-web-tasarim"
]
export const REMOVED_TR_SLUGS = [
  "web-tasarim",
  "bolu-web-tasarim",
  "bolu-otel-pansiyon-web-sitesi",
  "bolu-fotografci-web-sitesi",
  "osmaniye-web-tasarim",
  "osmaniye-cafe-kurumsal-web-sitesi",
  "ozel-yazilim-gelistirme",
  "ciftlik-yonetim-sistemi",
  "santiye-yonetim-sistemi",
  "bolu-santiye-yonetim-sistemi",
  "osmaniye-santiye-yonetim-sistemi",
  "hatay-santiye-yonetim-sistemi",
  "bartin-santiye-yonetim-sistemi",
  "duzce-santiye-yonetim-sistemi"
]
export const REMOVED_PREFIXES = ['/services', '/tr/services']
