// Compare the production build with the unchanged production baseline.
// Requires PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE; no dependency installation.
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3102'
const baseline = process.env.SEO_BASELINE_URL || 'http://127.0.0.1:3101'
const changed = new Map([
  ['/bolu-kurumsal-web-sitesi', ['Bolu Kurumsal Web Sitesi | Yönetim Paneli ve B2B Yapı', 'Bolu’daki üretici ve tedarikçiler için yönetim panelli kurumsal web sitesi. Hizmet, katalog ve referans sayfalarını işletmenizin yapısına göre planlayın.']],
  ['/osmaniye-kurumsal-web-sitesi', ['Osmaniye Kurumsal Web Sitesi | Katalog ve Yönetim Paneli', 'Osmaniye’de üretim ve ticaret firmaları için kurumsal web sitesi. Katalog, referans ve yönetim paneli ihtiyaçlarınıza uygun sayfa yapısını birlikte belirleyelim.']],
  ['/tr/osmaniye-cafe-kurumsal-web-sitesi', ['Osmaniye Kafe ve Restoran Web Sitesi | Menü ve Rezervasyon', 'Osmaniye kafe ve restoranları için menü, galeri, konum ve rezervasyon talebi odaklı web sitesi. Mavi Kafe demosuyla işletmenize uygun yapıyı inceleyin.']],
])
const read = async (origin, path) => {
  const r = await fetch(origin + path, { redirect: 'manual' })
  assert.equal(r.status, 200, path)
  return r.text()
}
const locs = xml => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname)
const routes = locs(await read(base, '/sitemap.xml'))
assert.equal(routes.length, 94)
assert.deepEqual(routes, locs(await read(baseline, '/sitemap.xml')))
assert.equal(await read(base, '/robots.txt'), await read(baseline, '/robots.txt'))
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href)
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, headless: true })
const results = { routes: 0, unchangedMetadata: 0, changedMetadata: [], breadcrumbs: 0, faqPages: 0, localBusinessPages: [], contextualLinks: 0 }
try {
  const page = await browser.newPage()
  const parse = html => page.evaluate(html => {
    const d = new DOMParser().parseFromString(html, 'text/html')
    const meta = key => d.querySelector(`meta[name="${key}"],meta[property="${key}"]`)?.content
    const main = d.querySelector('main')
    return {
      title: d.title, description: meta('description'), keywords: meta('keywords'), robots: meta('robots'),
      canonical: d.querySelector('link[rel="canonical"]')?.href,
      og: ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height'].map(meta),
      h1: d.querySelectorAll('h1').length, text: main?.textContent.replace(/\s+/g, ' '),
      encodingIssue: [...main.querySelectorAll('p,h1,h2,h3,summary')].some(el => /[a-zA-Z]\?[a-zA-Z]|\uFFFD/.test(el.textContent)),
      links: [...main.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
      paragraphLinks: [...main.querySelectorAll('p a[href]')].map(a => a.getAttribute('href')),
      schemas: [...d.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)),
    }
  }, html)
  const rows = new Map()
  for (const path of routes) {
    const [html, oldHtml] = await Promise.all([read(base, path), read(baseline, path)])
    const current = await parse(html)
    const old = await parse(oldHtml)
    assert.equal(current.h1, 1, path)
    assert.equal(current.canonical, old.canonical, path)
    assert.equal(current.keywords, old.keywords, path)
    assert(!/noindex/.test(current.robots || ''), path)
    assert.deepEqual(current.og.slice(2, 4), old.og.slice(2, 4), path)
    assert.deepEqual(current.og.slice(4), ['1536', '1024'], path)
    if (changed.has(path)) {
      assert(!current.encodingIssue, `${path}: content encoding`)
      assert.deepEqual([current.title, current.description], changed.get(path), path)
      assert.deepEqual(current.og.slice(0, 2), changed.get(path), path)
      results.changedMetadata.push(path)
    } else {
      assert.deepEqual([current.title, current.description, ...current.og.slice(0, 2)], [old.title, old.description, ...old.og.slice(0, 2)], path)
      results.unchangedMetadata++
    }
    const flatten = schemas => schemas.flatMap(s => s['@graph'] || s)
    const schemas = flatten(current.schemas)
    for (const s of schemas) {
      if (s['@type'] === 'BreadcrumbList') {
        const tr = path.startsWith('/tr') || (!path.startsWith('/projects') && !['/contact', '/services', '/vitrin', '/en'].includes(path))
        const home = s.itemListElement[0].item
        assert.equal(typeof home === 'string' ? home : home['@id'], `https://mustafaoner.net/${tr ? 'tr' : 'en'}`, path)
        results.breadcrumbs++
      }
      if (s['@type'] === 'FAQPage') {
        for (const q of s.mainEntity) {
          assert(current.text.includes(q.name.replace(/\s+/g, ' ')), `${path}: FAQ question`)
          assert(current.text.includes(q.acceptedAnswer.text.replace(/\s+/g, ' ')), `${path}: FAQ answer`)
        }
        results.faqPages++
      }
    }
    const businesses = schemas.filter(s => s['@type'] === 'LocalBusiness')
    assert.deepEqual(businesses, flatten(old.schemas).filter(s => s['@type'] === 'LocalBusiness'), path)
    if (businesses.length) results.localBusinessPages.push(path)
    rows.set(path, current)
    results.routes++
  }
  for (const [source, target] of [
    ['/tr/bolu-web-tasarim', '/bolu-kurumsal-web-sitesi'],
    ['/tr/osmaniye-web-tasarim', '/osmaniye-kurumsal-web-sitesi'],
    ['/tr/osmaniye-cafe-kurumsal-web-sitesi', '/osmaniye-kurumsal-web-sitesi'],
  ]) {
    assert(rows.get(source).paragraphLinks.includes(target), `${source} -> ${target}`)
    results.contextualLinks++
  }
  for (const [hub, children] of [
    ['/tr/bolu-web-tasarim', ['bolu-otel-pansiyon-web-sitesi', 'bolu-fotografci-web-sitesi', 'bolu-santiye-yonetim-sistemi']],
    ['/tr/osmaniye-web-tasarim', ['osmaniye-cafe-kurumsal-web-sitesi', 'osmaniye-santiye-yonetim-sistemi']],
  ]) for (const child of children) assert(rows.get(hub).links.includes('/tr/' + child), child)
  for (const city of ['bolu', 'osmaniye']) {
    assert(rows.get('/tr/santiye-yonetim-sistemi').links.includes(`/tr/${city}-santiye-yonetim-sistemi`))
    assert(rows.get(`/tr/${city}-santiye-yonetim-sistemi`).links.includes('/tr/santiye-yonetim-sistemi'))
  }
  for (const [path, row] of rows) {
    if (/^\/[^/]+-(?:web-tasarim|kurumsal-web-sitesi)$/.test(path)) {
      assert(!row.links.some(href => /^\/projects(?:\/|$)/.test(href)), path)
      for (const href of row.links.filter(href => href.startsWith('/tr/projects'))) assert(rows.has(href), href)
    }
  }
} finally { await browser.close() }
await fs.mkdir('.next-verify/intent-check', { recursive: true })
await fs.writeFile('.next-verify/intent-check/results.json', JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
