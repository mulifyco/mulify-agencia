type Office = {
  city: string
  label: string
  address: string
  description: string
}

export default function OfficeCard({ office }: { office: Office }) {
  return (
    <div className="rounded-[1.8rem] border border-[#e9ded5] bg-white p-7">
      <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">{office.label}</div>
      <h3 className="mt-4 font-playfair text-3xl font-bold text-[#16120f]">{office.city}</h3>
      <div className="mt-3 text-sm font-medium text-[#3d352f]">{office.address}</div>
      <p className="mt-4 text-sm leading-7 text-[#625851]">{office.description}</p>
    </div>
  )
}
