/**
 * JSON-LD structured data for Person, Organization, WebSite, Breadcrumbs, Contact.
 */

import { SITE_URL } from './metadata'

const PERSON_NAME = 'Mustafa Öner'
const PERSON_NAME_EN = 'Mustafa Oner'

/** Person schema – portfolio / professional */
export function getPersonSchema(locale = 'en') {
  const name = locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: locale === 'tr' ? 'Web Geliştirici' : 'Web Developer',
    url: SITE_URL,
    knowsAbout: [
      'Web development',
      'Web design',
      'Custom software',
      'Corporate websites',
      'E-commerce',
      'Digital systems',
      'UI systems',
    ],
    sameAs: [
      'https://www.linkedin.com/in/mustafa-oner-82/',
      'https://github.com/mustafa-network-tech',
    ],
  }
}

/** Organization – MK Digital Systems as related brand */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MK Digital Systems',
    url: SITE_URL,
    description: 'Digital production and web development focused on corporate sites, platforms and custom software.',
  }
}

/** Website schema with site search potential */
export function getWebsiteSchema(locale = 'en') {
  const name = locale === 'tr' ? 'Mustafa Öner — Web Geliştirme ve Dijital Sistemler' : 'Mustafa Oner — Web Development & Digital Systems'
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description:
      locale === 'tr'
        ? 'Portföy, hizmetler ve dijital proje vitrini.'
        : 'Portfolio, services and digital project showcase.',
    url: SITE_URL,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en',
    publisher: {
      '@type': 'Person',
      name: locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN,
    },
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
export function getContactPageSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: locale === 'tr' ? 'İletişim' : 'Contact',
    url: `${SITE_URL}${locale === 'tr' ? '/tr/contact' : '/contact'}`,
    description:
      locale === 'tr'
        ? 'Web ve yazılım proje talepleri için iletişim.'
        : 'Contact for web development and software project inquiries.',
    mainEntity: {
      '@type': 'Person',
      name: locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN,
      email: 'mustafa82oner@gmail.com',
    },
  }
}

/** Service listing page */
export function getServicesPageSchema(locale = 'en') {
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
