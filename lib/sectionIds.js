/**
 * Home page section anchor IDs — Turkish slugs on /tr, English on /
 * Keep in sync with Header nav and section components.
 */

export function getSectionIds(lang) {
  if (lang === 'tr') {
    return {
      hero: 'ana-sayfa',
      services: 'yazilim-hizmetleri',
      narrative: 'yazilim-sureci',
      projects: 'projeler',
      photography: 'fotograf',
      principles: 'calisma-ilkeleri',
      contact: 'iletisim',
      process: 'surec',
    }
  }
  return {
    hero: 'identity',
    services: 'telekom',
    narrative: 'software-approach',
    projects: 'software',
    photography: 'photography',
    principles: 'principles',
    contact: 'contact-form',
    process: 'process',
  }
}
