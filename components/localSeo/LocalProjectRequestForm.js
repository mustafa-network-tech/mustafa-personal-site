'use client'

import { useState } from 'react'
import { TURKEY_CITIES } from '@/lib/localSeo/turkeyCities'
import { SERVICE_TYPE_OPTIONS } from '@/lib/localSeo/serviceTypes'
import { buildWhatsAppProjectUrl } from '@/lib/localSeo/whatsapp'

const inputBase =
  'w-full rounded-[10px] px-3 py-3 border bg-white/80 text-[#0f172a] transition-colors outline-none focus:border-[#4F7CFF] placeholder:text-[#94A3B8]'
const inputBorder = '1px solid rgba(0,0,0,0.1)'

/**
 * @param {{ defaultCity?: string, formId?: string }} props
 */
export default function LocalProjectRequestForm({ defaultCity = '', formId = 'proje-talep-formu' }) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState(defaultCity)
  const [serviceType, setServiceType] = useState(SERVICE_TYPE_OPTIONS[0])
  const [detail, setDetail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!fullName.trim() || !phone.trim() || !city || !serviceType || !detail.trim()) {
      setError('Lütfen zorunlu alanları doldurun.')
      return
    }
    const url = buildWhatsAppProjectUrl({ fullName, phone, city, serviceType, detail })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id={formId}
      className="py-16 md:py-20 scroll-mt-24"
      style={{ background: 'linear-gradient(180deg, #F5F3EF 0%, #EDEAE4 100%)' }}
      aria-labelledby={`${formId}-title`}
    >
      <div className="container mx-auto px-4 max-w-[640px]">
        <header className="text-center mb-10">
          <h2
            id={`${formId}-title`}
            className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E293B] mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Projeniz İçin Bizimle İletişime Geçin
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#475569]">
            Kurumsal web sitesi, e-ticaret veya özel yazılım projeniz için hızlıca iletişime geçebilirsiniz.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="local-name" className="block text-sm font-medium text-[#334155] mb-1.5">
              Ad Soyad <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="local-name"
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputBase}
              style={{ border: inputBorder }}
            />
          </div>

          <div>
            <label htmlFor="local-phone" className="block text-sm font-medium text-[#334155] mb-1.5">
              Telefon <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="local-phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputBase}
              style={{ border: inputBorder }}
              placeholder="05XX XXX XX XX"
            />
          </div>

          <div>
            <label htmlFor="local-city" className="block text-sm font-medium text-[#334155] mb-1.5">
              Şehir <span className="text-[#DC2626]">*</span>
            </label>
            <select
              id="local-city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputBase}
              style={{ border: inputBorder }}
            >
              <option value="" disabled>
                Şehir seçin
              </option>
              {TURKEY_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="local-service" className="block text-sm font-medium text-[#334155] mb-1.5">
              Hizmet Türü <span className="text-[#DC2626]">*</span>
            </label>
            <select
              id="local-service"
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
            <label htmlFor="local-detail" className="block text-sm font-medium text-[#334155] mb-1.5">
              Proje Detayı <span className="text-[#DC2626]">*</span>
            </label>
            <textarea
              id="local-detail"
              required
              rows={5}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className={`${inputBase} resize-y min-h-[120px]`}
              style={{ border: inputBorder }}
              placeholder="Kısaca projenizi, hedef kitlenizi ve zaman planınızı yazın."
            />
          </div>

          {error && (
            <p className="text-sm text-[#DC2626]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-[12px] text-sm font-semibold text-white bg-[#2563EB] border border-[#2563EB] hover:bg-[#1d4ed8] transition-colors"
          >
            WhatsApp ile Talep Gönder
          </button>
        </form>
      </div>
    </section>
  )
}
