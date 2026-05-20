'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { TURKEY_CITIES } from '@/lib/localSeo/turkeyCities'
import { SERVICE_TYPE_OPTIONS } from '@/lib/localSeo/serviceTypes'
import { buildWhatsAppProjectUrl } from '@/lib/localSeo/whatsapp'

const inputBase =
  'w-full rounded-[10px] px-3 py-3 border bg-white/80 text-[#000000] transition-colors outline-none focus:border-[#2563EB] placeholder:text-[#94A3B8] placeholder:opacity-80'
const inputBorder = '1px solid rgba(0,0,0,0.08)'

/**
 * Ana sayfa ile şehir sayfalarında ortak talep formu (WhatsApp).
 * @param {{ formId?: string, defaultCity?: string, titleKey?: string, subtitleKey?: string }} props
 */
export default function ProjectRequestForm({
  formId = 'contact-form',
  defaultCity = '',
  titleKey = 'project_request_title',
  subtitleKey = 'project_request_subtitle',
}) {
  const { t } = useLanguage()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState(defaultCity)
  const [serviceType, setServiceType] = useState(SERVICE_TYPE_OPTIONS[0])
  const [detail, setDetail] = useState('')
  const [error, setError] = useState('')

  const title = t[titleKey] || t.project_request_title
  const subtitle = t[subtitleKey] || t.project_request_subtitle

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!fullName.trim() || !phone.trim() || !city || !serviceType || !detail.trim()) {
      setError(t.project_request_error || 'Lütfen zorunlu alanları doldurun.')
      return
    }
    const url = buildWhatsAppProjectUrl({ fullName, phone, city, serviceType, detail })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id={formId} className="py-16 md:py-20 scroll-mt-24" style={{ background: '#F5F3EF' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-[640px] mx-auto">
          <header className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B] mb-3"
              style={{ letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              {title}
            </h2>
            <p className="text-lg leading-[1.7] text-[#475569] whitespace-pre-line">{subtitle}</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-[#334155] mb-1.5">
                {t.project_request_name} <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.project_request_placeholder_name}
                className={inputBase}
                style={{ border: inputBorder }}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-[#334155] mb-1.5">
                {t.project_request_phone} <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id={`${formId}-phone`}
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.project_request_placeholder_phone}
                className={inputBase}
                style={{ border: inputBorder }}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-city`} className="block text-sm font-medium text-[#334155] mb-1.5">
                {t.project_request_city} <span className="text-[#DC2626]">*</span>
              </label>
              <select
                id={`${formId}-city`}
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputBase}
                style={{ border: inputBorder }}
              >
                <option value="" disabled>
                  {t.project_request_city_placeholder}
                </option>
                {TURKEY_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-service`} className="block text-sm font-medium text-[#334155] mb-1.5">
                {t.project_request_service} <span className="text-[#DC2626]">*</span>
              </label>
              <select
                id={`${formId}-service`}
                required
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className={inputBase}
                style={{ border: inputBorder }}
              >
                {SERVICE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-detail`} className="block text-sm font-medium text-[#334155] mb-1.5">
                {t.project_request_detail} <span className="text-[#DC2626]">*</span>
              </label>
              {t.project_request_detail_hint && (
                <p className="text-sm text-[#64748B] mb-1.5">{t.project_request_detail_hint}</p>
              )}
              <textarea
                id={`${formId}-detail`}
                required
                rows={5}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder={t.project_request_placeholder_detail}
                className={`${inputBase} resize-y min-h-[120px]`}
                style={{ border: inputBorder }}
              />
            </div>

            {error && (
              <p className="text-center text-sm text-[#DC2626]" role="alert">
                {error}
              </p>
            )}

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 rounded-[10px] text-white font-medium transition-transform hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#F5F3EF]"
                style={{ background: '#2563EB' }}
              >
                {t.project_request_submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
