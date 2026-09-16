// Run against production servers. Optional SEO_BASELINE_URL compares the previous build.
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { LOCAL_SEO_REDIRECTS } from '../lib/localSeo/canonicalRoutes.mjs'

const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3102'
const previous = process.env.SEO_BASELINE_URL
const site = 'https://mustafaoner.net'
const output = '.next-verify/canonical-check'
await fs.mkdir(output, { recursive: true })
const get = (path, origin = base) => fetch(`${origin}${path}`, { redirect: 'manual' })
const body = async (path, origin = base) => {
  const response = await get(path, origin)
  assert.equal(response.status, 200, path)
  return response.text()
}
const locs = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
const urls = locs(await body('/sitemap.xml'))
assert.equal(new Set(urls).size, urls.length)
if (previous) {
  const old = locs(await body('/sitemap.xml', previous))
  assert.deepEqual(urls, old.filter((url) => !Object.hasOwn(LOCAL_SEO_REDIRECTS, new URL(url).pathname)))
  assert.equal(await body('/robots.txt'), await body('/robots.txt', previous))
}
const redirects = []
for (const [source, target] of Object.entries(LOCAL_SEO_REDIRECTS)) {
  for (const query of ['', '?utm_source=regression']) {
    const response = await get(source + query)
    assert.equal(response.status, 301)
    assert.equal(new URL(response.headers.get('location'), base).origin, site)
    assert.equal(new URL(response.headers.get('location'), base).pathname + new URL(response.headers.get('location'), base).search, target + query)
    assert.equal((await get(target + query)).status, 200)
  }
  assert(!urls.includes(site + source))
  assert(urls.includes(site + target))
  redirects.push({ source, target, status: 301, targetStatus: 200 })
}
const links = new Set()
const titles = new Map()
const descriptions = new Map()
const duplicates = []
const rows = []
const metadata = (html) => html.match(/<head>([\s\S]*?)<\/head>/)?.[1].match(/<title>[^<]*<\/title>|<meta [^>]*>|<link [^>]*rel="(?:canonical|alternate)"[^>]*>/g)
const normalizeLinks = (html) => Object.entries(LOCAL_SEO_REDIRECTS).reduce((result, [old, target]) => result.replaceAll(`href="${old}"`, `href="${target}"`), html)
for (const url of urls) {
  const route = new URL(url).pathname
  const html = await body(route)
  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map((m) => m[1])
  assert.deepEqual(canonicals, [url], route)
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = new URL(match[1].replaceAll('&amp;', '&'), site + route)
    if (href.origin !== site) continue
    assert(!Object.hasOwn(LOCAL_SEO_REDIRECTS, href.pathname), `${route} links to ${href.pathname}`)
    links.add(href.pathname)
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
  const checkUrls = (value) => {
    if (typeof value === 'string' && value.startsWith(site)) assert(!Object.hasOwn(LOCAL_SEO_REDIRECTS, new URL(value).pathname), value)
    else if (value && typeof value === 'object') Object.values(value).forEach(checkUrls)
  }
  schemas.forEach(checkUrls)
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  for (const [type, value, map] of [['title', title, titles], ['description', description, descriptions]]) {
    if (value && map.has(value)) duplicates.push({ type, routes: [map.get(value), route] })
    else if (value) map.set(value, route)
  }
  if (route.startsWith('/tr/') && /(?:bolu|osmaniye)-/.test(route)) {
    const alternates = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]])
    assert.deepEqual(alternates, [['tr', url], ['x-default', url]])
  }
  if (previous) {
    const old = await body(route, previous)
    assert.deepEqual(metadata(html), metadata(old), `metadata: ${route}`)
    for (const tag of ['header', 'main', 'footer']) {
      const pattern = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`)
      assert.equal(html.match(pattern)?.[0], normalizeLinks(old.match(pattern)?.[0] || '') || undefined, `${tag}: ${route}`)
    }
  }
  rows.push({ route, canonical: canonicals[0], title, description })
}
const linkRedirects = []
for (const route of links) {
  const response = await get(route)
  assert(response.status < 400, `broken link: ${route} ${response.status}`)
  if (response.status >= 300) linkRedirects.push({ route, status: response.status, location: response.headers.get('location') })
}
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href)
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, headless: true })
const runtimeErrors = []
let renderChecks = 0
try {
  for (const width of [360, 390, 430, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    page.on('pageerror', (error) => runtimeErrors.push(error.message))
    await page.route('**/*', (route) => new URL(route.request().url()).origin === base ? route.continue() : route.abort())
    for (const route of rows.map((r) => r.route).filter((r) => /\/(?:tr\/)?(?:bolu|osmaniye)-/.test(r))) {
      await page.goto(base + route, { waitUntil: 'networkidle' })
      assert.equal(await page.locator('h1').count(), 1)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow ${route} ${width}`)
      await page.screenshot({ path: `${output}/${route.replaceAll('/', '_')}-${width}.png`, fullPage: true })
      renderChecks++
    }
    await page.close()
  }
} finally { await browser.close() }
assert.deepEqual(runtimeErrors, [])
await fs.writeFile(`${output}/results.json`, JSON.stringify({ redirects, routes: rows, links: links.size, linkRedirects, duplicates, renderChecks, runtimeErrors }, null, 2))
console.log(JSON.stringify({ redirects, routes: rows.length, links: links.size, linkRedirects, duplicates, renderChecks, runtimeErrors }, null, 2))
