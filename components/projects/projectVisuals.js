import { Code, Globe, LayoutDashboard, LayoutGrid, Layers, Smartphone } from 'lucide-react'

/**
 * Kategori / etiketlerden dekoratif ikon seçer.
 * Proje verisine dokunmaz; yalnızca UI için kullanılır.
 */
export function getProjectTypeIcon(project) {
  const category = `${project?.category?.tr || ''} ${project?.category?.en || ''}`.toLowerCase()
  const tags = (project?.tags || []).join(' ').toLowerCase()
  const hay = `${category} ${tags}`

  if (/\bai\b|\bml\b|machine learning|yapay zeka/.test(hay)) return Code
  if (/mobil|mobile|ios|android/.test(hay)) return Smartphone
  if (/saas/.test(hay)) return LayoutGrid
  if (/panel|dashboard|yönetim|operations/.test(hay)) return LayoutDashboard
  if (/platform/.test(hay)) return Layers
  return Globe
}

/**
 * Durum alanı veri şemasında yok.
 * Yalnızca kategorideki "Demo" ifadesi veya canlı URL'den çıkarılır.
 * Çıkarılamıyorsa null döner — sahte durum üretilmez.
 */
export function getProjectStatus(project, locale = 'tr') {
  const catTr = (project?.category?.tr || '').toLowerCase()
  const catEn = (project?.category?.en || '').toLowerCase()
  if (catTr.includes('demo') || catEn.includes('demo')) {
    return 'Demo'
  }
  if (project?.liveUrl) {
    return locale === 'tr' ? 'Aktif' : 'Live'
  }
  return null
}
