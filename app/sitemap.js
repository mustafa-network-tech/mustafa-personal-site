// app/sitemap.js – generates sitemap.xml (home, projects, services, contact + TR)
import { getSitemapUrls } from '@/seo/sitemap'

export default function sitemap() {
  return getSitemapUrls()
}
