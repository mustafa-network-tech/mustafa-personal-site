/**
 * Ana sayfa "Seçilmiş Projeler" vitrini.
 * Portföydeki projeler yalnızca slug ile referanslanır; başlık, açıklama,
 * durum ve link projectsData.js içindeki ALL_PROJECTS kaydından okunur.
 *
 * Sıra önemlidir: mobilde her grubun yalnızca ilk 2 kartı gösterilir.
 */

import { ALL_PROJECTS } from './projectsData'

export const HOME_SHOWCASE_GROUPS = [
  { id: 'software', slugs: ['mk-pati', 'mk-traceops', 'santiye-yonetim-sistemi', 'mk-farm'] },
  { id: 'websites', slugs: ['namehub', 'mavi-kadraj-otel', 'mavi-gayrimenkul', 'mavi-kafe'] },
  // MK Digital Systems'in kendi uygulamaları (geliştirilmiş, testte veya yol haritasında).
  { id: 'applications', slugs: ['mavi-kadrajla-ogreniyorum', 'aura-daily', 'bebegimin-ilk-yili', 'mk-adisyon'] },
]

export const HOME_SHOWCASE_MOBILE_LIMIT = 2

/** Durum rozeti tonu: live | testing | development | soon | demo */
export function getStatusKind(item) {
  if (item.statusKind) return item.statusKind
  const status = item.status?.en || ''
  if (/Demo/i.test(status)) return 'demo'
  if (/Development/i.test(status)) return 'development'
  if (/Active|Live/i.test(status)) return 'live'
  return 'demo'
}

export function getHomeShowcaseGroups() {
  return HOME_SHOWCASE_GROUPS.map((group) => ({
    ...group,
    items: group.slugs
      .map((slug) => {
        const project = ALL_PROJECTS.find((item) => item.slug === slug)
        if (project) return { ...project, hasDetail: true }
        return null
      })
      .filter(Boolean)
      .slice(0, 4),
  })).filter((group) => group.items.length > 0)
}
