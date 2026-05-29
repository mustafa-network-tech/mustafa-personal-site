const WHATSAPP_URL = 'https://wa.me/905456597551?text=Merhaba%2C%20%C5%9Fehir%20bazl%C4%B1%20web%20sitesi%20projem%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.'

/**
 * @param {{ cityName: string }} props
 */
export default function LocalSeoContactCta({ cityName }) {
  return (
    <section className="relative overflow-hidden border-y border-[rgba(248,250,252,0.08)] py-16 md:py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(79,124,255,0.12), transparent 60%)',
        }}
        aria-hidden
      />
      <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4 tracking-tight">
          {cityName} için özel bir web projesi mi planlıyorsunuz?
        </h2>
        <p className="text-[#94A3B8] leading-relaxed mb-8 max-w-xl mx-auto">
          Kısa bir görüşme ile ihtiyacınızı netleştirelim. Ücretsiz ön değerlendirme sonrası kapsam,
          süre ve yatırım aralığını şeffaf şekilde paylaşırım.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#proje-talep-formu"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#4F7CFF] hover:bg-[#3d6ae8] transition-colors shadow-lg shadow-[rgba(79,124,255,0.25)]"
          >
            Ücretsiz Görüşme
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-[#F8FAFC] border border-[rgba(248,250,252,0.2)] bg-[rgba(43,49,61,0.6)] hover:bg-[rgba(43,49,61,0.85)] transition-colors"
          >
            WhatsApp ile İletişim
          </a>
        </div>
      </div>
    </section>
  )
}
