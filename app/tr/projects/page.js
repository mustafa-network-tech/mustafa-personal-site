// app/tr/projects/page.js – Turkish projects list
import Link from 'next/link'
import { SITE_URL, PAGE_META, PROJECT_SLUGS, PROJECT_META } from '@/lib/seo'

export const metadata = {
  title: PAGE_META.projects.tr.title,
  description: PAGE_META.projects.tr.description,
  alternates: {
    canonical: '/tr/projects',
    languages: {
      tr: '/tr/projects',
      en: '/projects',
      'x-default': '/projects',
    },
  },
  openGraph: {
    title: PAGE_META.projects.tr.title,
    description: PAGE_META.projects.tr.description,
    url: `${SITE_URL}/tr/projects`,
  },
}

export default function ProjectsTr() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Projeler</h1>
      <p className="text-[#E2E8F0] mb-8">
        Web uygulamaları, arayüz sistemleri ve yazılım projeleri.
      </p>
      <ul className="space-y-3">
        {PROJECT_SLUGS.map((slug) => {
          const meta = PROJECT_META[slug]
          const title = meta?.tr?.title?.split('|')[0]?.trim() || slug
          return (
            <li key={slug}>
              <Link
                href={`/tr/projects/${slug}`}
                className="text-[#4F7CFF] hover:underline"
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="mt-8">
        <Link href="/tr" className="text-[#94A3B8] hover:text-[#F8FAFC]">
          ← Ana sayfaya dön
        </Link>
      </p>
    </div>
  )
}
