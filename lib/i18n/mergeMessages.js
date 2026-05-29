/**
 * Bir locale dosyasındaki eksik/boş alanları yedek locale ile tamamlar.
 * Dizi alanları boşsa yedek diziye düşer; böylece .map çağrıları patlamaz.
 */
export function mergeMessages(primary, fallback) {
  if (!fallback || typeof fallback !== 'object') {
    return primary && typeof primary === 'object' ? { ...primary } : {}
  }
  if (!primary || typeof primary !== 'object') {
    return { ...fallback }
  }

  const merged = { ...fallback }

  for (const [key, value] of Object.entries(primary)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      merged[key] = value.length > 0 ? value : (Array.isArray(fallback[key]) ? fallback[key] : [])
      continue
    }

    merged[key] = value
  }

  return merged
}

/** Çeviri nesnesinden güvenli string */
export function getStr(messages, key, fallback = '') {
  const value = messages?.[key]
  return typeof value === 'string' ? value : fallback
}

/** Çeviri nesnesinden güvenli dizi */
export function getArr(messages, key) {
  const value = messages?.[key]
  return Array.isArray(value) ? value : []
}

/** Navigasyon ve dinamik key erişimi */
export function getKey(messages, key, fallback = '') {
  if (!key) return fallback
  const value = messages?.[key]
  if (typeof value === 'string') return value
  if (value != null && typeof value !== 'object') return String(value)
  return fallback
}
