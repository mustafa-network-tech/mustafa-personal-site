// Çerez onayı: tarayıcı depolamasında 'granted' | 'denied'. Kayıt yoksa henüz sorulmamıştır (null).
export const CONSENT_KEY = 'mo-cookie-consent'
export const CONSENT_EVENT = 'mo-consent-change'
export const OPEN_EVENT = 'mo-consent-open'

export function readConsent() {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch { return null }
}

export function writeConsent(value) {
  try { window.localStorage.setItem(CONSENT_KEY, value) } catch { /* depolama kapalı olabilir */ }
}
