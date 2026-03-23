/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/showcase', destination: '/vitrin', permanent: true },
      { source: '/tr/showcase', destination: '/tr/vitrin', permanent: true },
    ]
  },
}

export default nextConfig

// .
