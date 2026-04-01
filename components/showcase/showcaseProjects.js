/**
 * Single source of truth for showcase: projects used by both cards and circles.
 * Card name = circle label, same URL for both. Circles are clickable and go to this URL.
 */

export const PROJECTS = [
  { label: 'MK Digital Systems', typeKey: 'showcase_type_platform', titleKey: 'showcase_card_mk_digital', url: 'https://mk-digital-systems.vercel.app/en', descKey: 'showcase_card_desc_mk_digital' },
  { label: 'MK Ops', typeKey: 'showcase_type_system', titleKey: 'showcase_card_mk_ops', url: 'https://www.mk-ops.tr', descKey: 'showcase_card_desc_mk_ops' },
  { label: 'ARIA', typeKey: 'showcase_type_platform', titleKey: 'showcase_card_aria', url: 'https://aria-demo-omega.vercel.app/', descKey: 'showcase_card_desc_aria' },
  { label: 'Mavi İletişim', typeKey: 'showcase_type_corporate', titleKey: 'showcase_card_mavi_iletisim', url: 'https://mavi-iletisim-demo.vercel.app/', descKey: 'showcase_card_desc_mavi_iletisim' },
  { label: 'Mavi Şarkılar', typeKey: 'showcase_type_corporate', titleKey: 'showcase_card_mavi_sarkilar', url: 'https://spotify-demo-hazel.vercel.app/', descKey: 'showcase_card_desc_mavi_sarkilar' },
  { label: 'Hukuk Bürosu', typeKey: 'showcase_type_corporate', titleKey: 'showcase_card_hukuk_burosu', url: 'https://hukuk-demo.vercel.app/', descKey: 'showcase_card_desc_hukuk_burosu' },
  { label: 'Güzellik Salonu', typeKey: 'showcase_type_corporate', titleKey: 'showcase_card_guzellik_salonu', url: 'https://guzellik-salonu-demo-web.vercel.app/', descKey: 'showcase_card_desc_guzellik_salonu' },
  { label: 'Danışmanlık', typeKey: 'showcase_type_corporate', titleKey: 'showcase_card_danismanlik', url: 'https://danismanlik-demo.vercel.app/', descKey: 'showcase_card_desc_danismanlik' },
  { label: 'MustafaOner.net', typeKey: 'showcase_type_website', titleKey: 'showcase_card_mustafaoner', url: 'https://www.mustafaoner.net', descKey: 'showcase_card_desc_mustafa_oner' },
  { label: 'Mavi Kadraj', typeKey: 'showcase_type_website', titleKey: 'showcase_card_mavi_kadraj', url: 'https://www.mavikadraj.com.tr', descKey: 'showcase_card_desc_mavi_kadraj' },
  { label: 'Kadraj Rotam', typeKey: 'showcase_type_website', titleKey: 'showcase_card_kadraj_rotam', url: 'https://kadrajrotam.com.tr', descKey: 'showcase_card_desc_kadraj_rotam' },
  { label: 'Gönül Pusulası', typeKey: 'showcase_type_website', titleKey: 'showcase_card_gonul_pusulasi', url: 'https://gonulpusulasi.com', descKey: 'showcase_card_desc_gonul_pusulasi' },
  { label: 'Şiir Dünyası', typeKey: 'showcase_type_website', titleKey: 'showcase_card_siir_dunyasi', url: 'https://siirdunyasi.com.tr', descKey: 'showcase_card_desc_siir_dunyasi' },
  { label: 'Mavi Kadrajla Öğreniyorum', typeKey: 'showcase_type_app', titleKey: 'showcase_card_mavi_kadrajla_ogreniyorum', url: 'https://play.google.com/store/apps/details?id=com.mavikadaj.learn', descKey: 'showcase_card_desc_mavi_kadrajla_ogreniyorum' },
]

export const SECTIONS = [
  { sectionId: 'showcase-section-platforms', titleKey: 'showcase_section_platforms_title', descKey: 'showcase_section_platforms_desc', icon: '⚙', cardTitles: ['MK Digital Systems', 'MK Ops', 'ARIA'] },
  { sectionId: 'showcase-section-corporate', titleKey: 'showcase_section_corporate_title', descKey: 'showcase_section_corporate_desc', icon: '🏢', cardTitles: ['Mavi İletişim', 'Mavi Şarkılar', 'Hukuk Bürosu', 'Güzellik Salonu', 'Danışmanlık'] },
  { sectionId: 'showcase-section-personal', titleKey: 'showcase_section_personal_title', descKey: 'showcase_section_personal_desc', icon: '🚀', cardTitles: ['MustafaOner.net', 'Mavi Kadraj', 'Kadraj Rotam', 'Gönül Pusulası', 'Şiir Dünyası'] },
  { sectionId: 'showcase-section-apps', titleKey: 'showcase_section_apps_title', descKey: 'showcase_section_apps_desc', icon: '📱', cardTitles: ['Mavi Kadrajla Öğreniyorum'] },
]

export const CARD_DATA = Object.fromEntries(
  PROJECTS.map((p) => [p.label, { typeKey: p.typeKey, titleKey: p.titleKey, url: p.url, descKey: p.descKey }])
)
