type Result = {
  title: string
  client: string
  summary: string
  outcome: string
}

export default function ResultCard({ result }: { result: Result }) {
  return (
    <div className="rounded-[1.8rem] border border-[#e9ded5] bg-white p-7">
      <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">{result.client}</div>
      <h3 className="mt-4 font-playfair text-2xl font-bold text-[#16120f]">{result.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#625851]">{result.summary}</p>
      <div className="mt-6 rounded-2xl bg-[#f7f2ec] p-5 text-sm leading-7 text-[#3d352f]">
        {result.outcome}
      </div>
    </div>
  )
}
