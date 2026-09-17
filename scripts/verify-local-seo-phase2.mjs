// Run audit-local-seo-phase2.mjs against the previous build before changing content.
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3102'
const baseline = process.env.SEO_BASELINE_URL || 'http://127.0.0.1:3101'
const output = '.next-verify/phase2'
const before = JSON.parse(await fs.readFile(`${output}/baseline.json`, 'utf8'))
const site = 'https://mustafaoner.net'
const read = async (path, origin = base) => {
  const response = await fetch(origin + path, { redirect: 'manual' })
  assert.equal(response.status, 200, path)
  return response.text()
}
const xml = await read('/sitemap.xml')
const routes = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname)
assert.equal(routes.length, 94)
assert.deepEqual(routes, before.site.map(r => r.path))
assert.equal(await read('/robots.txt'), await read('/robots.txt', baseline))
const localPaths = new Set(before.inventory.map(p => p.url))
const protectedPaths = routes.filter(p => /^\/(tr\/)?(bolu|osmaniye)-/.test(p))
const changedPaths = [...localPaths].filter(p => !protectedPaths.includes(p))
const load = async (file, name) => Function((await fs.readFile(file, 'utf8')).replaceAll('export ', '') + `;return ${name}`)()
const guidance = await load('lib/localSeo/pageGuidance.js', 'LOCAL_PAGE_GUIDANCE')
const allPages = []
for (const [file, name] of [['originalCityPages', 'ORIGINAL_CITY_PAGES'], ['newCityPages', 'NEW_CITY_PAGES']]) {
  const path = `lib/localSeo/cityPages/${file}.js`
  const current = await load(path, name)
  const old = Function(execFileSync('git', ['show', `HEAD:${path}`], { encoding: 'utf8' }).replaceAll('export ', '') + `;return ${name}`)()
  assert.deepEqual(current.map(p => p.slug), old.map(p => p.slug))
  assert.deepEqual(current.filter(p => ['bolu', 'osmaniye'].includes(p.cityKey)), old.filter(p => ['bolu', 'osmaniye'].includes(p.cityKey)))
  allPages.push(...current)
}
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href)
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE })
const result = { urls: 0, legacyUrls: localPaths.size, metadataChanges: [], protectedPages: protectedPaths, faqPages: 0, businessPages: [], links: 0, renderChecks: 0, runtimeErrors: [], reachable: [], linkRedirects: [] }
const rows = []
try {
  const parser = await browser.newPage()
  for (const path of routes) {
    const html = await read(path)
    const row = await parser.evaluate(html => {
      const d = new DOMParser().parseFromString(html, 'text/html')
      const main = d.querySelector('main')
      const meta = key => d.querySelector(`meta[name="${key}"],meta[property="${key}"]`)?.content
      return { title: d.title, description: meta('description'), h1: [...d.querySelectorAll('h1')].map(h => h.textContent),
        canonical: [...d.querySelectorAll('link[rel="canonical"]')].map(l => l.href), robots: meta('robots'),
        metadata: [...d.head.querySelectorAll('meta,title,link[rel="canonical"],link[rel="alternate"]')].map(e => e.outerHTML),
        main: main.innerHTML, text: main.textContent.replace(/\s+/g, ' '),
        mainLinks: [...main.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        links: [...d.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        schemas: [...d.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)),
        badEncoding: [...main.querySelectorAll('p,h1,h2,h3,summary')].some(el => /[a-zA-Z]\?[a-zA-Z]|\uFFFD/.test(el.textContent)),
      }
    }, html)
    row.path = path
    const old = before.site.find(r => r.path === path)
    assert.deepEqual(row.canonical, [site + path], path)
    assert.equal(row.h1.length, 1, path)
    assert(row.title && row.description && !/noindex/.test(row.robots || ''), path)
    if (changedPaths.includes(path)) {
      assert(!row.badEncoding, path)
      const data = allPages.find(p => '/' + p.slug === path)
      assert.equal(row.title, data.meta.title, path)
      assert.equal(row.description, data.meta.description, path)
      assert.equal(row.h1[0], data.hero.title, path)
      assert(row.mainLinks.includes(guidance[data.slug].serviceHref || '/tr/web-tasarim'), path)
      for (const slug of guidance[data.slug].projects) assert(row.mainLinks.includes('/tr/projects/' + slug), path)
      assert(!row.mainLinks.some(l => l.startsWith('/projects')), path)
    }
    if (row.title !== old.title || row.description !== old.description) {
      assert(changedPaths.includes(path), `Unexpected metadata change: ${path}`)
      result.metadataChanges.push({ path, before: [old.title, old.description], after: [row.title, row.description] })
    } else assert.deepEqual(row.metadata, old.metadata, `Preserved metadata: ${path}`)
    if (!changedPaths.includes(path) && !['/tr', '/tr/services'].includes(path)) {
      assert.equal(row.main, old.main, `Unchanged main: ${path}`)
      assert.deepEqual(row.schemas, old.schemas, `Unchanged schemas: ${path}`)
    }
    const flat = schemas => schemas.flatMap(s => s['@graph'] || s)
    const business = flat(row.schemas).filter(s => s['@type'] === 'LocalBusiness')
    assert.deepEqual(business, flat(old.schemas).filter(s => s['@type'] === 'LocalBusiness'), path)
    if (business.length) result.businessPages.push(path)
    for (const faq of flat(row.schemas).filter(s => s['@type'] === 'FAQPage')) {
      for (const q of faq.mainEntity) {
        assert(row.text.includes(q.name.replace(/\s+/g, ' ')), `${path}: question`)
        assert(row.text.includes(q.acceptedAnswer.text.replace(/\s+/g, ' ')), `${path}: answer`)
      }
      result.faqPages++
    }
    rows.push(row)
    result.urls++
  }
  await parser.close()
  const allLinks = new Set()
  const graph = new Map()
  for (const row of rows) {
    const normalize = href => { const u = new URL(href, site + row.path); return u.origin === site ? u.pathname : null }
    row.links.map(normalize).filter(Boolean).forEach(p => allLinks.add(p))
    graph.set(row.path, [...new Set(row.mainLinks.map(normalize).filter(Boolean))])
  }
  for (const path of allLinks) {
    const response = await fetch(base + path, { redirect: 'manual' })
    assert(response.status < 400, `Broken internal link: ${path}`)
    if (response.status >= 300) result.linkRedirects.push({ path, status: response.status })
  }
  result.links = allLinks.size
  const paths = new Map([['/tr', ['/tr']]])
  const queue = ['/tr']
  while (queue.length) {
    const path = queue.shift()
    for (const target of graph.get(path) || []) if (!paths.has(target)) { paths.set(target, [...paths.get(path), target]); queue.push(target) }
  }
  for (const path of localPaths) {
    assert(paths.has(path), `Unreachable: ${path}`)
    result.reachable.push({ path, chain: paths.get(path) })
  }
  for (const city of ['bolu', 'osmaniye']) for (const query of ['', '?utm_source=phase2']) {
    const response = await fetch(`${base}/${city}-web-tasarim${query}`, { redirect: 'manual' })
    assert.equal(response.status, 301)
    assert.equal(response.headers.get('location'), `${site}/tr/${city}-web-tasarim${query}`)
  }
  const renderPaths = [...new Set([...localPaths, ...protectedPaths, '/tr', '/tr/services'])]
  for (const width of [360, 390, 430, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    page.on('pageerror', error => result.runtimeErrors.push(error.message))
    await page.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort())
    for (const path of renderPaths) {
      await page.goto(base + path, { waitUntil: 'networkidle' })
      assert.equal(await page.locator('h1').count(), 1, `${path} ${width}`)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow: ${path} ${width}`)
      if (['/tr/services', '/bartin-mobil-uyumlu-web-sitesi', '/izmit-fabrika-web-sitesi', '/karabuk-web-tasarim'].includes(path)) {
        if (path === '/tr/services') await page.locator('#calisma-bolgeleri').scrollIntoViewIfNeeded()
        await page.screenshot({ path: `${output}/${path.replaceAll('/', '_')}-${width}.png` })
      }
      result.renderChecks++
    }
    await page.close()
    console.log(`Viewport ${width}: ${renderPaths.length} pages passed`)
  }
  assert.deepEqual(result.runtimeErrors, [])
} finally { await browser.close() }
await fs.writeFile(`${output}/results.json`, JSON.stringify(result, null, 2))
await fs.writeFile(`${output}/after.json`, JSON.stringify(rows, null, 2))
console.log(JSON.stringify({ ...result, reachable: result.reachable.length, metadataChanges: result.metadataChanges.map(m => m.path) }, null, 2))
