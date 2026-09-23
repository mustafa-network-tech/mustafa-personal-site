/**
 * Ana sayfa "Seçilmiş Projeler" vitrini.
 * Portföydeki projeler yalnızca slug ile referanslanır; başlık, açıklama,
 * durum ve link projectsData.js içindeki ALL_PROJECTS kaydından okunur.
 *
 * Detay sayfası olmayan kendi ürünlerimiz (UPCOMING_PRODUCTS) bilinçli bir
 * istisnadır: linksiz kart olarak gösterilir, sahte route üretilmez.
 *
 * Sıra önemlidir: mobilde her grubun yalnızca ilk 2 kartı gösterilir.
 */

import { ALL_PROJECTS } from './projectsData'
import { legalApps } from '@/lib/legal/apps'

const UPCOMING_PRODUCTS = {
  'aura-daily': {
    slug: 'aura-daily',
    status: { tr: 'Test Sürecinde', en: 'In Testing' },
    statusKind: 'testing',
    tr: { title: legalApps.aura.name, shortDesc: 'Günlük tutma, fotoğraf ve paylaşım için Android uygulaması' },
    en: { title: legalApps.aura.name, shortDesc: 'Android app for journaling, photos and sharing' },
  },
  'mk-inbox': {
    slug: 'mk-inbox',
    status: { tr: 'Yakında', en: 'Coming Soon' },
    statusKind: 'soon',
    tr: { title: 'MK Inbox', shortDesc: 'Tüm müşteri mesajları tek yerde' },
    en: { title: 'MK Inbox', shortDesc: 'All customer messages in one place' },
  },
}

export const HOME_SHOWCASE_GROUPS = [
  { id: 'websites', slugs: ['namehub', 'mavi-kadraj-otel', 'mavi-gayrimenkul', 'mavi-kafe'] },
  { id: 'software', slugs: ['mk-traceops', 'santiye-yonetim-sistemi', 'mk-farm', 'mavi-resepsiyon'] },
  // MK Digital Systems'in kendi uygulamaları (geliştirilmiş, testte veya yol haritasında).
  { id: 'applications', slugs: ['mavi-kadrajla-ogreniyorum', 'aura-daily', 'mavi-adisyon', 'mk-inbox'] },
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
        return UPCOMING_PRODUCTS[slug] ? { ...UPCOMING_PRODUCTS[slug], hasDetail: false } : null
      })
      .filter(Boolean)
      .slice(0, 4),
  })).filter((group) => group.items.length > 0)
}
