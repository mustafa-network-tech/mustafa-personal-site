/**
 * JSON-LD structured data for Person, Organization, WebSite, Breadcrumbs, Contact.
 */

import { SITE_URL } from './metadata'

const PERSON_NAME = 'Mustafa Öner'
const PERSON_NAME_EN = 'Mustafa Oner'
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
    jobTitle: locale === 'tr' ? 'Yazılım ve Dijital Sistemler Geliştiricisi' : 'Software and Digital Systems Developer',
    description: locale === 'tr' ? 'Yazılım ve dijital sistemler üzerine çalışan, fotoğraf çeken Mustafa Öner kişisel sitesi.' : 'Personal website of Mustafa Oner, who works on software and digital systems and takes photographs.',
    url: SITE_URL,
    // Relation only: the site itself is personal; MK Digital Systems is not its owner.
    worksFor: { '@type': 'Organization', '@id': MK_DIGITAL_ORG_ID, name: 'MK Digital Systems', url: 'https://www.mk-digitalsystems.com' },
    knowsAbout: ['Software development', 'Digital systems', 'Photography'],
    sameAs: ['https://www.linkedin.com/in/mustafa-oner-/', 'https://www.mk-digitalsystems.com'],
  }
}

/**
 * Kept for compatibility but no longer emitted site-wide: the main entity of this
 * personal site is the Person. MK Digital Systems appears only as Person.worksFor.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': MK_DIGITAL_ORG_ID,
    name: 'MK Digital Systems',
    url: 'https://www.mk-digitalsystems.com',
  }
}

/** Website schema with site search potential */
export function getWebsiteSchema(locale = 'tr') {
  const name = locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description:
      locale === 'tr'
        ? 'Mustafa Öner kişisel sitesi.'
        : 'Personal website of Mustafa Oner.',
    url: SITE_URL,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en',
    publisher: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
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
        ? 'Mustafa Öner ile kişisel ve profesyonel iletişim.'
        : 'Personal and professional contact for Mustafa Oner.',
    mainEntity: {
      '@type': 'Person',
      name: locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN,
      email: 'iletisim@mk-digitalsystems.com',
    },
  }
}

/** Service listing page */
export function getServicesPageSchema(locale = 'tr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: locale === 'tr' ? 'Hizmetler' : 'Services',
    url: `${SITE_URL}${locale === 'tr' ? '/tr/services' : '/services'}`,
    description:
      locale === 'tr'
        ? 'Web tasarımı, özel yazılım ve dijital çözümler.'
        : 'Web design, custom software and digital solutions.',
  }
}

/** Project / software work – portfolio item */
export function getProjectSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: url || SITE_URL,
    creator: {
      '@type': 'Person',
      name: PERSON_NAME_EN,
    },
  }
}
