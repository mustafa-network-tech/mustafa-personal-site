// Production HTTP/browser regression checks. No new application dependencies.
// NEXT_BUILD_DIR=.next-seo-check npm run build && npm run start -- --port 3102
// PLAYWRIGHT_MODULE may point to an existing Playwright installation.
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { gzipSync } from 'node:zlib'

const root = process.cwd()
const output = path.join(root, '.next-verify', 'seo-check')
await fs.mkdir(output, { recursive: true })
const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3102'
const baselineMode = process.argv.includes('--baseline')

// Load data-only project modules without changing package.json's module mode.
const moduleCache = new Map()
async function moduleUrl(filename) {
  filename = path.resolve(root, filename)
  if (moduleCache.has(filename)) return moduleCache.get(filename)
  let source = await fs.readFile(filename, 'utf8')
  const imports = [...source.matchAll(/from\s+['"]([^'"]+)['"]/g)]
  for (const match of imports) {
    const target = match[1].startsWith('@/')
      ? path.join(root, match[1].slice(2))
      : path.resolve(path.dirname(filename), match[1])
    source = source.replace(match[0], `from '${await moduleUrl(path.extname(target) ? target : `${target}.js`)}'`)
  }
  const url = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
  moduleCache.set(filename, url)
  return url
}
const load = async (file) => import(await moduleUrl(file))
const { LANDING_PAGES, getLandingBreadcrumbs, PROJECT_PROBLEMS } = await load('lib/landingPages/pages.js')
const { LANDING_SLUGS, HUB_SLUGS, landingHref } = await load('lib/landingPages/routes.js')
const { ALL_PROJECTS, getProjectBySlug } = await load('lib/projects/projectsData.js')
const { LOCAL_SEO_PAGES } = await load('lib/localSeo/pages.js')
const { toEnglishPath, toTurkishPath } = await load('lib/i18n/routes.js')
const widths = [360, 390, 430, 768, 1440]
const require = createRequire(import.meta.url)
const playwrightEntry = process.env.PLAYWRIGHT_MODULE || require.resolve('playwright')
const { chromium } = await import(pathToFileURL(playwrightEntry).href)
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) })
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
// External analytics cannot affect deterministic local regressions.
await context.route(/googletagmanager\.com|google-analytics\.com/, (route) => route.abort())
const page = await context.newPage()
const errors = []
const failedLocalResponses = []
page.on('pageerror', (error) => errors.push(error.message))
page.on('response', (response) => {
  if (response.url().startsWith(base) && response.status() >= 400) failedLocalResponses.push(`${response.status()} ${response.url()}`)
})

async function visit(route) {
  const response = await page.goto(`${base}${route}`, { waitUntil: 'load' })
  assert.equal(response.status(), 200, route)
  await page.evaluate(() => document.fonts.ready)
}

async function assetBudget(route) {
  const html = await (await fetch(`${base}${route}`)).text()
  const urls = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]).filter((url) => url.startsWith('/_next/')))]
  const chunks = await Promise.all(urls.map(async (url) => Buffer.from(await (await fetch(`${base}${url}`)).arrayBuffer())))
  return { scripts: urls.length, jsGzipBytes: chunks.reduce((sum, b) => sum + gzipSync(b).length, 0), htmlGzipBytes: gzipSync(html).length }
}

