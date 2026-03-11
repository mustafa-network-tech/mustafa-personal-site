/**
 * Re-export central SEO config. Existing imports (app/page.js, projects, etc.) keep working.
 */
export {
  SITE_URL,
  GLOBAL_META,
  OG_IMAGES,
  PAGE_META,
  PROJECT_META,
  PROJECT_SLUGS,
  getProjectMeta,
} from '@/seo/metadata'

/** Backward compat: default meta (same as GLOBAL_META) */
import { GLOBAL_META, OG_IMAGES, SITE_URL } from '@/seo/metadata'
export const DEFAULT_META = GLOBAL_META

/** Backward compat: HOME_OG for homepage social */
export const HOME_OG = {
  en: {
    title: GLOBAL_META.en.title,
    description: GLOBAL_META.en.description,
    image: OG_IMAGES.en,
    siteName: 'Mustafa Oner',
    locale: 'en_US',
  },
  tr: {
    title: GLOBAL_META.tr.title,
    description: GLOBAL_META.tr.description,
    image: OG_IMAGES.tr,
    siteName: 'Mustafa Öner',
    locale: 'tr_TR',
  },
}
