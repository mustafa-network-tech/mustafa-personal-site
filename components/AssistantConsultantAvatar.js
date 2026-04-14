/**
 * Sabit vektör danışman görseli (bayan) — yüzen buton için.
 * aria-hidden: erişilebilir ad üst düğmedeki aria-label ile verilir.
 */
export default function AssistantConsultantAvatar({ className = 'h-10 w-10' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="assistant-avatar-hair" x1="14" y1="10" x2="34" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A3728" />
          <stop offset="1" stopColor="#6B4E3D" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="rgba(255,255,255,0.14)" />
      {/* Blazer */}
      <path
        d="M7 41.5c0-5.5 4-10.5 17-10.5s17 5 17 10.5V44H7v-2.5Z"
        fill="#E8EDF3"
      />
      <path d="M16 31 24 36l8-5" stroke="rgba(51,65,85,0.2)" strokeWidth="0.9" strokeLinecap="round" />
      {/* Boyun */}
      <path d="M19.5 27.5h9v4.8c0 1.2-1.3 2.2-4.5 2.2s-4.5-1-4.5-2.2v-4.8Z" fill="#E8B4A0" />
      {/* Yüz */}
      <ellipse cx="24" cy="19.5" rx="8.2" ry="9.2" fill="#F0C4B3" />
      {/* Yanak */}
      <ellipse cx="17.5" cy="21" rx="1.8" ry="1.1" fill="rgba(220,120,100,0.2)" />
      <ellipse cx="30.5" cy="21" rx="1.8" ry="1.1" fill="rgba(220,120,100,0.2)" />
      {/* Gözler */}
      <ellipse cx="20.2" cy="18.6" rx="1.05" ry="1.2" fill="#1E293B" />
      <ellipse cx="27.8" cy="18.6" rx="1.05" ry="1.2" fill="#1E293B" />
      <ellipse cx="20.5" cy="18.2" rx="0.35" ry="0.4" fill="#fff" opacity="0.7" />
      <ellipse cx="28.1" cy="18.2" rx="0.35" ry="0.4" fill="#fff" opacity="0.7" />
      {/* Kaşlar */}
      <path d="M17.5 16.5q2.5-1.2 5-.2" stroke="#5C4033" strokeWidth="0.9" strokeLinecap="round" opacity="0.65" />
      <path d="M25.5 16.3q2.5-1 5 .2" stroke="#5C4033" strokeWidth="0.9" strokeLinecap="round" opacity="0.65" />
      {/* Gülümseme */}
      <path
        d="M19.8 23.2c1.1 1.4 2.5 2.1 4.2 2.1s3.1-.7 4.2-2.1"
        stroke="#B45309"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Saç */}
      <path
        d="M13.5 22.5c0-7.2 3.8-12.8 10.5-12.8S34.5 15.3 34.5 22.5c0 1.8-.4 3.5-1.2 5-1.8-2.2-4.2-3.5-7.3-3.5-3.1 0-5.5 1.3-7.3 3.5-.8-1.5-1.2-3.2-1.2-5Z"
        fill="url(#assistant-avatar-hair)"
      />
      <path
        d="M15 14c2.2-2.2 5.5-3.5 9-3.5s6.8 1.3 9 3.5"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      {/* Yakalı gömlek */}
      <path d="M19 28.5h10l-1.8 3.2H20.8L19 28.5Z" fill="#F8FAFC" />
    </svg>
  )
}
