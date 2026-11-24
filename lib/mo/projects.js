// Projelerim: yalnızca kullanıcının onayladığı üç proje. Açıklamalar projede mevcut metinlerden (projectsData.js).
import { MK_DIGITAL } from './site'

export const PROJECTS = [
  { id: 'mk-digital-systems', name: 'MK Digital Systems', image: '/showcase/mk-logo.png', fit: 'contain', bg: '#1d202a',
    href: { tr: MK_DIGITAL + '/tr', en: MK_DIGITAL + '/en' },
    desc: { tr: 'Şirket ve dijital sistemler.', en: 'Company and digital systems.' },
    category: { tr: 'Dijital Teknoloji', en: 'Digital Technology' },
    features: { tr: ['Web tabanlı yazılımlar', 'İşletme yönetim sistemleri', 'Mobil uygulamalar', 'Dijital çözümler'], en: ['Web-based software', 'Business management systems', 'Mobile applications', 'Digital solutions'] },
    purpose: { tr: 'Fikirlerimi dijital dünyaya taşıdığım, işletmelerin ihtiyaçlarına yönelik yazılım ve teknoloji çözümleri geliştirdiğim markam.', en: 'My brand, where I bring my ideas into the digital world and build software and technology solutions for the needs of businesses.' } },
  { id: 'mavi-kadraj', name: 'Mavi Kadraj', image: '/images/projects/mavi-kadraj.jpeg',
    href: { tr: 'https://www.mavikadraj.com.tr', en: 'https://www.mavikadraj.com.tr' },
    desc: { tr: 'Doğa fotoğrafçılığı ve görsel anlatım.', en: 'Nature photography and visual storytelling.' },
    category: { tr: 'Doğa Fotoğrafçılığı', en: 'Nature Photography' },
    purpose: { tr: 'Doğa fotoğrafçılığı ve görsel anlatım üzerine kurulu kişisel dijital portföy platformu.', en: 'Personal digital portfolio platform built on nature photography and visual storytelling.' } },
  { id: 'mk-ops', name: 'MK OPS', image: '/images/projects/mk-ops.jpeg',
    href: { tr: 'https://www.mk-ops.tr', en: 'https://www.mk-ops.tr' },
    desc: { tr: 'Şantiye ve saha operasyon yönetimi.', en: 'Construction and field operations management (Turkish site).' },
    category: { tr: 'Saha Operasyon Yönetimi', en: 'Field Operations Management' },
    purpose: { tr: 'Telekom ve saha operasyonlarının planlanması, takibi ve yönetimi için geliştirilmiş SaaS platformu.', en: 'SaaS platform for planning, tracking and managing telecom and field operations.' } },
]
