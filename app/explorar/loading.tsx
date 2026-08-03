export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Header Skeleton */}
      <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-zinc-800 rounded animate-pulse" />
            <div className="h-6 w-28 bg-zinc-800 rounded animate-pulse" />
          </div>

          <div className="h-10 w-full md:w-96 bg-zinc-900 border border-zinc-800 rounded-full animate-pulse" />
        </div>
      </nav>

      {/* Conteúdo Principal Skeleton */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-10 space-y-3">
          <div className="h-9 w-64 bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-4 w-80 bg-zinc-800/60 rounded animate-pulse" />
        </header>

        {/* Grid de Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden p-4 flex flex-col gap-3 animate-pulse"
            >
              {/* Poster Placeholder */}
              <div className="aspect-[2/3] w-full bg-zinc-800 rounded-lg" />

              {/* Título Placeholder */}
              <div className="h-4 bg-zinc-800 rounded w-3/4 mt-1" />

              {/* Gêneros Placeholder */}
              <div className="flex gap-2">
                <div className="h-3 bg-zinc-800 rounded w-1/3" />
                <div className="h-3 bg-zinc-800 rounded w-1/4" />
              </div>

              {/* Botão Placeholder */}
              <div className="h-8 bg-zinc-800 rounded-lg w-full mt-auto" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}