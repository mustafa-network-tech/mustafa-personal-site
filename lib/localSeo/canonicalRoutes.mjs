// Only reviewed, equivalent pages belong here. Other legacy routes stay intact.
export const LOCAL_SEO_REDIRECTS = {
  '/bolu-web-tasarim': '/tr/bolu-web-tasarim',
  '/osmaniye-web-tasarim': '/tr/osmaniye-web-tasarim',
}

export function localSeoHref(slug) {
  const path = `/${slug}`
  return LOCAL_SEO_REDIRECTS[path] || path
}
