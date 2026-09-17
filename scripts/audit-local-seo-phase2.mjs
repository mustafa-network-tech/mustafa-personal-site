import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3101'
const output = '.next-verify/phase2'
await fs.mkdir(output, { recursive: true })
const load = async (file, name) => Function((await fs.readFile(file, 'utf8')).replaceAll('export ', '') + `;return ${name}`)()
const all = [...await load('lib/localSeo/cityPages/originalCityPages.js', 'ORIGINAL_CITY_PAGES'), ...await load('lib/localSeo/cityPages/newCityPages.js', 'NEW_CITY_PAGES')]
const pages = all.filter(p => !['bolu-web-tasarim', 'osmaniye-web-tasarim'].includes(p.slug))
const pool = await load('lib/localSeo/projectPool.js', 'LOCAL_SEO_PROJECT_POOL')
const pick = await load('lib/localSeo/projectPool.js', 'pickProjectsForSlug')
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href)
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE })
const tab = await browser.newPage()
const xml = await (await fetch(base + '/sitemap.xml')).text()
const routes = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname)
const site = []
for (const path of routes) {
  const response = await fetch(base + path, { redirect: 'manual' })
  const html = await response.text()
  const row = await tab.evaluate(({ html, path }) => {
    const d = new DOMParser().parseFromString(html, 'text/html')
    const meta = key => d.querySelector(`meta[name="${key}"],meta[property="${key}"]`)?.content
    const main = d.querySelector('main')
    const links = [...d.querySelectorAll('a[href]')].map(a => ({ href: a.getAttribute('href'), label: a.textContent.trim(), inMain: !!a.closest('main') }))
    return { path, title: d.title, description: meta('description'), h1: [...d.querySelectorAll('h1')].map(h => h.textContent), canonical: d.querySelector('link[rel="canonical"]')?.href,
      metadata: [...d.head.querySelectorAll('meta,title,link[rel="canonical"],link[rel="alternate"]')].map(e => e.outerHTML),
      robots: meta('robots'), main: main?.innerHTML, links, paragraphs: [...main.querySelectorAll('p')].map(p => p.textContent.trim()),
      schemas: [...d.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)),
    }
  }, { html, path })
  site.push({ ...row, status: response.status })
}
await browser.close()
const cityNames = [...new Set(all.map(p => p.cityName))]
const normalize = text => cityNames.reduce((s, city) => s.replaceAll(city, '[şehir]'), text).toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim()
const tokens = text => { const w = normalize(text).split(' '); return new Set(w.slice(0, -4).map((_, i) => w.slice(i, i + 5).join(' '))) }
const content = p => [p.introText, ...(p.introParagraphs || []), ...p.services.map(s => s.description), ...p.blocks.map(b => b.text), ...(p.advantages || []).map(a => a.description), ...p.faqs.map(f => f.answer)].join(' ')
const inventory = pages.map(p => {
  const row = site.find(r => r.path === '/' + p.slug)
  const a = tokens(content(p))
  const similarities = pages.filter(q => q.slug !== p.slug).map(q => {
    const b = tokens(content(q)); const intersection = [...a].filter(t => b.has(t)).length
    return { slug: q.slug, sameCity: q.cityKey === p.cityKey, shingleJaccard: +(intersection / new Set([...a, ...b]).size).toFixed(3) }
  }).sort((a, b) => b.shingleJaccard - a.shingleJaccard)
  const paragraphs = [p.introText, ...(p.introParagraphs || []), ...p.blocks.map(b => b.text), ...p.faqs.map(f => f.answer)]
  return { ...p, url: '/' + p.slug, projects: pick(p.slug, 2), siblings: pages.filter(q => q.cityKey === p.cityKey && q.slug !== p.slug).map(q => '/' + q.slug),
    incoming: site.filter(r => r.path !== row.path && r.links.some(l => l.href === row.path)).map(r => r.path),
    outgoing: [...new Set(row.links.map(l => l.href))], similarities: similarities.slice(0, 3),
    sameCitySimilarity: similarities.find(s => s.sameCity),
    repeatedParagraphs: paragraphs.filter((text, i) => paragraphs.findIndex(t => normalize(t) === normalize(text)) !== i),
  }
})
await fs.writeFile(`${output}/baseline.json`, JSON.stringify({ site, inventory, pool }, null, 2))
for (const p of inventory) console.log(JSON.stringify({ url: p.url, title: p.meta.title, description: p.meta.description, h1: p.hero.title, projects: p.projects.map(p => p.id), incoming: p.incoming.length, sameCity: p.sameCitySimilarity, closest: p.similarities[0], repeated: p.repeatedParagraphs.length }))
