// components/ProjectCard.js – same style as SoftwareDigital project cards (reusable)
import { Globe, ExternalLink } from 'lucide-react'

export default function ProjectCard({ title, description, tags = [], ctaLabel, ctaHref = '#', type = 'Demo', badge }) {
  return (
    <div
      className="telekom-glass-card group relative rounded-[18px] transition-all duration-[0.35s] ease-out"
      style={{ padding: 30 }}
    >
      {badge && (
        <span
          className="inline-block text-[10px] font-medium tracking-wide text-[#64748B] mb-3 px-2.5 py-1 rounded-md border border-[rgba(0,0,0,0.08)] bg-[rgba(0,0,0,0.03)]"
          style={{ letterSpacing: '0.02em' }}
        >
          {badge}
        </span>
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="card-icon-container shrink-0">
          <Globe className="w-6 h-6 text-[#334155]" />
        </div>
        <span className="card-tag inline-block">{type}</span>
      </div>
      <h3 className="telekom-card-title text-[18px] font-semibold mb-3 leading-tight text-[#1E293B]">
        {title}
      </h3>
      <p className="text-sm mb-4 text-[#475569]" style={{ lineHeight: 1.6 }}>
        {description}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="card-tag inline-block">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.08)]">
        <a
          href={ctaHref}
          target={ctaHref.startsWith('#') ? undefined : '_blank'}
          rel={ctaHref.startsWith('#') ? undefined : 'noopener noreferrer'}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-[#2563EB] border border-[#2563EB] text-white hover:bg-[#1d4ed8] hover:border-[#1d4ed8] hover:shadow-[0_0_24px_rgba(37,99,235,0.35)] [&_svg]:text-current"
        >
          <ExternalLink className="w-4 h-4" />
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}
