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
      ...Object.entries(LOCAL_SEO_REDIRECTS).map(([source, destination]) => ({
        source,
        destination: `https://mustafaoner.net${destination}`,
        statusCode: 301,
      })),
      { source: '/showcase', destination: '/vitrin', permanent: true },
      { source: '/tr/showcase', destination: '/tr/vitrin', permanent: true },
    ]
  },
}

export default nextConfig
