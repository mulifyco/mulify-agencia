import Link from '@/components/themes/theme-link'

type Practice = {
  slug: string
  title: string
  short: string
  capabilities: readonly string[]
}

export default function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <Link
      href={`/projeler/hukuk/uzmanlik-alanlari/${practice.slug}`}
      className="group rounded-[1.8rem] border border-[#e9ded5] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#cfb79f] hover:shadow-[0_24px_70px_rgba(22,18,15,0.08)]"
    >
      <div className="text-[11px] uppercase tracking-[0.3em] text-[#8c6a4a]">Practice</div>
      <h3 className="mt-4 font-playfair text-2xl font-bold text-[#16120f] transition-colors group-hover:text-[#8c6a4a]">
        {practice.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#625851]">{practice.short}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {practice.capabilities.slice(0, 3).map((item) => (
          <span key={item} className="rounded-full border border-[#ece4dc] px-3 py-1 text-xs text-[#4f463f]">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 text-sm font-semibold text-[#16120f]">Detayı Gör</div>
    </Link>
  )
}
