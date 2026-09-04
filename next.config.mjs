/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'mustafa-network-tech.github.io', pathname: '/photo-url/images/**' },
    ],
  },
  async redirects() {
    return [
      { source: '/showcase', destination: '/vitrin', permanent: true },
      { source: '/tr/showcase', destination: '/tr/vitrin', permanent: true },
    ]
  },
}

export default nextConfig
