/**
 * Minimal premium vektör — danışman + kulaklık (stok fotoğraf yerine).
 * variant="header": başlıkta biraz daha sıkı kırpım; variant="fab": yüzen buton.
 */
export default function AssistantConsultantAvatar({ className = 'h-10 w-10', variant = 'fab' }) {
  const clipId = variant === 'header' ? 'assistant-clip-h' : 'assistant-clip-f'
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${clipId}-hair`} x1="14" y1="10" x2="34" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3D2E24" />
          <stop offset="1" stopColor="#5C4336" />
        </linearGradient>
        <radialGradient id={`${clipId}-bg`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </radialGradient>
        <clipPath id={clipId}>
          <circle cx="24" cy="24" r="22" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="22" fill={`url(#${clipId}-bg)`} />
      <g clipPath={`url(#${clipId})`}>
        {/* Omuz */}
        <path d="M8 42c0-6 4.5-11 16-11s16 5 16 11v2H8v-2Z" fill="#CBD5E1" />
        <path d="M14 33 24 38l10-5" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" />
        {/* Boyun */}
        <path d="M19.5 27.5h9v4.5c0 1.2-1.3 2.2-4.5 2.2s-4.5-1-4.5-2.2v-4.5Z" fill="#E8B4A0" />
        {/* Yüz */}
        <ellipse cx="24" cy="19.5" rx="8" ry="9" fill="#F0C4B3" />
        <ellipse cx="17.3" cy="20.8" rx="1.5" ry="1" fill="rgba(220,120,100,0.18)" />
        <ellipse cx="30.7" cy="20.8" rx="1.5" ry="1" fill="rgba(220,120,100,0.18)" />
        <ellipse cx="20.1" cy="18.5" rx="1" ry="1.15" fill="#1E293B" />
        <ellipse cx="27.9" cy="18.5" rx="1" ry="1.15" fill="#1E293B" />
        <path
          d="M20 23c1 1.2 2.4 1.9 4 1.9s3-.7 4-1.9"
          stroke="#C0846F"
          strokeWidth="0.95"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Saç */}
        <path
          d="M13.5 22.5c0-7 3.8-12.5 10.5-12.5S34.5 15.5 34.5 22.5c0 1.7-.4 3.3-1.1 4.7-1.7-2-4-3.2-6.9-3.2s-5.2 1.2-6.9 3.2c-.7-1.4-1.1-3-1.1-4.7Z"
          fill={`url(#${clipId}-hair)`}
        />
        <path d="M15 13.5c2.2-2 5.5-3.2 9-3.2s6.8 1.2 9 3.2" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" strokeLinecap="round" />
        <path d="M19 28.5h10l-1.6 3H20.6L19 28.5Z" fill="#F8FAFC" />
      </g>
      {/* Kulaklık — üst katman */}
      <path
        d="M9 22.5c0-4 2.5-7 6-7.5M39 22.5c0-4-2.5-7-6-7.5"
        stroke="#64748B"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M9 22.5v5.5c0 2 1.5 3.5 3.5 3.5h.5M39 22.5v5.5c0 2-1.5 3.5-3.5 3.5h-.5"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="10.5" cy="25" rx="3.2" ry="4.2" fill="#334155" opacity="0.92" />
      <ellipse cx="37.5" cy="25" rx="3.2" ry="4.2" fill="#334155" opacity="0.92" />
      <ellipse cx="10.5" cy="25" rx="1.6" ry="2.2" fill="#64748B" opacity="0.5" />
      <ellipse cx="37.5" cy="25" rx="1.6" ry="2.2" fill="#64748B" opacity="0.5" />
      <path
        d="M12.5 28.5c2 4 5 6.5 8.5 7.5"
        stroke="#475569"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="21" cy="35.5" r="1.35" fill="#64748B" />
    </svg>
  )
}
