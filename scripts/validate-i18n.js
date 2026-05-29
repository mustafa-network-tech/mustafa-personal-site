const fs = require('fs')
const path = require('path')

const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../i18n/en.json'), 'utf8'))
const tr = JSON.parse(fs.readFileSync(path.join(__dirname, '../i18n/tr.json'), 'utf8'))

function allKeys(obj, prefix = '') {
  const keys = []
  for (const k of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${k}` : k
    const v = obj[k]
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...allKeys(v, p))
    } else {
      keys.push(p)
    }
  }
  return keys
}

function get(obj, keyPath) {
  return keyPath.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

const enKeys = allKeys(en)
const trKeys = allKeys(tr)
const enSet = new Set(enKeys)
const trSet = new Set(trKeys)

console.log('Missing in TR:', enKeys.filter((k) => !trSet.has(k)))
console.log('Missing in EN:', trKeys.filter((k) => !enSet.has(k)))

for (const k of enKeys) {
  const ev = get(en, k)
  const tv = get(tr, k)
  const et = Array.isArray(ev) ? 'array' : ev === null ? 'null' : typeof ev
  const tt = Array.isArray(tv) ? 'array' : tv === null ? 'null' : typeof tv
  if (et !== tt) console.log('TYPE MISMATCH', k, et, tt)
  if (Array.isArray(ev) && Array.isArray(tv) && ev.length !== tv.length) {
    console.log('ARRAY LEN', k, ev.length, tv.length)
  }
}
