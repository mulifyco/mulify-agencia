type Lawyer = {
  name: string
  role: string
  bio: string
}

export default function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <div className="rounded-[1.8rem] border border-[#e9ded5] bg-white p-7">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3ebe3] font-playfair text-lg font-bold text-[#8c6a4a]">
        {lawyer.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
      </div>
      <h3 className="mt-5 font-playfair text-2xl font-bold text-[#16120f]">{lawyer.name}</h3>
      <div className="mt-2 text-sm font-medium text-[#8c6a4a]">{lawyer.role}</div>
      <p className="mt-4 text-sm leading-7 text-[#625851]">{lawyer.bio}</p>
    </div>
  )
}
