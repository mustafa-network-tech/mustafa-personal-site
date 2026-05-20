export const WHATSAPP_NUMBER = '905456507551'

/**
 * @param {{ fullName: string, phone: string, city: string, serviceType: string, detail: string }} data
 */
export function buildWhatsAppProjectUrl(data) {
  const message = [
    'Yeni Web Proje Talebi',
    '',
    'Ad Soyad:',
    data.fullName.trim(),
    '',
    'Telefon:',
    data.phone.trim(),
    '',
    'Şehir:',
    data.city.trim(),
    '',
    'Hizmet Türü:',
    data.serviceType.trim(),
    '',
    'Proje Detayı:',
    data.detail.trim(),
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
