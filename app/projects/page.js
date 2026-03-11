// app/projects/page.js – English projects list
import Link from 'next/link'
import { PAGE_META, PROJECT_SLUGS, PROJECT_META, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'

const meta = PAGE_META.projects.en
const og = buildOpenGraph({ locale: 'en', path: '/projects', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ title: meta.title, description: meta.description, image: OG_IMAGES.en })

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/projects', languages: { en: '/projects', tr: '/tr/projects', 'x-default': '/projects' } },
  openGraph: og,
  twitter,
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
