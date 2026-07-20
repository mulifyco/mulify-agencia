export default function RouteLoading() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-36 pb-24" aria-busy="true" aria-label="İçerik yükleniyor">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-3 w-24 rounded bg-white/10 mb-6" />
        <div className="h-12 md:h-16 max-w-2xl rounded-xl bg-white/10 mb-5" />
        <div className="h-5 max-w-xl rounded bg-white/5 mb-14" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((item) => (
            <div key={item}>
              <div className="aspect-[4/3] rounded-2xl bg-white/5 mb-4" />
              <div className="h-5 w-2/3 rounded bg-white/10 mb-3" />
              <div className="h-4 w-full rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
