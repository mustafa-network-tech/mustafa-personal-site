/**
 * JSON-LD structured data for Person, Website, and Project (SoftwareSourceCode/CreativeWork).
 * Rendered in head for SEO.
 */

import { SITE_URL } from './metadata'

const PERSON_NAME = 'Mustafa Öner'
const PERSON_NAME_EN = 'Mustafa Oner'
const JOB_TITLE = 'Web Developer'

/** Person schema – same for all pages */
export function getPersonSchema(locale = 'en') {
  const name = locale === 'tr' ? PERSON_NAME : PERSON_NAME_EN
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: JOB_TITLE,
    url: SITE_URL,
  }
}

/** Website schema */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mustafa Öner Portfolio',
    description: 'Portfolio of web development and digital systems projects.',
    url: SITE_URL,
  }
}

/** Project/portfolio item – SoftwareSourceCode or CreativeWork */
export function getProjectSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url: url || SITE_URL,
    creator: {
      '@type': 'Person',
      name: PERSON_NAME_EN,
    },
  }
}
