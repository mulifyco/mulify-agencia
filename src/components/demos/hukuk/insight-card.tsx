type Insight = {
  slug: string
  title: string
  excerpt: string
  category: string
}

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="rounded-[1.8rem] border border-[#2c2520] bg-[#16120f] p-7 text-[#f7f2ec]">
      <div className="text-[11px] uppercase tracking-[0.34em] text-[#c5a789]">{insight.category}</div>
      <h3 className="mt-4 font-playfair text-2xl font-bold leading-snug">{insight.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#d6cbc2]">{insight.excerpt}</p>
      <div className="mt-6 text-sm font-semibold text-[#f1d6bc]">Yazıyı İncele</div>
    </article>
  )
}
