// Site geneli gizlilik ve kişisel verilerin korunması metni (TR / EN).
// Yalnızca sitenin gerçekte yaptığı işlemleri anlatır: Google Analytics, tarayıcı depolaması, e-posta ile iletişim, dış bağlantılar.
import { EMAIL } from '@/lib/mo/site'

export const PRIVACY_UPDATED = { tr: '25 Kasım 2026', en: 'November 25, 2026' }

export const PRIVACY = {
  tr: {
    kicker: 'Gizlilik',
    title: 'Gizlilik ve Kişisel Verilerin Korunması',
    lead: 'Bu sayfa, mustafaoner.net sitesini ziyaret ettiğinizde hangi bilgilerin nasıl işlendiğini sade bir dille anlatır.',
    updated: 'Son güncelleme',
    sections: [
      { h: 'Veri sorumlusu', p: [`Bu sitenin sahibi ve kişisel verilerin veri sorumlusu Mustafa Öner’dir. Bu metinle ilgili her türlü soru ve başvuru için ${EMAIL} adresine yazabilirsiniz.`] },
      { h: 'Hangi bilgiler işlenir', ul: [
        'Mesajınız: Bana e-posta ile ulaşırsanız e-posta adresiniz, adınız ve mesajınızın içeriği. Sitede bir iletişim formu yoktur; yazışma doğrudan e-posta üzerinden yapılır.',
        'Ziyaret istatistikleri: Sitenin nasıl kullanıldığını anlamak için Google Analytics kullanılır. Görüntülenen sayfalar, ziyaret süresi, cihaz ve tarayıcı türü, yaklaşık konum gibi toplu bilgiler ile IP adresi Google tarafından işlenir. Google Analytics tarayıcınıza çerezler (örneğin _ga) yerleştirebilir.',
        'Tarayıcı depolaması: Dil tercihiniz, açılış animasyonunun gösterildiği ve özel gün ekranının görüldüğü bilgisi cihazınızın tarayıcı depolamasında tutulur. Bu bilgiler sunucuya gönderilmez ve sizi kimliğinizle ilişkilendirmez.',
        'Sunucu kayıtları: Sitenin barındırıldığı altyapı, güvenlik ve işleyiş amacıyla tarih, istenen sayfa ve IP adresi gibi standart teknik kayıtlar tutabilir.',
      ] },
      { h: 'Amaç ve hukuki sebep', p: ['Bu bilgiler; mesajlarınızı yanıtlamak, siteyi güvenli ve çalışır tutmak ve ziyaretçilerin siteyi nasıl kullandığını anlayarak içeriği iyileştirmek için işlenir. Hukuki sebep, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 5. maddesinin ikinci fıkrasındaki meşru menfaattir ve bu menfaat sizin temel hak ve özgürlüklerinize zarar vermez. Verileriniz satılmaz ve reklam amacıyla kullanılmaz.'] },
      { h: 'Üçüncü taraflar ve aktarım', ul: [
        'Google Analytics: İstatistik verileri Google tarafından işlenir; bu veriler Türkiye dışındaki sunucularda da işlenebilir.',
        'Fotoğraflar: Mustafa’nın Kadrajından sayfasındaki bazı fotoğraflar Mavi Kadraj arşivinden (arsiv.mavikadraj.com.tr) yüklenir; bu sırada tarayıcınız o sunucuya doğrudan istek gönderir.',
        'Dış bağlantılar: Instagram, LinkedIn, Mavi Kadraj ve MK Digital Systems bağlantıları sizi bu hizmetlerin kendi sitelerine götürür. Oradaki veri işleme, ilgili hizmetlerin kendi gizlilik politikalarına tabidir.',
      ] },
      { h: 'Saklama süresi', p: ['E-posta yazışmaları, yanıt süreci ve makul bir süre boyunca saklanır. Google Analytics verilerinin saklama süresi Google Analytics hesabındaki ayarlara göre belirlenir. Tarayıcı depolamasındaki bilgileri istediğiniz zaman tarayıcınızdan silebilirsiniz.'] },
      { h: 'Çerezleri ve depolamayı yönetme', p: ['Çerezleri ve site verilerini tarayıcı ayarlarınızdan silebilir veya engelleyebilirsiniz. Google Analytics’in sizi ölçmesini istemiyorsanız Google’ın sunduğu “Google Analytics devre dışı bırakma tarayıcı eklentisi”ni kullanabilirsiniz. Bu durumda sitenin çalışması etkilenmez.'] },
      { h: 'Haklarınız', p: ['Kanunun 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme ve bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme, işlenen verilerin analiziyle aleyhinize bir sonuç çıkmasına itiraz etme ve zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı yukarıdaki e-posta adresine iletebilirsiniz.'] },
      { h: 'Uygulamalara ait metinler', p: ['MK Digital Systems tarafından geliştirilen mobil uygulamaların gizlilik, KVKK ve kullanım metinleri bu sayfadan bağımsızdır ve kendi sayfalarında yer alır.'], apps: true },
      { h: 'Değişiklikler', p: ['Bu metin, sitede veya mevzuatta bir değişiklik olduğunda güncellenebilir. Güncel sürüm her zaman bu sayfada yer alır.'] },
    ],
  },
  en: {
    kicker: 'Privacy',
    title: 'Privacy and Personal Data Protection',
    lead: 'This page explains, in plain language, what information is processed when you visit mustafaoner.net and how.',
    updated: 'Last updated',
    sections: [
      { h: 'Data controller', p: [`This site is owned by Mustafa Öner, who is also the controller of personal data. For any question or request about this notice, write to ${EMAIL}.`] },
      { h: 'What information is processed', ul: [
        'Your message: if you contact me by email, your email address, your name and the content of your message. There is no contact form on the site; correspondence takes place directly by email.',
        'Visit statistics: Google Analytics is used to understand how the site is used. Aggregated information such as pages viewed, visit duration, device and browser type and approximate location, as well as your IP address, is processed by Google. Google Analytics may place cookies (for example _ga) in your browser.',
        'Browser storage: your language preference, whether the opening animation has been shown and whether a special-day screen has been seen are kept in your browser storage. This information is not sent to a server and does not identify you.',
        'Server logs: the infrastructure hosting the site may keep standard technical logs such as the date, the requested page and the IP address for security and operation.',
      ] },
      { h: 'Purpose and legal basis', p: ['This information is processed to answer your messages, to keep the site secure and working, and to improve the content by understanding how visitors use the site. The legal basis is legitimate interest under Article 5(2) of the Turkish Personal Data Protection Law No. 6698, which does not harm your fundamental rights and freedoms. Your data is not sold and is not used for advertising.'] },
      { h: 'Third parties and transfers', ul: [
        'Google Analytics: statistics are processed by Google; this data may also be processed on servers outside Turkey.',
        'Photographs: some photographs on the Through Mustafa’s Lens page are loaded from the Mavi Kadraj archive (arsiv.mavikadraj.com.tr); your browser sends requests directly to that server while doing so.',
        'External links: the Instagram, LinkedIn, Mavi Kadraj and MK Digital Systems links take you to those services’ own sites. Data processing there is subject to their own privacy policies.',
      ] },
      { h: 'Retention', p: ['Email correspondence is kept for the duration of the reply process and a reasonable period afterwards. The retention period of Google Analytics data follows the settings of the Google Analytics account. You can delete the information in your browser storage at any time from your browser.'] },
      { h: 'Managing cookies and storage', p: ['You can delete or block cookies and site data in your browser settings. If you do not want Google Analytics to measure you, you can use Google’s “Google Analytics Opt-out Browser Add-on”. The site keeps working either way.'] },
      { h: 'Your rights', p: ['Under Article 11 of the Law, you have the right to learn whether your personal data is processed, to request information about it, to learn its purpose and whether it is used accordingly, to know the third parties it is transferred to in Turkey or abroad, to request correction if incomplete or incorrect, to request deletion or destruction, to request that these actions be notified to third parties, to object to an outcome against you arising from automated analysis, and to claim compensation for damages. You can send your requests to the email address above.'] },
      { h: 'Texts for the apps', p: ['The privacy, data protection and terms texts of the mobile apps developed by MK Digital Systems are separate from this page and are available on their own pages.'], apps: true },
      { h: 'Changes', p: ['This notice may be updated when the site or the legislation changes. The current version is always on this page.'] },
    ],
  },
}
