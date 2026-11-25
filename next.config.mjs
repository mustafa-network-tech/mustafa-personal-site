/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'mustafa-network-tech.github.io', pathname: '/photo-url/images/**' },
    ],
  },
  async redirects() {
    return [
      // Domain order: www -> apex, single permanent hop. The root goes straight to /tr (no second hop).
      { source: '/', has: [{ type: 'host', value: 'www.mustafaoner.net' }], destination: 'https://mustafaoner.net/tr', permanent: true },
      // Eski ticari portföy sayfaları -> kişisel sitedeki karşılığı (Projelerim); detay sayfaları da listeye gider.
      { source: '/projects', destination: 'https://mustafaoner.net/en/my-projects', permanent: true },
      { source: '/projects/:slug', destination: 'https://mustafaoner.net/en/my-projects', permanent: true },
      { source: '/tr/projects', destination: 'https://mustafaoner.net/tr/projelerim', permanent: true },
      { source: '/tr/projects/:slug', destination: 'https://mustafaoner.net/tr/projelerim', permanent: true },
      // Eski proje vitrini (Vitrin / Showcase) -> Projelerim
      { source: '/vitrin', destination: 'https://mustafaoner.net/en/my-projects', permanent: true },
      { source: '/showcase', destination: 'https://mustafaoner.net/en/my-projects', permanent: true },
      { source: '/tr/vitrin', destination: 'https://mustafaoner.net/tr/projelerim', permanent: true },
      { source: '/tr/showcase', destination: 'https://mustafaoner.net/tr/projelerim', permanent: true },
      // Catch-all last so the absolute rules above stay single-hop.
      // App legal URLs are locked: the www host keeps serving them exactly as before (no redirect added).
      {
        source: '/:path((?!kvkk-veri-isleme-gizlilik-politikalari).+)',
        has: [{ type: 'host', value: 'www.mustafaoner.net' }],
        destination: 'https://mustafaoner.net/:path',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
