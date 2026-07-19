export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="border-b border-[#e9ded5] bg-[#f7f2ec]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">{eyebrow}</div>
        <h1 className="mt-5 max-w-4xl font-playfair text-4xl font-bold leading-tight text-[#16120f] md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#625851]">{description}</p>
      </div>
    </section>
  )
}
