import { SITE_URL } from '@/seo/metadata'

// Only owner-confirmed physical branches belong here. A city landing page
// alone must never create a location. Preserve the supplied share URLs.
export const BRANCHES = {
  bolu: {
    key: 'bolu', name: 'MK Digital Systems', city: 'Bolu',
    heading: 'MK Digital Systems · Bolu',
    mapsUrl: 'https://share.google/NN1pgMOMagNid1Uhl',
    // Address, phone and Place ID verified in the owner's supplied embed.
    address: {
      streetAddress: 'Köroğlu, Sezgin Sk. No:9/1',
      addressLocality: 'Bolu Merkez', addressRegion: 'Bolu',
      postalCode: '14650', addressCountry: 'TR',
    },
    phone: '+905456597551', phoneLabel: '0545 659 75 51',
    whatsapp: 'https://wa.me/905456597551',
    website: SITE_URL,
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=MK+Digital+Systems&destination_place_id=ChIJGY9ZkYk_nUAREyJv0XrdeII',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.2581605099044!2d31.6285173!3d40.7343446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d3f8991598f19%3A0x8278dd7ad16f2213!2sMK%20Digital%20Systems!5e0!3m2!1str!2str!4v1789560370331!5m2!1str!2str',
    pagePath: '/tr/bolu-web-tasarim',
    description: 'Web sitesi ve özel yazılım ihtiyaçlarınızı Bolu şubemizle görüşün.',
  },
  osmaniye: {
    key: 'osmaniye', name: 'MK Digital Systems', city: 'Osmaniye',
    heading: 'MK Digital Systems · Osmaniye',
    mapsUrl: 'https://share.google/MRmkCVOsy2F1GeFXD',
    address: {
      streetAddress: 'Merkez, Elif Hatunlar Cd.',
      addressLocality: 'Düziçi', addressRegion: 'Osmaniye',
      postalCode: '80710', addressCountry: 'TR',
    },
    phone: '+905456597551', phoneLabel: '0545 659 75 51',
    whatsapp: 'https://wa.me/905456597551',
    website: SITE_URL,
    // Both destination Place IDs come from the supplied Google embeds.
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=MK+Digital+Systems&destination_place_id=ChIJO3pH_jHxLhURCxrzzyoz0HM',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1587.870034588225!2d36.47159271572497!3d37.25387417747768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ef131fe477a3b%3A0x73d0332acff31a0b!2sMK%20Digital%20Systems!5e0!3m2!1str!2str!4v1789560811914!5m2!1str!2str',
    pagePath: '/tr/osmaniye-web-tasarim',
    description: 'Düziçi / Osmaniye şubemizle web sitenizi veya işletmenize özel yazılım ihtiyacınızı görüşün.',
  },
}

export function getBranchForCity(city) {
  const key = typeof city === 'string' ? city.toLocaleLowerCase('tr-TR') : ''
  return Object.hasOwn(BRANCHES, key) ? BRANCHES[key] : null
}

export function getBranchSchema(branch) {
  if (!branch?.address) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#branch-${branch.key}`,
    name: branch.name,
    url: `${SITE_URL}${branch.pagePath}`,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    address: { '@type': 'PostalAddress', ...branch.address },
    ...(branch.phone ? { telephone: branch.phone } : {}),
    hasMap: branch.mapsUrl,
    sameAs: [branch.mapsUrl],
  }
}
