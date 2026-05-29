/**
 * @param {{ cityName: string, items: { question: string, answer: string }[] }} props
 */
export default function LocalSeoFaq({ cityName, items = [] }) {
  if (!items.length) return null

  return (
    <section className="container mx-auto px-4 py-14 md:py-16 max-w-3xl">
      <h2 className="text-xl md:text-2xl font-semibold text-[#F8FAFC] mb-2">
        {cityName} hakkında sık sorulan sorular
      </h2>
      <p className="text-[#94A3B8] text-sm mb-8">
        Web sitesi süreci, süre ve fiyatlandırma hakkında en çok gelen sorular.
      </p>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-[rgba(248,250,252,0.1)] bg-[rgba(43,49,61,0.35)] open:bg-[rgba(43,49,61,0.55)] transition-colors"
          >
            <summary className="cursor-pointer list-none px-5 py-4 text-[#F8FAFC] font-medium text-sm md:text-base flex items-center justify-between gap-3">
              <span>{item.question}</span>
              <span className="text-[#4F7CFF] text-lg shrink-0 group-open:rotate-45 transition-transform" aria-hidden>
                +
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm text-[#94A3B8] leading-relaxed border-t border-[rgba(248,250,252,0.06)] pt-3">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