try {
  const budgetPaths = ['/tr', '/tr/projects', '/tr/projects/santiye-yonetim-sistemi', '/bolu-web-tasarim']
  const budgets = Object.fromEntries(await Promise.all(budgetPaths.map(async (route) => [route, await assetBudget(route)])))
  if (baselineMode) {
    await visit('/tr/projects')
    const headers = {}
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 })
      headers[width] = await page.locator('header.studio-nav').evaluate((el) => ({ html: el.outerHTML, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height }))
      await page.locator('header.studio-nav').screenshot({ path: path.join(output, `baseline-header-${width}.png`) })
    }
    await fs.writeFile(path.join(output, 'baseline.json'), JSON.stringify({ budgets, headers }, null, 2))
    console.log('Baseline captured:', JSON.stringify(budgets))
  } else {
    assert.equal(LANDING_PAGES.length, 14)
    assert.deepEqual(LANDING_PAGES.map((p) => p.slug).sort(), [...LANDING_SLUGS].sort())
    for (const key of ['title', 'description', 'h1', 'intro']) {
      assert.equal(new Set(LANDING_PAGES.map((p) => p[key])).size, LANDING_PAGES.length, `Unique ${key}`)
    }
    assert.equal(new Set([...LANDING_PAGES.map((p) => p.title), ...LOCAL_SEO_PAGES.map((p) => p.meta.title)]).size, LANDING_PAGES.length + LOCAL_SEO_PAGES.length, 'No duplicate legacy/new titles')
    assert.equal(new Set([...LANDING_PAGES.map((p) => p.description), ...LOCAL_SEO_PAGES.map((p) => p.meta.description)]).size, LANDING_PAGES.length + LOCAL_SEO_PAGES.length, 'No duplicate legacy/new descriptions')
    const farm = getProjectBySlug('mk-farm')
    assert.equal(farm.status.tr, 'Aktif Kullanım')
    assert.equal(farm.status.en, 'In Active Use')
    assert.equal(farm.liveUrl, 'https://graceful-melba-ff5818.netlify.app/')
    const reachable = new Set(HUB_SLUGS)
    for (let i = 0; i < LANDING_PAGES.length; i++) for (const p of LANDING_PAGES) {
      if (reachable.has(p.slug)) for (const slug of [...p.related, ...(p.regions || [])]) reachable.add(slug)
    }
    assert.equal(reachable.size, LANDING_PAGES.length, 'All pages reachable from footer hubs')
    const cityPages = LANDING_PAGES.filter((p) => p.parent === 'santiye-yonetim-sistemi')
    const normalizeCity = (value) => value.toLocaleLowerCase('tr').replace(/bolu|osmaniye|hatay|bartın|düzce/g, 'CITY')
    for (const key of ['title', 'description', 'h1', 'intro', 'cta']) assert.equal(new Set(cityPages.map((p) => normalizeCity(p[key]))).size, 5, `City-specific ${key}`)
    const cityQuestions = cityPages.flatMap((p) => p.faqs.map(([q]) => normalizeCity(q)))
    assert.equal(new Set(cityQuestions).size, cityQuestions.length, 'Distinct city FAQs')
    const links = new Set()
    const results = []
    for (const entry of LANDING_PAGES) {
      const route = landingHref(entry.slug)
      assert.equal(toEnglishPath(route), '/services')
      assert.equal(toTurkishPath('/projects/mk-farm'), '/tr/projects/mk-farm')
      for (const slug of entry.projects) {
        assert.ok(getProjectBySlug(slug), `Existing project: ${slug}`)
        assert.ok(PROJECT_PROBLEMS[slug], `Problem: ${slug}`)
      }
      await visit(route)
      assert.equal(await page.title(), entry.title)
      assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), entry.description)
      assert.equal(await page.locator('h1').count(), 1)
      assert.equal(await page.locator('h1').innerText(), entry.h1)
      assert.equal(await page.locator('html').getAttribute('lang'), 'tr')
      const canonical = `https://mustafaoner.net${route}`
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonical)
      assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), canonical)
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), entry.title)
      assert.equal(await page.locator('meta[name="twitter:title"]').getAttribute('content'), entry.title)
      assert.equal(await page.locator('link[hreflang="tr"]').getAttribute('href'), canonical)
      assert.equal(await page.locator('link[hreflang="en"]').count(), 0)
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'index, follow')
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.flatMap((el) => JSON.parse(el.textContent)))
      for (const type of ['Person', 'Organization', 'WebSite', 'BreadcrumbList', 'Service', 'FAQPage']) assert.equal(schemas.filter((s) => s['@type'] === type).length, 1, `${route}: ${type}`)
      const faq = schemas.find((s) => s['@type'] === 'FAQPage')
      assert.deepEqual(faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), entry.faqs)
      assert.equal(schemas.find((s) => s['@type'] === 'Service').provider['@id'], schemas.find((s) => s['@type'] === 'Organization')['@id'])
      const crumbs = schemas.find((s) => s['@type'] === 'BreadcrumbList').itemListElement
      assert.deepEqual(crumbs.map((c) => c.item), getLandingBreadcrumbs(entry).map((c) => `https://mustafaoner.net${c.url}`))
      assert.equal(await page.locator('nav[aria-label="İçerik yolu"] [aria-current="page"]').count(), 1)
      assert.equal(await page.locator('footer nav[aria-label="Çözümler"] a').count(), 4)
      assert.equal(await page.locator('img:not([alt]), img[alt=""]').count(), 0)
      const pageLinks = await page.locator('a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href')))
      for (const href of pageLinks) {
        if (href.startsWith('/')) links.add(href)
        if (href.startsWith('#')) assert.equal(await page.locator(`[id="${href.slice(1)}"]`).count(), 1, `${route}: ${href}`)
      }
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 })
        const overflow = await page.evaluate(() => [...document.querySelectorAll('article.studio-site *')].filter((el) => {
          const box = el.getBoundingClientRect()
          return box.width && (box.left < -1 || box.right > innerWidth + 1)
        }).map((el) => `${el.tagName}: ${el.textContent.slice(0, 60)}`))
        assert.deepEqual(overflow, [], `${route} overflow at ${width}px`)
        assert.equal(await page.locator('h1').isVisible(), true)
        if ([390, 1440].includes(width) || ['web-tasarim', 'ozel-yazilim-gelistirme', 'ciftlik-yonetim-sistemi', 'bolu-santiye-yonetim-sistemi'].includes(entry.slug)) {
          await page.screenshot({ path: path.join(output, `${entry.slug}-${width}.png`), fullPage: true })
          if ([390, 1440].includes(width)) {
            await page.evaluate(() => window.scrollTo(0, 0))
            await page.screenshot({ path: path.join(output, `${entry.slug}-${width}-hero.png`) })
          }
        }
      }
      await page.locator('details summary').first().click()
      assert.equal(await page.locator('details').first().getAttribute('open'), '')
      assert.equal(await page.locator('details').first().locator('p').isVisible(), true)
      results.push({ route, title: entry.title, keyword: entry.keyword, canonical, widths })
      console.log(`PASS ${route}: metadata, schema, links, 5 viewports, FAQ`)
    }

    // Existing portfolio routes and project details retain both languages.
    for (const prefix of ['/tr', '']) for (const project of ALL_PROJECTS) links.add(`${prefix}/projects/${project.slug}`)
    for (const route of ['/tr/projects', '/projects', '/tr/services', '/services', '/en', '/tr', '/bolu-web-tasarim', '/osmaniye-web-tasarim']) links.add(route)
    for (const href of links) {
      const response = await fetch(`${base}${href}`)
      assert.equal(response.status, 200, `Internal link ${href}`)
      const hash = new URL(href, base).hash
      if (hash) assert.ok((await response.text()).includes(`id="${hash.slice(1)}"`), `Anchor ${href}`)
    }
    for (const route of ['/tr/nonexistent-seo-route', '/tr/projects/nonexistent-project']) assert.equal((await fetch(`${base}${route}`)).status, 404, route)
    const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
    for (const entry of results) assert.equal(sitemap.split(`<loc>${entry.canonical}</loc>`).length - 1, 1, `Sitemap: ${entry.route}`)
    for (const entry of LOCAL_SEO_PAGES) assert.ok(sitemap.includes(`<loc>https://mustafaoner.net/${entry.slug}</loc>`), `Legacy sitemap ${entry.slug}`)
    const robots = await (await fetch(`${base}/robots.txt`)).text()
    assert.ok(robots.includes('Allow: /'))
    assert.ok(!robots.includes('Disallow:'))
    assert.ok(robots.includes('https://mustafaoner.net/sitemap.xml'))
    await visit('/tr/projects/mk-farm')
    assert.ok((await page.locator('main').innerText()).includes('Aktif Kullanım'))
    assert.ok(await page.locator(`a[href="${farm.liveUrl}"]`).count() > 0)
    await visit('/projects/mk-farm')
    assert.ok((await page.locator('main').innerText()).includes('In Active Use'))
    assert.ok(await page.locator(`a[href="${farm.liveUrl}"]`).count() > 0)
    // Header markup and geometry must remain identical to the baseline.
    const baseline = JSON.parse(await fs.readFile(path.join(output, 'baseline.json'), 'utf8'))
    await visit('/tr/projects')
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 })
      const header = await page.locator('header.studio-nav').evaluate((el) => ({ html: el.outerHTML, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height }))
      assert.deepEqual(header, baseline.headers[width], `Header unchanged at ${width}px`)
    }
    await page.setViewportSize({ width: 390, height: 844 })
    await visit('/tr/ciftlik-yonetim-sistemi')
    await page.getByRole('button', { name: 'Open menu', exact: true }).click()
    await page.locator('header').getByRole('button', { name: 'EN', exact: true }).click()
    await page.waitForURL(`${base}/services`)
    await page.waitForFunction(() => document.documentElement.lang === 'en')
    assert.equal(await page.locator('html').getAttribute('lang'), 'en')
    for (const route of budgetPaths) {
      assert.ok(budgets[route].jsGzipBytes <= baseline.budgets[route].jsGzipBytes + 12000, `JS regression budget ${route}`)
    }
    const newPageBudget = await assetBudget('/tr/ciftlik-yonetim-sistemi')
    assert.ok(newPageBudget.jsGzipBytes <= budgets['/tr/projects'].jsGzipBytes + 12000, 'Landing JS budget')
    assert.deepEqual(errors, [], 'Browser runtime errors')
    assert.deepEqual(failedLocalResponses, [], 'No failed local browser resources')
    const report = { pages: results, internalLinksChecked: links.size, projectDetailRoutes: ALL_PROJECTS.length * 2, baselineBudgets: baseline.budgets, budgets, newPageBudget, errors, failedLocalResponses }
    await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2))
    console.log(`PASS: ${results.length} pages; ${links.size} internal links; ${ALL_PROJECTS.length * 2} project detail routes; header unchanged; sitemap; robots; runtime errors: 0`)
    console.log('JS gzip bytes:', JSON.stringify({ baseline: baseline.budgets, after: budgets, newPageBudget }))
  }
} finally {
  await browser.close()
}
