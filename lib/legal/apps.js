export const LEGAL_BASE = '/kvkk-veri-isleme-gizlilik-politikalari'

export const legalApps = {
  aura: {
    slug: 'aura',
    name: 'Aura Daily',
    packageId: 'com.mkdigitalsystems.aura',
    publisher: 'MK DIGITAL SYSTEMS – MUSTAFA ÖNER',
    email: 'mustafa82oner@gmail.com',
    updatedAt: '22 Eylül 2026',
    documents: [
      { slug: 'gizlilik-politikasi', title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni', summary: 'İşlenen veriler, hukuki sebepler, saklama, aktarım ve KVKK hakları.' },
      { slug: 'kullanim-sartlari', title: 'Kullanım Şartları ve Topluluk Kuralları', summary: 'Hesap, içerik, paylaşım, mesajlaşma ve güvenli kullanım kuralları.' },
      { slug: 'hesap-silme', title: 'Hesap ve Veri Silme', summary: 'Uygulama içinden veya e-posta yoluyla kalıcı silme adımları.' },
      { slug: 'cocuk-guvenligi', title: 'Çocuk Güvenliği Standartları', summary: '13+ yaş kuralı, bildirim, engelleme ve çocuk güvenliği süreçleri.' },
      { slug: 'destek', title: 'İletişim ve Destek', summary: 'Teknik destek, gizlilik başvurusu ve güvenlik iletişim kanalları.' },
    ],
  },
}

export function legalHref(appSlug, documentSlug = '') {
  return `${LEGAL_BASE}/${appSlug}/${documentSlug}`.replace(/\/+$/, '') + '/'
}

export function getLegalApp(slug) { return legalApps[slug] }
export function getLegalDocument(app, slug) { return app?.documents.find((item) => item.slug === slug) }
