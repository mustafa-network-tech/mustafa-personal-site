// Run --baseline against the previous production build, then run normally
// against the new build. Uses an existing Playwright installation via env.
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { gzipSync } from 'node:zlib'

const output = path.resolve('.next-verify/branch-check')
await fs.mkdir(output, { recursive: true })
const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3102'
const baselineMode = process.argv.includes('--baseline')
const cache = new Map()
async function dataModule(file) {
  file = path.resolve(file)
  if (cache.has(file)) return cache.get(file)
  let text = await fs.readFile(file, 'utf8')
  for (const match of [...text.matchAll(/from\s+['"]([^'"]+)['"]/g)]) {
    const target = match[1].startsWith('@/') ? path.resolve(match[1].slice(2)) : path.resolve(path.dirname(file), match[1])
    text = text.replace(match[0], `from '${await dataModule(path.extname(target) ? target : `${target}.js`)}'`)
  }
  const url = `data:text/javascript;base64,${Buffer.from(text).toString('base64')}`
  cache.set(file, url)
  return url
}
const load = async (file) => import(await dataModule(file))
const { LANDING_PAGES } = await load('lib/landingPages/pages.js')
const { LOCAL_SEO_PAGES } = await load('lib/localSeo/pages.js')
const { BRANCHES, getBranchForCity } = await load('lib/branches.js')
const routes = [...LOCAL_SEO_PAGES.map((p) => ({ route: `/${p.slug}`, city: p.cityKey })), ...LANDING_PAGES.map((p) => ({ route: `/tr/${p.slug}`, city: p.city }))]
const controlRoutes = ['/tr', '/en', '/tr/projects', '/projects', '/tr/projects/mk-farm', '/projects/mk-farm', '/tr/projects/santiye-yonetim-sistemi']

