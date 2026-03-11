// app/robots.js – generates robots.txt
import { SITE_URL } from '@/seo/metadata'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
