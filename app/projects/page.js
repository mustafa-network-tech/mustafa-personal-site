// app/projects/page.js – English projects list
import Link from 'next/link'
import { SITE_URL, PAGE_META, PROJECT_SLUGS, PROJECT_META } from '@/lib/seo'

export const metadata = {
  title: PAGE_META.projects.en.title,
  description: PAGE_META.projects.en.description,
  alternates: {
    canonical: '/projects',
    languages: {
      en: '/projects',
      tr: '/tr/projects',
      'x-default': '/projects',
    },
  },
  openGraph: {
    title: PAGE_META.projects.en.title,
    description: PAGE_META.projects.en.description,
    url: `${SITE_URL}/projects`,
  },
}

export default function ProjectsEn() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Projects</h1>
      <p className="text-[#E2E8F0] mb-8">
        Software projects including web applications, frontend systems and digital platforms.
      </p>
      <ul className="space-y-3">
        {PROJECT_SLUGS.map((slug) => {
          const meta = PROJECT_META[slug]
          const title = meta?.en?.title?.split('|')[0]?.trim() || slug
          return (
            <li key={slug}>
              <Link
                href={`/projects/${slug}`}
                className="text-[#4F7CFF] hover:underline"
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="mt-8">
        <Link href="/" className="text-[#94A3B8] hover:text-[#F8FAFC]">
          ← Back to home
        </Link>
      </p>
    </div>
  )
}