async function snapshot(route) {
  const response = await fetch(`${base}${route}`)
  assert.equal(response.status, 200, route)
  const html = await response.text()
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] || ''
  const metadata = [...head.matchAll(/<title>[^<]*<\/title>|<meta [^>]*>|<link [^>]*rel="(?:canonical|alternate)"[^>]*>/g)].map((m) => m[0])
  return {
    metadata,
    header: html.match(/<header class="studio-nav">[\s\S]*?<\/header>/)?.[0],
    footer: html.match(/<footer [\s\S]*?<\/footer>/)?.[0],
    scripts: [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]).filter((url) => url.startsWith('/_next/')),
    html,
  }
}
const snapshots = {}
for (const route of [...routes.map((p) => p.route), ...controlRoutes]) snapshots[route] = await snapshot(route)
const sitemap = [...(await (await fetch(`${base}/sitemap.xml`)).text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
const robots = await (await fetch(`${base}/robots.txt`)).text()
if (baselineMode) {
  for (const data of Object.values(snapshots)) {
    const chunks = await Promise.all(data.scripts.map(async (url) => Buffer.from(await (await fetch(`${base}${url}`)).arrayBuffer())))
    data.jsGzipBytes = chunks.reduce((sum, buffer) => sum + gzipSync(buffer).length, 0)
    delete data.html
  }
  await fs.writeFile(path.join(output, 'baseline.json'), JSON.stringify({ snapshots, sitemap, robots }, null, 2))
  console.log(`Baseline saved: ${Object.keys(snapshots).length} routes`)
  process.exit(0)
}
const baseline = JSON.parse(await fs.readFile(path.join(output, 'baseline.json'), 'utf8'))
assert.deepEqual(sitemap, baseline.sitemap, 'Sitemap unchanged')
assert.equal(robots, baseline.robots, 'Robots unchanged')
for (const [route, data] of Object.entries(snapshots)) {
  assert.deepEqual(data.metadata, baseline.snapshots[route].metadata, `Metadata unchanged: ${route}`)
  assert.equal(data.header, baseline.snapshots[route].header, `Header unchanged: ${route}`)
  assert.equal(data.footer, baseline.snapshots[route].footer, `Footer unchanged: ${route}`)
}
assert.equal(BRANCHES.bolu.mapsUrl, 'https://share.google/NN1pgMOMagNid1Uhl')
assert.equal(BRANCHES.osmaniye.mapsUrl, 'https://share.google/MRmkCVOsy2F1GeFXD')
assert.equal(getBranchForCity('Hatay'), null)
assert.equal(getBranchForCity('constructor'), null)
const branchCounts = { bolu: 0, osmaniye: 0 }
const missing = []
for (const branch of Object.values(BRANCHES)) {
  for (const field of ['address', 'phone', 'directionsUrl', 'embedUrl']) if (!branch[field]) missing.push(`${branch.key}.${field}`)
  if (branch.embedUrl) {
    const url = new URL(branch.embedUrl)
    assert.equal(url.hostname, 'www.google.com')
    assert.ok(url.pathname.startsWith('/maps/embed'))
    assert.notEqual(branch.embedUrl, branch.mapsUrl)
  }
}
assert.deepEqual(missing, [], 'All real branch fields supplied')
assert.equal(new URL(BRANCHES.bolu.directionsUrl).searchParams.get('destination_place_id'), 'ChIJGY9ZkYk_nUAREyJv0XrdeII')
assert.equal(new URL(BRANCHES.osmaniye.directionsUrl).searchParams.get('destination_place_id'), 'ChIJO3pH_jHxLhURCxrzzyoz0HM')

const require = createRequire(import.meta.url)
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE || require.resolve('playwright')).href)
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) })
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
// Check fallback usability even when third-party maps and analytics fail.
await context.route(/google\.com\/maps\/embed|googletagmanager\.com|google-analytics\.com/, (route) => route.abort())
const page = await context.newPage()
const runtimeErrors = []
page.on('pageerror', (error) => runtimeErrors.push(error.message))
try {
  for (const entry of routes) {
    const branch = getBranchForCity(entry.city)
    const html = snapshots[entry.route].html
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1]))
    const businesses = schemas.filter((s) => ['LocalBusiness', 'ProfessionalService'].includes(s['@type']))
    if (!branch) {
      assert.ok(!html.includes('data-branch='), `No branch on ${entry.route}`)
      assert.equal(businesses.length, 0, `No local schema on ${entry.route}`)
      continue
    }
    branchCounts[branch.key]++
    assert.ok(html.includes(`data-branch="${branch.key}"`))
    const other = branch.key === 'bolu' ? 'osmaniye' : 'bolu'
    assert.ok(!html.includes(`data-branch="${other}"`))
    assert.ok(!html.includes(BRANCHES[other].mapsUrl), `No wrong branch link: ${entry.route}`)
    assert.equal(businesses.length, branch.address ? 1 : 0)
    if (branch.address) {
      const schema = businesses[0]
      assert.equal(schema.name, branch.name)
      assert.equal(schema.hasMap, branch.mapsUrl)
      assert.equal(schema.telephone, branch.phone)
      assert.deepEqual(schema.address, { '@type': 'PostalAddress', ...branch.address })
      for (const forbidden of ['aggregateRating', 'review', 'foundingDate', 'openingHours', 'geo']) assert.ok(!(forbidden in schema))
      assert.equal(schema.parentOrganization['@id'], 'https://mustafaoner.net/#organization')
    }
    await page.goto(`${base}${entry.route}`, { waitUntil: 'domcontentloaded' })
    const section = page.locator(`[data-branch="${branch.key}"]`)
    await section.scrollIntoViewIfNeeded()
    assert.equal(await section.locator('h2').innerText(), branch.heading)
    assert.equal(await section.getByRole('link', { name: /Google Haritalar’da Aç/ }).getAttribute('href'), branch.mapsUrl)
    if (branch.directionsUrl) assert.equal(await section.getByRole('link', { name: /Yol Tarifi Al/ }).getAttribute('href'), branch.directionsUrl)
    if (branch.phone) assert.equal(await section.locator('a[href^="tel:"]').getAttribute('href'), `tel:${branch.phone}`)
    if (branch.embedUrl) {
      const frame = section.locator('iframe')
      assert.equal(await frame.getAttribute('src'), branch.embedUrl)
      assert.equal(await frame.getAttribute('loading'), 'lazy')
      assert.ok(await frame.getAttribute('title'))
    }
    for (const width of [360, 390, 430, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await section.scrollIntoViewIfNeeded()
      const overflow = await section.locator('*').evaluateAll((els) => els.filter((el) => {
        const box = el.getBoundingClientRect()
        return box.width && (box.left < -1 || box.right > innerWidth + 1)
      }).map((el) => el.tagName))
      assert.deepEqual(overflow, [], `${entry.route}: ${width}px overflow`)
      assert.ok(await section.getByRole('link', { name: /Google Haritalar’da Aç/ }).isVisible())
      if (branch.embedUrl && width < 768) assert.equal(Math.round((await section.locator('iframe').boundingBox()).height), 320)
      await section.screenshot({ path: path.join(output, `${entry.route.replaceAll('/', '_')}-${width}.png`) })
    }
    const data = snapshots[entry.route]
    const chunks = await Promise.all(data.scripts.map(async (url) => Buffer.from(await (await fetch(`${base}${url}`)).arrayBuffer())))
    data.jsGzipBytes = chunks.reduce((sum, buffer) => sum + gzipSync(buffer).length, 0)
    assert.equal(data.scripts.length, baseline.snapshots[entry.route].scripts.length, 'No new client entry')
    assert.ok(data.jsGzipBytes <= baseline.snapshots[entry.route].jsGzipBytes + 1000, 'No unnecessary client JS')
    console.log(`PASS ${entry.route}: ${branch.key}, metadata, schema, links, 4 widths`)
  }
  assert.deepEqual(branchCounts, { bolu: 6, osmaniye: 5 })
  assert.deepEqual(runtimeErrors, [])
  const result = { branchCounts, totalLandingRoutes: routes.length, metadataSnapshots: Object.keys(snapshots).length, runtimeErrors, missing, routes: routes.filter((p) => getBranchForCity(p.city)).map((p) => p.route) }
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(result, null, 2))
  console.log(JSON.stringify(result, null, 2))
  if (missing.length) console.log('INCOMPLETE: owner-confirmed address/contact or genuine map embed/directions data is still required.')
} finally { await browser.close() }
