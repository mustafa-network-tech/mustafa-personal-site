/**
 * JSON-LD structured data for Person, WebSite, ProfilePage, Breadcrumbs, Contact.
 */

import { SITE_URL } from './metadata'

const PERSON_NAME = 'Mustafa Öner'
const PERSON_NAME_EN = 'Mustafa Öner'
const WEBSITE_ID = `${SITE_URL}/#website`
const PERSON_ID = `${SITE_URL}/#person`
/** Same @id the MK Digital Systems site uses for its own Organization node. */
const MK_DIGITAL_ORG_ID = 'https://www.mk-digitalsystems.com/#organization'

/** Person schema – portfolio / professional */
export function getPersonSchema(locale = 'tr') {
  const name = locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name,
    description: locale === 'tr' ? "Mustafa Öner'in kişisel web sitesi: fiber optik altyapı, yazılım, doğa fotoğrafçılığı, gezi ve edebiyat." : "Personal website of Mustafa Öner: fiber optic infrastructure, software, nature photography, travel and literature.",
    url: SITE_URL,
    // Relation only: the site itself is personal; MK Digital Systems is not its owner.
    worksFor: { '@type': 'Organization', '@id': MK_DIGITAL_ORG_ID, name: 'MK Digital Systems', url: 'https://www.mk-digitalsystems.com' },
    knowsAbout: ['Fiber optic infrastructure', 'Software development', 'Nature photography', 'Travel', 'Literature'],
    sameAs: ['https://www.linkedin.com/in/mustafa-oner-/', 'https://www.mk-digitalsystems.com'],
  }
}

/** Website schema with site search potential */
export function getWebsiteSchema(locale = 'tr') {
  const name = locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name,
    alternateName: 'mustafaoner.net',
    description:
      locale === 'tr'
        ? 'Mustafa Öner kişisel web sitesi.'
        : 'Personal website of Mustafa Öner.',
    url: SITE_URL,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en',
    publisher: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
  }
}

/** ProfilePage: the page whose main entity is the Person (home and About). */
export function getProfilePageSchema({ locale = 'tr', path, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}${path}#profilepage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  }
}

/** BreadcrumbList for inner pages */
export function getBreadcrumbListSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/** Contact page */
export function getContactPageSchema(locale = 'tr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: locale === 'tr' ? 'İletişim' : 'Contact',
    url: `${SITE_URL}${locale === 'tr' ? '/tr/contact' : '/contact'}`,
    description:
      locale === 'tr'
        ? 'Mustafa Öner ile iletişim.'
        : 'Contact Mustafa Öner.',
    mainEntity: {
      '@type': 'Person',
      name: locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN,
      email: 'mustafa82oner@gmail.com',
    },
  }
}
