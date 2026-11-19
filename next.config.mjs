import { LOCAL_SEO_REDIRECTS } from './lib/localSeo/canonicalRoutes.mjs'

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
      ...Object.entries(LOCAL_SEO_REDIRECTS).map(([source, destination]) => ({
        source,
        destination: `https://mustafaoner.net${destination}`,
        statusCode: 301,
      })),
      { source: '/showcase', destination: 'https://mustafaoner.net/vitrin', permanent: true },
      { source: '/tr/showcase', destination: 'https://mustafaoner.net/tr/vitrin', permanent: true },
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
