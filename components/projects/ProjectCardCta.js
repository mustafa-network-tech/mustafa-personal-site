import { ArrowRight } from 'lucide-react'

/**
 * Proje kartı CTA — el yazısı, amber ton.
 * Kart üzerinde group class olduğu varsayılır.
 */
export default function ProjectCardCta({ label }) {
  return (
    <span className="project-card-cta inline-flex items-center gap-1.5">
      {label}
      <ArrowRight className="project-card-cta-icon w-4 h-4 shrink-0" aria-hidden />
    </span>
  )
}
