// Projelerim: yalnızca kullanıcının onayladığı üç proje. Açıklamalar projede mevcut metinlerden (projectsData.js).
import { MK_DIGITAL } from './site'

export const PROJECTS = [
  { id: 'mk-digital-systems', name: 'MK Digital Systems', image: '/images/projects/mk-digital-systems.jpeg',
    href: { tr: MK_DIGITAL + '/tr', en: MK_DIGITAL + '/en' },
    desc: { tr: 'Şirket ve dijital sistemler.', en: 'Company and digital systems.' },
    purpose: { tr: 'Web siteleri, e-ticaret platformları ve özel yazılım çözümleri geliştiren dijital üretim markası.', en: 'Digital production brand developing websites, e-commerce platforms and custom software solutions.' } },
  { id: 'mavi-kadraj', name: 'Mavi Kadraj', image: '/images/projects/mavi-kadraj.jpeg',
    href: { tr: 'https://www.mavikadraj.com.tr', en: 'https://www.mavikadraj.com.tr' },
    desc: { tr: 'Doğa fotoğrafçılığı ve görsel anlatım.', en: 'Nature photography and visual storytelling.' },
    purpose: { tr: 'Doğa fotoğrafçılığı ve görsel anlatım üzerine kurulu kişisel dijital portföy platformu.', en: 'Personal digital portfolio platform built on nature photography and visual storytelling.' } },
  { id: 'mk-ops', name: 'MK OPS', image: '/images/projects/mk-ops.jpeg',
    href: { tr: 'https://www.mk-ops.tr', en: 'https://www.mk-ops.tr' },
    desc: { tr: 'Şantiye ve saha operasyon yönetimi.', en: 'Construction and field operations management (Turkish site).' },
    purpose: { tr: 'Telekom ve saha operasyonlarının planlanması, takibi ve yönetimi için geliştirilmiş SaaS platformu.', en: 'SaaS platform for planning, tracking and managing telecom and field operations.' } },
]
