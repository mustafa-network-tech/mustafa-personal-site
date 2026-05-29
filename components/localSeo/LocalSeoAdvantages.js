/**
 * @param {{ title?: string, items: { title: string, description: string }[] }} props
 */
export default function LocalSeoAdvantages({
  title = 'Neden bizimle çalışmalısınız?',
  items = [],
}) {
  if (!items.length) return null

  return (
    <section className="bg-[rgba(15,23,42,0.35)] border-y border-[rgba(248,250,252,0.06)] py-14 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-xl md:text-2xl font-semibold text-[#F8FAFC] mb-8">{title}</h2>
        <ul className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-xl p-5 border border-[rgba(248,250,252,0.1)] bg-[rgba(43,49,61,0.45)]"
            >
              <h3 className="text-base font-semibold text-[#F8FAFC] mb-2">{item.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
