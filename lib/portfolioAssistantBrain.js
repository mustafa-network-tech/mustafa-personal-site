/**
 * Keyword-based routing for the portfolio assistant (no external API).
 * Önce Blok 1 (30 hazır soru-cevap) eşleşir; yoksa kategori yanıtlarına düşer.
 */

import { matchFaqBlock1 } from '@/lib/portfolioAssistantFAQBlock1'

const CATEGORIES = [
  {
    id: 'ecommerce',
    patterns: [
      'e-ticaret',
      'eticaret',
      'e ticaret',
      'ecommerce',
      'e commerce',
      'online mağaza',
      'online magaza',
      'online shop',
      'online store',
      'satış sitesi',
      'satis sitesi',
      'mağaza sitesi',
      'magaza sitesi',
      'shopify',
      'sepet',
      'checkout',
      'ödeme entegrasyonu',
      'odeme entegrasyonu',
    ],
  },
  {
    id: 'corporate',
    patterns: [
      'kurumsal',
      'corporate',
      'company website',
      'firma sitesi',
      'şirket sitesi',
      'sirket sitesi',
      'kurumsal web',
      'landing',
      'tanıtım sitesi',
      'tanitim sitesi',
    ],
  },
  {
    id: 'pricing',
    patterns: [
      'fiyat',
      'ücret',
      'ucret',
      'maliyet',
      'bütçe',
      'butce',
      'teklif',
      'price',
      'pricing',
      'cost',
      'budget',
      'quote',
      'ücretlendirme',
      'ucretlendirme',
    ],
  },
  {
    id: 'admin',
    patterns: [
      'admin panel',
      'yönetim paneli',
      'yonetim paneli',
      'dashboard',
      'kontrol paneli',
      'içerik yönetimi',
      'icerik yonetimi',
      'cms',
      'panel özellik',
      'panel ozellik',
    ],
  },
  {
    id: 'maintenance',
    patterns: [
      'bakım',
      'bakim',
      'destek',
      'maintenance',
      'support',
      'güncelleme',
      'guncelleme',
      'sla',
      'hosting',
      'bakım anlaşması',
      'bakim anlasmasi',
    ],
  },
  {
    id: 'process',
    patterns: [
      'süreç',
      'surec',
      'nasıl çalışıyor',
      'nasil calisiyor',
      'process',
      'methodology',
      'adımlar',
      'adimlar',
      'iş akışı',
      'is akisi',
      'kickoff',
      'planlama',
    ],
  },
  {
    id: 'timeline',
    patterns: [
      'ne kadar sürer',
      'ne kadar surer',
      'ne kadar zaman',
      'teslim süresi',
      'teslim suresi',
      'how long',
      'timeline',
      'deadline',
      'süre ne',
      'sure ne',
      'kaç hafta',
      'kac hafta',
      'kaç gün',
      'kac gun',
      'development time',
      'project duration',
    ],
  },
]

