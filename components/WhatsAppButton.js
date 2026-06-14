'use client'

import { useEffect, useState } from 'react'

const WA_URL =
  'https://wa.me/905456597551?text=' +
  encodeURIComponent(
    'Merhaba Mustafa Bey, web sitesi ve yazılım hizmetleriniz hakkında bilgi almak istiyorum.'
  )

function handleClick() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'lead',
      event_label: 'floating_whatsapp_button',
    })
  }
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Kısa gecikmeyle göster (sayfa yüklendikten sonra)
    const showTimer = setTimeout(() => setVisible(true), 800)
    // 5 saniye sonra gizle
    const hideTimer = setTimeout(() => setVisible(false), 5800)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <>
      {/* Balon tooltip */}
      <div className={`wa-tooltip ${visible ? 'wa-tooltip--visible' : ''}`}>
        <p className="wa-tooltip__title">
          İşletmeniz İçin Profesyonel Web Sitesi ve Özel Yazılım Çözümleri
        </p>
        <p className="wa-tooltip__sub">
          Ücretsiz Ön Görüşme İçin Hemen İletişime Geçin
        </p>
        {/* Balonun sağ alt köşesine bakan ok */}
        <span className="wa-tooltip__arrow" />
      </div>

      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="WhatsApp ile iletişime geç"
        className="wa-float-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.774L0 32l8.438-2.012A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.854l-.484-.287-5.011 1.195 1.234-4.886-.317-.502A13.274 13.274 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.815c-.398-.199-2.354-1.162-2.72-1.294-.366-.133-.632-.199-.898.199-.266.398-1.031 1.294-1.264 1.56-.233.266-.465.299-.863.1-.398-.199-1.682-.62-3.204-1.977-1.184-1.057-1.983-2.362-2.216-2.76-.233-.398-.025-.613.175-.811.18-.179.398-.465.598-.698.199-.233.266-.398.398-.664.133-.266.066-.498-.033-.698-.1-.199-.898-2.163-1.23-2.96-.324-.777-.654-.672-.898-.684l-.765-.013c-.266 0-.698.1-1.064.498-.366.398-1.397 1.365-1.397 3.329s1.43 3.86 1.63 4.126c.199.266 2.814 4.298 6.82 6.026.953.411 1.697.657 2.277.841.957.304 1.828.261 2.516.158.767-.114 2.354-.963 2.687-1.892.333-.929.333-1.726.233-1.892-.1-.166-.366-.266-.764-.465z" />
        </svg>
      </a>

      <style>{`
        /* ── Float buton ── */
        .wa-float-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #25D366;
          box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
          text-decoration: none;
        }
        .wa-float-btn:hover {
          transform: scale(1.12);
          background-color: #1ebe5d;
          box-shadow: 0 6px 22px rgba(37, 211, 102, 0.6);
        }
        .wa-float-btn:active {
          transform: scale(0.96);
        }

        /* ── Tooltip balon ── */
        .wa-tooltip {
          position: fixed;
          bottom: 90px;
          right: 20px;
          z-index: 9998;
          max-width: 230px;
          background: #ffffff;
          border-radius: 12px;
          padding: 12px 14px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.14);
          border-left: 4px solid #25D366;
          opacity: 0;
          transform: translateY(8px) scale(0.96);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
        }
        .wa-tooltip--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .wa-tooltip__title {
          margin: 0 0 4px;
          font-size: 12.5px;
          font-weight: 700;
          color: #111;
          line-height: 1.4;
        }
        .wa-tooltip__sub {
          margin: 0;
          font-size: 11.5px;
          font-weight: 500;
          color: #25D366;
          line-height: 1.4;
        }
        /* Balonun altındaki ok işareti */
        .wa-tooltip__arrow {
          position: absolute;
          bottom: -8px;
          right: 20px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #ffffff;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.08));
        }

        @media (max-width: 640px) {
          .wa-float-btn {
            bottom: 16px;
            right: 16px;
            width: 50px;
            height: 50px;
          }
          .wa-tooltip {
            bottom: 78px;
            right: 12px;
            max-width: 200px;
          }
          .wa-tooltip__arrow {
            right: 16px;
          }
        }
      `}</style>
    </>
  )
}
