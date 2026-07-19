export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">{eyebrow}</div>
      <h2 className="mt-4 font-playfair text-3xl font-bold leading-tight text-[#16120f] md:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-8 text-[#625851]">{description}</p>}
    </div>
  )
}
