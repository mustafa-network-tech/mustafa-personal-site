/**
 * Blok 1: 30 adet hazır soru-cevap (TR metin + EN karşılık + eşleştirme örüntüleri).
 * En uzun eşleşen örüntü kazanır (ör. "e-ticaret kaç gün" > "kaç gün").
 */

function haystack(text) {
  const t = (text || '').trim()
  if (!t) return ''
  return `${t.toLowerCase()} ${t.toLocaleLowerCase('tr-TR')}`
}

export const FAQ_BLOCK_1 = [
  {
    patterns: [
      'kurumsal web sitesi kaç gün',
      'kurumsal site kaç günde',
      'kurumsal site kaç gün',
      'kurumsal web kaç günde yapılır',
      'kurumsal site ne kadar sürer',
      'how many days corporate website',
      'corporate site how long',
    ],
    linesTr: [
      'Genelde 3-7 gün arasında tamamlanır.',
      'İçerik hazırsa süreç çok daha hızlı ilerler.',
      'İstersen sana özel net bir takvim çıkarabilirim.',
    ],
    linesEn: [
      'Most corporate sites land in about 3-7 days.',
      'If copy and assets are ready, things move much faster.',
      'If you want, I can map a clear calendar tailored to you.',
    ],
  },
  {
    patterns: [
      'kurumsal site için neler gerekiyor',
      'kurumsal site için neler',
      'kurumsal site ne lazım',
      'what do i need for a corporate site',
      'corporate website requirements',
    ],
    linesTr: [
      'Logo, birkaç metin ve görseller yeterli.',
      'Eksik olanları da birlikte tamamlayabiliyoruz.',
      'Süreci mümkün olduğunca senin için kolaylaştırıyorum.',
    ],
    linesEn: [
      'Usually a logo, a few texts, and visuals are enough.',
      'We can fill gaps together where needed.',
      'I keep the process as light on your side as possible.',
    ],
  },
  {
    patterns: [
      'kurumsal site mobil uyumlu',
      'mobil uyumlu oluyor mu',
      'kurumsal site mobil',
      'mobile friendly corporate site',
      'responsive corporate website',
    ],
    linesTr: [
      'Evet, tüm siteler mobil öncelikli hazırlanır.',
      'Ziyaretçilerin büyük kısmı mobilden geliyor.',
      'Bu yüzden performans ve hız özellikle optimize edilir.',
    ],
    linesEn: [
      'Yes—sites are built mobile-first.',
      'Most visitors arrive on phones.',
      'So performance and speed get extra attention.',
    ],
  },
  {
    patterns: [
      'hazır tema mı özel tasarım',
      'hazır tema mı',
      'özel tasarım mı',
      'template or custom design',
      'custom vs template website',
    ],
    linesTr: [
      'İhtiyaca göre ikisini de yapıyorum.',
      'Hız gerekiyorsa hazır sistem, fark yaratmak istenirse özel tasarım öneririm.',
      'Kararı birlikte netleştirebiliriz.',
    ],
    linesEn: [
      'Both approaches are possible, depending on needs.',
      'When speed matters, a solid system; when differentiation matters, custom design.',
      'We can decide together with a clear rationale.',
    ],
  },
  {
    patterns: [
      'kurumsal site seo uyumlu',
      'seo uyumlu olur mu',
      'kurumsal seo',
      'corporate site seo',
      'basic seo website',
    ],
    linesTr: [
      'Evet, temel SEO altyapısı kurulu gelir.',
      'Sayfa yapısı, başlıklar ve hız optimizasyonu yapılır.',
      'İleri SEO çalışmaları ayrıca planlanabilir.',
    ],
    linesEn: [
      'Yes—foundational SEO is included.',
      'Structure, headings, and speed are handled up front.',
      'Deeper SEO campaigns can be planned separately.',
    ],
  },
  {
    patterns: [
      'e-ticaret sitesi kaç gün',
      'e-ticaret sitesi kaç günde',
      'e ticaret kaç gün',
      'e-ticaret kaç günde yapılır',
      'how long ecommerce site',
      'ecommerce timeline days',
    ],
    linesTr: [
      'Genelde 5-10 gün arasında hazır olur.',
      'Ürün sayısı ve ödeme sistemleri süreyi etkiler.',
      'İstersen sana uygun en hızlı sistemi kurabiliriz.',
    ],
    linesEn: [
      'Most e‑commerce builds land in about 5-10 days.',
      'Catalog size and payment integrations shift the timeline.',
      'We can pick the fastest sensible setup for you.',
    ],
  },
  {
    patterns: [
      'ödeme sistemleri kuruluyor mu',
      'ödeme sistemi',
      'sanal pos',
      'payment gateway',
      'payment integration ecommerce',
    ],
    linesTr: [
      'Evet, tüm ödeme altyapıları entegre edilir.',
      'Kredi kartı, havale ve diğer seçenekler eklenir.',
      'Sana uygun olanları birlikte seçiyoruz.',
    ],
    linesEn: [
      'Yes—payment rails are integrated end to end.',
      'Card, bank transfer, and other options can be added.',
      'We choose what fits your customers and operations.',
    ],
  },
  {
    patterns: [
      'ürünleri ben mi ekleyeceğim',
      'ürünleri ben mi',
      'ürün ekleme',
      'who adds products',
      'add products myself',
    ],
    linesTr: [
      'İstersen sen ekleyebilirsin, panel verilir.',
      'İstersen ilk ürünleri ben girip sistemi hazır teslim ederim.',
      'Tamamen sana bağlı.',
    ],
    linesEn: [
      'You can add products yourself—an admin panel is provided.',
      'Or I can seed the first products and hand over a ready catalog.',
      'Totally your call.',
    ],
  },
  {
    patterns: [
      'e-ticaret mi yoksa instagram',
      'instagram satış mı',
      'e-ticaret mi instagram',
      'instagram vs website sales',
    ],
    linesTr: [
      'Uzun vadede web sitesi daha güçlüdür.',
      'Kendi markanı oluşturmanı sağlar.',
      'Sosyal medya destekleyici kanal olur.',
    ],
    linesEn: [
      'Long term, a website is the stronger hub.',
      'It anchors your brand outside rented platforms.',
      'Social stays a great amplifier—not the only shelf.',
    ],
  },
  {
    patterns: [
      'kargo sistemi ekleniyor mu',
      'kargo entegrasyon',
      'kargo firması',
      'shipping integration',
      'courier integration',
    ],
    linesTr: [
      'Evet, kargo firmaları entegre edilebilir.',
      'Sipariş süreci otomatik ilerler.',
      'Bu da iş yükünü ciddi azaltır.',
    ],
    linesEn: [
      'Yes—carriers can be integrated.',
      'Orders can move through fulfillment with less manual work.',
      'That usually cuts operational load noticeably.',
    ],
  },
  {
    patterns: [
      'web sitesi fiyatları neye göre',
      'fiyatları neye göre değişir',
      'what affects website price',
      'website pricing factors',
    ],
    linesTr: [
      'İçerik, tasarım ve özelliklere göre değişir.',
      'Basit siteler daha hızlı ve uygun olur.',
      'Detaylı projelerde maliyet artar.',
    ],
    linesEn: [
      'It depends on content, design depth, and features.',
      'Simple sites are faster and leaner.',
      'Richer builds naturally cost more.',
    ],
  },
  {
    patterns: [
      'en uygun web sitesi kaç tl',
      'en uygun web sitesi',
      'uygun web sitesi kaç',
      'cheapest website budget',
      'affordable website cost',
    ],
    linesTr: [
      'Basit bir site genelde uygun bütçelerle yapılır.',
      'Ama önemli olan doğru çözümü seçmek.',
      'İstersen bütçene göre alternatif sunabilirim.',
    ],
    linesEn: [
      'A simple site can usually be kept budget-friendly.',
      'The bigger win is picking the right solution—not the cheapest line item.',
      'Share your budget band and I can propose sensible options.',
    ],
  },
  {
    patterns: [
      'tek seferlik mi ödeme',
      'tek seferlik ödeme',
      'one time payment',
      'single payment project',
    ],
    linesTr: [
      'Evet, genelde tek seferlik çalışılır.',
      'Ekstra talepler olursa ayrıca planlanır.',
      'Süreci baştan netleştiriyoruz.',
    ],
    linesEn: [
      'Yes—most builds are a one-time project fee.',
      'Add-ons are scoped separately when they appear.',
      'We align expectations up front.',
    ],
  },
  {
    patterns: [
      'gizli maliyet çıkar mı',
      'gizli maliyet',
      'sürpriz maliyet',
      'hidden fees',
      'surprise costs',
    ],
    linesTr: [
      'Hayır, tüm detaylar baştan konuşulur.',
      'Sürpriz maliyetlerle karşılaşmazsın.',
      'Şeffaf ilerlemek önemli.',
    ],
    linesEn: [
      'No—details are discussed before work starts.',
      'You should not get surprise line items.',
      'Transparency matters more than flashy promises.',
    ],
  },
  {
    patterns: [
      'proje ne kadar sürede teslim edilir',
      'ne kadar sürede teslim',
      'project delivery time',
      'when will project be delivered',
    ],
    linesTr: [
      'Basit projeler birkaç gün içinde biter.',
      'Daha büyük projeler haftalık planlanır.',
      'Süreyi başta netleştiriyoruz.',
    ],
    linesEn: [
      'Simple projects can finish within days.',
      'Larger ones are planned in weekly slices.',
      'We lock timing early with clear assumptions.',
    ],
  },
  {
    patterns: [
      'acil iş yapabiliyor musun',
      'acil iş',
      'çok acil',
      'urgent project',
      'rush job website',
    ],
    linesTr: [
      'Evet, uygunluk durumuna göre hızlandırılabilir.',
      'Ama kaliteyi düşürmeden ilerlerim.',
      'Detayı konuşarak karar veririz.',
    ],
    linesEn: [
      'Yes—when the calendar allows, timelines can compress.',
      'I still avoid cutting corners that hurt quality.',
      'We decide with a clear trade-off conversation.',
    ],
  },
  {
    patterns: [
      'siteyi ben yönetebilir miyim',
      'siteyi ben yönet',
      'kendim yönetebilir miyim',
      'manage website myself',
      'update content myself',
    ],
    linesTr: [
      'Evet, sana özel panel verilir.',
      'İçerikleri kolayca güncelleyebilirsin.',
      'Teknik bilgi gerekmez.',
    ],
    linesEn: [
      'Yes—you get an admin panel tailored to you.',
      'You can update content without touching code.',
      'No deep technical background required.',
    ],
  },
  {
    patterns: [
      'admin panel zor mu',
      'panel zor mu',
      'admin difficult',
      'is the admin hard',
    ],
    linesTr: [
      'Hayır, oldukça basit hazırlanır.',
      'Gereksiz karmaşadan kaçınılır.',
      'Kullandıkça alışılır.',
    ],
    linesEn: [
      'No—it is intentionally kept simple.',
      'Avoiding clutter matters more than showing every knob.',
      'It feels natural after a short walkthrough.',
    ],
  },
  {
    patterns: [
      'site hızlı olacak mı',
      'site hızlı',
      'performans optimize',
      'will site be fast',
      'website performance',
    ],
    linesTr: [
      'Evet, performans öncelikli çalışıyorum.',
      'Yavaş siteler müşteri kaybettirir.',
      'Bu yüzden hız optimize edilir.',
    ],
    linesEn: [
      'Yes—performance is treated as a feature.',
      'Slow sites quietly leak conversions.',
      'So speed and stability get real attention.',
    ],
  },
  {
    patterns: [
      'güvenlik sağlanıyor mu',
      'güvenlik sağlan',
      'site güvenliği',
      'website security basics',
      'is it secure',
    ],
    linesTr: [
      'Temel güvenlik önlemleri uygulanır.',
      'Hosting ve altyapı doğru seçilir.',
      'Güvenli kullanım sağlanır.',
    ],
    linesEn: [
      'Baseline security practices are applied.',
      'Hosting and stack choices are made carefully.',
      'The goal is safe, boring operations—not heroics.',
    ],
  },
  {
    patterns: [
      'daha önce kimlerle çalıştın',
      'kimlerle çalıştın',
      'hangi sektörler',
      'who have you worked with',
      'past clients industries',
    ],
    linesTr: [
      'Farklı sektörlerden projeler yaptım.',
      'Her projede ihtiyaç farklıydı.',
      'Bu da deneyim kazandırıyor.',
    ],
    linesEn: [
      'I have shipped projects across different sectors.',
      'Each brief had different constraints.',
      'That variety sharpens judgment more than repetition.',
    ],
  },
  {
    patterns: [
      'referans gösterebilir misin',
      'referans göster',
      'can you show references',
      'portfolio examples',
    ],
    linesTr: [
      'Evet, yaptığım projeleri paylaşabilirim.',
      'Canlı örnekler üzerinden konuşmak daha net olur.',
      'İstersen göstereyim.',
    ],
    linesEn: [
      'Yes—I can point to shipped work.',
      'Live examples make trade-offs easier to discuss.',
      'Happy to show what fits your sector.',
    ],
  },
  {
    patterns: [
      'süreç nasıl ilerliyor',
      'süreç nasıl işliyor',
      'how does the process work',
      'project steps',
    ],
    linesTr: [
      'Önce ihtiyaç belirlenir.',
      'Sonra tasarım ve geliştirme yapılır.',
      'En sonunda test edip teslim ederim.',
    ],
    linesEn: [
      'First we align on needs and constraints.',
      'Then design and build move in tight loops.',
      'Finally we test, harden, and hand over cleanly.',
    ],
  },
  {
    patterns: [
      'revize hakkım var mı',
      'revize hakkı',
      'revizyon hakkı',
      'revisions included',
      'how many revisions',
    ],
    linesTr: [
      'Evet, belirli revizeler dahil edilir.',
      'Ama baştan net konuşmak süreci hızlandırır.',
      'Böylece daha verimli ilerleriz.',
    ],
    linesEn: [
      'Yes—a sensible revision window is included.',
      'Clear briefs early still move everything faster.',
      'That is how we stay efficient without friction.',
    ],
  },
  {
    patterns: [
      'site bana müşteri getirir mi',
      'müşteri getirir mi',
      'will website bring customers',
      'lead generation website',
    ],
    linesTr: [
      'Doğru kurulan site kesinlikle katkı sağlar.',
      'Ama tek başına yeterli değildir.',
      'Doğru stratejiyle desteklenmelidir.',
    ],
    linesEn: [
      'A well-built site can absolutely help.',
      'It is rarely sufficient on its own.',
      'It works best with clear positioning and follow-through.',
    ],
  },
  {
    patterns: [
      'neden seni tercih etmeliyim',
      'neden sen',
      'why should i choose you',
      'why hire you',
    ],
    linesTr: [
      'Süreci sade ve net yönetirim.',
      'Gereksiz karmaşa oluşturmam.',
      'İşin mantığını anlatırım.',
    ],
    linesEn: [
      'I keep the process simple and explicit.',
      'I avoid manufactured complexity.',
      'I explain trade-offs in plain language.',
    ],
  },
  {
    patterns: [
      'iletişime nasıl geçebilirim',
      'nasıl ulaşırım',
      'how can i contact you',
      'how to reach you',
    ],
    linesTr: [
      'İstersen buradan yazabilirsin.',
      'Ya da WhatsApp üzerinden ulaşabilirsin.',
      'Hızlıca dönüş yaparım.',
    ],
    linesEn: [
      'You can write from here in the assistant.',
      'Or reach out on WhatsApp.',
      'I reply quickly when context is clear.',
    ],
  },
  {
    patterns: [
      'proje başlamadan konuşabilir miyiz',
      'başlamadan konuş',
      'talk before starting',
      'before we start project',
    ],
    linesTr: [
      'Tabii ki, önce detayları konuşuruz.',
      'Netleşmeden işe başlamam.',
      'Bu hem seni hem süreci korur.',
    ],
    linesEn: [
      'Absolutely—we clarify details first.',
      'I do not start without shared clarity.',
      'That protects both you and the delivery.',
    ],
  },
  {
    patterns: [
      'küçük işler de yapıyor musun',
      'küçük işler',
      'small tasks',
      'small website job',
    ],
    linesTr: [
      'Evet, küçük işler de yapılabilir.',
      'Ama doğru çözüm olması önemli.',
      'Boşa iş yapmam.',
    ],
    linesEn: [
      'Yes—small scoped work is possible.',
      'It still needs to be the right fix.',
      'I avoid busywork that does not move the needle.',
    ],
  },
  {
    patterns: [
      'tam olarak ne yapıyorsun',
      'ne yapıyorsun',
      'what exactly do you do',
      'what do you build',
    ],
    linesTr: [
      'Web sitesi ve yazılım çözümleri geliştiriyorum.',
      'İhtiyaca göre sistem kuruyorum.',
      'Amacım işi sadeleştirmek.',
    ],
    linesEn: [
      'I build websites and pragmatic software.',
      'Systems are shaped to the actual workflow.',
      'The goal is to simplify operations—not add noise.',
    ],
  },
]

export function matchFaqBlock1(questionText) {
  const hay = haystack(questionText)
  if (!hay) return null
  let best = null
  let bestScore = 0
  for (const faq of FAQ_BLOCK_1) {
    for (const p of faq.patterns) {
      const needle = p.toLocaleLowerCase('tr-TR')
      if (hay.includes(needle) && needle.length > bestScore) {
        best = faq
        bestScore = needle.length
      }
    }
  }
  return best
}
