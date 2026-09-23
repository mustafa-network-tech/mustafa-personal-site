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
  'mk-adisyon': {
    slug: 'mk-adisyon',
    name: 'MK Adisyon',
    // TODO: Play Console'daki gerçek paket kimliğiyle doğrulayın.
    packageId: 'com.mkdigitalsystems.mkadisyon',
    publisher: 'MK DIGITAL SYSTEMS – MUSTAFA ÖNER',
    email: 'mustafa82oner@gmail.com',
    updatedAt: '23 Eylül 2026',
    description: 'MK Adisyon KVKK aydınlatma metni, gizlilik politikası, kullanım koşulları, veri işleme sözleşmesi, çerez politikası, künye ve hesap silme sayfaları.',
    documents: [
      { slug: 'kvkk', title: 'KVKK Aydınlatma Metni', summary: 'İşletme yetkilileri ve davet edilen personel için işlenen veriler, amaçlar, hukuki sebepler ve haklar.' },
      { slug: 'gizlilik', title: 'Gizlilik Politikası', summary: 'Web paneli ve Android uygulamasında toplanan veriler, paylaşım, güvenlik, saklama ve silme.' },
      { slug: 'kullanim-kosullari', title: 'Kullanım Koşulları / Hizmet Sözleşmesi', summary: 'Abonelik, 7 günlük deneme, iptal, hizmet kesintisi, sorumluluk sınırı ve verilerin saklanması.' },
      { slug: 'veri-isleme-sozlesmesi', title: 'Veri İşleme Sözleşmesi', summary: 'İşletme veri sorumlusu, MK Adisyon veri işleyen olarak: KVKK md. 12 kapsamındaki yükümlülükler.' },
      { slug: 'cerez-politikasi', title: 'Çerez Politikası', summary: 'Web girişinde kullanılan zorunlu oturum çerezleri ve tarayıcı depolaması.' },
      { slug: 'hesap-silme', title: 'Hesap ve Veri Silme', summary: 'İşletme hesabının, personel hesaplarının ve verilerin silinmesi için adımlar.' },
      { slug: 'iletisim', title: 'Künye ve İletişim', summary: 'Hizmet sağlayıcı bilgileri, destek ve KVKK başvuru kanalları.' },
    ],
  },
}

export function legalHref(appSlug, documentSlug = '') {
  return `${LEGAL_BASE}/${appSlug}/${documentSlug}`.replace(/\/+$/, '') + '/'
}

export function getLegalApp(slug) { return legalApps[slug] }
export function getLegalDocument(app, slug) { return app?.documents.find((item) => item.slug === slug) }