const REPLIES = {
  tr: {
    ecommerce:
      'E-ticaret tarafında ürün sayısı, ödeme ve kargo entegrasyonları ile panel derinliği süreyi belirler. Çoğu giriş–orta ölçek projede ilk canlı sürümü net fazlarla haftalar içinde çıkarmak mümkün. İstersen sana özel net bir plan çıkarabilirim.',
    corporate:
      'Kurumsal sitede mesaj netliği, içerik hazırlığı ve revizyon hızı tempoyu belirler. Görsel düzen kadar erişilebilirlik ve performans da güven algısını güçlendirir. Projene göre süreyi birlikte netleştirebiliriz.',
    pricing:
      'Fiyatı; kapsam, entegrasyon sayısı ve teslim sonrası destek süresi birlikte belirler. Paket yerine modüler teklif hem şeffaflık hem de ölçeklenebilirlik sağlar. İstersen kısa bir brifle rakamsız aralık ve senaryolarla döneyim.',
    timeline:
      'Süre; tasarım onayları, içeriğin hazır olması ve özel yazılım ihtiyaçlarına göre değişir. Tipik kurumsal bir sitede faz bazlı birkaç haftalık aralıklar gerçekçi olabilir. Net tarih için içerik ve entegrasyon varsayımlarını konuşmak gerekir.',
    admin:
      'Yönetim panelinde rol bazlı yetki, içerik ve varyant yönetimi ile güvenli oturum temel üçlüdür. Karmaşık kuralları tek ekranda toplamak yerine adım adım formlar kullanıcı hatasını azaltır. Monitör etmen gereken metrikleri beraber seçebiliriz.',
    process:
      'Önce kapsam ve öncelikleri netleştiriyorum, ardından taslak ile teknik iskeleti paralel götürmeyi tercih ediyorum. Erken demo ile riskleri öne almak, geç performans sürprizlerini azaltır. Süreci projenin ölçeğine göre uyarlayabiliriz.',
    maintenance:
      'Bakım; güvenlik güncellemeleri, küçük içerik değişiklikleri ve izleme (uptime, hata logları) şeklinde katmanlanır. SLA yerine aylık küçük destek blokları çoğu ekip için daha esnek kalır. Destek modelini iş yoğunluğuna göre tasarlayabiliriz.',
    default:
      'Sorunu tek cümlede özetleyip olası yaklaşımları ve riskleri yan yana koymak işe yarıyor. Web, e-ticaret veya özel yazılım fark etmeksizin önce kullanıcı akışını netleştiririm. Bir sonraki adımda brifini birlikte dolduralım mı?',
  },
  en: {
    ecommerce:
      'For e‑commerce, catalog size, payments and shipping integrations, plus how deep the admin needs to be, set the timeline. Many small–mid builds can reach a first live release in clear weekly phases. If you want, I can outline a concrete plan for your case.',
    corporate:
      'Corporate sites move faster when messaging is clear, content is ready, and revisions stay focused. Layout polish matters, but accessibility and performance shape trust too. We can align a realistic schedule once scope and assets are pinned down.',
    pricing:
      'Pricing follows scope, integration count, and what happens after launch (support window). I prefer modular quotes over opaque packages—easier to adjust without surprises. Share a short brief and I can reply with ranges and trade‑offs, not just a number.',
    timeline:
      'Timelines shift with design approvals, content readiness, and any custom logic beyond templates. A typical corporate marketing site often lands in a few phased weeks—not months—when decisions stay crisp. A short call on assumptions usually locks dates.',
    admin:
      'Admin work benefits from role‑based access, structured content models, and safe sessions. Heavy rules are easier to maintain when split into guided steps instead of one overloaded screen. We can pick the metrics you actually need to watch day to day.',
    process:
      'I align on scope first, then run UX and technical skeleton in parallel where it helps. Early demos surface risk early instead of hiding it behind polish. The exact cadence scales with your team size and how fast feedback loops move.',
    maintenance:
      'Maintenance layers security patches, small content tweaks, and light monitoring (uptime, error logs). Many teams prefer a monthly support block over rigid SLAs. We can shape a cadence that matches how often you expect to ship changes.',
    default:
      'I like framing the problem in one line, then mapping options with risks side by side. Whether it is web, commerce, or custom software, user flow clarity comes first. Happy to walk through a brief together when you are ready.',
  },
}

const GREETING_ONLY = new Set([
  'merhaba',
  'selam',
  'selamlar',
  'mrb',
  'slm',
  'hey',
  'hi',
  'hello',
  'günaydın',
  'gunaydin',
  'iyi',
  'günler',
  'gunler',
  'naber',
  'nasilsin',
  'nasılsın',
  'iyiaksamlar',
  'iyiakşamlar',
])

const GREETING_REPLY = {
  tr: 'Merhaba 👋\nNe inşa etmek istediğini kısaca yaz; sana net bir yol haritası çizeyim.',
  en: 'Hi 👋\nWrite briefly what you want to build; I will sketch a clear roadmap for you.',
}

const SHORT_INPUT_REPLY = {
  tr: 'Ne yaptırmak istediğini biraz açarsan sana daha net yardımcı olabilirim.',
  en: 'A few more words about what you want to build would help me answer more precisely.',
}

function isOnlyGreeting(text) {
  const raw = text
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/[👋!?.…,:;]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!raw || raw.length > 36) return false
  const words = raw.split(' ').filter(Boolean)
  if (words.length === 0 || words.length > 5) return false
  return words.every((w) => GREETING_ONLY.has(w))
}

function normalizeForMatch(text) {
  const t = (text || '').trim()
  if (!t) return ''
  const lower = t.toLowerCase()
  const tr = t.toLocaleLowerCase('tr-TR')
  return `${lower} ${tr}`
}

export function matchAssistantCategory(question) {
  const hay = normalizeForMatch(question)
  if (!hay) return 'default'
  for (const { id, patterns } of CATEGORIES) {
    if (patterns.some((p) => hay.includes(p))) return id
  }
  return 'default'
}

export function getAssistantReply(questionText, locale) {
  const trimmed = (questionText || '').trim()
  const lang = locale === 'tr' ? 'tr' : 'en'

  if (trimmed && isOnlyGreeting(trimmed)) {
    return GREETING_REPLY[lang]
  }
  if (trimmed.length > 0 && trimmed.length < 10 && !isOnlyGreeting(trimmed)) {
    return SHORT_INPUT_REPLY[lang]
  }

  const faq = matchFaqBlock1(questionText)
  if (faq) {
    const lines = lang === 'tr' ? faq.linesTr : faq.linesEn
    return lines.join(' ')
  }
  const category = matchAssistantCategory(questionText)
  const bucket = REPLIES[lang]
  const key = bucket[category] ? category : 'default'
  return bucket[key] || bucket.default
}
